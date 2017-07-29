/**
 * 
 */
class ShopPayPanel extends BaseWindowPanel {

	public static BUY_GOLD_COST: number = 500;
	public static BUY_GOLD_RATIO: number = 85000;

	private goldLabel:eui.Label;

	private desc_yk: eui.Group;
	private reward_yk: eui.Group;
	private btn_yk: eui.Button;
	private detail_yk: eui.Label;
	private desc_zs: eui.Group;
	private reward_zs: eui.Group;
	private btn_zs: eui.Button;
	private detail_zs: eui.Label;

	private btn28:eui.Button;
	private btn80:eui.Button;
	private btn6:eui.Button;
	private btn30:eui.Button;
	private btn98:eui.Button;
	private btn198:eui.Button;
	private btn328:eui.Button;
	private btn648:eui.Button;
	private btn500:eui.Button;

	public constructor(owner) {
		super(owner);
	}

	protected onSkinName(): void {
		this.skinName = skins.ShopPayPanelSkin;
	}

	protected onInit(): void {
		super.onInit();
		
		this.onRefresh();
	}

	protected onRegist(): void {
		super.onRegist();
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
	}

	protected onRemove(): void {
		super.onRemove();
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
	}

	protected onRefresh(): void {
		super.onRefresh();
		var player: Player = DataManager.player;
		this.goldLabel.text=GameCommon.toTextFormat(player.secOutput.num*ShopPayPanel.BUY_GOLD_RATIO);
		//月卡、终生卡数据
		this.desc_yk.visible = true;
		this.desc_zs.visible = true;
		this.reward_yk.visible = false;
		this.reward_zs.visible = false;
		this.detail_yk.text = "点击查看更多";
		for (var key in player.month_cards) {
			var data: MonthCard = player.month_cards[key];
			//月卡
			if (data.type == 1 && data.left > 0) {
				this.desc_yk.visible = false;
				this.reward_yk.visible = true;
				this.detail_yk.text = "剩余"+data.left+"天";
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
			//终身卡
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
	}

	private onRewardYk(e:egret.Event): void {
		this.btn_yk.enabled = false;
		this.btn_yk.icon = "yilingqu_png";
		this.onRewardCard(1);
	}
	private onRewardZS(e:egret.Event): void {
		this.btn_zs.enabled = false;
		this.btn_zs.icon = "yilingqu_png";
		this.onRewardCard(2);
	}
	private onRewardCard(type: number) {
		var data: MonthCard = DataManager.player.month_cards[type];
		if (data.rewarded)
			return;
		var model: ModelMonthCard = ModelManager.instance.modelMonthCard[type];
		if (!model)
			return;
		data.rewarded = true;
		DataManager.player.addDiamondAndUpgrade(parseInt(model.rewards.split(",")[2]));
		//刷新界面
		this.onRefresh();
		//发送消息
        var msg: Message = new Message(MESSAGE_ID.MONTHLY_CARD_REWARD_MESSAGE);
        msg.setByte(type);
        _GF.instance.net.onAddMessage(msg);
	}

	private onDetailYK(e:egret.Event): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("DescAlertPanel", Language.instance.getDescByKey("miaoshu_yueka")));
	}
	private onDetailZS(e:egret.Event): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("DescAlertPanel", Language.instance.getDescByKey("miaoshu_zhongshen")));
	}

	private on28BtnClick(e:egret.Event):void{
		this.onPay("月卡",28);
	}

	private on80BtnClick(e:egret.Event):void{
		this.onPay("终身卡",80);
	}

	private on6BtnClick(e:egret.Event):void{
		this.onPay("600钻石",6);
	}

	private on30BtnClick(e:egret.Event):void{
		this.onPay("3000钻石",30);
	}

	private on98BtnClick(e:egret.Event):void{
		this.onPay("9800钻石",98);
	}

	private on198BtnClick(e:egret.Event):void{
		this.onPay("19800钻石",198);
	}

	private on328BtnClick(e:egret.Event):void{
		this.onPay("32800钻石",328);
	}

	private on648BtnClick(e:egret.Event):void{
		this.onPay("64800钻石",648);
	}

	private onPay(name:string,num:number):void{
		SDKManager.pay({goodsName:name,amount:num,playerInfo:DataManager.instance.playerM.player},{showTips:function(msg){alert(msg);}});
	}

	private on500BtnClick(e:egret.Event):void{
		if (DataManager.player.diamond < ShopPayPanel.BUY_GOLD_COST) {
			GameCommon.instance.addAlertError(4);
			return;
		}
		var msg: Message = new Message(MESSAGE_ID.SHOP_BUY_GOLD_MESSAGE);
		_GF.instance.net.onAddMessage(msg);
	}

}