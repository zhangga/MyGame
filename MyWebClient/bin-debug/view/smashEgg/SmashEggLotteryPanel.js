var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SmashEggLotteryPanel = (function (_super) {
    __extends(SmashEggLotteryPanel, _super);
    function SmashEggLotteryPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.EGG_MAX = 10;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        /**倒计时操作**/
        _this._timerStart = false;
        return _this;
    }
    SmashEggLotteryPanel.prototype.onSkinName = function () {
        this.skinName = skins.SmashEggMainSkin;
    };
    SmashEggLotteryPanel.prototype.onInit = function () {
        this.setTitle("smash_egg_title_png");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    SmashEggLotteryPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        for (var i = 0; i < this.EGG_MAX; i++) {
            this["lottery_egg" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEggHandler, this);
        }
        GameDispatcher.instance.addEventListener(MESSAGE_ID.SMASHEGG_BE_REWARD_MSG.toString(), this.onUpdate, this);
        this.onStartTimer();
    };
    SmashEggLotteryPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        for (var i = 0; i < this.EGG_MAX; i++) {
            this["lottery_egg" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEggHandler, this);
        }
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.SMASHEGG_BE_REWARD_MSG.toString(), this.onUpdate, this);
        this.onCloseRecTimer();
    };
    SmashEggLotteryPanel.prototype.onRefresh = function () {
        this.onUpdateHammerNum();
        var _userSmasheggInfo = DataManager.instance.smasheggM.getSmashEggUserInfoById(this.param.playerId);
        for (var i = 0; i < this.EGG_MAX; i++) {
            var _eggData = this.param.getEggAwardByIndex(i);
            var _eggRewardItem = this["lottery_egg" + i];
            if (_eggData) {
                _eggRewardItem.currentState = "open";
                _eggRewardItem["player_name_label"].text = _eggData.userName;
                var awardThing = GameCommon.instance.getThingModel(_eggData.reward.type, _eggData.reward.id);
                if (awardThing) {
                    _eggRewardItem["head_bar"].headIcon = new PlayerHeadParam(_eggData.userId, _eggData.avatarUrl);
                    _eggRewardItem["award_desc_label"].text = awardThing.name + "×" + _eggData.reward.num;
                }
            }
            else {
                _eggRewardItem.currentState = "unopen";
                _eggRewardItem["consume_label"].text = "×" + _userSmasheggInfo.hammerCount;
            }
        }
    };
    SmashEggLotteryPanel.prototype.onUpdate = function (event) {
        var message = event.data;
        var playerId = message.getInt();
        if (playerId == this.param.playerId) {
            var _eggIndex = message.getByte();
            var _eggData = this.param.getEggAwardByIndex(_eggIndex);
            var _eggItem = this["lottery_egg" + _eggIndex];
            var _awardModel = ModelAward.onParseByParam(message.getByte(), message.getInt(), message.getInt());
            _eggItem.currentState = "open";
            _eggItem["player_name_label"].text = DataManager.instance.playerM.player.name;
            var awardThing = GameCommon.instance.getThingModel(_awardModel.type, _awardModel.id);
            if (awardThing) {
                _eggItem["head_bar"].headIcon = new PlayerHeadParam(_eggData.userId, _eggData.avatarUrl);
                _eggItem["award_desc_label"].text = awardThing.name + "×" + _awardModel.num;
            }
        }
    };
    SmashEggLotteryPanel.prototype.onUpdateHammerNum = function () {
        this.share_giftnum_label.text = this.smashM.invitegiftNum + "/" + GameDefine.SMASHEGG_SHARE_MAX;
        this.chuizi_num_label.text = "\u00D7" + this.smashM.hammerNum;
    };
    Object.defineProperty(SmashEggLotteryPanel.prototype, "smashM", {
        get: function () {
            return DataManager.instance.smasheggM;
        },
        enumerable: true,
        configurable: true
    });
    SmashEggLotteryPanel.prototype.onShowWithParam = function (param) {
        this.param = param;
        if (this.param)
            this.onShow();
    };
    SmashEggLotteryPanel.prototype.onTouchEggHandler = function (event) {
        var _eggIndex = parseInt(event.currentTarget.name);
        var _eggItem = this["lottery_egg" + _eggIndex];
        if (_eggItem.currentState == "unopen") {
            this.smashM.onSendSmashAcitionMsg(this.param.playerId, _eggIndex);
        }
    };
    SmashEggLotteryPanel.prototype.onStartTimer = function () {
        if (!this._timerStart) {
            this._timerStart = true;
            Tool.addTimer(this.onTimerDown, this, 1000);
        }
    };
    SmashEggLotteryPanel.prototype.onTimerDown = function () {
        var _lefttime = DataManager.instance.smasheggM.actLefttime;
        if (_lefttime >= 0) {
            this.act_lefttime_label.text = GameCommon.instance.getTimeStrForSec1(_lefttime);
        }
        else {
            this.onCloseRecTimer();
        }
    };
    SmashEggLotteryPanel.prototype.onCloseRecTimer = function () {
        this._timerStart = false;
        Tool.removeTimer(this.onTimerDown, this, 1000);
    };
    return SmashEggLotteryPanel;
}(BaseWindowPanel));
__reflect(SmashEggLotteryPanel.prototype, "SmashEggLotteryPanel");
var SmashEggLotteryParam = (function () {
    function SmashEggLotteryParam() {
    }
    SmashEggLotteryParam.prototype.onParse = function (msg) {
        this.playerId = msg.getInt();
        this._smashEggs = {};
        var _egglen = msg.getByte();
        for (var i = 0; i < _egglen; i++) {
            var _eggawardObj = new SmashEggReward();
            _eggawardObj.onParse(msg);
            this._smashEggs[_eggawardObj.index] = _eggawardObj;
        }
    };
    SmashEggLotteryParam.prototype.getEggAwardByIndex = function (index) {
        return this._smashEggs[index];
    };
    return SmashEggLotteryParam;
}());
__reflect(SmashEggLotteryParam.prototype, "SmashEggLotteryParam");
var SmashEggReward = (function () {
    function SmashEggReward() {
        this.userId = -1; //砸开此蛋的玩家ID
        this.userName = "";
        this.avatarUrl = ""; //头像的URL 
    }
    SmashEggReward.prototype.onParse = function (msg) {
        this.index = msg.getByte();
        this.userId = msg.getInt();
        this.userName = msg.getString();
        this.reward = ModelAward.onParseByParam(msg.getByte(), msg.getInt(), msg.getInt());
    };
    return SmashEggReward;
}());
__reflect(SmashEggReward.prototype, "SmashEggReward");
//# sourceMappingURL=SmashEggLotteryPanel.js.map