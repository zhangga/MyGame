class OtherFishTank extends BaseWindowPanel {
	private player: BeVisitedPlayer;
	private fishTankLayer: eui.Group;
	private param: OtherFishTankParam;
	private _feed: OtherFeedView;
	private lab_fishTankname: eui.Label;
	private fishTankShow: FishTankLayer;
	private fishtank_bar: FishTanksBar;//鱼缸bar
	private _currTankId: number;//当前鱼缸ID

	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.OtherFishTankSkin;
	}
	public onShowWithParam(param: OtherFishTankParam): void {
		this.param = param;
		this.onShow();
	}
	protected onInit(): void {
		super.onInit();
		this.onInitScenes();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this._feed.onRegist();
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		GameDispatcher.instance.addEventListener(GameEvent.DECORATE_SELECT_SCENE_OTHER, this.onSelectScene, this);
	}
	protected onRemove(): void {
		DataManager.instance.playerM.player.inOtherHome = false;
		super.onRemove();
		this._feed.onRemove();
		this.onDestoryFishs();
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		GameDispatcher.instance.removeEventListener(GameEvent.DECORATE_SELECT_SCENE_OTHER, this.onSelectScene, this);
	}
	protected onRefresh(): void {
		this._feed.data = this.param;
		this.player = DataManager.instance.visite.player;
		if (!this.player) return;
		this.lab_fishTankname.text = `${this.player.name}的鱼缸`;
		this.fishtank_bar.onUpdateAllItems();
		//好友的鱼缸
		this._currTankId = 1;
		var models = ModelManager.instance.modelFieldGuide;
		var lv: number;
		for (var key in this.player.book) {
			var _bookData: BookData = this.player.book[key];
			if (_bookData.level > 0) {
				this._currTankId = _bookData.id;
			}
		}
		this.onSelectScene();
	}
	private onEnterFrame() {
		for (var i: number = this.fishTankLayer.numChildren - 1; i >= 0; i--) {
			var obj = this.fishTankLayer.getChildAt(i) as FishBase;
			obj.onAction();
		}
	}
	//供子类覆盖
	public onReset(): void {
		this.onDestoryFishs();
		var fish;
		var pos;
		var id: number;
		var fishs = this.player.getFishByLoction(FISH_POST.WATERVAT);
		for (var i: number = 0; i < fishs.length; i++) {
			var _fishData: ModelFish = ModelManager.instance.modelFish[fishs[i].id];
			if (this._currTankId == _fishData.yugangId) {
				fish = FactoryManager.onBuildEnjoyFishOne(fishs[i].id);
				fish.data = fishs[i];
				pos = GameCommon.instance.getPos(12, 12);
				fish.x = pos.x;
				fish.y = pos.y;
				this.fishTankLayer.addChild(fish);
			}
		}
	}
	public onDestoryFishs(): void {
		for (var i: number = this.fishTankLayer.numChildren - 1; i >= 0; i--) {
			var obj = this.fishTankLayer.getChildAt(i) as FishBase;
			obj.onDestory();
		}
	}
	/**
	 * 初始化鱼缸列表
	 */
	private onInitScenes(): void {
		var _tankItems: DecorateItem[] = [];
		//所有的场景
		var models = ModelManager.instance.modelFieldGuide;
		for (var key in models) {
			var model: ModelFieldGuide = models[key];
			if (model && model.tier == 0) {
				var sceneItem: DecorateItem = new DecorateItem(model.type);
				// sceneItem.onRefresh();
				_tankItems.push(sceneItem);
			}
		}
		this.fishtank_bar.onRegist(_tankItems, 1, "open");
	}
	/**
	 * 选择鱼缸
	 */
	private onSelectScene(e: egret.Event = null): void {
		if (e) {
			this._currTankId = parseInt(e.data);
		}
		//去除选择框
		this.fishtank_bar.onSeletItem(this._currTankId);
		//刷新鱼缸显示
		var lv = this.player.decorate_show[this._currTankId];
		if (!lv) lv = 0;
		this.fishTankShow.onRefreshShow(this._currTankId, lv, this.player.decorate_show);
		this.onReset();
	}
}
class OtherFishTankParam {
	public data;
	public constructor(location: number, data) {
		this.data = data;
	}
}
/**其他鱼缸行为类型**/
enum OTHER_BEHAVIOR_TYPE {
	VISIT = 1,//拜访
	POLLUTE = 2,//污染
	ROB = 3,//打劫
}