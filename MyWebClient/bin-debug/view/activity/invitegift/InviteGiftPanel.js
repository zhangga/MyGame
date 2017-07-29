var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InviteGiftPanel = (function (_super) {
    __extends(InviteGiftPanel, _super);
    function InviteGiftPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.INVITE_MAX = 45;
        _this._intervalTime = 0;
        return _this;
    }
    InviteGiftPanel.prototype.onSkinName = function () {
        this.skinName = skins.InviteGiftPanelSkin;
    };
    InviteGiftPanel.prototype.onInit = function () {
        this.setTitle("zhuanzuanshi_png");
        this.invate_items = [];
        for (var i = 0; i < this.INVITE_MAX; i++) {
            var inviteItem = new InviteGiftItem(i);
            this.invate_items.push(inviteItem);
            this.invite_list.addChild(inviteItem);
        }
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    InviteGiftPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.qq_invite_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.weixin_invite_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.INIVTEGIFT_REWARD_MSG + "_TO_VIEW", this.onUpdateReward, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.INIVTEGIFT_FRIENDLIST_MSG.toString(), this.onUpdateInviteList, this);
        for (var i = 0; i < this.invate_items.length; i++) {
            var inviteItem = this.invate_items[i];
            inviteItem.onRegist();
        }
    };
    InviteGiftPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.qq_invite_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.weixin_invite_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.INIVTEGIFT_REWARD_MSG + "_TO_VIEW", this.onUpdateReward, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.INIVTEGIFT_FRIENDLIST_MSG.toString(), this.onUpdateInviteList, this);
        for (var i = 0; i < this.invate_items.length; i++) {
            var inviteItem = this.invate_items[i];
            inviteItem.onRemove();
        }
    };
    InviteGiftPanel.prototype.onRefresh = function () {
        if (this._intervalTime > egret.getTimer()) {
            this._intervalTime = egret.getTimer() + 30000;
            this.onUpdateInviteList();
        }
        else {
            DataManager.instance.friendM.onSendIniviteGiftListMsg();
        }
    };
    InviteGiftPanel.prototype.onUpdateInviteList = function () {
        for (var i = 0; i < this.invate_items.length; i++) {
            var inviteItem = this.invate_items[i];
            inviteItem.onUpdate();
        }
    };
    InviteGiftPanel.prototype.onUpdateReward = function (evnet) {
        var giftFriend = evnet.data;
        for (var i = 0; i < this.invate_items.length; i++) {
            var inviteItem = this.invate_items[i];
            if (inviteItem.giftFriend.id == giftFriend.id) {
                inviteItem.onUpdate();
                break;
            }
        }
    };
    InviteGiftPanel.prototype.onShare = function () {
        SDKManager.share(new SDKShareContainer());
    };
    return InviteGiftPanel;
}(BaseWindowPanel));
__reflect(InviteGiftPanel.prototype, "InviteGiftPanel");
var InviteGiftItem = (function (_super) {
    __extends(InviteGiftItem, _super);
    function InviteGiftItem(index) {
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.skinName = skins.InviteGiftItemSkin;
        return _this;
    }
    InviteGiftItem.prototype.onUpdate = function () {
        if (this.giftFriend) {
            this.currentState = this.giftFriend.isReceived ? "over" : "reward";
            this.name_label.text = "" + this.giftFriend.name;
            this.head_bar.headIcon = new PlayerHeadParam(this.giftFriend.id, this.giftFriend.avatarUrl);
        }
        else {
            this.currentState = "opening";
            this.name_label.text = "" + (this.index + 1);
        }
    };
    Object.defineProperty(InviteGiftItem.prototype, "giftFriend", {
        get: function () {
            return DataManager.instance.friendM.getInvitegiftFrined(this.index);
        },
        enumerable: true,
        configurable: true
    });
    InviteGiftItem.prototype.onRegist = function () {
        this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItemRewardBtn, this);
    };
    InviteGiftItem.prototype.onRemove = function () {
        this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItemRewardBtn, this);
    };
    InviteGiftItem.prototype.onTouchItemRewardBtn = function () {
        DataManager.instance.friendM.onSendRewardInviteGiftMsg(this.giftFriend.id);
    };
    return InviteGiftItem;
}(eui.Component));
__reflect(InviteGiftItem.prototype, "InviteGiftItem");
//# sourceMappingURL=InviteGiftPanel.js.map