package p.my.login;

import javax.net.ssl.SSLEngine;

import org.apache.log4j.Logger;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpContentCompressor;
import io.netty.handler.codec.http.HttpRequestDecoder;
import io.netty.handler.codec.http.HttpResponseEncoder;
import io.netty.handler.ssl.SslHandler;
import p.my.common.support.SecureChatSslContextFactory;
import p.my.common.web.WebActionManager;
import p.my.login.constant.LoginConfig;
import p.my.login.constant.LoginConstant;
import p.my.login.core.HttpMessageHandler;
import p.my.login.task.TaskManager;

/**
 * 登陆服主入口
 *
 * @author U-Demon Created on 2017年7月8日
 * @version 1.0.0
 */
public class LoginServer {
	
	private static final Logger logger = Logger.getLogger(LoginServer.class);
	
	public static void main(String[] args) {
		LoginServer login = new LoginServer();
		login.start();
		logger.info("登陆服启动成功");
	}
	
	/**
	 * 启动服务器
	 */
	private void start() {
		logger.info("初始化游戏资源");
    	initResource(LoginConstant.RES_PATH);
    	
    	WebActionManager.init(LoginConstant.WEB_ACTION_PACKAGE);
    	
    	logger.info("初始化任务管理器");
        TaskManager.gi().init();
        TaskManager.gi().startService();
		
		//监听端口
		initNet();
	}
	
	private void initResource(String path) {
		logger.info("加载游戏配置数据");
        LoginConfig.loadData(path);
    }
	
	private void initDB(String path) {
//        DataManager.getInstance().init(path, "proxool.logon", CacheDefine.CACHE_ID_USER);
//        JedisManager.gi().init();
    }
	
	/**
	 * 监听端口
	 */
	private void initNet() {
		EventLoopGroup bossGroup = new NioEventLoopGroup();
		EventLoopGroup workerGroup = new NioEventLoopGroup();
		ServerBootstrap boot = new ServerBootstrap();
		boot.group(bossGroup, workerGroup).channel(NioServerSocketChannel.class)
			.childHandler(new MyChannelHandler())
			.option(ChannelOption.SO_BACKLOG, 1024)
			.childOption(ChannelOption.SO_KEEPALIVE, true);
		try {
			//绑定端口
			ChannelFuture cf = boot.bind(LoginConfig.LOGIN_PORT).sync();
			logger.info("成功绑定端口：" + LoginConfig.LOGIN_PORT);
			//等待服务端监听端口关闭 
			cf.channel().closeFuture().sync();
		} catch (InterruptedException e) {
			logger.error("绑定服务器端口失败", e);
		} finally {
			 bossGroup.shutdownGracefully();
			 workerGroup.shutdownGracefully();
		}
    }
	
	class MyChannelHandler extends ChannelInitializer<SocketChannel> {

		@Override
		protected void initChannel(SocketChannel sc) throws Exception {
			ChannelPipeline pipeline = sc.pipeline();
			if (LoginConfig.isPUBLISH()) {
				SSLEngine engine = SecureChatSslContextFactory.getServerContext().createSSLEngine();
				engine.setUseClientMode(false);
				pipeline.addLast("ssl", new SslHandler(engine));
			}
			pipeline.addLast("decoder", new HttpRequestDecoder());
			pipeline.addLast("encoder", new HttpResponseEncoder());
			pipeline.addLast("deflater", new HttpContentCompressor());
			pipeline.addLast("handler", new HttpMessageHandler());
		}
		
	}

}
