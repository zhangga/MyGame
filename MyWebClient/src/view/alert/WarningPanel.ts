class WarningPanel extends BaseWindowPanel {
	private btn_sure: eui.Button;
	private btn_cancel: eui.Button;
	private btnBack: eui.Button;
	private labelAlert: eui.Label;
	private param: WarningParam;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

	public constructor(owner: ModuleLayer) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.WarnPanelSkin;
	}
	protected onInit(): void {
		super.onInit();
		this.onRefresh();
	}
	protected onRefresh(): void {
		var alertTxt: string = GameCommon.instance.readStringToHtml(this.param.texts);
		alertTxt = alertTxt.replace(/\\n/g, "\n");
		this.labelAlert.textFlow = (new egret.HtmlTextParser).parser(alertTxt);
	}
	public onEventOk() {
		this.onEventBack();
		egret.callLater(this.param.callback, this.param.target, this.param.param);
	}

	public onShowWithParam(param: WarningParam): void {
		this.param = param;
		this.onShow();
	}
	public onShow() {
		super.onShow();
	}

	public onEventBack() {
		this.onHide();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventOk, this);
		this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
		this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventOk, this);
		this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
		this.btn_cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
	}
}
class WarningParam {
	public callback;
	public target;
	public param;
	public texts;
	public constructor(texts, callback, target, param = null) {
		this.callback = callback;
		this.target = target;
		this.param = param;
		this.texts = texts;
	}
}