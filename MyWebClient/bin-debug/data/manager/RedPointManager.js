var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 红点管理
 * @author	lzn
 *
 *
*/
var RedPointManager = (function () {
    function RedPointManager() {
        this.redPoints = {};
    }
    RedPointManager.createPoint = function (param) {
        var points = [];
        var point;
        for (var i = 0; i < param; i++) {
            point = new RedPoint();
            points.push(point);
        }
        return points;
    };
    RedPointManager.prototype.onTimer = function () {
    };
    RedPointManager.prototype.test = function (cmdID) {
        switch (cmdID) {
        }
    };
    return RedPointManager;
}());
__reflect(RedPointManager.prototype, "RedPointManager");
var RedPointTrigger = (function () {
    function RedPointTrigger(systemID, redpoint_type) {
        if (redpoint_type === void 0) { redpoint_type = -1; }
        this.systemID = systemID;
        this.redpoint_type = redpoint_type;
    }
    return RedPointTrigger;
}());
__reflect(RedPointTrigger.prototype, "RedPointTrigger");
//# sourceMappingURL=RedPointManager.js.map