class SecOutputAddAnim extends eui.Component implements IModule {
	private bmpLab_num: eui.BitmapLabel;
	private _data: InfiniteNumber;
	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
		this.skinName = skins.SecOutputAddAnimSkin;
	}
	private onLoadComplete(): void {
		if (this._data) {
			this.onInit();
		}
	}
	public set data(param: InfiniteNumber) {
		this._data = param;
		this.onInit();
	}
	public onInit() {
		this.bmpLab_num.text = this._data.toTextFormat();
	}
	public onDestory() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
}