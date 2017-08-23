var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonthCardPanel = (function (_super) {
    __extends(MonthCardPanel, _super);
    function MonthCardPanel(owner) {
        return _super.call(this, owner) || this;
    }
    MonthCardPanel.prototype.onSkinName = function () {
        this.skinName = skins.MonthCardPanelSkin;
    };
    MonthCardPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.setTitle("huiyuanka_png");
        this.onRefresh();
    };
    MonthCardPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_month.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendMonthCardReward, this);
        this.btn_forever.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendForeverCardReward, this);
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGotoShop, this);
    };
    MonthCardPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_month.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendMonthCardReward, this);
        this.btn_forever.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendForeverCardReward, this);
        this.btn_buy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGotoShop, this);
    };
    MonthCardPanel.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        var cards = DataManager.instance.playerM.player.month_cards;
        this.month_desc.text = "未购买月卡";
        this.forever_desc.text = "未购买终生卡";
        this.img_month.source = "lingqu_png";
        this.img_forever.source = "lingqu_png";
        for (var key in cards) {
            var card = cards[key];
            //月卡
            if (card.type == 1) {
                if (card.left > 0) {
                    this.month_desc.text = "月卡剩余" + card.left + "天";
                }
                //已领取
                if (card.rewarded) {
                    this.img_month.source = "yilingqu_png";
                }
            }
            else if (card.type == 2) {
                this.forever_desc.text = "已购买终生卡";
                if (card.rewarded) {
                    this.img_forever.source = "yilingqu_png";
                }
            }
        }
    };
    /**
     * 发送月卡领奖的消息
     */
    MonthCardPanel.prototype.onSendMonthCardReward = function () {
        var card = DataManager.instance.playerM.player.month_cards[1];
        if (!card || card.left <= 0) {
            GameCommon.instance.addAlertError(21);
            return;
        }
        if (card.rewarded) {
            GameCommon.instance.addAlertError(18);
            return;
        }
        var msg = new Message(MESSAGE_ID.MONTHLY_CARD_REWARD_MESSAGE);
        msg.setByte(1);
        _GF.instance.net.onAddMessage(msg);
        card.rewarded = true;
        this.img_month.source = "yilingqu_png";
    };
    MonthCardPanel.prototype.onSendForeverCardReward = function () {
        var card = DataManager.instance.playerM.player.month_cards[2];
        if (!card) {
            GameCommon.instance.addAlertError(22);
            return;
        }
        if (card.rewarded) {
            GameCommon.instance.addAlertError(18);
            return;
        }
        var msg = new Message(MESSAGE_ID.MONTHLY_CARD_REWARD_MESSAGE);
        msg.setByte(2);
        _GF.instance.net.onAddMessage(msg);
        card.rewarded = true;
        this.img_forever.source = "yilingqu_png";
    };
    /**
     * 跳转商城
     */
    MonthCardPanel.prototype.onGotoShop = function () {
    };
    return MonthCardPanel;
}(BaseWindowPanel));
__reflect(MonthCardPanel.prototype, "MonthCardPanel");
//# sourceMappingURL=MonthCardPanel.js.map