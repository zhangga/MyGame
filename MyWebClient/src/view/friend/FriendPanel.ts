class FriendPanel extends BaseWindowPanel {
	private scorll: eui.Scroller;
	private friend_list: eui.List;
	private add_btn: eui.Button;
	private gift_btn: eui.Button;
	private apply_btn: eui.Button;
	private friend_count_label: eui.Label;

	protected points: RedPoint[] = RedPointManager.createPoint(2);
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.FriendPanelSkin;
	}
	protected onInit(): void {
		this.scorll.verticalScrollBar.autoVisibility = true;
		this.scorll.verticalScrollBar.visible = true;
		this.friend_list.itemRenderer = FriendListItem;
		this.friend_list.itemRendererSkinName = skins.FriendListItemSkin;
		this.friend_list.useVirtualLayout = true;
		this.scorll.viewport = this.friend_list;

		this.points[0].register(this.gift_btn, GameDefine.RED_MAIN_POS, DataManager.instance.friendM, "onCheckCanGiveFishFood");
		this.points[1].register(this.apply_btn, GameDefine.RED_MAIN_POS, DataManager.instance.friendM, "onCheckhasApply");

		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.add_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenAddPanel, this);
		this.gift_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenGiftPanel, this);
		this.apply_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenApplyPanel, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_DELETE_MSG.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_ADD_SUCCESS_MSG.toString(), this.onRefresh, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.add_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenAddPanel, this);
		this.gift_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenGiftPanel, this);
		this.apply_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenApplyPanel, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG.toString(), this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_DELETE_MSG.toString(), this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_ADD_SUCCESS_MSG.toString(), this.onRefresh, this);
	}
	protected onRefresh(): void {
		this.updateFriendList();
		this.updateFirendCount();
		this.trigger();
	}
	//刷新好友列表
	private updateFriendList(): void {
		this.friend_list.dataProvider = new eui.ArrayCollection(DataManager.instance.friendM.firends);
	}
	//刷新好友数量
	private updateFirendCount(): void {
		this.friend_count_label.text = DataManager.instance.friendM.friendsNum + "/" + GameDefine.FRIEND_MAX;
	}
	//打开添加好友面板
	private onOpenAddPanel(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendSeachPanel");
	}
	//打开赠送好友鱼食面板
	private onOpenGiftPanel(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendGiftPanel");
	}
	//打开好友申请列表
	private onOpenApplyPanel(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendApplyListPanel");
	}
}
class FriendListItem extends eui.ItemRenderer {
	private baifang_btn: eui.Button;
	private delete_btn: eui.Button;
	private name_label: eui.Label;
	private money_label: eui.Label;
	private rank_label: eui.Label;
	private rank_icon: eui.Image;
	private player_head_bar: PlayerHeadBar;

	constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(): void {
		this.baifang_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBaifangBtn, this);
		this.delete_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDeleteBtn, this);
	}
	protected dataChanged(): void {
		var friendObj: SimplePlayer = this.data;
		if (friendObj.rankNum > 3) {
			this.rank_label.text = "" + friendObj.rankNum;
			this.rank_icon.visible = false;
		} else {
			this.rank_icon.visible = true;
			this.rank_label.text = "";
			this.rank_icon.source = `toprank_${friendObj.rankNum}_png`;
		}
		this.money_label.text = Language.instance.getDescByKey("player_total_money") + "：" + friendObj.money.toTextFormat();
		this.name_label.text = friendObj.name;
		this.player_head_bar.headIcon = new PlayerHeadParam(friendObj.id, friendObj.avatarUrl);
	}
	private onTouchBaifangBtn(): void {
		var friendObj: SimplePlayer = this.data;
		DataManager.instance.visite.onSendVisitMessage(friendObj.id, OTHER_BEHAVIOR_TYPE.VISIT);
	}
	private onTouchDeleteBtn(): void {
		var warnParam: WarningParam = new WarningParam(Language.instance.getDescByKey("friend_delete_notice"), this.onDeleteHandler, this);
		GameCommon.instance.onShowWarnigPanel(warnParam);
	}
	private onDeleteHandler(): void {
		var friendObj: SimplePlayer = this.data;
		DataManager.instance.friendM.onSendDeletePlayerMsg(friendObj.id);
	}
	//The end
}