class UpgradePanel extends BaseTabView {
	private scorll: eui.Scroller;
	private list_upgrade: eui.List;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.UpgradePanelSkin;
	}
	protected onInit(): void {
		this.list_upgrade.itemRenderer = UpgradeItem;
		this.list_upgrade.itemRendererSkinName = skins.UpgradeItemSkin;
		this.list_upgrade.useVirtualLayout = true;
		this.scorll.viewport = this.list_upgrade;
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		GameDispatcher.instance.addEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
		GameDispatcher.instance.addEventListener(GameEvent.UPGRADE_FISH_CHANGE_EVENT.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onRefresh, this);

	}
	protected onRemove(): void {
		super.onRemove();
		GameDispatcher.instance.removeEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
		GameDispatcher.instance.removeEventListener(GameEvent.UPGRADE_FISH_CHANGE_EVENT.toString(), this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onRefresh, this);
	}
	protected onRefresh(): void {
		var fishIds = [];
		var player = DataManager.instance.playerM.player;
		var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[`${player.currFGID}_1`];
		for (var i: number = 0; i < model.fishId.length; i++) {
			var id: number = parseInt(model.fishId[i]);
			if (player.getFishByID(id)) {
				fishIds.push(id);
			} else {
				fishIds.push(id);
				break;
			}
		}
		this.list_upgrade.dataProvider = new eui.ArrayCollection(fishIds);
	}
	private onTimecall(): void {
		for (var i: number = this.list_upgrade.numChildren - 1; i >= 0; i--) {
			(this.list_upgrade.getChildAt(i) as UpgradeItem).onRefresh();
		}
		this.onCheckGuide();
	}
	private onCheckGuide(): void {
		if (!PromptPanel.getInstance().guideIsShow) {
			return;
		}
		var player = DataManager.instance.playerM.player;
		if (PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.UPLEVEL) {
			var _fishData: FishData = player.getFishByID(5001);
			if (_fishData.lv == 1 && player.gold.num >= _fishData.model.jiage.num) {
				var btn_upgrade = this.list_upgrade.numChildren > 0 ? (this.list_upgrade.getChildAt(0) as UpgradeItem).btn_upgrade : null;
				if (btn_upgrade)
					PromptPanel.getInstance().guidePanel.showGuide(btn_upgrade);
			}
		} else if (PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.OPENFISH) {
			var _fishData: FishData = player.getFishByID(5002);
			if (!_fishData && player.gold.num >= ModelManager.instance.modelFish[5002].jiage.num) {
				var btn_unLock = this.list_upgrade.numChildren > 1 ? (this.list_upgrade.getChildAt(1) as UpgradeItem).btn_unLock : null;
				if (btn_unLock)
					PromptPanel.getInstance().guidePanel.showGuide(btn_unLock);
			}
		}
	}
	public trigger(): void {
		// for (var i: number = 0; i < this.itemLayer.numChildren; i++) {
		// 	(this.itemLayer.getChildAt(i) as UpgradeItem).trigger();
		// }
	}
}
class UpgradeItem extends eui.ItemRenderer {
	public btn_upgrade: eui.Button;
	public btn_max: eui.Button;
	public btn_advance: eui.Button;
	public btn_unLock: eui.Button;
	public price: number;
	private lab_lv: eui.Label;
	private goods: GoodsInstence;
	private currency: CurrencyBar;
	private lab_name: eui.Label;
	private model: ModelFish;
	private currency_gold: CurrencyBar;
	private lab_hint: eui.Label;
	private fData: FishData;
	protected points: RedPoint[] = RedPointManager.createPoint(1);
	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onInit, this);
	}
	public onRefresh(): void {
		this.dataChanged();
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.data) {
			this.dataChanged();
		}
	}
	protected dataChanged(): void {
		var fishid: number = this.data;
		var player = DataManager.instance.playerM.player;
		var fData: FishData = player.getFishByID(fishid);
		this.fData = fData;
		this.model = ModelManager.instance.modelFish[fishid];
		var bl: boolean = true;
		if (!fData) {//未解锁
			this.currentState = "deblocking";
			this.price = this.model.jiage.num;
			if (player.getCurrency(GOODS_TYPE.GOLD) >= this.price) {
				this.btn_unLock.enabled = true;
			} else {
				this.btn_unLock.enabled = false;
			}
		} else {
			this.goods.data = fData;
			var tierBase: UpgradeTierBase = fData.model.getTierBeginSecOutPut(fData.tier);
			if (fData.lv == tierBase.max) {//突破
				if (fData.lv == fData.model.maxLv) {
					this.currentState = "max";
				} else {
					this.currentState = "break";
					this.price = tierBase.price;
					this.lab_hint.text = Language.instance.getDescByKey(`yutupotishi`, tierBase.max, (1 + tierBase.addPercent / UnitDefine.BASE_PERCENTAGE));
					if (player.getCurrency(GOODS_TYPE.GOLD) >= this.price) {
						this.btn_advance.enabled = true;
					} else {
						this.btn_advance.enabled = false;
					}
				}
			} else {//升级
				this.currentState = "upgrade";
				this.price = this.model.jiage.num * Math.pow(1 + this.model.jiagexishu / UnitDefine.BASE_PERCENTAGE, fData.lv - 1);
				this.price = Math.floor(this.price);
				this.lab_hint.text = Language.instance.getDescByKey(`yutupotishi`, tierBase.max, (1 + tierBase.addPercent / UnitDefine.BASE_PERCENTAGE));
				if (player.getCurrency(GOODS_TYPE.GOLD) >= this.price) {
					this.btn_upgrade.enabled = true;
				} else {
					this.btn_upgrade.enabled = false;
				}
			}
			this.lab_lv.text = `Lv.${fData.lv}`;
			this.currency_gold.data = new CurrencyParam("秒产：", ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, fData.secOutput), true);
			this.lab_name.text = Language.instance.getDescByKey(fData.model.name);
		}
		this.currency.data = new CurrencyParam("", ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, this.price));
		this.points[0].register(this.btn_upgrade, GameDefine.RED_UPGRADE_BTN, DataManager.instance.playerM.player, "onCheckFishCanUpgradeByID", this.data);

		this.trigger();
	}
	public trigger(): void {
		this.points[0].checkPoint();
	}
	private onTouchUpgrade() {
		var player = DataManager.instance.playerM.player;
		var bData: BookData = player.getBookByID(this.model.yugangId);
		if (this.fData.lv + 1 > bData.model.limit) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("reached_fishTank_Upgrade_limit"));
			return;
		}
		DataManager.instance.playerM.player.onUpgradeFish(this.data, 1);
		DataManager.instance.syncM.onAddMessage(SyncFactory.onPackUpgrade(this.data));
		this.onUpdata();
	}
	private onTouchAdvance() {
		GameCommon.instance.addAnimation(this, `liebiaoshuaxin`, new egret.Point(287, 64), 1, true);
		DataManager.instance.playerM.onUpgradeAdvanceFish(this.data, 1);
		DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFishAdvance(this.data));
		this.onUpdata();
	}
	private onTouchUnlock() {
		var player = DataManager.instance.playerM.player;
		var one = player.getNewOneFish(this.data);
		GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, one);
		DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFieldGuideBuy(this.data, 1));
		DataManager.instance.fieldGuide.onCheckShowHint(this.data);
		this.onUpdata();
	}
	private onUpdata() {
		var player = DataManager.instance.playerM.player;
		player.addGoldAndUpgrade(-this.price);
		this.dataChanged();
	}
	private onSellHandler() {
		this.onDestroy();
	}
	private onDestroy() {
		this.btn_upgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpgrade, this);
		this.btn_advance.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAdvance, this);
		this.btn_unLock.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUnlock, this);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
	private onInit(): void {
		this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpgrade, this);
		this.btn_advance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAdvance, this);
		this.btn_unLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUnlock, this);

	}
	private onOpenMail(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("MailContentPanel", this.data));
	}
}