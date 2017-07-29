class BottonMenuLayer extends eui.Component {
	protected points: RedPoint[] = RedPointManager.createPoint(4);
	public constructor() {
		super();
		// this.skinName = skins.BottonMenuLayerSkin;
		this.once(eui.UIEvent.COMPLETE, this.onLoadComplete, this);
	}
	public changeTab(type: number): void {
		if (this[`tab_${type}`]) {
			this[`tab_${type}`].selected = true;
		}
		GameDispatcher.instance.dispatcherEventWith(GameEvent.TOUCH_TAB_EVENT, false, this[`tab_${type}`].value);
	}
	private onLoadComplete() {
		this.addRedPoint();
		this.onRegister();
		this.addRedPoint();
	}
	private onRegister(): void {
		for (var i: number = 1; i <= 4; i++) {
			this[`tab_${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
		}
		GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_SHOW_EVENT, this.onTankRefreshShow, this);
	}
	private onTankRefreshShow(e: egret.Event): void {
		this.trigger();
	}
	private onTouchTab(e: egret.Event): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.TOUCH_TAB_EVENT, false, e.currentTarget.value);
	}
	private addRedPoint(): void {
		this.points[0].register(this[`tab_1`], GameDefine.RED_MAIN_II_POS, this, "onCheckFishCanUpgrade");
		this.points[1].register(this[`tab_2`], GameDefine.RED_MAIN_II_POS, this, "onCheckTechnologyRedPoint");
		this.points[2].register(this[`tab_3`], GameDefine.RED_MAIN_II_POS, this, "onCheckArtifactRedPoint");
		this.points[3].register(this[`tab_4`], GameDefine.RED_MAIN_II_POS, this, "onCheckFTCanAdvance");
	}
	public trigger(): void {
		var currID: number = DataManager.instance.playerM.player.currFGID;
		for (var i: number = 0; i < this.points.length; i++) {
			this.points[i].checkPoint(true, currID);
		}
	}
	public onCheckFishCanUpgrade(curr: number): boolean {
		if (DataManager.instance.playerM.player.onCheckFishCanUpgrade(curr)) return true;
		return false;
	}
	public onCheckTechnologyRedPoint(curr: number): boolean {
		if (DataManager.instance.technology.onCheckRedPoint(curr)) return true;
		return false;
	}
	public onCheckArtifactRedPoint(curr: number): boolean {
		if (DataManager.instance.playerM.player.onCheckDecorateRedPoint(curr)) return true;
		return false;
	}
	public onCheckFTCanAdvance(curr: number): boolean {
		if (DataManager.instance.playerM.player.onCheckFTCanAdvance()) return true;
		return false;
	}
}