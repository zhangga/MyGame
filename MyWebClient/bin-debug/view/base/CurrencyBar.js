var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CurrencyBar = (function (_super) {
    __extends(CurrencyBar, _super);
    function CurrencyBar() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        return _this;
        // this.skinName = skins.CurrencyBarSkin;
    }
    CurrencyBar.prototype.onLoadComplete = function () {
        this.isLoaded = true;
        if (this._data)
            this.onUpdate();
    };
    Object.defineProperty(CurrencyBar.prototype, "data", {
        set: function (param) {
            this._data = param;
            this.onUpdate();
        },
        enumerable: true,
        configurable: true
    });
    CurrencyBar.prototype.onUpdate = function () {
        var model = GameCommon.instance.getThingModel(this._data.thing.type, this._data.thing.modelId);
        if (model) {
            this.visible = true;
            this.img_icon.source = model.dropicon;
            if (this._data.usingTitle) {
                this.label_l.text = this._data.title;
            }
            else {
                this.label_l.text = "\u6D88\u8017" + model.name;
            }
            var _hasitemNum = 0;
            // switch (this._data.thing.type) {
            // 	case GOODS_TYPE.ITEM:
            // 		var _itemThing: ItemThing = DataManager.getInstance().bagManager.getGoodsThingById(model.id);
            // 		_hasitemNum = _itemThing ? _itemThing.num : 0;
            // 		break;
            // 	case GOODS_TYPE.GOLD:
            // 		_hasitemNum = DataManager.getInstance().playerManager.player.getICurrency(this._data.thing.type);
            // 		break;
            // 	case GOODS_TYPE.DIAMOND:
            // 		_hasitemNum = DataManager.getInstance().playerManager.player.getICurrency(this._data.thing.type);
            // 		break;
            // 	default:
            // 		_hasitemNum = DataManager.getInstance().playerManager.player.getICurrency(this._data.thing.type);
            // 		break;
            // }
            // if (this._data.thing.num == -1) {//从背包找数据
            // 	this.label_r.textFlow = (new egret.HtmlTextParser).parser(`<font color=0xe9deb3>${_hasitemNum}</font>`);
            // } else {
            switch (this._data.thing.type) {
                // case GOODS_TYPE.ITEM:
                // 	if (_hasitemNum >= this._data.thing.num) {
                // 		this.label_r.textFlow = (new egret.HtmlTextParser).parser(`<font color=0x28e828>${_hasitemNum}/${this._data.thing.num}</font>`);
                // 	} else {
                // 		this.label_r.textFlow = (new egret.HtmlTextParser).parser(`<font color=0xe63232>${_hasitemNum}/${this._data.thing.num}</font>`);
                // 	}
                // 	break;
                default:
                    this.label_r.textFlow = (new egret.HtmlTextParser).parser("" + this._data.thing.numFormat);
                    break;
            }
        }
        else {
            this.label_l.text = this._data.title;
        }
        if (this._data.type != -1) {
            this.label_r.textFlow = this.label_r.textFlow = (new egret.HtmlTextParser).parser("<font color=0x590A0A>" + this._data.thing.num + "</font>");
        }
    };
    return CurrencyBar;
}(eui.Component));
__reflect(CurrencyBar.prototype, "CurrencyBar");
var CurrencyParam = (function () {
    function CurrencyParam(title, thing, usingTitle, type) {
        if (usingTitle === void 0) { usingTitle = true; }
        if (type === void 0) { type = -1; }
        this.title = "";
        this.title = title;
        this.thing = thing;
        this.usingTitle = usingTitle;
        this.type = type;
    }
    return CurrencyParam;
}());
__reflect(CurrencyParam.prototype, "CurrencyParam");
//# sourceMappingURL=CurrencyBar.js.map