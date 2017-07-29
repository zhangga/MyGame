class TechnologyManager {
	private _technologys;

	public constructor() {
		this._technologys = {};
	}
	/**解析初始化科技**/
	public onParaeMsg(msg: Message): void {
		var size: number = msg.getByte();
		for (var i: number = 0; i < size; i++) {
			this.onParseUpgrade(msg, false);
		}
		DataManager.instance.playerM.onUpdateSocOutPutByID(DataManager.instance.playerM.player.currFGID);//刷新一下当前鱼缸鱼的秒出
	}
	/**解析升级消息**/
	public onParseUpgrade(msg: Message, isUpgrade: boolean = true): void {
		var id: number = msg.getByte();
		var level: number = msg.getByte();
		var technologyModel: ModelTechnology = ModelManager.instance.modelTechnology[id + "_" + level];
		this._technologys[id] = level;
		if (isUpgrade) {
			/**消耗**/
			DataManager.instance.playerM.player.updateCurrency(technologyModel.cost, -1);
			GameDispatcher.instance.dispatcherEventWith(GameEvent.TECHNOLOGY_UPGRADE_UPDATE, false, id);
			DataManager.instance.playerM.onUpdateSocOutPutByID(DataManager.instance.playerM.player.currFGID);//刷新一下当前鱼缸鱼的秒出
			DataManager.instance.playerM.showSubtractSecOutput();
		}

	}
	/**根据科技类型获取当前科技等级**/
	public getTechnologyLevel(id: number): number {
		return this._technologys[id] ? this._technologys[id] : 0;
	}
	/**获取当前科技对应的model**/
	public getCurrModel(id: number): ModelTechnology {
		var currLevel: number = this.getTechnologyLevel(id);
		var model: ModelTechnology = ModelManager.instance.modelTechnology[id + "_" + currLevel];
		return model;
	}
	/**获取下一等级科技model**/
	public getNextModel(id: number): ModelTechnology {
		var currLevel: number = this.getTechnologyLevel(id) + 1;
		var model: ModelTechnology = ModelManager.instance.modelTechnology[id + "_" + currLevel];
		return model;
	}
	/**发送服务器消息**/
	//升级消息
	public onSendUpgradeMsg(id: number): void {
		var nextModel: ModelTechnology = DataManager.instance.technology.getNextModel(id);
		if (!nextModel) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips7"));
			return;
		}
		var hasMoneyNum: number = DataManager.instance.playerM.player.getCurrency(nextModel.cost.type);
		var costMoneyNum: number = nextModel.cost.num;
		if (costMoneyNum > hasMoneyNum) {
			var error_tips: string = "error_tips1";
			switch (nextModel.cost.type) {
				case GOODS_TYPE.GOLD:
					error_tips = "error_tips3";
					break;
				case GOODS_TYPE.DIAMOND:
					error_tips = "error_tips4";
					break;
			}
			GameCommon.instance.addAlert(Language.instance.getDescByKey(error_tips));
			return;
		}
		var upgradeMsg: Message = new Message(MESSAGE_ID.TECHNOLOGY_UPGRADE_MSG);
		upgradeMsg.setByte(id);
		_GF.instance.net.onAddMessage(upgradeMsg);
	}
	//检测科技红点
	public onCheckRedPoint(tankId: number): boolean {
		var player: Player = DataManager.instance.playerM.player;
		//鱼的科技
		var _fishDatas: FishData[] = player.getFishByLoction(tankId);
		for (var i: number = 0; i < _fishDatas.length; i++) {
			var _fishModel: ModelFish = _fishDatas[i].model;
			for (var j: number = 0; j < _fishModel.kejiId.length; j++) {
				var _tecID: number = parseInt(_fishModel.kejiId[j]);
				if (this.onCheckTechnologyByType(_tecID))
					return true;
			}
		}
		var _fishtankModel: ModelFieldGuide = ModelManager.instance.modelFieldGuide[tankId + "_1"];
		for (var i: number = 0; i < _fishtankModel.kejiId.length; i++) {
			var _techID: number = parseInt(_fishtankModel.kejiId[i])
			if (this.onCheckTechnologyByType(_tecID))
				return true;
		}

		return false;
	}
	public onCheckTechnologyByType(id: number) {
		var nextModel: ModelTechnology = this.getNextModel(id);
		if (!nextModel) return false;
		if (DataManager.instance.playerM.player.getCurrency(nextModel.cost.type) >= nextModel.cost.num) return true;
		return false;
	}
	//The end
}
enum TECHNOLOGY_TYPE {
	SECOUTPUT = 1,//秒产
	COMEIN = 2,//产出
	FISHTANK_SECOUT = 3,//鱼缸
	SIZE = 4,//长度
}