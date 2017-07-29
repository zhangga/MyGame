class ModelItem extends ModelThing {
	public type: number;
	public name: string;
	public icon: string;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.type = this.getXmlValueNumber(result, "type");
		this.name = this.getXmlValue(result, "name");
		this.icon = this.getXmlValue(result, "icon");
	}
}