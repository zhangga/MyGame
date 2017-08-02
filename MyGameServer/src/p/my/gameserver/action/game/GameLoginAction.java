package p.my.gameserver.action.game;

import p.my.common.message.Message;
import p.my.gameserver.action.GameActions;
import p.my.gameserver.constant.ErrorCmd;
import p.my.gameserver.constant.GameConstant;
import p.my.gameserver.core.GameAction;
import p.my.gameserver.data.GameRole;
import p.my.gameserver.game.GameWorld;

/**
 * 登录游戏
 *
 * @author U-Demon Created on 2017年8月2日
 * @version 1.0.0
 */
public class GameLoginAction extends GameAction {

	@Override
	public void doAction(GameRole role, Message req) {
		String headUrl = req.readString();
		GameRole gr = GameWorld.gi().getGameRole(role.getLoginId());
		if (gr != null) {
			//封号
			if (gr.getPlayer().getState() == GameConstant.PLAYER_STATE_FREEZE) {
				Message msg = new Message(GameActions.ERROR.cmd, req.getCtx());
				msg.setShort(ErrorCmd.PLAYER_FREEZE.getId());
				GameWorld.gi().sendMsg(msg);
				return;
			}
			gr.getPlayer().setHead(headUrl);
			//进入游戏
			gr.enterGame(req);
		}
		//创建角色的消息
		else {
			Message msg = new Message(GameActions.CREATE.cmd, req.getCtx());
			GameWorld.gi().sendMsg(msg);
			return;
		}
	}

	@Override
	public boolean doValid(Message req, GameRole role, int token) {
		return true;
	}

}
