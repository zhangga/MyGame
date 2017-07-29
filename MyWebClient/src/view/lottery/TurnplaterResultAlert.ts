class TurnplaterResultAlert extends BaseWindowPanel {
	private param: TurnplaterResultParam;
	private btn_sure: eui.Button;
	private btn_double: eui.Button;
	private img_turnplateIcon: eui.Image;
	private img_turnplate_desc: eui.Image;
	private lab_hint: eui.Label;
	private isVisit: boolean = false;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.TurnplaterResultAlertSkin;
	}
	protected onInit(): void {
		this.setTitle("turnplate_alert_title_png");
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnHandler, this);
		this.btn_double.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDoubleBtnHandler, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnHandler, this);
		this.btn_double.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDoubleBtnHandler, this);
	}
	public onShowWithParam(param: TurnplaterResultParam): void {
		this.param = param;
		this.onShow();
	}
	protected onRefresh(): void {
		this.isVisit = false;
		this.img_turnplateIcon.source = this.param.model.icon;
		this.img_turnplate_desc.source = `turnplate_desc${this.param.lotteryId}_png`;
		var currStr: string = "one";
		if (this.param.model.effectId > 0) {
			switch (this.param.effectModel.type) {
				case LOTTERY_EFFECT.ADD_GOLD:
					currStr = "two";
					break;
				case LOTTERY_EFFECT.POLLUTE:
					this.isVisit = true;
					DataManager.instance.visite.type = OTHER_BEHAVIOR_TYPE.POLLUTE;
					break;
				case LOTTERY_EFFECT.PILFERGE:
					this.isVisit = true;
					DataManager.instance.visite.type = OTHER_BEHAVIOR_TYPE.ROB;
					break;
				case LOTTERY_EFFECT.CLEAR:
					this.isVisit = true;
					DataManager.instance.visite.type = OTHER_BEHAVIOR_TYPE.VISIT;
					break;
				case LOTTERY_EFFECT.DECLINE:
				case LOTTERY_EFFECT.PROMOTE:
					break;
			}
			this.lab_hint.text = Language.instance.getDescByKey(this.param.effectModel.desc, this.param.reward.toTextFormat());
		} else {
			currStr = "two";
			var thing: ModelThing = GameCommon.instance.getThingModel(this.param.model.reward.type, this.param.model.reward.id);
			this.lab_hint.text = `获得${this.param.model.reward.numFormat}${thing.name}`
		}
		this.currentState = currStr;
	}
	private onTouchBtnHandler(): void {
		if (this.isVisit) {
			DataManager.instance.visite.onSendVisitMessage(this.param.targetRoleID, DataManager.instance.visite.type);
		}
		this.onHide();
	}
	private onTouchDoubleBtnHandler(): void {
		SDKManager.share(new SDKShareContainer());
	}
}
class TurnplaterResultParam {
	public lotteryId: number;
	public model: ModelTurnplate;
	public effectModel: ModelEffect;
	public targetRoleID: number;
	public reward: InfiniteNumber = new InfiniteNumber(``);
	public constructor(lotteryId) {
		this.lotteryId = lotteryId;
	}
	public onParseMessage(msg: Message) {
		this.model = ModelManager.instance.modelTurnplate[this.lotteryId];
		if (this.model.effectId > 0) {
			this.effectModel = ModelManager.instance.modelEffect[this.model.effectId];
			switch (this.effectModel.type) {
				case LOTTERY_EFFECT.ADD_GOLD:
					this.reward = new InfiniteNumber(msg.getString());
					break;
				case LOTTERY_EFFECT.POLLUTE:
				case LOTTERY_EFFECT.PILFERGE:
				case LOTTERY_EFFECT.CLEAR:
					this.targetRoleID = msg.getInt();
					break;
				case LOTTERY_EFFECT.DECLINE:
				case LOTTERY_EFFECT.PROMOTE:
					break;
			}
		}
	}
}