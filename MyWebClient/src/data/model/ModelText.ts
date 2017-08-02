class ModelText extends ModelBase {
	private cn: string;
	public constructor() {
		super();
	}
	public parseXML(result: egret.XML) {
		super.parseXML(result);
		this.cn = this.getXmlValue(result, "cn");
	}
	public get local(): string {
		var local: string = "";
		switch (Language.instance.type) {
			case LANGUAGE_TYPE.CN:
				local = this.cn;
				break;
			case LANGUAGE_TYPE.EN:
				local = this.cn;
				break;
		}
		return local;
	}
}