class PlayerManager {
	public player: Player;
	public constructor() {
		GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onUpdateSecOutput, this);
		GameDispatcher.instance.addEventListener(GameEvent.TECHNOLOGY_UPGRADE_UPDATE, this.onUpdateSecOutput, this);
		GameDispatcher.instance.addEventListener(GameEvent.ADD_OR_DEL_BUFF_EVENT, this.onBuffHandler, this);
		this.player = new Player();
	}
	//领取图集奖励
	public onSendRewardHeavenMsg(fishId: number): void {
		var rewardMsg: Message = new Message(MESSAGE_ID.HEAVEN_REWARD_MSG);
		rewardMsg.setInt(fishId);
		_GF.instance.net.onAddMessage(rewardMsg);
	}
	/**增益效果集合**/
	//增益效果更新
	public updateIncomeEffect(type: PLAYER_EFFECT): void {
		switch (type) {
			case PLAYER_EFFECT.HAPPINESS:
				this.updateHappinessRate();
				break;
			case PLAYER_EFFECT.DECORATE:
				this.updateDecorateRate();
				break;
			case PLAYER_EFFECT.BUFF:
				this.updateBuffRate();
				break;
			case PLAYER_EFFECT.All:
				this.updateHappinessRate();
				this.updateDecorateRate();
				this.updateBuffRate();
				break;
		}
	}
	private onBuffHandler(e: egret.Event): void {
		this.updateIncomeEffect(PLAYER_EFFECT.BUFF);
		this.onUpdateSecOutput();
	}

	//秒产绝对值的增益
	private updateHappinessRate(): void {
		var add: number = this.player.happiness;
		if (add < -5) {
			add = -5;
		}
		this.player.happiness_rate = UnitDefine.BASE_PERCENTAGE + add * 1000;
	}
	//秒产百分比的增益
	private updateDecorateRate(): void {
		this.player.artifact_rate = UnitDefine.BASE_PERCENTAGE;
		//神器增加秒产
		for (var key in this.player.decorate_active) {
			var lv = this.player.decorate_active[key];
			if (!lv)
				continue;
			var model: ModelDecorate = ModelManager.instance.modelDecorate[key];
			if (!model)
				continue;
			this.player.artifact_rate += ModelDecorate.getEffect(model.pinzhi, lv);
		}
	}
	private updateBuffRate(): void {
		this.player.buff_rate = DataManager.instance.buff.addPercent;
	}
	public onUpdateSecOutput() {
		this.player.onUpdateSecOutput();
	}
	//接收分享奖励
	public parseShareReward(message: Message) {
		var state = message.getByte();
		if (state == 1) {
			var type = message.getByte();
			if (type == GOODS_TYPE.GOLD) {
				var gold = message.getString();
				this.player.addGoldAndUpgrade(gold);
			} else if (type == GOODS_TYPE.DIAMOND) {
				var diamond = message.getInt();
				this.player.addDiamondAndUpgrade(diamond);
			}
		}
	}

	public onUpdateSocOutPutByID(fishTankID: number): void {
		this.player.onUpdateSocOutPutByID(fishTankID);
		this.player.onUpdateSecOutput();
	}
	public onUpdateBookLv(currID: number, add: number = 1): void {
		this.player.onUpdateBookLv(currID, add);
		// this.player.onUpdateSecOutput();
	}
	public onUpgradeAdvanceFish(id: number, add: number = 1): void {
		this.player.onUpgradeAdvanceFish(id, add);
		this.onUpdateSecOutput();
		this.showSubtractSecOutput();
		GameDispatcher.instance.dispatcherEventWith(GameEvent.FISH_UPGRADE_EVENT, false, id);
	}
	public showSubtractSecOutput(): void {
		this.player.showSubtractSecOutput();
	}


	//THE END
}
//玩家的增益效果
enum PLAYER_EFFECT {
	HAPPINESS = 1,//欢乐度增益
	DECORATE = 2,//神器增益
	BUFF = 3,//buff增益
	All = 4,
}