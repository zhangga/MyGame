var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FriendPanel = (function (_super) {
    __extends(FriendPanel, _super);
    function FriendPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.points = RedPointManager.createPoint(2);
        return _this;
    }
    FriendPanel.prototype.onSkinName = function () {
        this.skinName = skins.FriendPanelSkin;
    };
    FriendPanel.prototype.onInit = function () {
        this.scorll.verticalScrollBar.autoVisibility = true;
        this.scorll.verticalScrollBar.visible = true;
        this.friend_list.itemRenderer = FriendListItem;
        this.friend_list.itemRendererSkinName = skins.FriendListItemSkin;
        this.friend_list.useVirtualLayout = true;
        this.scorll.viewport = this.friend_list;
        this.points[0].register(this.gift_btn, GameDefine.RED_MAIN_POS, DataManager.instance.friendM, "onCheckCanGiveFishFood");
        this.points[1].register(this.apply_btn, GameDefine.RED_MAIN_POS, DataManager.instance.friendM, "onCheckhasApply");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    FriendPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.add_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenAddPanel, this);
        this.gift_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenGiftPanel, this);
        this.apply_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenApplyPanel, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_DELETE_MSG.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_ADD_SUCCESS_MSG.toString(), this.onRefresh, this);
    };
    FriendPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.add_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenAddPanel, this);
        this.gift_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenGiftPanel, this);
        this.apply_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenApplyPanel, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_DELETE_MSG.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_ADD_SUCCESS_MSG.toString(), this.onRefresh, this);
    };
    FriendPanel.prototype.onRefresh = function () {
        this.updateFriendList();
        this.updateFirendCount();
        this.trigger();
    };
    //刷新好友列表
    FriendPanel.prototype.updateFriendList = function () {
        this.friend_list.dataProvider = new eui.ArrayCollection(DataManager.instance.friendM.firends);
    };
    //刷新好友数量
    FriendPanel.prototype.updateFirendCount = function () {
        this.friend_count_label.text = DataManager.instance.friendM.friendsNum + "/" + GameDefine.FRIEND_MAX;
    };
    //打开添加好友面板
    FriendPanel.prototype.onOpenAddPanel = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendSeachPanel");
    };
    //打开赠送好友鱼食面板
    FriendPanel.prototype.onOpenGiftPanel = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendGiftPanel");
    };
    //打开好友申请列表
    FriendPanel.prototype.onOpenApplyPanel = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendApplyListPanel");
    };
    return FriendPanel;
}(BaseWindowPanel));
__reflect(FriendPanel.prototype, "FriendPanel");
var FriendListItem = (function (_super) {
    __extends(FriendListItem, _super);
    function FriendListItem() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    FriendListItem.prototype.onComplete = function () {
        this.baifang_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBaifangBtn, this);
        this.delete_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDeleteBtn, this);
    };
    FriendListItem.prototype.dataChanged = function () {
        var friendObj = this.data;
        if (friendObj.rankNum > 3) {
            this.rank_label.text = "" + friendObj.rankNum;
            this.rank_icon.visible = false;
        }
        else {
            this.rank_icon.visible = true;
            this.rank_label.text = "";
            this.rank_icon.source = "toprank_" + friendObj.rankNum + "_png";
        }
        this.money_label.text = Language.instance.getDescByKey("player_total_money") + "：" + friendObj.money.toTextFormat();
        this.name_label.text = friendObj.name;
        this.player_head_bar.headIcon = new PlayerHeadParam(friendObj.id, friendObj.avatarUrl);
    };
    FriendListItem.prototype.onTouchBaifangBtn = function () {
        var friendObj = this.data;
        DataManager.instance.visite.onSendVisitMessage(friendObj.id, OTHER_BEHAVIOR_TYPE.VISIT);
    };
    FriendListItem.prototype.onTouchDeleteBtn = function () {
        var warnParam = new WarningParam(Language.instance.getDescByKey("friend_delete_notice"), this.onDeleteHandler, this);
        GameCommon.instance.onShowWarnigPanel(warnParam);
    };
    FriendListItem.prototype.onDeleteHandler = function () {
        var friendObj = this.data;
        DataManager.instance.friendM.onSendDeletePlayerMsg(friendObj.id);
    };
    return FriendListItem;
}(eui.ItemRenderer));
__reflect(FriendListItem.prototype, "FriendListItem");
//# sourceMappingURL=FriendPanel.js.map