var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bubble = (function (_super) {
    __extends(Bubble, _super);
    function Bubble() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //添加到舞台
    Bubble.prototype.onAddToStage = function () {
        // this.onInit();
    };
    Bubble.prototype.onInit = function () {
        this.res = "paopao_1";
        this._bubble = new Animation("paopao_1");
        this.imgLayer = new eui.Group();
        this.imgLayer.horizontalCenter = 0;
        this.imgLayer.verticalCenter = 0;
        this.imgLayer.addChild(this._bubble);
        this.addChild(this.imgLayer);
    };
    Bubble.prototype.onReSetRes = function (res, pos, size) {
        if (pos === void 0) { pos = new egret.Point(); }
        if (size === void 0) { size = 1; }
        if (res == this.res)
            return;
        if (!this._bubble) {
            this.onInit();
        }
        this.res = res;
        this._bubble.onUpdateRes(res);
        this._bubble.x = pos.x;
        this._bubble.y = pos.y;
        this._bubble.scaleX = this._bubble.scaleY = size;
    };
    Bubble.prototype.onDestroy = function () {
        if (this._bubble) {
            this._bubble.onDestroy();
            this._bubble = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return Bubble;
}(egret.Sprite));
__reflect(Bubble.prototype, "Bubble");
//# sourceMappingURL=Bubble.js.map