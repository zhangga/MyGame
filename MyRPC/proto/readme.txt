GRPC服务
1.eclipse-proto插件安装。先安装xtext,再安装protobuf-dt,
2.xtext插件只安装xtext ui组件，其他的不要安装，不然后面安装protobuf-dt的时候会有依赖冲突。
3.关闭自动编译proto。在Window->Preferences->Protocol Buffer->Compiler
4.编写完.proto文件  运行protoc.bat生成java文件




https://my.oschina.net/wangmengjun/blog/909867 
http://www.aboutyun.com/thread-8212-1-1.html 
http://blog.csdn.net/tolihaifeng/article/details/52605644