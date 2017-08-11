class ModelFishLv extends ModelBase {
	public lv: number;
	public commonReward: ModelAward;
	public bubbleTime: number;
	public bubbleReward: ModelAward[];
	public lvConsume: ModelAward;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.lv = this.getXmlValueNumber(result, "lv");
		this.commonReward = ModelAward.onParseByString(this.getXmlValue(result, "commonReward"));
		this.bubbleTime = this.getXmlValueNumber(result, "bubbleTime");
		this.bubbleReward = ModelAward.onParseQueueByString(this.getXmlValue(result, "bubbleReward"));
		this.lvConsume = ModelAward.onParseByString(this.getXmlValue(result, "lvConsume"));
		this.id = `${this.id}_${this.lv}`;
	}
}