class AchieveManager {
	private _achieveDatas;
	public constructor() {
		this._achieveDatas = {};
	}
	//初始化解析成就列表
	public onParseInit(msg: Message): void {
		var _len: number = msg.getByte();
		for (var i: number = 0; i < _len; i++) {
			this.onParseUpdate(msg, true);
		}
	}
	//解析更新成就列表
	public onParseUpdate(msg: Message, isInit: boolean = false): void {
		var _achieveId: number = msg.getByte();
		var _achieveData: AchieveData = this.getAchieveData(_achieveId);
		if (_achieveData) {
			_achieveData.onParse(msg);
			this._achieveDatas[_achieveData.id] = _achieveData;
			if (!isInit) {
				GameDispatcher.instance.dispatcherEventWith(GameEvent.ACHIEVE_UPDATE_EVENT, false, _achieveData.id);
			}
		}
	}
	//解析奖励领取消息
	public onParseRewardMsg(msg: Message): void {
		var _achieveId: number = msg.getByte();
		var _achieveModel: ModelAchieve = ModelManager.instance.modelAchieve[_achieveId];
		if (_achieveModel) {
			var player: Player = DataManager.instance.playerM.player;
			player.updateCurrency(_achieveModel.reward, 1);
		}
	}
	//获取对应的成就数据
	public getAchieveData(id: number): AchieveData {
		if (!this._achieveDatas[id]) {
			this._achieveDatas[id] = new AchieveData(id);
		}
		return this._achieveDatas[id];
	}
	/**消息发送**/
	public onSendAchieveRewardMsg(id: number): void {
		var rewardMsg: Message = new Message(MESSAGE_ID.ACHIEVEMENT_REWARD_MSG);
		rewardMsg.setByte(id);
		_GF.instance.net.onAddMessage(rewardMsg);
	}
	/**检查红点**/
	public onCheckRedPoint(): boolean {
		for (var key in this._achieveDatas) {
			if (this.onCheckAchieveReceiveByID(parseInt(key))) return true;
		}
		return false;
	}
	public onCheckAchieveReceiveByID(_achieveId: number): boolean {
		var model: ModelAchieve = ModelManager.instance.modelAchieve[_achieveId];
		var _achieveData: AchieveData = this.getAchieveData(_achieveId);
		var _currTargetPro = this.getCurrTargetPro(_achieveId);
		if (_achieveData.progress.num >= _currTargetPro && (_achieveData.rewardPro.num < model.end)) return true;
		return false;
	}

	public getCurrTargetPro(_achieveId: number): number {
		var model: ModelAchieve = ModelManager.instance.modelAchieve[_achieveId];
		var _achieveData: AchieveData = this.getAchieveData(_achieveId);
		var _currTargetPro: number = 0;
		if (_achieveData.rewardPro.num < model.start) {
			_currTargetPro = model.start;
		} else if (_achieveData.rewardPro.num >= model.end) {
			_currTargetPro = model.end;
		} else {
			_currTargetPro = _achieveData.rewardPro.num + model.dist;
		}
		return _currTargetPro;
	}


}
class AchieveData {
	public id: number;
	public progress: InfiniteNumber;//成就进度
	public rewardPro: InfiniteNumber;//领奖进度
	public constructor(id: number) {
		this.id = id;
		this.progress = new InfiniteNumber(0);
		this.rewardPro = new InfiniteNumber(0);
	}

	public onParse(msg: Message): void {
		this.progress = new InfiniteNumber(msg.getString());
		this.rewardPro = new InfiniteNumber(msg.getString());
	}
}