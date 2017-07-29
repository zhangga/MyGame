class FriendGiftListPanel extends BaseWindowPanel {
	private friend_list: eui.List;
	private scorll: eui.Scroller;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.FriendGiftPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("gift_food_title_png");
		this.friend_list.itemRenderer = FriendGiftListItem;
		this.friend_list.itemRendererSkinName = skins.FriendGiftItemSkin;
		this.friend_list.useVirtualLayout = true;
		this.scorll.viewport = this.friend_list;
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_GIFT_MESAAGE.toString(), this.onRefresh, this);
	}
	protected onRemove(): void {
		super.onRemove();
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_GIFT_MESAAGE.toString(), this.onRefresh, this);
	}
	protected onRefresh(): void {
		this.friend_list.dataProvider = new eui.ArrayCollection(DataManager.instance.friendM.firends);
	}
	//The end
}
class FriendGiftListItem extends eui.ItemRenderer {
	private name_label: eui.Label;
	private recgift_num_label: eui.Label;
	private gift_btn: eui.Button;
	private head_bar: PlayerHeadBar;

	constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(): void {
		this.gift_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGiftBtn, this);
	}
	protected dataChanged(): void {
		var friendObj: SimplePlayer = this.data;
		// this.recgift_num_label.text = friendObj.reviceGift + "/" + GameDefine.FRIEND_RECGIFT_MAX;
		this.name_label.text = friendObj.name;
		this.gift_btn.enabled = !DataManager.instance.friendM.onCheckIsGift(friendObj.id);
		this.head_bar.headIcon = new PlayerHeadParam(friendObj.id, friendObj.avatarUrl);
	}
	private onTouchGiftBtn(): void {
		var friendObj: SimplePlayer = this.data;
		if (!DataManager.instance.friendM.onCheckIsGift(friendObj.id)) {
			DataManager.instance.friendM.onSendFriendGiftMsg(friendObj.id);
		}
	}
	//The end
}