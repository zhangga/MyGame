class MainScene extends egret.DisplayObjectContainer {
	public static state: number;
	private sceneLayer: egret.DisplayObjectContainer;
	public promptLayer: egret.DisplayObjectContainer;
	private _moduleLayer: ModuleLayer;
	private _mapLayer: MapLayer;

	//游戏时钟是否启动
	private isTicked = false;
	
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
		SpriteManager.instance.mapLayer = this._mapLayer;
		BuildManager.instance.mapLayer = this._mapLayer;
		this.sceneLayer.addChild(this._moduleLayer);
		this.startTick();
	}

	//启动游戏时钟
	public startTick(): void {
		if (!this.isTicked) {
			this.isTicked = true;
			this.addEventListener(egret.Event.ENTER_FRAME, this.gameTick, this);
		}
	}

	//下次心跳时间
	private _nextHeartBeat = 0;
	//游戏时钟逻辑
	private gameTick(): void {
		var curr: number = egret.getTimer();
		if (this._nextHeartBeat <= curr) {
			if (this._nextHeartBeat > 0) {
				this.onSendHearBeatMsg();
			}
			this._nextHeartBeat = curr + GameDefine.HEART_BEAT_INTERVAL;
		}
		SpriteManager.instance.onTick();
		//震屏
		if (this.isEarthQuake) {
            this.earthQuakeHandler();
		}
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
		GameDispatcher.instance.addEventListener(GameEvent.GAME_EARTHQUAKE_STRAT, this.onEarthQuake, this);
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

	//发送心跳消息
	private onSendHearBeatMsg(): void {

	}

	//地图层
    public getMapLayer(): MapLayer {
        return this._mapLayer;
    }
	//震屏
    private isEarthQuake: boolean = false;
    private earthQuakeOffValue: number;
    private earthUpDown: number;//0上1下
    private earthLeftRight: number;//0左1右
    private earthTime: number;
	//震屏
	public onEarthQuake(): void {
        if (!this.isEarthQuake) {
            this.isEarthQuake = true;
            this.earthQuakeOffValue = 4;
            this.earthUpDown = Math.floor(Math.random() * 2);
            this.earthLeftRight = Math.floor(Math.random() * 2);
        }
    }
	private earthQuakeHandler(): void {
        if (egret.getTimer() - this.earthTime < 100)
            return;
        this.earthTime = egret.getTimer();
        if (this.earthUpDown == 0) {
            this._mapLayer.y = -this.earthQuakeOffValue;
            this.earthUpDown = 1;
        } else {
            this._mapLayer.y = this.earthQuakeOffValue;
            this.earthUpDown = 0;
        }

        if (this.earthLeftRight == 0) {
            this._mapLayer.x = -this.earthQuakeOffValue;
            this.earthLeftRight = 1;
        } else {
            this._mapLayer.x = this.earthQuakeOffValue;
            this.earthLeftRight = 0;
        }

        if (this.earthQuakeOffValue <= 0) {
            this.isEarthQuake = false;
            this.earthQuakeOffValue = 0;
        }
        else
            this.earthQuakeOffValue -= 1;
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