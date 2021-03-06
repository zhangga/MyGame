package p.my.gameserver.manager;

import io.netty.channel.ChannelHandlerContext;
import p.my.common.message.Message;
import p.my.common.message.MessageArray;
import p.my.gameserver.action.GameActions;
import p.my.gameserver.data.GameRole;
import p.my.gameserver.data.Player;

public class FunctionManager {
	
	private GameRole role;
	
	private Player player;
	
	public FunctionManager(GameRole role) {
		this.role = role;
		this.player = role.getPlayer();
	}
	
	/**
	 * 获得登录消息
	 * @param ctx
	 * @return
	 */
	public MessageArray getLoginMsgs(ChannelHandlerContext ctx) {
		MessageArray msgs = new MessageArray(ctx);
		//TODO 各种登录消息
		//进入游戏
		Message loginMsg = new Message(GameActions.LOGIN.cmd);
		loginMsg.setInt(role.getToken());
		msgs.addMsg(loginMsg);
        return msgs;
	}

}
