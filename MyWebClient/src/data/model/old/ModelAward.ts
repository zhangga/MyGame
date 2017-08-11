class ModelAward {
	public type: number;
	public id: number;
	public _num: InfiniteNumber;
	public _price: InfiniteNumber;
	public constructor() {
	}
	public get numFormat(): string {
		return this._num.toTextFormat();
	}
	public get num(): number {
		return this._num.num;
	}
	public set num(param) {
		this._num.num = new InfiniteNumber(param).num;
	}

	public get price(): number {
		return this._price.num;
	}
	public set price(param) {
		this._price.num = new InfiniteNumber(param).num;
	}

	public static onParseByString(type_id_num: string): ModelAward {
		var model = new ModelAward();
		var param = type_id_num.split(",");
		if (param.length == 0) return model;
		model.type = parseInt(param[0]);
		if (param.length == 1) return model;
		model.id = parseInt(param[1]);
		if (param.length == 2) return model;
		model._num = new InfiniteNumber(param[2]);
		if (param.length == 3) return model;
		model._price = new InfiniteNumber(param[3]);
		return model;
	}

	public static onParseByParam(type: number, id: number, num: number): ModelAward {
		var model = new ModelAward();
		model.type = type;
		model.id = id;
		model._num = new InfiniteNumber(num);
		return model;
	}
	public static onParseQueueByString(param: string): ModelAward[] {
		var ret: ModelAward[] = [];
		var awardStrAry: string[];
		if (param.indexOf("#") >= 0) {
			awardStrAry = param.split("#");
		} else {
			awardStrAry = param.split(";");
		}
		for (var i: number = 0; i < awardStrAry.length; i++) {
			ret.push(this.onParseByString(awardStrAry[i]));
		}
		return ret;
	}
	public static onParseParams(params: string): string[] {
		var param = params.split(",");
		return param;
	}
	public copy(): ModelAward {
		return ModelAward.onParseByParam(this.type, this.id, this.num);
	}
}