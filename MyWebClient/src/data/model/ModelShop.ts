class ModelShop extends ModelBase {
	public type: number;
	public reward: ModelAward;
	public cosume: ModelAward[];
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.type = this.getXmlValueNumber(result, "type");
		this.reward = ModelAward.onParseByString(this.getXmlValue(result, "rewrad"));
		this.cosume = ModelAward.onParseQueueByString(this.getXmlValue(result, "cosume"));
	}
}