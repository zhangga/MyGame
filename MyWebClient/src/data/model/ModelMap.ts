class ModelMap extends ModelBase {

    public name: string;
    //地图宽高
    public width: number;
    public height: number;
    //地图初始摄像机位置
    public camera: Grid;
    //资源编号
    public resource: number;

    public constructor() {
		super();
	}

	public parseXML(result: egret.XML) {
        super.parseXML(result);
		this.name = this.getXmlValue(result, "name");
        this.width = this.getXmlValueNumber(result, "width");
        this.height = this.getXmlValueNumber(result, "height");
        this.camera = GameCommon.instance.parseGrid(this.getXmlValue(result, "camera"));
        this.resource = this.getXmlValueNumber(result, "resource");
	}

}