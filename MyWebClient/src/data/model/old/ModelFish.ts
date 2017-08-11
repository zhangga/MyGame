class ModelFish extends ModelBase {
	public name: string;
	public desc: string;
	public icon: string;
	public waixing: string;
	public pinzhi: number;
	public tiaojian: ModelAward[];
	public kejiId: string[];
	public yugangId: number;
	public jieduan: ModelAward[];
	public baseSecOutPut: InfiniteNumber;
	public addSecOutPut: InfiniteNumber;
	public paochanTime: number;
	public tier;
	public _secOutPut: number;
	public jiage: ModelAward;
	public jiagexishu: number;
	public maxLv: number;
	public size: egret.Point;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.name = this.getXmlValue(result, "name");
		this.waixing = this.getXmlValue(result, "waixing");
		this.pinzhi = this.getXmlValueNumber(result, "pinzhi");
		this.kejiId = ModelAward.onParseParams(this.getXmlValue(result, "kejiId"));
		this.paochanTime = this.getXmlValueNumber(result, "paochanTime");
		var param = this.getXmlValue(result, "tiaojian");
		if (param) {
			this.tiaojian = ModelAward.onParseQueueByString(param);
		} else {
			this.tiaojian = [ModelAward.onParseByString("0")];
		}
		this.jiage = ModelAward.onParseByString(this.getXmlValue(result, "jiage"));
		this.jiagexishu = this.getXmlValueNumber(result, "jiagexishu");
		this.jieduan = ModelAward.onParseQueueByString(this.getXmlValue(result, "jieduan"));
		this.icon = this.getXmlValue(result, "icon");
		this.desc = this.getXmlValue(result, "desc");
		this.yugangId = this.getXmlValueNumber(result, "yugangId");
		this.size = new egret.Point(this.getXmlValueNumber(result, "kuan"), this.getXmlValueNumber(result, "gao"));
		var arr: string[] = ModelAward.onParseParams(this.getXmlValue(result, "miaochan"));
		this.baseSecOutPut = new InfiniteNumber(arr[0]);
		this.addSecOutPut = new InfiniteNumber(arr[1]);
		this.tier = {};
		var currBase = this.getTierBeginSecOutPut(this.jieduan.length - 1);
		this.maxLv = currBase.max;
	}
	public getTierBeginSecOutPut(currTier: number): UpgradeTierBase {
		var currBase: UpgradeTierBase = this.tier[currTier];
		if (!currBase) {
			this.tier[currTier] = currBase = new UpgradeTierBase(currTier);
			currBase.min = 1;
			var before: ModelAward = this.jieduan[currTier - 1];
			var curr: ModelAward = this.jieduan[currTier];
			currBase.max = 1
			if (before) {
				currBase.min = before.id;
			}
			if (curr) {
				currBase.max = curr.id;
			}
			currBase.price = curr.price;
			currBase.lvCount = currBase.max - currBase.min;
			currBase.addPercent = curr.num;
			if (currTier == 0) {
				currBase.startSecOutPut = this.baseSecOutPut.num;
			} else {
				var beforeBase: UpgradeTierBase = this.getTierBeginSecOutPut(currTier - 1);
				currBase.startSecOutPut = (beforeBase.startSecOutPut + (beforeBase.lvCount) * this.addSecOutPut.num) * (1 + beforeBase.addPercent / UnitDefine.BASE_PERCENTAGE);
			}
		}
		return currBase;
	}

	public getBuyNum(lv: number): number {


		return 0;
	}

}
class UpgradeTierBase {
	public id: number;
	public min: number = 1;
	public max: number;
	public addPercent: number;
	public lvCount: number;
	public price: number;
	public startSecOutPut: number;//根据递归算法求得

	public constructor(id) {
		this.id = id;
	}
}
