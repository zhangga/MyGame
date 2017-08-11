class ModelEffect extends ModelBase {
	public type: number;
	public effect: number;//多少秒的秒产效果
	public time: number;//持续多少秒
	public desc: string;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.type = this.getXmlValueNumber(result, "type");
		var xmlEffect: string[] = ModelAward.onParseParams(this.getXmlValue(result, "effect"));
		this.effect = parseInt(xmlEffect[0]);
		this.time = xmlEffect.length > 0 ? parseInt(xmlEffect[1]) : 0;
		this.desc = this.getXmlValue(result, "desc");
	}
}