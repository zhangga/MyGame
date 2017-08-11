/**
 * 地图上的格子
 */
class Grid {

    private _x: number;

    private _y: number;

    public constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    public static ZERO: Grid = new Grid(0, 0);
    public static NULL: Grid = new Grid(-10000, -10000);

    public add(add: Grid): Grid {
        var grid: Grid = new Grid();
        grid._x = this._x + add._x;
        grid._y = this._y + add._y;
        return grid;
    }

    public equal(grid: Grid): boolean {
        return this._x == grid._x && this._y == grid._y;
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