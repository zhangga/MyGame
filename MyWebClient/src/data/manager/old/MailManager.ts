class MailManager {
	private _mails;
	public constructor() {
		this._mails = {};
	}
	public parseMail(msg: Message) {
		var len = msg.getByte();
		for (var i = 0; i < len; i++) {
			this.parseMailNew(msg);
		}
	}
	public parseMailRead(msg: Message) {
		var id = msg.getString();
		var mail: MailData = this.getMailByID(id);
		if (mail) {
			mail.isOpen = true;
		}
	}
	public parseMailAccessory(msg: Message) {
		var len = msg.getByte();
		var id;
		var mail: MailData;
		for (var i = 0; i < len; i++) {
			id = msg.getString();
			mail = this.getMailByID(id);
			if (mail) {
				mail.isReceived = true;
				mail.isOpen = true;
				for (var rIndex: number = 0; rIndex < mail.accessory.length; rIndex++) {
					DataManager.instance.playerM.player.updateCurrency(mail.accessory[rIndex].reward, 1);
				}
			}
		}
	}
	public parseMailDelete(msg: Message): void {
		var len = msg.getByte();
		var id;
		var mail: MailData;
		for (var i = 0; i < len; i++) {
			id = msg.getString();
			mail = this.getMailByID(id);
			if (mail) {
				mail = null;
				delete this._mails[id]
			}
		}
	}
	public parseMailNew(msg: Message) {
		var m: MailData = new MailData();
		m.parseMail(msg);
		this._mails[m.id] = m;
	}
	private sortMail() {
		var arr: MailData[] = [];
		for (var key in this._mails) {
			arr.push(this._mails[key]);
		}
		arr = arr.sort((n1, n2) => {
			if (n1.sort < n2.sort) {
				return -1;
			} else if (n1.sort > n2.sort) {
				return 1;
			} else {
				if (n1.date > n2.date) {
					return -1;
				} else {
					return 1;
				}
			}
		});
		return arr;
	}
	public getMailByID(id) {
		return this._mails[id];
	}
	public getMailList() {
		return this.sortMail();
	}
	public getCanShowMail(): boolean {
		var base: MailData;
		for (var key in this._mails) {
			base = this._mails[key];
			if (!base.isOpen || !base.isReceived) {
				return true;
			}
		}
		return false;
	}
	/**消息发送处理**/
	//通知服务器阅读邮件
	public onSendReadMailMsg(mailid: string): void {
		var readmailMsg: Message = new Message(MESSAGE_ID.PLAYER_MAIL_READ_MESSAGE);
		readmailMsg.setString(mailid);
		_GF.instance.net.onAddMessage(readmailMsg);
	}
	//通知服务器领取邮件附件
	public onSendRewardMailMsg(mailid: string): void {
		var reawrdmailMsg: Message = new Message(MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE);
		reawrdmailMsg.setString(mailid);
		_GF.instance.net.onAddMessage(reawrdmailMsg);
	}
	//删除邮件
	public onSendDeleteMailMsg(mailid: string): void {
		var deletemailMsg: Message = new Message(MESSAGE_ID.PLAYER_MAIL_DELETE_MESSAGE);
		deletemailMsg.setString(mailid);
		_GF.instance.net.onAddMessage(deletemailMsg);
	}
}
class MailData {
	public id;
	public sort: number = 0;
	public userId;//发件人id
	public sendTime;
	public date: Date;
	public title;
	public content;
	public isOpen: boolean = false;
	public isReceived: boolean = false;
	public accessory: MailAccessoryInfo[] = [];

	public constructor() {
	}
	public parseMail(msg: Message) {
		var acc: MailAccessoryInfo;
		this.id = msg.getString();
		this.userId = msg.getInt();
		this.title = msg.getString();
		this.content = msg.getString();
		this.sendTime = msg.getInt();
		this.isOpen = msg.getBoolean();
		this.isReceived = msg.getBoolean();
		var len: number = msg.getByte();
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
	}
}
class MailAccessoryInfo {
	public reward: ModelAward;
	public constructor() {
	}
	public parseAccessory(msg: Message) {
		this.reward = ModelAward.onParseByParam(msg.getByte(), msg.getInt(), msg.getInt());
	}
}