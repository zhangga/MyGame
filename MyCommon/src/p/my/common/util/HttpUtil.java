package p.my.common.util;

import static io.netty.handler.codec.http.HttpResponseStatus.OK;
import static io.netty.handler.codec.http.HttpVersion.HTTP_1_1;

import java.io.UnsupportedEncodingException;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpHeaderNames;
import io.netty.handler.codec.http.HttpHeaderValues;

public class HttpUtil {
	
	public static final String TAIL = ".do";
	
	public static final String QUEST = "?";
	
	public static void sendResponse(ChannelHandlerContext ctx, String content) {
		byte[] bs = new byte[0];
		try {
			bs = content.getBytes(StringUtil.ENCODING_UTF8);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		sendResponse(ctx, bs);
	}
	
	public static void sendResponse(ChannelHandlerContext ctx, ByteBuf content) {
		byte[] bs = new byte[content.readableBytes()];
		content.readBytes(bs);
		sendResponse(ctx, bs);
	}
	
	public static void sendResponse(ChannelHandlerContext ctx, byte[] content) {
		FullHttpResponse response = new DefaultFullHttpResponse(HTTP_1_1, OK, Unpooled.wrappedBuffer(content));
		response.headers().set(HttpHeaderNames.CONTENT_TYPE, "text/plain; charset=UTF-8");
		response.headers().set(HttpHeaderNames.CONTENT_LENGTH, response.content().readableBytes());
		response.headers().set(HttpHeaderNames.CONNECTION, HttpHeaderValues.CLOSE);
		response.headers().set(HttpHeaderNames.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
		ctx.write(response);
		ctx.flush();
	}

}
