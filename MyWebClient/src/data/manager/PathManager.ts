/**
 * 寻路的管理器
 */
class PathManager {

    private static _instance: PathManager = null;
    public static get instance(): PathManager {
        if (!this._instance) {
            this._instance = new PathManager();
        }
        return this._instance;
    }
    private constructor() {

    }

    /**
     * 获取距离目标格子最近的道路格子的位置
     */
    public getNearestRoad(grid: Grid): Grid {
        //判断格子是否在道路上
        if (MapInfo.instance.isRoad(grid)) {
            return grid;
        }
        //找到距离目标格子最近的
        return MapInfo.instance.getNearestRoad(grid);
    }

    /**
     * 根据开始节点和终止节点搜索路径
     */
    public find(start: Grid, end: Grid): Array<Grid> {
        var finder: PathFinder = new PathFinder(start, end);
        var endGrid: PathGrid = finder.start();
        if (endGrid != null) {
            return endGrid.getPath();
        }
        else {
            return null;
        }
    }

}