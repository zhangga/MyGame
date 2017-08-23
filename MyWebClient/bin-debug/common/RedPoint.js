var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedPoint = (function (_super) {
    __extends(RedPoint, _super);
    /**
     * 红点信息构造方法
     * systemID  绑定的红点系统ID
     * type    触发类型
     * id      系统ID
     * ...param     参数
    */
    function RedPoint() {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    RedPoint.prototype.register = function (addPointTg, pos, target, func) {
        if (func === void 0) { func = null; }
        var param = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            param[_i - 4] = arguments[_i];
        }
        if (addPointTg) {
            this.addRedPointImg(addPointTg, pos);
        }
        if (target) {
            this.addTriggerFuc.apply(this, [target, func].concat(param));
        }
    };
    RedPoint.prototype.addTriggerFuc = function (target, fuc) {
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            param[_i - 2] = arguments[_i];
        }
        this.target = target;
        this.func = fuc;
        this.param = param;
    };
    RedPoint.prototype.addRedPointImg = function (target, pos) {
        if (!target.getChildByName("redPoint")) {
            this.point = new eui.Image();
            this.point.x = pos.x;
            this.point.y = pos.y;
            this.point.source = "public_redPoint_png";
            this.point.name = "redPoint";
            this.point.touchEnabled = false;
            this.point.visible = false;
            target.addChild(this.point);
        }
        else {
            if (this.point != target.getChildByName("redPoint")) {
                this.point = target.getChildByName("redPoint");
            }
            this.point.x = pos.x;
            this.point.y = pos.y;
            this.point.visible = false;
        }
    };
    /**红点触发函数
     * @param dynamic   是否动态传参
     * @param   param   参数
     * **/
    RedPoint.prototype.checkPoint = function (dynamic) {
        if (dynamic === void 0) { dynamic = false; }
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!this.target)
            return false;
        var bl = false;
        if (dynamic) {
            if (this.target[this.func]) {
                bl = (_a = this.target)[this.func].apply(_a, param);
            }
        }
        else {
            if (this.target[this.func]) {
                bl = (_b = this.target)[this.func].apply(_b, this.param);
            }
        }
        if (this.point) {
            this.point.visible = bl;
        }
        var _a, _b;
    };
    RedPoint.prototype.delRedPoint = function () {
        if (this.point.parent) {
            this.point.parent.removeChild(this.point);
            this.point = null;
        }
    };
    return RedPoint;
}(egret.HashObject));
__reflect(RedPoint.prototype, "RedPoint");
//# sourceMappingURL=RedPoint.js.map