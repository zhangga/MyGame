class ModelMonthCard extends ModelBase {
	public id: number;
	public name: string;
	public rewards: string;
    public keepDay: number;
    public diejia: boolean;
    public effect: number;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.id = this.getXmlValueNumber(result, "id");
		this.name = this.getXmlValue(result, "name");
		this.rewards = this.getXmlValue(result, "rewards");
        this.keepDay = this.getXmlValueNumber(result, "keepDay");
        this.diejia = this.getXmlValueNumber(result, "diejia") == 1;
        this.effect = this.getXmlValueNumber(result, "effect");
	}
}