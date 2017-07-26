@echo off
::编译proto文件
protoc.exe --java_out=../src *.proto
::生成RPC通信代码
protoc.exe --plugin=protoc-gen-grpc-java=protoc-gen-grpc-java.exe --grpc-java_out=../src *.proto