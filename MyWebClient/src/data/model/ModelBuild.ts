class ModelBuild extends ModelBase {

    public name: string;
    public type: EBuildType;
    public grid: Grid;
    public icon: string;
    public gate: Grid;

    public constructor() {
		super();
	}

    public parseXML(result: egret.XML) {
        super.parseXML(result);
		this.name = this.getXmlValue(result, "name");
        this.type = this.getXmlValueNumber(result, "type");
        this.grid = GameCommon.instance.parseGrid(this.getXmlValue(result, "grid"));
        this.icon = this.getXmlValue(result, "icon");
        this.gate = GameCommon.instance.parseGrid(this.getXmlValue(result, "gate"));
	}

}