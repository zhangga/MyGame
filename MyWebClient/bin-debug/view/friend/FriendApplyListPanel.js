var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FriendApplyListPanel = (function (_super) {
    __extends(FriendApplyListPanel, _super);
    function FriendApplyListPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    FriendApplyListPanel.prototype.onSkinName = function () {
        this.skinName = skins.FriendApplyListPanelSkin;
    };
    FriendApplyListPanel.prototype.onInit = function () {
        this.setTitle("friend_apply_log_title_png");
        this.apply_list.itemRenderer = FriendApplyItem;
        this.apply_list.itemRendererSkinName = skins.FriendApplyItemSkin;
        this.apply_list.useVirtualLayout = true;
        this.scroll.viewport = this.apply_list;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    FriendApplyListPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_REJECT_APPLY_MSG.toString(), this.onRefresh, this);
    };
    FriendApplyListPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_REJECT_APPLY_MSG.toString(), this.onRefresh, this);
    };
    FriendApplyListPanel.prototype.onRefresh = function () {
        this.apply_list.dataProvider = new eui.ArrayCollection(DataManager.instance.friendM.applys);
    };
    return FriendApplyListPanel;
}(BaseWindowPanel));
__reflect(FriendApplyListPanel.prototype, "FriendApplyListPanel");
var FriendApplyItem = (function (_super) {
    __extends(FriendApplyItem, _super);
    function FriendApplyItem() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    FriendApplyItem.prototype.onComplete = function () {
        this.agree_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgree, this);
        this.reject_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReject, this);
    };
    FriendApplyItem.prototype.dataChanged = function () {
        var friendObj = this.data;
        this.money_label.text = Language.instance.getDescByKey("player_total_money") + "：" + friendObj.money.toTextFormat();
        this.name_label.text = friendObj.name;
        this.head_bar.headIcon = new PlayerHeadParam(friendObj.id, friendObj.avatarUrl);
    };
    FriendApplyItem.prototype.onAgree = function () {
        var friendObj = this.data;
        DataManager.instance.friendM.onSendAgreeMsg(friendObj.id);
    };
    FriendApplyItem.prototype.onReject = function () {
        var friendObj = this.data;
        DataManager.instance.friendM.onSendRejectMsg(friendObj.id);
    };
    return FriendApplyItem;
}(eui.ItemRenderer));
__reflect(FriendApplyItem.prototype, "FriendApplyItem");
//# sourceMappingURL=FriendApplyListPanel.js.map