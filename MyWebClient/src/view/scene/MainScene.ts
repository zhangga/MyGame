class MainScene extends egret.DisplayObjectContainer {
	public static state: number;
	private sceneLayer: egret.DisplayObjectContainer;
	public promptLayer: egret.DisplayObjectContainer;
	private _moduleLayer: ModuleLayer;
	private _mapLayer: MapLayer;
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
	//开始创建游戏
	public onStartGame():void {
		this._mapLayer = new MapLayer(this);
		this.addChild(this._mapLayer);
		if (!this._moduleLayer) {
			this._moduleLayer = new ModuleLayer();
		} else {
			this._moduleLayer.onReset();
		}
		this.sceneLayer.addChild(this._moduleLayer);
	}
	//状态切换
	public onChangeState(): void {
		this.sceneLayer.removeChildren();
		if (_GF.instance.isDemo) {
			MainScene.state = MAINSCENE_STATE.GAME;
		}
		switch (MainScene.state) {
			//登录
			case MAINSCENE_STATE.LOGIN:
				var login = new LoginView();
				this.sceneLayer.addChild(login);
				break;
			//建角
			case MAINSCENE_STATE.CREATE:
				//玩吧建角
				if(DataManager.instance.channel == EChannel.CHANNEL_WANBA){
					DataManager.instance.loginM.onSendCreateMessage(SDKManager.loginInfo.nickName);
				}else{
					var create = new CreateRoleView();
					this.sceneLayer.addChild(create);
				}
				break;
			//游戏
			case MAINSCENE_STATE.GAME:
				this.onStartGame();
				break;
		}
	}
	public onRegist(): void {
		GameDispatcher.instance.addEventListener(MESSAGE_ID.GAME_LOGON_MESSAGE.toString(), this.onLoginSucceed, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.CREATE_ROLE_MESSAGE.toString(), this.onGameSucceed, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.LOGIN_SERVER_MESSAGE.toString(), this.onEnterSucceed, this);
		GameDispatcher.instance.addEventListener(GameEvent.GAME_RELOGIN_EVENT, this.onLoginSucceed, this);
	}
	/**登录 */
	public onLoginSucceed(): void {
		_GF.instance.netChanel = NET_CHANNEL.GAME;
		_GF.instance.net.setUrl(DataManager.instance.loginM.gameURL, NET_CHANNEL.GAME);
		DataManager.instance.loginM.onSendLoginServMessage();
	}
	/**建角 */
	private onGameSucceed(): void {
		MainScene.state = MAINSCENE_STATE.CREATE;
		this.onChangeState();
	}
	/**进入游戏 */
	private onEnterSucceed(): void {
		MainScene.state = MAINSCENE_STATE.GAME;
		this.onChangeState();
	}

	//地图层
    public getMapLayer(): MapLayer {
        return this._mapLayer;
    }

	/**舞台尺寸发生变化**/
    public onResize(): void {
        if (_GF.IS_PC_GAME) {
            this.promptLayer.x = Globar_Pos.x;
            try {
                this._moduleLayer.onResizeLayer();
                this._mapLayer.onResizeLayer();
            } catch (e) {
            }
        }
    }

}
enum MAINSCENE_STATE {
	LOGIN = 0,
	CREATE = 1,
	GAME = 2
}