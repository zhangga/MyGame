class MonthCardPanel extends BaseWindowPanel {

    private month_desc: eui.Label;
    private forever_desc: eui.Label;
    private btn_month: eui.Group;
    private img_month: eui.Image;
    private btn_forever: eui.Group;
    private img_forever: eui.Image;
    private btn_buy: eui.Button;

    public constructor(owner) {
		super(owner);
	}

    protected onSkinName(): void {
		this.skinName = skins.MonthCardPanelSkin;
	}

    protected onInit(): void {
		super.onInit();
        this.setTitle("huiyuanka_png");
		this.onRefresh();
	}

    protected onRegist(): void {
		super.onRegist();
        this.btn_month.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendMonthCardReward, this);
        this.btn_forever.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendForeverCardReward, this);
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGotoShop, this);
	}
	protected onRemove(): void {
		super.onRemove();
        this.btn_month.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendMonthCardReward, this);
        this.btn_forever.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendForeverCardReward, this);
        this.btn_buy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGotoShop, this);
	}
	protected onRefresh(): void {
		super.onRefresh();
        var cards: {} = DataManager.instance.playerM.player.month_cards;
        this.month_desc.text = "未购买月卡";
        this.forever_desc.text = "未购买终生卡";
        this.img_month.source = "lingqu_png";
        this.img_forever.source = "lingqu_png";
        for (var key in cards) {
            var card: MonthCard = cards[key];
            //月卡
            if (card.type == 1) {
                if (card.left > 0) {
                    this.month_desc.text = "月卡剩余"+card.left+"天";
                }
                //已领取
                if (card.rewarded) {
                    this.img_month.source = "yilingqu_png";
                }
            }
            //终生卡
            else if (card.type == 2) {
                this.forever_desc.text = "已购买终生卡";
                if (card.rewarded) {
                    this.img_forever.source = "yilingqu_png";
                }
            }
        }
	}

    /**
     * 发送月卡领奖的消息
     */
    private onSendMonthCardReward(): void {
        var card: MonthCard = DataManager.instance.playerM.player.month_cards[1];
        if (!card || card.left <= 0) {
            GameCommon.instance.addAlertError(21);
            return;
        }
        if (card.rewarded) {
            GameCommon.instance.addAlertError(18);
            return;
        }
        var msg: Message = new Message(MESSAGE_ID.MONTHLY_CARD_REWARD_MESSAGE);
        msg.setByte(1);
        _GF.instance.net.onAddMessage(msg);
        card.rewarded = true;
        this.img_month.source = "yilingqu_png";
    }
    private onSendForeverCardReward(): void {
        var card: MonthCard = DataManager.instance.playerM.player.month_cards[2];
        if (!card) {
            GameCommon.instance.addAlertError(22);
            return;
        }
        if (card.rewarded) {
            GameCommon.instance.addAlertError(18);
            return;
        }
        var msg: Message = new Message(MESSAGE_ID.MONTHLY_CARD_REWARD_MESSAGE);
        msg.setByte(2);
        _GF.instance.net.onAddMessage(msg);
        card.rewarded = true;
        this.img_forever.source = "yilingqu_png";
    }

    /**
     * 跳转商城
     */
    private onGotoShop(): void {

    }

}