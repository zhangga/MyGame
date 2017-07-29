class ModelSynthetic extends ModelBase {
	public type: number;
	public cost: ModelAward[];
	public reward: ModelAward;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.type = this.getXmlValueNumber(result, "type");
		this.cost = ModelAward.onParseQueueByString(this.getXmlValue(result, "cost"));
		this.reward = ModelAward.onParseByString(this.getXmlValue(result, "reward"));
	}
}