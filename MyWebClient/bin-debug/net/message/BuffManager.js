var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BuffManager = (function () {
    function BuffManager() {
        this.addPercent = UnitDefine.BASE_PERCENTAGE;
        this.hasTime = 0;
        this.hasBuff = false;
    }
    BuffManager.prototype.onParseMessage = function (msg) {
        this.addPercent = msg.getInt();
        this.addPercent = Math.abs(this.addPercent) * 100;
        this.totalTime = msg.getInt();
        this.remainTime = msg.getInt();
        this.currTime = egret.getTimer();
    };
    BuffManager.prototype.onStart = function () {
        if (this.remainTime > 0) {
            this.hasBuff = true;
            this.hasTime = this.remainTime;
            GameDispatcher.instance.dispatcherEventWith(GameEvent.ADD_OR_DEL_BUFF_EVENT, false, Buff_STATE_TYPE.ADD);
        }
        else {
            GameDispatcher.instance.dispatcherEventWith(GameEvent.ADD_OR_DEL_BUFF_EVENT, false, Buff_STATE_TYPE.DEL);
        }
    };
    BuffManager.prototype.onTime = function () {
        if (!this.hasBuff)
            return;
        var pass = Math.max(Math.floor((egret.getTimer() - this.currTime) / 1000), 1);
        this.hasTime = this.remainTime - pass;
        if (this.hasTime < 0) {
            this.hasTime = 0;
        }
        if (pass >= this.remainTime) {
            this.onDelBuff();
        }
    };
    BuffManager.prototype.onDelBuff = function () {
        this.addPercent = UnitDefine.BASE_PERCENTAGE;
        this.remainTime = 0;
        this.hasBuff = false;
        GameDispatcher.instance.dispatcherEventWith(GameEvent.ADD_OR_DEL_BUFF_EVENT, false, Buff_STATE_TYPE.DEL);
    };
    return BuffManager;
}());
__reflect(BuffManager.prototype, "BuffManager");
var Buff_STATE_TYPE;
(function (Buff_STATE_TYPE) {
    Buff_STATE_TYPE[Buff_STATE_TYPE["ADD"] = 0] = "ADD";
    Buff_STATE_TYPE[Buff_STATE_TYPE["DEL"] = 1] = "DEL";
})(Buff_STATE_TYPE || (Buff_STATE_TYPE = {}));
//# sourceMappingURL=BuffManager.js.map