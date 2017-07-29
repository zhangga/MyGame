class TurnplatePanel extends BaseWindowPanel {
	private btn_back: eui.Button;
	private lottery_btn: eui.Button;
	private turnplate_grp: eui.Group;
	private lotteryAwd: eui.Component;
	private power_label: eui.Label;
	private rec_time_label: eui.Label;
	private turnplate_view: eui.Group;
	private power_full_label: eui.Label;
	private recive_grp: eui.Group;
	private view_black_bg;

	private isPlay: boolean = false;
	private Max_LotteryNum: number = 8;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.TurnplatePanelSkin;
	}
	protected onInit(): void {
		for (var i: number = 0; i < this.Max_LotteryNum; i++) {
			var model: ModelTurnplate = ModelManager.instance.modelTurnplate[i + 1];
			(this.lotteryAwd["lottery_item" + i] as eui.Image).source = model.icon;
			(this.lotteryAwd["lottery_desc" + i] as eui.Image).source = `turnplate_desc${(i + 1)}_png`;
		}
		super.onInit();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		this.view_black_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		this.lottery_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLotteryBtn, this);
		GameDispatcher.instance.addEventListener(GameEvent.FISH_FOOD_UPDATE, this.onUpdatePower, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.TURNPLATE_LOTTERY_MSG.toString(), this.onStartLottery, this);
		this.onUpdatePower();
		this.windowAnimation(1);
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		this.view_black_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
		this.lottery_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLotteryBtn, this);
		GameDispatcher.instance.removeEventListener(GameEvent.FISH_FOOD_UPDATE, this.onUpdatePower, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.TURNPLATE_LOTTERY_MSG.toString(), this.onStartLottery, this);
		this.onCloseRecTimer();
	}
	//开始转动转盘
	private onStartLottery(): void {
		DataManager.instance.turnplateM.onSendPowerReciveMsg();
		if (this.isPlay) {
			return;
		}
		this.isPlay = true;
		var index: number = DataManager.instance.turnplateM.lotteryId - 1;
		var roundNum: number = Math.ceil(Math.random() * 2) + 6;
		var targetRotation: number = -(this.lotteryAwd["lottery_item" + index].rotation);
		var turnRotation: number = roundNum * 360 + targetRotation;
		TweenLiteUtil.TurnplateEffectTween(this.turnplate_grp, turnRotation, this.onFinishLottery, this);
		Tool.callbackTime(function (): void {
			GameCommon.instance.addAnimation(this, "zhuanpanfeng", new egret.Point(300, 460), 3, true);
			SoundFactory.playSound(SoundDefine.SOUND_TURNPLATE_START);
		}, this, 400);
		Tool.callbackTime(function (): void {
			var startSound: SoundBase = SoundFactory.sounds[SoundDefine.SOUND_TURNPLATE_START];
			if (startSound)
				startSound.stop();
			SoundFactory.playSound(SoundDefine.SOUND_TURNPLATE_END);
		}, this, 2000);
	}
	//结束转盘转动
	private onFinishLottery(): void {
		this.isPlay = false;
		var endSound: SoundBase = SoundFactory.sounds[SoundDefine.SOUND_TURNPLATE_END];
		if (endSound)
			endSound.stop();
		DataManager.instance.turnplateM.onCompleteLottery();
	}
	//点击转动按钮
	private _touchTime: number = 0;
	private onTouchLotteryBtn(): void {
		//播放按钮动画
		GameCommon.instance.addAnimation(this.lottery_btn, "anniuyan", new egret.Point(124, 71), 1, true);
		if (this.isPlay)
			return;

		if (DataManager.instance.playerM.player.fishfood <= 0) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips17"));
			return;
		}
		if (this._touchTime > egret.getTimer()) {
			GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips5"));
			return;
		}
		this._touchTime = egret.getTimer() + 2000;

		DataManager.instance.syncM.onSendQue();//提前同步5秒操作

		var lotteryMsg: Message = new Message(MESSAGE_ID.TURNPLATE_LOTTERY_MSG);
		_GF.instance.net.onAddMessage(lotteryMsg);
	}
	//启动体力恢复倒计时
	private onUpdatePower(): void {
		this.power_label.text = DataManager.instance.playerM.player.fishfood + "/" + GameDefine.FISHFOOD_MAX;
		if (DataManager.instance.playerM.player.fishfood < GameDefine.FISHFOOD_MAX && DataManager.instance.turnplateM.reciveTime > 0) {
			Tool.addTimer(this.onTimerDown, this, 1000);
		} else {
			this.onCloseRecTimer();
		}
		this.recive_grp.visible = DataManager.instance.playerM.player.fishfood < GameDefine.FISHFOOD_MAX;
		this.power_full_label.visible = DataManager.instance.playerM.player.fishfood >= GameDefine.FISHFOOD_MAX;
	}
	//关闭体力倒计时
	private onCloseRecTimer(): void {
		Tool.removeTimer(this.onTimerDown, this, 1000);
	}
	//倒计时处理
	private onTimerDown(): void {
		var _lefttime: number = DataManager.instance.turnplateM.reciveTime;
		this.rec_time_label.text = GameCommon.instance.getTimeStrForSec2(_lefttime);
		if (_lefttime <= 0) {
			DataManager.instance.turnplateM.onSendPowerReciveMsg();
			this.onCloseRecTimer();
		}
	}
	//播放转盘淡入淡出
	private animation1(): void {
		var t_scaleX: number = this.animState == 1 ? 1 : 1.4;
		var t_scaleY: number = this.animState == 1 ? 1 : 1.4;
		var t_alpha: number = this.animState == 1 ? 1 : 0;
		var viewTween: egret.Tween = egret.Tween.get(this.turnplate_view);
		viewTween.to({ scaleX: t_scaleX, scaleY: t_scaleY, alpha: t_alpha }, 400)
			.call(this.windowAnimRunner, this);
	}
	//播放按钮飞入飞出
	private animation2(): void {
		var t_bottom: number = this.animState == 1 ? 50 : -200;
		var viewTween: egret.Tween = egret.Tween.get(this.lottery_btn);
		viewTween.to({ bottom: t_bottom }, 300)
			.call(this.windowAnimRunner, this);
	}
	//初始化动画状态
	private animState: number = null;//动画状态
	private animFuncAry: Array<Function>;
	private windowAnimation(state: number): void {
		if (this.animState != null) {
			return;
		}
		this.animState = state;
		switch (state) {
			case 1://打开
				this.turnplate_view.scaleX = 1.4;
				this.turnplate_view.scaleY = 1.4;
				this.turnplate_view.alpha = 0.6;
				this.lottery_btn.bottom = -200;
				this.animFuncAry = [this.animation1, this.animation2];
				break;
			case 0://关闭
				this.animFuncAry = [this.animation2, this.animation1, this.windowAnimEnd];
				break;
		}
		this.windowAnimRunner();
	}
	private windowAnimRunner(): void {
		if (this.animFuncAry.length > 0) {
			var curr_func: Function = this.animFuncAry.shift();
			curr_func.call(this);
		} else {
			this.animState = null;
		}
	}
	private windowAnimEnd(): void {
		super.onHide();
		this.turnplate_view.scaleX = 1;
		this.turnplate_view.scaleY = 1;
		this.turnplate_view.alpha = 1;
		this.lottery_btn.bottom = 50;
		this.windowAnimRunner();
		this.onCheckGuide();
	}
	private onCheckGuide(): void {
		if (PromptPanel.getInstance().guideIsShow) {
			Tool.callbackTime(function () {
				if (PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.INVITEGIFT) {
					var btn: egret.DisplayObject = new egret.DisplayObject();
					btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event: egret.Event) {
						var btn: egret.DisplayObject = event.currentTarget;
						btn = null;
						GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "InviteGiftPanel");
					}, this);
					PromptPanel.getInstance().guidePanel.showGuide(btn);
				}
			}, this, 500);
		}
	}
	protected onTouchCloseBtn(): void {
		if (!this.isPlay) {
			this.windowAnimation(0);
		}
	}
	//The end
}