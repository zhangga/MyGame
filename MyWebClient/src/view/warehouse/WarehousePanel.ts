class WarehousePanel extends BaseSystemPanel {
	private tabGrp: TabBtnGroup;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.WarehousePanelSkin;
	}
	protected onInit(): void {
		var sysQueue = [];

		var param = new RegisterSystemParam();
		param.sysName = "BagPanel";
		// param.redP = this.points[1];
		// param.redP.addTriggerFuc(DataManager.getInstance().forgeManager, "getGemPointShow");
		sysQueue.push(param);

		this.registerPage(sysQueue, "forgeGrp", GameDefine.RED_TAB_POS);
		this.tabGrp.onUpdate(["warehouse_tab_bag"]);
		this.tabGrp.selectIndex = this.index;
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		// GameCommon.getInstance().addMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
		// GameDispatcher.getInstance().addEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
	}
	protected onRemove(): void {
		super.onRemove();
		// GameCommon.getInstance().removeMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
		// GameDispatcher.getInstance().removeEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
	}
	protected onRefresh(): void {
		super.onRefresh();
	}
	protected onTouchTab(e: egret.Event): void {
		super.onTouchTab(e);
		this.tabGrp.selectIndex = this.index;
	}
}