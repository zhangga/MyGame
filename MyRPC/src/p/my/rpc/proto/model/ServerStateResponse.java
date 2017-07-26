// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: server.proto

package p.my.rpc.proto.model;

/**
 * Protobuf type {@code p.my.rpc.proto.ServerStateResponse}
 */
public  final class ServerStateResponse extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:p.my.rpc.proto.ServerStateResponse)
    ServerStateResponseOrBuilder {
  // Use ServerStateResponse.newBuilder() to construct.
  private ServerStateResponse(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private ServerStateResponse() {
    state_ = false;
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return com.google.protobuf.UnknownFieldSet.getDefaultInstance();
  }
  private ServerStateResponse(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    this();
    int mutable_bitField0_ = 0;
    try {
      boolean done = false;
      while (!done) {
        int tag = input.readTag();
        switch (tag) {
          case 0:
            done = true;
            break;
          default: {
            if (!input.skipField(tag)) {
              done = true;
            }
            break;
          }
          case 8: {

            state_ = input.readBool();
            break;
          }
        }
      }
    } catch (com.google.protobuf.InvalidProtocolBufferException e) {
      throw e.setUnfinishedMessage(this);
    } catch (java.io.IOException e) {
      throw new com.google.protobuf.InvalidProtocolBufferException(
          e).setUnfinishedMessage(this);
    } finally {
      makeExtensionsImmutable();
    }
  }
  public static final com.google.protobuf.Descriptors.Descriptor
      getDescriptor() {
    return p.my.rpc.proto.model.RPCServerState.internal_static_p_my_rpc_proto_ServerStateResponse_descriptor;
  }

  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return p.my.rpc.proto.model.RPCServerState.internal_static_p_my_rpc_proto_ServerStateResponse_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            p.my.rpc.proto.model.ServerStateResponse.class, p.my.rpc.proto.model.ServerStateResponse.Builder.class);
  }

  public static final int STATE_FIELD_NUMBER = 1;
  private boolean state_;
  /**
   * <code>optional bool state = 1;</code>
   */
  public boolean getState() {
    return state_;
  }

  private byte memoizedIsInitialized = -1;
  public final boolean isInitialized() {
    byte isInitialized = memoizedIsInitialized;
    if (isInitialized == 1) return true;
    if (isInitialized == 0) return false;

    memoizedIsInitialized = 1;
    return true;
  }

  public void writeTo(com.google.protobuf.CodedOutputStream output)
                      throws java.io.IOException {
    if (state_ != false) {
      output.writeBool(1, state_);
    }
  }

  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (state_ != false) {
      size += com.google.protobuf.CodedOutputStream
        .computeBoolSize(1, state_);
    }
    memoizedSize = size;
    return size;
  }

  private static final long serialVersionUID = 0L;
  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
     return true;
    }
    if (!(obj instanceof p.my.rpc.proto.model.ServerStateResponse)) {
      return super.equals(obj);
    }
    p.my.rpc.proto.model.ServerStateResponse other = (p.my.rpc.proto.model.ServerStateResponse) obj;

    boolean result = true;
    result = result && (getState()
        == other.getState());
    return result;
  }

  @java.lang.Override
  public int hashCode() {
    if (memoizedHashCode != 0) {
      return memoizedHashCode;
    }
    int hash = 41;
    hash = (19 * hash) + getDescriptorForType().hashCode();
    hash = (37 * hash) + STATE_FIELD_NUMBER;
    hash = (53 * hash) + com.google.protobuf.Internal.hashBoolean(
        getState());
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static p.my.rpc.proto.model.ServerStateResponse parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static p.my.rpc.proto.model.ServerStateResponse parseFrom(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  public Builder newBuilderForType() { return newBuilder(); }
  public static Builder newBuilder() {
    return DEFAULT_INSTANCE.toBuilder();
  }
  public static Builder newBuilder(p.my.rpc.proto.model.ServerStateResponse prototype) {
    return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
  }
  public Builder toBuilder() {
    return this == DEFAULT_INSTANCE
        ? new Builder() : new Builder().mergeFrom(this);
  }

  @java.lang.Override
  protected Builder newBuilderForType(
      com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
    Builder builder = new Builder(parent);
    return builder;
  }
  /**
   * Protobuf type {@code p.my.rpc.proto.ServerStateResponse}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:p.my.rpc.proto.ServerStateResponse)
      p.my.rpc.proto.model.ServerStateResponseOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return p.my.rpc.proto.model.RPCServerState.internal_static_p_my_rpc_proto_ServerStateResponse_descriptor;
    }

    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return p.my.rpc.proto.model.RPCServerState.internal_static_p_my_rpc_proto_ServerStateResponse_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              p.my.rpc.proto.model.ServerStateResponse.class, p.my.rpc.proto.model.ServerStateResponse.Builder.class);
    }

    // Construct using p.my.rpc.proto.model.ServerStateResponse.newBuilder()
    private Builder() {
      maybeForceBuilderInitialization();
    }

    private Builder(
        com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
      super(parent);
      maybeForceBuilderInitialization();
    }
    private void maybeForceBuilderInitialization() {
      if (com.google.protobuf.GeneratedMessageV3
              .alwaysUseFieldBuilders) {
      }
    }
    public Builder clear() {
      super.clear();
      state_ = false;

      return this;
    }

    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return p.my.rpc.proto.model.RPCServerState.internal_static_p_my_rpc_proto_ServerStateResponse_descriptor;
    }

    public p.my.rpc.proto.model.ServerStateResponse getDefaultInstanceForType() {
      return p.my.rpc.proto.model.ServerStateResponse.getDefaultInstance();
    }

    public p.my.rpc.proto.model.ServerStateResponse build() {
      p.my.rpc.proto.model.ServerStateResponse result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    public p.my.rpc.proto.model.ServerStateResponse buildPartial() {
      p.my.rpc.proto.model.ServerStateResponse result = new p.my.rpc.proto.model.ServerStateResponse(this);
      result.state_ = state_;
      onBuilt();
      return result;
    }

    public Builder clone() {
      return (Builder) super.clone();
    }
    public Builder setField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        Object value) {
      return (Builder) super.setField(field, value);
    }
    public Builder clearField(
        com.google.protobuf.Descriptors.FieldDescriptor field) {
      return (Builder) super.clearField(field);
    }
    public Builder clearOneof(
        com.google.protobuf.Descriptors.OneofDescriptor oneof) {
      return (Builder) super.clearOneof(oneof);
    }
    public Builder setRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        int index, Object value) {
      return (Builder) super.setRepeatedField(field, index, value);
    }
    public Builder addRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        Object value) {
      return (Builder) super.addRepeatedField(field, value);
    }
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof p.my.rpc.proto.model.ServerStateResponse) {
        return mergeFrom((p.my.rpc.proto.model.ServerStateResponse)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(p.my.rpc.proto.model.ServerStateResponse other) {
      if (other == p.my.rpc.proto.model.ServerStateResponse.getDefaultInstance()) return this;
      if (other.getState() != false) {
        setState(other.getState());
      }
      onChanged();
      return this;
    }

    public final boolean isInitialized() {
      return true;
    }

    public Builder mergeFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      p.my.rpc.proto.model.ServerStateResponse parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (p.my.rpc.proto.model.ServerStateResponse) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }

    private boolean state_ ;
    /**
     * <code>optional bool state = 1;</code>
     */
    public boolean getState() {
      return state_;
    }
    /**
     * <code>optional bool state = 1;</code>
     */
    public Builder setState(boolean value) {
      
      state_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>optional bool state = 1;</code>
     */
    public Builder clearState() {
      
      state_ = false;
      onChanged();
      return this;
    }
    public final Builder setUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return this;
    }

    public final Builder mergeUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return this;
    }


    // @@protoc_insertion_point(builder_scope:p.my.rpc.proto.ServerStateResponse)
  }

  // @@protoc_insertion_point(class_scope:p.my.rpc.proto.ServerStateResponse)
  private static final p.my.rpc.proto.model.ServerStateResponse DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new p.my.rpc.proto.model.ServerStateResponse();
  }

  public static p.my.rpc.proto.model.ServerStateResponse getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<ServerStateResponse>
      PARSER = new com.google.protobuf.AbstractParser<ServerStateResponse>() {
    public ServerStateResponse parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
        return new ServerStateResponse(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<ServerStateResponse> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<ServerStateResponse> getParserForType() {
    return PARSER;
  }

  public p.my.rpc.proto.model.ServerStateResponse getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}
