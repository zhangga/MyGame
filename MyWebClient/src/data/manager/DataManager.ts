class DataManager {
	private static _instance: DataManager;

	public url: string;
	public channel: number = 1;
	public account: string;
	public platform: number = 1;
	public avatarUrl: string = "";//我的头像

	public playerM: PlayerManager;

	public constructor() {
		this.playerM = new PlayerManager();
	}

	public init(): void {
		this.channel = SDKManager.getChannel();
		this.account = SDKManager.loginInfo.account;
		this.platform = SDKManager.loginInfo.platform;
		this.avatarUrl = SDKManager.loginInfo.avatarUrl;
		this.loginM.init();
	}

	public static get instance(): DataManager {
		if (!this._instance) {
			this._instance = new DataManager();
		}
		return this._instance;
	}
	public static get player(): Player {
		return DataManager.instance.playerM.player;
	}
	private _login: LoginManager;
	public get loginM(): LoginManager {
		if (!this._login) {
			this._login = new LoginManager();
		}
		return this._login;
	}
	private _sync: SyncManager;
	public get syncM(): SyncManager {
		if (!this._sync) {
			this._sync = new SyncManager();
		}
		return this._sync;
	}
	private _friend: FriendManager;
	public get friendM(): FriendManager {
		if (!this._friend) {
			this._friend = new FriendManager();
		}
		return this._friend;
	}
	private _technology: TechnologyManager
	public get technology(): TechnologyManager {
		if (!this._technology) {
			this._technology = new TechnologyManager();
		}
		return this._technology;
	}
	private _decorate: DecorateManager;
	public get decorate(): DecorateManager {
		if (!this._decorate) {
			this._decorate = new DecorateManager();
		}
		return this._decorate;
	}
	private _toprank: TopRankManager;
	public get toprank(): TopRankManager {
		if (!this._toprank) {
			this._toprank = new TopRankManager();
		}
		return this._toprank;
	}
	private _fieldGuide: FieldGuideManager;
	public get fieldGuide(): FieldGuideManager {
		if (!this._fieldGuide) {
			this._fieldGuide = new FieldGuideManager();
		}
		return this._fieldGuide;
	}
	private _turnplate: TurnplateManager;
	public get turnplateM(): TurnplateManager {
		if (!this._turnplate) {
			this._turnplate = new TurnplateManager();
		}
		return this._turnplate;
	}
	private _visite: VisiteManager;
	public get visite(): VisiteManager {
		if (!this._visite) {
			this._visite = new VisiteManager();
		}
		return this._visite;
	}
	private _task: TaskManager;
	public get taskM(): TaskManager {
		if (!this._task) {
			this._task = new TaskManager();
		}
		return this._task;
	}
	private _offline: OfflineManager;
	public get offline(): OfflineManager {
		if (!this._offline) {
			this._offline = new OfflineManager();
		}
		return this._offline;
	}
	private _random: RandomEventManager;
	public get random(): RandomEventManager {
		if (!this._random) {
			this._random = new RandomEventManager();
		}
		return this._random;
	}
	private _buff: BuffManager;
	public get buff(): BuffManager {
		if (!this._buff) {
			this._buff = new BuffManager();
		}
		return this._buff;
	}
	private _achieve: AchieveManager;
	public get achieveM(): AchieveManager {
		if (!this._achieve) {
			this._achieve = new AchieveManager();
		}
		return this._achieve;
	}
	private _mail: MailManager;
	public get mailM(): MailManager {
		if (!this._mail) {
			this._mail = new MailManager();
		}
		return this._mail;
	}
	private _smashegg: SmashEggManager;
	public get smasheggM(): SmashEggManager {
		if (!this._smashegg) {
			this._smashegg = new SmashEggManager();
		}
		return this._smashegg;
	}
	private _enemy: EnemyManager;
	public get enemy(): EnemyManager {
		if (!this._enemy) {
			this._enemy = new EnemyManager();
		}
		return this._enemy;
	}

	//The end
}