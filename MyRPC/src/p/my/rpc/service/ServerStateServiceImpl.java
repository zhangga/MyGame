package p.my.rpc.service;

import org.apache.log4j.Logger;

import io.grpc.stub.StreamObserver;
import p.my.rpc.proto.model.ServerStateRequest;
import p.my.rpc.proto.model.ServerStateResponse;
import p.my.rpc.proto.service.ServerStateServiceGrpc.ServerStateService;

public class ServerStateServiceImpl implements ServerStateService {
	
	private static final Logger logger = Logger.getLogger(ServerStateServiceImpl.class);

	@Override
	public void sayHello(ServerStateRequest request, StreamObserver<ServerStateResponse> responseObserver) {
		logger.info("HelloRequest: name="+request.getName()+",id="+request.getId());
		ServerStateResponse resp = ServerStateResponse.newBuilder().setState(true).build();
		responseObserver.onNext(resp);
		responseObserver.onCompleted();
	}

}
