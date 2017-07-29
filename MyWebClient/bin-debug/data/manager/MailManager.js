var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MailManager = (function () {
    function MailManager() {
        this._mails = {};
    }
    MailManager.prototype.parseMail = function (msg) {
        var len = msg.getByte();
        for (var i = 0; i < len; i++) {
            this.parseMailNew(msg);
        }
    };
    MailManager.prototype.parseMailRead = function (msg) {
        var id = msg.getString();
        var mail = this.getMailByID(id);
        if (mail) {
            mail.isOpen = true;
        }
    };
    MailManager.prototype.parseMailAccessory = function (msg) {
        var len = msg.getByte();
        var id;
        var mail;
        for (var i = 0; i < len; i++) {
            id = msg.getString();
            mail = this.getMailByID(id);
            if (mail) {
                mail.isReceived = true;
                mail.isOpen = true;
                for (var rIndex = 0; rIndex < mail.accessory.length; rIndex++) {
                    DataManager.instance.playerM.player.updateCurrency(mail.accessory[rIndex].reward, 1);
                }
            }
        }
    };
    MailManager.prototype.parseMailDelete = function (msg) {
        var len = msg.getByte();
        var id;
        var mail;
        for (var i = 0; i < len; i++) {
            id = msg.getString();
            mail = this.getMailByID(id);
            if (mail) {
                mail = null;
                delete this._mails[id];
            }
        }
    };
    MailManager.prototype.parseMailNew = function (msg) {
        var m = new MailData();
        m.parseMail(msg);
        this._mails[m.id] = m;
    };
    MailManager.prototype.sortMail = function () {
        var arr = [];
        for (var key in this._mails) {
            arr.push(this._mails[key]);
        }
        arr = arr.sort(function (n1, n2) {
            if (n1.sort < n2.sort) {
                return -1;
            }
            else if (n1.sort > n2.sort) {
                return 1;
            }
            else {
                if (n1.date > n2.date) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
        });
        return arr;
    };
    MailManager.prototype.getMailByID = function (id) {
        return this._mails[id];
    };
    MailManager.prototype.getMailList = function () {
        return this.sortMail();
    };
    MailManager.prototype.getCanShowMail = function () {
        var base;
        for (var key in this._mails) {
            base = this._mails[key];
            if (!base.isOpen || !base.isReceived) {
                return true;
            }
        }
        return false;
    };
    /**消息发送处理**/
    //通知服务器阅读邮件
    MailManager.prototype.onSendReadMailMsg = function (mailid) {
        var readmailMsg = new Message(MESSAGE_ID.PLAYER_MAIL_READ_MESSAGE);
        readmailMsg.setString(mailid);
        _GF.instance.net.onAddMessage(readmailMsg);
    };
    //通知服务器领取邮件附件
    MailManager.prototype.onSendRewardMailMsg = function (mailid) {
        var reawrdmailMsg = new Message(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE);
        reawrdmailMsg.setString(mailid);
        _GF.instance.net.onAddMessage(reawrdmailMsg);
    };
    //删除邮件
    MailManager.prototype.onSendDeleteMailMsg = function (mailid) {
        var deletemailMsg = new Message(MESSAGE_ID.PLAYER_MAIL_DELETE_MESSAGE);
        deletemailMsg.setString(mailid);
        _GF.instance.net.onAddMessage(deletemailMsg);
    };
    return MailManager;
}());
__reflect(MailManager.prototype, "MailManager");
var MailData = (function () {
    function MailData() {
        this.sort = 0;
        this.isOpen = false;
        this.isReceived = false;
        this.accessory = [];
    }
    MailData.prototype.parseMail = function (msg) {
        var acc;
        this.id = msg.getString();
        this.userId = msg.getInt();
        this.title = msg.getString();
        this.content = msg.getString();
        this.sendTime = msg.getInt();
        this.isOpen = msg.getBoolean();
        this.isReceived = msg.getBoolean();
        var len = msg.getByte();
        for (var i = 0; i < len; i++) {
            acc = new MailAccessoryInfo();
            acc.parseAccessory(msg);
            this.accessory.push(acc);
        }
        if (this.isOpen) {
            this.sort += 1;
        }
        if (this.isReceived) {
            this.sort += 10;
        }
        this.date = new Date(this.sendTime * 1000);
    };
    return MailData;
}());
__reflect(MailData.prototype, "MailData");
var MailAccessoryInfo = (function () {
    function MailAccessoryInfo() {
    }
    MailAccessoryInfo.prototype.parseAccessory = function (msg) {
        this.reward = ModelAward.onParseByParam(msg.getByte(), msg.getInt(), msg.getInt());
    };
    return MailAccessoryInfo;
}());
__reflect(MailAccessoryInfo.prototype, "MailAccessoryInfo");
//# sourceMappingURL=MailManager.js.map