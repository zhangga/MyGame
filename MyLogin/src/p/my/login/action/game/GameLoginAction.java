package p.my.login.action.game;

import org.apache.log4j.Logger;

import p.my.common.message.Message;
import p.my.login.bean.User;
import p.my.login.core.GameAction;

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
		
		long curr = System.currentTimeMillis();
	}

}
