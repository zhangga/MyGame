class GiftTimeLimitPanel extends BaseWindowPanel {

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.GiftTimeLimitPanelSkin;
	}
	protected onInit(): void {
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
}