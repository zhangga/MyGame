class LevelUpHint extends eui.Component implements IModule {
	// private img_icon: eui.Image;
	// private bmLab_add: eui.BitmapLabel;
	// private _data: ModelAward;
	// private value: number = 0;
	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
		this.skinName = skins.LevelUpHintSkin;
	}
	private onLoadComplete(): void {
		this.onInit();
	}
	// public set data(param: ModelAward) {
	// 	this._data = param;
	// 	this.onInit();
	// }
	public onInit() {
	}
	public onDestory() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
}