class ModelSevenLogin extends ModelBase {
	public reward: ModelAward[];
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.reward = ModelAward.onParseQueueByString(this.getXmlValue(result, "reward"));
	}
}