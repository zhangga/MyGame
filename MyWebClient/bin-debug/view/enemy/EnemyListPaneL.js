var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EnemyListPaneL = (function (_super) {
    __extends(EnemyListPaneL, _super);
    function EnemyListPaneL(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    EnemyListPaneL.prototype.onSkinName = function () {
        this.skinName = skins.EnemyListPaneLSkin;
    };
    EnemyListPaneL.prototype.onInit = function () {
        this.setTitle("feed_enemy_title_png");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    EnemyListPaneL.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
    };
    EnemyListPaneL.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    EnemyListPaneL.prototype.onRefresh = function () {
        this.itemLayer.removeChildren();
        var list = DataManager.instance.enemy.list;
        var len = list.length;
        // var len: number = 10;
        var item;
        for (var i = 0; i < len; i++) {
            item = new EnemyListItem();
            item.data = list[i];
            this.itemLayer.addChild(item);
        }
    };
    return EnemyListPaneL;
}(BaseWindowPanel));
__reflect(EnemyListPaneL.prototype, "EnemyListPaneL");
var EnemyListItem = (function (_super) {
    __extends(EnemyListItem, _super);
    function EnemyListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.EnemyListItemSkin;
        return _this;
    }
    EnemyListItem.prototype.onLoadComplete = function () {
        _super.prototype.onLoadComplete.call(this);
        this.btn_enemy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnHandler, this);
    };
    EnemyListItem.prototype.onInit = function () {
        this.lab_name.text = this._data.name;
        var sec = this._data.timestamp;
        switch (this._data.type) {
            case OTHER_BEHAVIOR_TYPE.POLLUTE:
                this.lab_hint.text = "" + Language.instance.getDescByKey("chouren_wuran", GameCommon.instance.getOnlineTime(sec));
                break;
            case OTHER_BEHAVIOR_TYPE.ROB:
                this.lab_hint.text = "" + Language.instance.getDescByKey("chouen_touqu", GameCommon.instance.getOnlineTime(sec));
                break;
        }
        this.rank_head.headIcon = new PlayerHeadParam(this._data.id, this._data.head);
    };
    EnemyListItem.prototype.onTouchBtnHandler = function () {
        if (this._data) {
            DataManager.instance.visite.onSendVisitMessage(this._data.id, DataManager.instance.visite.type);
            GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_CLOSE, false, "EnemyListPaneL");
        }
    };
    return EnemyListItem;
}(BaseComp));
__reflect(EnemyListItem.prototype, "EnemyListItem");
//# sourceMappingURL=EnemyListPaneL.js.map