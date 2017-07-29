class InviteGiftPanel extends BaseWindowPanel {
	private scorll: eui.Scroller;
	private invite_list: eui.List;
	private qq_invite_btn: eui.Button;
	private weixin_invite_btn: eui.Button;

	private INVITE_MAX: number = 45;
	private invate_items: InviteGiftItem[];
	private _intervalTime: number = 0;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.InviteGiftPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("zhuanzuanshi_png");
		this.invate_items = [];
		for (var i: number = 0; i < this.INVITE_MAX; i++) {
			var inviteItem: InviteGiftItem = new InviteGiftItem(i);
			this.invate_items.push(inviteItem);
			this.invite_list.addChild(inviteItem);
		}
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.qq_invite_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
		this.weixin_invite_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.INIVTEGIFT_REWARD_MSG + "_TO_VIEW", this.onUpdateReward, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.INIVTEGIFT_FRIENDLIST_MSG.toString(), this.onUpdateInviteList, this);
		for (var i: number = 0; i < this.invate_items.length; i++) {
			var inviteItem: InviteGiftItem = this.invate_items[i];
			inviteItem.onRegist();
		}
	}
	protected onRemove(): void {
		super.onRemove();
		this.qq_invite_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
		this.weixin_invite_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.INIVTEGIFT_REWARD_MSG + "_TO_VIEW", this.onUpdateReward, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.INIVTEGIFT_FRIENDLIST_MSG.toString(), this.onUpdateInviteList, this);
		for (var i: number = 0; i < this.invate_items.length; i++) {
			var inviteItem: InviteGiftItem = this.invate_items[i];
			inviteItem.onRemove();
		}
	}
	protected onRefresh(): void {
		if (this._intervalTime > egret.getTimer()) {
			this._intervalTime = egret.getTimer() + 30000;
			this.onUpdateInviteList();
		} else {
			DataManager.instance.friendM.onSendIniviteGiftListMsg();
		}
	}
	private onUpdateInviteList(): void {
		for (var i: number = 0; i < this.invate_items.length; i++) {
			var inviteItem: InviteGiftItem = this.invate_items[i];
			inviteItem.onUpdate();
		}
	}
	private onUpdateReward(evnet: egret.Event): void {
		var giftFriend: FriendInviteGift = evnet.data as FriendInviteGift;
		for (var i: number = 0; i < this.invate_items.length; i++) {
			var inviteItem: InviteGiftItem = this.invate_items[i];
			if (inviteItem.giftFriend.id == giftFriend.id) {
				inviteItem.onUpdate();
				break;
			}
		}
	}
	private onShare(): void {
		SDKManager.share(new SDKShareContainer());
	}
}
class InviteGiftItem extends eui.Component {
	private index: number;
	private name_label: eui.Label;
	private reward_btn: eui.Button;
	private head_bar: PlayerHeadBar;

	public constructor(index: number) {
		super();
		this.index = index;
		this.skinName = skins.InviteGiftItemSkin;
	}

	public onUpdate(): void {
		if (this.giftFriend) {
			this.currentState = this.giftFriend.isReceived ? "over" : "reward";
			this.name_label.text = "" + this.giftFriend.name;
			this.head_bar.headIcon = new PlayerHeadParam(this.giftFriend.id, this.giftFriend.avatarUrl);
		} else {
			this.currentState = "opening";
			this.name_label.text = "" + (this.index + 1);
		}
	}

	public get giftFriend(): FriendInviteGift {
		return DataManager.instance.friendM.getInvitegiftFrined(this.index);
	}

	public onRegist(): void {
		this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItemRewardBtn, this);
	}

	public onRemove(): void {
		this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItemRewardBtn, this);
	}

	private onTouchItemRewardBtn(): void {
		DataManager.instance.friendM.onSendRewardInviteGiftMsg(this.giftFriend.id);
	}
	//The end
}