var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishTankLayer = (function (_super) {
    __extends(FishTankLayer, _super);
    function FishTankLayer() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.FishTankLayerSkin;
        return _this;
    }
    FishTankLayer.prototype.onAddAnimation = function () {
        this.shine = new Animation("yanggguang");
        this.shine.x = 300;
        this.shine.y = 341;
        this.animLayer.addChild(this.shine);
        this.bubble = new Animation("shuipao", 1);
        this.bubble.x = 240;
        this.bubble.y = 636;
        this.animLayer.addChild(this.bubble);
        this.bubble1 = new Animation("shuipao", 1);
        this.bubble1.x = 445;
        this.bubble1.y = 566;
        this.animLayer.addChild(this.bubble1);
        this.bubble2 = new Animation("shuipao", 1);
        this.bubble2.x = 140;
        this.bubble2.y = 534;
        this.animLayer.addChild(this.bubble2);
        this.ripple = new Animation("shuibowen");
        this.ripple.x = 300;
        this.ripple.y = 120;
        this.animLayer.addChild(this.ripple);
        this.onbubble();
        this.onbubble1();
        this.onbubble2();
    };
    FishTankLayer.prototype.onbubble = function () {
        this.bubble.playFinishCallBack(this.bubblePlayDone, this);
        this.bubble.visible = true;
        this.bubble.playNum = 1;
    };
    FishTankLayer.prototype.bubblePlayDone = function () {
        this.bubble.visible = false;
        var param = Tool.rand(2, 3, 1000);
        Tool.callbackTime(this.onbubble, this, param);
    };
    FishTankLayer.prototype.onbubble1 = function () {
        this.bubble1.playFinishCallBack(this.bubble1PlayDone, this);
        this.bubble1.visible = true;
        this.bubble1.playNum = 1;
    };
    FishTankLayer.prototype.bubble1PlayDone = function () {
        this.bubble1.visible = false;
        var param = Tool.rand(3, 3, 1000);
        Tool.callbackTime(this.onbubble1, this, param);
    };
    FishTankLayer.prototype.onbubble2 = function () {
        this.bubble2.playFinishCallBack(this.bubble2PlayDone, this);
        this.bubble2.visible = true;
        this.bubble2.playNum = 1;
    };
    FishTankLayer.prototype.bubble2PlayDone = function () {
        this.bubble2.visible = false;
        var param = Tool.rand(4, 3, 1000);
        Tool.callbackTime(this.onbubble2, this, param);
    };
    FishTankLayer.prototype.onRegist = function () {
    };
    FishTankLayer.prototype.onRemove = function () {
    };
    /**
     * 刷新显示背景
     */
    FishTankLayer.prototype.onRefreshBg = function (id, lv) {
        var model = ModelManager.instance.modelFieldGuide[id + "_" + lv];
        if (!model)
            return;
        var waixingstr = model.waixing.slice(0, model.waixing.length - 5);
        this.fishtank_bg_back.source = waixingstr + "1_png";
        this.fishtank_bg_font.source = model.waixing;
    };
    /**
     * 刷新显示部位
     */
    FishTankLayer.prototype.onRefreshPart = function (tankId, decorate_show) {
        this.fishtank_dec_1.source = "";
        this.fishtank_dec_2.source = "";
        this.fishtank_dec_3.source = "";
        //遍历所有的装饰
        for (var i = 1; i <= DECORATE_TYPE.SIZE; i++) {
            var shenqiId = decorate_show[tankId + "_" + i];
            var model = ModelManager.instance.modelDecorate[shenqiId];
            if (!model)
                continue;
            this["fishtank_dec_" + i].source = model.waixing;
        }
    };
    /**
     * 刷新鱼缸显示
     */
    FishTankLayer.prototype.onRefreshShow = function (id, lv, decorate_show) {
        this.onRefreshBg(id, lv);
        this.onRefreshPart(id, decorate_show);
    };
    return FishTankLayer;
}(BaseUI));
__reflect(FishTankLayer.prototype, "FishTankLayer");
//# sourceMappingURL=FishTankLayer.js.map