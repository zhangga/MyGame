package p.my.login.action.game;

import p.my.common.message.Message;
import p.my.login.bean.User;
import p.my.login.core.GameAction;

public class GameTestAction extends GameAction {

	@Override
	public void doAction(User user, Message req) {
		System.out.println(req.getBuf().readInt());
		System.out.println(req.getBuf().readByte());
		Message msg = new Message(0, req.getCtx());
		msg.getBuf().setByte(0, 9);
		msg.getBuf().setInt(1, 99);
		sendMsg(msg);
	}

}
