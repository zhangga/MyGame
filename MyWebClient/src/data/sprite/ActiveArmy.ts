/**
 * 军队
 */
class ActiveArmy extends ActiveSprite {

    private _data: ArmyVo;

    public constructor() {
        super();
    }

    public get data(): ArmyVo {
        return this._data;
    }

    public set data(armyVo: ArmyVo) {
        this._data = armyVo;
    }

}