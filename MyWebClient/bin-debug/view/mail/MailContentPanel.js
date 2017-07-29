var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MailContentPanel = (function (_super) {
    __extends(MailContentPanel, _super);
    function MailContentPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    MailContentPanel.prototype.onSkinName = function () {
        this.skinName = skins.MailContentSkin;
    };
    MailContentPanel.prototype.onInit = function () {
        this.setTitle("mail_title_png");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    MailContentPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardBtn, this);
        this.delete_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDelteBtn, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE.toString(), this.onRefresh, this);
    };
    MailContentPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardBtn, this);
        this.delete_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDelteBtn, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE.toString(), this.onRefresh, this);
    };
    MailContentPanel.prototype.onRefresh = function () {
        this.title_label.text = this.param.title;
        this.mail_desc_label.text = this.param.content;
        if (this.param.accessory.length > 0) {
            this.currentState = !this.param.isReceived ? "reward" : "delete";
            this.reward_grp.removeChildren();
            for (var i = 0; i < this.param.accessory.length; i++) {
                var awardItem = this.onCreateReawrdItem(this.param.accessory[i].reward);
                this.reward_grp.addChild(awardItem);
            }
        }
        else {
            this.currentState = "normal";
        }
    };
    MailContentPanel.prototype.onTouchRewardBtn = function () {
        if (this.currentState == "reward") {
            DataManager.instance.mailM.onSendRewardMailMsg(this.param.id);
        }
        else if (this.currentState == "normal") {
            this.onTouchCloseBtn();
        }
    };
    MailContentPanel.prototype.onTouchDelteBtn = function () {
        DataManager.instance.mailM.onSendDeleteMailMsg(this.param.id);
        this.onHide();
    };
    MailContentPanel.prototype.onShowWithParam = function (param) {
        this.param = param;
        if (this.param) {
            if (!this.param.isOpen) {
                DataManager.instance.mailM.onSendReadMailMsg(this.param.id);
            }
            this.onShow();
        }
    };
    MailContentPanel.prototype.onCreateReawrdItem = function (reward) {
        var _awarditme = new eui.Component();
        _awarditme.skinName = skins.MailRewardItemSkin;
        var _thing = GameCommon.instance.getThingModel(reward.type, reward.id);
        if (_thing) {
            _awarditme["img_quality"].source = "item_bg_" + _thing.quality + "_png";
            _awarditme["img_goods"].source = _thing.icon;
            _awarditme["lab_name"].text = _thing.name + "×" + reward.numFormat;
        }
        return _awarditme;
    };
    return MailContentPanel;
}(BaseWindowPanel));
__reflect(MailContentPanel.prototype, "MailContentPanel");
//# sourceMappingURL=MailContentPanel.js.map