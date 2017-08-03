class MainScene extends egret.DisplayObjectContainer {
	public static state: number;
	public sceneLayer: egret.DisplayObjectContainer;
	public promptLayer: egret.DisplayObjectContainer;
	private layer: ModuleLayer;
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(): void {
		this.onRegist();
		//场景层
		this.sceneLayer = new egret.DisplayObjectContainer();
		//提示层
		this.promptLayer = new egret.DisplayObjectContainer();
		this.addChild(this.sceneLayer);
		this.addChild(this.promptLayer);
		this.promptLayer.addChild(PromptPanel.getInstance());
		this.onChangeState();
	}
	//供子类覆盖
	public onChangeState(): void {
		this.sceneLayer.removeChildren();
		if (_GF.instance.isDemo) {
			MainScene.state = MAINSCENE_STATE.GAME;
		}
		switch (MainScene.state) {
			case MAINSCENE_STATE.LOGIN:
				var login = new LoginView();
				this.sceneLayer.addChild(login);
				break;
			case MAINSCENE_STATE.CREATE:
				//玩吧建角
				if(DataManager.instance.channel == EChannel.CHANNEL_WANBA){
					DataManager.instance.loginM.onSendCreateMessage(SDKManager.loginInfo.nickName);
				}else{
					var create = new CreateRoleView();
					this.sceneLayer.addChild(create);
				}
				break;
			case MAINSCENE_STATE.GAME:
				if (!this.layer) {
					this.layer = new ModuleLayer();
				} else {
					this.layer.onReset();
				}
				this.sceneLayer.addChild(this.layer);
				break;
		}
	}
	public onRegist(): void {
		GameDispatcher.instance.addEventListener(MESSAGE_ID.GAME_LOGON_MESSAGE.toString(), this.onLoginSucceed, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.CREATE_ROLE_MESSAGE.toString(), this.onGameSucceed, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.LOGIN_SERVER_MESSAGE.toString(), this.onEnterSucceed, this);
		GameDispatcher.instance.addEventListener(GameEvent.GAME_RELOGIN_EVENT, this.onLoginSucceed, this);
	}
	public onLoginSucceed(): void {
		_GF.instance.netChanel = NET_CHANNEL.GAME;
		_GF.instance.net.setUrl(DataManager.instance.loginM.gameURL, NET_CHANNEL.GAME);
		DataManager.instance.loginM.onSendLoginServMessage();
	}

	private onGameSucceed(): void {
		MainScene.state = MAINSCENE_STATE.CREATE;
		this.onChangeState();
	}
	private onEnterSucceed(): void {
		MainScene.state = MAINSCENE_STATE.GAME;
		this.onChangeState();
	}
	private onErrorHandler(): void {

	}

}
enum MAINSCENE_STATE {
	LOGIN = 0,
	CREATE = 1,
	GAME = 2
}