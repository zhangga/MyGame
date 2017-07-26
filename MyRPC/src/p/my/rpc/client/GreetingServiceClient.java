package com.wycx.rpc.client;

import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;

import com.wycx.rpc.proto.model.HelloRequest;
import com.wycx.rpc.proto.model.HelloResponse;
import com.wycx.rpc.proto.service.HelloServiceGrpc;
import com.wycx.rpc.proto.service.HelloServiceGrpc.HelloServiceBlockingStub;

import io.grpc.ManagedChannel;
import io.grpc.netty.NegotiationType;
import io.grpc.netty.NettyChannelBuilder;

/**
 * 例子
 *
 * @author U-Demon Created on 2017年7月24日 下午4:25:34
 * @version 1.0.0
 */
public class GreetingServiceClient {
	
	private static final Logger logger = Logger.getLogger(GreetingServiceClient.class);
	
	private final ManagedChannel channel;
	
	private final HelloServiceBlockingStub blockingStub;
	
	public GreetingServiceClient(String host, int port) {
		channel = NettyChannelBuilder.forAddress(host, port).negotiationType(NegotiationType.PLAINTEXT).build();
		blockingStub = HelloServiceGrpc.newBlockingStub(channel);
	}
	
	public void shutdown() {
		try {
			channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	public void sayHello(String name) {
		try {
			System.out.println("Will try to say Hello  " + name + " ...");
			HelloRequest request = HelloRequest.newBuilder().setName(name).setId(12345678).build();
			HelloResponse response = blockingStub.sayHello(request);
			System.out.println("result from server: " + response.getMessage());
		} catch (RuntimeException e) {
			System.out.println("RPC failed:" + e.getMessage());
			return;
		}
	}
	
	public static void main(String[] args) throws Exception {

		GreetingServiceClient client = new GreetingServiceClient("127.0.0.1", 29999);

		try {
			String name = "Eric";
			logger.info(String.format("Client 调用RPC接口，参数为name = {%s}", name));
			client.sayHello(name);
			Thread.sleep(10000);
			name = "Zzq";
			client.sayHello(name);
		} finally {
			client.shutdown();
		}
	}

}
