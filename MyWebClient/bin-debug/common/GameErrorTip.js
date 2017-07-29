var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GameErrorTip = (function () {
    function GameErrorTip() {
    }
    GameErrorTip.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameErrorTip();
        }
        return this.instance;
    };
    GameErrorTip.prototype.getGameErrorTip = function (errorCode) {
        return Language.instance.getDescByKey("error_tips" + errorCode);
    };
    return GameErrorTip;
}());
GameErrorTip.ERROR_ID_ARENA_CHANGE = 62;
__reflect(GameErrorTip.prototype, "GameErrorTip");
//# sourceMappingURL=GameErrorTip.js.map