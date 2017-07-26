package p.my.login.action.game;

import org.apache.log4j.Logger;

import p.my.common.message.Message;
import p.my.login.action.GameActions;
import p.my.login.bean.User;
import p.my.login.constant.LoginConfig;
import p.my.login.core.GameAction;
import p.my.login.game.GameWorld;

/**
 * 登陆
 *
 * @author U-Demon Created on 2017年7月14日
 * @version 1.0.0
 */
public class GameLoginAction extends GameAction {
	
	private static final Logger logger = Logger.getLogger(GameLoginAction.class);

	@Override
	public void doAction(User user, Message req) {
		int channel = req.readInt();
		String account = req.readString();
		byte platform = req.readByte();
		logger.info("channel="+channel+", user="+account+" login...");
		
		//选择服务器策略，只在测试环境生效
		int selectId = 0;
		if (!LoginConfig.isPUBLISH()) {
			int index = account.lastIndexOf("#");
			if (index >= 0) {
				selectId = Integer.valueOf(account.substring(index+1));
				account = account.substring(0, index);
			}
		}
		
		User puser = new User();
		puser.setChannel(channel);
		puser.setAccount(account);
		puser.setPlatform(platform);
		User ruser = GameWorld.gi().getAndCreateUser(puser);
		
		Message msg = new Message(GameActions.LOGIN.cmd, req.getCtx());
		msg.setBool(LoginConfig.isPUBLISH());
		msg.setInt(ruser.getId());
		sendMsg(msg);
	}

}
