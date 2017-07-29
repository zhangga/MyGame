var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file 加载管理
var LoadManager = (function () {
    function LoadManager() {
        /*
         * 头像加载
         */
        this._playerheadDict = {}; //缓存的头像数据
        this._headIsLoading = false;
        this.loadResList = [];
        this.loadThingList = [];
        this.Thing_NotLoad = true;
        this.Res_NotLoad = true;
    }
    LoadManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LoadManager();
        }
        return this.instance;
    };
    /**
     * 特效加载方法
     * resList加载列表
     * callback加载成功回调
     * thisObj回调函数对象
     * param回调参数
    */
    LoadManager.prototype.loadRes = function (resList, callback, thisObj, param) {
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (param === void 0) { param = null; }
        var _loadbody = new LoadBody(resList, callback, thisObj, param);
        this.loadResList.push(_loadbody);
        this.startLoading();
    };
    //开始加载
    LoadManager.prototype.startLoading = function () {
        if (this.Res_NotLoad) {
            if (this.loadResList.length > 0) {
                this.Res_NotLoad = false;
                this.Res_loadbody = this.loadResList.shift();
                this.onLoading();
            }
        }
    };
    //加载进行
    LoadManager.prototype.onLoading = function () {
        if (this.Res_loadbody && this.Res_loadbody.resList.length > 0) {
            var res = this.Res_loadbody.resList.shift();
            if (RES.hasRes(res)) {
                if (RES.getRes(res)) {
                    this.onLoading();
                }
                else {
                    RES.getResAsync(res, this.onLoading, this);
                }
            }
            else {
                this.onLoading();
            }
        }
        else {
            this.loadingFinish();
        }
    };
    //加载完成处理
    LoadManager.prototype.loadingFinish = function () {
        this.Res_NotLoad = true;
        if (this.Res_loadbody) {
            this.Res_loadbody.callback();
            this.Res_loadbody.destroy();
            this.Res_loadbody = null;
        }
        this.startLoading();
    };
    LoadManager.prototype.onAddHeadUrl = function (param) {
        if (!this._headloadUrls) {
            this._headloadUrls = [];
        }
        if (this._playerheadDict[param.userId]) {
            param.callback(this._playerheadDict[param.userId]);
            return;
        }
        if (this._headloadUrls.indexOf(param.userId) < 0) {
            this._headloadUrls.push(param.userId);
            this._playerheadDict[param.userId] = param;
        }
        this.onLoadPlayerHead();
    };
    LoadManager.prototype.onLoadPlayerHead = function () {
        if (this._headIsLoading) {
            return;
        }
        if (this._headloadUrls.length == 0) {
            this._headloader.removeEventListener(egret.Event.COMPLETE, this.onHeadLoadComplete, this);
            this._headloader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onHeadLoadError, this);
            this._headloader = null;
            return;
        }
        this._headIsLoading = true;
        var _userId = this._headloadUrls.shift();
        if (!this._playerheadDict[_userId]) {
            this.onHeadLoadOver();
            return;
        }
        this._loadingHeadParam = this._playerheadDict[_userId];
        var _headUrl = this._loadingHeadParam.headUrl;
        if (!this._headloader) {
            this._headloader = new egret.URLLoader();
            this._headloader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            this._headloader.addEventListener(egret.Event.COMPLETE, this.onHeadLoadComplete, this);
            this._headloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHeadLoadError, this);
        }
        if (!this._headloadUrls[_headUrl]) {
            var request = new egret.URLRequest(_headUrl);
            this._headloader.load(request);
        }
    };
    LoadManager.prototype.onHeadLoadComplete = function (event) {
        var loader = event.target;
        var texture = loader.data;
        this._loadingHeadParam.callback(texture);
        this._playerheadDict[this._loadingHeadParam.userId] = texture; //缓存用户的头像
        egret.log("头像加载成功成功：~URL：" + this._loadingHeadParam.headUrl + "~玩家ID：" + this._loadingHeadParam.userId);
        this.onHeadLoadOver();
    };
    LoadManager.prototype.onHeadLoadError = function (event) {
        egret.log("头像加载失败失败：~URL：" + this._loadingHeadParam.headUrl + "~玩家ID：" + this._loadingHeadParam.userId);
        this._loadingHeadParam.callback(null);
        delete this._playerheadDict[this._loadingHeadParam.userId];
        this.onHeadLoadOver();
    };
    LoadManager.prototype.onHeadLoadOver = function () {
        this._loadingHeadParam = null;
        this._headIsLoading = false;
        this.onLoadPlayerHead();
    };
    return LoadManager;
}());
LoadManager.instance = null;
__reflect(LoadManager.prototype, "LoadManager");
var LoadBody = (function () {
    function LoadBody(resList, callbackFunc, thisObject, param) {
        if (callbackFunc === void 0) { callbackFunc = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (param === void 0) { param = null; }
        this.resList = resList;
        this.callbackFunc = callbackFunc;
        this.thisObject = thisObject;
        this.param = param;
    }
    LoadBody.prototype.callback = function () {
        Tool.callback(this.callbackFunc, this.thisObject, this.param);
    };
    LoadBody.prototype.destroy = function () {
        this.resList = null;
        this.callbackFunc = null;
        this.thisObject = null;
        this.param = null;
    };
    return LoadBody;
}());
__reflect(LoadBody.prototype, "LoadBody");
//# sourceMappingURL=LoadManager.js.map