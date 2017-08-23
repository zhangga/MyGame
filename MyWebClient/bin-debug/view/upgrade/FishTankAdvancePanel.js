var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishTankAdvancePanel = (function (_super) {
    __extends(FishTankAdvancePanel, _super);
    function FishTankAdvancePanel(owner) {
        return _super.call(this, owner) || this;
    }
    FishTankAdvancePanel.prototype.onSkinName = function () {
        this.skinName = skins.FishTankAdvancePanelSkin;
    };
    FishTankAdvancePanel.prototype.onInit = function () {
        this.list_FishTank.itemRenderer = FishTankAdvanceItem;
        this.list_FishTank.itemRendererSkinName = skins.FishTankAdvanceItemSkin;
        this.list_FishTank.useVirtualLayout = true;
        this.scorll.viewport = this.list_FishTank;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    FishTankAdvancePanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        GameDispatcher.instance.addEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
        GameDispatcher.instance.addEventListener(GameEvent.UPGRADE_FISH_CHANGE_EVENT.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onRefresh, this);
    };
    FishTankAdvancePanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        GameDispatcher.instance.removeEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
        GameDispatcher.instance.removeEventListener(GameEvent.UPGRADE_FISH_CHANGE_EVENT.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onRefresh, this);
    };
    FishTankAdvancePanel.prototype.onTimecall = function () {
        for (var i = this.list_FishTank.numChildren - 1; i >= 0; i--) {
            this.list_FishTank.getChildAt(i).onRefresh();
        }
    };
    FishTankAdvancePanel.prototype.trigger = function () {
        for (var i = 0; i < this.list_FishTank.numChildren; i++) {
            this.list_FishTank.getChildAt(i).trigger();
        }
    };
    FishTankAdvancePanel.prototype.onRefresh = function () {
        var books = [];
        var player = DataManager.instance.playerM.player;
        books = player.getUnlockBooks();
        this.list_FishTank.dataProvider = new eui.ArrayCollection(books);
    };
    return FishTankAdvancePanel;
}(BaseTabView));
__reflect(FishTankAdvancePanel.prototype, "FishTankAdvancePanel");
var FishTankAdvanceItem = (function (_super) {
    __extends(FishTankAdvanceItem, _super);
    function FishTankAdvanceItem() {
        var _this = _super.call(this) || this;
        _this.points = RedPointManager.createPoint(1);
        _this.once(egret.Event.COMPLETE, _this.onInit, _this);
        return _this;
    }
    FishTankAdvanceItem.prototype.onRefresh = function () {
        this.dataChanged();
    };
    FishTankAdvanceItem.prototype.dataChanged = function () {
        var player = DataManager.instance.playerM.player;
        var book = this.data;
        var model = book.model;
        //显示解锁面板
        var name = Language.instance.getDescByKey(model.name);
        this.lab_name.text = name;
        this.icon.source = model.icon;
        for (var i = 0; i < 5; i++) {
            if (book.level > i) {
                this["img_star" + i].source = "upgrade_adv_star1_png";
            }
            else {
                this["img_star" + i].source = "upgrade_adv_star0_png";
            }
        }
        var str = "";
        if (book.nextModel) {
            this.price = book.nextModel.cost.num;
        }
        this.currency.visible = book.nextModel != null;
        if (this.currency.visible) {
            this.currency.data = new CurrencyParam("", book.nextModel.cost);
            var color = "000000";
            if (player.secOutput.num < book.nextModel.tiaojian) {
                color = "e63232";
            }
            str = Language.instance.getDescByKey("tupotiaojian", color, new InfiniteNumber(book.nextModel.tiaojian).toTextFormat(), Language.instance.getDescByKey("second")) + "\n";
            str = GameCommon.instance.readStringToHtml(str);
        }
        if (book.nextModel && player.getCurrency(GOODS_TYPE.GOLD) >= this.price && player.secOutput.num >= book.nextModel.tiaojian) {
            this.btn_upgrade.enabled = true;
        }
        else {
            this.btn_upgrade.enabled = false;
        }
        str += Language.instance.getDescByKey("yutongji", player.getFishByLoction(book.id).length, book.model.fishId.length);
        this.lab_condition.textFlow = (new egret.HtmlTextParser).parser(str);
        this.points[0].register(this.btn_upgrade, GameDefine.RED_UPGRADE_BTN, DataManager.instance.playerM.player, "onCheckFTCanAdvanceByBID", book.id);
        this.trigger();
    };
    FishTankAdvanceItem.prototype.onInit = function () {
        this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpgrade, this);
    };
    FishTankAdvanceItem.prototype.onTouchUpgrade = function () {
        var player = DataManager.instance.playerM.player;
        if (player.getCurrency(GOODS_TYPE.GOLD) < this.data.nextModel.cost.num) {
            GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips3"));
            return;
        }
        GameCommon.instance.addAnimation(this, "liebiaoshuaxin", new egret.Point(287, 64), 1, true);
        player.addGoldAndUpgrade(-this.data.nextModel.cost.num);
        DataManager.instance.playerM.onUpdateBookLv(this.data.id);
        DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFishTankAdvance(this.data.id));
        GameDispatcher.instance.dispatcherEventWith(FishTankEevent.TANK_REFRESH_BG_EVENT, false);
    };
    FishTankAdvanceItem.prototype.trigger = function () {
        this.points[0].checkPoint();
    };
    return FishTankAdvanceItem;
}(eui.ItemRenderer));
__reflect(FishTankAdvanceItem.prototype, "FishTankAdvanceItem");
//# sourceMappingURL=FishTankAdvancePanel.js.map