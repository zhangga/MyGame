/**
 * 移动的基类
 */
abstract class BaseActive extends egret.DisplayObjectContainer {

    //移动路径
    public movePath: Array<egret.Point>;
    //目标点
    public moveTarget: egret.Point;
    //移动速度
    public moveSpeed: number = GameDefine.SPRITE_MOVE_SPEED;

    public constructor() {
        super();
    }

    //供子类覆盖
    protected getWidth(): number {
        return this.width;
    }
    //供子类覆盖
    protected getHeight(): number {
        return this.height;
    }

    //设置显示在地图上的位置
    public setPoint(point: egret.Point): void {
        this.x = point.x;
        this.y = point.y - this.getHeight();
    }

    //设置移动路径
    public setMovePath(gridPath: Array<Grid>): void {
        this.movePath = [];
        for (var i = 0; i < gridPath.length; i++) {
            this.movePath.push(gridPath[i].toPoint());
        }
        if (this.movePath && this.movePath.length > 0) {
            this.moveTarget = this.movePath.shift();
        }
        else {
            this.moveTarget = null;
        }
    }

    //是否在移动
    protected isMove(): boolean {
        return this.moveTarget != null;
    }

    //终止移动
    protected stopMove(): void {
        this.moveTarget = null;
        this.movePath = null;
    }

    //移动逻辑
    protected logicMove(): void {
        if (this.moveTarget) {
            var ldPoint: egret.Point = this.getLDPoint();
            var totalDis = egret.Point.distance(ldPoint, this.moveTarget);
            var moveDis = this.moveSpeed / 1000;
            if (moveDis < totalDis) {
                var pc = moveDis / totalDis;
                this.moveRun((this.moveTarget.x - ldPoint.x) * pc, (this.moveTarget.y - ldPoint.y) * pc);
            }
            else {
                this.moveFinsh();
            }
        }
    }

    //移动到moveTarget
    private moveFinsh(): void {
        this.setPoint(this.moveTarget);
        if (this.movePath && this.movePath.length > 0) {
            this.moveTarget = this.movePath.shift();
        }
        else {
            this.stopMove();
        }
    }

    //移动
    private moveRun(disx: number, disy: number): void {
        this.x = this.x + disx;
        this.y = this.y + disy;
    }

    //计算自身与目标距离
    public distanceToSprite(sprite: ActiveSprite): number {
        return egret.Point.distance(new egret.Point(this.x, this.y), new egret.Point(sprite.x, sprite.y));
    }

    //精灵本来的锚点在左上，即xy左边在左上
    //获取精灵左下对于地图的位置
    public getLDPoint(): egret.Point {
        var point: egret.Point = new egret.Point();
        point.x = this.x;
        point.y = this.y + this.getHeight();
        return point;
    }

}