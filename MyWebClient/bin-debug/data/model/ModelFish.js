var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelFish = (function (_super) {
    __extends(ModelFish, _super);
    function ModelFish() {
        return _super.call(this) || this;
    }
    ModelFish.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.name = this.getXmlValue(result, "name");
        this.waixing = this.getXmlValue(result, "waixing");
        this.pinzhi = this.getXmlValueNumber(result, "pinzhi");
        this.kejiId = ModelAward.onParseParams(this.getXmlValue(result, "kejiId"));
        this.paochanTime = this.getXmlValueNumber(result, "paochanTime");
        var param = this.getXmlValue(result, "tiaojian");
        if (param) {
            this.tiaojian = ModelAward.onParseQueueByString(param);
        }
        else {
            this.tiaojian = [ModelAward.onParseByString("0")];
        }
        this.jiage = ModelAward.onParseByString(this.getXmlValue(result, "jiage"));
        this.jiagexishu = this.getXmlValueNumber(result, "jiagexishu");
        this.jieduan = ModelAward.onParseQueueByString(this.getXmlValue(result, "jieduan"));
        this.icon = this.getXmlValue(result, "icon");
        this.desc = this.getXmlValue(result, "desc");
        this.yugangId = this.getXmlValueNumber(result, "yugangId");
        this.size = new egret.Point(this.getXmlValueNumber(result, "kuan"), this.getXmlValueNumber(result, "gao"));
        var arr = ModelAward.onParseParams(this.getXmlValue(result, "miaochan"));
        this.baseSecOutPut = new InfiniteNumber(arr[0]);
        this.addSecOutPut = new InfiniteNumber(arr[1]);
        this.tier = {};
        var currBase = this.getTierBeginSecOutPut(this.jieduan.length - 1);
        this.maxLv = currBase.max;
    };
    ModelFish.prototype.getTierBeginSecOutPut = function (currTier) {
        var currBase = this.tier[currTier];
        if (!currBase) {
            this.tier[currTier] = currBase = new UpgradeTierBase(currTier);
            currBase.min = 1;
            var before = this.jieduan[currTier - 1];
            var curr = this.jieduan[currTier];
            currBase.max = 1;
            if (before) {
                currBase.min = before.id;
            }
            if (curr) {
                currBase.max = curr.id;
            }
            currBase.price = curr.price;
            currBase.lvCount = currBase.max - currBase.min;
            currBase.addPercent = curr.num;
            if (currTier == 0) {
                currBase.startSecOutPut = this.baseSecOutPut.num;
            }
            else {
                var beforeBase = this.getTierBeginSecOutPut(currTier - 1);
                currBase.startSecOutPut = (beforeBase.startSecOutPut + (beforeBase.lvCount) * this.addSecOutPut.num) * (1 + beforeBase.addPercent / UnitDefine.BASE_PERCENTAGE);
            }
        }
        return currBase;
    };
    ModelFish.prototype.getBuyNum = function (lv) {
        return 0;
    };
    return ModelFish;
}(ModelBase));
__reflect(ModelFish.prototype, "ModelFish");
var UpgradeTierBase = (function () {
    function UpgradeTierBase(id) {
        this.min = 1;
        this.id = id;
    }
    return UpgradeTierBase;
}());
__reflect(UpgradeTierBase.prototype, "UpgradeTierBase");
//# sourceMappingURL=ModelFish.js.map