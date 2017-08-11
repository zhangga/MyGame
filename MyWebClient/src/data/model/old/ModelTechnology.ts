class ModelTechnology extends ModelBase {
	public tid: number;
	public type: number;
	public name: string;
	public level: number;
	public baifenbi: number;
	public cost: ModelAward;
	public costType: number;
	public icon: string;

	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		this.tid = this.getXmlValueNumber(result, "id");
		this.type = this.getXmlValueNumber(result, "type");
		this.name = this.getXmlValue(result, "name");
		this.level = this.getXmlValueNumber(result, "lv");
		this.icon = this.getXmlValue(result, "icon");
		this.baifenbi = this.getXmlValueNumber(result, "baifenbi");
		this.cost = ModelAward.onParseByString(this.getXmlValue(result, "cost"));
		this.id = this.tid + "_" + this.level;
	}
}