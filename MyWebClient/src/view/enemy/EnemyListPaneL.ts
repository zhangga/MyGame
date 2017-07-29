class EnemyListPaneL extends BaseWindowPanel {
	private itemLayer: eui.Group;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.EnemyListPaneLSkin;
	}
	protected onInit(): void {
		this.setTitle("feed_enemy_title_png");
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
		var list: EnemyPlayer[] = DataManager.instance.enemy.list;
		var len: number = list.length;
		// var len: number = 10;
		var item: EnemyListItem;
		for (var i: number = 0; i < len; i++) {
			item = new EnemyListItem();
			item.data = list[i];
			this.itemLayer.addChild(item);
		}
	}
}
class EnemyListItem extends BaseComp {
	protected _data: EnemyPlayer;
	private btn_enemy: eui.Button;
	private lab_name: eui.Label;
	private lab_hint: eui.Label;
	private rank_head: PlayerHeadBar;
	public constructor() {
		super();
		this.skinName = skins.EnemyListItemSkin;
	}
	protected onLoadComplete(): void {
		super.onLoadComplete();
		this.btn_enemy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnHandler, this);
	}
	protected onInit() {
		this.lab_name.text = this._data.name;
		var sec: number = this._data.timestamp;
		switch (this._data.type) {
			case OTHER_BEHAVIOR_TYPE.POLLUTE:
				this.lab_hint.text = `${Language.instance.getDescByKey("chouren_wuran", GameCommon.instance.getOnlineTime(sec))}`;
				break;
			case OTHER_BEHAVIOR_TYPE.ROB:
				this.lab_hint.text = `${Language.instance.getDescByKey("chouen_touqu", GameCommon.instance.getOnlineTime(sec))}`;
				break;
		}
		this.rank_head.headIcon = new PlayerHeadParam(this._data.id, this._data.head);
	}
	private onTouchBtnHandler(): void {
		if (this._data) {
			DataManager.instance.visite.onSendVisitMessage(this._data.id, DataManager.instance.visite.type);
			GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_CLOSE, false, "EnemyListPaneL");
		}
	}
}