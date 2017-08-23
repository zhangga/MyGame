var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataManager = (function () {
    function DataManager() {
        this.channel = 1;
        this.platform = 1;
        this.avatarUrl = ""; //我的头像
        this.playerM = new PlayerManager();
    }
    DataManager.prototype.init = function () {
        this.channel = SDKManager.getChannel();
        this.account = SDKManager.loginInfo.account;
        this.platform = SDKManager.loginInfo.platform;
        this.avatarUrl = SDKManager.loginInfo.avatarUrl;
        this.loginM.init();
    };
    Object.defineProperty(DataManager, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new DataManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager, "player", {
        get: function () {
            return DataManager.instance.playerM.player;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "loginM", {
        get: function () {
            if (!this._login) {
                this._login = new LoginManager();
            }
            return this._login;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "syncM", {
        get: function () {
            if (!this._sync) {
                this._sync = new SyncManager();
            }
            return this._sync;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "friendM", {
        get: function () {
            if (!this._friend) {
                this._friend = new FriendManager();
            }
            return this._friend;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "technology", {
        get: function () {
            if (!this._technology) {
                this._technology = new TechnologyManager();
            }
            return this._technology;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "decorate", {
        get: function () {
            if (!this._decorate) {
                this._decorate = new DecorateManager();
            }
            return this._decorate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "toprank", {
        get: function () {
            if (!this._toprank) {
                this._toprank = new TopRankManager();
            }
            return this._toprank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "fieldGuide", {
        get: function () {
            if (!this._fieldGuide) {
                this._fieldGuide = new FieldGuideManager();
            }
            return this._fieldGuide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "turnplateM", {
        get: function () {
            if (!this._turnplate) {
                this._turnplate = new TurnplateManager();
            }
            return this._turnplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "visite", {
        get: function () {
            if (!this._visite) {
                this._visite = new VisiteManager();
            }
            return this._visite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "taskM", {
        get: function () {
            if (!this._task) {
                this._task = new TaskManager();
            }
            return this._task;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "offline", {
        get: function () {
            if (!this._offline) {
                this._offline = new OfflineManager();
            }
            return this._offline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "random", {
        get: function () {
            if (!this._random) {
                this._random = new RandomEventManager();
            }
            return this._random;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "buff", {
        get: function () {
            if (!this._buff) {
                this._buff = new BuffManager();
            }
            return this._buff;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "achieveM", {
        get: function () {
            if (!this._achieve) {
                this._achieve = new AchieveManager();
            }
            return this._achieve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "mailM", {
        get: function () {
            if (!this._mail) {
                this._mail = new MailManager();
            }
            return this._mail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "smasheggM", {
        get: function () {
            if (!this._smashegg) {
                this._smashegg = new SmashEggManager();
            }
            return this._smashegg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "enemy", {
        get: function () {
            if (!this._enemy) {
                this._enemy = new EnemyManager();
            }
            return this._enemy;
        },
        enumerable: true,
        configurable: true
    });
    return DataManager;
}());
__reflect(DataManager.prototype, "DataManager");
//# sourceMappingURL=DataManager.js.map