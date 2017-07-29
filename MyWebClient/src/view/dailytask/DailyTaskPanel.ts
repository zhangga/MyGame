class DailyTaskPanel extends BaseWindowPanel {
	private scorll: eui.Scroller;
	private list_grp: eui.Group;
	private award_num_label: eui.Label;
	private total_pro_label: eui.Label;
	private reward_btn: eui.Button;
	protected points: RedPoint[] = RedPointManager.createPoint(1);

	private items;
	private Item_Max: number = 0;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.DailyTaskPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("dailytask_title_png");
		this.items = {};
		this.award_num_label.text = "×" + GameDefine.DAILYTASK_COMP_NUM;
		for (var id in ModelManager.instance.modelDailyTask) {
			var model: ModelDailyTask = ModelManager.instance.modelDailyTask[id];
			var item: DailyTaskItem = new DailyTaskItem(model);
			this.list_grp.addChild(item);
			this.items[model.id] = item;
			this.Item_Max++;
		}
		this.points[0].register(this.reward_btn, GameDefine.RED_DAILYTASK_POS, DataManager.instance.taskM, "onCheckAllTaskAwardRedPoint");
		super.onInit();
	}
	protected onRegist(): void {
		super.onRegist();
		for (var index in this.items) {
			var item: DailyTaskItem = this.items[index];
			item.onRegist();
			item.onRefresh();
		}
		GameDispatcher.instance.addEventListener(GameEvent.DAILY_TASK_UPDATE_EVT, this.onUpdate, this);
		this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReward, this);
		this.onRefreshCompNum();
		this.points[0].checkPoint();
	}
	protected onRemove(): void {
		super.onRemove();
		for (var index in this.items) {
			var item: DailyTaskItem = this.items[index];
			item.onRemove();
		}
		GameDispatcher.instance.removeEventListener(GameEvent.DAILY_TASK_UPDATE_EVT, this.onUpdate, this);
		this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReward, this);
	}
	private onUpdate(event: egret.Event): void {
		var taskId: number = event.data;
		var item: DailyTaskItem = this.items[taskId];
		if (item) {
			item.onRefresh();
		}
		this.onRefreshCompNum();
	}
	private onRefreshCompNum(): void {
		var _taskcompNum: number = DataManager.instance.taskM.DailyTaskCompNum;
		this.total_pro_label.text = `${_taskcompNum}/${this.Item_Max}`;
		var _taskData: DailyTaskData = DataManager.instance.taskM.getDailyTaskData(0);
		if (_taskcompNum >= this.Item_Max) {
			this.reward_btn.enabled = !_taskData.isReward;
			this.reward_btn.icon = !_taskData.isReward ? "btn_icon_confirm_png" : "btn_icon_reward_png";
		} else {
			this.reward_btn.enabled = false;
			this.reward_btn.icon = "btn_icon_confirm_png";
		}
	}
	private onReward(): void {
		DataManager.instance.taskM.onSendDailyTaskRewardMsg(0);
	}
}
class DailyTaskItem extends eui.Component {
	private model: ModelDailyTask;

	private icon: eui.Image;
	private name_label: eui.Label;
	private awd_desc_label: eui.Label;
	private progress_label: eui.Label;
	private award_btn: eui.Button;
	protected points: RedPoint[] = RedPointManager.createPoint(1);
	public constructor(model: ModelDailyTask) {
		super();
		this.model = model;
		this.once(egret.Event.COMPLETE, this.onInit, this);
		this.skinName = skins.DailyTaskItemSkin;
	}

	private onInit(): void {
		this.icon.source = this.model.icon;
		this.name_label.text = this.model.name;
		var effectModel: ModelEffect = ModelManager.instance.modelEffect[this.model.effectId];
		this.awd_desc_label.text = "奖励：" + effectModel.desc;
	}

	public onRefresh(): void {
		this.points[0].register(this.award_btn, GameDefine.RED_DAILYTASK_POS, DataManager.instance.taskM, "onCheckDailyTaskReceiveByID", this.model.id);
		var _taskData: DailyTaskData = DataManager.instance.taskM.getDailyTaskData(this.model.id);
		this.progress_label.text = `进度：${_taskData.progress}/${this.model.count}`;
		if (_taskData.progress >= this.model.count) {
			this.award_btn.enabled = !_taskData.isReward;
			this.award_btn.skinName = skins.Comn_Btn_GreenSkin;
			this.award_btn.icon = !_taskData.isReward ? "btn_icon_confirm_png" : "btn_icon_reward_png";
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
		var _taskData: DailyTaskData = DataManager.instance.taskM.getDailyTaskData(this.model.id);
		if (_taskData.progress >= this.model.count) {
			if (!_taskData.isReward) {
				DataManager.instance.taskM.onSendDailyTaskRewardMsg(this.model.id);
			}
		} else {//前往
			GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_GOTYPE_OPEN_WINDOW, false, new ViewGoType(this.model.goType, null));
		}
	}
	//序号
	public get sort(): number {
		var _sortIndex: number = this.model.id;
		var _taskData: DailyTaskData = DataManager.instance.taskM.getDailyTaskData(this.model.id);
		if (_taskData.isReward) {
			_sortIndex = _sortIndex * 100;
		} else if (_taskData.progress < this.model.count) {
			_sortIndex = _sortIndex * 10;
		}
		return _sortIndex;
	}
	//The end
}