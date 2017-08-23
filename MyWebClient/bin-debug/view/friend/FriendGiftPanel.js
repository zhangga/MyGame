var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FriendGiftPanel = (function (_super) {
    __extends(FriendGiftPanel, _super);
    function FriendGiftPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    FriendGiftPanel.prototype.onSkinName = function () {
        this.skinName = skins.FriendGiftLogPanelSkin;
    };
    FriendGiftPanel.prototype.onInit = function () {
        this.setTitle("gift_food_title_png");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    FriendGiftPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.gift_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenGiftList, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_GIVEFOOD_MSG.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_GIFT_MESAAGE.toString(), this.updateGiftNum, this);
    };
    FriendGiftPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.gift_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenGiftList, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_GIVEFOOD_MSG.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_GIFT_MESAAGE.toString(), this.updateGiftNum, this);
    };
    FriendGiftPanel.prototype.onOpenGiftList = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendGiftListPanel");
    };
    FriendGiftPanel.prototype.onRefresh = function () {
        this.updateGiftNum();
        this.receive_giftlog_grp.removeChildren();
        for (var i = 0; i < DataManager.instance.friendM.gives.length; i++) {
            var playerId = DataManager.instance.friendM.gives[i];
            var playerData = DataManager.instance.friendM.getFriendDataById(playerId);
            if (playerData) {
                var logItem = new FriendGiftLogItem(playerData);
                this.receive_giftlog_grp.addChild(logItem);
            }
        }
    };
    FriendGiftPanel.prototype.updateGiftNum = function () {
        this.gift_num_label.text = "×" + DataManager.instance.friendM.leftGiftNum;
        this.receive_gift_label.text = Language.instance.getDescByKey("friend_total_recive") + "\uFF1A" + DataManager.instance.friendM.giftReciveNum + "/" + GameDefine.FRIEND_RECGIFT_MAX;
    };
    return FriendGiftPanel;
}(BaseWindowPanel));
__reflect(FriendGiftPanel.prototype, "FriendGiftPanel");
var FriendGiftLogItem = (function (_super) {
    __extends(FriendGiftLogItem, _super);
    function FriendGiftLogItem(player) {
        var _this = _super.call(this) || this;
        _this.playerData = player;
        _this.once(egret.Event.COMPLETE, _this.onCreate, _this);
        _this.skinName = skins.FriendGiftLogItemSkin;
        return _this;
    }
    FriendGiftLogItem.prototype.onCreate = function () {
        this.name_label.text = this.playerData.name;
        this.desc_label.text = Language.instance.getDescByKey("friend_recive_food");
    };
    return FriendGiftLogItem;
}(eui.Component));
__reflect(FriendGiftLogItem.prototype, "FriendGiftLogItem");
//# sourceMappingURL=FriendGiftPanel.js.map