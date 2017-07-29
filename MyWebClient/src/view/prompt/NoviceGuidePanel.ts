class NoviceGuidePanel extends egret.DisplayObjectContainer {
	private touchLayer: eui.Group;
	private animLayer: eui.Group;
	private count: number = 0;
	private _progress: number = 0;//新手引导的进度
	private isShow: boolean = false;
	private guideAnim: Animation;
	private touchdisplayObj: egret.DisplayObject;

	public constructor() {
		super();
		this.onInit();
	}
	private onInit(): void {
		this.touchLayer = new eui.Group();
		this.touchLayer.width = 600;
		this.touchLayer.height = 1067;
		this.touchLayer.touchEnabled = true;
		// this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClick, this);
		this.addChild(this.touchLayer);

		this.animLayer = new eui.Group();
		this.animLayer.width = 200;
		this.animLayer.height = 300;
		this.animLayer.touchEnabled = true;
		this.animLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGuide, this);
		this.addChild(this.animLayer);

		var _fishData: FishData = this.player.getFishByID(5001);
		if (_fishData.lv > 1)
			this._progress++;
		_fishData = this.player.getFishByID(5002);
		if (_fishData)
			this._progress += 4;
		this.onCheckHasGuide();
	}
	private onTouchClick(event: egret.Event): void {
		++this.count;
		if (this.count > 2) {
			this.closeGuide();
		}
	}
	public showGuide(touchobj: egret.DisplayObject): void {
		if (!touchobj)
			return;
		if (this.isShow)
			return;

		this.isShow = true;
		this.count = 0;
		this.touchdisplayObj = touchobj;
		switch (this._progress) {
			case GUIDE_TYPE.UPLEVEL:
				this.onCreateGuide(390, 675);
				break;
			case GUIDE_TYPE.OPENFISH:
				this.onCreateGuide(200, 808);
				break;
			case GUIDE_TYPE.OPENSHARE:
				this.onCreateGuide(200, 685);
				break;
			case GUIDE_TYPE.TURNPLATE:
				this.onCreateGuide(460, 120);
				break;
			case GUIDE_TYPE.INVITEGIFT:
				this.onCreateGuide(460, 50);
				break;
			default:
				return;
		}
		PromptPanel.getInstance().addChild(this);
	}
	private onCreateGuide(x, y): void {
		this.guideAnim = GameCommon.instance.addAnimation(this.animLayer, "xinshouyindao", new egret.Point(100, 120), -1, false);
		this.guideAnim.scaleX = 0.6;
		this.guideAnim.scaleY = 0.6;
		this.animLayer.x = x;
		this.animLayer.y = y;
	}
	private closeGuide(): void {//关闭引导
		this._progress++;
		this.onCheckHasGuide();
		if (this.parent) {
			this.parent.removeChild(this);
		}
		if (this.guideAnim) {
			this.guideAnim.onDestroy();
			this.guideAnim = null;
		}
		this.isShow = false;
	}
	private touchGuide(): void {
		if (this.touchdisplayObj) {
			this.touchdisplayObj.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
			this.touchdisplayObj = null;
		}
		this.closeGuide();
	}
	public get guideIndex(): number {
		return PromptPanel.getInstance().guideIsShow ? this._progress : -1;
	}
	private get player(): Player {
		return DataManager.instance.playerM.player;
	}
	private onCheckHasGuide(): void {
		if (this._progress >= GUIDE_TYPE.SIZE) {//全部引导已完成
			PromptPanel.getInstance().guideIsShow = false;
		} else {
			PromptPanel.getInstance().guideIsShow = true;
		}
	}
}
enum GUIDE_TYPE {
	UPLEVEL = 0,//升级鱼
	OPENFISH = 1,//解锁鱼
	OPENSHARE = 2,//解锁分享
	TURNPLATE = 3,//转盘
	INVITEGIFT = 4,//赚钻石
	SIZE = 5,//长度
}