package p.my.login.core;

import p.my.common.message.Message;
import p.my.common.util.HttpUtil;
import p.my.login.bean.User;

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
		doAction(null, req);
	}
	
	/**
	 * 具体子类实现逻辑
	 * 
	 * @param user
	 * @param request
	 */
	public abstract void doAction(User user, Message req);
	
	/**
	 * 供子类调用，向客户端回写消息
	 * @param resp
	 */
	protected void sendMsg(Message resp)
	{
		HttpUtil.sendResponse(resp.getCtx(), resp.getBuf());
	}
	
	protected void putMsgQueue(Message resp)
	{
		HttpUtil.sendResponse(resp.getCtx(), resp.getBuf());
	}

	public int getCmd() {
		return cmd;
	}

	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

}
