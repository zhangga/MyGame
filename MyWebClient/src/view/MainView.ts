class MainView extends BaseUI {
	private menuPos: egret.Point;
	private Poss: egret.Point[];
	// private btn_menu: eui.Button;
	private isShrink: boolean = false;
	private isMove: boolean = false;
	private moveNum: number = 0;
	private layers: string[];
	// private lab_fishNum: eui.Label;
	private bmLab_gold: eui.BitmapLabel;
	private bmLab_diamond: eui.BitmapLabel;
	private lab_goldAdd: eui.Label;
	// private achieveLayer: eui.Button;
	private btn_artifact: eui.Button;
	// private btn_shop: eui.Button;
	// private toprankLayer: eui.Group;
	private buttons_bar: MainViewBtnsBar;
	private loginsevenLayer: eui.Group;
	private turnplateLayer: eui.Group;
	private mailLayer: eui.Group;
	private invitegiftLayer: eui.Group;
	private smasheggLayer: eui.Group;
	private friendLayer: eui.Group;
	private shopLayer: eui.Group;
	// private dailytaskLayer: eui.Group;
	private system_set_btn: eui.Group;
	private monthCardLayer: eui.Group;
	// private item: MainUpgradeItem;
	private progress: eui.ProgressBar;
	private panelLayer: MainPanelLayer;

	private fishtank_bar: FishTanksBar;
	private lab_state: eui.Label;
	private menu: BottonMenuLayer;
	private img_state: eui.Image;

	public constructor() {
		super();
		this.skinName = skins.MainViewSkin;
	}
	protected onInit(): void {
		this.progress.labelFunction = function (value: Number, maximum: Number): string {
			return "";
		}
		this.panelLayer.onInit();
		this.onInitScenes();
		this.initButtonLightAnim();
		this.onUpdataHappiness();
		this.onUpdate();
		this.addRedPoint();
		// this.menu.addRedPoint();
		this.trigger();
	}
	protected onRegist(): void {
		// this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnshop, this);
		// this.toprankLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnTopRank, this);
		this.loginsevenLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnsevenlogin, this);
		this.invitegiftLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnInivteGift, this);
		this.friendLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnFriend, this);
		this.shopLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnShopPay, this);
		// this.dailytaskLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnDaily, this);
		this.system_set_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnSystem, this);
		// this.achieveLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnAchieve, this);
		this.mailLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnMail, this)
		this.smasheggLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnSmashEgg, this);
		this.turnplateLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnLottery, this);
		this.monthCardLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnMonthCard, this);

		// this.btn_menu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMenu, this);
		GameDispatcher.instance.addEventListener(GameEvent.DECORATE_SELECT_SCENE, this.onSelectScene, this);
		GameDispatcher.instance.addEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onUpdate, this);
		GameDispatcher.instance.addEventListener(GameEvent.ADD_OR_DEL_BUFF_EVENT, this.onBuffHandler, this);
		GameDispatcher.instance.addEventListener(GameEvent.DECORATE_TANK_UNLOCK, this.onUnlockTank, this);
		GameDispatcher.instance.addEventListener(GameEvent.TOUCH_TAB_EVENT, this.onTouchTabHandler, this);
		GameDispatcher.instance.addEventListener(GameEvent.UPDATA_HAPPINESS_EVENT, this.onUpdataHappiness, this);

		GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onPutInFishTank, this);

	}
	public onTime(): void {
		if (this.progress.visible) {
			this.progress.maximum = DataManager.instance.buff.totalTime;
			this.progress.value = DataManager.instance.buff.hasTime;
		}
	}
	private isShow: boolean = false;
	public onTouchFishHandler(fdata: FishData): void {
		// if (fdata) {
		// 	this.item.data = fdata;
		// }
	}
	public onChangeFishTank(): void {
		this.panelLayer.onChangeFishTank();
	}

	private onBuffHandler(e: egret.Event): void {
		switch (e.data) {
			case Buff_STATE_TYPE.ADD:
				this.progress.visible = true;
				break;
			case Buff_STATE_TYPE.DEL:
				this.progress.visible = false;
				break;
		}
	}

	protected onRemove(): void {
	}
	public onRefresh(): void {

	}
	public changeTab(type: number) {
		this.menu.changeTab(type);
	}
	private onTouchBtnWarehouse(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FieldGuidePanel");
	}
	private onTouchBtnshop(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "ShopPanel");
	}
	// private onTouchBtnTopRank(): void {
	// 	GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TopRankPanel");
	// }
	private onTouchBtnsevenlogin(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "LoginSevenPanel");
	}
	private onTouchBtnInivteGift(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "InviteGiftPanel");
	}
	private onTouchBtnUpgrade(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "UpgradePanel");
	}
	private onTouchBtnFriend(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendPanel");
	}
	private onTouchBtnShopPay(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "ShopPayPanel");
	}
	// private onTouchBtnDaily(): void {
	// 	GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "DailyTaskPanel");
	// }
	private onTouchBtnlimitgift(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "GiftTimeLimitPanel");
	}
	private onTouchBtnSystem(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "SystemSetPanel");
	}
	private onBtnSkill(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TechnologyPanel");
	}
	private onTouchBtnArtfact(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "DecoratePanel");
	}
	// private onTouchBtnAchieve(): void {
	// 	GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "AchievementPanel");
	// }
	private onTouchBtnSmashEgg(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "SmashEggUserListPanel");
	}
	private onTouchBtnLottery(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TurnplatePanel");
	}
	private onTouchBtnMail(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "MailListPanel");
	}
	private onTouchBtnMonthCard(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "MonthCardPanel");
	}
	private onTouchBtnAdvance(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FishTankAdvancePanel");
	}
	private onTouchTabHandler(e: egret.Event): void {
		var tab: number = parseInt(e.data);
		this.panelLayer.onChangeTab(tab);
	}
	private onUpdataHappiness(e?: egret.Event): void {

		var happiness: number = DataManager.instance.playerM.player.happiness;
		if (happiness < -5) {
			happiness = -5;
		}
		if (happiness < 0) {
			this.img_state.source = `DegreeOfJoy_bad_png`;
			this.lab_state.text = `	秒产降低${happiness * 10}%`;
		} else {
			this.img_state.source = `DegreeOfJoy_good_png`;
			this.lab_state.text = `	秒产增加${happiness * 10}%`;
		}
	}

	private onTouchMenu(): void {
		if (this.isMove) return;
		// this.secondLayer.visible = false;
		this.isMove = true;
		this.moveNum = 0;
		var target = this.menuPos;
		for (var i: number = 0; i < this.layers.length; i++) {
			this[this.layers[i]].visible = true;
			if (!this.isShrink) {
				target = this.menuPos;
				TweenLiteUtil.beelineTween(this[this.layers[i]], this.onDone, this, target, egret.Ease.cubicIn, 300);
			} else {
				target = this.Poss[i];
				TweenLiteUtil.beelineTween(this[this.layers[i]], this.onDone, this, target, egret.Ease.cubicOut, 300);
			}
		}
	}
	private onDone(e) {
		this.moveNum++;
		if (!this.isShrink) {
			e.visible = false;
		}
		if (this.moveNum == this.layers.length) {
			this.isMove = false;
			this.isShrink = !this.isShrink;
			// this.secondLayer.visible = this.isShrink;
		}
	}
	private onUpdate() {
		// this.lab_fishNum.text = DataManager.instance.playerM.player.fishLen.toString();
		this.bmLab_gold.text = DataManager.instance.playerM.player.gold.toTextFormat();
		this.bmLab_diamond.text = DataManager.instance.playerM.player.diamond.toString();
		this.lab_goldAdd.text = `${DataManager.instance.playerM.player.secOutput.toTextFormat()}/${Language.instance.getDescByKey("second")}`;
	}
	/**
	 * 初始化鱼缸列表
	 */
	private onInitScenes(): void {
		var _tankItems: DecorateItem[] = [];
		var models = ModelManager.instance.modelFieldGuide;
		for (var key in models) {
			var model: ModelFieldGuide = models[key];
			if (model && model.tier == 0) {
				var sceneItem: DecorateItem = new DecorateItem(model.type);
				sceneItem.onRefresh();
				_tankItems.push(sceneItem);
			}
		}
		this.fishtank_bar.onRegist(_tankItems, DataManager.instance.playerM.player.currFGID);
	}
	/**
	 * 选择鱼缸
	 */
	private onSelectScene(e: egret.Event): void {
		var selectId: number = parseInt(e.data);
		this.fishtank_bar.onSeletItem(selectId);
	}
	/**
	 * 解锁鱼缸
	 */
	private onUnlockTank(e: egret.Event): void {
		var id: number = e.data;
		var player: Player = DataManager.player;
		var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[id + "_0"];
		if (player.getCurrency(GOODS_TYPE.GOLD) < model.cost.num) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips3"));
			return;
		}
		player.addGoldAndUpgrade(-model.cost.num);
		player.addBook(id);
		DataManager.instance.syncM.onAddMessage(SyncFactory.onPackUnlockFieldGuide(id));
		this.fishtank_bar.onOpenTask(id);
	}
	public onPutInFishTank(): void {
		this.fishtank_bar.onUpdataItem(DataManager.instance.playerM.player.currFGID + 1);
	}
	/**按钮加闪光特效**/
	private initButtonLightAnim(): void {
		var lightBtns: string[] = ["invitegiftBtn"];//如果需要其他的参数启动结构
		for (var i: number = 0; i < lightBtns.length; i++) {
			var btn: egret.DisplayObjectContainer = this[lightBtns[i]];
			var anim = new Animation("huodong");
			anim.name = "Activity_Button_effect";
			anim.scaleX = anim.scaleY = 1.4;
			anim.x = 42;
			anim.y = 42;
			btn.addChildAt(anim, 0);
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.delButtonAnimation, this);
		}
	}
	private delButtonAnimation(event: egret.Event) {
		var btn = event.currentTarget;
		btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.delButtonAnimation, this);
		var anim: Animation;
		if (btn && btn.getChildByName("Activity_Button_effect")) {
			anim = btn.getChildByName("Activity_Button_effect") as Animation;
			btn.removeChild(anim);
			anim = null;
		}
	}
	protected points: RedPoint[] = RedPointManager.createPoint(2);
	private addRedPoint(): void {
		this.points[0].register(this.turnplateLayer, GameDefine.RED_MAIN_POS, this, "onCheckTurnplateRedPoint");
		this.points[1].register(this.friendLayer, GameDefine.RED_MAIN_POS, this, "onCheckFriendRedPoint");
		// this.points[2].register(this.dailytaskLayer, GameDefine.RED_MAIN_POS, this, "onCheckDailyTaskRedPoint");
		// this.points[3].register(this.achieveLayer, GameDefine.RED_MAIN_POS, this, "onCheckAchieveRedPoint");
	}
	public trigger(isOptimize: boolean = false): void {
		for (var i: number = 0; i < this.points.length; i++) {
			if (isOptimize) {
				if (this.points[i].point && !this.points[i].point.visible) {
					this.points[i].checkPoint();
				}
			} else {
				this.points[i].checkPoint();
			}
		}
		this.menu.trigger();
		this.fishtank_bar.onTriggerAllItems();
		this.buttons_bar.onTrigger();
	}
	/**主界面尺寸变化 */
	public resize(): void {
        if (_GF.IS_PC_GAME) {
            this.width = size.width;
            this.height = size.height;
        } else {
            this.width = GameDefine.SCREEN_WIDTH;
            this.height = GameDefine.SCREEN_HEIGHT;
        }
    }
	public onCheckTurnplateRedPoint(): boolean {
		if (DataManager.instance.playerM.player.fishfood > 0) return true;
		return false;
	}
	public onCheckFriendRedPoint(): boolean {
		if (DataManager.instance.friendM.onCheckRedPoint()) return true;
		return false;
	}
	public onCheckDailyTaskRedPoint(): boolean {
		if (DataManager.instance.taskM.onCheckRedPoint()) return true;
		return false;
	}
	public onCheckAchieveRedPoint(): boolean {
		if (DataManager.instance.achieveM.onCheckRedPoint()) return true;
		return false;
	}
}
//鱼缸列表组件
class FishTanksBar extends eui.Component {
	private open_btn: eui.Button;
	private tank_icon: eui.Image;
	private name_label: eui.Label;
	private scroll_list: eui.Scroller;
	private tanks_grp: eui.Group;
	private icon_bg: eui.Group;

	private items: DecorateItem[];

	public constructor() {
		super();
		this.items = [];
		// this.skinName = skins.FishTanksBarSkin;
		this.once(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(): void {
		var iconMask: egret.Shape = new egret.Shape();
		iconMask.graphics.beginFill(0xFFFFFF);
		iconMask.graphics.drawCircle(48, 41, 34);
		iconMask.graphics.endFill();
		this.icon_bg.addChild(iconMask);
		this.tank_icon.mask = iconMask;
		this.icon_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchExtendsBtn, this);
		this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchExtendsBtn, this);
	}
	//注册
	public onRegist(items: DecorateItem[], seleteID: number, state: string = "close"): void {
		this.items = items;
		this.tanks_grp.removeChildren();
		if (this.scroll_list.horizontalScrollBar) {
			this.scroll_list.horizontalScrollBar.autoVisibility = false;
			this.scroll_list.horizontalScrollBar.visible = false;
			this.scroll_list.stopAnimation();
			this.scroll_list.viewport.scrollH = 0;
		}

		for (var i: number = 0; i < items.length; i++) {
			var _item: DecorateItem = items[i];
			_item.pos_X = i * 105;
			_item.x = state == "open" ? _item.pos_X : -200;
			this.tanks_grp.addChild(_item);
		}
		this.currentState = state;
		this.onSeletItem(seleteID);
	}
	//选中处理
	private _seletedItem: DecorateItem;
	public onSeletItem(selectId: number): void {
		var _beforeId: number = this._seletedItem ? this._seletedItem.id : -1;
		if (_beforeId == selectId) {
			return;
		}
		if (this._seletedItem) {
			this._seletedItem.onSelect(false);
		}
		for (var i = 0; i < this.items.length; i++) {
			var _item: DecorateItem = this.items[i];
			if (_item.id == selectId) {
				this._seletedItem = _item;
				this._seletedItem.onSelect(true);
				var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[selectId + "_0"];
				if (model) {
					this.tank_icon.source = model.icon;
					this.name_label.text = Language.instance.getDescByKey(model.name);
				}
				break;
			}
		}
	}
	//解锁鱼缸
	public onOpenTask(tankId: number): void {
		for (var i = 0; i < this.items.length; i++) {
			var _item: DecorateItem = this.items[i];
			if (_item.id == tankId) {
				_item.onRefresh();
				_item.onChangeScene();
				break;
			}
		}
	}
	public onUpdataItem(tankID: number): void {
		for (var i = 0; i < this.items.length; i++) {
			var _item: DecorateItem = this.items[i];
			if (_item.id == tankID) {
				_item.onRefresh();
				break;
			}
		}
	}
	public onUpdateAllItems(): void {
		for (var i = 0; i < this.items.length; i++) {
			var _item: DecorateItem = this.items[i];
			_item.onRefresh();
		}
	}
	public onTriggerAllItems(): void {
		for (var i = 0; i < this.items.length; i++) {
			var _item: DecorateItem = this.items[i];
			_item.trigger();
		}
	}
	//点击收缩按钮
	private isPlaying: boolean = false;//是否在收缩动画中进行中
	private onTouchExtendsBtn(): void {
		if (this.isPlaying)
			return;
		this.isPlaying = true;
		if (this.currentState == "close") {
			this.onOpenHandler();
		} else if (this.currentState == "open") {
			this.onCloseHandler();
		}
	}
	//展开处理
	private onOpenHandler(): void {
		this.scroll_list.stopAnimation();
		this.scroll_list.viewport.scrollH = 0;
		this.currentState = "open";
		for (var i: number = 0; i < this.items.length; i++) {
			var _item: DecorateItem = this.items[i];
			_item.x = -200;
			this.onPlayStart(_item, _item.pos_X, (i == this.items.length - 1 ? true : false));
		}
	}
	//缩进处理
	private onCloseHandler(): void {
		this.currentState = "close";
		for (var i: number = 0; i < this.items.length; i++) {
			var _item: DecorateItem = this.items[i];
			this.onPlayStart(_item, -200, (i == 0 ? true : false));
		}
	}
	//动画开始
	private onPlayStart(item: DecorateItem, endX, isEnd = false): void {
		var _tween: egret.Tween = egret.Tween.get(item);
		_tween.to({ x: endX }, 400)
			.call(function () {
				egret.Tween.removeTweens(item);
				_tween = null;
				if (isEnd) {
					this.isPlaying = false;
				}
			}, this);
	}
	//The end
}
class MainViewBtnsBar extends eui.Component {
	private points: RedPoint[];

	private open_btn: eui.Button;
	private scroll_list: eui.Scroller;
	private btns_grp: eui.Group;

	public constructor() {
		super();
		// this.skinName = skins.MainButtonBarSkin;
		this.once(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(): void {
		this.currentState = "close";
		this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchExtendsBtn, this);
		var registButtons: string[] = ["toprankLayer", "dailytaskLayer", "achieveLayer"];
		this.points = RedPointManager.createPoint(registButtons.length);
		for (var i: number = 0; i < registButtons.length; i++) {
			var _button: egret.DisplayObject = this[registButtons[i]];
			_button.name = registButtons[i];
			_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchButton, this);
			this.onRegistBtnRedPoint(_button, i);//注册红点
		}
	}
	//注册按钮
	private onRegistBtnRedPoint(button: egret.DisplayObject, index: number): void {
		var redPoint_Pos: egret.Point = GameDefine.RED_MAIN_POS;
		var funcObj = this;
		var funcName: string;
		switch (button.name) {
			case "toprankLayer":
				break;
			case "dailytaskLayer":
				funcName = "onCheckDailyTaskRedPoint";
				break;
			case "achieveLayer":
				funcName = "onCheckAchieveRedPoint";
				break;
		}
		if (funcName) {
			this.points[index].register(button, redPoint_Pos, funcObj, funcName);
		}
	}
	//点击收缩按钮
	private onTouchExtendsBtn(): void {
		if (this.currentState == "close") {
			this.onOpenHandler();
		} else if (this.currentState == "open") {
			this.onCloseHandler();
		}
	}
	//展开处理
	private onOpenHandler(): void {
		this.scroll_list.stopAnimation();
		this.scroll_list.viewport.scrollH = 0;
		this.currentState = "open";
	}
	//缩进处理
	private onCloseHandler(): void {
		this.currentState = "close";
	}
	//按钮功能
	private onTouchButton(event: egret.TouchEvent): void {
		var button: egret.DisplayObject = event.currentTarget;
		switch (button.name) {
			case "toprankLayer":
				GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TopRankPanel");
				break;
			case "dailytaskLayer":
				GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "DailyTaskPanel");
				break;
			case "achieveLayer":
				GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "AchievementPanel");
				break;
		}
	}
	//红点检查接口
	private onCheckDailyTaskRedPoint(): boolean {
		if (DataManager.instance.taskM.onCheckRedPoint()) return true;
		return false;
	}
	private onCheckAchieveRedPoint(): boolean {
		if (DataManager.instance.achieveM.onCheckRedPoint()) return true;
		return false;
	}

	public onTrigger(): void {
		for (var i: number = 0; i < this.points.length; i++) {
			this.points[i].checkPoint();
		}
	}
	//获取对应的按钮对象
	public getButtonByName(name: string): any {
		return this[name];
	}

	//The end
}