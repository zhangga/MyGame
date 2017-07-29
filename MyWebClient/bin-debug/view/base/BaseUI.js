var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.onLoadComplete, _this);
        return _this;
    }
    //皮肤加载完成
    BaseUI.prototype.onLoadComplete = function () {
        this.onInit();
        this.onRegist();
    };
    //供子类覆盖
    BaseUI.prototype.onInit = function () {
    };
    BaseUI.prototype.onRegist = function () {
    };
    BaseUI.prototype.onRemove = function () {
    };
    BaseUI.prototype.onDestory = function () {
        this.onRemove();
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI");
//# sourceMappingURL=BaseUI.js.map