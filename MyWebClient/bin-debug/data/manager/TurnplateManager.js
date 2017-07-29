var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TurnplateManager = (function () {
    function TurnplateManager() {
        /**转盘体力恢复时间**/
        this._reciveTime = 0; //转盘体力恢复剩余时间
    }
    //解析转盘协议
    TurnplateManager.prototype.onPasreLotteryMsg = function (msg) {
        this.lotteryId = msg.getByte();
        this.param = new TurnplaterResultParam(this.lotteryId);
        this.param.onParseMessage(msg);
    };
    //解析体力同步消息
    TurnplateManager.prototype.onParseRecivePowerMsg = function (msg) {
        var _powerNum = msg.getInt();
        var _reciveTime = msg.getInt();
        this.reciveTime = _reciveTime;
        DataManager.instance.playerM.player.fishfood = _powerNum;
    };
    //发送体力恢复同步消息
    TurnplateManager.prototype.onSendPowerReciveMsg = function () {
        var reciveMsg = new Message(MESSAGE_ID.FISH_FOOD_RECIVE_MSG);
        _GF.instance.net.onAddMessage(reciveMsg);
    };
    Object.defineProperty(TurnplateManager.prototype, "reciveTime", {
        get: function () {
            return Math.max(0, Math.ceil((this._reciveTime - egret.getTimer()) / 1000));
        },
        set: function (sec) {
            this._reciveTime = sec > 0 ? sec * 1000 + egret.getTimer() : 0;
        },
        enumerable: true,
        configurable: true
    });
    //转盘抽奖结束
    TurnplateManager.prototype.onCompleteLottery = function () {
        if (this.param.model.effectId > 0) {
            this.onLotteryEffect();
        }
        else {
            if (!this.param.model.reward)
                return;
            var player = DataManager.instance.playerM.player;
            switch (this.param.model.reward.type) {
                case GOODS_TYPE.DIAMOND:
                    player.addDiamondAndUpgrade(this.param.model.reward.num);
                    this.param.reward = new InfiniteNumber(this.param.model.reward);
                    var anim = GameCommon.instance.addAnimation(_GF.instance.scene.promptLayer, "zuanshitexiao", new egret.Point(300, 533), 1, true);
                    anim.playFinishCallBack(function (param) {
                        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("TurnplaterResultAlert", param));
                    }, this, this.param);
                    SoundFactory.playSound(SoundDefine.SOUND_GIAN_DIAMOND);
                    break;
            }
        }
    };
    //装盘效果处理
    TurnplateManager.prototype.onLotteryEffect = function () {
        var player = DataManager.instance.playerM.player;
        if (this.param.effectModel) {
            switch (this.param.effectModel.type) {
                case LOTTERY_EFFECT.ADD_GOLD:
                    var animRes = this.param.model.effectId == 1 ? "xiaojinbi" : "dajinbi";
                    var anim = GameCommon.instance.addAnimation(_GF.instance.scene.promptLayer, animRes, new egret.Point(300, 533), 1, true);
                    anim.playFinishCallBack(function (param) {
                        player.addGoldAndOpenSync(param.reward);
                        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("TurnplaterResultAlert", param));
                    }, this, this.param);
                    SoundFactory.playSound(SoundDefine.SOUND_GAIN_GOLD);
                    break;
                case LOTTERY_EFFECT.DECLINE:
                case LOTTERY_EFFECT.PROMOTE:
                    DataManager.instance.buff.onStart();
                    GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("TurnplaterResultAlert", this.param));
                    if (this.param.effectModel.type == LOTTERY_EFFECT.DECLINE) {
                        SoundFactory.playSound(SoundDefine.SOUND_TURNPLATE_SLOW_SPEED);
                    }
                    else {
                        SoundFactory.playSound(SoundDefine.SOUND_TURNPLATE_ADD_SPEED);
                    }
                    DataManager.instance.syncM.onOpenSync();
                    break;
                default:
                    GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("TurnplaterResultAlert", this.param));
                    DataManager.instance.syncM.onOpenSync();
                    break;
            }
        }
    };
    return TurnplateManager;
}());
__reflect(TurnplateManager.prototype, "TurnplateManager");
var LOTTERY_EFFECT;
(function (LOTTERY_EFFECT) {
    LOTTERY_EFFECT[LOTTERY_EFFECT["ADD_GOLD"] = 1] = "ADD_GOLD";
    LOTTERY_EFFECT[LOTTERY_EFFECT["POLLUTE"] = 2] = "POLLUTE";
    LOTTERY_EFFECT[LOTTERY_EFFECT["PILFERGE"] = 3] = "PILFERGE";
    LOTTERY_EFFECT[LOTTERY_EFFECT["DECLINE"] = 4] = "DECLINE";
    LOTTERY_EFFECT[LOTTERY_EFFECT["PROMOTE"] = 5] = "PROMOTE";
    LOTTERY_EFFECT[LOTTERY_EFFECT["CLEAR"] = 6] = "CLEAR";
})(LOTTERY_EFFECT || (LOTTERY_EFFECT = {}));
//# sourceMappingURL=TurnplateManager.js.map