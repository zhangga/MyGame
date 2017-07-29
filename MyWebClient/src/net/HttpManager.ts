class HttpManager {
	public chanel: number = NET_CHANNEL.LOGIN;
	private _nets;
	private chanels = [NET_CHANNEL.LOGIN, NET_CHANNEL.GAME];
	public constructor() {
		this.onInit();
	}
	private get netBase(): MessageSend {
		return this._nets[this.chanel];
	}
	public onInit() {
		this._nets = {};
		for (var i: number = 0; i < this.chanels.length; i++) {
			this._nets[this.chanels[i]] = new MessageSend();
		}
	}
	public sendMessage(message: Message): void {
		if (message.getCmdId() != 100) {
			Tool.log("发送消息：" + message.getCmdId());
		}
		if (message.isCheckLoading) {
			// this.gameWorld.openLoading();
		}
		var request = new egret.HttpRequest();
		request["Message"] = message;
		request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
		request.open(this.url, egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "text/plain");
		request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
		//request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
		message.pack();
		request.send(message.getMsg());
	}

	private onGetComplete(event: egret.Event): void {
		var request = <egret.HttpRequest>event.currentTarget;
		this.netBase.recvMsg.recvData(request.response);
		var goodsAddMessage: Message = null;
		var goodsAddNum: number = 0;
		for (var i = 0; i < this.netBase.recvMsg.getMessageSize(); ++i) {
			var message: Message = new Message();
			message.unpack(this.netBase.recvMsg.getMessage());
			if (message.getCmdId() != 100) {
				Tool.log("接收消息：" + message.getCmdId());
			}
			this.netBase.receiveMessage(message);
			// this.gameWorld.closeLoading(message);
		}

		this.onDestroyRequsetObj(request);
	}

	private onGetIOError(event: egret.IOErrorEvent): void {
		var request = <egret.HttpRequest>event.currentTarget;
		var errorMsg: Message = request["Message"];
		// GameDispatcher.instance.dispatcherEventWith(GameEvent.NET_EVENT_ERROR, false, errorMsg);
		this.netBase.onErrorHandler(errorMsg);
		this.onDestroyRequsetObj(request);
	}

	private onDestroyRequsetObj(request: egret.HttpRequest): void {
		request.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
		request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
		request = null;
	}

	private onGetProgress(event: egret.ProgressEvent): void {
		Tool.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
	}

	public setUrl(url: string, chanel: number) {
		this._nets[chanel].url = url;
	}
	public get url() {
		return this.netBase.url;
	}
	public set url(url: string) {
		this.netBase.url = url;
	}
	public onAddMessage(msg: Message) {
		this.netBase.addMessage(msg);
	}
}
enum NET_CHANNEL {
	LOGIN = 0,
	GAME = 1
}