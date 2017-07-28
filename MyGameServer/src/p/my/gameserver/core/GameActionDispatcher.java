package p.my.gameserver.core;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import p.my.common.message.Message;
import p.my.common.task.SerialKeyExecutor;
import p.my.gameserver.action.GameActions;

public class GameActionDispatcher {
	
	private static final Logger logger = Logger.getLogger(GameActionDispatcher.class);
	
	private static final SerialKeyExecutor<Integer> protocolExec;
	
	static {
		protocolExec = new SerialKeyExecutor<>(
				new ThreadPoolExecutor(Runtime.getRuntime().availableProcessors()+1, 
						10, 15, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>()));
	}
	
	/**
	 * 分发游戏消息
	 * @param ctx
	 * @param buf
	 */
	public static void dispatch(ChannelHandlerContext ctx, ByteBuf buf) {
		protocolExec.execute(new Runnable() {
			/**
			 * 处理消息
			 */
			@Override
			public void run() {
				try {
					//2 4 4位
					int cmd = buf.readShort();
					int uid = buf.readInt();
					int token = buf.readInt();
					Message req = Message.buildRecvMsg(cmd, ctx, buf);
					GameActions action = GameActions.getAction(cmd);
					if (action == null)
						return;
					action.getAction().action(req, uid, token);
				} catch (Exception e) {
					logger.error(e.getMessage(), e);
				}
			}
		});
	}
	
	public static void submit(int key, Runnable task) {
		protocolExec.submit(key, task);
	}

}
