var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseComp = (function (_super) {
    __extends(BaseComp, _super);
    function BaseComp() {
        var _this = _super.call(this) || this;
        _this.isLoaded = false;
        return _this;
    }
    BaseComp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onLoadComplete();
    };
    BaseComp.prototype.onLoadComplete = function () {
        this.isLoaded = true;
        if (this._data) {
            this.onInit();
        }
    };
    Object.defineProperty(BaseComp.prototype, "data", {
        set: function (source) {
            this._data = source;
            if (this.isLoaded) {
                this.onInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseComp.prototype.onInit = function () {
    };
    return BaseComp;
}(eui.Component));
__reflect(BaseComp.prototype, "BaseComp", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BaseComp.js.map