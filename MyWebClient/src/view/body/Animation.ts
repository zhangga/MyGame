/**
 *动画对象类 
 **/
class Animation extends egret.DisplayObjectContainer {
    protected _resName: string;
    protected _movieClip: egret.MovieClip;
    protected _playNum: number = 0;
    protected _autoRemove: boolean;
    protected _actionName: string;
    protected _frame;
    protected _onLoading: boolean;
    /**
     * resName 资源名称 （前缀）
     * playNum 播放次数
     * autoRemove 播放完成后是否自动移除
     * frame 帧标签
     ***/
    public constructor(resName: string, playNum: number = -1, autoRemove: boolean = false, actionName: string = "action", frame = null) {
        super();
        this._movieClip = new egret.MovieClip();
        this._playNum = playNum;
        this.autoRemove = autoRemove;
        // this._actionName = actionName;
        this._frame = frame == null ? 1 : frame;
        this.onUpdateRes(resName, actionName);
    }
    //加载动画资源
    public onUpdateRes(resName: string, actionName: string = "action", playNum = null, frame = null) {
        this._onLoading = true;
        this._movieClip.stop();
        this.onRemoveCallBack();
        this._actionName = actionName;

        if (playNum != null)
            this._playNum = playNum;
        if (frame != null)
            this._frame = frame;
        this.onLoadHandler(resName);
    }
    protected onLoadHandler(resName: string): void {
        this._resName = resName;
        var resJson: string = resName + "_json";
        var resPng: string = resName + "_png";
        if (RES.getRes(resJson) && RES.getRes(resPng)) {
            this.onLoadComplete(resName);
        } else {
            this.removeChildren();
            LoadManager.getInstance().loadRes([resJson, resPng], this.onLoadComplete, this, resName);
        }
    }
    //控制播放帧标签
    public onFrame(resName: string, frame: any): void {
        if (frame && this._frame != frame) {
            this._frame = frame;
            this.onLoadHandler(resName);
        }
    }
    // public onFrame1(frame: any): void {
    //     if (frame && this._frame != frame) {
    //         this._frame = frame;
    //     }
    //     if (!this._onLoading) {
    //         this.onPlay();
    //     }
    // }
    //播放完回调
    protected callback;
    protected callObj;
    protected callparam;
    public playFinishCallBack(callback, callobj, callparam = null): void {
        this.callback = callback;
        this.callObj = callobj;
        this.callparam = callparam;
        if (this._onLoading)
            return;
        if (this._movieClip) {
            if (this._playNum >= 0)
                this._movieClip.addEventListener(egret.Event.COMPLETE, this.onFinishCallBack, this);
            else
                this._movieClip.addEventListener(egret.Event.LOOP_COMPLETE, this.onFinishCallBack, this);
        }
    }
    private onFinishCallBack(): void {
        if (this.callback)
            Tool.callback(this.callback, this.callObj, this.callparam);

        this.onRemoveCallBack();
    }
    private onRemoveCallBack(): void {
        this.callback = null;
        this.callObj = null
        this.callparam = null;
        if (this._movieClip) {
            this._movieClip.removeEventListener(egret.Event.COMPLETE, this.onFinishCallBack, this);
            this._movieClip.removeEventListener(egret.Event.LOOP_COMPLETE, this.onFinishCallBack, this);
        }
    }
    //控制播放次数
    public set playNum(playNum) {
        this._playNum = playNum;
        if (playNum == 0)
            this.onStop();
        else
            this.onPlay();
    }
    //是否自动移除
    public set autoRemove(autoRemove: boolean) {
        this._autoRemove = autoRemove;
        if (this._autoRemove) {
            if (this._playNum < 0) {
                // this._movieClip.addEventListener(egret.Event.LOOP_COMPLETE, this.onDestroy, this);
            } else if (this._playNum == 0) {
                this.onDestroy();
            } else if (this._playNum > 0) {
                this._movieClip.addEventListener(egret.Event.COMPLETE, this.onDestroy, this);
            }
        } else {
            this._movieClip.removeEventListener(egret.Event.LOOP_COMPLETE, this.onDestroy, this);
            this._movieClip.removeEventListener(egret.Event.COMPLETE, this.onDestroy, this);
        }
    }
    //加载完成处理
    protected onLoadComplete(resName): void {
        if (resName != this._resName)
            return;
        this._onLoading = false;
        var resJson: string = resName + "_json";
        var resPng: string = resName + "_png";
        var _animJson = RES.getRes(resJson);
        if (_animJson) {
            var _animTexture: egret.Texture = RES.getRes(resPng);
            AnimationFactory.getInstance().onCretaAnimation(_animJson, _animTexture, this._movieClip, this._actionName);
            this.addChildAt(this._movieClip, 0);
            this.playFinishCallBack(this.callback, this.callObj, this.callparam);
            this.playNum = this._playNum;

            // this.dispatchEvent(new egret.Event(GameEvent.ANIMATION_LOAD_COMPLETE));
        }
    }
    //播放动画
    public onPlay(): void {
        if (!this._movieClip || !this._movieClip.parent) {
            return;
        }
        try {
            this._movieClip.gotoAndPlay(this._frame, this._playNum);
        } catch (e) {
            // if (SDKManager.getChannel() == EChannel.CHANNEL_WYCX) {
            //     Tool.throwException("模型动画资源出错：res：" + this._resName);
            // } else {
            this._movieClip.stop();
            // }
        }
    }
    //暂停
    public onStop(): void {
        if (!this._movieClip || !this._movieClip.parent) {
            return;
        }

        try {
            this._movieClip.gotoAndStop(this._frame);
        } catch (e) {
            // if (SDKManager.getChannel() == EChannel.CHANNEL_WYCX) {
            //     Tool.throwException("模型动画资源出错：res：" + this._resName);
            // } else {
            this._movieClip.stop();
            // }
        }
    }
    //销毁动画
    public onDestroy(): void {
        this._resName = null;
        this._frame = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
        try {
            if (this._movieClip) {
                this.onFinishCallBack();
                this._movieClip.removeEventListener(egret.Event.LOOP_COMPLETE, this.onDestroy, this);
                this._movieClip.removeEventListener(egret.Event.COMPLETE, this.onDestroy, this);
                if (this._movieClip.parent) {
                    this._movieClip.parent.removeChild(this._movieClip);
                }
                this._movieClip.stop();
                this._movieClip = null;
            }
        } catch (e) {
            Tool.log("error - sprite movieFinish");
        }
    }

    public onReset(): void {
        if (this._movieClip) {
            this._movieClip.stop();
        }
    }
}
//动画生成工厂类
class AnimationFactory {
    private static _instance: AnimationFactory;
    public constructor() {
    }
    public static getInstance(): AnimationFactory {
        if (!this._instance)
            this._instance = new AnimationFactory();
        return this._instance;
    }
    /**具体详细见MovieClipDataFactory**/
    public onCretaAnimation(movieClipDataSet, texture: egret.Texture, mc: egret.MovieClip, actionName: string): void {
        var mcDataFactory = new egret.MovieClipDataFactory();
        mcDataFactory.enableCache = false;
        mcDataFactory.mcDataSet = movieClipDataSet;
        mcDataFactory.texture = texture;
        if (mc) {
            mc.movieClipData = mcDataFactory.generateMovieClipData(actionName);
        }
        if (!mc.movieClipData.textureData) {
            Tool.log("111111111");
        }
        mcDataFactory.mcDataSet = null;
        mcDataFactory.texture = null;
        mcDataFactory = null;
    }
}