var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Player = (function () {
    function Player() {
        this.id = -1;
        this.loginCode = 0;
        this.sex = 0;
        this.currFGID = 1; //当前显示的鱼缸ID--即数据表中的TYPE
        /**图鉴页开启的最大值**/
        this.openFGID = 1;
        this.MAX_UID = 999;
        this._artifact = 0; //神器点
        this.isInit = false;
        /**增益值，直接通过加这个值算出结果（如果是增益的为正数，减少效果就是负数） **/
        this.happiness_rate = UnitDefine.BASE_PERCENTAGE;
        this.buff_rate = UnitDefine.BASE_PERCENTAGE;
        this.artifact_rate = UnitDefine.BASE_PERCENTAGE;
        /**神器装饰：K--ID，V--鱼缸ID */
        this.decorate_show = {};
        /**神器激活：K--ID，V--等级 */
        this.decorate_active = {};
        /**月卡信息：K--类型，V--月卡数据 */
        this.month_cards = {};
        this.happiness = 0;
        /**当前是否在好友家 */
        this.inOtherHome = false;
        this.gold = new InfiniteNumber("10000");
        this.secOutput = new InfiniteNumber("0");
        this.diamond = 10000;
        this._fishs = {};
        var models = ModelManager.instance.modelFish;
        var model;
        this.isInit = true;
    }
    Player.prototype.onParseMessage = function (msg) {
        this.id = msg.getInt();
        this.sex = msg.getByte();
        this.name = msg.getString();
        this.onParseBookData(msg);
        this.onParseFishData(msg);
        this.exp = msg.getInt();
        this.level = msg.getShort();
        this.gold = new InfiniteNumber(msg.getString());
        this.diamond = msg.getInt();
        this._artifact = msg.getInt();
        this.onParseDecorateShow(msg);
        this.onParseDecorateActive(msg);
        this.isInit = true;
        DataManager.instance.playerM.updateIncomeEffect(PLAYER_EFFECT.All);
        this.onUpdateSecOutput();
    };
    Player.prototype.onParseFishData = function (msg) {
        var len = msg.getShort();
        this._fishs = {};
        var fData;
        for (var i = 0; i < len; i++) {
            fData = new FishData();
            fData.onParseMessage(msg);
            this._fishs[fData.id] = fData;
        }
    };
    //鱼缸信息
    Player.prototype.onParseBookData = function (msg) {
        this._book = {};
        var len = msg.getByte();
        var fishID;
        var tankData;
        for (var i = 0; i < len; i++) {
            tankData = new BookData();
            tankData.onParseMessage(msg);
            this._book[tankData.id] = tankData;
            this.openFGID = Math.max(this.openFGID, tankData.id);
        }
        this.currFGID = this.openFGID;
        this.onUpdateSecOutput();
    };
    Player.prototype.onParseDecorateShow = function (msg) {
        var size = msg.getByte();
        for (var i = 0; i < size; i++) {
            var id = msg.getShort();
            var tank = msg.getByte();
            var decorateModel = ModelManager.instance.modelDecorate[id];
            this.decorate_show[tank + "_" + decorateModel.buwei] = id;
        }
    };
    Player.prototype.onParseDecorateActive = function (msg) {
        var size = msg.getShort();
        for (var i = 0; i < size; i++) {
            var id = msg.getShort();
            var lv = msg.getInt();
            this.decorate_active[id] = lv;
        }
    };
    Player.prototype.onParseHappiness = function (msg) {
        this.happiness = msg.getByte();
        DataManager.instance.playerM.updateIncomeEffect(PLAYER_EFFECT.HAPPINESS);
        this.onUpdateSecOutput();
        GameDispatcher.instance.dispatcherEventWith(GameEvent.UPDATA_HAPPINESS_EVENT, false);
    };
    Player.prototype.onParseBuyGold = function (msg) {
        var goldAdd = msg.getString();
        this.addGoldAndUpgrade(goldAdd);
        this.addDiamondAndUpgrade(-ShopPayPanel.BUY_GOLD_COST);
    };
    Player.prototype.onParseDailyRecord = function (msg) {
        this.clearRecord = [];
        var len = msg.getByte();
        for (var i = 0; i < len; i++) {
            this.clearRecord.push(msg.getInt());
        }
        //每日任务
        DataManager.instance.taskM.onParseDailyTaskMsg(msg);
        //月卡信息
        this.onParseMonthlyCard(msg);
    };
    Player.prototype.onParseMonthlyCard = function (msg) {
        this.month_cards = {};
        var size = msg.getByte();
        for (var i = 0; i < size; i++) {
            var card = new MonthCard();
            card.type = msg.getByte();
            card.left = msg.getInt();
            card.rewarded = msg.getBoolean();
            this.month_cards[card.type] = card;
        }
    };
    Player.prototype.addClearPlayer = function (playerID) {
        if (this.getClearNumById(playerID) < GameDefine.CLEAR_FISHTANK_BY_ONE_MAX) {
            this.clearRecord.push(playerID);
        }
    };
    Object.defineProperty(Player.prototype, "clearLen", {
        get: function () {
            return this.clearRecord.length;
        },
        enumerable: true,
        configurable: true
    });
    /*获得清理某人鱼缸次数*/
    Player.prototype.getClearNumById = function (playerID) {
        var n = 0;
        for (var i = 0; i < this.clearLen; i++) {
            if (this.clearRecord[i] == playerID) {
                n += 1;
            }
        }
        return n;
    };
    Object.defineProperty(Player.prototype, "fishLen", {
        get: function () {
            var n = 0;
            for (var key in this._fishs) {
                n++;
            }
            return n;
        },
        enumerable: true,
        configurable: true
    });
    /**增加金币**/
    Player.prototype.addGold = function (param) {
        this.gold.add(param);
    };
    /**增加金币并更新显示**/
    Player.prototype.addGoldAndUpgrade = function (param) {
        this.gold.add(param);
        GameDispatcher.instance.dispatcherEventWith(GameEvent.PLAYER_CURRENCY_UPDATE, false, this);
    };
    /**增加金币并且开启服务端同步**/
    Player.prototype.addGoldAndOpenSync = function (param) {
        this.addGoldAndUpgrade(param);
        DataManager.instance.syncM.onOpenSync();
    };
    /**增加钻石**/
    Player.prototype.addDiamond = function (param) {
        this.diamond += param;
        if (this.diamond < 0)
            this.diamond = 0;
    };
    /**增加钻石并更新显示**/
    Player.prototype.addDiamondAndUpgrade = function (param) {
        this.diamond += param;
        GameDispatcher.instance.dispatcherEventWith(GameEvent.PLAYER_CURRENCY_UPDATE, false, this);
    };
    /**更新货币
     * 	@symbol		对应符号值为：[-1,1];
     *
     * **/
    Player.prototype.updateCurrency = function (model, symbol) {
        switch (model.type) {
            case GOODS_TYPE.GOLD:
                this.addGoldAndUpgrade(model.num * symbol);
                break;
            case GOODS_TYPE.DIAMOND:
                this.addDiamondAndUpgrade(model.num * symbol);
                break;
        }
    };
    Object.defineProperty(Player.prototype, "artifact", {
        /**神器点相关**/
        get: function () {
            return this._artifact;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.addArtifact = function (param) {
        this._artifact += param;
        if (this._artifact < 0)
            this._artifact = 0;
    };
    Player.prototype.onParseAwardArtifact = function (msg) {
        // var fishId: number = msg.getInt();
        // var _crowndata: CrownData = this.getCrownInfoByID(fishId);
        // _crowndata.hasArtifact = true;
        // var modelFish: ModelFish = ModelManager.instance.modelFish[fishId];
        // this.addArtifact(modelFish.artifactNum);
        // GameCommon.instance.onShowAwardHint("reward_book_artifact", ModelAward.onParseByParam(GOODS_TYPE.ARTIFACT, 0, modelFish.artifactNum));
        // GameDispatcher.instance.dispatcherEventWith(GameEvent.FIELDGUIDE_REWARD_EVENT, false, fishId);
    };
    Object.defineProperty(Player.prototype, "fishfood", {
        get: function () {
            return this._fishfood;
        },
        /**鱼食相关**/
        set: function (value) {
            if (value != this._fishfood) {
                this._fishfood = value;
                GameDispatcher.instance.dispatcherEventWith(GameEvent.FISH_FOOD_UPDATE, false, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.getCurrency = function (type) {
        switch (type) {
            case GOODS_TYPE.GOLD:
                return this.gold.num;
            case GOODS_TYPE.DIAMOND:
                return this.diamond;
            default:
                return 0;
        }
    };
    Player.prototype.getFishByLoction = function (loc) {
        var ret = [];
        var data;
        for (var key in this._fishs) {
            data = this._fishs[key];
            if (data.model.yugangId == loc) {
                ret.push(data);
            }
        }
        return ret;
    };
    Player.prototype.getRandFishEvolution = function () {
        var ret = this.getFishByLoction(this.currFGID);
        if (ret.length > 0) {
            var rand = Math.floor(ret.length * Math.random());
            return ret[rand];
        }
        return null;
    };
    Player.prototype.getFishByID = function (id) {
        return this._fishs[id];
    };
    Player.prototype.getNewOneFish = function (id) {
        var one = new FishData();
        one.setParam(id);
        this._fishs[one.id] = one;
        return one;
    };
    Player.prototype.delFishByUID = function (uid) {
        delete this._fishs[uid];
    };
    Player.prototype.onUpgradeAdvanceFish = function (id, add) {
        if (add === void 0) { add = 1; }
        var fData = this.getFishByID(id);
        fData.tier += add;
        fData.onUpdateSecOutput();
    };
    Player.prototype.getBookByID = function (id) {
        return this._book[id];
    };
    Player.prototype.getUnlockBooks = function () {
        var books = [];
        for (var key in this._book) {
            books.push(this._book[key]);
        }
        return books;
    };
    Player.prototype.onUpdateBookLv = function (currID, add) {
        if (add === void 0) { add = 1; }
        var b = this.getBookByID(currID);
        b.level += add;
    };
    Player.prototype.addBook = function (id) {
        if (!this._book[id]) {
            this._book[id] = new BookData(id);
        }
        this.onUpdateSecOutput();
    };
    Object.defineProperty(Player.prototype, "crown", {
        //拥有皇冠的个数
        get: function () {
            // var data: CrownData;
            var n = 0;
            // for (var key in this._fishCrown) {
            // 	data = this._fishCrown[key];
            // 	n += data.crown;
            // }
            return n;
        },
        enumerable: true,
        configurable: true
    });
    //通过鱼的IDs获得累计皇冠和总皇冠
    Player.prototype.getCrownHasAndTotalByPage = function (index) {
        // var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[index];
        // if (!model) return [0, 0];
        var has = 0;
        var total = 0;
        // var data: CrownData;
        // var fishID: number;
        // for (var i: number = 0; i < 12; i++) {
        // 	fishID = parseInt(model.jiegou[i]);
        // 	data = this._fishCrown[fishID];
        // 	if (fishID > 0 && data) {
        // 		has += data.crown;
        // 		total += data.model.starMax;
        // 	}
        // }
        return [has, total];
    };
    //获得鱼皇冠信息通过鱼的ID
    Player.prototype.getCrownInfoByID = function (fishID) {
        // return this._fishCrown[fishID];
        return null;
    };
    //升级鱼
    Player.prototype.onUpgradeFish = function (uid, add) {
        if (add === void 0) { add = 1; }
        if (this._fishs[uid]) {
            this._fishs[uid].lv += add;
            this._fishs[uid].onUpdateSecOutput();
            this.onUpdateSecOutput();
            GameDispatcher.instance.dispatcherEventWith(GameEvent.FISH_UPGRADE_EVENT, false, uid);
        }
        return this._fishs[uid];
    };
    //获得鱼是否能够购买
    Player.prototype.getFishIsCanBuy = function (fishID) {
        // var model: ModelFish = ModelManager.instance.modelFish[fishID];
        // var cData = this.getCrownInfoByID(fishID);
        // if (!cData.isUnlock) return false;
        // if (model) return this.getFishAndCrownSum(fishID) < model.starMax;
        return false;
    };
    Player.prototype.getFishAndCrownSum = function (fishID) {
        var n = 0;
        n += this.getCrownHasNum(fishID);
        n += this.getFishHasNum(fishID);
        return n;
    };
    //获得某类鱼的个数
    Player.prototype.getFishHasNum = function (fishID) {
        var n = 0;
        var fdata;
        for (var key in this._fishs) {
            fdata = this._fishs[key];
            if (fdata.id == fishID) {
                n++;
            }
        }
        return n;
    };
    //获得某类鱼的皇冠数
    Player.prototype.getCrownHasNum = function (fishID) {
        var n = 0;
        // var data: CrownData;
        // data = this._fishCrown[fishID];
        // if (data) {
        // 	n += data.crown;
        // }
        return n;
    };
    Player.prototype.onTime = function () {
        if (!this.isInit)
            return;
        if (this.secOutput.num == 0)
            return;
        if (this.currSyncOutPut && (this.currSyncOutPut.timestamp == SyncFactory.onPackOutPutSec().timestamp))
            return;
        this.currSyncOutPut = SyncFactory.onPackOutPutSec();
        this.addGoldAndUpgrade(this.secOutput);
        DataManager.instance.syncM.onAddMessage(this.currSyncOutPut);
        //egret.log("after output:" + this.gold.num);		
    };
    Player.prototype.onUpdateSecOutput = function () {
        this.currSecOutPut = new InfiniteNumber(this.secOutput.num);
        this.secOutput.num = 0;
        var sum = 0;
        var book;
        var fData;
        var model;
        for (var key in this._book) {
            book = this._book[key];
            model = ModelManager.instance.modelFieldGuide[book.id + "_0"];
            for (var i = 0; i < model.fishId.length; i++) {
                fData = this._fishs[model.fishId[i]];
                if (fData) {
                    sum += fData.secOutput;
                }
            }
        }
        sum = UnitDefine.getTrueValue(sum);
        this.secOutput.add(sum);
    };
    Player.prototype.showSubtractSecOutput = function () {
        var value = new InfiniteNumber(this.secOutput.num - this.currSecOutPut.num);
        if (value.num > 0) {
            GameDispatcher.instance.dispatcherEventWith(GameEvent.SHOW_SECOUTPUT_ADD, false, value);
        }
    };
    Player.prototype.getSecOutputOneFishTank = function (bookID) {
        var sum = 0;
        var book = this._book[bookID];
        var model = book.model;
        var fData;
        for (var i = 0; i < model.fishId.length; i++) {
            fData = this._fishs[model.fishId[i]];
            if (fData) {
                sum += fData.secOutput;
            }
        }
        sum = UnitDefine.getTrueValue(sum);
        return new InfiniteNumber(sum);
    };
    /**是否解锁某鱼缸的全部鱼**/
    Player.prototype.getIsUnlockedAllFishByBook = function (bookID) {
        var book = this._book[bookID];
        if (!book)
            return false;
        var model = book.model;
        var fData;
        for (var i = 0; i < model.fishId.length; i++) {
            fData = this._fishs[model.fishId[i]];
            if (!fData)
                return false;
        }
        return true;
    };
    Player.prototype.onCheckFishCanUpgrade = function (bookID) {
        if (this.onCheckFishCanUnlock(bookID))
            return true;
        if (this.onCheckFishCanAdvance(bookID))
            return true;
        return false;
    };
    Player.prototype.onCheckFishCanUpgradeByID = function (fishID) {
        if (this.onCheckFishCanUnlockByID(fishID))
            return true;
        if (this.onCheckFishCanAdvanceByID(fishID))
            return true;
        return false;
    };
    Player.prototype.onCheckFishCanAdvance = function (bookID) {
        var book = this._book[bookID];
        if (!book)
            return false;
        var model = book.model;
        var fData;
        for (var i = 0; i < model.fishId.length; i++) {
            fData = this._fishs[model.fishId[i]];
            if (!fData)
                continue;
            if (this.onCheckFishCanAdvanceByID(fData.id))
                return true;
        }
        return false;
    };
    Player.prototype.onCheckFishCanAdvanceByID = function (id) {
        var fData = this._fishs[id];
        if (!fData)
            return false;
        var tierBase = fData.model.getTierBeginSecOutPut(fData.tier);
        if (fData.lv == tierBase.max && fData.lv != fData.model.maxLv) {
            var price = tierBase.price;
            if (this.getCurrency(GOODS_TYPE.GOLD) >= price)
                return true;
        }
        return false;
    };
    Player.prototype.onCheckFishCanUnlock = function (bookID) {
        var book = this._book[bookID];
        if (!book)
            return false;
        var model = book.model;
        var fData;
        for (var i = 0; i < model.fishId.length; i++) {
            fData = this._fishs[model.fishId[i]];
            if (!fData) {
                if (this.onCheckFishCanUnlockByID(parseInt(model.fishId[i])))
                    return true;
                break;
            }
        }
        return false;
    };
    Player.prototype.onCheckFishCanUnlockByID = function (id) {
        var fData = this._fishs[id];
        if (fData)
            return false;
        var model = ModelManager.instance.modelFish[id];
        if (!model)
            return false;
        var price = model.jiage.num;
        if (this.getCurrency(GOODS_TYPE.GOLD) >= price)
            return true;
        return false;
    };
    Player.prototype.onCheckFTCanAdvance = function () {
        for (var key in this._book) {
            if (this.onCheckFTCanAdvanceByBID(parseInt(key)))
                return true;
        }
        return false;
    };
    Player.prototype.onCheckFTCanAdvanceByBID = function (bookID) {
        var book = this._book[bookID];
        if (!book)
            return false;
        if (!book.nextModel)
            return false;
        var price = book.nextModel.cost.num;
        if (book.nextModel && this.getCurrency(GOODS_TYPE.GOLD) >= price && this.secOutput.num >= book.nextModel.tiaojian)
            return true;
        return false;
    };
    Player.prototype.onCheckDecorateRedPoint = function (bookID) {
        return this.getCanDressUpBuweis(bookID);
    };
    Player.prototype.onCheckDecorateCanDressUp = function (bookID, buwei) {
        return this.getCanDressUpBuweis(bookID, buwei);
    };
    //通过鱼缸ID来获得还没装扮且可装扮的部位列表
    Player.prototype.getCanDressUpBuweis = function (bookID, buwei) {
        if (buwei === void 0) { buwei = -1; }
        var decorateModel;
        for (var id in this.decorate_active) {
            decorateModel = ModelManager.instance.modelDecorate[id];
            if (buwei < 0 || buwei == decorateModel.buwei) {
                if (!this.decorate_show[bookID + "_" + decorateModel.buwei]) {
                    return true;
                }
            }
        }
        return false;
    };
    Player.prototype.onCheckBookRedPointByBID = function (bookID) {
        var book = this._book[bookID];
        if (!book) {
            if (this.onCheckBookCanUnlockByBID(bookID))
                return true;
        }
        else {
            if (DataManager.instance.playerM.player.onCheckFishCanUpgrade(bookID))
                return true;
            if (DataManager.instance.technology.onCheckRedPoint(bookID))
                return true;
            if (DataManager.instance.playerM.player.onCheckDecorateRedPoint(bookID))
                return true;
        }
        return false;
    };
    Player.prototype.onCheckBookCanUnlockByBID = function (bookID) {
        var bl = this.getIsUnlockedAllFishByBook(bookID - 1);
        if (!bl)
            return false;
        var model = ModelManager.instance.modelFieldGuide[bookID + "_0"];
        var price = model.cost.num;
        if (this.getCurrency(GOODS_TYPE.GOLD) >= price)
            return true;
        return false;
    };
    Player.prototype.onUpdateSocOutPutByID = function (fishTankID) {
        var fDatas = this.getFishByLoction(fishTankID);
        for (var i = 0; i < fDatas.length; i++) {
            fDatas[i].onUpdateSecOutput();
        }
    };
    // private getUID(fishID: number): number {
    // 	var uids: number[] = this.getFishsUid(fishID);
    // 	var idGenerator = fishID * 1000 + 1;
    // 	if (uids.length > 0) {
    // 		var max = Math.max(...uids);
    // 		idGenerator = max + 1;
    // 		if (idGenerator > fishID * 1000 + this.MAX_UID) {
    // 			idGenerator = fishID * 1000;
    // 			do {
    // 				++idGenerator;
    // 			} while (uids.indexOf(idGenerator) != -1);
    // 		}
    // 	}
    // 	return idGenerator;
    // }
    /**
     * 获取鱼缸等级
     */
    Player.prototype.getBookLv = function (id) {
        var lv = this._book[id];
        if (!lv)
            return 0;
        return lv.level;
    };
    Player.prototype.getDiamond = function () {
        return this.diamond;
    };
    Player.prototype.getGold = function () {
        return this.gold.num;
    };
    return Player;
}());
__reflect(Player.prototype, "Player", ["IPlayerInfo"]);
//# sourceMappingURL=Player.js.map