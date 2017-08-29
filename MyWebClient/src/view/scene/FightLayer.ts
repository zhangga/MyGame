/**
 * 战斗场景层
 */
class FightLayer extends egret.DisplayObjectContainer {

    private static MIN_WIDTH: number = 1/4;
    private static MIN_HEIGHT: number = 1/5;

    private layer: eui.Group;

    //地图
    private mapImg: eui.Image;

    //全屏
    private full: boolean = false;

    public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

    private onAddToStage(): void {
		this.onInit();
	}

    public onInit(): void {
        this.layer = new eui.Group;
        this.mapImg = new eui.Image();
        this.addChild(this.layer);
        this.setMinSize();
        //地图
        this.mapImg.source = "zzq2_jpg";
        // this.mapImg.source = "";
        this.mapImg.x = 0;
        this.mapImg.y = 0;
        this.layer.addChildAt(this.mapImg, 0);

        this.onRegist();
    }

    public onRegist(): void {
        this.mapImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMap, this);
    }

    public onReset(): void {
		
	}

    //点击战斗场景
    private onClickMap(): void {
        if (this.full) {
            this.setMinSize();
            this.full = false;
        }
        else {
            this.setMaxSize();
            this.full = true;
        }
    }

    //最小化
    private setMinSize(): void {
        this.layer.width = _GF.stageWidth * FightLayer.MIN_WIDTH;
        this.layer.height = _GF.stageHeight * FightLayer.MIN_HEIGHT;
        this.layer.x = _GF.stageWidth - this.layer.width;
        this.layer.y = 0;
        //地图
        this.mapImg.scaleX = FightLayer.MIN_WIDTH;
        this.mapImg.scaleY = FightLayer.MIN_HEIGHT;
    }

    //最大化
    private setMaxSize(): void {
        this.layer.width = _GF.stageWidth;
        this.layer.height = _GF.stageHeight;
        this.layer.x = 0;
        this.layer.y = 0;
        //地图
        this.mapImg.scaleX = 1;
        this.mapImg.scaleY = 1;
    }

    /**战斗场景层尺寸变化 */
    public onResizeLayer(): void {

    }

}