var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//地图信息，处理地图逻辑，单例
var MapInfo = (function () {
    function MapInfo() {
        //XML中配置的道路节点信息
        this.MapNodeXmlData = {};
        //XML中配置的建筑信息
        this.MapBuildXmlData = {};
        this.fullMapNode = false;
    }
    Object.defineProperty(MapInfo, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new MapInfo();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
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
        var mapKey = this.getMapKey();
        if (RES.getRes(mapKey)) {
            this.loadingMapConfig(null, mapKey);
        }
        else {
            RES.getResAsync(mapKey, this.loadingMapConfig, this);
        }
        var buildKey = this.getBuildKey();
        if (RES.getRes(buildKey)) {
            this.loadingBuildConfig(null, buildKey);
        }
        else {
            RES.getResAsync(buildKey, this.loadingBuildConfig, this);
        }
    };
    /**读取地图配置 */
    MapInfo.prototype.loadingMapConfig = function (data, key) {
        key = this.getMapKey();
        var xmlDatas = [];
        this.modelMapNodes = [];
        this.MapNodeXmlData = {};
        //读取XML中配置的地图信息
        ModelManager.instance.parseXmlToModel(xmlDatas, ModelMapNode, key);
        //地图中配置的节点
        for (var i = 0; i < xmlDatas.length; i++) {
            var model = xmlDatas[i];
            this.MapNodeXmlData[model.grid.key] = model;
        }
        //填充所有格子信息
        if (this.fullMapNode) {
            for (var i = 0; i < this.mapRowNum; i++) {
                for (var j = 0; j < this.mapColNum; j++) {
                    var grid = new Grid(i, j);
                    var _modelMapNode = this.MapNodeXmlData[grid.key];
                    if (!_modelMapNode) {
                        _modelMapNode = new ModelMapNode();
                        _modelMapNode.grid = new Grid(i, j);
                        _modelMapNode.nodeType = MAP_GRID_TYPE.COLLSION;
                        _modelMapNode.areaIndex = 0;
                        this.modelMapNodes.push(_modelMapNode);
                    }
                }
            }
        }
    };
    /**读取建筑配置 */
    MapInfo.prototype.loadingBuildConfig = function (data, key) {
        key = this.getBuildKey();
        this.MapBuildXmlData = {};
        //读取XML中配置的地图信息
        ModelManager.instance.parseXmlToModel(this.MapBuildXmlData, ModelBuild, key);
    };
    /**
     * 判断一个格子是否在地图内
     */
    MapInfo.prototype.inMap = function (grid) {
        if (grid.x < 0 || grid.y < 0)
            return false;
        if (grid.x >= this.mapRowNum || grid.y >= this.mapColNum)
            return false;
        return true;
    };
    /**
     * 判断一个格子是否是道路
     */
    MapInfo.prototype.isRoad = function (grid) {
        if (!this.inMap(grid))
            return false;
        var node = this.MapNodeXmlData[grid.key];
        if (!node)
            return false;
        return node.isCanWalk;
    };
    /**
     * 找到距离格子最近的道路
     */
    MapInfo.prototype.getNearestRoad = function (grid) {
        var result = Grid.NULL;
        var min = -1;
        for (var key in this.MapNodeXmlData) {
            var node = this.MapNodeXmlData[key];
            //道路
            if (node.isCanWalk) {
                var road = node.grid;
                var dis = GameCommon.instance.distance(grid, road);
                if (min == -1) {
                    min = dis;
                    result = road;
                    continue;
                }
                if (dis < min) {
                    min = dis;
                    result = road;
                }
            }
        }
        return result;
    };
    /**
     * 将格子转换为Point
     */
    MapInfo.prototype.getPoint = function (grid) {
        var point = new egret.Point();
        point.x = grid.x * GameDefine.MAP_GRID_HEIGHT;
        point.y = grid.y * GameDefine.MAP_GRID_WIDTH;
        return point;
    };
    /**
     * 已过时
     * 通过地图ID和格子索引获取格子的唯一ID
     */
    MapInfo.prototype.getGridId = function (index) {
        return this.mapId * GameDefine.MAP_GRID_MAX + index;
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
    MapInfo.prototype.getMapKey = function () {
        return this.mapResId + "_map_xml";
    };
    MapInfo.prototype.getBuildKey = function () {
        return this.mapResId + "_build_xml";
    };
    return MapInfo;
}());
MapInfo._instance = null;
__reflect(MapInfo.prototype, "MapInfo");
//# sourceMappingURL=MapInfo.js.map