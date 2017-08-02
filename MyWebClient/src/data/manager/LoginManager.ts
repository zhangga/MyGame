class LoginManager {
	public isPublish: boolean;
	public uid: number;
	public host: string;
	public port: number;
	public severId: number;
	public constructor() {
	}
	public init():void{
		var url = SDKManager.loginInfo.url;
		this.host = url.substring(url.indexOf('://')+3, url.lastIndexOf(":")) ;
		this.port = url.substr(url.lastIndexOf(":") + 1) as any; //字符分割 
	}

	public onSendLoginMessage() {
		var msg: Message = new Message(MESSAGE_ID.GAME_LOGON_MESSAGE);
		msg.setInt(DataManager.instance.channel);//channel
		msg.setString(DataManager.instance.account);//account
		msg.setByte(DataManager.instance.platform);//platform
		_GF.instance.net.onAddMessage(msg);
	}
	public onParseLoginMessage(msg: Message) {
		this.isPublish = msg.getBoolean();
		this.uid = msg.getInt();
		DataManager.instance.playerM.player.id = this.uid;
		this.host = msg.getString();
		this.port = msg.getShort();
		this.severId = msg.getShort();
	}
	public get gameURL() {
		return ChannelDefine.PROTCOL+`://${this.host}:${this.port}`;
	}

	public onSendLoginServMessage() {
		var msg: Message = new Message(MESSAGE_ID.LOGIN_SERVER_MESSAGE);
		msg.setString(DataManager.instance.avatarUrl);
		_GF.instance.net.onAddMessage(msg);
	}

	public onSendCreateMessage(name: string, sex: number = 0) {
		var msg: Message = new Message(MESSAGE_ID.CREATE_ROLE_MESSAGE);
		msg.setInt(DataManager.instance.channel);//channel
		msg.setString(DataManager.instance.account);//account
		msg.setByte(DataManager.instance.platform);//platform
		msg.setString(name);
		msg.setInt(SDKManager.loginInfo.inviter);
		msg.setString(DataManager.instance.avatarUrl);
		_GF.instance.net.onAddMessage(msg);
	}
}