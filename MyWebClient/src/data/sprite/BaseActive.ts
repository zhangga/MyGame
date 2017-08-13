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

    //设置移动路径
    public setMovePath(gridPath: Array<Grid>): void {
        this.movePath = [];
        var mapInfo: MapInfo = MapInfo.instance;
        for (var i = 0; i < gridPath.length; i++) {
            this.movePath.push(mapInfo.getPoint(gridPath[i]));
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
            var totalDis = egret.Point.distance(new egret.Point(this.x, this.y), this.moveTarget);
            var moveDis = this.moveSpeed / 1000;
            if (moveDis < totalDis) {
                var pc = moveDis / totalDis;
                this.moveRun((this.moveTarget.x - this.x) * pc, (this.moveTarget.y - this.y) * pc);
            }
            else {
                this.moveFinsh();
            }
        }
    }

    //移动到moveTarget
    private moveFinsh(): void {
        this.x = this.moveTarget.x;
        this.y = this.moveTarget.y;
        if (this.movePath && this.movePath.length > 0) {
            this.moveTarget = this.movePath.shift();
        }
        else {
            this.stopMove();
        }
    }

    //移动
    private moveRun(disx: number, disy: number): void {
        this.x += disx;
        this.y += disy;
    }

    //计算自身与目标距离
    public distanceToSprite(sprite: ActiveSprite): number {
        return egret.Point.distance(new egret.Point(this.x, this.y), new egret.Point(sprite.x, sprite.y));
    }

}