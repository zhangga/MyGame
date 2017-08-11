class TurnplateManager {
	public lotteryId: number;//转盘转到的ID
	public param: TurnplaterResultParam;
	public constructor() {
	}
	//解析转盘协议
	public onPasreLotteryMsg(msg: Message): void {
		this.lotteryId = msg.getByte();
		this.param = new TurnplaterResultParam(this.lotteryId);
		this.param.onParseMessage(msg);
	}
	//解析体力同步消息
	public onParseRecivePowerMsg(msg: Message): void {
		var _powerNum: number = msg.getInt();
		var _reciveTime: number = msg.getInt();
		this.reciveTime = _reciveTime;
		DataManager.instance.playerM.player.fishfood = _powerNum;
	}
	//发送体力恢复同步消息
	public onSendPowerReciveMsg(): void {
		var reciveMsg: Message = new Message(MESSAGE_ID.FISH_FOOD_RECIVE_MSG);
		_GF.instance.net.onAddMessage(reciveMsg);
	}
	/**转盘体力恢复时间**/
	private _reciveTime: number = 0;//转盘体力恢复剩余时间
	public set reciveTime(sec: number) {
		this._reciveTime = sec > 0 ? sec * 1000 + egret.getTimer() : 0;
	}
	public get reciveTime(): number {
		return Math.max(0, Math.ceil((this._reciveTime - egret.getTimer()) / 1000));
	}
	//转盘抽奖结束
	public onCompleteLottery(): void {
		if (this.param.model.effectId > 0) {
			this.onLotteryEffect();
		} else {
			if (!this.param.model.reward)
				return;
			var player: Player = DataManager.instance.playerM.player;
			switch (this.param.model.reward.type) {
				case GOODS_TYPE.DIAMOND:
					player.addDiamondAndUpgrade(this.param.model.reward.num);
					this.param.reward = new InfiniteNumber(this.param.model.reward);
					var anim: Animation = GameCommon.instance.addAnimation(_GF.instance.scene.promptLayer, "zuanshitexiao", new egret.Point(300, 533), 1, true);
					anim.playFinishCallBack(function (param: TurnplaterResultParam) {
						GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
							new WindowParam("TurnplaterResultAlert", param)
						);
					}, this, this.param);
					SoundFactory.playSound(SoundDefine.SOUND_GIAN_DIAMOND);
					break;
			}
		}
	}
	//装盘效果处理
	public onLotteryEffect(): void {
		var player: Player = DataManager.instance.playerM.player;
		if (this.param.effectModel) {
			switch (this.param.effectModel.type) {
				case LOTTERY_EFFECT.ADD_GOLD:
					var animRes: string = this.param.model.effectId == 1 ? "xiaojinbi" : "dajinbi";
					var anim: Animation = GameCommon.instance.addAnimation(_GF.instance.scene.promptLayer, animRes, new egret.Point(300, 533), 1, true);
					anim.playFinishCallBack(function (param: TurnplaterResultParam) {
						player.addGoldAndOpenSync(param.reward);
						GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
							new WindowParam("TurnplaterResultAlert", param)
						);
					}, this, this.param);
					SoundFactory.playSound(SoundDefine.SOUND_GAIN_GOLD);
					break;
				case LOTTERY_EFFECT.DECLINE:
				case LOTTERY_EFFECT.PROMOTE:
					DataManager.instance.buff.onStart();
					GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
						new WindowParam("TurnplaterResultAlert", this.param)
					);
					if (this.param.effectModel.type == LOTTERY_EFFECT.DECLINE) {
						SoundFactory.playSound(SoundDefine.SOUND_TURNPLATE_SLOW_SPEED);
					} else {
						SoundFactory.playSound(SoundDefine.SOUND_TURNPLATE_ADD_SPEED);
					}
					DataManager.instance.syncM.onOpenSync();
					break;
				default:
					GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
						new WindowParam("TurnplaterResultAlert", this.param)
					);
					DataManager.instance.syncM.onOpenSync();
					break;
			}
		}
	}
	//The end
}
enum LOTTERY_EFFECT {
	ADD_GOLD = 1,//获得一小堆金币
	POLLUTE = 2,//污染别人鱼缸
	PILFERGE = 3,//偷窃别人
	DECLINE = 4,//产出下降百分比
	PROMOTE = 5,//产出百分比提升
	CLEAR = 6,//清洁别人鱼缸
}