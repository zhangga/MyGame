var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModuleLayer = (function (_super) {
    __extends(ModuleLayer, _super);
    function ModuleLayer() {
        var _this = _super.call(this) || this;
        _this.allwindows = {};
        _this.pointCheckTime = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ModuleLayer.prototype.onAddToStage = function () {
        this.onInit();
    };
    //供子类覆盖
    ModuleLayer.prototype.onInit = function () {
        // this._fishTank = new FishTankView();
        this._main = new MainView();
        this._pop = new eui.Group();
        this._hint = new egret.DisplayObjectContainer();
        this._animLayer = new eui.Group;
        this._animLayer.touchEnabled = false;
        this._mask = new egret.Sprite();
        this._mask.touchEnabled = true;
        this._mask.graphics.beginFill(0x000000, 0.6);
        this._mask.graphics.drawRect(0, 0, _GF.stageWidth, _GF.stageHeight);
        this._mask.graphics.endFill();
        // this.addChild(this._fishTank);
        this.addChild(this._main);
        this.addChild(this._pop);
        this.addChild(this._hint);
        this.addChild(this._animLayer);
        this.onRegist();
        this.onResizeLayer();
    };
    ModuleLayer.prototype.onRegist = function () {
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_OUT_PUT_EVENT, this.onShowDrop, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_RECYCLE_CROWN_EVENT, this.onRecycleCrow, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.DROP_TOUCH_EVENT, this.onShowFlutterHint, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.COIN_OUT_PUT_EVENT, this.onOutPutCoin, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onPutInFishTank, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_TOUCH_EVENT, this.onTouchFishHandler, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_BG_EVENT, this.onTankRefreshBg, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_PART_EVENT, this.onTankRefreshPart, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_SHOW_EVENT, this.onTankRefreshShow, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_EVOLUTION_EVENT, this.onEvolutionHandler, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_SHOW_EMOJI_EVENT, this.onShowEmojiHandler, this);
        GameDispatcher.instance.addEventListener(GameEvent.MODULE_WINDOW_OPEN, this.onOpenWindow, this);
        GameDispatcher.instance.addEventListener(GameEvent.MODULE_WINDOW_CLOSE, this.onCloseWindow, this);
        GameDispatcher.instance.addEventListener(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, this.onOpenWindowWithParam, this);
        GameDispatcher.instance.addEventListener(GameEvent.MODULE_WINDOW_ALLREMOVED, this.onEventRemoveWindow, this);
        GameDispatcher.instance.addEventListener(GameEvent.MODULE_GOTYPE_OPEN_WINDOW, this.gotypeHandler, this);
        GameDispatcher.instance.addEventListener(GameEvent.RESET_MASK_CHILD_INDEX, this.onResetMask, this);
        GameDispatcher.instance.addEventListener(GameEvent.FISH_SELL_EVENT, this.onDelFish, this);
        GameDispatcher.instance.addEventListener(GameEvent.FISH_UPGRADE_EVENT, this.onUpgradeHandler, this);
        GameDispatcher.instance.addEventListener(GameEvent.FIELDGUIDE_DEBLOCKING_EVENT, this.onRefreshFishTankBtn, this);
        GameDispatcher.instance.addEventListener(GameEvent.OFFLINE_EVENT, this.delTimer, this);
        GameDispatcher.instance.addEventListener(GameEvent.SHOW_SECOUTPUT_ADD, this.onShowOutputAdd, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_BE_VIEWED_MSG.toString(), this.onOpenOther, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.ENEMY_LIST_MSG.toString(), this.onOpenEnemyList, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_OFFLINE_EARNINGS.toString(), this.onOpenOffPanel, this);
        GameDispatcher.instance.addEventListener(GameEvent.GAME_REDPOINT_TRIGGER.toString(), this.trigger, this);
        this.startTimer();
        this.onOpenOffPanel(null);
    };
    ModuleLayer.prototype.startTimer = function () {
        Tool.addTimer(this.onTime, this, 1000);
    };
    ModuleLayer.prototype.delTimer = function () {
        Tool.removeTimer(this.onTime, this, 1000);
    };
    ModuleLayer.prototype.onShowOutputAdd = function (e) {
        var anim = new SecOutputAddAnim();
        anim.data = e.data;
        GameCommon.instance.addChildByLayer(anim, this._animLayer, new egret.Point(_GF.centerPos.x, _GF.centerPos.y - 200), new egret.Point(308 / 2, 43 / 2));
        TweenLiteUtil.secOutputAddTween(anim, this.onDone, this, new egret.Point(anim.x, anim.y - 100));
    };
    /**舞台发生变化**/
    ModuleLayer.prototype.onResizeLayer = function () {
        this._main.resize();
        if (_GF.IS_PC_GAME) {
            this.hintBar.x = Globar_Pos.x;
            this.PupoBar.x = Globar_Pos.x;
        }
    };
    //不带参数的打开某面板
    ModuleLayer.prototype.onOpenWindow = function (event) {
        var windowName = event.data;
        this.onOpenWindowHandler(windowName);
    };
    //带参数的打开某面板
    ModuleLayer.prototype.onOpenWindowWithParam = function (event) {
        var windowParam = event.data;
        if (!windowParam)
            return;
        this.onOpenWindowHandler(windowParam.windowName, windowParam.param);
    };
    ModuleLayer.prototype.onOpenWindowHandler = function (windowName, param) {
        if (param === void 0) { param = null; }
        if (!window[windowName])
            return;
        var _windowPanel;
        if (this.allwindows[windowName]) {
            _windowPanel = this.allwindows[windowName];
        }
        else {
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
    };
    ModuleLayer.prototype.onResetMask = function () {
        if (this._pop.numChildren == 1 && this._pop.contains(this._mask)) {
            if (this._pop.contains(this._mask)) {
                this._pop.removeChild(this._mask);
                GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_REDPOINT_TRIGGER, false, new RedPointTrigger(null));
            }
        }
        else {
            this._pop.addChildAt(this._mask, Math.max(this._pop.numChildren - 2, 0));
        }
    };
    //关闭面板处理
    ModuleLayer.prototype.onCloseWindow = function (event) {
        var windowName = event.data;
        if (!windowName)
            return;
        if (this.allwindows[windowName]) {
            var _windowPanel = this.allwindows[windowName];
            _windowPanel.onHide();
        }
    };
    //关闭所有面板
    ModuleLayer.prototype.onEventRemoveWindow = function (event) {
        this.removeAllWindows();
        // var windowName: string = event.data;
    };
    //关闭所有面板
    ModuleLayer.prototype.removeAllWindows = function () {
        if (this._pop) {
            while (this._pop.numChildren != 0) {
                var windowPanel = this._pop.getChildAt(0);
                if (egret.is(windowPanel, "BaseWindowPanel")) {
                    windowPanel.onHide();
                }
                else if (egret.is(windowPanel, "BasePopPanel")) {
                    windowPanel.onHide();
                }
                else {
                    this._pop.removeChildAt(0);
                }
            }
        }
    };
    /**前往类型处理**/
    ModuleLayer.prototype.gotypeHandler = function (event) {
        var gotypeData = event.data;
        var windowParam = new WindowParam(null, null);
        switch (gotypeData.gotype) {
            case VIEW_GOTYPE.UPGRADE: //
            case VIEW_GOTYPE.TECHNOLOGY: //
            case VIEW_GOTYPE.ARTIFACT: //
            case VIEW_GOTYPE.ADVANCE:
                this.removeAllWindows();
                this._main.changeTab(gotypeData.gotype);
                break;
            case VIEW_GOTYPE.FRIEND:
                windowParam.windowName = "FriendPanel";
                break;
            case VIEW_GOTYPE.TURNPLATE:
                windowParam.windowName = "TurnplatePanel";
                break;
        }
        if (windowParam.windowName) {
            event.data = windowParam;
            this.onOpenWindowWithParam(event);
        }
        event.data = null;
    };
    ModuleLayer.prototype.onTime = function () {
        DataManager.instance.playerM.player.onTime();
        DataManager.instance.syncM.onTime();
        DataManager.instance.buff.onTime();
        DataManager.instance.random.onTime();
        // this._fishTank.onTime();
        this._main.onTime();
        this.onTimerDown();
        //检查新手引导
    };
    ModuleLayer.prototype.onTimerDown = function () {
        if (this.PupoBar.numChildren == 0 && this.pointCheckTime < egret.getTimer()) {
            this._main.trigger(true);
            this.pointCheckTime = 5000 + egret.getTimer();
        }
    };
    ModuleLayer.prototype.onShowDrop = function (e) {
        var fish = e.data;
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
    };
    ModuleLayer.prototype.onRecycleCrow = function (e) {
        var fish = e.data;
        var fData = DataManager.instance.playerM.player.getCrownInfoByID(fish.id);
        var point = fish.localToGlobal();
        if (fData.crown < fData.model.starMax) {
            fData.crown += 1;
            var icon = new DropIcon();
            icon.data = ModelAward.onParseByString("7,7001,0,1");
            GameCommon.instance.addChildByLayer(icon, this._animLayer, new egret.Point(point.x, point.y), new egret.Point(icon.width / 2, icon.height / 2));
            point = this._main["gemLayer"].localToGlobal();
            TweenLiteUtil.beelineTween(icon, this.onDone, this, point);
        }
        // DataManager.instance.playerM.player.delFishByUID(fish.data.uid);
        // this._fishTank.delFish(fish.data.uid);
        DataManager.instance.fieldGuide.onCheckShowHint(fData.id);
    };
    ModuleLayer.prototype.onDropAward = function (point, data) {
        // var _randomPosX: number = num * 30 + Math.random() * 10 * (Math.random() * 2 > 1 ? 1 : -1) - sum * 30 / 2;
        // _randomPosX = point.x + _randomPosX;
        // var _randomPosY: number = GameDefine.FISHTANK_HEIGHT - 80;
        // TweenLiteUtil.dropbodyFly1(body, this.onRecycle, this, new egret.Point(_randomPosX, _randomPosY));
    };
    ModuleLayer.prototype.onRecycle = function (e) {
        var drop = e;
        drop.onRecycle();
    };
    ModuleLayer.prototype.onShowFlutterHint = function (pos, data) {
        var flutter = new FlutterHint();
        flutter.data = data;
        GameCommon.instance.addChildByLayer(flutter, this._animLayer, pos, new egret.Point(flutter.width / 2, flutter.height / 2));
        TweenLiteUtil.awardTween(flutter, this.onDone, this, new egret.Point(flutter.x, flutter.y - 100));
    };
    ModuleLayer.prototype.onDone = function (e) {
        var drop = e;
        drop.onDestory();
    };
    ModuleLayer.prototype.onOutPutCoin = function (e) {
        var event = e.data;
        var pos = new egret.Point(event.stageX, event.stageY);
        var icon = new DropIcon();
        icon.data = ModelAward.onParseByParam(GOODS_TYPE.GOLD, 1, 1);
        icon.x = pos.x;
        icon.y = pos.y;
        this._fishTank.addChild(icon);
        var _randomPosX = pos.x;
        var _randomPosY = GameDefine.FISHTANK_HEIGHT - 80;
        TweenLiteUtil.dropbodyFly1(icon, this.onRecycle, this, new egret.Point(_randomPosX, _randomPosY));
    };
    Object.defineProperty(ModuleLayer.prototype, "PupoBar", {
        get: function () {
            return this._pop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleLayer.prototype, "hintBar", {
        get: function () {
            return this._hint;
        },
        enumerable: true,
        configurable: true
    });
    ModuleLayer.prototype.onPutInFishTank = function (e) {
        this._fishTank.onPutInFishTank(e);
    };
    ModuleLayer.prototype.onTouchFishHandler = function (e) {
        var fish = e.data;
        this._main.onTouchFishHandler(fish.data);
    };
    /**
     * 鱼缸部位显示刷新
     */
    ModuleLayer.prototype.onTankRefreshPart = function (e) {
        this._fishTank.onRefreshPart();
    };
    /**
     * 鱼缸背景显示刷新
     */
    ModuleLayer.prototype.onTankRefreshBg = function (e) {
        this._fishTank.onRefreshBg();
    };
    /**
     * 鱼缸显示刷新
     */
    ModuleLayer.prototype.onTankRefreshShow = function (e) {
        this._fishTank.onRefreshShow();
        this._fishTank.onReset();
        this._main.onChangeFishTank();
    };
    ModuleLayer.prototype.onEvolutionHandler = function (e) {
        this._fishTank.onEvolutionHandler(e);
    };
    ModuleLayer.prototype.onShowEmojiHandler = function (e) {
        this._fishTank.onShowEmojiHandler(e);
    };
    ModuleLayer.prototype.onUpgradeHandler = function (e) {
        this._fishTank.onUpgradeHandler(e);
    };
    ModuleLayer.prototype.onReset = function () {
        this.removeAllWindows();
        this.startTimer();
        this._fishTank.onReset();
    };
    ModuleLayer.prototype.onDelFish = function (e) {
        DataManager.instance.playerM.player.delFishByUID(e.data);
        this._fishTank.delFish(e.data);
    };
    ModuleLayer.prototype.onRefreshFishTankBtn = function () {
        this._fishTank.onRefreshArrow();
    };
    ModuleLayer.prototype.onOpenOther = function (e) {
        DataManager.instance.playerM.player.inOtherHome = true;
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("OtherFishTank", new OtherFishTankParam(OTHER_BEHAVIOR_TYPE.VISIT, null)));
    };
    ModuleLayer.prototype.onOpenEnemyList = function (e) {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "EnemyListPaneL");
    };
    ModuleLayer.prototype.onOpenOffPanel = function (e) {
        if (DataManager.instance.offline.has) {
            GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "AlertOfflineEarnings");
            DataManager.instance.offline.has = false;
        }
    };
    ModuleLayer.prototype.trigger = function (e) {
        if (this.PupoBar.numChildren == 0) {
            this._main.trigger();
        }
        var trig = e.data;
        if (trig.systemID) {
            var _windowPanel = this.allwindows[trig.systemID];
            if (_windowPanel && _windowPanel.isShow) {
                _windowPanel.trigger();
            }
        }
        else {
            for (var key in this.allwindows) {
                if (this.allwindows[key].isShow) {
                    if (this.allwindows[key].trigger) {
                        this.allwindows[key].trigger();
                    }
                }
            }
        }
    };
    return ModuleLayer;
}(egret.DisplayObjectContainer));
__reflect(ModuleLayer.prototype, "ModuleLayer");
var ViewGoType = (function () {
    function ViewGoType(gotype, param) {
        if (param === void 0) { param = null; }
        this.gotype = gotype;
        this.param = param;
    }
    return ViewGoType;
}());
__reflect(ViewGoType.prototype, "ViewGoType");
var VIEW_GOTYPE;
(function (VIEW_GOTYPE) {
    VIEW_GOTYPE[VIEW_GOTYPE["UPGRADE"] = 1] = "UPGRADE";
    VIEW_GOTYPE[VIEW_GOTYPE["TECHNOLOGY"] = 2] = "TECHNOLOGY";
    VIEW_GOTYPE[VIEW_GOTYPE["ARTIFACT"] = 3] = "ARTIFACT";
    VIEW_GOTYPE[VIEW_GOTYPE["ADVANCE"] = 4] = "ADVANCE";
    VIEW_GOTYPE[VIEW_GOTYPE["FRIEND"] = 5] = "FRIEND";
    VIEW_GOTYPE[VIEW_GOTYPE["TURNPLATE"] = 6] = "TURNPLATE";
})(VIEW_GOTYPE || (VIEW_GOTYPE = {}));
//# sourceMappingURL=ModuleLayer.js.map