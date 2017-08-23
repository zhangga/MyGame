/**
 * 精灵管理器
 */
class SpriteManager {

    //地图层
    private _mapLayer: MapLayer;

    //派遣出去的军队列表
    private _activeArmys: Array<ActiveArmy> = [];

    private static _instance: SpriteManager;
    public static get instance(): SpriteManager {
        if (!this._instance) {
            this._instance = new SpriteManager();
        }
        return this._instance;
    }
    private constructor() {

    }

    /**
     * 每帧执行
     */
    public onTick(): void {
        this.moveHandler();
        this.logicHandler();
    }

    //处理逻辑
    private logicHandler(): void {

    }

    //处理移动
    private moveHandler(): void {
        for (var i = 0; i < this._activeArmys.length; i++) {
            var army: ActiveArmy = this._activeArmys[i];
            army.onMove();
        }
    }

    //派遣军队
    public dispatchArmy(armyVo: ArmyVo, start: Grid, end: Grid): void {
        //精灵
        var activeArmy: ActiveArmy = new ActiveArmy();
        //数据
        activeArmy.data = armyVo;
        activeArmy.initBodyLayer();
        activeArmy.setPoint(start.toPoint());
        this._activeArmys.push(activeArmy);
        this._mapLayer.addSprite(activeArmy);

        //路径
        var path = PathManager.instance.find(start, end);
        activeArmy.setMovePath(path);
    }

    public set mapLayer(mapLayer: MapLayer) {
        this._mapLayer = mapLayer;
    }

}