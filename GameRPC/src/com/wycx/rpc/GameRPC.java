package com.wycx.rpc;

import java.io.IOException;

import org.apache.log4j.Logger;

import com.wycx.rpc.define.RPCConfig;
import com.wycx.rpc.proto.service.HelloServiceGrpc;
import com.wycx.rpc.service.GreetingServiceImpl;

import io.grpc.Server;
import io.grpc.ServerBuilder;

public class GameRPC {
	
	private static final Logger logger = Logger.getLogger(GameRPC.class);
	
	private Server server = null;
	
	public static void main(String[] args) {
		final GameRPC grpc = new GameRPC();
		grpc.start();
		if (grpc.server == null)
			return;
		logger.info("Server started, listening on " + RPCConfig.PORT);
		grpc.blockUntilShutdown();
	}
	
	private void start() {
		try {
			server = ServerBuilder.forPort(RPCConfig.PORT)
					.addService(HelloServiceGrpc.bindService(new GreetingServiceImpl()))
					.build().start();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private void blockUntilShutdown() {
		if (server == null)
			return;
		try {
			server.awaitTermination();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}
