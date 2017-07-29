class MailContentPanel extends BaseWindowPanel {
	private title_label: eui.Label;
	private mail_desc_label: eui.Label;
	private reward_btn: eui.Button;
	private delete_btn: eui.Button;
	private reward_grp: eui.Group;

	private param: MailData;

	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.MailContentSkin;
	}
	protected onInit(): void {
		this.setTitle("mail_title_png");
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardBtn, this);
		this.delete_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDelteBtn, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE.toString(), this.onRefresh, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRewardBtn, this);
		this.delete_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDelteBtn, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE.toString(), this.onRefresh, this);
	}
	protected onRefresh(): void {
		this.title_label.text = this.param.title;
		this.mail_desc_label.text = this.param.content;
		if (this.param.accessory.length > 0) {
			this.currentState = !this.param.isReceived ? "reward" : "delete";
			this.reward_grp.removeChildren();
			for (var i: number = 0; i < this.param.accessory.length; i++) {
				var awardItem = this.onCreateReawrdItem(this.param.accessory[i].reward);
				this.reward_grp.addChild(awardItem);
			}
		} else {
			this.currentState = "normal";
		}
	}
	private onTouchRewardBtn(): void {
		if (this.currentState == "reward") {
			DataManager.instance.mailM.onSendRewardMailMsg(this.param.id);
		} else if (this.currentState == "normal") {
			this.onTouchCloseBtn();
		}
	}
	private onTouchDelteBtn(): void {
		DataManager.instance.mailM.onSendDeleteMailMsg(this.param.id);
		this.onHide();
	}
	public onShowWithParam(param): void {
		this.param = param as MailData;
		if (this.param) {
			if (!this.param.isOpen) {
				DataManager.instance.mailM.onSendReadMailMsg(this.param.id);
			}
			this.onShow();
		}
	}
	private onCreateReawrdItem(reward: ModelAward): eui.Component {
		var _awarditme: eui.Component = new eui.Component();
		_awarditme.skinName = skins.MailRewardItemSkin;
		var _thing: ModelThing = GameCommon.instance.getThingModel(reward.type, reward.id);
		if (_thing) {
			(_awarditme["img_quality"] as eui.Image).source = `item_bg_${_thing.quality}_png`;
			(_awarditme["img_goods"] as eui.Image).source = _thing.icon;
			(_awarditme["lab_name"] as eui.Label).text = _thing.name + "×" + reward.numFormat;
		}
		return _awarditme;
	}
	//The end
}