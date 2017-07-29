/**
 * 提示弹出框
 */
class AlertHint extends BaseWindowPanel {
	private btn_sure: eui.Button;
	private lab_hint: eui.Label;
	private btn_share: eui.Button;
	private bmpLab_num: eui.BitmapLabel;
	private img_turnplateIcon: eui.Image;
	private param: AlertHintParam;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.AlertHintSkin;
	}
	protected onInit(): void {
		this.setTitle("hint_title_png");
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSure, this);
		this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSure, this);
		this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
	}
	public onShowWithParam(param: AlertHintParam): void {
		this.param = param;
		this.onShow();
	}
	protected onRefresh(): void {
		var player = DataManager.instance.playerM.player;
		this.lab_hint.text = this.param.desc;
		this.bmpLab_num.text = `x${this.param.award.numFormat}`;
		var modelthing: ModelThing = GameCommon.instance.getThingModel(this.param.award.type, this.param.award.id);
		if (modelthing) {
			this.img_turnplateIcon.source = modelthing.icon;
		}
		this.btn_sure.enabled = true;
		//弹出框类型
		switch (this.param.type) {
			case ALERT_TYPE.NORMAL:
				this.currentState = "normal";
				break;
			case ALERT_TYPE.SHARE://分享
				this.currentState = "share";
				break;
			case ALERT_TYPE.COIN:
				this.currentState = "coin";
				break;
			case ALERT_TYPE.UNLOCK:
				this.btn_sure.enabled = player.getIsUnlockedAllFishByBook(this.param.eventParam - 1);
				this.currentState = "unlock";
				break;
		}
		//ICON显示
		if (this.param.title) {
			this.basic["panel_title"].source = this.param.title;
		}
	}
	private onClickSure(): void {
		//确定按钮响应事件
		if (this.param.gameEvent) {
			GameDispatcher.instance.dispatcherEventWith(this.param.gameEvent, false, this.param.eventParam);
		}
		this.onHide();
	}
	//分享处理
	private onShare(): void {
		SDKManager.share(new SDKShareContainer());
		this.onHide();
	}
}
/**
 * 提示弹出框参数
 */
class AlertHintParam {
	/**
	 * 弹出框类型 
	 * 0--默认，1--分享
	 */
	public type: number;
	//弹出框提示信息描述
	public desc: string;
	//物品信息
	public award: ModelAward;
	//标题图片
	private _title: string;
	//确定按钮响应的事件
	private _gameEvent: string;
	//响应事件携带的参数
	private _eventParam;
	public constructor(type: number, desc: string, award: ModelAward) {
		this.type = type;
		this.desc = desc;
		this.award = award;
	}
	public set title(title: string) {
		this._title = title;
	}
	public get title(): string {
		return this._title;
	}
	public set gameEvent(gameEvent: string) {
		this._gameEvent = gameEvent;
	}
	public get gameEvent(): string {
		return this._gameEvent;
	}
	public set eventParam(eventParam) {
		this._eventParam = eventParam;
	}
	public get eventParam() {
		return this._eventParam;
	}
}
enum ALERT_TYPE {
	NORMAL = 0,
	SHARE = 1,
	COIN = 2,
	UNLOCK = 3,
}