class ModelDecorate extends ModelBase {
    public name: string;
    public waixing: string;
    public buwei: number;
    public icon: string;
    public pinzhi: number;

    public parseXML(result: egret.XML) {
        super.parseXML(result);
        this.name = this.getXmlValue(result, "name");
		this.waixing = this.getXmlValue(result, "waixing");
        this.buwei = this.getXmlValueNumber(result, "buwei");
        this.icon = this.getXmlValue(result, "icon");
        this.pinzhi = this.getXmlValueNumber(result, "pinzhi");
    }

    private static QUALITY_PERCENT = [100,200,500,1000,2000];
    public static getEffect(quality: number, lv: number): number {
        return ModelDecorate.QUALITY_PERCENT[quality]*lv;
    }

}