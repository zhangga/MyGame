package p.my.rpc.client;

import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;

import io.grpc.ManagedChannel;
import io.grpc.netty.NegotiationType;
import io.grpc.netty.NettyChannelBuilder;
import p.my.rpc.proto.model.ServerStateRequest;
import p.my.rpc.proto.model.ServerStateResponse;
import p.my.rpc.proto.service.ServerStateServiceGrpc;
import p.my.rpc.proto.service.ServerStateServiceGrpc.ServerStateServiceBlockingStub;

/**
 * 发送服务器状态
 *
 * @author U-Demon Created on 2017年7月24日 下午4:25:34
 * @version 1.0.0
 */
public class ServerStateClient {
	
	private static final Logger logger = Logger.getLogger(ServerStateClient.class);
	
	private final ManagedChannel channel;
	
	private final ServerStateServiceBlockingStub blockingStub;
	
	public ServerStateClient(String host, int port) {
		channel = NettyChannelBuilder.forAddress(host, port).negotiationType(NegotiationType.PLAINTEXT).build();
		blockingStub = ServerStateServiceGrpc.newBlockingStub(channel);
		logger.info("发送服务器状态的RPC连接成功");
	}
	
	public void shutdown() {
		try {
			channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	public void sendState(int id, String name, String host, int port, int online) {
		try {
			ServerStateRequest req = ServerStateRequest.newBuilder()
					.setId(id).setName(name).setHost(host).setPort(port).setOnline(online)
					.build();
			@SuppressWarnings("unused")
			ServerStateResponse resp = blockingStub.sendState(req);
		} catch (RuntimeException e) {
			logger.error("RPC failed:", e);
			return;
		}
	}
	
}
