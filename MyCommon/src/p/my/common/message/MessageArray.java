package p.my.common.message;

import java.util.ArrayList;
import java.util.List;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;

/**
 * 消息集合
 *
 * @author U-Demon Created on 2017年7月11日
 * @version 1.0.0
 */
public class MessageArray {
	
	private ByteBuf buf = null;
	
	/** 消息集合*/
	private List<Message> msgList;
	
	/** 链接通道*/
	private ChannelHandlerContext ctx;
	
	public MessageArray(ChannelHandlerContext ctx) {
		this.buf = Unpooled.buffer(1024);
		this.msgList = new ArrayList<Message>();
		this.ctx = ctx;
	}
	
	public MessageArray(Message msg) {
		this.buf = Unpooled.buffer(1024);
		this.msgList = new ArrayList<Message>();
		this.ctx = msg.getCtx();
		this.msgList.add(msg);
	}
	
	public void addMsg(Message msg) {
		msgList.add(msg);
	}

	public void pack() {
		int size = msgList.size();
		buf.clear();
		buf.writeByte(size);
		for (int i = 0; i < size; ++i) {
			Message msg = msgList.get(i);
			msg.pack();
			buf.writeBytes(msg.toArray());
		}
	}

	public ByteBuf getBuf() {
		return buf;
	}

	public ChannelHandlerContext getCtx() {
		return ctx;
	}
	
}
