class LoginSevenPanel extends BaseWindowPanel {
	private btn_back: eui.Button;
	private itemGrp: eui.Group;

	private loginItems: LoginSevenItem[];

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.LoginSevenPanelSkin;
	}
	protected onInit(): void {
		this.loginItems = [];
		for (var i: number = 0; i < ModelManager.instance.modelSevenLogin.length; i++) {
			var item: LoginSevenItem = new LoginSevenItem();
			this.itemGrp.addChild(item);
			this.loginItems.push(item);
		}
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		// GameCommon.getInstance().addMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
		// GameDispatcher.getInstance().addEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		// GameCommon.getInstance().removeMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
		// GameDispatcher.getInstance().removeEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
	}
	protected onRefresh(): void {
		super.onRefresh();
	}
}
class LoginSevenItem extends eui.Component {
	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onInit, this);
		this.skinName = skins.LoginSevenItemSkin;
	}

	private onInit(): void {
		
	}

	public onUpdate(): void {

	}
}