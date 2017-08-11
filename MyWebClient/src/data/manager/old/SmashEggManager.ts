class SmashEggManager {
	private _hammerNum: number = 0;//锤子数量
	private _invitegiftNum: number = 0;//今日邀请获得的锤子数
	private _sharegiftNum: number = 0;//今日分享获得的锤子数
	private _actLefttime: number = 0;//活动剩余倒计时
	public smashUserInfos: SmashEggUserInfo[];

	public constructor() {
		this.smashUserInfos = [];
		this._actLefttime = 100000 * 1000 + egret.getTimer();
	}

	public onParaseListInfoMsg(msg: Message): void {
		this._hammerNum = msg.getInt();
		this._sharegiftNum = msg.getByte();
		this._invitegiftNum = msg.getByte();
		if (this.smashUserInfos.length > 0) {
			for (var i: number = this.smashUserInfos.length - 1; i >= 0; i--) {
				this.smashUserInfos[i] = null;
				this.smashUserInfos.splice(i, 1);
			}
		}
		var infos_len: number = msg.getByte();
		for (var i: number = 0; i < infos_len; i++) {
			var infoData: SmashEggUserInfo = new SmashEggUserInfo();
			infoData.onParse(msg);
			this.smashUserInfos.push(infoData);
		}
	}
	public onParseBeviewdMsg(msg: Message): void {
		var _egglotteryParam: SmashEggLotteryParam = new SmashEggLotteryParam();
		_egglotteryParam.onParse(msg);
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("SmashEggLotteryPanel", _egglotteryParam));
	}
	/**通过角色ID获取对应的砸蛋信息**/
	public getSmashEggUserInfoById(userId: number): SmashEggUserInfo {
		for (var i: number = 0; i < this.smashUserInfos.length; i++) {
			if (this.smashUserInfos[i].userId == userId) {
				return this.smashUserInfos[i];
			}
		}
		return null;
	}
	/**获得锤子的总数**/
	public get hammerNum(): number {
		return this._hammerNum;
	}
	/**获取今日分享获得的锤子数**/
	public get invitegiftNum(): number {
		return this._invitegiftNum;
	}
	/**今日邀请获得的锤子数**/
	public get sharegiftNum(): number {
		return this._sharegiftNum;
	}
	/**获取活动剩余时间**/
	public get actLefttime(): number {
		return Math.max(0, Math.ceil((this._actLefttime - egret.getTimer()) / 1000));
	}

	/**发送消息**/
	//请求砸蛋好友列表
	public onSendSmashUserlistMsg(): void {
		var userlistMsg: Message = new Message(MESSAGE_ID.SMASHEGG_FRIEND_INFO_MSG);
		_GF.instance.net.onAddMessage(userlistMsg);
	}
	//进入玩家的砸蛋场景
	public onSendSmashPreviewMsg(userId: number): void {
		var previewMsg: Message = new Message(MESSAGE_ID.SMASHEGG_BE_VIEWD_MSG);
		previewMsg.setInt(userId);
		_GF.instance.net.onAddMessage(previewMsg);
	}
	//发送砸蛋请求
	public onSendSmashAcitionMsg(userId, eggindex: number): void {
		var _smasheggMsg: Message = new Message(MESSAGE_ID.SMASHEGG_BE_REWARD_MSG);
		_smasheggMsg.setInt(userId);
		_smasheggMsg.setByte(eggindex);
		_GF.instance.net.onAddMessage(_smasheggMsg);
	}
	//The end
}
class SmashEggUserInfo {
	public userId: number;//玩家id
	public eggCount: number;//剩余金蛋数
	public hammerCount: number;//消耗锤子数
	private _secondCount: number;//剩余刷新时间

	public onParse(msg: Message): void {
		this.userId = msg.getInt();
		this.eggCount = msg.getByte();
		this.hammerCount = msg.getByte();
		this._secondCount = msg.getInt() * 1000 + egret.getTimer();
	}
	public get lefttime(): number {
		return Math.max(0, Math.ceil((this._secondCount - egret.getTimer()) / 1000));
	}
	public get friendData(): SimplePlayer {
		return DataManager.instance.friendM.getFriendDataById(this.userId);
	}
	//The end
}