
/**断线重连面板
 * @author	lzn
 * 
 * **/

class AlertDisconnect extends BaseWindowPanel {
	private param: AlertDisconnectParam;
	private lab_hint: eui.Label;
	private btn_connect: eui.Button;
	private btn_back: eui.Button;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
	public constructor(owner) {
		super(owner);
	}
	public onShowWithParam(param: AlertDisconnectParam): void {
		this.param = param;
		this.onShow();
	}
	protected onSkinName(): void {
		this.skinName = skins.AlertDisconnectSkin;
	}
	protected onInit(): void {
		super.onInit();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_connect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnConnect, this);
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnConnect, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_connect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnConnect, this);
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnConnect, this);
	}
	protected onRefresh(): void {
		this.lab_hint.text = Language.instance.getDescByKey(this.param.hint);
	}
	private onTouchBtnConnect(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_RELOGIN_EVENT, false);
	}
}
class AlertDisconnectParam {
	public state: number;
	public hint: string;
	public constructor(state?, hint?) {
		this.state = state;
		this.hint = hint;
	}
}
enum ALERT_DISCONNECT_STATE {
	TIMEOUT = 0,
	REPEAT = 1,
	SYNC_ERROR = 2,
}