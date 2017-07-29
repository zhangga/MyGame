/**
 * 飘动提示
 * 
 * 
 * **/
class FlutterHint extends eui.Component implements IModule {
	private img_icon: eui.Image;
	private bmLab_add: eui.BitmapLabel;
	private _data: ModelAward;
	private value: number = 0;
	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
		this.skinName = skins.FlutterHintSkin;
	}
	private onLoadComplete(): void {
		this.onInit();
	}
	public set data(param: ModelAward) {
		this._data = param;
		this.onInit();
	}
	public onInit() {
		if (!this._data) return;
		switch (this._data.type) {
			case GOODS_TYPE.EXP:
				this.img_icon.source = `icon_hint_exp_png`;
				break;
			case GOODS_TYPE.GOLD:
				this.img_icon.source = `icon_hint_gold_png`;
				break;
			case GOODS_TYPE.GEM:
				var model: ModelItem = ModelManager.instance.modelItem[this._data.id];
				this.img_icon.source = `icon_hint_gem${model.icon}_png`;
				break;
		}
		var value: number = this._data.num;
		this.bmLab_add.text = `+${UnitDefine.getTrueInfinite(value).toTextFormat()}`;
		switch (this._data.type) {
			case GOODS_TYPE.GOLD:
				this.value = UnitDefine.getTrueValue(this._data.num);
				DataManager.instance.playerM.player.addGoldAndUpgrade(this.value);
				break;
		}
	}
	public onDestory() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
}