/**
 * 寻径中的过程对象
 */
class PathGrid {

    //当前格子
    public grid: Grid;

    //前一个格子坐标
    private before: PathGrid;

    //下一个格子坐标
    public nextRoadList: Array<Grid> = [];

    //当前格子距离目的地的权重
    private _stepValue: number;

    //目的地的权重值
    public get stepValue(): number {
        return this._stepValue;
    }

    public constructor(curr: Grid, end: Grid) {
        this.grid = curr;
        this._stepValue = Math.abs(this.grid.x - end.x) + Math.abs(this.grid.y - end.y);
        this.initNextRoad();
    }

    /**
     * 初始化相邻道路
     */
    private initNextRoad(): void {
        //左格子
        var left: Grid = this.grid.getDirGrid(DIRECTION.LEFT);
        if (MapInfo.instance.isRoad(left))
            this.nextRoadList.push(left);
        //右格子
        var right: Grid = this.grid.getDirGrid(DIRECTION.RIGHT);
        if (MapInfo.instance.isRoad(right))
            this.nextRoadList.push(right);
        //上格子
        var up: Grid = this.grid.getDirGrid(DIRECTION.UP);
        if (MapInfo.instance.isRoad(up))
            this.nextRoadList.push(up);
        //下格子
        var down: Grid = this.grid.getDirGrid(DIRECTION.DOWN);
        if (MapInfo.instance.isRoad(down))
            this.nextRoadList.push(down);
    }

    //设置前置节点,同时从连接节点中剔除前置节点
    public setBefore(b: PathGrid): void {
        this.before = b;
        for (var i = 0; i < this.nextRoadList.length; i++) {
            var obj: Grid = this.nextRoadList[i];
            if (obj.equal(this.before.grid)) {
                this.nextRoadList.splice(i, 1);
                return;
            }
        }
    }

    //是否到达目的地
    public isFinal(end: Grid): boolean {
        return this.grid.equal(end);
    }

    //如果这个节点是终点 则可以计算出整条路径
    public getPath(): Array<Grid> {
        var endList: Array<Grid> = [];
        this.calPath(endList);
        return endList;
    }

    private calPath(list: Array<Grid>): void {
        if (this.before) {
            this.before.calPath(list);
            list.push(this.grid);
        }
    }

}
