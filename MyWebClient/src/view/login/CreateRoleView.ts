class CreateRoleView extends BaseUI {
	private lab_name: eui.Label;
	private btn_start: eui.Button;
	public constructor() {
		super();
		this.skinName = skins.CreateRoleViewSkin;

	}
	protected onRegist(): void {
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
	}
	protected onRemove(): void {
		this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
	}
	public onRefresh(): void {
	}
	private onTouchBtn(): void {
		GameDispatcher.instance.addEventListener(GameEvent.GAME_CREATE_ROLE, this.onCreateSuccess, this);
		DataManager.instance.loginM.onSendCreateMessage(this.lab_name.text);
	}

	 public onCreateSuccess(): void {
		egret.log("onCreateSuccess");
		SDKManager.onCreateRole(DataManager.instance.playerM.player);
	}
}