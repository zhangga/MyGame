class TopRankManager {

    //排行榜-全部
    private _ranks_all: {} = {};

    //排行榜-好友
    private _ranks_friend: {} = {};

    public constructor() {
		
	}

    /**发送排行榜列表消息**/
    public sendTopRankListMsg(all: boolean, type: RANK_TYPE): void {
        var msg: Message = new Message(MESSAGE_ID.TOPRANK_LIST_MESSAGE);
        msg.setBoolean(all);
        msg.setByte(type);
        _GF.instance.net.onAddMessage(msg);
    }

    /**
     * 解析排行榜消息
     */
    public onParseTopRankListMsg(msg: Message): void {
        var all: boolean = msg.getBoolean();
        var type: RANK_TYPE = msg.getByte();
        var size: number = msg.getByte();
        var rankList = [];
        for (var i: number = 0; i < size; i++) {
            var value: string = msg.getString();
            var data: RankData = new RankData(i+1, value);
            rankList.push(data);
        }
        this.pushRanksByType(all, type, rankList);
    }

    private pushRanksByType(all: boolean, type: RANK_TYPE, list: Array<RankData>) {
        if (all) {
            this._ranks_all[type] = list;
        }
        else {
            this._ranks_friend[type] = list;
        }
    }

    public getRankListByType(all: boolean, type: RANK_TYPE): Array<RankData> {
        if (all) {
            return this._ranks_all[type];
        }
        else {
            return this._ranks_friend[type];
        }
    }

}