package com.wycx.rpc.service;

import org.apache.log4j.Logger;

import com.wycx.rpc.proto.model.HelloRequest;
import com.wycx.rpc.proto.model.HelloResponse;
import com.wycx.rpc.proto.service.HelloServiceGrpc.HelloService;

import io.grpc.stub.StreamObserver;

public class GreetingServiceImpl implements HelloService {
	
	private static final Logger logger = Logger.getLogger(GreetingServiceImpl.class);

	@Override
	public void sayHello(HelloRequest request, StreamObserver<HelloResponse> responseObserver) {
		logger.info("HelloRequest: name="+request.getName()+",id="+request.getId());
		HelloResponse resp = HelloResponse.newBuilder().setMessage("Fuck U "+request.getName()).build();
		responseObserver.onNext(resp);
		responseObserver.onCompleted();
	}

}
