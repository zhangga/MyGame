class MessageSend {
	private list: Message[];
	public url: string;
	public recvMsg: Message;
	public receive: MessageReceive;
	public constructor() {
		this.list = [];
		this.recvMsg = new Message();
		this.receive = new MessageReceive();
		Tool.addTimer(this.gameRequestTimer, this, 200);
	}
	public gameRequestTimer(dt) {
		if (this.list.length > 0) {
			var message = this.list.shift();
			message.inputData();
			message.setPlayerId(DataManager.instance.playerM.player.id);
			message.setLoginCode(DataManager.instance.playerM.player.loginCode);
			_GF.instance.net.sendMessage(message);
		}
	}
	public addMessage(message: Message) {
		if (this.list.length > 0) {
			var last = this.list[this.list.length - 1];
			if (last && last.getCmdId() == message.getCmdId()) {
				return;
			}
		}
		this.list.push(message);
	}
	public receiveMessage(message: Message): void {
		this.receive.receiveMessage(message);
	}
	public onErrorHandler(message: Message): void {
		


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
	}
}