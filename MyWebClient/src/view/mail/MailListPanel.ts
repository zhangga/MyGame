class MailListPanel extends BaseWindowPanel {
	private scorll: eui.Scroller;
	private mail_list: eui.List;
	private not_mail_label: eui.Label;
	private onekey_reward_btn: eui.Button;
	private onekey_delete_btn: eui.Button;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.MailListPanelSkin;
	}
	protected onInit(): void {
		this.mail_list.itemRenderer = MailListItem;
		this.mail_list.itemRendererSkinName = skins.MailListItemSkin;
		this.mail_list.useVirtualLayout = true;
		this.scorll.viewport = this.mail_list;
		this.setTitle("mail_title_png");
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.onekey_reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyReward, this);
		this.onekey_delete_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyDelete, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_MESSAGE.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_READ_MESSAGE.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_DELETE_MESSAGE.toString(), this.onRefresh, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.onekey_reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyReward, this);
		this.onekey_delete_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyDelete, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_MESSAGE.toString(), this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_READ_MESSAGE.toString(), this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE.toString(), this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_DELETE_MESSAGE.toString(), this.onRefresh, this);
	}
	protected onRefresh(): void {
		var mailDatas: MailData[] = DataManager.instance.mailM.getMailList();
		this.mail_list.dataProvider = new eui.ArrayCollection(mailDatas);
		this.not_mail_label.visible = mailDatas.length == 0;
	}
	private _touchRwdTime: number = 0;
	private onekeyReward(): void {
		if (!DataManager.instance.mailM.getCanShowMail()) {
			Language.instance.getDescByKey("not_reward_mail");
			return;
		}
		if (this._touchRwdTime > egret.getTimer()) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips5"));
			return;
		}
		this._touchRwdTime = egret.getTimer() + 2000;
		DataManager.instance.mailM.onSendRewardMailMsg("-1");
	}
	private _touchDelteTime: number = 0;
	private onekeyDelete(): void {
		if (DataManager.instance.mailM.getCanShowMail()) {
			Language.instance.getDescByKey("not_delete_mail");
			return;
		}
		if (this._touchDelteTime > egret.getTimer()) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips5"));
			return;
		}
		this._touchDelteTime = egret.getTimer() + 2000;
		DataManager.instance.mailM.onSendDeleteMailMsg("-1");
	}
	//The end
}
class MailListItem extends eui.ItemRenderer {
	private name_label: eui.Label;
	private time_label: eui.Label;

	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onInit, this);
	}
	private onInit(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenMail, this)
	}
	protected dataChanged(): void {
		var _mailData: MailData = this.data;
		this.name_label.text = "" + _mailData.title;
		this.currentState = _mailData.isReceived ? "open" : "unopen";
		var _yearstr: string = _mailData.date.getFullYear() + "";
		var _monthstr: string = _mailData.date.getMonth() < 10 ? "0" + _mailData.date.getMonth() : _mailData.date.getMonth() + "";
		var _daystr: string = _mailData.date.getDay() < 10 ? "0" + _mailData.date.getDay() : _mailData.date.getDay() + "";
		var _hoursstr: string = _mailData.date.getHours() < 10 ? "0" + _mailData.date.getHours() : _mailData.date.getHours() + "";
		var _minutestr: string = _mailData.date.getMinutes() < 10 ? "0" + _mailData.date.getMinutes() : _mailData.date.getMinutes() + "";
		var _secondstr: string = _mailData.date.getSeconds() < 10 ? "0" + _mailData.date.getSeconds() : _mailData.date.getSeconds() + "";
		this.time_label.text = _yearstr + "-" + _monthstr + "-" + _daystr + " " + _hoursstr + ":" + _minutestr + ":" + _secondstr;
	}
	private onOpenMail(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("MailContentPanel", this.data));
	}
	//The end
}