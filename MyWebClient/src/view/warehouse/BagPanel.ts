class BagPanel extends BaseTabView {
	private itemLayer: eui.Group;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.BagPanelSkin;
	}
	protected onInit(): void {
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT.toString(), this.onRefresh, this);
	}
	protected onRemove(): void {
		super.onRemove();
		GameDispatcher.instance.removeEventListener(FishTankEevent.FISH_INPUT_EVENT.toString(), this.onRefresh, this);
	}
	protected onRefresh(): void {
		this.itemLayer.removeChildren();
		var fishs = DataManager.instance.playerM.player.getFishByLoction(FISH_POST.BAG);
		var item: BagInstance;
		for (var i: number = 0; i < fishs.length; i++) {
			item = new BagInstance();
			item.data = fishs[i];
			this.itemLayer.addChild(item);
		}
	}
}
class BagInstance extends BaseComp {
	protected _data: FishData;
	private goods: GoodsInstence;
	private lab_num: eui.Label;
	private btn_back: eui.Button;
	public constructor() {
		super();
		this.skinName = skins.BagInstanceSkin;
	}
	protected onLoadComplete(): void {
		super.onLoadComplete();
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBack, this);
	}
	protected onInit() {
		this.goods.data = this._data;
	}
	private onTouchBack(): void {
		GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, this._data);
	}
}
