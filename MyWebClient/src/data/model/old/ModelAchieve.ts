class ModelAchieve extends ModelBase {
	public icon: string;
	public goType: number;
	public name: string;
	public reward: ModelAward;
	public start: number;
	public dist: number;
	public end: number;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		this.id = this.getXmlValueNumber(result, "id");
		this.icon = this.getXmlValue(result, "icon");
		this.goType = this.getXmlValueNumber(result, "goType");
		this.name = this.getXmlValue(result, "name");
		this.start = this.getXmlValueNumber(result, "start");
		this.dist = this.getXmlValueNumber(result, "dist");
		this.end = this.getXmlValueNumber(result, "end");
		this.reward = ModelAward.onParseByString(this.getXmlValue(result, "reward"));
	}
}