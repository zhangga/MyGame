class ModelDecorateLv extends ModelBase {
    public selfId: number;
    public lv: number;
    public effect: number;

    public parseXML(result: egret.XML) {
        this.selfId = this.getXmlValueNumber(result, "id");
        this.lv = this.getXmlValueNumber(result, "lv");
        this.id = this.selfId+"_"+this.lv;
        this.effect = this.getXmlValueNumber(result, "effect");
    }
}