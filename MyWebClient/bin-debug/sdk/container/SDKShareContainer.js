var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SDKShareContainer = (function () {
    function SDKShareContainer() {
    }
    /**
     * 分享信息提示
     */
    SDKShareContainer.prototype.showShareInfo = function (info) {
    };
    /**
     * 分享信息更新
     */
    SDKShareContainer.prototype.updateShareInfo = function (info) {
    };
    ;
    /**
     * 分享完成
     */
    SDKShareContainer.prototype.shareComplete = function () {
        var msg = new Message(MESSAGE_ID.SHARE_REWARD_MESSAGE);
        _GF.instance.net.onAddMessage(msg);
    };
    return SDKShareContainer;
}());
__reflect(SDKShareContainer.prototype, "SDKShareContainer", ["ISDKShareContainer"]);
//# sourceMappingURL=SDKShareContainer.js.map