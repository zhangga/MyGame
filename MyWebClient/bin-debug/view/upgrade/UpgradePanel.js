var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UpgradePanel = (function (_super) {
    __extends(UpgradePanel, _super);
    function UpgradePanel(owner) {
        return _super.call(this, owner) || this;
    }
    UpgradePanel.prototype.onSkinName = function () {
        this.skinName = skins.UpgradePanelSkin;
    };
    UpgradePanel.prototype.onInit = function () {
        this.list_upgrade.itemRenderer = UpgradeItem;
        this.list_upgrade.itemRendererSkinName = skins.UpgradeItemSkin;
        this.list_upgrade.useVirtualLayout = true;
        this.scorll.viewport = this.list_upgrade;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    UpgradePanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        GameDispatcher.instance.addEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
        GameDispatcher.instance.addEventListener(GameEvent.UPGRADE_FISH_CHANGE_EVENT.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onRefresh, this);
    };
    UpgradePanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        GameDispatcher.instance.removeEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
        GameDispatcher.instance.removeEventListener(GameEvent.UPGRADE_FISH_CHANGE_EVENT.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onRefresh, this);
    };
    UpgradePanel.prototype.onRefresh = function () {
        var fishIds = [];
        var player = DataManager.instance.playerM.player;
        var model = ModelManager.instance.modelFieldGuide[player.currFGID + "_1"];
        for (var i = 0; i < model.fishId.length; i++) {
            var id = parseInt(model.fishId[i]);
            if (player.getFishByID(id)) {
                fishIds.push(id);
            }
            else {
                fishIds.push(id);
                break;
            }
        }
        this.list_upgrade.dataProvider = new eui.ArrayCollection(fishIds);
    };
    UpgradePanel.prototype.onTimecall = function () {
        for (var i = this.list_upgrade.numChildren - 1; i >= 0; i--) {
            this.list_upgrade.getChildAt(i).onRefresh();
        }
        this.onCheckGuide();
    };
    UpgradePanel.prototype.onCheckGuide = function () {
        if (!PromptPanel.getInstance().guideIsShow) {
            return;
        }
        var player = DataManager.instance.playerM.player;
        if (PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.UPLEVEL) {
            var _fishData = player.getFishByID(5001);
            if (_fishData.lv == 1 && player.gold.num >= _fishData.model.jiage.num) {
                var btn_upgrade = this.list_upgrade.numChildren > 0 ? this.list_upgrade.getChildAt(0).btn_upgrade : null;
                if (btn_upgrade)
                    PromptPanel.getInstance().guidePanel.showGuide(btn_upgrade);
            }
        }
        else if (PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.OPENFISH) {
            var _fishData = player.getFishByID(5002);
            if (!_fishData && player.gold.num >= ModelManager.instance.modelFish[5002].jiage.num) {
                var btn_unLock = this.list_upgrade.numChildren > 1 ? this.list_upgrade.getChildAt(1).btn_unLock : null;
                if (btn_unLock)
                    PromptPanel.getInstance().guidePanel.showGuide(btn_unLock);
            }
        }
    };
    UpgradePanel.prototype.trigger = function () {
        // for (var i: number = 0; i < this.itemLayer.numChildren; i++) {
        // 	(this.itemLayer.getChildAt(i) as UpgradeItem).trigger();
        // }
    };
    return UpgradePanel;
}(BaseTabView));
__reflect(UpgradePanel.prototype, "UpgradePanel");
var UpgradeItem = (function (_super) {
    __extends(UpgradeItem, _super);
    function UpgradeItem() {
        var _this = _super.call(this) || this;
        _this.points = RedPointManager.createPoint(1);
        _this.once(egret.Event.COMPLETE, _this.onInit, _this);
        return _this;
    }
    UpgradeItem.prototype.onRefresh = function () {
        this.dataChanged();
    };
    UpgradeItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.data) {
            this.dataChanged();
        }
    };
    UpgradeItem.prototype.dataChanged = function () {
        var fishid = this.data;
        var player = DataManager.instance.playerM.player;
        var fData = player.getFishByID(fishid);
        this.fData = fData;
        this.model = ModelManager.instance.modelFish[fishid];
        var bl = true;
        if (!fData) {
            this.currentState = "deblocking";
            this.price = this.model.jiage.num;
            if (player.getCurrency(GOODS_TYPE.GOLD) >= this.price) {
                this.btn_unLock.enabled = true;
            }
            else {
                this.btn_unLock.enabled = false;
            }
        }
        else {
            this.goods.data = fData;
            var tierBase = fData.model.getTierBeginSecOutPut(fData.tier);
            if (fData.lv == tierBase.max) {
                if (fData.lv == fData.model.maxLv) {
                    this.currentState = "max";
                }
                else {
                    this.currentState = "break";
                    this.price = tierBase.price;
                    this.lab_hint.text = Language.instance.getDescByKey("yutupotishi", tierBase.max, (1 + tierBase.addPercent / UnitDefine.BASE_PERCENTAGE));
                    if (player.getCurrency(GOODS_TYPE.GOLD) >= this.price) {
                        this.btn_advance.enabled = true;
                    }
                    else {
                        this.btn_advance.enabled = false;
                    }
                }
            }
            else {
                this.currentState = "upgrade";
                this.price = this.model.jiage.num * Math.pow(1 + this.model.jiagexishu / UnitDefine.BASE_PERCENTAGE, fData.lv - 1);
                this.price = Math.floor(this.price);
                this.lab_hint.text = Language.instance.getDescByKey("yutupotishi", tierBase.max, (1 + tierBase.addPercent / UnitDefine.BASE_PERCENTAGE));
                if (player.getCurrency(GOODS_TYPE.GOLD) >= this.price) {
                    this.btn_upgrade.enabled = true;
                }
                else {
                    this.btn_upgrade.enabled = false;
                }
            }
            this.lab_lv.text = "Lv." + fData.lv;
            this.currency_gold.data = new CurrencyParam("秒产：", ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, fData.secOutput), true);
            this.lab_name.text = Language.instance.getDescByKey(fData.model.name);
        }
        this.currency.data = new CurrencyParam("", ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, this.price));
        this.points[0].register(this.btn_upgrade, GameDefine.RED_UPGRADE_BTN, DataManager.instance.playerM.player, "onCheckFishCanUpgradeByID", this.data);
        this.trigger();
    };
    UpgradeItem.prototype.trigger = function () {
        this.points[0].checkPoint();
    };
    UpgradeItem.prototype.onTouchUpgrade = function () {
        var player = DataManager.instance.playerM.player;
        var bData = player.getBookByID(this.model.yugangId);
        if (this.fData.lv + 1 > bData.model.limit) {
            GameCommon.instance.addAlert(Language.instance.getDescByKey("reached_fishTank_Upgrade_limit"));
            return;
        }
        DataManager.instance.playerM.player.onUpgradeFish(this.data, 1);
        DataManager.instance.syncM.onAddMessage(SyncFactory.onPackUpgrade(this.data));
        this.onUpdata();
    };
    UpgradeItem.prototype.onTouchAdvance = function () {
        GameCommon.instance.addAnimation(this, "liebiaoshuaxin", new egret.Point(287, 64), 1, true);
        DataManager.instance.playerM.onUpgradeAdvanceFish(this.data, 1);
        DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFishAdvance(this.data));
        this.onUpdata();
    };
    UpgradeItem.prototype.onTouchUnlock = function () {
        var player = DataManager.instance.playerM.player;
        var one = player.getNewOneFish(this.data);
        GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, one);
        DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFieldGuideBuy(this.data, 1));
        DataManager.instance.fieldGuide.onCheckShowHint(this.data);
        this.onUpdata();
    };
    UpgradeItem.prototype.onUpdata = function () {
        var player = DataManager.instance.playerM.player;
        player.addGoldAndUpgrade(-this.price);
        this.dataChanged();
    };
    UpgradeItem.prototype.onSellHandler = function () {
        this.onDestroy();
    };
    UpgradeItem.prototype.onDestroy = function () {
        this.btn_upgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpgrade, this);
        this.btn_advance.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAdvance, this);
        this.btn_unLock.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUnlock, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    UpgradeItem.prototype.onInit = function () {
        this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpgrade, this);
        this.btn_advance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAdvance, this);
        this.btn_unLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUnlock, this);
    };
    UpgradeItem.prototype.onOpenMail = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("MailContentPanel", this.data));
    };
    return UpgradeItem;
}(eui.ItemRenderer));
__reflect(UpgradeItem.prototype, "UpgradeItem");
//# sourceMappingURL=UpgradePanel.js.map