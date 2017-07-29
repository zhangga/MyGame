class FriendGiftPanel extends BaseWindowPanel {
	private gift_num_label: eui.Label;
	private gift_btn: eui.Button;
	private receive_gift_label: eui.Label;
	private receive_giftlog_grp: eui.Group;

	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.FriendGiftLogPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("gift_food_title_png");
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.gift_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenGiftList, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_GIVEFOOD_MSG.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_GIFT_MESAAGE.toString(), this.updateGiftNum, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.gift_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenGiftList, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_GIVEFOOD_MSG.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_GIFT_MESAAGE.toString(), this.updateGiftNum, this);
	}
	private onOpenGiftList(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "FriendGiftListPanel");
	}
	protected onRefresh(): void {
		this.updateGiftNum();
		this.receive_giftlog_grp.removeChildren();
		for (var i: number = 0; i < DataManager.instance.friendM.gives.length; i++) {
			var playerId: number = DataManager.instance.friendM.gives[i];
			var playerData: SimplePlayer = DataManager.instance.friendM.getFriendDataById(playerId);
			if (playerData) {
				var logItem: FriendGiftLogItem = new FriendGiftLogItem(playerData);
				this.receive_giftlog_grp.addChild(logItem);
			}
		}
	}
	private updateGiftNum(): void {
		this.gift_num_label.text = "×" + DataManager.instance.friendM.leftGiftNum;
		this.receive_gift_label.text = `${Language.instance.getDescByKey("friend_total_recive")}：${DataManager.instance.friendM.giftReciveNum}/${GameDefine.FRIEND_RECGIFT_MAX}`;
	}
	//The end
}
class FriendGiftLogItem extends eui.Component {
	private playerData: SimplePlayer;
	private name_label: eui.Label;
	private desc_label: eui.Label;
	public constructor(player: SimplePlayer) {
		super();
		this.playerData = player;
		this.once(egret.Event.COMPLETE, this.onCreate, this);
		this.skinName = skins.FriendGiftLogItemSkin;
	}
	private onCreate(): void {
		this.name_label.text = this.playerData.name;
		this.desc_label.text = Language.instance.getDescByKey("friend_recive_food");
	}
	//The end
}