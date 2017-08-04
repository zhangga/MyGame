var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        // private btn_menu: eui.Button;
        _this.isShrink = false;
        _this.isMove = false;
        _this.moveNum = 0;
        _this.isShow = false;
        _this.points = RedPointManager.createPoint(2);
        _this.skinName = skins.MainViewSkin;
        return _this;
    }
    MainView.prototype.onInit = function () {
        this.progress.labelFunction = function (value, maximum) {
            return "";
        };
        this.panelLayer.onInit();
        this.onInitScenes();
        this.initButtonLightAnim();
        this.onUpdataHappiness();
        this.onUpdate();
        this.addRedPoint();
        // this.menu.addRedPoint();
        this.trigger();
    };
    MainView.prototype.onRegist = function () {
        // this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnshop, this);
        // this.toprankLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnTopRank, this);
        this.loginsevenLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnsevenlogin, this);
        this.invitegiftLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnInivteGift, this);
        this.friendLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnFriend, this);
        this.shopLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnShopPay, this);
        // this.dailytaskLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnDaily, this);
        this.system_set_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnSystem, this);
        // this.achieveLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnAchieve, this);
        this.mailLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnMail, this);
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
    };
    MainView.prototype.onTime = function () {
        if (this.progress.visible) {
            this.progress.maximum = DataManager.instance.buff.totalTime;
            this.progress.value = DataManager.instance.buff.hasTime;
        }
    };
    MainView.prototype.onTouchFishHandler = function (fdata) {
        // if (fdata) {
        // 	this.item.data = fdata;
        // }
    };
    MainView.prototype.onChangeFishTank = function () {
        this.panelLayer.onChangeFishTank();
    };
    MainView.prototype.onBuffHandler = function (e) {
        switch (e.data) {
            case Buff_STATE_TYPE.ADD:
                this.progress.visible = true;
                break;
            case Buff_STATE_TYPE.DEL:
                this.progress.visible = false;
                break;
        }
    };
    MainView.prototype.onRemove = function () {
    };
    MainView.prototype.onRefresh = function () {
    };
    MainView.prototype.changeTab = function (type) {
        this.menu.changeTab(type);
    };
    MainView.prototype.onTouchBtnWarehouse = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FieldGuidePanel");
    };
    MainView.prototype.onTouchBtnshop = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "ShopPanel");
    };
    // private onTouchBtnTopRank(): void {
    // 	GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TopRankPanel");
    // }
    MainView.prototype.onTouchBtnsevenlogin = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "LoginSevenPanel");
    };
    MainView.prototype.onTouchBtnInivteGift = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "InviteGiftPanel");
    };
    MainView.prototype.onTouchBtnUpgrade = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "UpgradePanel");
    };
    MainView.prototype.onTouchBtnFriend = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendPanel");
    };
    MainView.prototype.onTouchBtnShopPay = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "ShopPayPanel");
    };
    // private onTouchBtnDaily(): void {
    // 	GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "DailyTaskPanel");
    // }
    MainView.prototype.onTouchBtnlimitgift = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "GiftTimeLimitPanel");
    };
    MainView.prototype.onTouchBtnSystem = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "SystemSetPanel");
    };
    MainView.prototype.onBtnSkill = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TechnologyPanel");
    };
    MainView.prototype.onTouchBtnArtfact = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "DecoratePanel");
    };
    // private onTouchBtnAchieve(): void {
    // 	GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "AchievementPanel");
    // }
    MainView.prototype.onTouchBtnSmashEgg = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "SmashEggUserListPanel");
    };
    MainView.prototype.onTouchBtnLottery = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TurnplatePanel");
    };
    MainView.prototype.onTouchBtnMail = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "MailListPanel");
    };
    MainView.prototype.onTouchBtnMonthCard = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "MonthCardPanel");
    };
    MainView.prototype.onTouchBtnAdvance = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FishTankAdvancePanel");
    };
    MainView.prototype.onTouchTabHandler = function (e) {
        var tab = parseInt(e.data);
        this.panelLayer.onChangeTab(tab);
    };
    MainView.prototype.onUpdataHappiness = function (e) {
        var happiness = DataManager.instance.playerM.player.happiness;
        if (happiness < -5) {
            happiness = -5;
        }
        if (happiness < 0) {
            this.img_state.source = "DegreeOfJoy_bad_png";
            this.lab_state.text = "\t\u79D2\u4EA7\u964D\u4F4E" + happiness * 10 + "%";
        }
        else {
            this.img_state.source = "DegreeOfJoy_good_png";
            this.lab_state.text = "\t\u79D2\u4EA7\u589E\u52A0" + happiness * 10 + "%";
        }
    };
    MainView.prototype.onTouchMenu = function () {
        if (this.isMove)
            return;
        // this.secondLayer.visible = false;
        this.isMove = true;
        this.moveNum = 0;
        var target = this.menuPos;
        for (var i = 0; i < this.layers.length; i++) {
            this[this.layers[i]].visible = true;
            if (!this.isShrink) {
                target = this.menuPos;
                TweenLiteUtil.beelineTween(this[this.layers[i]], this.onDone, this, target, egret.Ease.cubicIn, 300);
            }
            else {
                target = this.Poss[i];
                TweenLiteUtil.beelineTween(this[this.layers[i]], this.onDone, this, target, egret.Ease.cubicOut, 300);
            }
        }
    };
    MainView.prototype.onDone = function (e) {
        this.moveNum++;
        if (!this.isShrink) {
            e.visible = false;
        }
        if (this.moveNum == this.layers.length) {
            this.isMove = false;
            this.isShrink = !this.isShrink;
        }
    };
    MainView.prototype.onUpdate = function () {
        // this.lab_fishNum.text = DataManager.instance.playerM.player.fishLen.toString();
        this.bmLab_gold.text = DataManager.instance.playerM.player.gold.toTextFormat();
        this.bmLab_diamond.text = DataManager.instance.playerM.player.diamond.toString();
        this.lab_goldAdd.text = DataManager.instance.playerM.player.secOutput.toTextFormat() + "/" + Language.instance.getDescByKey("second");
    };
    /**
     * 初始化鱼缸列表
     */
    MainView.prototype.onInitScenes = function () {
        var _tankItems = [];
        var models = ModelManager.instance.modelFieldGuide;
        for (var key in models) {
            var model = models[key];
            if (model && model.tier == 0) {
                var sceneItem = new DecorateItem(model.type);
                sceneItem.onRefresh();
                _tankItems.push(sceneItem);
            }
        }
        this.fishtank_bar.onRegist(_tankItems, DataManager.instance.playerM.player.currFGID);
    };
    /**
     * 选择鱼缸
     */
    MainView.prototype.onSelectScene = function (e) {
        var selectId = parseInt(e.data);
        this.fishtank_bar.onSeletItem(selectId);
    };
    /**
     * 解锁鱼缸
     */
    MainView.prototype.onUnlockTank = function (e) {
        var id = e.data;
        var player = DataManager.player;
        var model = ModelManager.instance.modelFieldGuide[id + "_0"];
        if (player.getCurrency(GOODS_TYPE.GOLD) < model.cost.num) {
            GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips3"));
            return;
        }
        player.addGoldAndUpgrade(-model.cost.num);
        player.addBook(id);
        DataManager.instance.syncM.onAddMessage(SyncFactory.onPackUnlockFieldGuide(id));
        this.fishtank_bar.onOpenTask(id);
    };
    MainView.prototype.onPutInFishTank = function () {
        this.fishtank_bar.onUpdataItem(DataManager.instance.playerM.player.currFGID + 1);
    };
    /**按钮加闪光特效**/
    MainView.prototype.initButtonLightAnim = function () {
        var lightBtns = ["invitegiftBtn"]; //如果需要其他的参数启动结构
        for (var i = 0; i < lightBtns.length; i++) {
            var btn = this[lightBtns[i]];
            var anim = new Animation("huodong");
            anim.name = "Activity_Button_effect";
            anim.scaleX = anim.scaleY = 1.4;
            anim.x = 42;
            anim.y = 42;
            btn.addChildAt(anim, 0);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.delButtonAnimation, this);
        }
    };
    MainView.prototype.delButtonAnimation = function (event) {
        var btn = event.currentTarget;
        btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.delButtonAnimation, this);
        var anim;
        if (btn && btn.getChildByName("Activity_Button_effect")) {
            anim = btn.getChildByName("Activity_Button_effect");
            btn.removeChild(anim);
            anim = null;
        }
    };
    MainView.prototype.addRedPoint = function () {
        this.points[0].register(this.turnplateLayer, GameDefine.RED_MAIN_POS, this, "onCheckTurnplateRedPoint");
        this.points[1].register(this.friendLayer, GameDefine.RED_MAIN_POS, this, "onCheckFriendRedPoint");
        // this.points[2].register(this.dailytaskLayer, GameDefine.RED_MAIN_POS, this, "onCheckDailyTaskRedPoint");
        // this.points[3].register(this.achieveLayer, GameDefine.RED_MAIN_POS, this, "onCheckAchieveRedPoint");
    };
    MainView.prototype.trigger = function (isOptimize) {
        if (isOptimize === void 0) { isOptimize = false; }
        for (var i = 0; i < this.points.length; i++) {
            if (isOptimize) {
                if (this.points[i].point && !this.points[i].point.visible) {
                    this.points[i].checkPoint();
                }
            }
            else {
                this.points[i].checkPoint();
            }
        }
        this.menu.trigger();
        this.fishtank_bar.onTriggerAllItems();
        this.buttons_bar.onTrigger();
    };
    /**主界面尺寸变化 */
    MainView.prototype.resize = function () {
        if (_GF.IS_PC_GAME) {
            this.width = size.width;
            this.height = size.height;
        }
        else {
            this.width = GameDefine.SCREEN_WIDTH;
            this.height = GameDefine.SCREEN_HEIGHT;
        }
    };
    MainView.prototype.onCheckTurnplateRedPoint = function () {
        if (DataManager.instance.playerM.player.fishfood > 0)
            return true;
        return false;
    };
    MainView.prototype.onCheckFriendRedPoint = function () {
        if (DataManager.instance.friendM.onCheckRedPoint())
            return true;
        return false;
    };
    MainView.prototype.onCheckDailyTaskRedPoint = function () {
        if (DataManager.instance.taskM.onCheckRedPoint())
            return true;
        return false;
    };
    MainView.prototype.onCheckAchieveRedPoint = function () {
        if (DataManager.instance.achieveM.onCheckRedPoint())
            return true;
        return false;
    };
    return MainView;
}(BaseUI));
__reflect(MainView.prototype, "MainView");
//鱼缸列表组件
var FishTanksBar = (function (_super) {
    __extends(FishTanksBar, _super);
    function FishTanksBar() {
        var _this = _super.call(this) || this;
        //点击收缩按钮
        _this.isPlaying = false; //是否在收缩动画中进行中
        _this.items = [];
        // this.skinName = skins.FishTanksBarSkin;
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    FishTanksBar.prototype.onComplete = function () {
        var iconMask = new egret.Shape();
        iconMask.graphics.beginFill(0xFFFFFF);
        iconMask.graphics.drawCircle(48, 41, 34);
        iconMask.graphics.endFill();
        this.icon_bg.addChild(iconMask);
        this.tank_icon.mask = iconMask;
        this.icon_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchExtendsBtn, this);
        this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchExtendsBtn, this);
    };
    //注册
    FishTanksBar.prototype.onRegist = function (items, seleteID, state) {
        if (state === void 0) { state = "close"; }
        this.items = items;
        this.tanks_grp.removeChildren();
        if (this.scroll_list.horizontalScrollBar) {
            this.scroll_list.horizontalScrollBar.autoVisibility = false;
            this.scroll_list.horizontalScrollBar.visible = false;
            this.scroll_list.stopAnimation();
            this.scroll_list.viewport.scrollH = 0;
        }
        for (var i = 0; i < items.length; i++) {
            var _item = items[i];
            _item.pos_X = i * 105;
            _item.x = state == "open" ? _item.pos_X : -200;
            this.tanks_grp.addChild(_item);
        }
        this.currentState = state;
        this.onSeletItem(seleteID);
    };
    FishTanksBar.prototype.onSeletItem = function (selectId) {
        var _beforeId = this._seletedItem ? this._seletedItem.id : -1;
        if (_beforeId == selectId) {
            return;
        }
        if (this._seletedItem) {
            this._seletedItem.onSelect(false);
        }
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            if (_item.id == selectId) {
                this._seletedItem = _item;
                this._seletedItem.onSelect(true);
                var model = ModelManager.instance.modelFieldGuide[selectId + "_0"];
                if (model) {
                    this.tank_icon.source = model.icon;
                    this.name_label.text = Language.instance.getDescByKey(model.name);
                }
                break;
            }
        }
    };
    //解锁鱼缸
    FishTanksBar.prototype.onOpenTask = function (tankId) {
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            if (_item.id == tankId) {
                _item.onRefresh();
                _item.onChangeScene();
                break;
            }
        }
    };
    FishTanksBar.prototype.onUpdataItem = function (tankID) {
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            if (_item.id == tankID) {
                _item.onRefresh();
                break;
            }
        }
    };
    FishTanksBar.prototype.onUpdateAllItems = function () {
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            _item.onRefresh();
        }
    };
    FishTanksBar.prototype.onTriggerAllItems = function () {
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            _item.trigger();
        }
    };
    FishTanksBar.prototype.onTouchExtendsBtn = function () {
        if (this.isPlaying)
            return;
        this.isPlaying = true;
        if (this.currentState == "close") {
            this.onOpenHandler();
        }
        else if (this.currentState == "open") {
            this.onCloseHandler();
        }
    };
    //展开处理
    FishTanksBar.prototype.onOpenHandler = function () {
        this.scroll_list.stopAnimation();
        this.scroll_list.viewport.scrollH = 0;
        this.currentState = "open";
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            _item.x = -200;
            this.onPlayStart(_item, _item.pos_X, (i == this.items.length - 1 ? true : false));
        }
    };
    //缩进处理
    FishTanksBar.prototype.onCloseHandler = function () {
        this.currentState = "close";
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            this.onPlayStart(_item, -200, (i == 0 ? true : false));
        }
    };
    //动画开始
    FishTanksBar.prototype.onPlayStart = function (item, endX, isEnd) {
        if (isEnd === void 0) { isEnd = false; }
        var _tween = egret.Tween.get(item);
        _tween.to({ x: endX }, 400)
            .call(function () {
            egret.Tween.removeTweens(item);
            _tween = null;
            if (isEnd) {
                this.isPlaying = false;
            }
        }, this);
    };
    return FishTanksBar;
}(eui.Component));
__reflect(FishTanksBar.prototype, "FishTanksBar");
var MainViewBtnsBar = (function (_super) {
    __extends(MainViewBtnsBar, _super);
    function MainViewBtnsBar() {
        var _this = _super.call(this) || this;
        // this.skinName = skins.MainButtonBarSkin;
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    MainViewBtnsBar.prototype.onComplete = function () {
        this.currentState = "close";
        this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchExtendsBtn, this);
        var registButtons = ["toprankLayer", "dailytaskLayer", "achieveLayer"];
        this.points = RedPointManager.createPoint(registButtons.length);
        for (var i = 0; i < registButtons.length; i++) {
            var _button = this[registButtons[i]];
            _button.name = registButtons[i];
            _button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchButton, this);
            this.onRegistBtnRedPoint(_button, i); //注册红点
        }
    };
    //注册按钮
    MainViewBtnsBar.prototype.onRegistBtnRedPoint = function (button, index) {
        var redPoint_Pos = GameDefine.RED_MAIN_POS;
        var funcObj = this;
        var funcName;
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
    };
    //点击收缩按钮
    MainViewBtnsBar.prototype.onTouchExtendsBtn = function () {
        if (this.currentState == "close") {
            this.onOpenHandler();
        }
        else if (this.currentState == "open") {
            this.onCloseHandler();
        }
    };
    //展开处理
    MainViewBtnsBar.prototype.onOpenHandler = function () {
        this.scroll_list.stopAnimation();
        this.scroll_list.viewport.scrollH = 0;
        this.currentState = "open";
    };
    //缩进处理
    MainViewBtnsBar.prototype.onCloseHandler = function () {
        this.currentState = "close";
    };
    //按钮功能
    MainViewBtnsBar.prototype.onTouchButton = function (event) {
        var button = event.currentTarget;
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
    };
    //红点检查接口
    MainViewBtnsBar.prototype.onCheckDailyTaskRedPoint = function () {
        if (DataManager.instance.taskM.onCheckRedPoint())
            return true;
        return false;
    };
    MainViewBtnsBar.prototype.onCheckAchieveRedPoint = function () {
        if (DataManager.instance.achieveM.onCheckRedPoint())
            return true;
        return false;
    };
    MainViewBtnsBar.prototype.onTrigger = function () {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].checkPoint();
        }
    };
    //获取对应的按钮对象
    MainViewBtnsBar.prototype.getButtonByName = function (name) {
        return this[name];
    };
    return MainViewBtnsBar;
}(eui.Component));
__reflect(MainViewBtnsBar.prototype, "MainViewBtnsBar");
//# sourceMappingURL=MainView.js.map