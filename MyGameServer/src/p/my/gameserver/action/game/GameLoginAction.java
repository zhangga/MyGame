package p.my.gameserver.action.game;

import p.my.common.message.Message;
import p.my.gameserver.core.GameAction;
import p.my.gameserver.data.GameRole;

public class GameLoginAction extends GameAction {

	@Override
	public void doAction(GameRole role, Message req) {
		
	}

	@Override
	public boolean doValid(Message req, GameRole role, int token) {
		return true;
	}

}
