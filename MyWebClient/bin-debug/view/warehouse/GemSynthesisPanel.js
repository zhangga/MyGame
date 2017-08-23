var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GemSynthesisPanel = (function (_super) {
    __extends(GemSynthesisPanel, _super);
    function GemSynthesisPanel(owner) {
        return _super.call(this, owner) || this;
    }
    GemSynthesisPanel.prototype.onSkinName = function () {
        this.skinName = skins.GemSynthesisPanelSkin;
    };
    GemSynthesisPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    GemSynthesisPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
    };
    GemSynthesisPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    GemSynthesisPanel.prototype.onRefresh = function () {
        this.itemLayer.removeChildren();
        var models = ModelManager.instance.modelSynthetic;
        var item;
        var model;
        for (var key in models) {
            model = models[key];
            if (model.type == 1) {
                item = new SynthesisItem();
                this.itemLayer.addChild(item);
            }
        }
    };
    return GemSynthesisPanel;
}(BaseTabView));
__reflect(GemSynthesisPanel.prototype, "GemSynthesisPanel");
var SynthesisItem = (function (_super) {
    __extends(SynthesisItem, _super);
    function SynthesisItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.SynthesisItemSkin;
        return _this;
    }
    SynthesisItem.prototype.onInit = function () {
    };
    return SynthesisItem;
}(BaseComp));
__reflect(SynthesisItem.prototype, "SynthesisItem");
//# sourceMappingURL=GemSynthesisPanel.js.map