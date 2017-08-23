var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RandEevent = (function () {
    function RandEevent() {
        this.needCheck = false;
        this.isTrigger = false;
    }
    RandEevent.prototype.reset = function (remainTime) {
        this.startTime = egret.getTimer();
        this.remainTime = remainTime;
        this.needCheck = this.remainTime != -1;
        this.isTrigger = false;
    };
    RandEevent.prototype.check = function () {
        if (this.needCheck) {
            var pass = Math.max(Math.floor((egret.getTimer() - this.startTime) / 1000), 1);
            if (pass >= this.remainTime) {
                this.isTrigger = true;
            }
            return this.isTrigger;
        }
        else {
            return this.needCheck;
        }
    };
    return RandEevent;
}());
__reflect(RandEevent.prototype, "RandEevent");
//# sourceMappingURL=RandEevent.js.map