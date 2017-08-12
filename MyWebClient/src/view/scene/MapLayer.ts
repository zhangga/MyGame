//地图管理层
class MapLayer extends egret.DisplayObjectContainer {

    private _mainScene: MainScene;
    //单例的引用
    private currMapInfo: MapInfo;

    //地图图片列、行数
    private mapImgColNum: number;
    private mapImgRowNum: number;

    //整个地图层
    private _mapLayer: egret.DisplayObjectContainer;
    //地图资源容器
    private _resLayer: egret.DisplayObjectContainer;
    private _bottomLayer: egret.DisplayObjectContainer;
    private _bodyLayer: egret.DisplayObjectContainer;
    //地图资源的引用
    private mapSmallImg: eui.Image;
    private mapResImgs: eui.Image[];

    public constructor(mainScene: MainScene) {
        super();
        this._mainScene = mainScene;
        this.onInit();
    }

    private onInit(): void {
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
        for (var row: number = 0; row < this.mapImgColNum; row++) {
            for (var col: number = 0; col < this.mapImgRowNum; col++) {
                var _mapImg: eui.Image = new eui.Image();
                this._resLayer.addChild(_mapImg);
                this.mapResImgs.push(_mapImg);
            }
        }
        //地图初始位置
        this._mapLayer.x = 0;
        this._mapLayer.y = 0;
        //整个地图层的拖动
        this._mapLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this._mapLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);

        //DELETE
        this.onRefreshMap();
    }

    public onRefreshMap() {
        this.currMapInfo = MapInfo.instance;
        this.currMapInfo.onRefreshMapInfo(1);
        //把地图放大成整个地图的大小
        this.mapSmallImg.source = this.currMapInfo.getSmallMapSource();
        this.mapSmallImg.width = this.currMapInfo.MAP_WIDTH;
        this.mapSmallImg.height = this.currMapInfo.MAP_HEIGHT;

        //DELETE
        var catImg = new eui.Image();
        catImg.source = "build_city_1_png";
        catImg.x = 300;
        catImg.y = 500;
        this._bodyLayer.addChild(catImg);
        catImg.addEventListener(egret.TouchEvent.TOUCH_TAP, function(evt: egret.TouchEvent) {
            PathManager.instance.find(new Grid(1, 1), new Grid(2, 3));
        }, this);
    }

    //地图层当前触摸状态，按下时，值为true
    private _touchStatus: boolean = false;
    //鼠标点击时，鼠标全局坐标与地图层的位置差
    private _distance: egret.Point = new egret.Point();
    private mouseDown(evt: egret.TouchEvent): void {
        this._touchStatus = true;
        this._distance.x = evt.stageX - this._mapLayer.x;
        this._distance.y = evt.stageY - this._mapLayer.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseUp(evt: egret.TouchEvent): void {
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt: egret.TouchEvent): void {
        if( this._touchStatus )
        {
            this._mapLayer.x = evt.stageX - this._distance.x;
            this._mapLayer.y = evt.stageY - this._distance.y;
            //地图边界检测
            if (this._mapLayer.x > 0)
                this._mapLayer.x = 0;
            else if (this._mapLayer.x < this.currMapInfo.mapMinX)
                this._mapLayer.x = this.currMapInfo.mapMinX;
            if (this._mapLayer.y > 0)
                this._mapLayer.y = 0;
            else if (this._mapLayer.y < this.currMapInfo.mapMinY)
                this._mapLayer.y = this.currMapInfo.mapMinY;
            //移动地图资源
            this.moveMapResLayer();
        }
    }

    /**移动地图资源刷新 */
    private moveMapResLayer(): void {
        var minPosX: number = (-this._mapLayer.x) - GameDefine.MapRes_Width * GameDefine.MapRes_RelaodNum;
        var minPosY: number = (-this._mapLayer.y) - GameDefine.MapRes_Height * GameDefine.MapRes_RelaodNum;
        var _startCol: number = Math.floor(minPosX / GameDefine.MapRes_Width);
        var _startRow: number = Math.floor(minPosY / GameDefine.MapRes_Height);
        var index: number = 0;
        //拼接地图块
        for (var row: number = _startRow; row < _startRow + this.mapImgRowNum; row++) {
            for (var col: number = _startCol; col < _startCol + this.mapImgColNum; col++) {
                var _mapImg: eui.Image = this.mapResImgs[index];
                _mapImg.x = col * GameDefine.MapRes_Width;
                _mapImg.y = row * GameDefine.MapRes_Height;
                this.onLoadMapImage(_mapImg);
                index++;
            }
        }
    }

    private mapUrlLoadingList: eui.Image[];//正在加载的Image列表
    //缓存地图的textture
    private mapImgCache = {};//缓存地图的texttrue 如果存的是Image等于正在加载此对象
    private mapUrlLoadedList: string[] = [];//已加载成功的 地图URL列表
    /**地图加载**/
    private onLoadMapImage(mapImg: eui.Image): void {
        if (!this.mapUrlLoadingList)
            this.mapUrlLoadingList = [];

        var isLoading: boolean = false;
        if (mapImg.x >= 0 && mapImg.y >= 0 && mapImg.x < this.currMapInfo.MAP_WIDTH && mapImg.y < this.currMapInfo.MAP_HEIGHT) {
            var col: number = Math.floor(mapImg.x / GameDefine.MapRes_Width);
            var row: number = Math.floor(mapImg.y / GameDefine.MapRes_Height);
            //对应的图片编号
            var imgIndex: number = row * Math.ceil(this.currMapInfo.MAP_WIDTH / GameDefine.MapRes_Width) + col + 1;
            var mapUrl: string = this.currMapInfo.getMapResUrl(imgIndex);
            var cachekey: string = this.mapCacheKey(mapUrl);
            if (mapImg.texture && (mapImg.texture as MapTexture).url == mapUrl)
                return;
            var mapTexture: MapTexture = this.mapImgCache[cachekey];
            if (mapTexture) {
                mapImg.texture = mapTexture;
                this.onCacheMapTextture(mapTexture);
            } else {
                isLoading = true;
            }
        } else {
            mapImg.texture = null;
        }
        var loadingIndex: number = this.mapUrlLoadingList.indexOf(mapImg);
        if (loadingIndex >= 0) {
            this.mapUrlLoadingList.splice(loadingIndex, 1);
        }
        if (isLoading) {
            mapImg.texture = new MapTexture();
            (mapImg.texture as MapTexture).url = mapUrl;
            this.mapUrlLoadingList.push(mapImg);
            this.onLoadingMapImgHandler(mapImg);
        }
    }

    /**地图资源加载逻辑 */
    private loadingMapImg: eui.Image;
    private isLoading: boolean;
    private onLoadingMapImgHandler(mapImg: eui.Image): void {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        this.mapSmallImg.visible = true;
        //删除缓存机制
        var mapResUrl: string = (mapImg.texture as MapTexture).url;
        if (this.mapUrlLoadedList.length > GameDefine.MapCache_MaxNum) {
            var cachekey: string = this.mapUrlLoadedList.shift();
            this.mapImgCache[cachekey] = null;
            delete this.mapImgCache[cachekey];
            cachekey = null;
        }
        this.loadingMapImg = mapImg;
        //开始进行加载
        RES.getResByUrl(mapResUrl, function (texture: MapTexture, url: string) {
            if (!texture) {
                if (SDKManager.getChannel() == EChannel.CHANNEL_WYCX) {
                    Tool.throwException("缺少地图块资源URL：" + url);
                }
            } else {
                texture.url = url;
                this.loadingMapImg.texture = texture;
                this.onCacheMapTextture(texture);
            }
            var loadIndex: number = this.mapUrlLoadingList.indexOf(this.loadingMapImg);
            this.mapUrlLoadingList.splice(loadIndex, 1);
            this.isLoading = false;

            if (this.mapUrlLoadingList.length > 0) {
                this.onLoadingMapImgHandler(this.mapUrlLoadingList[0]);
            } else {
                this.mapSmallImg.visible = false;
            }
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }

    private onCacheMapTextture(texture: MapTexture): void {
        var resUrl: string = texture.url;
        var cachekey: string = this.mapCacheKey(resUrl);
        if (!this.mapImgCache[cachekey]) {
            this.mapImgCache[cachekey] = texture;
            this.mapUrlLoadedList.push(cachekey);
        } else {
            var loadedIndex: number = this.mapUrlLoadedList.indexOf(cachekey);
            if (loadedIndex >= 0) {
                this.mapUrlLoadedList.splice(loadedIndex, 1);
                this.mapUrlLoadedList.push(cachekey);
            }
        }
    }

    private mapCacheKey(mapUrl: string): string {
        var cachekey: string = "";
        var startIndex: number = mapUrl.lastIndexOf("/map_");
        var endIndex: number = mapUrl.lastIndexOf(".jpg");
        cachekey = mapUrl.slice(startIndex + 4, endIndex);
        return cachekey;
    }

    /**地图层尺寸变化 */
    public onResizeLayer(): void {

    }

}

class MapTexture extends egret.Texture {
    public url: string;
    public constructor() {
        super();
    }
}