var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SystemSetPanel = (function (_super) {
    __extends(SystemSetPanel, _super);
    function SystemSetPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    SystemSetPanel.prototype.onSkinName = function () {
        this.skinName = skins.SystemSetPanelSkin;
    };
    SystemSetPanel.prototype.onInit = function () {
        this.setTitle("");
        this.player_name_label.text = this.player.name;
        this.player_id_label.text = "ID：" + this.player.id;
        this.version_label.text = "版本号：" + _GF.version;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    SystemSetPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
    };
    SystemSetPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    SystemSetPanel.prototype.onRefresh = function () {
    };
    Object.defineProperty(SystemSetPanel.prototype, "player", {
        get: function () {
            return DataManager.instance.playerM.player;
        },
        enumerable: true,
        configurable: true
    });
    return SystemSetPanel;
}(BaseWindowPanel));
__reflect(SystemSetPanel.prototype, "SystemSetPanel");
//# sourceMappingURL=SystemSetPanel.js.map