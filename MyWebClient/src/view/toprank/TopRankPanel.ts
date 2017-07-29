class TopRankPanel extends BaseWindowPanel {

    /**排行榜类型信息 */
    public static RANK_TYPE = [["资产排行", "paihang0"],
    ["人气排行", "paihang1"],];

    public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

    private btn_back: eui.Button;
    private btn_close: eui.Button;

    private tab_btn_group: TabBtnGroup;
    private list_rank: eui.Group;

    private curr_index: number = 0;

    public constructor(owner) {
        super(owner);
    }
    protected onSkinName(): void {
        this.skinName = skins.TopRankPanelSkin;
    }
    protected onInit(): void {
        super.onInit();
        //所有的榜
        this.initAllRanks();
        this.onRefresh();
    }
    protected onRegist(): void {
        super.onRegist();
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.TOPRANK_LIST_MESSAGE.toString(), this.onShowTopRankList, this);
        GameDispatcher.instance.addEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
    }
    protected onRemove(): void {
        super.onRemove();
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.TOPRANK_LIST_MESSAGE.toString(), this.onShowTopRankList, this);
        GameDispatcher.instance.removeEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
    }
    protected onRefresh(): void {
        super.onRefresh();
        this.onTabBtnTouch();
        this.tab_btn_group.selectIndex = this.curr_index;
    }

    private initAllRanks(): void {
        var paihangs: string[] = [];
        for (var i: number = 0; i < TopRankPanel.RANK_TYPE.length; i++) {
            paihangs.push(TopRankPanel.RANK_TYPE[i][1]);
        }
        this.tab_btn_group.onUpdate(paihangs);
    }

    /**
	 * 切换排行榜类型TAB列表
	 */
    private onTabBtnTouch(): void {
        if (this.tab_btn_group.selectIndex && this.curr_index == this.tab_btn_group.selectIndex)
            return;
        if (!this.tab_btn_group.selectIndex)
            this.tab_btn_group.selectIndex = 0;
        this.curr_index = this.tab_btn_group.selectIndex;
        DataManager.instance.toprank.sendTopRankListMsg(true, this.curr_index);
    }

    private onShowTopRankList(): void {
        this.list_rank.removeChildren();
        var list: Array<RankData> = DataManager.instance.toprank.getRankListByType(true, this.curr_index);
        if (!list)
            return;
        for (var i: number = 0; i < list.length; i++) {
            var data: RankData = list[i];
            var item: TopRankItem = new TopRankItem();
            item.onShow(data);
            this.list_rank.addChild(item);
        }
    }
}

class TopRankItem extends eui.Component {
    private rank_bg: eui.Image;
    private rank_num: eui.Label;
    private rank_head: PlayerHeadBar;
    private rank_name: eui.Label;
    private rank_value: eui.Label;

    public constructor() {
        super();
        this.skinName = skins.TopRankItemSkin;
    }

    public onShow(data: RankData): void {
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
    }

}