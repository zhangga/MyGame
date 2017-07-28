package p.my.gameserver.core;

import static io.netty.handler.codec.http.HttpResponseStatus.CONTINUE;
import static io.netty.handler.codec.http.HttpVersion.HTTP_1_1;
import static p.my.common.util.HttpUtil.TAIL;

import org.apache.log4j.Logger;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpMethod;
import io.netty.handler.codec.http.HttpRequest;
import io.netty.handler.codec.http.HttpUtil;
import p.my.common.util.SecurityUtil;
import p.my.common.web.WebAction;
import p.my.common.web.WebActionManager;
import p.my.gameserver.constant.GameConfig;
import p.my.gameserver.constant.GameConstant;

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
			//处理GET请求
			if (request.method() == HttpMethod.GET) {
				handlerWebAction(ctx, request);
			}
		}
		if (msg instanceof HttpContent) {
			HttpContent httpContent = (HttpContent) msg;
            ByteBuf buf = httpContent.content();
            if (buf.readableBytes() < 14) {
            	logger.error("接收到的消息长度为：" + buf.readableBytes() + "   不满足要求！");
            	return;
            }
            buf.markReaderIndex();
            //检测magic header.		2位
			short magicHeader = buf.readShort();
			if (magicHeader != GameConstant.MAGIC_HEADER) {
				buf.resetReaderIndex();
				logger.error("接收到的消息头不合法" + magicHeader);
				return;
			}
			//不断的检测，直到数据都已经读取了		2位
			int dataLength = buf.readShort();
			if (buf.readableBytes() < dataLength) {
				buf.resetReaderIndex();
				return;
			}
			//将消息完整的接收
//			byte[] decoded = new byte[dataLength];
//			buf.readBytes(decoded);
//			ByteBuf bb = Unpooled.wrappedBuffer(decoded);
			GameActionDispatcher.dispatch(ctx, buf);
		}
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		ctx.flush();
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		logger.error(cause);
//        ctx.close();
	}
	
	/**
	 * 处理URL请求
	 * @param ctx
	 * @param request
	 */
	private void handlerWebAction(ChannelHandlerContext ctx, HttpRequest request) {
		String uri = request.uri();
		String ip = ctx.channel().remoteAddress().toString();
		if (!SecurityUtil.ipValidate(GameConfig.URL_SAFE_IP, ip)) {
			logger.error("URL请求的IP不在白名单中："+ip);
			return;
		}
		//消息分发
		String filter = uri.substring(1, uri.indexOf(TAIL));
		WebAction action = WebActionManager.getAction(filter);
		if (action == null) {
			logger.error("URL请求的action不存在："+filter);
			return;
		}
		GameActionDispatcher.submit(1, new Runnable() {
			
			@Override
			public void run() {
				action.doRequest(request, ctx);
			}
		});
		
	}
	
	private void send100Continue(ChannelHandlerContext ctx) {
        FullHttpResponse response = new DefaultFullHttpResponse(HTTP_1_1, CONTINUE);
        ctx.write(response);
    }

}
