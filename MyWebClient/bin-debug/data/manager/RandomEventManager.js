var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RandomEventManager = (function () {
    function RandomEventManager() {
        this.isInit = false;
        this.onGetRandEventCD();
    }
    RandomEventManager.prototype.onGetRandEventCD = function () {
        var model = ModelManager.instance.modelRandEvent[1];
        // GameDefine.RANDOM_EVENT_CD = 10;
        GameDefine.RANDOM_EVENT_CD = model.time;
        var models = ModelManager.instance.modelRandEvent;
        var rate = [];
        this.randRate = [];
        for (var key in models) {
            model = models[key];
            rate.push(model.gailv);
        }
        var n = 0;
        for (var i = 0; i < rate.length; i++) {
            n = rate[i];
            for (var j = 0; j < i; j++) {
                n += rate[j];
            }
            this.randRate.push(n);
        }
        this.eventBuff = new RandomEventBase(GameDefine.RANDOM_EVENT_CD, this.onEeventBuff, this);
        this.eventEmoji = new RandomEventBase(GameDefine.EMOJI_EVENT_CD, this.onEeventEmoji, this);
        this.isInit = true;
    };
    RandomEventManager.prototype.getScopeIndex = function (num, randRate) {
        var index = -1;
        var i = 0;
        for (; i < randRate.length; i++) {
            if (randRate[i] >= num) {
                index = i;
                break;
            }
        }
        return index;
    };
    RandomEventManager.prototype.onTime = function () {
        if (!this.isInit)
            return;
        this.eventBuff.onTime();
        this.eventEmoji.onTime();
    };
    RandomEventManager.prototype.onEeventBuff = function () {
        var model;
        var fdata = DataManager.instance.playerM.player.getRandFishEvolution();
        if (fdata) {
            var index = this.getScopeIndex(Tool.rand(1, 10000), this.randRate);
            if (index != -1) {
                model = ModelManager.instance.modelRandEvent[index + 1];
                if (model) {
                    GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_EVOLUTION_EVENT, false, new RandEventParam(fdata.id, index, model));
                }
            }
        }
    };
    RandomEventManager.prototype.onEeventEmoji = function () {
        var rand = Math.floor(Math.random() * 2 + 1);
        for (var i = 0; i < rand; i++) {
            this.onEeventEmojiByTime();
        }
    };
    RandomEventManager.prototype.onEeventEmojiByTime = function () {
        var fdata = DataManager.instance.playerM.player.getRandFishEvolution();
        if (fdata) {
            GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_SHOW_EMOJI_EVENT, false, new RandEventParam(fdata.id, 0, null));
        }
    };
    return RandomEventManager;
}());
__reflect(RandomEventManager.prototype, "RandomEventManager");
var RandEventParam = (function () {
    function RandEventParam(uid, type, model) {
        this.uid = uid;
        this.type = type;
        this.model = model;
    }
    return RandEventParam;
}());
__reflect(RandEventParam.prototype, "RandEventParam");
var RandomEventBase = (function () {
    function RandomEventBase(cd, backFcn, backObj) {
        var param = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            param[_i - 3] = arguments[_i];
        }
        this.CD = cd;
        this.backFcn = backFcn;
        this.backObj = backObj;
        this.param = param;
        this.reset();
    }
    RandomEventBase.prototype.reset = function () {
        this.startTime = egret.getTimer();
    };
    RandomEventBase.prototype.onTime = function () {
        var pass = Math.max(Math.floor((egret.getTimer() - this.startTime) / 1000), 1);
        if (pass >= this.CD) {
            Tool.callback.apply(Tool, [this.backFcn, this.backObj].concat(this.param));
            this.reset();
        }
    };
    return RandomEventBase;
}());
__reflect(RandomEventBase.prototype, "RandomEventBase");
var RANDOM_EVENT_TYPE;
(function (RANDOM_EVENT_TYPE) {
    RANDOM_EVENT_TYPE[RANDOM_EVENT_TYPE["PEACH"] = 0] = "PEACH";
    RANDOM_EVENT_TYPE[RANDOM_EVENT_TYPE["SMILINGFACE"] = 1] = "SMILINGFACE";
})(RANDOM_EVENT_TYPE || (RANDOM_EVENT_TYPE = {}));
//# sourceMappingURL=RandomEventManager.js.map