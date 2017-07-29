class FriendApplyListPanel extends BaseWindowPanel {
	private apply_list: eui.List;
	private scroll: eui.Scroller;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.FriendApplyListPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("friend_apply_log_title_png");
		this.apply_list.itemRenderer = FriendApplyItem;
		this.apply_list.itemRendererSkinName = skins.FriendApplyItemSkin;
		this.apply_list.useVirtualLayout = true;
		this.scroll.viewport = this.apply_list;
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_REJECT_APPLY_MSG.toString(), this.onRefresh, this);
	}
	protected onRemove(): void {
		super.onRemove();
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG.toString(), this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_REJECT_APPLY_MSG.toString(), this.onRefresh, this);
	}
	protected onRefresh(): void {
		this.apply_list.dataProvider = new eui.ArrayCollection(DataManager.instance.friendM.applys);
	}
}
class FriendApplyItem extends eui.ItemRenderer {
	private name_label: eui.Label;
	private money_label: eui.Label;
	private agree_btn: eui.Button;
	private reject_btn: eui.Button;
	private head_bar: PlayerHeadBar;

	constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(): void {
		this.agree_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgree, this);
		this.reject_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReject, this);
	}
	protected dataChanged(): void {
		var friendObj: SimplePlayer = this.data;
		this.money_label.text = Language.instance.getDescByKey("player_total_money") + "：" + friendObj.money.toTextFormat();
		this.name_label.text = friendObj.name;
		this.head_bar.headIcon = new PlayerHeadParam(friendObj.id, friendObj.avatarUrl);
	}
	private onAgree(): void {
		var friendObj: SimplePlayer = this.data;
		DataManager.instance.friendM.onSendAgreeMsg(friendObj.id);
	}
	private onReject(): void {
		var friendObj: SimplePlayer = this.data;
		DataManager.instance.friendM.onSendRejectMsg(friendObj.id);
	}
	//The end
}