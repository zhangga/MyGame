class ModelRandEvent extends ModelBase {
	public type: number;
	public effect: string[];
	public gailv: number;
	public time: number;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		this.type = this.getXmlValueNumber(result, "type");
		this.effect = ModelAward.onParseParams(this.getXmlValue(result, "effect"));
		this.gailv = this.getXmlValueNumber(result, "gailv");
		this.time = this.getXmlValueNumber(result, "time");
		this.id = this.type;
	}
}