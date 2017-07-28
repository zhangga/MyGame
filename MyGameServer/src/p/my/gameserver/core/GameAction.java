package p.my.gameserver.core;

import p.my.common.message.Message;
import p.my.gameserver.constant.ErrorCmd;
import p.my.gameserver.data.GameRole;

/**
 * 这个Action主要的操作是将传递过来的byte[]转换成消息对象。 具体的实现执行具体的逻辑
 *
 * @author U-Demon Created on 2016年9月30日 下午5:36:34
 * @version 1.0.0
 */
public abstract class GameAction
{
	
	/**
	 * 指令编号
	 */
	private int cmd;
	
	/**
	 * 提供给Handler进行调用的action
	 * @param req
	 */
	public void action(Message req, int uid, int token)
	{
		if (!doValid(req, uid, token))
			return;
		doAction(null, req);
	}
	
	/**
	 * 有效性检查
	 * @param req
	 * @param uid
	 * @param token
	 * @return
	 */
	public boolean doValid(Message req, int uid, int token) {
		GameRole role = null;
		//判断token，持有过期token的玩家将被踢下线
		if (role.getToken() != token) {
			role.getMsgMgr().sendErrorMsg(req.getCtx(), ErrorCmd.TOKEN_EXPIRE);
			return false;
		}
		return true;
	}
	
	/**
	 * 具体子类实现逻辑
	 * 
	 * @param user
	 * @param request
	 */
	public abstract void doAction(GameRole role, Message req);
	
	public int getCmd() {
		return cmd;
	}

	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

}
