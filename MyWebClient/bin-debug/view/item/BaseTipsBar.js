var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTipsBar = (function (_super) {
    __extends(BaseTipsBar, _super);
    function BaseTipsBar(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.initSkinName();
        return _this;
    }
    //皮肤
    BaseTipsBar.prototype.initSkinName = function () {
    };
    //注册
    BaseTipsBar.prototype.onRegist = function () {
    };
    //移除
    BaseTipsBar.prototype.onRemove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    //更新
    BaseTipsBar.prototype.onUpdate = function (param) {
        this.param = param;
    };
    //更新通用属性
    BaseTipsBar.prototype.onRefreshCommonUI = function () {
        // this.item_icon.source = model.icon;
        // quality = quality != -1 ? quality : model.quality
        // this.item_frame.source = GameCommon.getInstance().getIconFrame(quality);
        // this.name_label.textFlow = new Array<egret.ITextElement>(
        //     { text: model.name, style: { textColor: GameDefine.color[quality] } },
        // );
        // var lvLimitObj = GameCommon.getInstance().getLimitLevelObj(model.level);
        // var levelDesc: string = lvLimitObj.zsLevel > 0 ? `${lvLimitObj.zsLevel}转` : `Lv.${lvLimitObj.level}`;
        // this.level_label.text = levelDesc;
        // if (this.desc_label)
        //     this.desc_label.text = model.des;
        // if (this.item_bg) {
        //     this.item_bg.source = GameCommon.getInstance().getIconBack(quality);
        // }
        // if (this.timeGoods && model.limitTime > 0) {
        //     Tool.addTimer(this.updateLimitTime, this);
        // }
    };
    //关闭面板
    BaseTipsBar.prototype.onHide = function () {
        this.owner.onHide();
    };
    return BaseTipsBar;
}(eui.Component));
__reflect(BaseTipsBar.prototype, "BaseTipsBar");
//# sourceMappingURL=BaseTipsBar.js.map