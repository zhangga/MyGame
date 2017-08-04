class LoginView extends BaseUI {
	private loginLayer: eui.Group;
	private tInp: eui.TextInput;
	private btn_login: eui.Button;
	public constructor() {
		super();
		this.skinName = skins.LoginViewSkin;
	}
	//供子类覆盖
	protected onInit(): void {
		var account = SDKManager.loginInfo.account;
		if (account || ChannelDefine.isPublish) {
			this.loginLayer.visible = false;
			DataManager.instance.loginM.onSendLoginMessage();
		} else {
			this.loginLayer.visible = true;
			this.tInp.text = window.localStorage.getItem("wycxaccount");
		}

	}
	protected onRegist(): void {
		this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.GAME_LOGON_MESSAGE.toString(), this.onLoginSucceed, this);
	}
	protected onRemove(): void {
		this.btn_login.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.GAME_LOGON_MESSAGE.toString(), this.onLoginSucceed, this);
	}

	private onLoginSucceed(): void {
		this.loginLayer.visible = false;
	}
	public onDestroy(): void {
		super.onDestory();
		this.parent.removeChild(this);
	}
	private onTouchBtn(): void {
		if (this.tInp.text && this.tInp.text != "") {
			DataManager.instance.account = this.tInp.text;
			DataManager.instance.loginM.onSendLoginMessage();
		}
		window.localStorage.setItem("wycxaccount", this.tInp.text);
	}
}