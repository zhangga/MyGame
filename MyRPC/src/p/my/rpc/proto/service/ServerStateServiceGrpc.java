package p.my.rpc.proto.service;

import static io.grpc.stub.ClientCalls.asyncUnaryCall;
import static io.grpc.stub.ClientCalls.asyncServerStreamingCall;
import static io.grpc.stub.ClientCalls.asyncClientStreamingCall;
import static io.grpc.stub.ClientCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ClientCalls.blockingUnaryCall;
import static io.grpc.stub.ClientCalls.blockingServerStreamingCall;
import static io.grpc.stub.ClientCalls.futureUnaryCall;
import static io.grpc.MethodDescriptor.generateFullMethodName;
import static io.grpc.stub.ServerCalls.asyncUnaryCall;
import static io.grpc.stub.ServerCalls.asyncServerStreamingCall;
import static io.grpc.stub.ServerCalls.asyncClientStreamingCall;
import static io.grpc.stub.ServerCalls.asyncBidiStreamingCall;

@javax.annotation.Generated("by gRPC proto compiler")
public class ServerStateServiceGrpc {

  private ServerStateServiceGrpc() {}

  public static final String SERVICE_NAME = "p.my.rpc.proto.ServerStateService";

  // Static method descriptors that strictly reflect the proto.
  @io.grpc.ExperimentalApi
  public static final io.grpc.MethodDescriptor<p.my.rpc.proto.model.ServerStateRequest,
      p.my.rpc.proto.model.ServerStateResponse> METHOD_SEND_STATE =
      io.grpc.MethodDescriptor.create(
          io.grpc.MethodDescriptor.MethodType.UNARY,
          generateFullMethodName(
              "p.my.rpc.proto.ServerStateService", "sendState"),
          io.grpc.protobuf.ProtoUtils.marshaller(p.my.rpc.proto.model.ServerStateRequest.getDefaultInstance()),
          io.grpc.protobuf.ProtoUtils.marshaller(p.my.rpc.proto.model.ServerStateResponse.getDefaultInstance()));

  public static ServerStateServiceStub newStub(io.grpc.Channel channel) {
    return new ServerStateServiceStub(channel);
  }

  public static ServerStateServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    return new ServerStateServiceBlockingStub(channel);
  }

  public static ServerStateServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    return new ServerStateServiceFutureStub(channel);
  }

  public static interface ServerStateService {

    public void sendState(p.my.rpc.proto.model.ServerStateRequest request,
        io.grpc.stub.StreamObserver<p.my.rpc.proto.model.ServerStateResponse> responseObserver);
  }

  public static interface ServerStateServiceBlockingClient {

    public p.my.rpc.proto.model.ServerStateResponse sendState(p.my.rpc.proto.model.ServerStateRequest request);
  }

  public static interface ServerStateServiceFutureClient {

    public com.google.common.util.concurrent.ListenableFuture<p.my.rpc.proto.model.ServerStateResponse> sendState(
        p.my.rpc.proto.model.ServerStateRequest request);
  }

  public static class ServerStateServiceStub extends io.grpc.stub.AbstractStub<ServerStateServiceStub>
      implements ServerStateService {
    private ServerStateServiceStub(io.grpc.Channel channel) {
      super(channel);
    }

    private ServerStateServiceStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ServerStateServiceStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ServerStateServiceStub(channel, callOptions);
    }

    @java.lang.Override
    public void sendState(p.my.rpc.proto.model.ServerStateRequest request,
        io.grpc.stub.StreamObserver<p.my.rpc.proto.model.ServerStateResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(METHOD_SEND_STATE, getCallOptions()), request, responseObserver);
    }
  }

  public static class ServerStateServiceBlockingStub extends io.grpc.stub.AbstractStub<ServerStateServiceBlockingStub>
      implements ServerStateServiceBlockingClient {
    private ServerStateServiceBlockingStub(io.grpc.Channel channel) {
      super(channel);
    }

    private ServerStateServiceBlockingStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ServerStateServiceBlockingStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ServerStateServiceBlockingStub(channel, callOptions);
    }

    @java.lang.Override
    public p.my.rpc.proto.model.ServerStateResponse sendState(p.my.rpc.proto.model.ServerStateRequest request) {
      return blockingUnaryCall(
          getChannel(), METHOD_SEND_STATE, getCallOptions(), request);
    }
  }

  public static class ServerStateServiceFutureStub extends io.grpc.stub.AbstractStub<ServerStateServiceFutureStub>
      implements ServerStateServiceFutureClient {
    private ServerStateServiceFutureStub(io.grpc.Channel channel) {
      super(channel);
    }

    private ServerStateServiceFutureStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ServerStateServiceFutureStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ServerStateServiceFutureStub(channel, callOptions);
    }

    @java.lang.Override
    public com.google.common.util.concurrent.ListenableFuture<p.my.rpc.proto.model.ServerStateResponse> sendState(
        p.my.rpc.proto.model.ServerStateRequest request) {
      return futureUnaryCall(
          getChannel().newCall(METHOD_SEND_STATE, getCallOptions()), request);
    }
  }

  private static final int METHODID_SEND_STATE = 0;

  private static class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final ServerStateService serviceImpl;
    private final int methodId;

    public MethodHandlers(ServerStateService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_SEND_STATE:
          serviceImpl.sendState((p.my.rpc.proto.model.ServerStateRequest) request,
              (io.grpc.stub.StreamObserver<p.my.rpc.proto.model.ServerStateResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static io.grpc.ServerServiceDefinition bindService(
      final ServerStateService serviceImpl) {
    return io.grpc.ServerServiceDefinition.builder(SERVICE_NAME)
        .addMethod(
          METHOD_SEND_STATE,
          asyncUnaryCall(
            new MethodHandlers<
              p.my.rpc.proto.model.ServerStateRequest,
              p.my.rpc.proto.model.ServerStateResponse>(
                serviceImpl, METHODID_SEND_STATE)))
        .build();
  }
}
