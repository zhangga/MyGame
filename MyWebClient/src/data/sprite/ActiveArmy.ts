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

    public get data(): ArmyVo {
        return this._data;
    }

    public set data(armyVo: ArmyVo) {
        this._data = armyVo;
    }

}