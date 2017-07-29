class FieldGuidePanel extends BaseWindowPanel {
	private itemLayer: eui.Group;
	private lab_crownNum: eui.Label;
	private lab_total: eui.Label;
	private unLockLayer: eui.Group;
	private btn_unLock: eui.Button;
	private btn_left: eui.Button;
	private btn_right: eui.Button;
	private _index: number;
	private pos: egret.Point[];
	private lab_page: eui.Label;
	private layerUp: eui.Group;
	private layerDown: eui.Group;
	protected points: RedPoint[] = RedPointManager.createPoint(3);
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.FieldGuidePanelSkin;
	}
	protected onInit(): void {
		this.setTitle("fieldGuide_title_png", true, "public_pop_titleBg2_png");
		DataManager.instance.fieldGuide;
		var models = ModelManager.instance.modelFieldGuide;
		this.pos = [];
		for (var i: number = 0; i < GameDefine.FIELDGUIDE_PAGE_NUM; i++) {
			this.pos.push(new egret.Point(this[`item${i}`].x, this[`item${i}`].y));
			this[`item${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToucItemhHandler, this);
		}
		this.points[0].register(this.btn_left, GameDefine.RED_TAB_POS, DataManager.instance.fieldGuide, "onCheckRedPointByFDID");
		this.points[1].register(this.btn_right, GameDefine.RED_TAB_POS, DataManager.instance.fieldGuide, "onCheckRedPointByFDID");
		this.points[2].register(this.btn_unLock, GameDefine.RED_TAB_POS, this, "onCheckUnlockNew");

		super.onInit();
		this.index = DataManager.instance.playerM.player.openFGID;
	}
	protected onRegist(): void {
		super.onRegist();
		GameDispatcher.instance.addEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.trigger, this);
		GameDispatcher.instance.addEventListener(GameEvent.FIELDGUIDE_DEBLOCKING_EVENT, this.onRefresh, this);
		this.btn_unLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnLockHandler, this);
		this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLeftHander, this);
		this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRightHander, this);
		DataManager.instance.syncM.onSendQue();//提前同步5秒操作
	}
	protected onRemove(): void {
		super.onRemove();
		GameDispatcher.instance.removeEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.trigger, this);
		GameDispatcher.instance.removeEventListener(GameEvent.FIELDGUIDE_DEBLOCKING_EVENT, this.onRefresh, this);
		this.btn_unLock.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnLockHandler, this);
		this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLeftHander, this);
		this.btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRightHander, this);
	}
	protected onRefresh(): void {
		// var player = DataManager.instance.playerM.player;
		// this.lab_crownNum.text = `x${player.crown}`;
		// var modelFish: ModelFish;
		// var models = ModelManager.instance.modelFieldGuide;
		// var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[this.index];
		// var param: number;
		// for (var i: number = 0; i < GameDefine.FIELDGUIDE_PAGE_NUM; i++) {
		// 	param = parseInt(model.jiegou[i]);
		// 	this[`item${i}`].visible = param != 0;
		// 	if (param != 0) {
		// 		this[`item${i}`].data = new FieldGuideItemParam(param, model.jiegou);
		// 		modelFish = ModelManager.instance.modelFish[param];
		// 		if (modelFish) {
		// 			this[`item${i}`].y = this.pos[i].y + modelFish.offY;
		// 		}
		// 	}
		// }
		// var nextID: number = Number(this.index) + 1;
		// var next: ModelFieldGuide = ModelManager.instance.modelFieldGuide[nextID];
		// if (next && player.openFGID < nextID) {
		// 	var crownInfo = player.getCrownHasAndTotalByPage(next.tiaojian.id);
		// 	this.btn_unLock.visible = true;
		// 	this.btn_unLock.scaleY = 1;
		// 	if (crownInfo[0] >= next.tiaojian.num && next.tiaojian.type == FIELDGUIDE_UNLOCK_TYPE.NEDD_CROWN_NUM) {
		// 		this.btn_unLock.enabled = true;
		// 	} else {
		// 		this.btn_unLock.enabled = false;
		// 	}
		// 	this.lab_total.visible = true;
		// 	this.lab_total.text = `当前页累计皇冠${crownInfo[0]}/${next.tiaojian.num}`;
		// } else {
		// 	this.lab_total.visible = false;
		// 	this.btn_unLock.visible = false;
		// 	this.btn_unLock.scaleY = 0;
		// }
		// this.lab_page.text = `${this.index}/${GameDefine.PLAYER_FIELDGUIDE_MAX}`;
		// this.layerUp.visible = this.index != 1;
		// this.layerDown.visible = (this.index != GameDefine.PLAYER_FIELDGUIDE_MAX && this.index < DataManager.instance.playerM.player.openFGID);
		// this.trigger();
	}
	private onCheckUnlockNew(): boolean {
		return this.btn_unLock.enabled;
	}
	private onTouchLeftHander(): void {
		if (this.index > 1) {
			this.index--;
		}
	}
	private onTouchRightHander(): void {
		if (this.index + 1 > DataManager.instance.playerM.player.openFGID) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey(`fieldGuide_not_unlock`));
			return;
		}
		if (this.index < GameDefine.PLAYER_FIELDGUIDE_MAX) {
			this.index++;
		}
	}
	private onTouchBtnHandler(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "WarehousePanel");
	}
	private onTouchBtnLockHandler(): void {
		++DataManager.instance.playerM.player.openFGID;
		DataManager.instance.syncM.onAddMessage(SyncFactory.onPackUnlockFieldGuide(DataManager.instance.playerM.player.openFGID));
		GameDispatcher.instance.dispatcherEventWith(GameEvent.FIELDGUIDE_DEBLOCKING_EVENT, false);
	}

	private set index(param) {
		if (this.index != param) {
			this._index = param;
			this.onRefresh();
		}
	}
	private get index() {
		return this._index;
	}
	private onToucItemhHandler(e: egret.TouchEvent): void {

	}
	public trigger(): void {
		this.points[0].checkPoint(true, this.index - 1);
		this.points[1].checkPoint(true, this.index + 1);
		this.points[2].checkPoint();
		for (var i: number = 0; i < GameDefine.FIELDGUIDE_PAGE_NUM; i++) {
			(this[`item${i}`] as FieldGuideItem).trigger();
		}
	}
}
class FieldGuideItemBase extends BaseComp {
	protected _data: number;
	protected img_fish: eui.Image;
	private lab_name: eui.Label;
	private bg_img: eui.Image;
	private crownbar: CrownBar;
	private _isUnlock: boolean;
	public lockLayer: eui.Group;
	public crownInfo: CrownData;
	public constructor() {
		super();
		this.skinName = skins.FieldGuideItemBaseSkin;
	}
	protected onInit() {
		// var player = DataManager.instance.playerM.player;
		// this.crownInfo = player.getCrownInfoByID(this._data);//解锁情况
		// this.img_fish.source = this.crownInfo.model.icon;
		// this.lab_name.text = Language.instance.getDescByKey(this.crownInfo.model.name);
		// this.crownbar.data = this.crownInfo;
		// this._isUnlock = this.crownInfo.isUnlock;
		// this.lockLayer.visible = !this.state;
		// this.bg_img.source = this.crownInfo.crown == this.crownInfo.model.starMax ? "fieldGuide_item_bg2_png" : "fieldGuide_item_bg_png";
	}
	public get state() {
		return this._isUnlock;
	}
}


class FieldGuideItem extends BaseComp {
	public fishID: number;
	private infoLayer: FieldGuideItemBase;
	protected _data: FieldGuideItemParam;
	private arrowLayer: eui.Group;
	private price: number;
	public crownInfo: CrownData;
	protected points: RedPoint[] = RedPointManager.createPoint(1);
	public constructor() {
		super();
		this.skinName = skins.FieldGuideItemSkin;
	}
	protected onInit() {
		// if (!this.infoLayer.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
		// 	this.infoLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchInfoHandler, this)
		// }
		// this.fishID = this._data.fishID;
		// this.points[0].register(this, GameDefine.RED_FIELD_ITEM_POS, DataManager.instance.fieldGuide, "onCheckRedPontByFishID", this.fishID);
		// this.infoLayer.data = this._data.fishID;
		// this.crownInfo = this.infoLayer.crownInfo;
		// var player = DataManager.instance.playerM.player;
		// this.infoLayer.rotation = this.infoLayer.crownInfo.model.angle;
		// this.price = UnitDefine.getTrueInfinite(this.crownInfo.modelLvFirst.lvConsume.num, PLAYER_EFFECT.PRICE_RATE).num;
		// var fishIndex: number = this._data.jiegou.indexOf(this._data.fishID.toString());
		// var len: number = this.crownInfo.model.next.length;
		// var childIndex: number;
		// for (var i: number = 0; i < 5; i++) {
		// 	this[`img_${i}`].visible = false;
		// }
		// for (var i: number = 0; i < len; i++) {
		// 	if (this.crownInfo.model.next[i] == "0") continue;
		// 	childIndex = this._data.jiegou.indexOf(this.crownInfo.model.next[i]);
		// 	var distance: number = childIndex - fishIndex;
		// 	distance = Math.max(0, distance);
		// 	this[`img_${distance}`].visible = true;
		// 	if (this[`img_${distance}`].visible) {
		// 		if (!player.getCrownInfoByID(parseInt(this.crownInfo.model.next[i])).isUnlock) {
		// 			this[`img_${distance}`].source = `fieldGuide_${distance == 3 || distance == 1 || distance == 5 ? "arrow" : "line"}_0_png`;
		// 			this.arrowLayer.addChild(this[`img_${distance}`]);
		// 		} else {
		// 			this[`img_${distance}`].source = `fieldGuide_${distance == 3 || distance == 1 || distance == 5 ? "arrow" : "line"}_1_png`;
		// 		}
		// 	}
		// }
		// this.trigger();
	}
	private onTouchInfoHandler(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
			new WindowParam(
				"ItemIntroducebar",
				new IntroduceBarParam(INTRODUCE_TYPE.FIELDGUIDE, this)
			)
		);
	}
	private onTouchBtnHandler(): void {
		// var player = DataManager.instance.playerM.player;
		// if (this.infoLayer.state) {
		// 	if (!player.getFishIsCanBuy(this.crownInfo.id)) {
		// 		GameCommon.instance.addAlert(Language.instance.getDescByKey(`is_fish_upper_limit`));
		// 		return;
		// 	}
		// 	if (this.crownInfo.modelLvFirst.lvConsume.type == SHOP_TYPE.GOID) {
		// 		if (this.price > player.getCurrency(SHOP_TYPE.GOID)) {
		// 			GameCommon.instance.addAlert(Language.instance.getDescByKey(`error_tips3`));
		// 			return;
		// 		}
		// 		var warnParam: WarningParam = new WarningParam(Language.instance.getDescByKey("fieldguide_buy_fish_notice", Language.instance.getDescByKey(this.crownInfo.model.name)), this.onBuyHandler, this);
		// 		GameCommon.instance.onShowWarnigPanel(warnParam);
		// 	}
		// }
	}
	private onBuyHandler(): void {
		var player = DataManager.instance.playerM.player;
		DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFieldGuideBuy(this._data.fishID, 1));
		var one = player.getNewOneFish(this._data.fishID);
		GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, one);
		player.addGoldAndUpgrade(-this.price);
		var hint: string = Language.instance.getDescByKey(`fieldguide_buy_fish_succeed`, Language.instance.getDescByKey(this.crownInfo.model.name));
		GameCommon.instance.addAlert(hint);
	}
	public trigger(): void {
		this.points[0].checkPoint();
	}
}
class FieldGuideItemParam {
	public fishID: number;
	public jiegou: string[];
	public constructor(fishID, jiegou) {
		this.fishID = fishID;
		this.jiegou = jiegou;
	}
}
class FieldGuideTabBtn extends BaseComp {
	protected _data: ModelFieldGuide;
	private btn_type: eui.RadioButton;
	public constructor() {
		super();
		this.skinName = skins.FieldGuideTabBtnSkin;
	}
	protected onInit() {
		this.btn_type.label = Language.instance.getDescByKey(this._data.name);
	}
	public set selected(param) {
		this.btn_type.selected = param;
	}
	public setEnabled(param) {
		this.btn_type.enabled = param;
	}
}