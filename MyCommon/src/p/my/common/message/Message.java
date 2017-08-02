package p.my.common.message;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import p.my.common.util.StringUtil;

/**
 * 游戏消息
 *
 * @author U-Demon Created on 2017年7月11日
 * @version 1.0.0
 */
public class Message {
	
	/** 消息id*/
	private int cmd;
	
	/** 消息长度*/
	private int size;
	
	private ChannelHandlerContext ctx;
	
	private ByteBuf buf;
	
	/**
	 * 构造一个发送的消息
	 * @param cmd
	 * @param ctx
	 */
	public Message(int cmd, ChannelHandlerContext ctx) {
		this.buf = Unpooled.buffer(1024);
		//占位长度
		this.buf.writeInt(0);
		//占位消息号
		this.buf.writeShort(0);
		this.cmd = cmd;
		this.ctx = ctx;
	}
	
	/**
	 * 构造一个发送的消息，无ctx，不能直接发送，可以放入消息队列
	 * @param cmd
	 */
	public Message(int cmd) {
		this.buf = Unpooled.buffer(1024);
		//占位长度
		this.buf.writeInt(0);
		//占位消息号
		this.buf.writeShort(0);
		this.cmd = cmd;
	}
	
	public static Message buildRecvMsg(int cmd, ChannelHandlerContext ctx, ByteBuf buf) {
		Message msg = new Message(cmd, ctx);
		msg.cmd = cmd;
		msg.ctx = ctx;
		msg.buf = buf;
		return msg;
	}
	
	public void setBool(boolean value) {
		if (value)
			buf.writeByte(1);
		else
			buf.writeByte(0);
	}
	
	public boolean readBool() {
    	return buf.readByte() > 0;
    }
	
	public void setByte(int value) {
    	buf.writeByte(value);
    }
    
    public byte readByte() {
    	return buf.readByte();
    }
    
    public void setShort(int value) {
    	buf.writeShort(value);
    }
    
    public short readShort() {
    	return buf.readShort();
    }
    
    public void setInt(int value) {
    	buf.writeInt(value);
    }
   
    public int readInt() {
    	return buf.readInt();
    }
    
    public void setLong(long value) {
    	buf.writeLong(value);
    }
    
    public long readLong() {
    	return buf.readLong();
    }
    
	public void setString(String str) {
		if (str == null)
			return;
		try {
			byte[] bytes = str.getBytes(StringUtil.ENCODING_UTF8);
			if (bytes == null || bytes.length == 0) {
				buf.writeShort(0);
			} else {
				buf.writeShort(bytes.length);
				buf.writeBytes(bytes);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public String readString() {
		int utflen = buf.readShort();
		if (utflen == -1)
			return null;
		byte[] chararr = new byte[utflen];
		buf.readBytes(chararr);
		String str = new String(chararr, 0, chararr.length);
		try {
			str = URLDecoder.decode(str, StringUtil.ENCODING_UTF8);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return str;
	}
	
	public void pack() {
    	buf.setInt(0, buf.writerIndex());
    	buf.setShort(4, cmd);
    	size = buf.writerIndex();
    }
	
	public int getSize() {
    	return size;
    }

	public int getCmd() {
		return cmd;
	}

	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

	public ChannelHandlerContext getCtx() {
		return ctx;
	}

	public ByteBuf getBuf() {
		return buf;
	}

}
