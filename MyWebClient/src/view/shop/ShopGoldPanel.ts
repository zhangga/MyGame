class ShopGoldPanel extends BaseTabView {
	private itemLayer: eui.Group;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.ShopGoldPanelSkin;
	}
	protected onInit(): void {
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
	}
	protected onRemove(): void {
		super.onRemove();
	}
	protected onRefresh(): void {
		this.itemLayer.removeChildren();
		var models = ModelManager.instance.modelShop;
		var model: ModelShop;
		var item: ShopItem;
		for (var key in models) {
			model = models[key];
			if (model.type == SHOP_TYPE.GOLD) {
				item = new ShopItem();
				item.data = model;
				this.itemLayer.addChild(item);
			}
		}
	}
}
class ShopItem extends BaseComp {
	protected _data: ModelShop;
	private img_fish: eui.Image;
	private img_coin: eui.Image;
	private lab_price: eui.Label;
	public constructor() {
		super();
		this.skinName = skins.ShopItemSkin;
	}
	protected onInit() {
		if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		}
		var model = GameCommon.instance.getThingModel(this._data.cosume[0].type, this._data.cosume[0].id);
		this.img_coin.source = model.dropicon;
		this.lab_price.text = `${this._data.cosume[0].num}`;
		// var fishD = new FishData(this._data.reward.id, 1);
		// this.img_fish.source = `${fishD.moveRes}_png`;
	}
	private onTouch() {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
			new WindowParam(
				"ItemIntroducebar",
				new IntroduceBarParam(INTRODUCE_TYPE.SHOP, this._data)
			)
		);
	}
}