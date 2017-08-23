var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CrownData = (function (_super) {
    __extends(CrownData, _super);
    function CrownData(modelID, lv) {
        if (lv === void 0) { lv = 1; }
        var _this = _super.call(this) || this;
        //皇冠个数
        _this.crown = 0;
        //是否已领取神器点
        _this._hasArtifact = false;
        _this._isUnlock = false;
        return _this;
    }
    CrownData.prototype.onParseMessage = function (msg) {
        this.crown = msg.getByte();
        this._hasArtifact = msg.getBoolean();
        this.isUnlock = true;
    };
    Object.defineProperty(CrownData.prototype, "isUnlock", {
        //是否解锁
        get: function () {
            // var player = DataManager.instance.playerM.player;
            // var cData: CrownData;
            // if (this._isUnlock) return true;
            // var model: ModelFish = this.model;
            // var bl: boolean = true;
            // var award: ModelAward;
            // for (var i: number = 0; i < model.tiaojian.length; i++) {
            // 	award = model.tiaojian[i];
            // 	switch (award.type) {
            // 		case FIELDGUIDE_UNLOCK_TYPE.NEED_FISH_CROWN:
            // 			cData = player.getCrownInfoByID(award.id);
            // 			if (cData.crown < cData.model.starMax) {
            // 				bl = false;
            // 			}
            // 			break;
            // 		case FIELDGUIDE_UNLOCK_TYPE.NEED_FISH_ID:
            // 			if (!cData.isUnlock) {
            // 				bl = false;
            // 			}
            // 			break;
            // 		case FIELDGUIDE_UNLOCK_TYPE.NEED_SEND_LINK:
            // 			bl = false;
            // 			break;
            // 		case FIELDGUIDE_UNLOCK_TYPE.NEED_INVITE_FRIEND:
            // 			bl = false;
            // 			break;
            // 	}
            // }
            // if (bl) {
            // 	return this._isUnlock = true;
            // }
            return false;
        },
        set: function (bl) {
            this._isUnlock = bl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrownData.prototype, "hasArtifact", {
        get: function () {
            return this._hasArtifact;
        },
        /**是否已领取奖励**/
        set: function (bl) {
            this._hasArtifact = bl;
        },
        enumerable: true,
        configurable: true
    });
    CrownData.prototype.onCheckCanReceive = function () {
        // if (!this.hasArtifact && this.crown == this.model.starMax) return true;
        return false;
    };
    return CrownData;
}(FishData));
__reflect(CrownData.prototype, "CrownData");
//# sourceMappingURL=CrownData.js.map