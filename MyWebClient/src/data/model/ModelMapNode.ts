class ModelMapNode extends ModelBase {
    public nodeId;//格子编号
    public nodeType;//格子类型
    public areaIndex = 0;//对应区域
    public colIndex: number;//格子所在的列 从0开始 ==Grid.x
    public rowIndex: number;//格子所在的行 从0开始 ==Grid.y
    public findNode: FindNode;//寻路用父节点

    public constructor() {
        super();
        this.findNode = new FindNode();
    }
    public parseXML(result: egret.XML) {
        super.parseXML(result);
        this.nodeId = this.id;
        this.nodeType = this.getXmlValueNumber(result, "type");
        this.areaIndex = this.getXmlValue(result, "area");
    }

    public toGrid(): Grid {
        return new Grid(this.colIndex, this.rowIndex);
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
class FindNode {
    public parentNodeId;
    public gValue;
    public hValue;
    public onReset(): void {
        this.parentNodeId = null;
        this.gValue = null;
        this.hValue = null;
    }
}