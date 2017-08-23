abstract class ModelBuildLvBase extends ModelBase {

    public buildId: number;
    public buildLv: number;
    public prefab: string;
    public unlock: ConditionData;
    public cost: ConditionData;

    public constructor() {
		super();
	}

    public parseXML(result: egret.XML) {
        //建筑ID_建筑等级
        this.buildId = this.getXmlValueNumber(result, "id");
		this.buildLv = this.getXmlValueNumber(result, "lv");
        this.id = this.buildId + GameDefine.UNDERLINE + this.buildLv;
        this.prefab = this.getXmlValue(result, "prefab");
        this.unlock = GameCommon.instance.parseCondition(this.getXmlValue(result, "unlock"));
        this.cost = GameCommon.instance.parseCondition(this.getXmlValue(result, "cost"));
	}

}