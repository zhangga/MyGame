class Player implements IPlayerInfo {
	public id: number = -1;
	public loginCode: number = 0;
	public sex: number = 0;
	public name: string;
	public gold: InfiniteNumber;
	public secOutput: InfiniteNumber;
	public diamond: number;
	public exp: number;
	public level: number;
	public currFGID: number = 1;//当前显示的鱼缸ID--即数据表中的TYPE
	/**图鉴页开启的最大值**/
	public openFGID: number = 1;
	private MAX_UID: number = 999;
	private _fishs;//鱼群
	private _book;//鱼缸记录
	private _artifact: number = 0;//神器点
	private _fishfood: number;//鱼食
	private isInit: boolean = false;
	/**增益值，直接通过加这个值算出结果（如果是增益的为正数，减少效果就是负数） **/
	public happiness_rate: number = UnitDefine.BASE_PERCENTAGE;
	public buff_rate: number = UnitDefine.BASE_PERCENTAGE;
	public artifact_rate: number = UnitDefine.BASE_PERCENTAGE;

	/**神器装饰：K--ID，V--鱼缸ID */
	public decorate_show = {};
	/**神器激活：K--ID，V--等级 */
	public decorate_active = {};

	/**月卡信息：K--类型，V--月卡数据 */
	public month_cards = {};


	public happiness: number = 0;
	public clearRecord: number[];

	/**当前是否在好友家 */
	public inOtherHome: boolean = false;

	public constructor() {
		this.gold = new InfiniteNumber("10000");
		this.secOutput = new InfiniteNumber("0");
		this.diamond = 10000;
		this._fishs = {};
		var models = ModelManager.instance.modelFish;
		var model: ModelFish;
		this.isInit = true;
	}
	public onParseMessage(msg: Message) {
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
	}
	public onParseFishData(msg: Message): void {
		var len = msg.getShort();
		this._fishs = {};
		var fData: FishData;
		for (var i: number = 0; i < len; i++) {
			fData = new FishData();
			fData.onParseMessage(msg);
			this._fishs[fData.id] = fData;
		}
	}
	//鱼缸信息
	public onParseBookData(msg: Message): void {
		this._book = {};
		var len = msg.getByte();
		var fishID: number;
		var tankData: BookData;
		for (var i: number = 0; i < len; i++) {
			tankData = new BookData();
			tankData.onParseMessage(msg);
			this._book[tankData.id] = tankData;
			this.openFGID = Math.max(this.openFGID, tankData.id);
		}
		this.currFGID = this.openFGID;
		this.onUpdateSecOutput();
	}
	public onParseDecorateShow(msg: Message) {
		var size: number = msg.getByte();
		for (var i: number = 0; i < size; i++) {
			var id = msg.getShort();
			var tank = msg.getByte();
			var decorateModel: ModelDecorate = ModelManager.instance.modelDecorate[id];
			this.decorate_show[tank + "_" + decorateModel.buwei] = id;
		}
	}
	public onParseDecorateActive(msg: Message) {
		var size: number = msg.getShort();
		for (var i: number = 0; i < size; i++) {
			var id = msg.getShort();
			var lv = msg.getInt();
			this.decorate_active[id] = lv;
		}
	}
	public onParseHappiness(msg: Message) {
		this.happiness = msg.getByte();
		DataManager.instance.playerM.updateIncomeEffect(PLAYER_EFFECT.HAPPINESS);
		this.onUpdateSecOutput();
		GameDispatcher.instance.dispatcherEventWith(GameEvent.UPDATA_HAPPINESS_EVENT, false);

	}
	public onParseBuyGold(msg: Message): void {
		var goldAdd = msg.getString();
		this.addGoldAndUpgrade(goldAdd);
		this.addDiamondAndUpgrade(-ShopPayPanel.BUY_GOLD_COST);
	}
	public onParseDailyRecord(msg: Message): void {
		this.clearRecord = [];
		var len: number = msg.getByte();
		for (var i: number = 0; i < len; i++) {
			this.clearRecord.push(msg.getInt());
		}
		//每日任务
		DataManager.instance.taskM.onParseDailyTaskMsg(msg);
		//月卡信息
		this.onParseMonthlyCard(msg);
	}
	private onParseMonthlyCard(msg: Message): void {
		this.month_cards = {};
		var size: number = msg.getByte();
		for (var i = 0; i < size; i++) {
			var card: MonthCard = new MonthCard();
			card.type = msg.getByte();
			card.left = msg.getInt();
			card.rewarded = msg.getBoolean();
			this.month_cards[card.type] = card;
		}
	}
	public addClearPlayer(playerID: number) {
		if (this.getClearNumById(playerID) < GameDefine.CLEAR_FISHTANK_BY_ONE_MAX) {
			this.clearRecord.push(playerID);
		}
	}

	public get clearLen(): number {
		return this.clearRecord.length;
	}
	/*获得清理某人鱼缸次数*/
	public getClearNumById(playerID: number) {
		var n: number = 0;
		for (var i: number = 0; i < this.clearLen; i++) {
			if (this.clearRecord[i] == playerID) {
				n += 1;
			}
		}
		return n;
	}
	public get fishLen(): number {
		var n: number = 0;
		for (var key in this._fishs) {
			n++;
		}
		return n;
	}
	/**增加金币**/
	public addGold(param) {
		this.gold.add(param);
	}
	/**增加金币并更新显示**/
	public addGoldAndUpgrade(param) {
		this.gold.add(param);
		GameDispatcher.instance.dispatcherEventWith(GameEvent.PLAYER_CURRENCY_UPDATE, false, this);
	}
	/**增加金币并且开启服务端同步**/
	public addGoldAndOpenSync(param) {
		this.addGoldAndUpgrade(param);
		DataManager.instance.syncM.onOpenSync();
	}
	/**增加钻石**/
	public addDiamond(param) {
		this.diamond += param;
		if (this.diamond < 0)
			this.diamond = 0;
	}
	/**增加钻石并更新显示**/
	public addDiamondAndUpgrade(param) {
		this.diamond += param;
		GameDispatcher.instance.dispatcherEventWith(GameEvent.PLAYER_CURRENCY_UPDATE, false, this);
	}

	/**更新货币
	 * 	@symbol		对应符号值为：[-1,1];
	 * 
	 * **/
	public updateCurrency(model: ModelAward, symbol: number): void {
		switch (model.type) {
			case GOODS_TYPE.GOLD:
				this.addGoldAndUpgrade(model.num * symbol);
				break;
			case GOODS_TYPE.DIAMOND:
				this.addDiamondAndUpgrade(model.num * symbol);
				break;
		}
	}

	/**神器点相关**/
	public get artifact(): number {
		return this._artifact;
	}
	public addArtifact(param) {
		this._artifact += param;
		if (this._artifact < 0)
			this._artifact = 0;
	}
	public onParseAwardArtifact(msg: Message): void {
		// var fishId: number = msg.getInt();
		// var _crowndata: CrownData = this.getCrownInfoByID(fishId);
		// _crowndata.hasArtifact = true;
		// var modelFish: ModelFish = ModelManager.instance.modelFish[fishId];
		// this.addArtifact(modelFish.artifactNum);
		// GameCommon.instance.onShowAwardHint("reward_book_artifact", ModelAward.onParseByParam(GOODS_TYPE.ARTIFACT, 0, modelFish.artifactNum));
		// GameDispatcher.instance.dispatcherEventWith(GameEvent.FIELDGUIDE_REWARD_EVENT, false, fishId);
	}
	/**鱼食相关**/
	public set fishfood(value: number) {
		if (value != this._fishfood) {
			this._fishfood = value;
			GameDispatcher.instance.dispatcherEventWith(GameEvent.FISH_FOOD_UPDATE, false, this);
		}
	}
	public get fishfood(): number {
		return this._fishfood;
	}
	public getCurrency(type: number): number {
		switch (type) {
			case GOODS_TYPE.GOLD:
				return this.gold.num;
			case GOODS_TYPE.DIAMOND:
				return this.diamond;
			default:
				return 0;
		}
	}
	public getFishByLoction(loc: number): FishData[] {
		var ret: FishData[] = [];
		var data: FishData;
		for (var key in this._fishs) {
			data = this._fishs[key];
			if (data.model.yugangId == loc) {
				ret.push(data);
			}
		}
		return ret;
	}
	public getRandFishEvolution(): FishData {
		var ret: FishData[] = this.getFishByLoction(this.currFGID);
		if (ret.length > 0) {
			var rand: number = Math.floor(ret.length * Math.random());
			return ret[rand];
		}
		return null;
	}

	public getFishByID(id) {
		return this._fishs[id];
	}
	public getNewOneFish(id: number): FishData {
		var one: FishData = new FishData();
		one.setParam(id);
		this._fishs[one.id] = one;
		return one;
	}
	public delFishByUID(uid: number) {
		delete this._fishs[uid];
	}
	public onUpgradeAdvanceFish(id, add: number = 1) {
		var fData: FishData = this.getFishByID(id);
		fData.tier += add;
		fData.onUpdateSecOutput();
	}

	public getBookByID(id: number): BookData {
		return this._book[id];
	}
	public getUnlockBooks(): BookData[] {
		var books = [];
		for (var key in this._book) {
			books.push(this._book[key]);
		}
		return books;
	}

	public onUpdateBookLv(currID: number, add: number = 1): void {
		var b: BookData = this.getBookByID(currID);
		b.level += add;
	}
	public addBook(id: number): void {
		if (!this._book[id]) {
			this._book[id] = new BookData(id);
		}
		this.onUpdateSecOutput();
	}

	//拥有皇冠的个数
	public get crown() {
		// var data: CrownData;
		var n: number = 0;
		// for (var key in this._fishCrown) {
		// 	data = this._fishCrown[key];
		// 	n += data.crown;
		// }
		return n;
	}
	//通过鱼的IDs获得累计皇冠和总皇冠
	public getCrownHasAndTotalByPage(index: number): number[] {
		// var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[index];
		// if (!model) return [0, 0];
		var has: number = 0;
		var total: number = 0;
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
	}
	//获得鱼皇冠信息通过鱼的ID
	public getCrownInfoByID(fishID: number) {
		// return this._fishCrown[fishID];
		return null;
	}

	//升级鱼
	public onUpgradeFish(uid: number, add: number = 1): FishData {
		if (this._fishs[uid]) {
			this._fishs[uid].lv += add;
			this._fishs[uid].onUpdateSecOutput();
			this.onUpdateSecOutput();
			GameDispatcher.instance.dispatcherEventWith(GameEvent.FISH_UPGRADE_EVENT, false, uid);
		}
		return this._fishs[uid];
	}

	//获得鱼是否能够购买
	public getFishIsCanBuy(fishID: number): boolean {
		// var model: ModelFish = ModelManager.instance.modelFish[fishID];
		// var cData = this.getCrownInfoByID(fishID);
		// if (!cData.isUnlock) return false;
		// if (model) return this.getFishAndCrownSum(fishID) < model.starMax;
		return false;
	}
	public getFishAndCrownSum(fishID: number): number {
		var n: number = 0;
		n += this.getCrownHasNum(fishID);
		n += this.getFishHasNum(fishID);
		return n;
	}

	//获得某类鱼的个数
	public getFishHasNum(fishID: number): number {
		var n: number = 0;
		var fdata: FishData;
		for (var key in this._fishs) {
			fdata = this._fishs[key];
			if (fdata.id == fishID) {
				n++;
			}
		}
		return n;
	}
	//获得某类鱼的皇冠数
	public getCrownHasNum(fishID: number): number {
		var n: number = 0;
		// var data: CrownData;
		// data = this._fishCrown[fishID];
		// if (data) {
		// 	n += data.crown;
		// }
		return n;
	}
	// private getFishsUid(fishID: number): number[] {
	// 	var ret: number[] = [];
	// 	var data: FishData;
	// 	for (var key in this._fishs) {
	// 		data = this._fishs[key];
	// 		if (fishID == data.model.id) {
	// 			ret.push(data.uid);
	// 		}
	// 	}
	// 	return ret;
	// }
	private currSyncOutPut: SyneBase;
	public onTime() {
		if (!this.isInit) return;
		if (this.secOutput.num == 0) return;
		if (this.currSyncOutPut && (this.currSyncOutPut.timestamp == SyncFactory.onPackOutPutSec().timestamp)) return;
		this.currSyncOutPut = SyncFactory.onPackOutPutSec();
		this.addGoldAndUpgrade(this.secOutput);
		DataManager.instance.syncM.onAddMessage(this.currSyncOutPut);
		//egret.log("after output:" + this.gold.num);		
	}
	private currSecOutPut: InfiniteNumber;
	public onUpdateSecOutput() {
		this.currSecOutPut = new InfiniteNumber(this.secOutput.num);
		this.secOutput.num = 0;
		var sum: number = 0;
		var book: BookData;
		var fData: FishData;
		var model: ModelFieldGuide;
		for (var key in this._book) {
			book = this._book[key];
			model = ModelManager.instance.modelFieldGuide[`${book.id}_0`];
			for (var i: number = 0; i < model.fishId.length; i++) {
				fData = this._fishs[model.fishId[i]];
				if (fData) {
					sum += fData.secOutput;
				}
			}
		}
		sum = UnitDefine.getTrueValue(sum);
		this.secOutput.add(sum);
	}
	public showSubtractSecOutput(): void {
		var value: InfiniteNumber = new InfiniteNumber(this.secOutput.num - this.currSecOutPut.num);
		if (value.num > 0) {
			GameDispatcher.instance.dispatcherEventWith(GameEvent.SHOW_SECOUTPUT_ADD, false, value);
		}
	}
	public getSecOutputOneFishTank(bookID: number): InfiniteNumber {
		var sum: number = 0;
		var book: BookData = this._book[bookID];
		var model: ModelFieldGuide = book.model;
		var fData: FishData;
		for (var i: number = 0; i < model.fishId.length; i++) {
			fData = this._fishs[model.fishId[i]];
			if (fData) {
				sum += fData.secOutput;
			}
		}
		sum = UnitDefine.getTrueValue(sum);
		return new InfiniteNumber(sum);
	}
	/**是否解锁某鱼缸的全部鱼**/
	public getIsUnlockedAllFishByBook(bookID: number): boolean {
		var book: BookData = this._book[bookID];
		if (!book) return false;
		var model: ModelFieldGuide = book.model;
		var fData: FishData;
		for (var i: number = 0; i < model.fishId.length; i++) {
			fData = this._fishs[model.fishId[i]];
			if (!fData) return false;
		}
		return true;
	}

	public onCheckFishCanUpgrade(bookID: number): boolean {
		if (this.onCheckFishCanUnlock(bookID)) return true;
		if (this.onCheckFishCanAdvance(bookID)) return true;
		return false;
	}
	public onCheckFishCanUpgradeByID(fishID: number): boolean {
		if (this.onCheckFishCanUnlockByID(fishID)) return true;
		if (this.onCheckFishCanAdvanceByID(fishID)) return true;
		return false;
	}

	public onCheckFishCanAdvance(bookID): boolean {
		var book: BookData = this._book[bookID];
		if (!book) return false;
		var model: ModelFieldGuide = book.model;
		var fData: FishData;
		for (var i: number = 0; i < model.fishId.length; i++) {
			fData = this._fishs[model.fishId[i]];
			if (!fData) continue;
			if (this.onCheckFishCanAdvanceByID(fData.id)) return true;
		}
		return false;
	}
	public onCheckFishCanAdvanceByID(id: number): boolean {
		var fData: FishData = this._fishs[id];
		if (!fData) return false;
		var tierBase: UpgradeTierBase = fData.model.getTierBeginSecOutPut(fData.tier);
		if (fData.lv == tierBase.max && fData.lv != fData.model.maxLv) {//突破
			var price = tierBase.price;
			if (this.getCurrency(GOODS_TYPE.GOLD) >= price) return true;
		}
		return false;
	}
	public onCheckFishCanUnlock(bookID: number): boolean {
		var book: BookData = this._book[bookID];
		if (!book) return false;
		var model: ModelFieldGuide = book.model;
		var fData: FishData;
		for (var i: number = 0; i < model.fishId.length; i++) {
			fData = this._fishs[model.fishId[i]];
			if (!fData) {
				if (this.onCheckFishCanUnlockByID(parseInt(model.fishId[i]))) return true;
				break;
			}
		}
		return false;
	}

	public onCheckFishCanUnlockByID(id: number): boolean {
		var fData: FishData = this._fishs[id];
		if (fData) return false;
		var model: ModelFish = ModelManager.instance.modelFish[id];
		if (!model) return false;
		var price = model.jiage.num;
		if (this.getCurrency(GOODS_TYPE.GOLD) >= price) return true;
		return false;
	}

	public onCheckFTCanAdvance(): boolean {
		for (var key in this._book) {
			if (this.onCheckFTCanAdvanceByBID(parseInt(key))) return true;
		}
		return false;
	}

	public onCheckFTCanAdvanceByBID(bookID: number): boolean {
		var book: BookData = this._book[bookID];
		if (!book) return false;
		if (!book.nextModel) return false;
		var price = book.nextModel.cost.num;
		if (book.nextModel && this.getCurrency(GOODS_TYPE.GOLD) >= price && this.secOutput.num >= book.nextModel.tiaojian) return true;
		return false;
	}

	public onCheckDecorateRedPoint(bookID: number): boolean {
		return this.getCanDressUpBuweis(bookID);
	}

	public onCheckDecorateCanDressUp(bookID: number, buwei: DECORATE_TYPE): boolean {
		return this.getCanDressUpBuweis(bookID, buwei);
	}
	//通过鱼缸ID来获得还没装扮且可装扮的部位列表
	private getCanDressUpBuweis(bookID: number, buwei: number = -1): boolean {
		var decorateModel: ModelDecorate;
		for (var id in this.decorate_active) {
			decorateModel = ModelManager.instance.modelDecorate[id];
			if (buwei < 0 || buwei == decorateModel.buwei) {
				if (!this.decorate_show[bookID + "_" + decorateModel.buwei]) {
					return true;
				}
			}
		}
		return false;
	}

	public onCheckBookRedPointByBID(bookID: number): boolean {
		var book: BookData = this._book[bookID];
		if (!book) {
			if (this.onCheckBookCanUnlockByBID(bookID)) return true;
		} else {
			if (DataManager.instance.playerM.player.onCheckFishCanUpgrade(bookID)) return true;
			if (DataManager.instance.technology.onCheckRedPoint(bookID)) return true;
			if (DataManager.instance.playerM.player.onCheckDecorateRedPoint(bookID)) return true;
		}
		return false;
	}

	public onCheckBookCanUnlockByBID(bookID: number): boolean {
		var bl: boolean = this.getIsUnlockedAllFishByBook(bookID - 1);
		if (!bl) return false;
		var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[bookID + "_0"];
		var price: number = model.cost.num;
		if (this.getCurrency(GOODS_TYPE.GOLD) >= price) return true;
		return false;
	}



	public onUpdateSocOutPutByID(fishTankID: number): void {
		var fDatas = this.getFishByLoction(fishTankID);
		for (var i: number = 0; i < fDatas.length; i++) {
			fDatas[i].onUpdateSecOutput();
		}
	}

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
	public getBookLv(id: number): number {
		var lv = this._book[id];
		if (!lv)
			return 0;
		return lv.level;
	}

	public getDiamond() {
		return this.diamond;
	}

	public getGold() {
		return this.gold.num;
	}

}