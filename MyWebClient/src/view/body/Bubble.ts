class Bubble extends egret.Sprite {
	private _bubble: Animation;
	private imgLayer: eui.Group;
	private res: string;
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	//添加到舞台
	private onAddToStage(): void {
		// this.onInit();
	}
	private onInit() {
		this.res = "paopao_1";
		this._bubble = new Animation("paopao_1");

		this.imgLayer = new eui.Group();
		this.imgLayer.horizontalCenter = 0;
		this.imgLayer.verticalCenter = 0;
		this.imgLayer.addChild(this._bubble);
		this.addChild(this.imgLayer);
	}
	public onReSetRes(res: string, pos: egret.Point = new egret.Point(), size: number = 1) {
		if (res == this.res) return;
		if (!this._bubble) {
			this.onInit();
		}
		this.res = res;
		this._bubble.onUpdateRes(res);
		this._bubble.x = pos.x;
		this._bubble.y = pos.y;
		this._bubble.scaleX = this._bubble.scaleY = size;
	}
	public onDestroy(): void {
		if (this._bubble) {
			this._bubble.onDestroy();
			this._bubble = null;
		}
		if (this.parent) {
			this.parent.removeChild(this);
		}

	}
}