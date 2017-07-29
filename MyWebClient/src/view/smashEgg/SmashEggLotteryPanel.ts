class SmashEggLotteryPanel extends BaseWindowPanel {
	private share_giftnum_label: eui.Label;
	private chuizi_num_label: eui.Label;
	private act_lefttime_label: eui.Label;
	private btn_back: eui.Button;

	private param: SmashEggLotteryParam;

	private EGG_MAX: number = 10;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.SmashEggMainSkin;
	}
	protected onInit(): void {
		this.setTitle("smash_egg_title_png");
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		for (var i: number = 0; i < this.EGG_MAX; i++) {
			this["lottery_egg" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEggHandler, this);
		}
		GameDispatcher.instance.addEventListener(MESSAGE_ID.SMASHEGG_BE_REWARD_MSG.toString(), this.onUpdate, this);
		this.onStartTimer();
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		for (var i: number = 0; i < this.EGG_MAX; i++) {
			this["lottery_egg" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEggHandler, this);
		}
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.SMASHEGG_BE_REWARD_MSG.toString(), this.onUpdate, this);
		this.onCloseRecTimer();
	}
	protected onRefresh(): void {
		this.onUpdateHammerNum();
		var _userSmasheggInfo: SmashEggUserInfo = DataManager.instance.smasheggM.getSmashEggUserInfoById(this.param.playerId);
		for (var i: number = 0; i < this.EGG_MAX; i++) {
			var _eggData: SmashEggReward = this.param.getEggAwardByIndex(i);
			var _eggRewardItem: eui.Component = this["lottery_egg" + i];
			if (_eggData) {
				_eggRewardItem.currentState = "open";
				(_eggRewardItem["player_name_label"] as eui.Label).text = _eggData.userName;
				var awardThing: ModelThing = GameCommon.instance.getThingModel(_eggData.reward.type, _eggData.reward.id);
				if (awardThing) {
					(_eggRewardItem["head_bar"] as PlayerHeadBar).headIcon = new PlayerHeadParam(_eggData.userId, _eggData.avatarUrl);
					(_eggRewardItem["award_desc_label"] as eui.Label).text = awardThing.name + "×" + _eggData.reward.num;
				}
			} else {
				_eggRewardItem.currentState = "unopen";
				(_eggRewardItem["consume_label"] as eui.Label).text = "×" + _userSmasheggInfo.hammerCount;
			}
		}
	}
	private onUpdate(event: egret.Event): void {
		var message: Message = event.data;
		var playerId: number = message.getInt();
		if (playerId == this.param.playerId) {
			var _eggIndex: number = message.getByte();
			var _eggData: SmashEggReward = this.param.getEggAwardByIndex(_eggIndex);
			var _eggItem: eui.Component = this["lottery_egg" + _eggIndex];
			var _awardModel: ModelAward = ModelAward.onParseByParam(message.getByte(), message.getInt(), message.getInt());
			_eggItem.currentState = "open";
			(_eggItem["player_name_label"] as eui.Label).text = DataManager.instance.playerM.player.name;
			var awardThing: ModelThing = GameCommon.instance.getThingModel(_awardModel.type, _awardModel.id);
			if (awardThing) {
				(_eggItem["head_bar"] as PlayerHeadBar).headIcon = new PlayerHeadParam(_eggData.userId, _eggData.avatarUrl);
				(_eggItem["award_desc_label"] as eui.Label).text = awardThing.name + "×" + _awardModel.num;
			}
		}
	}
	private onUpdateHammerNum(): void {
		this.share_giftnum_label.text = `${this.smashM.invitegiftNum}/${GameDefine.SMASHEGG_SHARE_MAX}`;
		this.chuizi_num_label.text = `×${this.smashM.hammerNum}`;
	}
	private get smashM(): SmashEggManager {
		return DataManager.instance.smasheggM;
	}
	public onShowWithParam(param): void {
		this.param = param as SmashEggLotteryParam;
		if (this.param)
			this.onShow();
	}
	private onTouchEggHandler(event: egret.TouchEvent): void {
		var _eggIndex: number = parseInt(event.currentTarget.name);
		var _eggItem: eui.Component = this["lottery_egg" + _eggIndex];
		if (_eggItem.currentState == "unopen") {
			this.smashM.onSendSmashAcitionMsg(this.param.playerId, _eggIndex);
		}
	}
	/**倒计时操作**/
	private _timerStart: boolean = false;
	private onStartTimer(): void {
		if (!this._timerStart) {
			this._timerStart = true;
			Tool.addTimer(this.onTimerDown, this, 1000);
		}
	}
	private onTimerDown(): void {
		var _lefttime: number = DataManager.instance.smasheggM.actLefttime;
		if (_lefttime >= 0) {
			this.act_lefttime_label.text = GameCommon.instance.getTimeStrForSec1(_lefttime);
		} else {
			this.onCloseRecTimer();
		}
	}
	private onCloseRecTimer(): void {
		this._timerStart = false;
		Tool.removeTimer(this.onTimerDown, this, 1000);
	}
	//The end
}
class SmashEggLotteryParam {
	public playerId: number;//玩家的ID
	private _smashEggs;
	public constructor() {
	}
	public onParse(msg: Message): void {
		this.playerId = msg.getInt();
		this._smashEggs = {};
		var _egglen: number = msg.getByte();
		for (var i: number = 0; i < _egglen; i++) {
			var _eggawardObj: SmashEggReward = new SmashEggReward();
			_eggawardObj.onParse(msg);
			this._smashEggs[_eggawardObj.index] = _eggawardObj;
		}
	}
	public getEggAwardByIndex(index: number): SmashEggReward {
		return this._smashEggs[index];
	}
}
class SmashEggReward {
	public index: number;//蛋的序号
	public userId: number = -1;//砸开此蛋的玩家ID
	public userName: string = "";
	public avatarUrl: string = "";//头像的URL 
	public reward: ModelAward;
	public constructor() {
	}
	public onParse(msg: Message): void {
		this.index = msg.getByte();
		this.userId = msg.getInt();
		this.userName = msg.getString();
		this.reward = ModelAward.onParseByParam(msg.getByte(), msg.getInt(), msg.getInt());
	}
	//The end
}