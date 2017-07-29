var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FieldGuideManager = (function () {
    function FieldGuideManager() {
        this.isShow = false;
        this.fgHitRecord = [];
        var models = ModelManager.instance.modelFieldGuide;
        var n = 0;
        for (var key in models) {
            n++;
        }
        GameDefine.PLAYER_FIELDGUIDE_MAX = n;
    }
    FieldGuideManager.prototype.onCheckShowHint = function (fishModelID) {
        // var fData = DataManager.instance.playerM.player.getCrownInfoByID(fishModelID);
        // if (fData.crown < fData.model.starMax) {
        // 	this.fgHitRecord.push(new UnlockHintParam(UNLOCK_HINT_TYPE.CROWN, ModelAward.onParseByParam(GOODS_TYPE.FISH, fishModelID, 1)));
        // } else {
        // 	var sons = fData.model.next;
        // 	if (sons.length > 0) {
        // 		for (var i: number = 0; i < sons.length; i++) {
        // 			if (Number(sons[i]) == 0) continue;
        // 			this.fgHitRecord.push(new UnlockHintParam(UNLOCK_HINT_TYPE.NEWFISH, ModelAward.onParseByParam(GOODS_TYPE.FISH, Number(sons[i]), 1)));
        // 		}
        // 	} else {
        // 		this.fgHitRecord.push(new UnlockHintParam(UNLOCK_HINT_TYPE.CROWN, ModelAward.onParseByParam(GOODS_TYPE.FISH, fishModelID, 1)));
        // 	}
        // }
        this.fgHitRecord.push(new UnlockHintParam(UNLOCK_HINT_TYPE.NEWFISH, ModelAward.onParseByParam(GOODS_TYPE.FISH, fishModelID, 1)));
        if (this.fgHitRecord.length > 0) {
            GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "UnLockAlertHint");
        }
    };
    FieldGuideManager.prototype.onCheckRedPoint = function (bookID) {
        return false;
    };
    //是否可以购买新鱼
    FieldGuideManager.prototype.onCheckCanBuyFish = function () {
        var limit = DataManager.instance.playerM.player.openFGID;
        for (var i = limit; i >= 1; i--) {
            if (this.onCheckCanBuyFishByFDID(i))
                return true;
        }
        return false;
    };
    FieldGuideManager.prototype.onCheckCanBuyFishByFDID = function (fieldGuideID) {
        // var fishID: number;
        // var models = ModelManager.instance.modelFieldGuide;
        // var model: ModelFieldGuide = models[fieldGuideID];
        // if (!model) return false;
        // for (var key in model.jiegou) {
        // 	fishID = parseInt(model.jiegou[key]);
        // 	if (fishID == 0) continue;
        // 	if (this.onCheckCanBuyFishByID(fishID)) return true;
        // }
        return false;
    };
    FieldGuideManager.prototype.onCheckCanBuyFishByID = function (fishID) {
        var player = DataManager.instance.playerM.player;
        if (!player.getFishIsCanBuy(fishID))
            return false;
        var cData = player.getCrownInfoByID(fishID);
        if (!cData)
            return false;
        var price = UnitDefine.getTrueInfinite(cData.modelLvFirst.lvConsume.num).num;
        if (player.getCurrency(cData.modelLvFirst.lvConsume.type) >= price)
            return true;
        return false;
    };
    //是否有神器点数可领取
    FieldGuideManager.prototype.onCheckCanReceiveArtifactPoint = function () {
        var limit = DataManager.instance.playerM.player.openFGID;
        for (var i = limit; i >= 1; i--) {
            if (this.onCheckCanReceiveArtifactPointByFDID(i))
                return true;
        }
        return false;
    };
    FieldGuideManager.prototype.onCheckCanReceiveArtifactPointByFDID = function (fieldGuideID) {
        // var fishID: number;
        // var models = ModelManager.instance.modelFieldGuide;
        // var model: ModelFieldGuide = models[fieldGuideID];
        // if (!model) return false;
        // for (var key in model.jiegou) {
        // 	fishID = parseInt(model.jiegou[key]);
        // 	if (fishID == 0) continue;
        // 	if (this.onCheckCanReceiveArtifactPointByID(fishID)) return true;
        // }
        return false;
    };
    FieldGuideManager.prototype.onCheckCanReceiveArtifactPointByID = function (fishID) {
        var cData = DataManager.instance.playerM.player.getCrownInfoByID(fishID);
        if (!cData)
            return false;
        if (cData.onCheckCanReceive())
            return true;
        return false;
    };
    FieldGuideManager.prototype.onCheckRedPontByFishID = function (fishID) {
        if (this.onCheckCanBuyFishByID(fishID))
            return true;
        if (this.onCheckCanReceiveArtifactPointByID(fishID))
            return true;
        return false;
    };
    FieldGuideManager.prototype.onCheckRedPointByFDID = function (fieldGuideID) {
        if (this.onCheckCanBuyFishByFDID(fieldGuideID))
            return true;
        if (this.onCheckCanReceiveArtifactPointByFDID(fieldGuideID))
            return true;
        return false;
    };
    return FieldGuideManager;
}());
__reflect(FieldGuideManager.prototype, "FieldGuideManager");
// １、图鉴达到皇冠或者星星的目标：1,鱼ID,皇冠数量
// 2、获得过某个ID的鱼：2,鱼ID
// 3、发出N次链接：3,次数
// 4、邀请N个新好友：4,好友人头数
// 5、需要皇冠累计值
var FIELDGUIDE_UNLOCK_TYPE;
(function (FIELDGUIDE_UNLOCK_TYPE) {
    FIELDGUIDE_UNLOCK_TYPE[FIELDGUIDE_UNLOCK_TYPE["NEED_FISH_CROWN"] = 1] = "NEED_FISH_CROWN";
    FIELDGUIDE_UNLOCK_TYPE[FIELDGUIDE_UNLOCK_TYPE["NEED_FISH_ID"] = 2] = "NEED_FISH_ID";
    FIELDGUIDE_UNLOCK_TYPE[FIELDGUIDE_UNLOCK_TYPE["NEED_SEND_LINK"] = 3] = "NEED_SEND_LINK";
    FIELDGUIDE_UNLOCK_TYPE[FIELDGUIDE_UNLOCK_TYPE["NEED_INVITE_FRIEND"] = 4] = "NEED_INVITE_FRIEND";
    FIELDGUIDE_UNLOCK_TYPE[FIELDGUIDE_UNLOCK_TYPE["NEDD_CROWN_NUM"] = 5] = "NEDD_CROWN_NUM";
})(FIELDGUIDE_UNLOCK_TYPE || (FIELDGUIDE_UNLOCK_TYPE = {}));
//# sourceMappingURL=FieldGuideManager.js.map