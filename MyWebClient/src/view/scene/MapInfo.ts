//地图信息，处理地图逻辑
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

    private modelMapNodes: Array<ModelMapNode>;//数组更新需要彻底清除
    public MapNodeXmlData;

    public constructor() {

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
        ModelManager.instance.parseXmlToModel(this.MapNodeXmlData, ModelMapNode, key);
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