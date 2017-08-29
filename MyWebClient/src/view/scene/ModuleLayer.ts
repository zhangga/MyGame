class ModuleLayer extends egret.DisplayObjectContainer {
	//主界面
	private _main: MainView;
	//提示
	private _prompt: egret.DisplayObjectContainer;
	//动画层
	private _animLayer: eui.Group;
	//弹出层
	private _popLayer: eui.Group;
	//遮罩
	private _mask: egret.Sprite;
	private allwindows = {};
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage(): void {
		this.onInit();
	}
	//供子类覆盖
	public onInit(): void {
		this._main = new MainView();

		this._prompt = new egret.DisplayObjectContainer();
		this._animLayer = new eui.Group;
		this._animLayer.touchEnabled = false;
		this._popLayer = new eui.Group();
		this._mask = new egret.Sprite();
		this._mask.touchEnabled = true;
		this._mask.graphics.beginFill(0x000000, 0.6);
		this._mask.graphics.drawRect(0, 0, _GF.stageWidth, _GF.stageHeight);
		this._mask.graphics.endFill();

		this.addChild(this._main);
		this.addChild(this._prompt);
		this.addChild(this._popLayer);
		this.addChild(this._animLayer);
		this.onRegist();
		this.onResizeLayer();
	}
	public onRegist(): void {
		GameDispatcher.instance.addEventListener(FishTankEevent.FISH_OUT_PUT_EVENT, this.onShowDrop, this);
		GameDispatcher.instance.addEventListener(FishTankEevent.FISH_RECYCLE_CROWN_EVENT, this.onRecycleCrow, this);
		GameDispatcher.instance.addEventListener(FishTankEevent.DROP_TOUCH_EVENT, this.onShowFlutterHint, this);
		GameDispatcher.instance.addEventListener(FishTankEevent.COIN_OUT_PUT_EVENT, this.onOutPutCoin, this);
		GameDispatcher.instance.addEventListener(FishTankEevent.FISH_TOUCH_EVENT, this.onTouchFishHandler, this);

		GameDispatcher.instance.addEventListener(GameEvent.MODULE_WINDOW_OPEN, this.onOpenWindow, this);
		GameDispatcher.instance.addEventListener(GameEvent.MODULE_WINDOW_CLOSE, this.onCloseWindow, this);
		GameDispatcher.instance.addEventListener(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, this.onOpenWindowWithParam, this);
		GameDispatcher.instance.addEventListener(GameEvent.MODULE_WINDOW_ALLREMOVED, this.onEventRemoveWindow, this);
		GameDispatcher.instance.addEventListener(GameEvent.MODULE_GOTYPE_OPEN_WINDOW, this.gotypeHandler, this);
		GameDispatcher.instance.addEventListener(GameEvent.RESET_MASK_CHILD_INDEX, this.onResetMask, this);
		GameDispatcher.instance.addEventListener(GameEvent.OFFLINE_EVENT, this.delTimer, this);
		GameDispatcher.instance.addEventListener(GameEvent.SHOW_SECOUTPUT_ADD, this.onShowOutputAdd, this);

		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_BE_VIEWED_MSG.toString(), this.onOpenOther, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.ENEMY_LIST_MSG.toString(), this.onOpenEnemyList, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_OFFLINE_EARNINGS.toString(), this.onOpenOffPanel, this);

		GameDispatcher.instance.addEventListener(GameEvent.GAME_REDPOINT_TRIGGER.toString(), this.trigger, this);

		this.startTimer();
		this.onOpenOffPanel(null);
	}
	public startTimer(): void {
		Tool.addTimer(this.onTime, this, 1000);
	}
	public delTimer(): void {
		Tool.removeTimer(this.onTime, this, 1000);
	}
	private onShowOutputAdd(e: egret.Event): void {
		var anim: SecOutputAddAnim = new SecOutputAddAnim();
		anim.data = e.data;
		GameCommon.instance.addChildByLayer(anim, this._animLayer, new egret.Point(_GF.centerPos.x, _GF.centerPos.y - 200), new egret.Point(308 / 2, 43 / 2));
		TweenLiteUtil.secOutputAddTween(anim, this.onDone, this, new egret.Point(anim.x, anim.y - 100));
	}
	/**舞台发生变化**/
    public onResizeLayer(): void {
        this._main.resize();
        if (_GF.IS_PC_GAME) {
            this.promptLayer.x = Globar_Pos.x;
            this.popLayer.x = Globar_Pos.x;
        }
    }

	//不带参数的打开某面板
	private onOpenWindow(event: egret.Event): void {
		var windowName: string = event.data;
		this.onOpenWindowHandler(windowName);
	}
	//带参数的打开某面板
	private onOpenWindowWithParam(event: egret.Event): void {
		var windowParam: WindowParam = event.data;
		if (!windowParam)
			return;
		this.onOpenWindowHandler(windowParam.windowName, windowParam.param);
	}
	private onOpenWindowHandler(windowName: string, param: WindowParam = null): void {
		if (!window[windowName])
			return;
		var _windowPanel: BaseWindowPanel;
		if (this.allwindows[windowName]) {
			_windowPanel = this.allwindows[windowName];
		} else {
			_windowPanel = new window[windowName](this);
			this.allwindows[windowName] = _windowPanel;
		}
		if (_windowPanel.priority == PANEL_HIERARCHY_TYPE.I) {
			this.removeAllWindows();
		}
		if (param != null)
			_windowPanel.onShowWithParam(param);
		else
			_windowPanel.onShow();
	}
	private onResetMask(): void {
		if (this._popLayer.numChildren == 1 && this._popLayer.contains(this._mask)) {
			if (this._popLayer.contains(this._mask)) {
				this._popLayer.removeChild(this._mask);
				GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_REDPOINT_TRIGGER, false, new RedPointTrigger(null));
			}
		} else {
			this._popLayer.addChildAt(this._mask, Math.max(this._popLayer.numChildren - 2, 0));
		}
	}

	//关闭面板处理
	private onCloseWindow(event: egret.Event): void {
		var windowName: string = event.data;
		if (!windowName)
			return;
		if (this.allwindows[windowName]) {
			var _windowPanel: BaseWindowPanel = this.allwindows[windowName];
			_windowPanel.onHide();
		}
	}
	//关闭所有面板
	private onEventRemoveWindow(event: egret.Event): void {
		this.removeAllWindows();
		// var windowName: string = event.data;
	}
	//关闭所有面板
	public removeAllWindows(): void {
		if (this._popLayer) {
			while (this._popLayer.numChildren != 0) {
				var windowPanel = this._popLayer.getChildAt(0);
				if (egret.is(windowPanel, "BaseWindowPanel")) {
					(windowPanel as BaseWindowPanel).onHide();
				} else if (egret.is(windowPanel, "BasePopPanel")) {
					(windowPanel as BasePopPanel).onHide();
				} else {
					this._popLayer.removeChildAt(0);
				}
			}
		}
	}
	/**前往类型处理**/
	public gotypeHandler(event: egret.Event): void {
		var gotypeData: ViewGoType = event.data as ViewGoType;
		var windowParam: WindowParam = new WindowParam(null, null);
		switch (gotypeData.gotype) {
			case VIEW_GOTYPE.UPGRADE://
			case VIEW_GOTYPE.TECHNOLOGY://
			case VIEW_GOTYPE.ARTIFACT://
			case VIEW_GOTYPE.ADVANCE://
				this.removeAllWindows();
				this._main.changeTab(gotypeData.gotype);
				break;
			case VIEW_GOTYPE.FRIEND://
				windowParam.windowName = "FriendPanel";
				break;
			case VIEW_GOTYPE.TURNPLATE://
				windowParam.windowName = "TurnplatePanel";
				break;
		}
		if (windowParam.windowName) {
			event.data = windowParam;
			this.onOpenWindowWithParam(event);
		}
		event.data = null;
	}
	private onTime() {
		DataManager.instance.playerM.player.onTime();
		DataManager.instance.syncM.onTime();
		DataManager.instance.buff.onTime();
		DataManager.instance.random.onTime();
		// this._fishTank.onTime();
		this._main.onTime();
		this.onTimerDown();
		//检查新手引导
	}
	private pointCheckTime: number = 0;
	private onTimerDown(): void {
		if (this.popLayer.numChildren == 0 && this.pointCheckTime < egret.getTimer()) {
			this._main.trigger(true);
			this.pointCheckTime = 5000 + egret.getTimer();
		}
	}
	private onShowDrop(e: egret.Event): void {
		var fish = e.data as Fish;
		var point = fish.localToGlobal();
		var award;
		switch (fish.outPutType) {
			case FISH_OUTPUT_TYPE.COMMON:
				award = ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, fish.data.bubbleOutput);
				if (fish.outPutNumType == 1) {
					award.num = award.num / 4;
				}
				this.onShowFlutterHint(point, award);
				DataManager.instance.syncM.onAddMessage(SyncFactory.onPackCollect(fish.data.id, fish.outPutNumType));
				break;
			case FISH_OUTPUT_TYPE.EVENT:
				switch (fish.param.type) {
					case RANDOM_EVENT_TYPE.PEACH:
						award = ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, fish.data.bubbleOutput);
						award.num = award.num * parseInt(fish.param.model.effect[1]);
						this.onShowFlutterHint(point, award);
						DataManager.instance.syncM.onAddMessage(SyncFactory.onPackTouchPeachEvent(fish.data.id, 1));
						break;
					case RANDOM_EVENT_TYPE.SMILINGFACE:
						award = ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, fish.data.secOutput);
						award.num = award.num * parseInt(fish.param.model.effect[0]);
						this.onShowFlutterHint(point, award);
						DataManager.instance.syncM.onAddMessage(SyncFactory.onPackTouchSmilingFaceEvent(fish.data.id));
						break;
				}
				break;
		}
		var anim = new Animation("paopao_2", 1, true);
		anim.x = point.x;
		anim.y = point.y;
		this._animLayer.addChild(anim);
		SoundFactory.playSound(SoundDefine.SOUND_BUBBLE_BREAK);
	}
	private onRecycleCrow(e) {
		var fish = e.data as Fish;
		var fData = DataManager.instance.playerM.player.getCrownInfoByID(fish.id);
		var point = fish.localToGlobal();
		if (fData.crown < fData.model.starMax) {
			fData.crown += 1;
			var icon: DropIcon = new DropIcon();
			icon.data = ModelAward.onParseByString("7,7001,0,1");
			GameCommon.instance.addChildByLayer(icon, this._animLayer, new egret.Point(point.x, point.y), new egret.Point(icon.width / 2, icon.height / 2));
			point = this._main["gemLayer"].localToGlobal();
			TweenLiteUtil.beelineTween(icon, this.onDone, this, point);
		}
		// DataManager.instance.playerM.player.delFishByUID(fish.data.uid);
		// this._fishTank.delFish(fish.data.uid);
		DataManager.instance.fieldGuide.onCheckShowHint(fData.id);
	}
	private onDropAward(point: egret.Point, data): void {
		// var _randomPosX: number = num * 30 + Math.random() * 10 * (Math.random() * 2 > 1 ? 1 : -1) - sum * 30 / 2;
		// _randomPosX = point.x + _randomPosX;
		// var _randomPosY: number = GameDefine.FISHTANK_HEIGHT - 80;
		// TweenLiteUtil.dropbodyFly1(body, this.onRecycle, this, new egret.Point(_randomPosX, _randomPosY));
	}
	private onRecycle(e): void {
		var drop = e as DropIcon;
		drop.onRecycle();
	}
	private onShowFlutterHint(pos: egret.Point, data): void {
		var flutter = new FlutterHint();
		flutter.data = data;
		GameCommon.instance.addChildByLayer(flutter, this._animLayer, pos, new egret.Point(flutter.width / 2, flutter.height / 2));
		TweenLiteUtil.awardTween(flutter, this.onDone, this, new egret.Point(flutter.x, flutter.y - 100));
	}
	private onDone(e): void {
		var drop = e;
		drop.onDestory();
	}
	private onOutPutCoin(e): void {
		var event = e.data as egret.TouchEvent;
		var pos = new egret.Point(event.stageX, event.stageY);
		var icon = new DropIcon();
		icon.data = ModelAward.onParseByParam(GOODS_TYPE.GOLD, 1, 1);
		icon.x = pos.x;
		icon.y = pos.y;
		var _randomPosX: number = pos.x;
		var _randomPosY: number = GameDefine.FISHTANK_HEIGHT - 80;
		TweenLiteUtil.dropbodyFly1(icon, this.onRecycle, this, new egret.Point(_randomPosX, _randomPosY));
	}
	public get popLayer() {
		return this._popLayer;
	}
	public get promptLayer() {
		return this._prompt;
	}
	private onTouchFishHandler(e: egret.Event): void {
		var fish = e.data as Fish;
		this._main.onTouchFishHandler(fish.data);
	}
	public onReset(): void {
		this.removeAllWindows();
		this.startTimer();
	}
	private onOpenOther(e: egret.Event): void {
		DataManager.instance.playerM.player.inOtherHome = true;
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
			new WindowParam(
				"OtherFishTank",
				new OtherFishTankParam(OTHER_BEHAVIOR_TYPE.VISIT, null)
			)
		);
	}
	private onOpenEnemyList(e: egret.Event): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "EnemyListPaneL");
	}
	private onOpenOffPanel(e: egret.Event): void {
		if (DataManager.instance.offline.has) {
			GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "AlertOfflineEarnings");
			DataManager.instance.offline.has = false;
		}
	}
	private trigger(e: egret.Event) {
		if (this.popLayer.numChildren == 0) {
			this._main.trigger();
		}
		var trig: RedPointTrigger = e.data;
		if (trig.systemID) {
			var _windowPanel: BaseWindowPanel = this.allwindows[trig.systemID];
			if (_windowPanel && _windowPanel.isShow) {
				_windowPanel.trigger();
			}
		} else {
			for (var key in this.allwindows) {
				if (this.allwindows[key].isShow) {
					if (this.allwindows[key].trigger) {
						this.allwindows[key].trigger();
					}
				}
			}
		}
	}
}
class ViewGoType {
	public gotype: number;
	public param;

	public constructor(gotype: number, param = null) {
		this.gotype = gotype;
		this.param = param;
	}
}
enum VIEW_GOTYPE {
	UPGRADE = 1,
	TECHNOLOGY = 2,
	ARTIFACT = 3,
	ADVANCE = 4,
	FRIEND = 5,
	TURNPLATE = 6
} 	