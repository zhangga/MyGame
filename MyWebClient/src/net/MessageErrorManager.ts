class MessageErrorManager {
	private static _instance: MessageErrorManager;
	public requsetFailTimes: number = 0;

	public constructor() {
	}
	public static get instance(): MessageErrorManager {
		if (!this._instance) {
			this._instance = new MessageErrorManager();
		}
		return this._instance;
	}

	public errorMsgHandler(messageID: number): number {
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
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false,
			new WindowParam("AlertDisconnect", param)
		);
		return messageID;
	}
	//The end
}
//消息失败类型
enum MESSAGE_ERROR {
	CLOSE = 0,//断线重新连接
	CONUTINE = 1,//无处理忽视
	AGAIN = 2,//需要重新请求
}