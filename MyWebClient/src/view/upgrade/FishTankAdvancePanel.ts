class FishTankAdvancePanel extends BaseTabView {
	private scorll: eui.Scroller;
	private list_FishTank: eui.List;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.FishTankAdvancePanelSkin;
	}
	protected onInit(): void {
		this.list_FishTank.itemRenderer = FishTankAdvanceItem;
		this.list_FishTank.itemRendererSkinName = skins.FishTankAdvanceItemSkin;
		this.list_FishTank.useVirtualLayout = true;
		this.scorll.viewport = this.list_FishTank;
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
	private onTimecall(): void {
		for (var i: number = this.list_FishTank.numChildren - 1; i >= 0; i--) {
			(this.list_FishTank.getChildAt(i) as FishTankAdvanceItem).onRefresh();
		}
	}
	public trigger(): void {
		for (var i: number = 0; i < this.list_FishTank.numChildren; i++) {
			(this.list_FishTank.getChildAt(i) as FishTankAdvanceItem).trigger();
		}
	}

	protected onRefresh(): void {
		var books = [];
		var player = DataManager.instance.playerM.player;
		books = player.getUnlockBooks();
		this.list_FishTank.dataProvider = new eui.ArrayCollection(books);
	}
}
class FishTankAdvanceItem extends eui.ItemRenderer {
	public btn_upgrade: eui.Button;
	private lab_name: eui.Label;
	private lab_condition: eui.Label;
	private currency: CurrencyBar;
	private icon: eui.Image;
	public price: number;
	protected points: RedPoint[] = RedPointManager.createPoint(1);
	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onInit, this);
	}
	public onRefresh(): void {
		this.dataChanged();
	}
	protected dataChanged(): void {
		var player = DataManager.instance.playerM.player;
		var book: BookData = this.data;
		var model: ModelFieldGuide = book.model;
		//显示解锁面板
		var name = Language.instance.getDescByKey(model.name);
		this.lab_name.text = name;
		this.icon.source = model.icon;
		for (var i: number = 0; i < 5; i++) {
			if (book.level > i) {
				this[`img_star${i}`].source = `upgrade_adv_star1_png`;
			} else {
				this[`img_star${i}`].source = `upgrade_adv_star0_png`;
			}
		}
		var str: string = "";
		if (book.nextModel) {
			this.price = book.nextModel.cost.num;
		}
		this.currency.visible = book.nextModel != null;
		if (this.currency.visible) {
			this.currency.data = new CurrencyParam("", book.nextModel.cost);
			var color = "000000";
			if (player.secOutput.num < book.nextModel.tiaojian) {
				color = "e63232";
			}
			str = Language.instance.getDescByKey(`tupotiaojian`, color, new InfiniteNumber(book.nextModel.tiaojian).toTextFormat(), Language.instance.getDescByKey("second")) + "\n";
			str = GameCommon.instance.readStringToHtml(str);
		}
		if (book.nextModel && player.getCurrency(GOODS_TYPE.GOLD) >= this.price && player.secOutput.num >= book.nextModel.tiaojian) {
			this.btn_upgrade.enabled = true;
		} else {
			this.btn_upgrade.enabled = false;
		}
		str += Language.instance.getDescByKey(`yutongji`, player.getFishByLoction(book.id).length, book.model.fishId.length);
		this.lab_condition.textFlow = (new egret.HtmlTextParser).parser(str);
		this.points[0].register(this.btn_upgrade, GameDefine.RED_UPGRADE_BTN, DataManager.instance.playerM.player, "onCheckFTCanAdvanceByBID", book.id);
		this.trigger();
	}
	private onInit(): void {
		this.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpgrade, this);
	}
	private onTouchUpgrade(): void {
		var player = DataManager.instance.playerM.player;
		if (player.getCurrency(GOODS_TYPE.GOLD) < this.data.nextModel.cost.num) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips3"));
			return;
		}
		GameCommon.instance.addAnimation(this, `liebiaoshuaxin`, new egret.Point(287, 64), 1, true);
		player.addGoldAndUpgrade(-this.data.nextModel.cost.num);
		DataManager.instance.playerM.onUpdateBookLv(this.data.id);
		DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFishTankAdvance(this.data.id));
		GameDispatcher.instance.dispatcherEventWith(FishTankEevent.TANK_REFRESH_BG_EVENT, false);
	}
	public trigger(): void {
		this.points[0].checkPoint();
	}
}