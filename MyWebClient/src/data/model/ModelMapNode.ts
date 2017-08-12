class ModelMapNode extends ModelBase {
    public grid: Grid;
    public nodeType: number;//格子类型
    public areaIndex: number = 0;//对应区域

    public constructor() {
        super();
    }
    public parseXML(result: egret.XML) {
        this.grid = GameCommon.instance.parseGrid(this.getXmlValue(result, "grid"));
        this.nodeType = this.getXmlValueNumber(result, "type");
        this.areaIndex = this.getXmlValueNumber(result, "area");
    }

    public get isCanWalk(): boolean {
        return this.nodeType != MAP_GRID_TYPE.COLLSION;
    }

    public get isCover(): boolean {
        return this.nodeType == MAP_GRID_TYPE.COVER;
    }

    public get isJump(): boolean {
        return this.nodeType == MAP_GRID_TYPE.JUMP;
    }
}
