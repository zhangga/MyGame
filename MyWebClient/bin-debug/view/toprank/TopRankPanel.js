var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TopRankPanel = (function (_super) {
    __extends(TopRankPanel, _super);
    function TopRankPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        _this.curr_index = 0;
        return _this;
    }
    TopRankPanel.prototype.onSkinName = function () {
        this.skinName = skins.TopRankPanelSkin;
    };
    TopRankPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        //所有的榜
        this.initAllRanks();
        this.onRefresh();
    };
    TopRankPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.TOPRANK_LIST_MESSAGE.toString(), this.onShowTopRankList, this);
        GameDispatcher.instance.addEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
    };
    TopRankPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.TOPRANK_LIST_MESSAGE.toString(), this.onShowTopRankList, this);
        GameDispatcher.instance.removeEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
    };
    TopRankPanel.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        this.onTabBtnTouch();
        this.tab_btn_group.selectIndex = this.curr_index;
    };
    TopRankPanel.prototype.initAllRanks = function () {
        var paihangs = [];
        for (var i = 0; i < TopRankPanel.RANK_TYPE.length; i++) {
            paihangs.push(TopRankPanel.RANK_TYPE[i][1]);
        }
        this.tab_btn_group.onUpdate(paihangs);
    };
    /**
     * 切换排行榜类型TAB列表
     */
    TopRankPanel.prototype.onTabBtnTouch = function () {
        if (this.tab_btn_group.selectIndex && this.curr_index == this.tab_btn_group.selectIndex)
            return;
        if (!this.tab_btn_group.selectIndex)
            this.tab_btn_group.selectIndex = 0;
        this.curr_index = this.tab_btn_group.selectIndex;
        DataManager.instance.toprank.sendTopRankListMsg(true, this.curr_index);
    };
    TopRankPanel.prototype.onShowTopRankList = function () {
        this.list_rank.removeChildren();
        var list = DataManager.instance.toprank.getRankListByType(true, this.curr_index);
        if (!list)
            return;
        for (var i = 0; i < list.length; i++) {
            var data = list[i];
            var item = new TopRankItem();
            item.onShow(data);
            this.list_rank.addChild(item);
        }
    };
    return TopRankPanel;
}(BaseWindowPanel));
/**排行榜类型信息 */
TopRankPanel.RANK_TYPE = [["资产排行", "paihang0"],
    ["人气排行", "paihang1"],];
__reflect(TopRankPanel.prototype, "TopRankPanel");
var TopRankItem = (function (_super) {
    __extends(TopRankItem, _super);
    function TopRankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.TopRankItemSkin;
        return _this;
    }
    TopRankItem.prototype.onShow = function (data) {
        if (data.rank < 4) {
            this.rank_num.visible = false;
            this.rank_bg.source = "toprank_" + data.rank + "_png";
        }
        else {
            this.rank_num.visible = true;
            this.rank_num.text = data.rank + "";
            this.rank_bg.source = "toprank_n_png";
        }
        this.rank_head.headIcon = new PlayerHeadParam(data.id, data.head);
        this.rank_name.text = data.name;
        this.rank_value.text = new InfiniteNumber(data.value).toTextFormat();
    };
    return TopRankItem;
}(eui.Component));
__reflect(TopRankItem.prototype, "TopRankItem");
//# sourceMappingURL=TopRankPanel.js.map