class OtherFeedView extends BaseComp {
	protected _data: OtherFishTankParam;
	private btn_back: eui.Button;
	private lab_login: eui.Label;
	private lab_outPut: eui.Label;
	private lab_hasTime: eui.Label;
	private lab_hasTimeByOne: eui.Label;
	private btn_do: eui.Button;
	private btn_enemy: eui.Button;
	private player: BeVisitedPlayer;
	private animLayer: eui.Group;
	private hint: string;
	private grp_star: eui.Group;
	private currHappines: number;
	private anim: Animation;
	private starAnim: Animation;
	private isDone: boolean = false;
	public constructor() {
		super();
		this.skinName = skins.OtherFeedViewSkin;
	}
	public set data(source) {
		this._data = source;
		this.isDone = false;
		if (this.isLoaded) {
			this.onInit();
		}
	}
	protected onInit(): void {
		this.player = DataManager.instance.visite.player;
		this.btn_do.enabled = true;
		switch (DataManager.instance.visite.type) {
			case OTHER_BEHAVIOR_TYPE.VISIT:
				this.currentState = "visit";
				this.lab_login.text = `上次登录：${GameCommon.instance.getOnlineTime(this.player.loginTime)}`;
				this.lab_hasTime.text = `${DataManager.instance.playerM.player.clearLen}/${GameDefine.CLEAR_FISHTANK_MAX}`;
				var clearNum: number = DataManager.instance.playerM.player.getClearNumById(this.player.id);
				this.lab_hasTimeByOne.text = `已喂食此人：${clearNum}/${GameDefine.CLEAR_FISHTANK_BY_ONE_MAX}`;
				if (DataManager.instance.playerM.player.clearLen >= GameDefine.CLEAR_FISHTANK_MAX || clearNum >= GameDefine.CLEAR_FISHTANK_BY_ONE_MAX) {
					this.btn_do.enabled = false;
				} else {
					this.btn_do.enabled = true;
				}
				break;
			case OTHER_BEHAVIOR_TYPE.ROB:
				this.btn_do.enabled = !this.isDone;
				this.currentState = "rob";
				break;
			case OTHER_BEHAVIOR_TYPE.POLLUTE:
				this.btn_do.enabled = !this.isDone;
				this.currentState = "pollute";
				break;
		}
		var abs: number = Math.abs(this.player.happiness);
		var happinessType: number = 1;
		var symbol: string = "+";
		var rate: number = abs * 10;
		if (this.player.happiness < 0) {
			happinessType = 2;
			symbol = "-";
			if (abs > 5) {
				rate = 50;
			}
		}
		for (var i: number = 0; i < 10; i++) {
			if (i < abs) {
				this[`img_degree${i}`].source = `feed_DegreeOfJoy_${happinessType}_png`;
			} else {
				this[`img_degree${i}`].source = `feed_DegreeOfJoy_0_png`;
			}
		}
		this.lab_outPut.text = `秒产${symbol}${rate}%`;
	}
	//注册
	public onRegist(): void {
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBack, this);
		this.btn_do.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnDoHandler, this);
		this.btn_enemy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnemy, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_TO_DO_SOMEBODY.toString(), this.onBackHandler, this);
	}
	//移除
	public onRemove(): void {
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBack, this);
		this.btn_do.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnDoHandler, this);
		this.btn_enemy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnemy, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_TO_DO_SOMEBODY.toString(), this.onBackHandler, this);
	}
	private onTouchBack(): void {
		if (this.anim) {
			this.anim.playFinishCallBack(null, this);
			this.anim.onDestroy();
			this.anim = null;
		}
		if (this.starAnim) {
			this.starAnim.playFinishCallBack(null, this);
			this.starAnim.onDestroy();
			this.starAnim = null;
		}
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_CLOSE, false, "OtherFishTank");
	}
	private onTouchBtnDoHandler(): void {
		this.isDone = true;
		this.btn_do.enabled = false;
		DataManager.instance.visite.onSendDoSomeTing(this.player.id, DataManager.instance.visite.type);
	}
	private onBackHandler(): void {//成功返回
		this.currHappines = this.player.happiness;
		switch (DataManager.instance.visite.type) {
			case OTHER_BEHAVIOR_TYPE.VISIT:
				DataManager.instance.playerM.player.addClearPlayer(this.player.id);
				if (this.player.happiness < GameDefine.PLAYER_HAPPINESS_MAX) {
					++this.player.happiness;
				}
				this.hint = "qingjie";
				break;
			case OTHER_BEHAVIOR_TYPE.ROB:
				this.hint = "daoqu";
				break;
			case OTHER_BEHAVIOR_TYPE.POLLUTE:
				if (this.player.happiness > GameDefine.PLAYER_HAPPINESS_MIN) {
					--this.player.happiness;
				}
				this.hint = "wuran";
				break;
		}
		switch (DataManager.instance.visite.type) {
			case OTHER_BEHAVIOR_TYPE.ROB:
			case OTHER_BEHAVIOR_TYPE.POLLUTE:
				this.btn_do.enabled = false;
				break;
		}
		switch (DataManager.instance.visite.type) {
			case OTHER_BEHAVIOR_TYPE.VISIT:
				this.anim = GameCommon.instance.addAnimation(this, "anim_jiewen", new egret.Point(300, 533), 1, true);
				SoundFactory.playSound(SoundDefine.SOUND_BEHAVIOR_STROKE);
				break;
			case OTHER_BEHAVIOR_TYPE.ROB:
				this.anim = GameCommon.instance.addAnimation(this, "anim_daoqu", new egret.Point(300, 533), 1, true);
				SoundFactory.playSound(SoundDefine.SOUND_BEHAVIOR_STEAL);
				break;
			case OTHER_BEHAVIOR_TYPE.POLLUTE:
				this.anim = GameCommon.instance.addAnimation(this, "anim_wuran", new egret.Point(300, 533), 1, true);
				SoundFactory.playSound(SoundDefine.SOUND_BEHAVIOR_POLLUTE);
				break;
		}
		this.anim.playFinishCallBack(this.onAnimHandler, this);
	}
	private onAnimHandler(): void {
		var x: number;
		var pos: egret.Point;
		var heartRes: string;
		if (this.player.happiness == this.currHappines) {
			this.onAnimHandler1();
		} else {
			if (this.player.happiness > this.currHappines) {//增加
				if (this.player.happiness > 0) {//红色增
					heartRes = "hongxinjia";
				} else {//黑色减
					heartRes = "heixinjian";
				}
			} else if (this.player.happiness < this.currHappines) {//减少
				if (this.player.happiness > 0) {//红色减
					heartRes = "hongxinjian";
				} else {//黑色增
					heartRes = "heixinjia";
				}
			}
			x = this.grp_star.width / 10 * (Math.abs(this.player.happiness) - 1) + this.grp_star.width / 20;
			pos = new egret.Point(x, 0);
			this.starAnim = GameCommon.instance.addAnimation(this.animLayer, heartRes, pos, 1, true);
			this.starAnim.playFinishCallBack(this.onAnimHandler1, this);
		}
	}
	private onAnimHandler1(): void {
		this.onInit();
		if (DataManager.instance.visite.reward) {
			GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
				new WindowParam("AlertHint", new AlertHintParam(1, Language.instance.getDescByKey(this.hint), ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, DataManager.instance.visite.reward.num)))
			);
		}
	}

	private onTouchEnemy(): void {
		DataManager.instance.enemy.onSendMessage();
	}
}