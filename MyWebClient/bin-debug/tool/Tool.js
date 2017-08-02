var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tool = (function () {
    function Tool() {
    }
    Tool.log = function (str) {
        if (SDKManager.getChannel() == EChannel.CHANNEL_WYCX) {
            egret.log("log: " + str);
        }
    };
    Tool.callback = function (callback, target) {
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            param[_i - 2] = arguments[_i];
        }
        egret.callLater.apply(egret, [callback, target].concat(param));
    };
    Tool.callbackTime = function (callback, target, time) {
        var param = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            param[_i - 3] = arguments[_i];
        }
        var timeoutKey = -1;
        if (time > 0) {
            var callbackObj = { intervalId: 0, callback: callback, target: target, time: time, args: param };
            var callbackFunc = function (callbackObj) {
                this.callback.apply(this, [callbackObj.callback, callbackObj.target].concat(callbackObj.args));
                egret.clearTimeout(callbackObj.intervalId);
            };
            callbackObj.intervalId = egret.setTimeout(callbackFunc, this, time, callbackObj);
            timeoutKey = callbackObj.intervalId;
        }
        else {
            this.callback.apply(this, [callback, target].concat(param));
        }
        return timeoutKey;
    };
    // public static throwException(logstr = undefined, classz = ExceptionBase) {
    // 	if (logstr) {
    // 		this.log(logstr);
    // 	}
    // 	throw new classz();
    // }
    Tool.addTimer = function (callback, thisObject, time) {
        if (time === void 0) { time = 1000; }
        if (!Tool.timerManager[time.toString()]) {
            var timer = new egret.Timer(time);
            timer.start();
            Tool.timerManager[time.toString()] = timer;
        }
        Tool.callback(callback, thisObject);
        Tool.timerManager[time.toString()].addEventListener(egret.TimerEvent.TIMER, callback, thisObject);
    };
    Tool.removeTimer = function (callback, thisObject, time) {
        if (time === void 0) { time = 1000; }
        if (Tool.timerManager[time.toString()]) {
            Tool.timerManager[time.toString()].removeEventListener(egret.TimerEvent.TIMER, callback, thisObject);
        }
    };
    Tool.throwException = function (logstr, classz) {
        if (logstr === void 0) { logstr = undefined; }
        if (classz === void 0) { classz = ExceptionBase; }
        if (logstr) {
            this.log(logstr);
        }
        throw new classz();
    };
    Tool.rand = function (limit, wave, scale) {
        if (scale === void 0) { scale = 1; }
        return Math.floor(Math.random() * wave + limit) * scale;
    };
    return Tool;
}());
Tool.timerManager = {};
Tool.callbacktimeManager = {};
__reflect(Tool.prototype, "Tool");
var ExceptionBase = (function () {
    function ExceptionBase() {
    }
    return ExceptionBase;
}());
__reflect(ExceptionBase.prototype, "ExceptionBase", ["ExceptionInformation"]);
//# sourceMappingURL=Tool.js.map