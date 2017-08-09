class _GF {
	private static fun: _GF;
	private static _stage: egret.Stage;
	private _scene: MainScene;
	private _net: HttpManager;
	public isDemo: boolean = true;
	public isOpenSound: boolean = true;
	public static IS_PC_GAME = false;
	
	//版本号
	private static _version: string = "v.0.0.1.170726";

	public constructor() {
	}
	public static get instance(): _GF {
		if (!this.fun) {
			this.fun = new _GF();
		}
		return this.fun;
	}
	public static set stage(param) {
		this._stage = param;
	}
	public static get stage() {
		return this._stage;
	}
	public static get stageWidth() {
		return this._stage.stageWidth;
	}
	public static get stageHeight() {
		return this._stage.stageHeight;
	}
	public static get centerPos(): egret.Point {
		return new egret.Point(this.stageWidth / 2, this.stageHeight / 2);
	}

	public set scene(param) {
		this._scene = param;
	}
	public get scene() {
		return this._scene;
	}
	public static get version(): string {
		return this._version;
	}

	public onInit(): void {
		Language.instance.type = LANGUAGE_TYPE.CN;
		this._net = new HttpManager();
		this.netChanel = NET_CHANNEL.LOGIN;
	}
	public get net(): HttpManager {
		return this._net;
	}
	public set netChanel(param) {
		this._net.chanel = param;
	}
}