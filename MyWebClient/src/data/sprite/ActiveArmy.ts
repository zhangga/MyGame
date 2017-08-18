/**
 * 军队
 */
class ActiveArmy extends ActiveSprite {

    private _data: ArmyVo;

    public constructor() {
        super();
    }

    protected getHeight(): number {
        return GameDefine.ARMY_HEIGHT;
    }

    public initBodyLayer(): void {
        GameCommon.instance.addAnimation(this.bodyLayer, "soldier_1", new egret.Point(0, 0), -1, false);
    }

    public get data(): ArmyVo {
        return this._data;
    }

    public set data(armyVo: ArmyVo) {
        this._data = armyVo;
    }

}