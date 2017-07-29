/**
 * 鱼缸显示类
 * 
 * 
 * **/
class FishTankView extends BaseUI {
	private fishTankLayer: eui.Group;
	private fishTankShow: FishTankLayer;
	private layerUp: eui.Group;
	private layerDown: eui.Group;
	// private btn_left: eui.Button;
	// private btn_right: eui.Button;

	private fishs = {};
	public constructor() {
		super();
		this.skinName = skins.FishTankViewSkin;
	}
	protected onInit(): void {
		this.onReset();
		this.onRefreshShow();
		this.fishTankShow.onAddAnimation();
	}
	//供子类覆盖
	public onReset(): void {
		// this.onRefreshArrow();
		this.onDestoryFishs();
		var player = DataManager.instance.playerM.player;
		var fish;
		var pos;
		var id: number;
		var fishs = player.getFishByLoction(player.currFGID);
		for (var i: number = 0; i < fishs.length; i++) {
			fish = FactoryManager.onBuildFishOne(fishs[i].id);
			fish.data = fishs[i];
			pos = GameCommon.instance.getPos(12, 12, 1, 1);
			fish.x = pos.x;
			fish.y = pos.y;
			this.addFish(fish);
		}
	}
	public onDestoryFishs(): void {
		var base: FishBase;
		for (var key in this.fishs) {
			base = this.fishs[key];
			base.onDestory();
		}
		this.fishs = {};
	}
	protected onRegist(): void {
		// this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLeftHander, this);
		// this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRightHander, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	protected onRemove(): void {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	private onEnterFrame() {
		var base: FishBase;
		for (var key in this.fishs) {
			base = this.fishs[key];
			base.onAction();
		}
	}
	public onRefreshArrow(): void {
		var player = DataManager.instance.playerM.player;
		this.layerUp.visible = player.currFGID != 1;
		this.layerDown.visible = (player.currFGID != GameDefine.PLAYER_FIELDGUIDE_MAX && player.currFGID < DataManager.instance.playerM.player.openFGID);
	}
	private onTouchLeftHander(): void {
		var player = DataManager.instance.playerM.player;
		if (player.currFGID > 1) {
			player.currFGID--;
			this.onReset();
		}
	}
	private onTouchRightHander(): void {
		var player = DataManager.instance.playerM.player;
		if (player.currFGID < player.openFGID) {
			player.currFGID++;
			this.onReset();
		}
	}
	private onTouchTap(e: egret.TouchEvent) {
		if (egret.is(e.target, "eui.Group")) {
			GameDispatcher.instance.dispatcherEventWith(FishTankEevent.COIN_OUT_PUT_EVENT, false, e);
		}
	}
	public onTime(): void {
		var base: Fish;
		for (var key in this.fishs) {
			base = this.fishs[key];
			base.onTime();
		}
	}
	public onPutInFishTank(e: egret.Event): void {
		var data = e.data as FishData;
		this.onPutFish(data.id);
	}
	private onPutFish(uid: number): void {
		var data = DataManager.instance.playerM.player.getFishByID(uid);
		var fish = FactoryManager.onBuildFishOne(data.id);
		fish.data = data;
		var pos = GameCommon.instance.getPos(12, 12);
		fish.x = pos.x;
		fish.y = pos.y;
		this.addFish(fish);
	}
	private addFish(fish: FishBase) {
		this.fishs[fish.data.id] = fish;
		this.fishTankLayer.addChild(fish);
	}
	public delFish(uid: number) {
		if (this.fishs[uid]) {
			var fish: FishBase = this.fishs[uid];
			fish.onDestory();
			delete this.fishs[uid];
		}
	}

	/**
	 * 刷新鱼缸显示
	 */
	public onRefreshShow(): void {
		var player: Player = DataManager.instance.playerM.player;
		this.fishTankShow.onRefreshShow(player.currFGID, player.getBookLv(player.currFGID), player.decorate_show);
	}
	/**
	 * 刷新鱼缸部位显示
	 */
	public onRefreshPart(): void {
		var player: Player = DataManager.instance.playerM.player;
		this.fishTankShow.onRefreshPart(player.currFGID, player.decorate_show);
	}
	/**
	 * 刷新鱼缸背景显示
	 */
	public onRefreshBg(): void {
		var player: Player = DataManager.instance.playerM.player;
		this.fishTankShow.onRefreshBg(player.currFGID, player.getBookLv(player.currFGID));
	}

	public onUpgradeHandler(e: egret.Event): void {
		var base: Fish;
		var uid: number = e.data;
		base = this.fishs[uid];
		if (base) {
			base.onShowLevelUp();
		}
	}
	public onGetFishByID(id: number): Fish {
		return this.fishs[id];
	}

	public onEvolutionHandler(e: egret.Event): void {
		var param: RandEventParam = e.data;
		var fish: Fish = this.fishs[param.uid];
		if (fish) {
			fish.onEvolutionHandler(param);
		}
	}
	public onShowEmojiHandler(e: egret.Event): void {
		var param: RandEventParam = e.data;
		var fish: Fish = this.fishs[param.uid];
		if (fish) {
			fish.onShowEmojiHandler(param);
		}
	}
}