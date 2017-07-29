class SoundFactory {
	public static sounds = {};
	public static soundChannels = {};
	public constructor() {
	}
	public static playSound(res: string, startTime?: number, loops?: number, backFnc: Function = null) {
		if (!_GF.instance.isOpenSound) return;
		var base: SoundBase = this.getSoundByRes(res);
		if (!base.loaded) {
			base.load(function (base: SoundBase) {
				base.play(startTime, 1, backFnc);
			})
		} else {
			base.play(startTime, 1, backFnc);
		}
	}
	public static playMusic(res: string, startTime?: number): SoundBase {
		if (!_GF.instance.isOpenSound) return;
		var base: SoundBase = this.getSoundByRes(res);
		if (!base.loaded) {
			base.load(function (base: SoundBase) {
				base.play(startTime, -1);
			})
		} else {
			base.play(startTime, -1);
		}
		return base;
	}
	private static getSoundByRes(res: string): SoundBase {
		if (this.sounds[res]) {
			return this.sounds[res];
		} else {
			return this.onBuidOneSound(res);
		}
	}


	private static onBuidOneSound(res: string): SoundBase {
		var base = new SoundBase(res);
		this.sounds[res] = base;
		return base;
	}


}
class SoundBase {
	private _res: string;
	private _sound: egret.Sound;
	private _channel: egret.SoundChannel;
	public loaded: boolean = false;
	public constructor(res: string) {
		this._res = res;
	}
	//加载
	public load(backFnc: Function): void {
		var sound: egret.Sound = this._sound = new egret.Sound();
		//sound 加载完成监听
		sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
			this.loaded = true;
			backFnc.bind(this)(this);
		}, this);
		sound.load(`${SoundDefine.SOUND_RES}/${this._res}`);
	}

	//播放
	public play(startTime?: number, loops?: number, backFnc: Function = null): egret.SoundChannel {
		//sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
		this._channel = this._sound.play(startTime, loops);
		this._channel.addEventListener(egret.Event.SOUND_COMPLETE, function (e: egret.Event) {
			if (backFnc) {
				backFnc.bind(this)(this._channel);
			}
		}, this);
		return this._channel;
	}
	//停止
	public stop(): void {
		if (this._channel) {
			this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);

			this._channel.stop();
			this._channel = null;
		}
	}
	//播放完成
	private onComplete(e: egret.Event): void {
		this.stop();
	}
}