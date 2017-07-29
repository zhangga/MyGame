class AchievementPanel extends BaseWindowPanel {
	private scorll: eui.Scroller;
	private list_grp: eui.Group;

	private items;
	private Item_Max: number = 0;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.AchievementPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("chengjiu_png");
		this.items = {};
		for (var id in ModelManager.instance.modelAchieve) {
			var model: ModelAchieve = ModelManager.instance.modelAchieve[id];
			var item: AchievementItem = new AchievementItem(model);
			this.list_grp.addChild(item);
			this.items[model.id] = item;
			this.Item_Max++;
		}
		super.onInit();
	}
	protected onRegist(): void {
		super.onRegist();
		for (var index in this.items) {
			var item: AchievementItem = this.items[index];
			item.onRegist();
			item.onRefresh();
		}
		GameDispatcher.instance.addEventListener(GameEvent.ACHIEVE_UPDATE_EVENT, this.onUpdate, this);
	}
	protected onRemove(): void {
		super.onRemove();
		for (var index in this.items) {
			var item: AchievementItem = this.items[index];
			item.onRemove();
		}
		GameDispatcher.instance.removeEventListener(GameEvent.ACHIEVE_UPDATE_EVENT, this.onUpdate, this);
	}
	private onUpdate(event: egret.Event): void {
		var achieveId: number = event.data;
		var item: AchievementItem = this.items[achieveId];
		if (item) {
			item.onRefresh();
		}
	}
}
class AchievementItem extends eui.Component {
	private model: ModelAchieve;

	private icon: eui.Image;
	private name_label: eui.Label;
	private progress_label: eui.Label;
	private award_btn: eui.Button;
	private award_icon: eui.Image;
	private award_num_label: eui.Label;
	protected points: RedPoint[] = RedPointManager.createPoint(1);
	public constructor(model: ModelAchieve) {
		super();
		this.model = model;
		this.once(egret.Event.COMPLETE, this.onInit, this);
		this.skinName = skins.AchievementItemSkin;
	}

	private onInit(): void {
		this.icon.source = this.model.icon;
		var modelThing: ModelThing = GameCommon.instance.getThingModel(this.model.reward.type, this.model.reward.id);
		if (modelThing)
			this.award_icon.source = modelThing.icon;
		this.points[0].register(this.award_btn, GameDefine.RED_DAILYTASK_POS, DataManager.instance.achieveM, "onCheckAchieveReceiveByID", this.model.id);
	}
	public onRefresh(): void {
		var _achieveData: AchieveData = DataManager.instance.achieveM.getAchieveData(this.model.id);
		var _currTargetPro: number = DataManager.instance.achieveM.getCurrTargetPro(this.model.id);
		this.progress_label.text = `进度：${_achieveData.progress.toTextFormat()}/${GameCommon.toTextFormat(_currTargetPro)}`;
		this.name_label.text = Language.instance.getDescByKey(this.model.name, GameCommon.toTextFormat(_currTargetPro));
		this.award_num_label.text = "×" + this.model.reward.num;
		if (_achieveData.progress.num >= _currTargetPro) {
			this.award_btn.enabled = (_achieveData.rewardPro.num < this.model.end);
			this.award_btn.skinName = skins.Comn_Btn_GreenSkin;
			this.award_btn.icon = this.award_btn.enabled ? "btn_icon_confirm_png" : "btn_icon_reward_png";
		} else {
			this.award_btn.skinName = skins.Comn_Btn_BlueSkin;
			this.award_btn.icon = "btn_icon_goto_png";
			this.award_btn.enabled = true;
		}
		this.trigger();
	}
	public trigger(): void {
		this.points[0].checkPoint();
	}
	public onRegist(): void {
		this.award_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
	}

	public onRemove(): void {
		this.award_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
	}

	private onTouchBtn(): void {
		if (this.award_btn.icon == "btn_icon_goto_png") {//前往
			GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_GOTYPE_OPEN_WINDOW, false, new ViewGoType(this.model.goType, null));
		} else if (this.award_btn.icon == "btn_icon_confirm_png") {
			DataManager.instance.achieveM.onSendAchieveRewardMsg(this.model.id);
		}
	}
}