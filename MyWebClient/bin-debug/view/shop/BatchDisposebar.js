var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * 批量处理工具
 * @author  lzn
 *
 *
 */
var BatchDisposebar = (function (_super) {
    __extends(BatchDisposebar, _super);
    function BatchDisposebar() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.BatchDisposebarSkin;
        return _this;
    }
    Object.defineProperty(BatchDisposebar.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (param) {
            this._owner = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchDisposebar.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    BatchDisposebar.prototype.onTouchAdd = function () {
        this.num += 1;
        if (this.num > this.max()) {
            this.num = this.max();
        }
        this.setNum(this.num);
    };
    BatchDisposebar.prototype.onTouchReduce = function () {
        this.num -= 1;
        if (this.num == 0) {
            this.num = 1;
        }
        this.setNum(this.num);
    };
    BatchDisposebar.prototype.onTouchMin = function () {
        // this.setNum(this.min());
    };
    BatchDisposebar.prototype.onTouchMax = function () {
        // switch (this.currentState) {
        //     case BatchDisposebar.BATCH_TYPE_USE://背包
        //         this.setNum(this.max());
        //         break;
        //     case BatchDisposebar.BATCH_TYPE_BUY://商城
        //     case BatchDisposebar.BATCH_TYPE_CONNT:
        //         this.setNum(this.addTEN());
        //         break;
        // }
    };
    BatchDisposebar.prototype.setNum = function (num) {
        if (num == undefined)
            return;
        this.num = num;
        this.input_num.text = num.toString();
        switch (this.currentState) {
            // case BatchDisposebar.BATCH_TYPE_USE://背包
            //     this.label_min.text = "最小";
            //     this.label_max.text = "最大";
            //     break;
            case BatchDisposebar.BATCH_TYPE_BUY:
                this.sum = this.num * this.price;
                var color = this.sum > this.ownCurrency() ? 0xff0000 : 0xffffff;
                this.lab_money.textFlow = new Array({ text: this.sum.toString(), style: { textColor: color } });
                // this.label_min.text = "-10";
                // this.label_max.text = "+10";
                // }
                break;
        }
    };
    BatchDisposebar.prototype.onUpdate = function (model) {
        if (model === void 0) { model = null; }
        this._model = model;
        switch (this.currentState) {
            // case BatchDisposebar.BATCH_TYPE_USE://背包
            //     this.setNum(this.max());
            //     break;
            case BatchDisposebar.BATCH_TYPE_BUY:
                var modelshop = GameCommon.instance.getThingModel(this._model.cosume[0].type, this._model.cosume[0].id);
                this.img_payIcon.source = modelshop.dropicon;
                this.setNum(1);
                break;
        }
    };
    Object.defineProperty(BatchDisposebar.prototype, "price", {
        /**获取当前商品价格**/
        get: function () {
            var price = 0;
            if (this._model && this.currentState == BatchDisposebar.BATCH_TYPE_BUY) {
                price = this._model.cosume[0].num;
            }
            return price;
        },
        enumerable: true,
        configurable: true
    });
    BatchDisposebar.prototype.ownCurrency = function () {
        return DataManager.instance.playerM.player.getCurrency(this._model.cosume.type);
    };
    BatchDisposebar.prototype.min = function () {
        // switch (this.currentState) {
        //     case BatchDisposebar.BATCH_TYPE_USE://背包
        //         return 1;
        //     case BatchDisposebar.BATCH_TYPE_BUY://商城
        //         var canBuy: number;
        //         if ((this.num - 10) >= 0) {
        //             canBuy = this.num - 10;
        //         } else {
        //             canBuy = 1;
        //         }
        //         return Math.max(canBuy, 1);
        //     case BatchDisposebar.BATCH_TYPE_CONNT:
        //         return Math.max(this.num - 10, 1);
        // }
    };
    BatchDisposebar.prototype.addTEN = function () {
        // switch (this.currentState) {
        //     case BatchDisposebar.BATCH_TYPE_USE://背包
        //         var _itemThing: ItemThing = DataManager.getInstance().bagManager.getGoodsThingById(this._model.modelId, GOODS_TYPE.BOX);
        //         var _hasitemNum: number = _itemThing ? _itemThing.num : 0;
        //         return Math.max(0, _hasitemNum);
        //     case BatchDisposebar.BATCH_TYPE_BUY://商城
        //         var canBuy: number;
        //         if (this.num <= 1) {
        //             canBuy = Math.min(10, Math.floor(this.ownCurrency() / this.price));
        //         } else {
        //             canBuy = Math.min((this.num + 10), Math.floor(this.ownCurrency() / this.price));
        //         }
        //         return Math.max(canBuy, 1);
        //     case BatchDisposebar.BATCH_TYPE_CONNT:
        //         return Math.min(this.num + 10, this.max() > 0 ? this.max() : 9999999);
        // }
    };
    BatchDisposebar.prototype.max = function () {
        switch (this.currentState) {
            // case BatchDisposebar.BATCH_TYPE_USE://背包
            //     var _itemThing: ItemThing = DataManager.getInstance().bagManager.getGoodsThingById(this._model.modelId, GOODS_TYPE.BOX);
            //     var _hasitemNum: number = _itemThing ? _itemThing.num : 0;
            //     return Math.max(0, _hasitemNum);
            case BatchDisposebar.BATCH_TYPE_BUY:
                return Math.max(1, Math.floor(this.ownCurrency() / this.price));
        }
    };
    // private getPlayerData(): Player {
    //     return DataManager.getInstance().playerManager.player;
    // }
    BatchDisposebar.prototype.onInputChage = function (e) {
        // if (!this.visible) return;
        // var txt: eui.TextInput = e.target;
        // var curr: number = Tool.isNumber(parseInt(txt.text)) ? parseInt(txt.text) : 1;
        // if (curr > this.max()) {
        //     this.num = this.max();
        //     this.setNum(this.num);
        // } else {
        //     this.setNum(curr);
        // }
    };
    BatchDisposebar.prototype.onRegist = function () {
        this.input_num.addEventListener(egret.Event.CHANGE, this.onInputChage, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAdd, this);
        this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchReduce, this);
        // this.btn_min.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMin, this);
        // this.btn_max.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMax, this);
    };
    BatchDisposebar.prototype.onRemove = function () {
        this.input_num.removeEventListener(egret.Event.CHANGE, this.onInputChage, this);
        this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAdd, this);
        this.btnReduce.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchReduce, this);
        // this.btn_min.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMin, this);
        // this.btn_max.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMax, this);
    };
    Object.defineProperty(BatchDisposebar.prototype, "count", {
        get: function () {
            return this.num;
        },
        enumerable: true,
        configurable: true
    });
    BatchDisposebar.prototype.onSetUpdateCall = function (callfunc, obj) {
        this.updateCallFunc = callfunc;
        this.updateCallObj = obj;
    };
    return BatchDisposebar;
}(eui.Component));
BatchDisposebar.BATCH_TYPE_USE = "use";
BatchDisposebar.BATCH_TYPE_BUY = "buy";
BatchDisposebar.BATCH_TYPE_CONNT = "count";
__reflect(BatchDisposebar.prototype, "BatchDisposebar");
var BatchParam = (function () {
    function BatchParam() {
        this.maxNum = 0;
    }
    return BatchParam;
}());
__reflect(BatchParam.prototype, "BatchParam");
//# sourceMappingURL=BatchDisposebar.js.map