var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *动画对象类
 **/
var Animation = (function (_super) {
    __extends(Animation, _super);
    /**
     * resName 资源名称 （前缀）
     * playNum 播放次数
     * autoRemove 播放完成后是否自动移除
     * frame 帧标签
     ***/
    function Animation(resName, playNum, autoRemove, actionName, frame) {
        if (playNum === void 0) { playNum = -1; }
        if (autoRemove === void 0) { autoRemove = false; }
        if (actionName === void 0) { actionName = "action"; }
        if (frame === void 0) { frame = null; }
        var _this = _super.call(this) || this;
        _this._playNum = 0;
        _this._movieClip = new egret.MovieClip();
        _this._playNum = playNum;
        _this.autoRemove = autoRemove;
        // this._actionName = actionName;
        _this._frame = frame == null ? 1 : frame;
        _this.onUpdateRes(resName, actionName);
        return _this;
    }
    //加载动画资源
    Animation.prototype.onUpdateRes = function (resName, actionName, playNum, frame) {
        if (actionName === void 0) { actionName = "action"; }
        if (playNum === void 0) { playNum = null; }
        if (frame === void 0) { frame = null; }
        this._onLoading = true;
        this._movieClip.stop();
        this.onRemoveCallBack();
        this._actionName = actionName;
        if (playNum != null)
            this._playNum = playNum;
        if (frame != null)
            this._frame = frame;
        this.onLoadHandler(resName);
    };
    Animation.prototype.onLoadHandler = function (resName) {
        this._resName = resName;
        var resJson = resName + "_json";
        var resPng = resName + "_png";
        if (RES.getRes(resJson) && RES.getRes(resPng)) {
            this.onLoadComplete(resName);
        }
        else {
            this.removeChildren();
            LoadManager.getInstance().loadRes([resJson, resPng], this.onLoadComplete, this, resName);
        }
    };
    //控制播放帧标签
    Animation.prototype.onFrame = function (resName, frame) {
        if (frame && this._frame != frame) {
            this._frame = frame;
            this.onLoadHandler(resName);
        }
    };
    Animation.prototype.playFinishCallBack = function (callback, callobj, callparam) {
        if (callparam === void 0) { callparam = null; }
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
    };
    Animation.prototype.onFinishCallBack = function () {
        if (this.callback)
            Tool.callback(this.callback, this.callObj, this.callparam);
        this.onRemoveCallBack();
    };
    Animation.prototype.onRemoveCallBack = function () {
        this.callback = null;
        this.callObj = null;
        this.callparam = null;
        if (this._movieClip) {
            this._movieClip.removeEventListener(egret.Event.COMPLETE, this.onFinishCallBack, this);
            this._movieClip.removeEventListener(egret.Event.LOOP_COMPLETE, this.onFinishCallBack, this);
        }
    };
    Object.defineProperty(Animation.prototype, "playNum", {
        //控制播放次数
        set: function (playNum) {
            this._playNum = playNum;
            if (playNum == 0)
                this.onStop();
            else
                this.onPlay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "autoRemove", {
        //是否自动移除
        set: function (autoRemove) {
            this._autoRemove = autoRemove;
            if (this._autoRemove) {
                if (this._playNum < 0) {
                }
                else if (this._playNum == 0) {
                    this.onDestroy();
                }
                else if (this._playNum > 0) {
                    this._movieClip.addEventListener(egret.Event.COMPLETE, this.onDestroy, this);
                }
            }
            else {
                this._movieClip.removeEventListener(egret.Event.LOOP_COMPLETE, this.onDestroy, this);
                this._movieClip.removeEventListener(egret.Event.COMPLETE, this.onDestroy, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    //加载完成处理
    Animation.prototype.onLoadComplete = function (resName) {
        if (resName != this._resName)
            return;
        this._onLoading = false;
        var resJson = resName + "_json";
        var resPng = resName + "_png";
        var _animJson = RES.getRes(resJson);
        if (_animJson) {
            var _animTexture = RES.getRes(resPng);
            AnimationFactory.getInstance().onCretaAnimation(_animJson, _animTexture, this._movieClip, this._actionName);
            this.addChildAt(this._movieClip, 0);
            this.playFinishCallBack(this.callback, this.callObj, this.callparam);
            this.playNum = this._playNum;
        }
    };
    //播放动画
    Animation.prototype.onPlay = function () {
        if (!this._movieClip || !this._movieClip.parent) {
            return;
        }
        try {
            this._movieClip.gotoAndPlay(this._frame, this._playNum);
        }
        catch (e) {
            // if (SDKManager.getChannel() == EChannel.CHANNEL_WYCX) {
            //     Tool.throwException("模型动画资源出错：res：" + this._resName);
            // } else {
            this._movieClip.stop();
        }
    };
    //暂停
    Animation.prototype.onStop = function () {
        if (!this._movieClip || !this._movieClip.parent) {
            return;
        }
        try {
            this._movieClip.gotoAndStop(this._frame);
        }
        catch (e) {
            // if (SDKManager.getChannel() == EChannel.CHANNEL_WYCX) {
            //     Tool.throwException("模型动画资源出错：res：" + this._resName);
            // } else {
            this._movieClip.stop();
        }
    };
    //销毁动画
    Animation.prototype.onDestroy = function () {
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
        }
        catch (e) {
            Tool.log("error - sprite movieFinish");
        }
    };
    Animation.prototype.onReset = function () {
        if (this._movieClip) {
            this._movieClip.stop();
        }
    };
    return Animation;
}(egret.DisplayObjectContainer));
__reflect(Animation.prototype, "Animation");
//动画生成工厂类
var AnimationFactory = (function () {
    function AnimationFactory() {
    }
    AnimationFactory.getInstance = function () {
        if (!this._instance)
            this._instance = new AnimationFactory();
        return this._instance;
    };
    /**具体详细见MovieClipDataFactory**/
    AnimationFactory.prototype.onCretaAnimation = function (movieClipDataSet, texture, mc, actionName) {
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
    };
    return AnimationFactory;
}());
__reflect(AnimationFactory.prototype, "AnimationFactory");
//# sourceMappingURL=Animation.js.map