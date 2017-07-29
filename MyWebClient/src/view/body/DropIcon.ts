class DropIcon extends egret.Sprite implements IModule {
	private _data: ModelAward;
	private _img: eui.Image;
	private isTouch: boolean = false;
	private cd: number = 2000;
	private value: number = 0;
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}
	private onTouchTap(): void {
		if (!this.isTouch) {
			egret.Tween.removeTweens(this);
			GameDispatcher.instance.dispatcherEventWith(FishTankEevent.DROP_TOUCH_EVENT, false, this);
			this.isTouch = true;
			if (this._data.type == GOODS_TYPE.GOLD) {
				this.value = UnitDefine.getTrueValue(this._data.num);
				DataManager.instance.playerM.player.addGold(this.value);
				GameDispatcher.instance.dispatcherEventWith(GameEvent.PLAYER_CURRENCY_UPDATE, false, this);
			}
		}
	}
	public set data(param) {
		this._data = param;
		this.onInit();
	}
	public get data() {
		return this._data;
	}
	public onInit(): void {
		this._img = new eui.Image();
		switch (this._data.type) {
			case GOODS_TYPE.EXP:
				this._img.source = `icon_drop_exp_png`;
				break;
			case GOODS_TYPE.GOLD:
				this._img.source = `icon_drop_gold_png`;
				break;
			case GOODS_TYPE.GEM:
				var model: ModelItem = ModelManager.instance.modelItem[this._data.id];
				this._img.source = `icon_drop_gem${model.icon}_png`;
				break;
			case GOODS_TYPE.CROWN:
				// var model: ModelItem = ModelManager.instance.modelItem[this._data.id];
				this._img.source = `icon_drop_crown0_png`;
				break;
		}
		this.addChild(this._img);
	}
	public onDestory() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
	public onRecycle(): void {
		if (!this.isTouch) {
			setTimeout(this.onTouchTap.bind(this), this.cd);
		}
	}
}