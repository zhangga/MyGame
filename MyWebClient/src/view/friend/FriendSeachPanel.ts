class FriendSeachPanel extends BaseWindowPanel {
	private seach_txt: eui.TextInput;
	private seach_btn: eui.Button;
	private myID_label: eui.Label;
	private name_label: eui.Label;
	private findID_label: eui.Label;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.FriendSeachPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("friend_apply_title_png");
		this.myID_label.text = Language.instance.getDescByKey("my") + "UID：" + DataManager.instance.playerM.player.id;
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.seach_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSeachFriend, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_SEACH_MSG.toString(), this.reqSeachFriend, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_ADD_MSG.toString(), this.onAddSuccess, this);
		this.onResetView();
	}
	protected onRemove(): void {
		super.onRemove();
		this.seach_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSeachFriend, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_SEACH_MSG.toString(), this.reqSeachFriend, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_ADD_MSG.toString(), this.onAddSuccess, this);
	}
	//面板重置
	private onResetView(): void {
		this.currentState = "seach";
		this.seach_txt.text = "";
	}
	//查询玩家
	private onSeachFriend(): void {
		if (this.currentState == "seach") {
			if (this.seach_txt.text.length == 0) {
				GameCommon.instance.addAlert(Language.instance.getDescByKey("input_not_null"));
				return;
			}
			var playerId: number = parseInt(this.seach_txt.text);
			if (playerId == DataManager.instance.playerM.player.id) {
				GameCommon.instance.addAlert(Language.instance.getDescByKey("input_not_selfid"));
				return;
			}
			DataManager.instance.friendM.onSendSeachPlayerMsg(playerId);
		} else if (this.currentState == "player") {
			if (this._seachPlayer) {
				DataManager.instance.friendM.onSendAddPlayerMsg(this._seachPlayer.id);
			}
		}
	}
	//查询返回
	private _seachPlayer: SimplePlayer;
	private reqSeachFriend(msgEvent: egret.Event): void {
		var message: Message = msgEvent.data;
		this.currentState = "player";
		this._seachPlayer = new SimplePlayer();
		this._seachPlayer.parsePlayer(message);
		this.name_label.text = this._seachPlayer.name;
		this.findID_label.text = "UID：" + this._seachPlayer.id;
	}
	//添加成功
	private onAddSuccess(msgEvent: egret.Event): void {
		var message: Message = msgEvent.data;
		var playerid: number = message.getInt();
		if (this._seachPlayer && playerid == this._seachPlayer.id) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("friend_apply_success"));
		}
		this.onHide();
	}
	//The end
}