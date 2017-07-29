class ShopTipsBar extends BaseTipsBar {
	private buyBar: BatchDisposebar;
	private Btn_close: eui.Button;
	private img_fish: eui.Image;
	public constructor(owner: ItemIntroducebar) {
		super(owner);
	}
	protected initSkinName(): void {
		this.skinName = skins.ShopTipsBarSkin;
	}
	//注册
	public onRegist(): void {
		super.onRegist();
		this.Btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
		this.buyBar.onRegist();
		this.buyBar.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBuy, this);

	}
	//移除
	public onRemove(): void {
		super.onRemove();
		this.Btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
		this.buyBar.onRemove();
		this.buyBar.btn_buy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBuy, this);
	}
	public onUpdate(param: IntroduceBarParam): void {
		// super.onUpdate(param);
		// var fishd = new FishData(param.data.reward.id, 1);
		// this.img_fish.source = `${fishd.moveRes}_png`;
		// var model: ModelShop = this.param.data;
		// this.buyBar.currentState = "buy";
		// this.buyBar.onUpdate(model);
	}
	private onTouchBuy() {
		if (this.param.data.type == SHOP_TYPE.GOLD) {
			if (DataManager.instance.playerM.player.fishLen >= 120) {
				GameCommon.instance.addAlert(Language.instance.getDescByKey(`is_own_upper_limit`));
				return;
			}
			if (this.buyBar.sum > this.buyBar.ownCurrency()) {
				GameCommon.instance.addAlert(Language.instance.getDescByKey(`error_tips3`));
				return;
			}
			var one: FishData;
			var len = this.buyBar.num;
			DataManager.instance.syncM.onAddMessage(SyncFactory.onPackExchange(this.param.data.id, this.buyBar.num));
			for (var i: number = 0; i < len; i++) {
				one = DataManager.instance.playerM.player.getNewOneFish(this.param.data.reward.id);
				GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, one);
			}
			DataManager.instance.playerM.player.addGoldAndUpgrade(-this.param.data.cosume[0].num);
		}
		this.onTouchClose();
	}
	private onTouchClose() {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_CLOSE, false, "ItemIntroducebar");
	}

}