var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 */
var ShopPayPanel = (function (_super) {
    __extends(ShopPayPanel, _super);
    function ShopPayPanel(owner) {
        return _super.call(this, owner) || this;
    }
    ShopPayPanel.prototype.onSkinName = function () {
        this.skinName = skins.ShopPayPanelSkin;
    };
    ShopPayPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    ShopPayPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn28.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on28BtnClick, this);
        this.btn80.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on80BtnClick, this);
        this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on6BtnClick, this);
        this.btn30.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on30BtnClick, this);
        this.btn98.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on98BtnClick, this);
        this.btn198.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on198BtnClick, this);
        this.btn328.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on328BtnClick, this);
        this.btn648.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on648BtnClick, this);
        this.btn500.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on500BtnClick, this);
        this.detail_yk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetailYK, this);
        this.detail_zs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetailZS, this);
        this.btn_yk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardYk, this);
        this.btn_zs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardZS, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.PALYER_DAILY_RECORD.toString(), this.onRefresh, this);
    };
    ShopPayPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn28.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on28BtnClick, this);
        this.btn80.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on80BtnClick, this);
        this.btn6.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on6BtnClick, this);
        this.btn30.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on30BtnClick, this);
        this.btn98.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on98BtnClick, this);
        this.btn198.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on198BtnClick, this);
        this.btn328.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on328BtnClick, this);
        this.btn648.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on648BtnClick, this);
        this.btn500.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.on500BtnClick, this);
        this.detail_yk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetailYK, this);
        this.detail_zs.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetailZS, this);
        this.btn_yk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardYk, this);
        this.btn_zs.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardZS, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.PALYER_DAILY_RECORD.toString(), this.onRefresh, this);
    };
    ShopPayPanel.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        var player = DataManager.player;
        this.goldLabel.text = GameCommon.toTextFormat(player.secOutput.num * ShopPayPanel.BUY_GOLD_RATIO);
        //月卡、终生卡数据
        this.desc_yk.visible = true;
        this.desc_zs.visible = true;
        this.reward_yk.visible = false;
        this.reward_zs.visible = false;
        this.detail_yk.text = "点击查看更多";
        for (var key in player.month_cards) {
            var data = player.month_cards[key];
            //月卡
            if (data.type == 1 && data.left > 0) {
                this.desc_yk.visible = false;
                this.reward_yk.visible = true;
                this.detail_yk.text = "剩余" + data.left + "天";
                //已领取
                if (data.rewarded) {
                    this.btn_yk.enabled = false;
                    this.btn_yk.icon = "yilingqu_png";
                }
                else {
                    this.btn_yk.enabled = true;
                    this.btn_yk.icon = "lingqu_png";
                }
            }
            else if (data.type == 2) {
                this.desc_zs.visible = false;
                this.btn80.enabled = false;
                this.reward_zs.visible = true;
                //已领取
                if (data.rewarded) {
                    this.btn_zs.enabled = false;
                    this.btn_zs.icon = "yilingqu_png";
                }
                else {
                    this.btn_zs.enabled = true;
                    this.btn_zs.icon = "lingqu_png";
                }
            }
        }
    };
    ShopPayPanel.prototype.onRewardYk = function (e) {
        this.btn_yk.enabled = false;
        this.btn_yk.icon = "yilingqu_png";
        this.onRewardCard(1);
    };
    ShopPayPanel.prototype.onRewardZS = function (e) {
        this.btn_zs.enabled = false;
        this.btn_zs.icon = "yilingqu_png";
        this.onRewardCard(2);
    };
    ShopPayPanel.prototype.onRewardCard = function (type) {
        var data = DataManager.player.month_cards[type];
        if (data.rewarded)
            return;
        var model = ModelManager.instance.modelMonthCard[type];
        if (!model)
            return;
        data.rewarded = true;
        DataManager.player.addDiamondAndUpgrade(parseInt(model.rewards.split(",")[2]));
        //刷新界面
        this.onRefresh();
        //发送消息
        var msg = new Message(MESSAGE_ID.MONTHLY_CARD_REWARD_MESSAGE);
        msg.setByte(type);
        _GF.instance.net.onAddMessage(msg);
    };
    ShopPayPanel.prototype.onDetailYK = function (e) {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("DescAlertPanel", Language.instance.getDescByKey("miaoshu_yueka")));
    };
    ShopPayPanel.prototype.onDetailZS = function (e) {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("DescAlertPanel", Language.instance.getDescByKey("miaoshu_zhongshen")));
    };
    ShopPayPanel.prototype.on28BtnClick = function (e) {
        this.onPay("月卡", 28);
    };
    ShopPayPanel.prototype.on80BtnClick = function (e) {
        this.onPay("终身卡", 80);
    };
    ShopPayPanel.prototype.on6BtnClick = function (e) {
        this.onPay("600钻石", 6);
    };
    ShopPayPanel.prototype.on30BtnClick = function (e) {
        this.onPay("3000钻石", 30);
    };
    ShopPayPanel.prototype.on98BtnClick = function (e) {
        this.onPay("9800钻石", 98);
    };
    ShopPayPanel.prototype.on198BtnClick = function (e) {
        this.onPay("19800钻石", 198);
    };
    ShopPayPanel.prototype.on328BtnClick = function (e) {
        this.onPay("32800钻石", 328);
    };
    ShopPayPanel.prototype.on648BtnClick = function (e) {
        this.onPay("64800钻石", 648);
    };
    ShopPayPanel.prototype.onPay = function (name, num) {
        SDKManager.pay({ goodsName: name, amount: num, playerInfo: DataManager.instance.playerM.player }, { showTips: function (msg) { alert(msg); } });
    };
    ShopPayPanel.prototype.on500BtnClick = function (e) {
        if (DataManager.player.diamond < ShopPayPanel.BUY_GOLD_COST) {
            GameCommon.instance.addAlertError(4);
            return;
        }
        var msg = new Message(MESSAGE_ID.SHOP_BUY_GOLD_MESSAGE);
        _GF.instance.net.onAddMessage(msg);
    };
    return ShopPayPanel;
}(BaseWindowPanel));
ShopPayPanel.BUY_GOLD_COST = 500;
ShopPayPanel.BUY_GOLD_RATIO = 85000;
__reflect(ShopPayPanel.prototype, "ShopPayPanel");
//# sourceMappingURL=ShopPayPanel.js.map