package p.my.rpc;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.log4j.Logger;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import p.my.rpc.proto.service.ServerStateServiceGrpc;
import p.my.rpc.service.ServerStateServiceImpl;

/**
 * RPC服务器
 *
 * @author U-Demon Created on 2017年7月26日
 * @version 1.0.0
 */
public class MyRPC {
	
	private static final Logger logger = Logger.getLogger(MyRPC.class);
	
	private static final int PORT = 29999;
	
	private Server server = null;
	
	private ExecutorService exec = null;
	
	/**
	 * 新起线程来启动
	 */
	public void start() {
		exec = Executors.newSingleThreadExecutor();
		exec.execute(new Runnable() {
			
			@Override
			public void run() {
				try {
					server = ServerBuilder.forPort(9999)
							//添加所有的RPC服务
							.addService(ServerStateServiceGrpc.bindService(new ServerStateServiceImpl()))
							.build().start();
				} catch (IOException e) {
					e.printStackTrace();
				}
				if (server == null) {
					logger.error("启动RPC服务失败!!!");
					return;
				}
				logger.info("GPRC Server started, listening on " + PORT);
				try {
					server.awaitTermination();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
	}

}
