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
     * 获取距离当前点最近的格子的位置
     */
    public getNearestRoad(grid: Grid): Grid {
        var result: Grid = Grid.NULL;
        return null;
    }

}