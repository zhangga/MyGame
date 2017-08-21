/**
 * 建筑显示对象
 */
class ActiveBuild extends egret.DisplayObjectContainer {

    //建筑ID
    private _id: number;

    //模型层
    private bodyLayer: egret.DisplayObjectContainer;
    //特效层
    private effectLayer: egret.DisplayObjectContainer;

    public constructor() {
        super();
        //所有层级
		this.bodyLayer = new egret.DisplayObjectContainer();
		this.addChildAt(this.bodyLayer, 0);
		this.effectLayer = new egret.DisplayObjectContainer();
		this.addChildAt(this.effectLayer, 1);
    }

    /**初始化模型 */
    public initBodyLayer(): void {
        var model: ModelBuild = this.model;
        var img: eui.Image = new eui.Image();
        img.source = model.prefab;
        this.bodyLayer.addChild(img);
        this.x = model.grid.toPoint().x;
        this.y = model.grid.toPoint().y;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get id(): number {
        return this._id;
    }

    public get model(): ModelBuild {
        return MapInfo.instance.MapBuildXmlData[this._id];
    }

    public get buildVo(): BuildVo {
        return null;
    }

}