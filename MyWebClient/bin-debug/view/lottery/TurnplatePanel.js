var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TurnplatePanel = (function (_super) {
    __extends(TurnplatePanel, _super);
    function TurnplatePanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.isPlay = false;
        _this.Max_LotteryNum = 8;
        //点击转动按钮
        _this._touchTime = 0;
        //初始化动画状态
        _this.animState = null; //动画状态
        return _this;
    }
    TurnplatePanel.prototype.onSkinName = function () {
        this.skinName = skins.TurnplatePanelSkin;
    };
    TurnplatePanel.prototype.onInit = function () {
        for (var i = 0; i < this.Max_LotteryNum; i++) {
            var model = ModelManager.instance.modelTurnplate[i + 1];
            this.lotteryAwd["lottery_item" + i].source = model.icon;
            this.lotteryAwd["lottery_desc" + i].source = "turnplate_desc" + (i + 1) + "_png";
        }
        _super.prototype.onInit.call(this);
    };
    TurnplatePanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.view_black_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.lottery_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLotteryBtn, this);
        GameDispatcher.instance.addEventListener(GameEvent.FISH_FOOD_UPDATE, this.onUpdatePower, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.TURNPLATE_LOTTERY_MSG.toString(), this.onStartLottery, this);
        this.onUpdatePower();
        this.windowAnimation(1);
    };
    TurnplatePanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.view_black_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.lottery_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLotteryBtn, this);
        GameDispatcher.instance.removeEventListener(GameEvent.FISH_FOOD_UPDATE, this.onUpdatePower, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.TURNPLATE_LOTTERY_MSG.toString(), this.onStartLottery, this);
        this.onCloseRecTimer();
    };
    //开始转动转盘
    TurnplatePanel.prototype.onStartLottery = function () {
        DataManager.instance.turnplateM.onSendPowerReciveMsg();
        if (this.isPlay) {
            return;
        }
        this.isPlay = true;
        var index = DataManager.instance.turnplateM.lotteryId - 1;
        var roundNum = Math.ceil(Math.random() * 2) + 6;
        var targetRotation = -(this.lotteryAwd["lottery_item" + index].rotation);
        var turnRotation = roundNum * 360 + targetRotation;
        TweenLiteUtil.TurnplateEffectTween(this.turnplate_grp, turnRotation, this.onFinishLottery, this);
        Tool.callbackTime(function () {
            GameCommon.instance.addAnimation(this, "zhuanpanfeng", new egret.Point(300, 460), 3, true);
            SoundFactory.playSound(SoundDefine.SOUND_TURNPLATE_START);
        }, this, 400);
        Tool.callbackTime(function () {
            var startSound = SoundFactory.sounds[SoundDefine.SOUND_TURNPLATE_START];
            if (startSound)
                startSound.stop();
            SoundFactory.playSound(SoundDefine.SOUND_TURNPLATE_END);
        }, this, 2000);
    };
    //结束转盘转动
    TurnplatePanel.prototype.onFinishLottery = function () {
        this.isPlay = false;
        var endSound = SoundFactory.sounds[SoundDefine.SOUND_TURNPLATE_END];
        if (endSound)
            endSound.stop();
        DataManager.instance.turnplateM.onCompleteLottery();
    };
    TurnplatePanel.prototype.onTouchLotteryBtn = function () {
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
        DataManager.instance.syncM.onSendQue(); //提前同步5秒操作
        var lotteryMsg = new Message(MESSAGE_ID.TURNPLATE_LOTTERY_MSG);
        _GF.instance.net.onAddMessage(lotteryMsg);
    };
    //启动体力恢复倒计时
    TurnplatePanel.prototype.onUpdatePower = function () {
        this.power_label.text = DataManager.instance.playerM.player.fishfood + "/" + GameDefine.FISHFOOD_MAX;
        if (DataManager.instance.playerM.player.fishfood < GameDefine.FISHFOOD_MAX && DataManager.instance.turnplateM.reciveTime > 0) {
            Tool.addTimer(this.onTimerDown, this, 1000);
        }
        else {
            this.onCloseRecTimer();
        }
        this.recive_grp.visible = DataManager.instance.playerM.player.fishfood < GameDefine.FISHFOOD_MAX;
        this.power_full_label.visible = DataManager.instance.playerM.player.fishfood >= GameDefine.FISHFOOD_MAX;
    };
    //关闭体力倒计时
    TurnplatePanel.prototype.onCloseRecTimer = function () {
        Tool.removeTimer(this.onTimerDown, this, 1000);
    };
    //倒计时处理
    TurnplatePanel.prototype.onTimerDown = function () {
        var _lefttime = DataManager.instance.turnplateM.reciveTime;
        this.rec_time_label.text = GameCommon.instance.getTimeStrForSec2(_lefttime);
        if (_lefttime <= 0) {
            DataManager.instance.turnplateM.onSendPowerReciveMsg();
            this.onCloseRecTimer();
        }
    };
    //播放转盘淡入淡出
    TurnplatePanel.prototype.animation1 = function () {
        var t_scaleX = this.animState == 1 ? 1 : 1.4;
        var t_scaleY = this.animState == 1 ? 1 : 1.4;
        var t_alpha = this.animState == 1 ? 1 : 0;
        var viewTween = egret.Tween.get(this.turnplate_view);
        viewTween.to({ scaleX: t_scaleX, scaleY: t_scaleY, alpha: t_alpha }, 400)
            .call(this.windowAnimRunner, this);
    };
    //播放按钮飞入飞出
    TurnplatePanel.prototype.animation2 = function () {
        var t_bottom = this.animState == 1 ? 50 : -200;
        var viewTween = egret.Tween.get(this.lottery_btn);
        viewTween.to({ bottom: t_bottom }, 300)
            .call(this.windowAnimRunner, this);
    };
    TurnplatePanel.prototype.windowAnimation = function (state) {
        if (this.animState != null) {
            return;
        }
        this.animState = state;
        switch (state) {
            case 1:
                this.turnplate_view.scaleX = 1.4;
                this.turnplate_view.scaleY = 1.4;
                this.turnplate_view.alpha = 0.6;
                this.lottery_btn.bottom = -200;
                this.animFuncAry = [this.animation1, this.animation2];
                break;
            case 0:
                this.animFuncAry = [this.animation2, this.animation1, this.windowAnimEnd];
                break;
        }
        this.windowAnimRunner();
    };
    TurnplatePanel.prototype.windowAnimRunner = function () {
        if (this.animFuncAry.length > 0) {
            var curr_func = this.animFuncAry.shift();
            curr_func.call(this);
        }
        else {
            this.animState = null;
        }
    };
    TurnplatePanel.prototype.windowAnimEnd = function () {
        _super.prototype.onHide.call(this);
        this.turnplate_view.scaleX = 1;
        this.turnplate_view.scaleY = 1;
        this.turnplate_view.alpha = 1;
        this.lottery_btn.bottom = 50;
        this.windowAnimRunner();
        this.onCheckGuide();
    };
    TurnplatePanel.prototype.onCheckGuide = function () {
        if (PromptPanel.getInstance().guideIsShow) {
            Tool.callbackTime(function () {
                if (PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.INVITEGIFT) {
                    var btn = new egret.DisplayObject();
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                        var btn = event.currentTarget;
                        btn = null;
                        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "InviteGiftPanel");
                    }, this);
                    PromptPanel.getInstance().guidePanel.showGuide(btn);
                }
            }, this, 500);
        }
    };
    TurnplatePanel.prototype.onTouchCloseBtn = function () {
        if (!this.isPlay) {
            this.windowAnimation(0);
        }
    };
    return TurnplatePanel;
}(BaseWindowPanel));
__reflect(TurnplatePanel.prototype, "TurnplatePanel");
//# sourceMappingURL=TurnplatePanel.js.map