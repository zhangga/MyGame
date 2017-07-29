var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//tab容器内显示对象
var BaseTabView = (function (_super) {
    __extends(BaseTabView, _super);
    function BaseTabView(owner) {
        var _this = _super.call(this) || this;
        _this.points = RedPointManager.createPoint(0);
        _this.owner = owner;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        return _this;
    }
    //添加到舞台
    BaseTabView.prototype.onAddToStage = function () {
        this.onSkinName();
    };
    //设置皮肤
    BaseTabView.prototype.onSkinName = function () {
    };
    //皮肤加载完成
    BaseTabView.prototype.onLoadComplete = function () {
        this.onloadComp = true;
        this.onInit();
        this.onRegist();
    };
    //供子类覆盖
    BaseTabView.prototype.onInit = function () {
    };
    BaseTabView.prototype.onRefresh = function () {
    };
    BaseTabView.prototype.onRegist = function () {
    };
    BaseTabView.prototype.onRemove = function () {
    };
    BaseTabView.prototype.onShow = function () {
        if (this.onloadComp) {
            this.onRegist();
            this.onRefresh();
        }
    };
    BaseTabView.prototype.onHide = function () {
        this.onRemove();
        if (this.parent)
            this.parent.removeChild(this);
    };
    BaseTabView.prototype.onBtnAdvanceClick = function (param) {
    };
    BaseTabView.prototype.trigger = function () {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].checkPoint();
        }
    };
    BaseTabView.prototype.onChangeRole = function () {
    };
    return BaseTabView;
}(eui.Component));
__reflect(BaseTabView.prototype, "BaseTabView");
//# sourceMappingURL=BaseTabView.js.map