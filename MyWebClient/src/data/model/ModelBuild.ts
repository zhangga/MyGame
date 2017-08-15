class ModelBuild extends ModelBase {

    public name: string;
    public type: BUILD_TYPE;
    public grid: Grid;
    public prefab: string;

    public constructor() {
		super();
	}

    public parseXML(result: egret.XML) {
        super.parseXML(result);
		this.name = this.getXmlValue(result, "name");
        this.type = this.getXmlValueNumber(result, "type");
        this.grid = GameCommon.instance.parseGrid(this.getXmlValue(result, "grid"));
        this.prefab = this.getXmlValue(result, "prefab");
	}

}