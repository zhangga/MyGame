package p.my.rpc.service;

import io.grpc.stub.StreamObserver;
import p.my.rpc.proto.model.ServerStateRequest;
import p.my.rpc.proto.model.ServerStateResponse;
import p.my.rpc.proto.service.ServerStateServiceGrpc.ServerStateService;

/**
 * 接收到服务器状态
 *
 * @author U-Demon Created on 2017年7月27日
 * @version 1.0.0
 */
public class ServerStateServiceImpl implements ServerStateService {
	
	@Override
	public void sendState(ServerStateRequest request, StreamObserver<ServerStateResponse> responseObserver) {
		ServerStateResponse resp = ServerStateResponse.newBuilder().setState(true).build();
		responseObserver.onNext(resp);
		responseObserver.onCompleted();
		StringBuilder sb = new StringBuilder();
		sb.append(request.getId()).append(",").append(request.getName()).append(",")
			.append(request.getHost()).append(",").append(request.getPort()).append(",")
			.append(request.getOnline());
		ServiceResult.offer(ServiceResultKey.SERVER_STATE, sb.toString());
	}

}
