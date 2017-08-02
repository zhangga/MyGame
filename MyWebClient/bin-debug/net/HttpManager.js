var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpManager = (function () {
    function HttpManager() {
        this.chanel = NET_CHANNEL.LOGIN;
        this.chanels = [NET_CHANNEL.LOGIN, NET_CHANNEL.GAME];
        this.onInit();
    }
    Object.defineProperty(HttpManager.prototype, "netBase", {
        get: function () {
            return this._nets[this.chanel];
        },
        enumerable: true,
        configurable: true
    });
    HttpManager.prototype.onInit = function () {
        this._nets = {};
        for (var i = 0; i < this.chanels.length; i++) {
            this._nets[this.chanels[i]] = new MessageSend();
        }
    };
    HttpManager.prototype.sendMessage = function (message) {
        Tool.log("发送消息：" + message.getCmdId());
        if (message.isCheckLoading) {
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
    };
    HttpManager.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        this.netBase.recvMsg.recvData(request.response);
        var goodsAddMessage = null;
        var goodsAddNum = 0;
        for (var i = 0; i < this.netBase.recvMsg.getMessageSize(); ++i) {
            var message = new Message();
            message.unpack(this.netBase.recvMsg.getMessage());
            if (message.getCmdId() != 100) {
                Tool.log("接收消息：" + message.getCmdId());
            }
            this.netBase.receiveMessage(message);
        }
        this.onDestroyRequsetObj(request);
    };
    HttpManager.prototype.onGetIOError = function (event) {
        var request = event.currentTarget;
        var errorMsg = request["Message"];
        // GameDispatcher.instance.dispatcherEventWith(GameEvent.NET_EVENT_ERROR, false, errorMsg);
        this.netBase.onErrorHandler(errorMsg);
        this.onDestroyRequsetObj(request);
    };
    HttpManager.prototype.onDestroyRequsetObj = function (request) {
        request.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request = null;
    };
    HttpManager.prototype.onGetProgress = function (event) {
        Tool.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    HttpManager.prototype.setUrl = function (url, chanel) {
        this._nets[chanel].url = url;
    };
    Object.defineProperty(HttpManager.prototype, "url", {
        get: function () {
            return this.netBase.url;
        },
        set: function (url) {
            this.netBase.url = url;
        },
        enumerable: true,
        configurable: true
    });
    HttpManager.prototype.onAddMessage = function (msg) {
        this.netBase.addMessage(msg);
    };
    return HttpManager;
}());
__reflect(HttpManager.prototype, "HttpManager");
var NET_CHANNEL;
(function (NET_CHANNEL) {
    NET_CHANNEL[NET_CHANNEL["LOGIN"] = 0] = "LOGIN";
    NET_CHANNEL[NET_CHANNEL["GAME"] = 1] = "GAME";
})(NET_CHANNEL || (NET_CHANNEL = {}));
//# sourceMappingURL=HttpManager.js.map