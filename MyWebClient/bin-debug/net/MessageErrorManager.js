var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MessageErrorManager = (function () {
    function MessageErrorManager() {
        this.requsetFailTimes = 0;
    }
    Object.defineProperty(MessageErrorManager, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new MessageErrorManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    MessageErrorManager.prototype.errorMsgHandler = function (messageID) {
        // var errorID: MESSAGE_ERROR = MESSAGE_ERROR.AGAIN;
        // switch (messageID) {
        // 	/**需要处理掉线提示的**/
        // 	case MESSAGE_ID.GAME_LOGON_MESSAGE:
        // 	case MESSAGE_ID.LOGIN_SERVER_MESSAGE:
        // 	case MESSAGE_ID.CREATE_ROLE_MESSAGE:
        // 	case MESSAGE_ID.ENTER_GAME_MESSAGE:
        // 	case MESSAGE_ID.PLAYER_MESSAGE:
        // 	case MESSAGE_ID.GAME_SYNC_MESSAGE:
        // 		errorID = MESSAGE_ERROR.CLOSE;
        // 		break;
        // }
        var param = new AlertDisconnectParam();
        switch (messageID) {
            case MESSAGE_ID.TIMEOUT_MESSAGE:
                param.state = ALERT_DISCONNECT_STATE.TIMEOUT;
                param.hint = "login_timeout_hint";
                break;
            case MESSAGE_ID.REPEAT_LOGIN_MESSAGE:
                param.state = ALERT_DISCONNECT_STATE.REPEAT;
                param.hint = "login_repeat_hint";
                break;
            case MESSAGE_ID.GAME_TICK_MESSAGE:
                param.state = ALERT_DISCONNECT_STATE.SYNC_ERROR;
                param.hint = "sync_error_hint";
                break;
        }
        GameDispatcher.instance.dispatcherEventWith(GameEvent.OFFLINE_EVENT, false, messageID);
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("AlertDisconnect", param));
        return messageID;
    };
    return MessageErrorManager;
}());
__reflect(MessageErrorManager.prototype, "MessageErrorManager");
//消息失败类型
var MESSAGE_ERROR;
(function (MESSAGE_ERROR) {
    MESSAGE_ERROR[MESSAGE_ERROR["CLOSE"] = 0] = "CLOSE";
    MESSAGE_ERROR[MESSAGE_ERROR["CONUTINE"] = 1] = "CONUTINE";
    MESSAGE_ERROR[MESSAGE_ERROR["AGAIN"] = 2] = "AGAIN";
})(MESSAGE_ERROR || (MESSAGE_ERROR = {}));
//# sourceMappingURL=MessageErrorManager.js.map