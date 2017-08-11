var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//地图信息，处理地图逻辑
var MapInfo = (function () {
    function MapInfo() {
    }
    /**
     * 刷新地图信息
     */
    MapInfo.prototype.onRefreshMapInfo = function (mapId) {
        this.mapId = mapId;
        var modelMap = ModelManager.instance.modelMap[mapId];
        if (!modelMap) {
            Tool.throwException("缺少地图配置文件！MapId:" + mapId);
        }
        this.MAP_WIDTH = modelMap.width;
        this.MAP_HEIGHT = modelMap.height;
        this.camera = modelMap.camera;
        this.mapResId = modelMap.resource;
        this.mapMinX = size.width - this.MAP_WIDTH;
        this.mapMinY = size.height - this.MAP_HEIGHT;
        this.mapColNum = Math.ceil(this.MAP_WIDTH / GameDefine.MAP_GRID_WIDTH);
        this.mapRowNum = Math.ceil(this.MAP_HEIGHT / GameDefine.MAP_GRID_HEIGHT);
        //加载地图配置信息
        this.onLoadMapConfig();
    };
    /**
     * 加载地图配置信息
     */
    MapInfo.prototype.onLoadMapConfig = function () {
        var mapXmlRes = this.mapResId + "_map_xml";
        if (RES.getRes(mapXmlRes)) {
            this.loadingMapConfig(null, mapXmlRes);
        }
        else {
            RES.getResAsync(mapXmlRes, this.loadingMapConfig, this);
        }
    };
    /**读取地图配置 */
    MapInfo.prototype.loadingMapConfig = function (data, key) {
        if (!key)
            key = this.mapResId + "_map_xml";
        if (this.MapNodeXmlData) {
            for (var nodeId in this.MapNodeXmlData) {
                var cacheMapNode = this.MapNodeXmlData[nodeId];
                cacheMapNode = null;
                delete this.MapNodeXmlData[nodeId];
            }
        }
        else {
            this.MapNodeXmlData = {};
        }
        this.modelMapNodes = [];
        ModelManager.instance.parseXmlToModel(this.MapNodeXmlData, ModelMapNode, key);
    };
    /**
     * 获取缩略图的资源名称
     */
    MapInfo.prototype.getSmallMapSource = function () {
        return "map_" + this.mapId + "_small_jpg";
    };
    /**
     * 获取地图资源的路径
     */
    MapInfo.prototype.getMapResUrl = function (imgIndex) {
        return "resource/mapres/" + this.mapResId + "/map_" + this.mapResId + "_" + imgIndex + ".jpg";
    };
    return MapInfo;
}());
__reflect(MapInfo.prototype, "MapInfo");
var MAP_GRID_TYPE;
(function (MAP_GRID_TYPE) {
    MAP_GRID_TYPE[MAP_GRID_TYPE["NORMAL"] = 0] = "NORMAL";
    MAP_GRID_TYPE[MAP_GRID_TYPE["COLLSION"] = 1] = "COLLSION";
    MAP_GRID_TYPE[MAP_GRID_TYPE["JUMP"] = 2] = "JUMP";
    MAP_GRID_TYPE[MAP_GRID_TYPE["COVER"] = 3] = "COVER";
})(MAP_GRID_TYPE || (MAP_GRID_TYPE = {}));
//# sourceMappingURL=MapInfo.js.map