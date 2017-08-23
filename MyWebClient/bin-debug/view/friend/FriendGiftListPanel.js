var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FriendGiftListPanel = (function (_super) {
    __extends(FriendGiftListPanel, _super);
    function FriendGiftListPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    FriendGiftListPanel.prototype.onSkinName = function () {
        this.skinName = skins.FriendGiftPanelSkin;
    };
    FriendGiftListPanel.prototype.onInit = function () {
        this.setTitle("gift_food_title_png");
        this.friend_list.itemRenderer = FriendGiftListItem;
        this.friend_list.itemRendererSkinName = skins.FriendGiftItemSkin;
        this.friend_list.useVirtualLayout = true;
        this.scorll.viewport = this.friend_list;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    FriendGiftListPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_GIFT_MESAAGE.toString(), this.onRefresh, this);
    };
    FriendGiftListPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_GIFT_MESAAGE.toString(), this.onRefresh, this);
    };
    FriendGiftListPanel.prototype.onRefresh = function () {
        this.friend_list.dataProvider = new eui.ArrayCollection(DataManager.instance.friendM.firends);
    };
    return FriendGiftListPanel;
}(BaseWindowPanel));
__reflect(FriendGiftListPanel.prototype, "FriendGiftListPanel");
var FriendGiftListItem = (function (_super) {
    __extends(FriendGiftListItem, _super);
    function FriendGiftListItem() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    FriendGiftListItem.prototype.onComplete = function () {
        this.gift_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGiftBtn, this);
    };
    FriendGiftListItem.prototype.dataChanged = function () {
        var friendObj = this.data;
        // this.recgift_num_label.text = friendObj.reviceGift + "/" + GameDefine.FRIEND_RECGIFT_MAX;
        this.name_label.text = friendObj.name;
        this.gift_btn.enabled = !DataManager.instance.friendM.onCheckIsGift(friendObj.id);
        this.head_bar.headIcon = new PlayerHeadParam(friendObj.id, friendObj.avatarUrl);
    };
    FriendGiftListItem.prototype.onTouchGiftBtn = function () {
        var friendObj = this.data;
        if (!DataManager.instance.friendM.onCheckIsGift(friendObj.id)) {
            DataManager.instance.friendM.onSendFriendGiftMsg(friendObj.id);
        }
    };
    return FriendGiftListItem;
}(eui.ItemRenderer));
__reflect(FriendGiftListItem.prototype, "FriendGiftListItem");
//# sourceMappingURL=FriendGiftListPanel.js.map