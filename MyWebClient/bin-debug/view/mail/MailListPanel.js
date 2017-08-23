var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MailListPanel = (function (_super) {
    __extends(MailListPanel, _super);
    function MailListPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this._touchRwdTime = 0;
        _this._touchDelteTime = 0;
        return _this;
    }
    MailListPanel.prototype.onSkinName = function () {
        this.skinName = skins.MailListPanelSkin;
    };
    MailListPanel.prototype.onInit = function () {
        this.mail_list.itemRenderer = MailListItem;
        this.mail_list.itemRendererSkinName = skins.MailListItemSkin;
        this.mail_list.useVirtualLayout = true;
        this.scorll.viewport = this.mail_list;
        this.setTitle("mail_title_png");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    MailListPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.onekey_reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyReward, this);
        this.onekey_delete_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyDelete, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_MESSAGE.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_READ_MESSAGE.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_DELETE_MESSAGE.toString(), this.onRefresh, this);
    };
    MailListPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.onekey_reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyReward, this);
        this.onekey_delete_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyDelete, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_MESSAGE.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_READ_MESSAGE.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_DELETE_MESSAGE.toString(), this.onRefresh, this);
    };
    MailListPanel.prototype.onRefresh = function () {
        var mailDatas = DataManager.instance.mailM.getMailList();
        this.mail_list.dataProvider = new eui.ArrayCollection(mailDatas);
        this.not_mail_label.visible = mailDatas.length == 0;
    };
    MailListPanel.prototype.onekeyReward = function () {
        if (!DataManager.instance.mailM.getCanShowMail()) {
            Language.instance.getDescByKey("not_reward_mail");
            return;
        }
        if (this._touchRwdTime > egret.getTimer()) {
            GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips5"));
            return;
        }
        this._touchRwdTime = egret.getTimer() + 2000;
        DataManager.instance.mailM.onSendRewardMailMsg("-1");
    };
    MailListPanel.prototype.onekeyDelete = function () {
        if (DataManager.instance.mailM.getCanShowMail()) {
            Language.instance.getDescByKey("not_delete_mail");
            return;
        }
        if (this._touchDelteTime > egret.getTimer()) {
            GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips5"));
            return;
        }
        this._touchDelteTime = egret.getTimer() + 2000;
        DataManager.instance.mailM.onSendDeleteMailMsg("-1");
    };
    return MailListPanel;
}(BaseWindowPanel));
__reflect(MailListPanel.prototype, "MailListPanel");
var MailListItem = (function (_super) {
    __extends(MailListItem, _super);
    function MailListItem() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onInit, _this);
        return _this;
    }
    MailListItem.prototype.onInit = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenMail, this);
    };
    MailListItem.prototype.dataChanged = function () {
        var _mailData = this.data;
        this.name_label.text = "" + _mailData.title;
        this.currentState = _mailData.isReceived ? "open" : "unopen";
        var _yearstr = _mailData.date.getFullYear() + "";
        var _monthstr = _mailData.date.getMonth() < 10 ? "0" + _mailData.date.getMonth() : _mailData.date.getMonth() + "";
        var _daystr = _mailData.date.getDay() < 10 ? "0" + _mailData.date.getDay() : _mailData.date.getDay() + "";
        var _hoursstr = _mailData.date.getHours() < 10 ? "0" + _mailData.date.getHours() : _mailData.date.getHours() + "";
        var _minutestr = _mailData.date.getMinutes() < 10 ? "0" + _mailData.date.getMinutes() : _mailData.date.getMinutes() + "";
        var _secondstr = _mailData.date.getSeconds() < 10 ? "0" + _mailData.date.getSeconds() : _mailData.date.getSeconds() + "";
        this.time_label.text = _yearstr + "-" + _monthstr + "-" + _daystr + " " + _hoursstr + ":" + _minutestr + ":" + _secondstr;
    };
    MailListItem.prototype.onOpenMail = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("MailContentPanel", this.data));
    };
    return MailListItem;
}(eui.ItemRenderer));
__reflect(MailListItem.prototype, "MailListItem");
//# sourceMappingURL=MailListPanel.js.map