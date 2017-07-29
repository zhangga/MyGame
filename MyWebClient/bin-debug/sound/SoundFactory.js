var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundFactory = (function () {
    function SoundFactory() {
    }
    SoundFactory.playSound = function (res, startTime, loops, backFnc) {
        if (backFnc === void 0) { backFnc = null; }
        if (!_GF.instance.isOpenSound)
            return;
        var base = this.getSoundByRes(res);
        if (!base.loaded) {
            base.load(function (base) {
                base.play(startTime, 1, backFnc);
            });
        }
        else {
            base.play(startTime, 1, backFnc);
        }
    };
    SoundFactory.playMusic = function (res, startTime) {
        if (!_GF.instance.isOpenSound)
            return;
        var base = this.getSoundByRes(res);
        if (!base.loaded) {
            base.load(function (base) {
                base.play(startTime, -1);
            });
        }
        else {
            base.play(startTime, -1);
        }
        return base;
    };
    SoundFactory.getSoundByRes = function (res) {
        if (this.sounds[res]) {
            return this.sounds[res];
        }
        else {
            return this.onBuidOneSound(res);
        }
    };
    SoundFactory.onBuidOneSound = function (res) {
        var base = new SoundBase(res);
        this.sounds[res] = base;
        return base;
    };
    return SoundFactory;
}());
SoundFactory.sounds = {};
SoundFactory.soundChannels = {};
__reflect(SoundFactory.prototype, "SoundFactory");
var SoundBase = (function () {
    function SoundBase(res) {
        this.loaded = false;
        this._res = res;
    }
    //加载
    SoundBase.prototype.load = function (backFnc) {
        var sound = this._sound = new egret.Sound();
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            this.loaded = true;
            backFnc.bind(this)(this);
        }, this);
        sound.load(SoundDefine.SOUND_RES + "/" + this._res);
    };
    //播放
    SoundBase.prototype.play = function (startTime, loops, backFnc) {
        if (backFnc === void 0) { backFnc = null; }
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(startTime, loops);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, function (e) {
            if (backFnc) {
                backFnc.bind(this)(this._channel);
            }
        }, this);
        return this._channel;
    };
    //停止
    SoundBase.prototype.stop = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    //播放完成
    SoundBase.prototype.onComplete = function (e) {
        this.stop();
    };
    return SoundBase;
}());
__reflect(SoundBase.prototype, "SoundBase");
//# sourceMappingURL=SoundFactory.js.map