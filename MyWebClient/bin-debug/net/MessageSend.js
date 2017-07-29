var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MessageSend = (function () {
    function MessageSend() {
        this.list = [];
        this.recvMsg = new Message();
        this.receive = new MessageReceive();
        Tool.addTimer(this.gameRequestTimer, this, 200);
    }
    MessageSend.prototype.gameRequestTimer = function (dt) {
        if (this.list.length > 0) {
            var message = this.list.shift();
            message.inputData();
            message.setPlayerId(DataManager.instance.playerM.player.id);
            message.setLoginCode(DataManager.instance.playerM.player.loginCode);
            _GF.instance.net.sendMessage(message);
        }
    };
    MessageSend.prototype.addMessage = function (message) {
        if (this.list.length > 0) {
            var last = this.list[this.list.length - 1];
            if (last && last.getCmdId() == message.getCmdId()) {
                return;
            }
        }
        this.list.push(message);
    };
    MessageSend.prototype.receiveMessage = function (message) {
        this.receive.receiveMessage(message);
    };
    MessageSend.prototype.onErrorHandler = function (message) {
        // var msg_error: MESSAGE_ERROR = MessageErrorManager.instance.errorMsgHandler(message.getCmdId());
        // if (msg_error == MESSAGE_ERROR.CLOSE) {
        //     this.setAlertDisconnect(TextDefine.ALERT_DISCONNECT_1);
        // } else if (msg_error == MESSAGE_ERROR.AGAIN) {
        //     if (MessageErrorManager.getInstance().requsetFailTimes >= GameDefine.MASSAGE_FAIL_MAX) {
        //         this.setAlertDisconnect(TextDefine.ALERT_DISCONNECT_1);
        //     } else {
        //         MessageErrorManager.getInstance().requsetFailTimes++;
        //         this.addMessage(message);
        //     }
        // }
        // message = null;
    };
    return MessageSend;
}());
__reflect(MessageSend.prototype, "MessageSend");
//# sourceMappingURL=MessageSend.js.map