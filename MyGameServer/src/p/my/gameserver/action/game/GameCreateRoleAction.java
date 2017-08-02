package p.my.gameserver.action.game;

import p.my.common.message.Message;
import p.my.gameserver.action.GameActions;
import p.my.gameserver.constant.ErrorCmd;
import p.my.gameserver.constant.GameConstant;
import p.my.gameserver.core.GameAction;
import p.my.gameserver.data.GameRole;
import p.my.gameserver.data.Player;
import p.my.gameserver.game.GameWorld;
import p.my.gameserver.service.GameCommon;

/**
 * 创建角色
 *
 * @author U-Demon Created on 2017年8月2日
 * @version 1.0.0
 */
public class GameCreateRoleAction extends GameAction {

	@Override
	public void doAction(GameRole role, Message req) {
		int channel = req.readInt();
		String account = req.readString();
		byte platform = req.readByte();
		String name = req.readString();
		int inviter = req.readInt();
		String head = req.readString();
		
		//替换特殊字符
		name = GameCommon.replaceReservedWord(name, GameConstant.PLAYER_NAME_MAX);
		
		GameRole gr = GameWorld.gi().getGameRole(role.getLoginId());
		//已有角色
		if (gr != null) {
			Message msg = new Message(GameActions.ERROR.cmd, req.getCtx());
			msg.setShort(ErrorCmd.PLAYER_EXIST.getId());
			GameWorld.gi().sendMsg(msg);
			return;
		}
		
		//创建角色
		Player player = new Player();
		player.setId(role.getLoginId());
		player.setChannel(channel);
		player.setAccount(account);
		player.setPlatform(platform);
		player.setName(name);
		player.setHead(head);
		player.setInviter(inviter);
		gr = new GameRole(player);
		gr.init();
		
		//保存数据
		if (!gr.save()) {
			Message msg = new Message(GameActions.ERROR.cmd, req.getCtx());
			msg.setShort(ErrorCmd.OPERATION_FAILED.getId());
			GameWorld.gi().sendMsg(msg);
			return;
		}
		
		//进入游戏
		gr.enterGame(req);
	}

	@Override
	public boolean doValid(Message req, GameRole role, int token) {
		return true;
	}

}
