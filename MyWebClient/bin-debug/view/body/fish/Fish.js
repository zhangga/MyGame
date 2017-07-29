var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish(id) {
        var _this = _super.call(this, id) || this;
        _this.outputCD = 5000;
        _this.isOnInit = false;
        _this.isEvolution = false;
        _this.outPutType = FISH_OUTPUT_TYPE.COMMON;
        _this.state = FISH_STATE.COMMON;
        _this.outPutNumType = 0;
        _this.touchTime = 0;
        return _this;
    }
    //添加到舞台
    Fish.prototype.onAddToStage = function () {
        _super.prototype.onAddToStage.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    Fish.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.output = new Bubble();
        this.event = new RandEevent();
        this.eventEmoji = new RandEevent();
        this.addChild(this.output);
        this.animLayer = new eui.Group();
        this.addChild(this.animLayer);
        this.emoji = new eui.Image();
        this.emoji.visible = false;
        // this.emoji.source = `icon_emoji_0_png`;
        this.emoji.anchorOffsetX = 90 / 2;
        this.emoji.anchorOffsetY = 117 / 2;
        this.emoji.y = -this.height / 2 - 20;
        this.addChild(this.emoji);
        this.sin = new SineBase(100, 5);
        this.emoji.scaleX = this.emoji.scaleY = 0.45;
        this.output.visible = false;
        this.direction = this.anim.scaleX;
        this.chageState();
        this.outputCD = this.model.paochanTime * 1000;
        if (this.outPutType == FISH_OUTPUT_TYPE.COMMON) {
            this.onStartOutPutTime();
        }
        this.touchTime = egret.getTimer();
    };
    //开启产出倒计时
    Fish.prototype.onStartOutPutTime = function () {
        if (!this.it) {
            this.it = new egret.Timer(this.outputCD, 1);
            this.it.addEventListener(egret.TimerEvent.TIMER, this.onShowBubble, this);
            this.it.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.it.start();
        this.currTime = egret.getTimer();
    };
    Fish.prototype.timerComFunc = function () {
        // console.log("计时结束");
    };
    //产出气泡和道具
    Fish.prototype.onShowBubble = function () {
        this.onPause();
        this.state = FISH_STATE.OUTPUT;
        this.chageState();
        this.output.visible = true;
    };
    Fish.prototype.onPause = function () {
        if (this.it) {
            this.it.reset();
            this.it.repeatCount = 1;
        }
    };
    Fish.prototype.chageState = function () {
        if (this.isEvolution) {
            this.outPutType = FISH_OUTPUT_TYPE.EVENT;
        }
        else {
            this.outPutType = FISH_OUTPUT_TYPE.COMMON;
        }
        this.onReSetRes();
    };
    Fish.prototype.onReSetRes = function () {
        if (!this.output)
            return;
        switch (this.outPutType) {
            case FISH_OUTPUT_TYPE.COMMON:
                this.output.onReSetRes("paopao_1", new egret.Point(0, 0), this.size / 2);
                this.onRemRandomEventAnim();
                break;
            case FISH_OUTPUT_TYPE.EVENT:
                var rand;
                switch (this.param.type) {
                    case RANDOM_EVENT_TYPE.PEACH:
                        rand = Tool.rand(1, 3);
                        this.output.onReSetRes("paopao" + rand, new egret.Point(0, -this.model.size.y / 2 - 66));
                        break;
                    case RANDOM_EVENT_TYPE.SMILINGFACE:
                        rand = Tool.rand(4, 3);
                        this.output.onReSetRes("paopao" + rand, new egret.Point(0, -this.model.size.y / 2 - 66));
                        break;
                }
                Tool.log(rand);
                this.onAddRandomEventAnim();
                this.output.visible = true;
                this.emoji.visible = false;
                this.state = FISH_STATE.OUTPUT;
                break;
        }
    };
    Fish.prototype.onAddRandomEventAnim = function () {
        if (!this.randomEventAnim) {
            this.randomEventAnim = new Animation("dianliu1", -1);
            this.randomEventAnim.scaleX = this.randomEventAnim.scaleY = 0.5;
            this.animLayer.addChild(this.randomEventAnim);
        }
        else {
            this.randomEventAnim.visible = true;
            this.randomEventAnim.onPlay();
        }
    };
    Fish.prototype.onRemRandomEventAnim = function () {
        if (this.randomEventAnim) {
            this.randomEventAnim.visible = false;
            this.randomEventAnim.onStop();
        }
    };
    Fish.prototype.onPlayTouchTween = function () {
        egret.Tween.get(this.fishLayer).
            to({ scaleX: 0.75, scaleY: 1.25 }, 60, egret.Ease.circOut).
            to({ scaleX: 1, scaleY: 1 }, 60, egret.Ease.circIn).
            call(this.onBreakBubble, this);
    };
    Fish.prototype.onBreakBubble = function () {
        var pass = Math.floor((egret.getTimer() - this.currTime));
        if (pass >= this.outputCD) {
            this.outPutNumType = 0;
        }
        else {
            this.outPutNumType = 1;
        }
        GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_OUT_PUT_EVENT, false, this);
        this.onPause();
        this.state = FISH_STATE.COMMON;
        this.output.visible = false;
        switch (this.outPutType) {
            case FISH_OUTPUT_TYPE.COMMON:
                this.onStartOutPutTime();
                break;
            case FISH_OUTPUT_TYPE.EVENT:
                switch (this.param.type) {
                    case RANDOM_EVENT_TYPE.PEACH:
                        this.output.visible = true;
                        this.state = FISH_STATE.OUTPUT;
                        break;
                    case RANDOM_EVENT_TYPE.SMILINGFACE:
                        this.event.needCheck = true;
                        this.output.visible = false;
                        break;
                }
                break;
        }
        GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_TOUCH_EVENT, false, this);
    };
    Fish.prototype.onTouchBegin = function () {
        var curr = egret.getTimer();
        var pass = Math.floor((curr - this.touchTime));
        if (pass < 200)
            return;
        this.touchTime = curr;
        switch (this.state) {
            case FISH_STATE.OUTPUT:
                this.onPlayTouchTween();
                break;
            case FISH_STATE.COMMON:
                this.onPlayTouchTween();
                break;
        }
    };
    Fish.prototype.onTouchShowBubble = function () {
        this.onShowBubble();
    };
    Fish.prototype.onAction = function () {
        _super.prototype.onAction.call(this);
        this.emoji.y = -this.height / 2 - 20 + this.sin.flotage();
    };
    Fish.prototype.onTime = function () {
        if (this.isEvolution) {
            if (this.event.check()) {
                this.isEvolution = false;
                this.chageState();
            }
        }
        if (this.eventEmoji.check()) {
            this.emoji.visible = false;
        }
    };
    Fish.prototype.onResetSize = function () {
        _super.prototype.onResetSize.call(this);
        this.isEvolution = false;
        this.chageState();
    };
    Fish.prototype.onEvolutionHandler = function (param) {
        this.param = param;
        this.isEvolution = true;
        this.chageState();
        if (this.outPutType == FISH_OUTPUT_TYPE.EVENT) {
            switch (this.param.type) {
                case RANDOM_EVENT_TYPE.PEACH:
                    this.event.reset(parseInt(param.model.effect[0]));
                    break;
                case RANDOM_EVENT_TYPE.SMILINGFACE:
                    this.event.reset(-1);
                    break;
            }
        }
        else {
            this.isEvolution = false;
        }
    };
    Fish.prototype.onShowEmojiHandler = function (param) {
        if (this.output.visible && this.outPutType == FISH_OUTPUT_TYPE.EVENT)
            return;
        this.eventEmoji.reset(GameDefine.EMOJI_EVENT_CONTINUE_CD);
        this.emoji.visible = true;
        var rand = Math.floor(Math.random() * 6);
        this.emoji.source = "icon_emoji_" + rand + "_png";
    };
    Fish.prototype.onShowLevelUp = function () {
        this.onShowLevelUpHint();
    };
    Fish.prototype.onShowLevelUpHint = function () {
        GameCommon.instance.addAnimation(this, "yushengji", new egret.Point(0, 0), 1, true);
    };
    Fish.prototype.onDone = function (e) {
        var drop = e;
        drop.onDestory();
    };
    Fish.prototype.onDestory = function () {
        if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
        if (this.it) {
            this.it.stop();
            this.it.removeEventListener(egret.TimerEvent.TIMER, this.onShowBubble, this);
            this.it.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.it = null;
        }
        if (this.output) {
            this.output.onDestroy();
            this.output = null;
        }
        _super.prototype.onDestory.call(this);
    };
    return Fish;
}(FishBase));
__reflect(Fish.prototype, "Fish");
var FISH_STATE;
(function (FISH_STATE) {
    FISH_STATE[FISH_STATE["COMMON"] = 0] = "COMMON";
    FISH_STATE[FISH_STATE["OUTPUT"] = 1] = "OUTPUT";
})(FISH_STATE || (FISH_STATE = {}));
var FISH_OUTPUT_TYPE;
(function (FISH_OUTPUT_TYPE) {
    FISH_OUTPUT_TYPE[FISH_OUTPUT_TYPE["COMMON"] = 0] = "COMMON";
    FISH_OUTPUT_TYPE[FISH_OUTPUT_TYPE["EVENT"] = 2] = "EVENT";
})(FISH_OUTPUT_TYPE || (FISH_OUTPUT_TYPE = {}));
//# sourceMappingURL=Fish.js.map