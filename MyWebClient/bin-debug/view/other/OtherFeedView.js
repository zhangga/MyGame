var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OtherFeedView = (function (_super) {
    __extends(OtherFeedView, _super);
    function OtherFeedView() {
        var _this = _super.call(this) || this;
        _this.isDone = false;
        _this.skinName = skins.OtherFeedViewSkin;
        return _this;
    }
    Object.defineProperty(OtherFeedView.prototype, "data", {
        set: function (source) {
            this._data = source;
            this.isDone = false;
            if (this.isLoaded) {
                this.onInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    OtherFeedView.prototype.onInit = function () {
        this.player = DataManager.instance.visite.player;
        this.btn_do.enabled = true;
        switch (DataManager.instance.visite.type) {
            case OTHER_BEHAVIOR_TYPE.VISIT:
                this.currentState = "visit";
                this.lab_login.text = "\u4E0A\u6B21\u767B\u5F55\uFF1A" + GameCommon.instance.getOnlineTime(this.player.loginTime);
                this.lab_hasTime.text = DataManager.instance.playerM.player.clearLen + "/" + GameDefine.CLEAR_FISHTANK_MAX;
                var clearNum = DataManager.instance.playerM.player.getClearNumById(this.player.id);
                this.lab_hasTimeByOne.text = "\u5DF2\u5582\u98DF\u6B64\u4EBA\uFF1A" + clearNum + "/" + GameDefine.CLEAR_FISHTANK_BY_ONE_MAX;
                if (DataManager.instance.playerM.player.clearLen >= GameDefine.CLEAR_FISHTANK_MAX || clearNum >= GameDefine.CLEAR_FISHTANK_BY_ONE_MAX) {
                    this.btn_do.enabled = false;
                }
                else {
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
        var abs = Math.abs(this.player.happiness);
        var happinessType = 1;
        var symbol = "+";
        var rate = abs * 10;
        if (this.player.happiness < 0) {
            happinessType = 2;
            symbol = "-";
            if (abs > 5) {
                rate = 50;
            }
        }
        for (var i = 0; i < 10; i++) {
            if (i < abs) {
                this["img_degree" + i].source = "feed_DegreeOfJoy_" + happinessType + "_png";
            }
            else {
                this["img_degree" + i].source = "feed_DegreeOfJoy_0_png";
            }
        }
        this.lab_outPut.text = "\u79D2\u4EA7" + symbol + rate + "%";
    };
    //注册
    OtherFeedView.prototype.onRegist = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBack, this);
        this.btn_do.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnDoHandler, this);
        this.btn_enemy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnemy, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.PLAYER_TO_DO_SOMEBODY.toString(), this.onBackHandler, this);
    };
    //移除
    OtherFeedView.prototype.onRemove = function () {
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBack, this);
        this.btn_do.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnDoHandler, this);
        this.btn_enemy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnemy, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.PLAYER_TO_DO_SOMEBODY.toString(), this.onBackHandler, this);
    };
    OtherFeedView.prototype.onTouchBack = function () {
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
    };
    OtherFeedView.prototype.onTouchBtnDoHandler = function () {
        this.isDone = true;
        this.btn_do.enabled = false;
        DataManager.instance.visite.onSendDoSomeTing(this.player.id, DataManager.instance.visite.type);
    };
    OtherFeedView.prototype.onBackHandler = function () {
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
    };
    OtherFeedView.prototype.onAnimHandler = function () {
        var x;
        var pos;
        var heartRes;
        if (this.player.happiness == this.currHappines) {
            this.onAnimHandler1();
        }
        else {
            if (this.player.happiness > this.currHappines) {
                if (this.player.happiness > 0) {
                    heartRes = "hongxinjia";
                }
                else {
                    heartRes = "heixinjian";
                }
            }
            else if (this.player.happiness < this.currHappines) {
                if (this.player.happiness > 0) {
                    heartRes = "hongxinjian";
                }
                else {
                    heartRes = "heixinjia";
                }
            }
            x = this.grp_star.width / 10 * (Math.abs(this.player.happiness) - 1) + this.grp_star.width / 20;
            pos = new egret.Point(x, 0);
            this.starAnim = GameCommon.instance.addAnimation(this.animLayer, heartRes, pos, 1, true);
            this.starAnim.playFinishCallBack(this.onAnimHandler1, this);
        }
    };
    OtherFeedView.prototype.onAnimHandler1 = function () {
        this.onInit();
        if (DataManager.instance.visite.reward) {
            GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("AlertHint", new AlertHintParam(1, Language.instance.getDescByKey(this.hint), ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, DataManager.instance.visite.reward.num))));
        }
    };
    OtherFeedView.prototype.onTouchEnemy = function () {
        DataManager.instance.enemy.onSendMessage();
    };
    return OtherFeedView;
}(BaseComp));
__reflect(OtherFeedView.prototype, "OtherFeedView");
//# sourceMappingURL=OtherFeedView.js.map