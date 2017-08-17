/**
 * 军队
 */
class ActiveArmy extends ActiveSprite {

    private _data: ArmyVo;

    public constructor() {
        super();
    }

    public initBodyLayer(): void {
        var img: eui.Image = new eui.Image();
        img.source = "build_city_1_png";
        this.bodyLayer.addChild(img);
    }

    //设置显示在地图上的位置
    public setPoint(point: egret.Point): void {
        this.x = point.x - GameDefine.ARMY_WIDTH;
        this.y = point.y - GameDefine.ARMY_HEIGHT;
    }

    public get data(): ArmyVo {
        return this._data;
    }

    public set data(armyVo: ArmyVo) {
        this._data = armyVo;
    }

}