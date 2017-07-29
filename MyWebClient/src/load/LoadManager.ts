// TypeScript file 加载管理
class LoadManager {
    private static instance = null;
    private loadResList: LoadBody[];//特效加载队列
    private Res_NotLoad;//是否有正在加载的特效
    private Res_loadbody: LoadBody;//当前正在加载的特效结构
    private loadThingList: LoadBody[];//模型加载队列
    private Thing_NotLoad;//是否有正在加载的模型
    private Thing_loadbody: LoadBody;//当前正在加载的模型结构

    public constructor() {
        this.loadResList = [];
        this.loadThingList = [];
        this.Thing_NotLoad = true;
        this.Res_NotLoad = true;
    }
    public static getInstance(): LoadManager {
        if (this.instance == null) {
            this.instance = new LoadManager();
        }
        return this.instance;
    }
    /** 
     * 特效加载方法
     * resList加载列表
     * callback加载成功回调
     * thisObj回调函数对象
     * param回调参数
    */
    public loadRes(resList: string[], callback = null, thisObj = null, param = null) {
        var _loadbody: LoadBody = new LoadBody(resList, callback, thisObj, param);
        this.loadResList.push(_loadbody);
        this.startLoading();
    }
    //开始加载
    private startLoading() {
        if (this.Res_NotLoad) {
            if (this.loadResList.length > 0) {
                this.Res_NotLoad = false;
                this.Res_loadbody = this.loadResList.shift();
                this.onLoading();
            }
        }
    }
    //加载进行
    private onLoading(): void {
        if (this.Res_loadbody && this.Res_loadbody.resList.length > 0) {
            var res: string = this.Res_loadbody.resList.shift();
            if (RES.hasRes(res)) {
                if (RES.getRes(res)) {
                    this.onLoading();
                } else {
                    RES.getResAsync(res, this.onLoading, this);
                }
            } else {
                this.onLoading();
            }
        } else {
            this.loadingFinish();
        }
    }
    //加载完成处理
    private loadingFinish(): void {
        this.Res_NotLoad = true;
        if (this.Res_loadbody) {
            this.Res_loadbody.callback();
            this.Res_loadbody.destroy();
            this.Res_loadbody = null;
        }
        this.startLoading();
    }
    /*
     * 头像加载
     */
    private _playerheadDict = {};//缓存的头像数据
    private _headloadUrls: number[];//玩家头像加载队列
    private _loadingHeadParam: PlayerHeadParam;//头像加载的参数
    public onAddHeadUrl(param: PlayerHeadParam): void {
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
    }
    private _headloader: egret.URLLoader;
    private _headIsLoading: boolean = false;
    private onLoadPlayerHead(): void {
        if (this._headIsLoading) {
            return;
        }
        if (this._headloadUrls.length == 0) {//队列加载完成
            this._headloader.removeEventListener(egret.Event.COMPLETE, this.onHeadLoadComplete, this);
            this._headloader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onHeadLoadError, this);
            this._headloader = null;
            return;
        }
        this._headIsLoading = true;
        var _userId: number = this._headloadUrls.shift();
        if (!this._playerheadDict[_userId]) {
            this.onHeadLoadOver();
            return;
        }
        this._loadingHeadParam = this._playerheadDict[_userId];
        var _headUrl: string = this._loadingHeadParam.headUrl;
        if (!this._headloader) {
            this._headloader = new egret.URLLoader();
            this._headloader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            this._headloader.addEventListener(egret.Event.COMPLETE, this.onHeadLoadComplete, this);
            this._headloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHeadLoadError, this);
        }
        if (!this._headloadUrls[_headUrl]) {
            var request: egret.URLRequest = new egret.URLRequest(_headUrl);
            this._headloader.load(request);
        }
    }
    private onHeadLoadComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var texture: egret.Texture = <egret.Texture>loader.data;
        this._loadingHeadParam.callback(texture);
        this._playerheadDict[this._loadingHeadParam.userId] = texture;//缓存用户的头像
        egret.log("头像加载成功成功：~URL：" + this._loadingHeadParam.headUrl + "~玩家ID：" + this._loadingHeadParam.userId);
        this.onHeadLoadOver();
    }
    private onHeadLoadError(event: egret.IOErrorEvent): void {
        egret.log("头像加载失败失败：~URL：" + this._loadingHeadParam.headUrl + "~玩家ID：" + this._loadingHeadParam.userId);
        this._loadingHeadParam.callback(null);
        delete this._playerheadDict[this._loadingHeadParam.userId];
        this.onHeadLoadOver();
    }
    private onHeadLoadOver(): void {
        this._loadingHeadParam = null;
        this._headIsLoading = false;
        this.onLoadPlayerHead();
    }
}
class LoadBody {
    private callbackFunc;
    private thisObject;
    private param;
    public resList: string[];
    public constructor(resList: string[], callbackFunc = null, thisObject = null, param = null) {
        this.resList = resList;
        this.callbackFunc = callbackFunc;
        this.thisObject = thisObject;
        this.param = param;
    }
    public callback() {
        Tool.callback(this.callbackFunc, this.thisObject, this.param);
    }
    public destroy(): void {
        this.resList = null;
        this.callbackFunc = null;
        this.thisObject = null;
        this.param = null;
    }
}