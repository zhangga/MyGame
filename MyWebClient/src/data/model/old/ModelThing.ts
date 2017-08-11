// TypeScript file
class ModelThing extends ModelBase {
    public name;
    public icon;
    public dropicon;
    public quality;
    public level;
    public type;
    public des;
    public price;
    public useful;
    public gotype;
    public tujing;
    public limitTime;
    public payIcon: string;
    public constructor() {
        super();
    }
    public parseXML(result: egret.XML) {
        this.id = this.getXmlValueNumber(result, "id");
        this.name = this.getXmlValue(result, "name");
        this.icon = this.getXmlValue(result, "icon");
        this.dropicon = this.getXmlValue(result, "Dropicon");
        this.quality = this.getXmlValueNumber(result, "quality") ? this.getXmlValueNumber(result, "quality") : 0;
        this.level = this.getXmlValueNumber(result, "level");
        // this.type = this.getXmlValueNumber(result, "type");
        this.des = this.getXmlValue(result, "des");
        this.price = this.getXmlValue(result, "price");
        this.useful = this.getXmlValueNumber(result, "useful");
        this.gotype = this.getXmlValueNumber(result, "gotype");
        this.tujing = this.getXmlValue(result, "tujing");
    }
    //The end
}
enum GoodsQuality {
    /** 物品品质 */
    White = 0,
    Green = 1,
    Blue = 2,
    Purple = 3,
    Orange = 4,
    Red = 5,
}