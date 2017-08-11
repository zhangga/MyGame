//地图信息，处理地图逻辑，单例
class MapInfo {

    /**当前地图ID */
    public mapId: number;
    /**地图宽 */
    public MAP_WIDTH: number;
    /**地图高 */
    public MAP_HEIGHT: number;
    /**地图初始摄像头位置 */
    public camera: Grid;
    /**地图可移动到的最小XY坐标 */
    public mapMinX: number;
    public mapMinY: number;
    //地图行列数
    public mapRowNum: number;
    public mapColNum: number;
    //当前地图资源ID
    public mapResId: number;

    //地图上所有的格子（包括XML中未配置的）
    private modelMapNodes: Array<ModelMapNode>;//数组更新需要彻底清除
    //XML中配置的道路节点信息
    public MapNodeXmlData;

    private static _instance: MapInfo = null;
    private constructor() { }
    public static get instance(): MapInfo {
        if (!this._instance) {
            this._instance = new MapInfo();
        }
        return this._instance;
    }

    /**
     * 刷新地图信息
     */
    public onRefreshMapInfo(mapId: number): void {
        this.mapId = mapId;
        var modelMap: ModelMap = ModelManager.instance.modelMap[mapId];
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
    }

    /**
     * 加载地图配置信息
     */
    private onLoadMapConfig(): void {
        var mapXmlRes: string = this.mapResId + "_map_xml";
        if (RES.getRes(mapXmlRes)) {
            this.loadingMapConfig(null, mapXmlRes);
        } else {
            RES.getResAsync(mapXmlRes, this.loadingMapConfig, this);
        }
    }

    private fullMapNode: boolean = false;
    /**读取地图配置 */
    private loadingMapConfig(data,key): void {
        if (!key)
            key = this.mapResId + "_map_xml";
        if (this.MapNodeXmlData) {
            for (var nodeId in this.MapNodeXmlData) {
                var cacheMapNode: ModelMapNode = this.MapNodeXmlData[nodeId];
                cacheMapNode = null;
                delete this.MapNodeXmlData[nodeId];
            }
        } else {
            this.MapNodeXmlData = {};
        }
        this.modelMapNodes = [];
        //读取XML中配置的地图信息
        ModelManager.instance.parseXmlToModel(this.MapNodeXmlData, ModelMapNode, key);
        //填充所有格子信息
        if (this.fullMapNode) {
            var _allGridNum: number = this.mapRowNum * this.mapColNum;
            for (var index: number = 0; index < _allGridNum; index++) {
                var currNodeId: number = this.getGridId(index+1);
                var _modelMapNode: ModelMapNode = this.MapNodeXmlData[currNodeId];
                if (!_modelMapNode) {
                    _modelMapNode = new ModelMapNode();
                    _modelMapNode.nodeType = MAP_GRID_TYPE.COLLSION;
                    _modelMapNode.nodeId = currNodeId;
                }
                _modelMapNode.colIndex = index % this.mapColNum;
                _modelMapNode.rowIndex = Math.floor(index / this.mapColNum);
                this.modelMapNodes.push(_modelMapNode);
            }
        }
        //计算配置的格子所在的行列数
        else {
            for (var nodeId in this.MapNodeXmlData) {
                var node: ModelMapNode = this.MapNodeXmlData[nodeId];
                var index: number = node.nodeId % GameDefine.MAP_GRID_MAX - 1;
                node.colIndex = index % this.mapColNum;
                node.rowIndex = Math.floor(index / this.mapColNum);
            }
        }
    }

    /**
     * 判断一个格子是否是道路
     */
    public isRoad(grid: Grid): boolean {
        for (var nodeId in this.MapNodeXmlData) {
            var node: ModelMapNode = this.MapNodeXmlData[nodeId];
            if (node.colIndex == grid.x && node.rowIndex == grid.y) {
                return node.nodeType == MAP_GRID_TYPE.NORMAL;
            }
        }
        return false;
    }

    /**
     * 找到距离格子最近的道路
     */
    public getNearestRoad(grid: Grid): Grid {
        var result: Grid = Grid.NULL;
        var min: number = -1;
        for (var nodeId in this.MapNodeXmlData) {
            var node: ModelMapNode = this.MapNodeXmlData[nodeId];
            //道路
            if (node.nodeType == MAP_GRID_TYPE.NORMAL) {
                var road: Grid = node.toGrid();
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
    }

    /**
     * 通过地图ID和格子索引获取格子的唯一ID
     */
    public getGridId(index: number): number {
        return this.mapId * GameDefine.MAP_GRID_MAX + index;
    }

    /**
     * 获取缩略图的资源名称
     */
    public getSmallMapSource(): string {
        return "map_" + this.mapId + "_small_jpg";
    }

    /**
     * 获取地图资源的路径
     */
    public getMapResUrl(imgIndex: number) {
        return "resource/mapres/" + this.mapResId + "/map_" + this.mapResId + "_" + imgIndex + ".jpg";
    }

}

enum MAP_GRID_TYPE {
    NORMAL = 0,//正常点
    COLLSION = 1,//碰撞点
    JUMP = 2,//跳跃点
    COVER = 3,//遮挡
}