var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LevelUpHint = (function (_super) {
    __extends(LevelUpHint, _super);
    // private img_icon: eui.Image;
    // private bmLab_add: eui.BitmapLabel;
    // private _data: ModelAward;
    // private value: number = 0;
    function LevelUpHint() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        _this.skinName = skins.LevelUpHintSkin;
        return _this;
    }
    LevelUpHint.prototype.onLoadComplete = function () {
        this.onInit();
    };
    // public set data(param: ModelAward) {
    // 	this._data = param;
    // 	this.onInit();
    // }
    LevelUpHint.prototype.onInit = function () {
    };
    LevelUpHint.prototype.onDestory = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return LevelUpHint;
}(eui.Component));
__reflect(LevelUpHint.prototype, "LevelUpHint", ["IModule"]);
//# sourceMappingURL=LevelUpHint.js.map