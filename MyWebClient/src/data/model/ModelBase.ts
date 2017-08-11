/**
 *
 * @author 
 *
 */
abstract class ModelBase {
    public id;// 模板编号

    public constructor() { }

    public parseXML(result: egret.XML) {
        this.id = this.getXmlValue(result, "id");
    }

    public getXmlValue(xml: egret.XML, key) {
        return xml.attributes[key];
    }

    public getXmlValueNumber(xml: egret.XML, key): number {
        return parseInt(this.getXmlValue(xml, key) ? this.getXmlValue(xml, key) : 0);
    }

}
