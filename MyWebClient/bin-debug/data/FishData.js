var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FishData = (function () {
    function FishData() {
        this.lv = 1;
        this.tier = 0;
    }
    FishData.prototype.onParseMessage = function (msg) {
        this.id = msg.getInt();
        this.lv = msg.getShort();
        this.tier = msg.getByte();
        this.onUpdateSecOutput();
    };
    FishData.prototype.setParam = function (id, lv) {
        if (id === void 0) { id = 1; }
        if (lv === void 0) { lv = 1; }
        this.id = id;
        this.lv = lv;
        this.onUpdateSecOutput();
    };
    FishData.prototype.onUpdate = function () {
    };
    Object.defineProperty(FishData.prototype, "model", {
        get: function () {
            return ModelManager.instance.modelFish[this.id];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FishData.prototype, "moveRes", {
        get: function () {
            return this.model.waixing + "_move";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FishData.prototype, "turnRes", {
        get: function () {
            return this.model.waixing + "_turn";
        },
        enumerable: true,
        configurable: true
    });
    FishData.prototype.onUpdateSecOutput = function () {
        var base = this.model.getTierBeginSecOutPut(this.tier);
        this._secOutput = base.startSecOutPut + (Math.min(this.lv, base.max) - base.min) * this.model.addSecOutPut.num;
        this._bubbleOutput = this._secOutput * this.model.paochanTime; //只计算升级所带来的收益秒产
        /**修改this._secOutput添加科技和鱼缸带来的收益**/
        var _technologyModel;
        var _technologyIDs = [];
        var _fishtankModel = ModelManager.instance.modelFieldGuide[this.model.yugangId + "_0"];
        for (var i = 0; i < _fishtankModel.kejiId.length; i++) {
            _technologyIDs.push(_fishtankModel.kejiId[i]);
        }
        for (var i = 0; i < this.model.kejiId.length; i++) {
            _technologyIDs.push(this.model.kejiId[i]);
        }
        for (var i = 0; i < _technologyIDs.length; i++) {
            _technologyModel = DataManager.instance.technology.getCurrModel(parseInt(_technologyIDs[i]));
            if (!_technologyModel)
                continue;
            switch (_technologyModel.type) {
                case TECHNOLOGY_TYPE.SECOUTPUT:
                case TECHNOLOGY_TYPE.FISHTANK_SECOUT:
                    this._secOutput = this._secOutput * (_technologyModel.baifenbi + 100) / 100;
                    break;
                case TECHNOLOGY_TYPE.COMEIN:
                    this._bubbleOutput = this._bubbleOutput * (_technologyModel.baifenbi + 100) / 100;
                    break;
            }
        }
    };
    Object.defineProperty(FishData.prototype, "secOutput", {
        get: function () {
            return this._secOutput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FishData.prototype, "bubbleOutput", {
        get: function () {
            return this._bubbleOutput;
        },
        enumerable: true,
        configurable: true
    });
    return FishData;
}());
__reflect(FishData.prototype, "FishData");
var FISH_POST;
(function (FISH_POST) {
    FISH_POST[FISH_POST["BAG"] = 0] = "BAG";
    FISH_POST[FISH_POST["WATERVAT"] = 1] = "WATERVAT"; //水缸
})(FISH_POST || (FISH_POST = {}));
//# sourceMappingURL=FishData.js.map