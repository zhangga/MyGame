class ModelText extends ModelBase {
	public local: string;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.local = this.getXmlValue(result, "local");
	}
}