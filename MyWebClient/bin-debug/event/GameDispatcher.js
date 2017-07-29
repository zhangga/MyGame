var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDispatcher = (function () {
    function GameDispatcher() {
        this._eventDispatcher = null;
        this._eventDispatcher = new egret.EventDispatcher();
    }
    Object.defineProperty(GameDispatcher, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GameDispatcher();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDispatcher.prototype, "eventDispatcher", {
        get: function () {
            return this._eventDispatcher;
        },
        enumerable: true,
        configurable: true
    });
    GameDispatcher.prototype.dispatcherEventWith = function (type, bubbles, data, cancelable) {
        return this.eventDispatcher.dispatchEventWith(type, bubbles, data, cancelable);
    };
    GameDispatcher.prototype.hasEventListener = function (eventType) {
        return (this.eventDispatcher.hasEventListener(eventType));
    };
    GameDispatcher.prototype.willTrigger = function (eventType) {
        return (this.eventDispatcher.willTrigger(eventType));
    };
    GameDispatcher.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        this.eventDispatcher.removeEventListener(type, listener, thisObject, useCapture);
    };
    GameDispatcher.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        this.eventDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    };
    return GameDispatcher;
}());
GameDispatcher._instance = null;
__reflect(GameDispatcher.prototype, "GameDispatcher");
//# sourceMappingURL=GameDispatcher.js.map