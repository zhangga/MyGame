var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//地图管理层
var MapLayer = (function (_super) {
    __extends(MapLayer, _super);
    function MapLayer(mainScene) {
        var _this = _super.call(this) || this;
        //缓存地图的textture
        _this.mapImgCache = {}; //缓存地图的texttrue 如果存的是Image等于正在加载此对象
        _this.mapUrlLoadedList = []; //已加载成功的 地图URL列表
        _this._mainScene = mainScene;
        _this.onInit();
        return _this;
    }
    MapLayer.prototype.onInit = function () {
        this._mapLayer = new egret.DisplayObjectContainer();
        this.addChild(this._mapLayer);
        this._resLayer = new egret.DisplayObjectContainer();
        this._mapLayer.addChildAt(this._resLayer, 0);
        this._bottomLayer = new egret.DisplayObjectContainer();
        this._mapLayer.addChildAt(this._bottomLayer, 1);
        this._bodyLayer = new egret.DisplayObjectContainer();
        this._mapLayer.addChildAt(this._bodyLayer, 2);
        //地图资源
        this.mapSmallImg = new eui.Image();
        this._resLayer.addChildAt(this.mapSmallImg, 1);
        this.mapResImgs = [];
        this.mapImgColNum = Math.ceil(size.width / GameDefine.MapRes_Width) + 2 * GameDefine.MapRes_RelaodNum;
        this.mapImgRowNum = Math.ceil(size.height / GameDefine.MapRes_Height) + 2 * GameDefine.MapRes_RelaodNum;
        for (var row = 0; row < this.mapImgColNum; row++) {
            for (var col = 0; col < this.mapImgRowNum; col++) {
                var _mapImg = new eui.Image();
                this._resLayer.addChild(_mapImg);
                this.mapResImgs.push(_mapImg);
            }
        }
        //DELETE
        this.onRefreshMap();
    };
    MapLayer.prototype.onRefreshMap = function () {
        this._mapInfo = this._mainScene.mapInfo;
        //把地图放大成整个地图的大小
        this.mapSmallImg.source = "map_" + 1001 + "_small_jpg";
        this.mapSmallImg.width = this._mapInfo.MAP_WIDTH;
        this.mapSmallImg.height = this._mapInfo.MAP_HEIGHT;
        this.moveMapResLayer();
        this._mapLayer.x = 100;
        this._mapLayer.y = 100;
    };
    /**移动地图资源刷新 */
    MapLayer.prototype.moveMapResLayer = function () {
        var minPosX = (-this._mapLayer.x) - GameDefine.MapRes_Width * GameDefine.MapRes_RelaodNum;
        var minPosY = (-this._mapLayer.y) - GameDefine.MapRes_Height * GameDefine.MapRes_RelaodNum;
        var _startCol = Math.floor(minPosX / GameDefine.MapRes_Width);
        var _startRow = Math.floor(minPosY / GameDefine.MapRes_Height);
        var index = 0;
        //拼接地图块
        for (var row = _startRow; row < _startRow + this.mapImgRowNum; row++) {
            for (var col = _startCol; col < _startCol + this.mapImgColNum; col++) {
                var _mapImg = this.mapResImgs[index];
                _mapImg.x = col * GameDefine.MapRes_Width;
                _mapImg.y = row * GameDefine.MapRes_Height;
                this.onLoadMapImage(_mapImg);
                index++;
            }
        }
    };
    /**地图加载**/
    MapLayer.prototype.onLoadMapImage = function (mapImg) {
        if (!this.mapUrlLoadingList)
            this.mapUrlLoadingList = [];
        var isLoading = false;
        if (mapImg.x >= 0 && mapImg.y >= 0 && mapImg.x < this._mapInfo.MAP_WIDTH && mapImg.y < this._mapInfo.MAP_HEIGHT) {
            // var mapModel: ModelMap = ModelManager.getInstance().modelMap[this._mapInfo.mapId];
            var col = Math.floor(mapImg.x / GameDefine.MapRes_Width);
            var row = Math.floor(mapImg.y / GameDefine.MapRes_Height);
            //对应的图片编号
            var imgIndex = row * Math.ceil(this._mapInfo.MAP_WIDTH / GameDefine.MapRes_Width) + col + 1;
            // var mapUrl: string = "resource/mapres/" + mapModel.resourcesId + "/map_" + mapModel.resourcesId + "_" + imgIndex + ".jpg";
            var mapUrl = "resource/mapres/" + 1001 + "/map_" + "1001" + "_" + 1 + ".jpg";
            var cachekey = this.mapCacheKey(mapUrl);
            if (mapImg.texture && mapImg.texture.url == mapUrl)
                return;
            var mapTexture = this.mapImgCache[cachekey];
            if (mapTexture) {
                mapImg.texture = mapTexture;
                this.onCacheMapTextture(mapTexture);
            }
            else {
                isLoading = true;
            }
        }
        else {
            mapImg.texture = null;
        }
        var loadingIndex = this.mapUrlLoadingList.indexOf(mapImg);
        if (loadingIndex >= 0) {
            this.mapUrlLoadingList.splice(loadingIndex, 1);
        }
        if (isLoading) {
            mapImg.texture = new MapTexture();
            mapImg.texture.url = mapUrl;
            this.mapUrlLoadingList.push(mapImg);
            this.onLoadingMapImgHandler(mapImg);
        }
    };
    MapLayer.prototype.onLoadingMapImgHandler = function (mapImg) {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        this.mapSmallImg.visible = true;
        //删除缓存机制
        var mapResUrl = mapImg.texture.url;
        if (this.mapUrlLoadedList.length > GameDefine.MapCache_MaxNum) {
            var cachekey = this.mapUrlLoadedList.shift();
            this.mapImgCache[cachekey] = null;
            delete this.mapImgCache[cachekey];
            cachekey = null;
        }
        this.loadingMapImg = mapImg;
        //开始进行加载
        RES.getResByUrl(mapResUrl, function (texture, url) {
            if (!texture) {
                if (SDKManager.getChannel() == EChannel.CHANNEL_WYCX) {
                    Tool.throwException("缺少地图块资源URL：" + url);
                }
            }
            else {
                texture.url = url;
                this.loadingMapImg.texture = texture;
                this.onCacheMapTextture(texture);
            }
            var loadIndex = this.mapUrlLoadingList.indexOf(this.loadingMapImg);
            this.mapUrlLoadingList.splice(loadIndex, 1);
            this.isLoading = false;
            if (this.mapUrlLoadingList.length > 0) {
                this.onLoadingMapImgHandler(this.mapUrlLoadingList[0]);
            }
            else {
                this.mapSmallImg.visible = false;
            }
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    MapLayer.prototype.onCacheMapTextture = function (texture) {
        var resUrl = texture.url;
        var cachekey = this.mapCacheKey(resUrl);
        if (!this.mapImgCache[cachekey]) {
            this.mapImgCache[cachekey] = texture;
            this.mapUrlLoadedList.push(cachekey);
        }
        else {
            var loadedIndex = this.mapUrlLoadedList.indexOf(cachekey);
            if (loadedIndex >= 0) {
                this.mapUrlLoadedList.splice(loadedIndex, 1);
                this.mapUrlLoadedList.push(cachekey);
            }
        }
    };
    MapLayer.prototype.mapCacheKey = function (mapUrl) {
        var cachekey = "";
        var startIndex = mapUrl.lastIndexOf("/map_");
        var endIndex = mapUrl.lastIndexOf(".jpg");
        cachekey = mapUrl.slice(startIndex + 4, endIndex);
        return cachekey;
    };
    /**地图层尺寸变化 */
    MapLayer.prototype.onResizeLayer = function () {
    };
    return MapLayer;
}(egret.DisplayObjectContainer));
__reflect(MapLayer.prototype, "MapLayer");
var MapTexture = (function (_super) {
    __extends(MapTexture, _super);
    function MapTexture() {
        return _super.call(this) || this;
    }
    return MapTexture;
}(egret.Texture));
__reflect(MapTexture.prototype, "MapTexture");
//# sourceMappingURL=MapLayer.js.map