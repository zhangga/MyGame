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

    //更换方向
    protected updateDirection(): void {
        this.onUpdateAllBody();
    }

    //更新模型
    private onUpdateAllBody(): void {
        this.onChangeBody();
    }

    //更换人物模型
    private onChangeBody(): void {
        if (this.data) {
            // var actionName: string = this.getActionName();
            // var actionPlayNum: number = this.getActionPlayNum();
            // var resName: string = LoadManager.getInstance().getClothResUrl(this.data.cloth_res, actionName, this.getDirectionFrame());
            // if (this._action == ACTION.JUMP_OVER) {
            //     actionName = actionName + "_over";
            // } else if (this._action == ACTION.JUMP_FLY) {
            //     actionName = actionName + "_fly";
            // }
            // if (!this._body) {
            //     this._body = new BodyAnimation(resName, actionPlayNum, actionName, this.getDirectionFrame());
            //     // this._body.scaleX = 1.25;
            //     // this._body.scaleY = 1.25;
            // } else {
            //     this._body.onUpdateRes(resName, actionName, actionPlayNum, this.getDirectionFrame());
            // }
        }
    }

    public get data(): ArmyVo {
        return this._data;
    }

    public set data(armyVo: ArmyVo) {
        this._data = armyVo;
    }

}