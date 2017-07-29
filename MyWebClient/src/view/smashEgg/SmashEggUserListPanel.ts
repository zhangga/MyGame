class SmashEggUserListPanel extends BaseWindowPanel {
	private scorll: eui.Scroller;
	private friend_list: eui.List;
	private invite_giftnum_label: eui.Label;
	private chuizi_num_label: eui.Label;
	private act_lefttime_label: eui.Label;
	private btn_back: eui.Button;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.SmashEggUserListSkin;
	}
	protected onInit(): void {
		this.setTitle("smash_egg_title_png");
		this.friend_list.itemRenderer = SmashEggUserListItem;
		this.friend_list.itemRendererSkinName = skins.SmashEggUserListItemSkin;
		this.friend_list.useVirtualLayout = true;
		this.scorll.viewport = this.friend_list;
		super.onInit();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.SMASHEGG_FRIEND_INFO_MSG.toString(), this.onUpdate, this);
		this.onRequestUserListMsg();
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.SMASHEGG_FRIEND_INFO_MSG.toString(), this.onUpdate, this);
		this.onCloseRecTimer();
	}
	private onRequestUserListMsg(): void {
		DataManager.instance.smasheggM.onSendSmashUserlistMsg();
	}
	private onUpdate(): void {
		this.onStartTimer();
		this.onUpdateHammerNum();
		this.friend_list.dataProvider = new eui.ArrayCollection(this.smashM.smashUserInfos);
	}
	private onUpdateHammerNum(): void {
		this.invite_giftnum_label.text = `${this.smashM.sharegiftNum}/${GameDefine.SMASHEGG_INVITE_MAX}`;
		this.chuizi_num_label.text = `×${this.smashM.hammerNum}`;
	}
	private get smashM(): SmashEggManager {
		return DataManager.instance.smasheggM;
	}
	/**倒计时操作**/
	private _timerStart: boolean = false;
	private onStartTimer(): void {
		if (!this._timerStart) {
			this._timerStart = true;
			Tool.addTimer(this.onTimerDown, this, 1000);
		}
	}
	private onTimerDown(): void {
		var _lefttime: number = DataManager.instance.smasheggM.actLefttime;
		if (_lefttime >= 0) {
			this.act_lefttime_label.text = GameCommon.instance.getTimeStrForSec1(_lefttime);
			for (var i: number = 0; i < this.friend_list.numChildren; i++) {
				var _listItem: SmashEggUserListItem = this.friend_list.getChildAt(i) as SmashEggUserListItem;
				if (_listItem)
					_listItem.onRefreshLefttime();
			}
		} else {
			this.onCloseRecTimer();
		}
	}
	private onCloseRecTimer(): void {
		this._timerStart = false;
		Tool.removeTimer(this.onTimerDown, this, 1000);
	}
	//The end
}
class SmashEggUserListItem extends eui.ItemRenderer {
	private left_eggnum_label: eui.Label;
	private hummer_num_label: eui.Label;
	private left_time_label: eui.Label;
	private name_label: eui.Label;
	private item_button: eui.Button;

	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(): void {
		this.item_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewOther, this);
	}
	protected dataChanged(): void {
		var info: SmashEggUserInfo = this.data as SmashEggUserInfo;
		if (info.userId == DataManager.instance.playerM.player.id) {
			this.currentState = "my";
			this.name_label.text = DataManager.instance.playerM.player.name;
		} else {
			this.currentState = "other";
			this.name_label.text = info.friendData ? info.friendData.name : "";
		}
		this.left_eggnum_label.text = Language.instance.getDescByKey("smashegg_left_num") + `：` + info.eggCount;
		this.hummer_num_label.text = Language.instance.getDescByKey("smashegg_comsume_num") + `：` + info.hammerCount;
	}
	public onRefreshLefttime(): void {
		this.left_time_label.text = GameCommon.instance.getTimeStrForSec2((this.data as SmashEggUserInfo).lefttime)
	}
	private onPreviewOther(): void {
		DataManager.instance.smasheggM.onSendSmashPreviewMsg((this.data as SmashEggUserInfo).userId);
	}
	//The end
}