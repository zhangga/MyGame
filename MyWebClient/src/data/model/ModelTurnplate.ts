class ModelTurnplate extends ModelBase {
	public effectId: number;
	public icon: string;
	public reward: ModelAward;
	public gailv: number;

	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.effectId = this.getXmlValueNumber(result, "effectId");
		this.icon = this.getXmlValue(result, "icon");
		this.reward = ModelAward.onParseByString(this.getXmlValue(result, "reward"));
		this.gailv = this.getXmlValueNumber(result, "gailv");
	}
}