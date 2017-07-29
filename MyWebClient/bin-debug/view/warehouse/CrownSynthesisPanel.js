var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CrownSynthesisPanel = (function (_super) {
    __extends(CrownSynthesisPanel, _super);
    function CrownSynthesisPanel(owner) {
        return _super.call(this, owner) || this;
    }
    CrownSynthesisPanel.prototype.onSkinName = function () {
        this.skinName = skins.CrownSynthesisPanelSkin;
    };
    CrownSynthesisPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    CrownSynthesisPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
    };
    CrownSynthesisPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    CrownSynthesisPanel.prototype.onRefresh = function () {
        this.itemLayer.removeChildren();
        var models = ModelManager.instance.modelSynthetic;
        var item;
        var model;
        for (var key in models) {
            model = models[key];
            if (model.type == 2) {
                item = new SynthesisItem();
                this.itemLayer.addChild(item);
            }
        }
    };
    return CrownSynthesisPanel;
}(BaseTabView));
__reflect(CrownSynthesisPanel.prototype, "CrownSynthesisPanel");
//# sourceMappingURL=CrownSynthesisPanel.js.map