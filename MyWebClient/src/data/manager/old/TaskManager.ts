class TaskManager {
	private _daliytaskDatas;

	public constructor() {
		this._daliytaskDatas = {};
	}
	//初始化每日任务的状态
	public onParseDailyTaskMsg(msg: Message): void {
		var taskSize: number = msg.getByte();
		for (var i: number = 0; i < taskSize; i++) {
			this.onDailyTaskDataRefresh(msg, true);
		}
	}
	//更新每日任务的状态
	public onDailyTaskDataRefresh(msg: Message, isInit: boolean = false): void {
		var _taskId: number = msg.getByte();
		var dailytaskData: DailyTaskData = this.getDailyTaskData(_taskId);
		if (dailytaskData) {
			dailytaskData.onParse(msg);
			this._daliytaskDatas[dailytaskData.id] = dailytaskData;
			if (!isInit) {
				GameDispatcher.instance.dispatcherEventWith(GameEvent.DAILY_TASK_UPDATE_EVT, false, dailytaskData.id);
			}
		}
	}
	//解析领奖
	public onParseRewardMsg(msg: Message): void {
		var player: Player = DataManager.instance.playerM.player;
		var _taskId: number = msg.getByte();
		var dailytaskModel: ModelDailyTask = ModelManager.instance.modelDailyTask[_taskId];
		if (dailytaskModel) {
			var _effectModel: ModelEffect = ModelManager.instance.modelEffect[dailytaskModel.effectId];
			switch (_effectModel.type) {
				case LOTTERY_EFFECT.ADD_GOLD:
					var _goldNum: InfiniteNumber = new InfiniteNumber(msg.getString());
					player.addGoldAndUpgrade(_goldNum.num);
					// GameCommon.instance.addAlert('')
					break;
			}
		} else {
			var _diamondNum: InfiniteNumber = new InfiniteNumber(msg.getString());
			player.addDiamondAndUpgrade(_diamondNum.num);
		}
		var dailytaskData: DailyTaskData = this.getDailyTaskData(_taskId);
		if (!dailytaskData.isReward) {
			dailytaskData.isReward = true;
			GameDispatcher.instance.dispatcherEventWith(GameEvent.DAILY_TASK_UPDATE_EVT, false, dailytaskData.id);
		}
	}
	//获取每日任务数据
	public getDailyTaskData(id: number): DailyTaskData {
		if (!this._daliytaskDatas[id]) {
			this._daliytaskDatas[id] = new DailyTaskData(id);
		}
		return this._daliytaskDatas[id];
	}
	//获取每日任务完成数量
	public get DailyTaskCompNum(): number {
		var _dailytaskCompNum: number = 0;
		for (var id in this._daliytaskDatas) {
			if (parseInt(id) == 0)
				continue;
			var dailytaskData: DailyTaskData = this._daliytaskDatas[id];
			if (dailytaskData.isReward) {
				_dailytaskCompNum++;
			}
		}
		return _dailytaskCompNum;
	}
	/**发送消息部分**/
	public onSendDailyTaskRewardMsg(taskId: number): void {
		var rewardMsg: Message = new Message(MESSAGE_ID.DAILY_TASK_REWARD_MSG);
		rewardMsg.setByte(taskId);
		_GF.instance.net.onAddMessage(rewardMsg);
	}
	/**检查红点**/
	public onCheckRedPoint(): boolean {
		for (var key in this._daliytaskDatas) {
			if (this.onCheckDailyTaskReceiveByID(parseInt(key))) return true;
		}
		if (this.onCheckAllTaskAwardRedPoint())
			return true;
		return false;
	}
	public onCheckAllTaskAwardRedPoint(): boolean {
		var _taskData: DailyTaskData = DataManager.instance.taskM.getDailyTaskData(0);
		if (!_taskData.isReward) {
			var _allReward: boolean = true;
			for (var id in this._daliytaskDatas) {
				if (parseInt(id) == 0)
					continue;
				var dailytaskData: DailyTaskData = this._daliytaskDatas[id];
				if (!dailytaskData.isReward) {
					_allReward = false;
					break;
				}
			}
			if (_allReward) {
				return true;
			}
		}
		return false;
	}
	public onCheckDailyTaskReceiveByID(taskID: number): boolean {
		var model: ModelDailyTask = ModelManager.instance.modelDailyTask[taskID];
		var _taskData: DailyTaskData = this.getDailyTaskData(taskID);
		if (!_taskData) return false;
		if (!model) return false;
		if (!_taskData.isReward && _taskData.progress >= model.count) return true;
		return false;
	}
	//The end
}
class DailyTaskData {
	public id: number;
	public progress: number = 0;
	public isReward: boolean = false;//是否已领取
	public constructor(id: number) {
		this.id = id;
	}

	public onParse(msg: Message): void {
		this.progress = msg.getInt();
		var state: number = msg.getByte();
		this.isReward = state == 2;
	}
}