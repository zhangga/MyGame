class FriendManager {
	private _firends: SimplePlayer[];//好友列表
	private _applys: SimplePlayer[];//申请列表
	private _givemeFoods: number[];//给过我鱼食的好友ID列表
	private _giftFoods: number[];//赠送出鱼食的好友ID列表
	private _invitegifts: FriendInviteGift[];//赚钻石好友列表

	public giftFishFoodNum: number;//可赠送的鱼食数量

	public constructor() {
		this._firends = [];
		this._applys = [];
		this._givemeFoods = [];
		this._giftFoods = [];
		this._invitegifts = [];
	}
	/**初始化好友列表**/
	public onParseInit(msg: Message): void {
		this._firends = [];
		this._applys = [];
		this._givemeFoods = [];
		this._giftFoods = [];
		var fsize: number = msg.getShort();
		for (var i: number = 0; i < fsize; i++) {
			var friendPlayer: SimplePlayer = new SimplePlayer();
			friendPlayer.parsePlayer(msg);
			this._firends.push(friendPlayer);
			var isgive = msg.getBoolean();//是否送过鱼食
			if (isgive) {
				this._giftFoods.push(friendPlayer.id);
			}
			var isbegive = msg.getBoolean();//是否被送鱼食
			if (isbegive) {
				this._givemeFoods.push(friendPlayer.id);
			}
			friendPlayer.rankNum = msg.getInt();
		}
		this.onSortFriendList();
		var applySize: number = msg.getShort();
		for (var i: number = 0; i < applySize; i++) {
			this.onParseApplyAdd(msg, true);
		}
		DataManager.instance.playerM.player.fishfood = msg.getInt();
		this.giftFishFoodNum = msg.getByte();
		DataManager.instance.turnplateM.reciveTime = msg.getInt();
	}
	/**增加好友列表**/
	public onParseAdd(player: SimplePlayer): void {
		for (var i: number = 0; i < this._firends.length; i++) {
			if (player.id == this._firends[i].id) {
				return;
			}
		}
		this._firends.push(player);
		this.onSortFriendList();
	}
	/**删除好友列表**/
	public onParseDelte(msg: Message): void {
		var playerid: number = msg.getInt();
		for (var i: number = 0; i < this._firends.length; i++) {
			var friendPlayer: SimplePlayer = this._firends[i];
			if (friendPlayer.id == playerid) {
				this._firends.splice(i, 1);
				friendPlayer = null;
				return;
			}
		}
	}
	/**好友列表排序**/
	private onSortFriendList(): void {
		this._firends.sort(function (a, b): number {
			return a.rankNum - b.rankNum;
		})
	}
	/**增加申请列表**/
	public onParseApplyAdd(msg: Message, isInit: boolean = false): void {
		var applyPlayer: SimplePlayer = new SimplePlayer();
		applyPlayer.parsePlayer(msg);
		applyPlayer.rankNum = msg.getInt();
		if (!isInit) {
			for (var i: number = 0; i < this._applys.length; i++) {
				if (applyPlayer.id == this._applys[i].id) {
					return;
				}
			}
		}
		this._applys.push(applyPlayer);
	}
	/**删除申请列表**/
	public onParseApplyRemove(playerId: number, isDelete: boolean = true): SimplePlayer {
		for (var i: number = 0; i < this._applys.length; i++) {
			var applyPlayer: SimplePlayer = this._applys[i];
			if (applyPlayer.id == playerId) {
				this._applys.splice(i, 1);
				if (isDelete) {
					applyPlayer = null;
				}
				return applyPlayer;
			}
		}
	}
	/**赠送好友鱼食成功**/
	public onParseGiftSuccess(msg: Message): void {
		var playerId: number = msg.getInt();
		if (this._giftFoods.indexOf(playerId) < 0) {
			this._giftFoods.push(playerId);
			GameCommon.instance.addAlert(Language.instance.getDescByKey("fishfood_gift_Success"));
		}
	}
	/**接受到其他玩家送来的鱼食**/
	public onParseGiveFoodMsg(msg: Message): void {
		var playerId: number = msg.getInt();
		if (this._givemeFoods.indexOf(playerId) < 0) {
			this._givemeFoods.push(playerId);
			DataManager.instance.playerM.player.fishfood = DataManager.instance.playerM.player.fishfood + 1;
		}
	}

	/**获取剩余的赠送次数**/
	public get leftGiftNum(): number {
		return Math.max(GameDefine.FRIEND_GIFT_MAX - this._giftFoods.length, 0);
	}
	/**获取剩余的接受礼物次数**/
	public get giftReciveNum(): number {
		return this._givemeFoods.length;
	}
	/**通过ID判断玩家是不是赠送过我鱼食**/
	public onCheckIsGive(playerId: number): boolean {
		return this._givemeFoods.indexOf(playerId) >= 0;
	}
	/**通过ID判断玩家是不是收到过我的鱼食**/
	public onCheckIsGift(playerId: number): boolean {
		return this._giftFoods.indexOf(playerId) >= 0;
	}
	/**通过PlayerId找到好友**/
	public getFriendDataById(playerId: number): SimplePlayer {
		var friendPlayer: SimplePlayer;
		for (var i: number = 0; i < this._firends.length; i++) {
			if (playerId == this._firends[i].id) {
				friendPlayer = this._firends[i];
				break;
			}
		}
		return friendPlayer;
	}

	public get firends(): SimplePlayer[] {
		return this._firends;
	}

	public get friendsNum(): number {
		return this._firends.length;
	}

	public get applys(): SimplePlayer[] {
		return this._applys;
	}

	public get gives(): number[] {
		return this._givemeFoods;
	}
	//赚钻石的好友列表
	public onUpdateInviteGiftList(msg: Message): void {
		this._invitegifts = [];
		var _len: number = msg.getByte();
		for (var i: number = 0; i < _len; i++) {
			var _inviteGiftObj: FriendInviteGift = new FriendInviteGift();
			_inviteGiftObj.onParseInfo(msg);
			this._invitegifts.push(_inviteGiftObj);
		}
	}
	//赚钻石更新领奖状态
	public onUpdateInviteGiftReward(msg: Message): void {
		var playerId: number = msg.getInt();
		for (var i: number = 0; i < this._invitegifts.length; i++) {
			var giftFriend: FriendInviteGift = this._invitegifts[i];
			if (giftFriend.id == playerId && !giftFriend.isReceived) {
				giftFriend.isReceived = true;
				DataManager.instance.playerM.player.addDiamond(GameDefine.INVITE_GIFT_DIAMOND);
				GameDispatcher.instance.dispatcherEventWith(MESSAGE_ID.INIVTEGIFT_REWARD_MSG + "_TO_VIEW", false, giftFriend);
				break;
			}
		}
	}
	//获取对应位置的赚钻石好友
	public getInvitegiftFrined(index: number): FriendInviteGift {
		return this._invitegifts[index];
	}

	/**-----发送消息------**/
	//搜索玩家
	public onSendSeachPlayerMsg(playerId: number): void {
		var seachMsg: Message = new Message(MESSAGE_ID.FRIEND_SEACH_MSG);
		seachMsg.setInt(playerId);
		_GF.instance.net.onAddMessage(seachMsg);
	}
	//添加玩家
	public onSendAddPlayerMsg(playerId: number): void {
		var addFriendMsg: Message = new Message(MESSAGE_ID.FRIEND_ADD_MSG);
		addFriendMsg.setInt(playerId);
		_GF.instance.net.onAddMessage(addFriendMsg);
	}
	//删除好友
	public onSendDeletePlayerMsg(playerId: number): void {
		var deleteMsg: Message = new Message(MESSAGE_ID.FRIEND_DELETE_MSG);
		deleteMsg.setInt(playerId);
		_GF.instance.net.onAddMessage(deleteMsg);
	}
	//同意申请
	public onSendAgreeMsg(playerId: number): void {
		var agreeMsg: Message = new Message(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG);
		agreeMsg.setInt(playerId);
		_GF.instance.net.onAddMessage(agreeMsg);
	}
	//拒绝申请
	public onSendRejectMsg(playerId: number): void {
		var rejectMsg: Message = new Message(MESSAGE_ID.FRIEND_REJECT_APPLY_MSG);
		rejectMsg.setInt(playerId);
		_GF.instance.net.onAddMessage(rejectMsg);
	}
	//赠送鱼食
	public onSendFriendGiftMsg(playerId: number): void {
		var giftMsg: Message = new Message(MESSAGE_ID.FRIEND_GIFT_MESAAGE);
		giftMsg.setInt(playerId);
		_GF.instance.net.onAddMessage(giftMsg);
	}
	//查看其他玩家
	public onSendBaifangMsg(playerId: number): void {
		var baifangMsg: Message = new Message(MESSAGE_ID.FRIEND_BE_VIEWED_MSG);
		baifangMsg.setInt(playerId);
		_GF.instance.net.onAddMessage(baifangMsg);
	}
	//请求赚钻石好友列表
	public onSendIniviteGiftListMsg(): void {
		var invitegiftlistMsg: Message = new Message(MESSAGE_ID.INIVTEGIFT_FRIENDLIST_MSG);
		_GF.instance.net.onAddMessage(invitegiftlistMsg);
	}
	//领取赚钻石好友奖励
	public onSendRewardInviteGiftMsg(playerId: number): void {
		var rewardgiftMsg: Message = new Message(MESSAGE_ID.INIVTEGIFT_REWARD_MSG);
		rewardgiftMsg.setInt(playerId);
		_GF.instance.net.onAddMessage(rewardgiftMsg);
	}

	//redPoint相关
	public onCheckRedPoint(): boolean {
		if (this.onCheckCanGiveFishFood()) return true;
		if (this.onCheckhasApply()) return true;
		return false;
	}
	public onCheckhasApply(): boolean {
		if (this._applys.length > 0) return true;
		return false;
	}
	public onCheckCanGiveFishFood(): boolean {
		if (this._firends.length == 0) return false;
		if (this.leftGiftNum == 0) return false;
		for (var key in this._firends) {
			if (this._giftFoods.indexOf(this._firends[key].id) == -1) return true;
		}
		return false;
	}
	//The end
}
class FriendInviteGift {
	public id;//玩家ID
	public sex;//玩家性别
	public name: string = "";//玩家姓名
	public avatarUrl: string = "";//头像的URL
	public isReceived: boolean = false;//是否领奖

	public onParseInfo(msg: Message): void {
		this.id = msg.getInt();
		this.sex = msg.getByte();
		this.name = msg.getString();
		this.isReceived = msg.getBoolean();
	}
}