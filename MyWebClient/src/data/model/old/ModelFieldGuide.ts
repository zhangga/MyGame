class ModelFieldGuide extends ModelBase {
	public name: string;
	public waixing: string;
	public type: number;
	public tiaojian: number;
	public uid: number;
	public icon: string;
	public cost: ModelAward;
	public fishId: string[];
	public kejiId: string[];
	public tier: number;
	public limit: number = 500;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.name = this.getXmlValue(result, "name");
		this.waixing = this.getXmlValue(result, "waixing");
		var jieduan = ModelAward.onParseParams(this.getXmlValue(result, "jieduan"));
		this.tier = parseInt(jieduan[0]);
		this.limit = parseInt(jieduan[1]);
		this.tiaojian = this.getXmlValue(result, "tiaojian");
		this.fishId = ModelAward.onParseParams(this.getXmlValue(result, "fishId"));
		this.uid = this.getXmlValue(result, "id");
		this.type = this.getXmlValueNumber(result, "type");
		this.icon = this.getXmlValue(result, "icon");
		this.kejiId = ModelAward.onParseParams(this.getXmlValue(result, "kejiId"));
		this.cost = ModelAward.onParseByString(this.getXmlValue(result, "cost"));
		this.id = `${this.type}_${this.tier}`
	}
}