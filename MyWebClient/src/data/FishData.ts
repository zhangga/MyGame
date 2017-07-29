class FishData {
	public lv: number = 1;
	public id: number;
	public tier: number = 0;
	public currOutPut: number;
	private _secOutput: number;
	private _bubbleOutput: number;
	public constructor() {
	}
	public onParseMessage(msg: Message) {
		this.id = msg.getInt();
		this.lv = msg.getShort();
		this.tier = msg.getByte();
		this.onUpdateSecOutput();
	}
	public setParam(id: number = 1, lv: number = 1): void {
		this.id = id;
		this.lv = lv;
		this.onUpdateSecOutput();
	}
	public onUpdate(): void {
	}
	public get model(): ModelFish {
		return ModelManager.instance.modelFish[this.id];
	}
	public get moveRes(): string {
		return `${this.model.waixing}_move`;
	}
	public get turnRes(): string {
		return `${this.model.waixing}_turn`;
	}
	public onUpdateSecOutput() {
		var base: UpgradeTierBase = this.model.getTierBeginSecOutPut(this.tier);
		this._secOutput = base.startSecOutPut + (Math.min(this.lv, base.max) - base.min) * this.model.addSecOutPut.num;
		this._bubbleOutput = this._secOutput * this.model.paochanTime;//只计算升级所带来的收益秒产
		/**修改this._secOutput添加科技和鱼缸带来的收益**/
		var _technologyModel: ModelTechnology;
		var _technologyIDs: string[] = [];
		var _fishtankModel: ModelFieldGuide = ModelManager.instance.modelFieldGuide[this.model.yugangId + "_0"];
		for (var i: number = 0; i < _fishtankModel.kejiId.length; i++) {
			_technologyIDs.push(_fishtankModel.kejiId[i]);
		}
		for (var i: number = 0; i < this.model.kejiId.length; i++) {
			_technologyIDs.push(this.model.kejiId[i]);
		}

		for (var i: number = 0; i < _technologyIDs.length; i++) {
			_technologyModel = DataManager.instance.technology.getCurrModel(parseInt(_technologyIDs[i]));
			if (!_technologyModel)
				continue;
			switch (_technologyModel.type) {
				case TECHNOLOGY_TYPE.SECOUTPUT:
				case TECHNOLOGY_TYPE.FISHTANK_SECOUT:
					this._secOutput = this._secOutput * (_technologyModel.baifenbi + 100) / 100;
					break;
				case TECHNOLOGY_TYPE.COMEIN:
					this._bubbleOutput = this._bubbleOutput * (_technologyModel.baifenbi + 100) / 100;
					break;
			}
		}
	}
	public get secOutput(): number {
		return this._secOutput;
	}
	public get bubbleOutput(): number {
		return this._bubbleOutput;
	}
}
enum FISH_POST {
	BAG = 0,//背包
	WATERVAT = 1//水缸
}