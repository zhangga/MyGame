package p.my.gameserver.game;

import p.my.common.message.Message;
import p.my.common.util.HttpUtil;

public class GameWorld {
	
	private static final GameWorld instance = new GameWorld();
	private GameWorld() {}
	public static GameWorld gi() {
		return instance;
	}
	
	public void init() {
		
	}
	
	/**
	 * 发送消息
	 * @param msg
	 */
	public void sendMsg(Message msg) {
		HttpUtil.sendResponse(msg.getCtx(), msg.getBuf());
	}

}
