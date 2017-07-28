package p.my.gameserver.manager;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

import org.apache.log4j.Logger;

import io.netty.channel.ChannelHandlerContext;
import p.my.common.message.Message;
import p.my.common.message.MessageArray;
import p.my.common.util.HttpUtil;
import p.my.gameserver.action.GameActions;
import p.my.gameserver.constant.ErrorCmd;
import p.my.gameserver.data.GameRole;

/**
 * 消息管理器
 *
 * @author U-Demon Created on 2017年7月28日
 * @version 1.0.0
 */
public class MsgManager {
	
	private static final Logger logger = Logger.getLogger(MsgManager.class);
	
	@SuppressWarnings("unused")
	private GameRole role;
	
	//缓存的消息队列
	private BlockingQueue<Message> queue = new ArrayBlockingQueue<>(50);
	
	public MsgManager(GameRole role) {
		this.role = role;
	}
	
	/**
	 * 即时发送消息
	 * @param msg
	 */
	public void sendMsg(Message msg) {
		MessageArray msgs = new MessageArray(msg);
		put2MsgArray(msgs);
		msgs.pack();
		HttpUtil.sendResponse(msgs.getCtx(), msgs.getBuf());
	}
	
	/**
	 * 即时发送消息
	 * @param ctx
	 */
	public void sendTick(ChannelHandlerContext ctx) {
		MessageArray msgs = new MessageArray(ctx);
		put2MsgArray(msgs);
		msgs.pack();
		HttpUtil.sendResponse(msgs.getCtx(), msgs.getBuf());
	}
	
	/**
	 * 将消息放入队列，等待下次连接发送
	 * @param msg
	 */
	public void putMsgQueue(Message msg) {
		put(msg);
	}
	
	public void sendErrorMsg(ChannelHandlerContext ctx, ErrorCmd errorCmd) {
		Message msg = new Message(GameActions.ERROR.cmd, ctx);
		msg.setShort(errorCmd.getId());
		this.sendMsg(msg);
	}
	
	public void putErrorMsg(ErrorCmd errorCmd) {
		Message msg = new Message(GameActions.ERROR.cmd);
		msg.setShort(errorCmd.getId());
		this.putMsgQueue(msg);
	}
	
	private void put(Message msg) {
		try {
			this.queue.put(msg);
		} catch (InterruptedException e) {
			logger.error("放入消息队列发生异常", e);
		}
	}
	
	private void put2MsgArray(MessageArray msgs){
		while (true) {
			Message msg = queue.poll();
			if (msg == null)
				break;
			msgs.addMsg(msg);
		}
	}
	
}
