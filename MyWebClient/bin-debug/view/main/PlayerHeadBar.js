var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerHeadBar = (function (_super) {
    __extends(PlayerHeadBar, _super);
    function PlayerHeadBar() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PlayerHeadBar.prototype, "headIcon", {
        set: function (param) {
            if (this.head_icon_img) {
                param.registCallBack(this.onLoadComplete, this);
                LoadManager.getInstance().onAddHeadUrl(param);
            }
        },
        enumerable: true,
        configurable: true
    });
    PlayerHeadBar.prototype.onLoadComplete = function (data) {
        if (data) {
            this.head_icon_img.source = data;
        }
        else {
            this.head_icon_img.source = "invite_vacancy_icon_png";
        }
    };
    return PlayerHeadBar;
}(eui.Component));
__reflect(PlayerHeadBar.prototype, "PlayerHeadBar");
var PlayerHeadParam = (function () {
    function PlayerHeadParam(userId, headUrl) {
        this.headUrl = headUrl;
        this.userId = userId;
    }
    PlayerHeadParam.prototype.registCallBack = function (callbackFunc, thisObject) {
        if (callbackFunc === void 0) { callbackFunc = null; }
        if (thisObject === void 0) { thisObject = null; }
        this.callbackFunc = callbackFunc;
        this.thisObject = thisObject;
    };
    PlayerHeadParam.prototype.callback = function (param) {
        Tool.callback(this.callbackFunc, this.thisObject, param);
    };
    return PlayerHeadParam;
}());
__reflect(PlayerHeadParam.prototype, "PlayerHeadParam");
//# sourceMappingURL=PlayerHeadBar.js.map