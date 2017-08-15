/**
 * 建筑显示对象
 */
class ActiveBuild extends egret.DisplayObjectContainer {

    private _data: BuildVo;

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
        var img: eui.Image = new eui.Image();
        img.source = "build_city_1_png";
        this.bodyLayer.addChild(img);
    }

}