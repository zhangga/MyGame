var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginManager = (function () {
    function LoginManager() {
    }
    LoginManager.prototype.init = function () {
        var url = SDKManager.loginInfo.url;
        this.host = url.substring(url.indexOf('://') + 3, url.lastIndexOf(":"));
        this.port = url.substr(url.lastIndexOf(":") + 1); //字符分割 
    };
    LoginManager.prototype.onSendLoginMessage = function () {
        var msg = new Message(MESSAGE_ID.GAME_LOGON_MESSAGE);
        msg.setInt(DataManager.instance.channel); //channel
        msg.setString(DataManager.instance.account); //account
        msg.setByte(DataManager.instance.platform); //platform
        _GF.instance.net.onAddMessage(msg);
    };
    LoginManager.prototype.onParseLoginMessage = function (msg) {
        this.isPublish = msg.getBoolean();
        this.uid = msg.getInt();
        DataManager.instance.playerM.player.id = this.uid;
        this.host = msg.getString();
        this.port = msg.getShort();
        this.severId = msg.getShort();
    };
    Object.defineProperty(LoginManager.prototype, "gameURL", {
        get: function () {
            return ChannelDefine.PROTCOL + ("://" + this.host + ":" + this.port);
        },
        enumerable: true,
        configurable: true
    });
    LoginManager.prototype.onSendLoginServMessage = function () {
        var msg = new Message(MESSAGE_ID.LOGIN_SERVER_MESSAGE);
        msg.setString(DataManager.instance.avatarUrl);
        _GF.instance.net.onAddMessage(msg);
    };
    LoginManager.prototype.onSendCreateMessage = function (name, sex) {
        if (sex === void 0) { sex = 0; }
        var msg = new Message(MESSAGE_ID.CREATE_ROLE_MESSAGE);
        msg.setInt(DataManager.instance.channel); //channel
        msg.setString(DataManager.instance.account); //account
        msg.setByte(DataManager.instance.platform); //platform
        msg.setString(name);
        msg.setInt(SDKManager.loginInfo.inviter);
        msg.setString(DataManager.instance.avatarUrl);
        _GF.instance.net.onAddMessage(msg);
    };
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
//# sourceMappingURL=LoginManager.js.map