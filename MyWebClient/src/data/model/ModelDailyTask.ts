class ModelDailyTask extends ModelBase {
	public icon: string;
	public goType: number;
	public name: string;
	public effectId: number;
	public count: number;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		this.id = this.getXmlValueNumber(result, "id");
		this.icon = this.getXmlValue(result, "icon");
		this.goType = this.getXmlValueNumber(result, "goType");
		this.name = this.getXmlValue(result, "name");
		this.count = this.getXmlValueNumber(result, "count");
		this.effectId = this.getXmlValueNumber(result, "reward");
	}
}