/**
 * 地图上的格子，索引从0开始
 */
class Grid {

    //格子所在的行 从0开始
    private _x: number;

    //格子所在的列 从0开始
    private _y: number;

    public constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    public static ZERO: Grid = new Grid(0, 0);
    public static NULL: Grid = new Grid(-10000, -10000);

    /**
     * Grid的对象的KEY
     */
    public get key(): string {
        return this._x+","+this._y;
    }

    public add(add: Grid): Grid {
        var grid: Grid = new Grid();
        grid._x = this._x + add._x;
        grid._y = this._y + add._y;
        return grid;
    }

    public equal(grid: Grid): boolean {
        return this._x == grid._x && this._y == grid._y;
    }

    /**
     * 获取格子左下对应地图上的点
     */
    public toPoint(): egret.Point {
        var point: egret.Point = new egret.Point();
        point.x = this._y * GameDefine.MAP_GRID_WIDTH;
        point.y = (this._x+1) * GameDefine.MAP_GRID_HEIGHT;
        return point;
    }

    public getDirGrid(type: DIRECTION): Grid {
        var dir: Grid = null;
        switch (type) {
            case DIRECTION.LEFT:
                dir = new Grid(this._x, this._y-1);
                break;
            case DIRECTION.RIGHT:
                dir = new Grid(this._x, this._y+1);
                break;
            case DIRECTION.UP:
                dir = new Grid(this._x-1, this._y);
                break;
            case DIRECTION.DOWN:
                dir = new Grid(this._x+1, this._y);
                break;
            case DIRECTION.LEFT_UP:
                dir = new Grid(this._x-1, this._y-1);
                break;
            case DIRECTION.RIGHT_UP:
                dir = new Grid(this._x-1, this._y+1);
                break;
            case DIRECTION.LEFT_DOWN:
                dir = new Grid(this._x+1, this._y-1);
                break;
            case DIRECTION.RIGHT_DOWN:
                dir = new Grid(this._x+1, this._y+1);
                break;
        }
        return dir;
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
    }

}

enum MAP_GRID_TYPE {
    NORMAL = 0,//正常点
    COLLSION = 1,//碰撞点
    JUMP = 2,//跳跃点
    COVER = 3,//遮挡
}