class MainUpgradeItem extends BaseComp {
	private it: egret.Timer;
	private isPlay: boolean = false;
	private item: UpgradeItem;
	private maskLayer: eui.Group;
	private point: egret.Point = new egret.Point();
	public constructor() {
		super();
		this.skinName = skins.MainUpgradeItemSkin;
	}
	protected onLoadComplete(): void {
		super.onLoadComplete();
		if (!this.it) {
			this.it = new egret.Timer(3000, 1);
			this.it.addEventListener(egret.TimerEvent.TIMER, this.onHideItem, this);
			this.it.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
		}
		this.item.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpgrade, this);
		var shap: egret.Shape = new egret.Shape();
		shap.graphics.beginFill(0xFFFFFF);
		shap.graphics.drawRect(0, 0, this.maskLayer.width, this.maskLayer.height);
		shap.graphics.endFill();
		this.maskLayer.addChild(shap);
		this.item.mask = this.maskLayer;
	}
	protected onInit() {
		this.item.data = this._data;
		this.it.reset();
		this.it.repeatCount = 1;
		this.it.start();
		if (this.isPlay) {
			if (this.point.y == -100) {
				egret.Tween.removeTweens(this.item);
				this.onShowItem();
			}
		} else {
			this.onShowItem();
		}
	}
	private onShowItem(): void {
		this.point.x = 0;
		this.point.y = 0;
		this.isPlay = true;
		TweenLiteUtil.beelineTween(this.item, this.onDone, this, this.point, egret.Ease.cubicIn, 200);
	}
	private onHideItem(): void {
		this.point.x = 0;
		this.point.y = -100;
		this.isPlay = true;
		TweenLiteUtil.beelineTween(this.item, this.onDone, this, this.point, egret.Ease.cubicOut, 200);
	}
	private onDone(): void {
		this.isPlay = false;
	}
	private timerComFunc() {
		// console.log("计时结束");
	}
	private onTouchUpgrade() {
		this.onInit();
	}
}