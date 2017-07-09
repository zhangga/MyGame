package p.my.login.core;

import org.apache.log4j.Logger;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpRequest;
import io.netty.handler.codec.http.HttpUtil;
import io.netty.handler.codec.http.QueryStringDecoder;

import static io.netty.handler.codec.http.HttpResponseStatus.*;
import static io.netty.handler.codec.http.HttpVersion.*;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * HTTP消息处理
 *
 * @author U-Demon Created on 2017年7月8日
 * @version 1.0.0
 */
public class HttpMessageHandler extends ChannelInboundHandlerAdapter {
	
	private static final Logger logger = Logger.getLogger(HttpMessageHandler.class);

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
		if (msg instanceof HttpRequest) {
			HttpRequest request = (HttpRequest) msg;
			if (HttpUtil.is100ContinueExpected(request)) {
				send100Continue(ctx);
			}
			QueryStringDecoder decoder = new QueryStringDecoder(request.uri());
			//URL中携带的参数
			Map<String, List<String>> params = decoder.parameters();
            if (!params.isEmpty()) {
                for (Entry<String, List<String>> p : params.entrySet()) {
                    String key = p.getKey();
                    List<String> vals = p.getValue();
                    for (String val : vals) {
                    	logger.info("PARAM: "+key+" = "+val+"\n");
                    }
                }
            }
		}
		if (msg instanceof HttpContent) {
			HttpContent httpContent = (HttpContent) msg;
            ByteBuf buf = httpContent.content();
            if (buf.readableBytes() <= 0)
            	return;
            buf.markReaderIndex();
            int len = buf.readInt();
            if (buf.readableBytes() < len) {
    			buf.resetReaderIndex();
    			return;
    		}
            short cmdId = buf.readShort();
            System.out.println(cmdId);
		}
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		ctx.flush();
	}

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		super.channelActive(ctx);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		logger.error(cause);
//        ctx.close();
	}
	
	private static void send100Continue(ChannelHandlerContext ctx) {
        FullHttpResponse response = new DefaultFullHttpResponse(HTTP_1_1, CONTINUE);
        ctx.write(response);
    }

}
