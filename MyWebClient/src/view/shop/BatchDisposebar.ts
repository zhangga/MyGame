/**
 * 
 * 批量处理工具
 * @author  lzn 
 * 
 * 
 */
class BatchDisposebar extends eui.Component {
    private input_num: eui.TextInput;
    private btnAdd: eui.Button;
    private btnReduce: eui.Button;
    private btn_min: eui.Button;
    private btn_max: eui.Button;
    private img_payIcon: eui.Image;
    private _model;
    private lab_money: eui.Label;
    private label_min: eui.Label;
    private label_max: eui.Label;
    private _owner;
    public btn_buy: eui.Button;
    public num: number;
    public sum: number;
    public static BATCH_TYPE_USE: string = "use";
    public static BATCH_TYPE_BUY: string = "buy";
    public static BATCH_TYPE_CONNT: string = "count";

    public constructor() {
        super();
        this.skinName = skins.BatchDisposebarSkin;
    }
    public set owner(param) {
        this._owner = param;
    }
    public get owner() {
        return this._owner;
    }
    public get model() {
        return this._model;
    }
    private onTouchAdd() {
        this.num += 1;
        if (this.num > this.max()) {
            this.num = this.max();
        }
        this.setNum(this.num);
    }
    private onTouchReduce() {
        this.num -= 1;
        if (this.num == 0) {
            this.num = 1;
        }
        this.setNum(this.num);
    }
    private onTouchMin() {
        // this.setNum(this.min());
    }
    private onTouchMax() {
        // switch (this.currentState) {
        //     case BatchDisposebar.BATCH_TYPE_USE://背包
        //         this.setNum(this.max());
        //         break;
        //     case BatchDisposebar.BATCH_TYPE_BUY://商城
        //     case BatchDisposebar.BATCH_TYPE_CONNT:
        //         this.setNum(this.addTEN());
        //         break;
        // }
    }
    private setNum(num: number) {
        if (num == undefined) return;
        this.num = num;
        this.input_num.text = num.toString();
        switch (this.currentState) {
            // case BatchDisposebar.BATCH_TYPE_USE://背包
            //     this.label_min.text = "最小";
            //     this.label_max.text = "最大";
            //     break;
            case BatchDisposebar.BATCH_TYPE_BUY://商城
                this.sum = this.num * this.price;
                var color = this.sum > this.ownCurrency() ? 0xff0000 : 0xffffff;
                this.lab_money.textFlow = new Array<egret.ITextElement>(
                    { text: this.sum.toString(), style: { textColor: color } }
                );
                // this.label_min.text = "-10";
                // this.label_max.text = "+10";
                // }
                break;
            // case BatchDisposebar.BATCH_TYPE_CONNT:
            //     if (this.updateCallFunc) {
            //         Tool.callback(this.updateCallFunc, this.updateCallObj);
            //     }
            //     this.label_min.text = "-10";
            //     this.label_max.text = "+10";
            //     break;
        }
    }
    public onUpdate(model = null) {
        this._model = model;
        switch (this.currentState) {
            // case BatchDisposebar.BATCH_TYPE_USE://背包
            //     this.setNum(this.max());
            //     break;
            case BatchDisposebar.BATCH_TYPE_BUY://商城
                var modelshop = GameCommon.instance.getThingModel(this._model.cosume[0].type, this._model.cosume[0].id);
                this.img_payIcon.source = modelshop.dropicon;
                this.setNum(1);
                break;
            // case BatchDisposebar.BATCH_TYPE_CONNT:
            //     this.setNum(1);
            //     break;
        }
    }
    /**获取当前商品价格**/
    private get price(): number {
        var price: number = 0;
        if (this._model && this.currentState == BatchDisposebar.BATCH_TYPE_BUY) {
            price = this._model.cosume[0].num;
        }
        return price;
    }
    public ownCurrency() {
        return DataManager.instance.playerM.player.getCurrency(this._model.cosume.type);
    }
    public min() {
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
    }
    public addTEN() {
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
    }
    public max() {
        switch (this.currentState) {
            // case BatchDisposebar.BATCH_TYPE_USE://背包
            //     var _itemThing: ItemThing = DataManager.getInstance().bagManager.getGoodsThingById(this._model.modelId, GOODS_TYPE.BOX);
            //     var _hasitemNum: number = _itemThing ? _itemThing.num : 0;
            //     return Math.max(0, _hasitemNum);
            case BatchDisposebar.BATCH_TYPE_BUY://商城
                return Math.max(1, Math.floor(this.ownCurrency() / this.price));
            // case BatchDisposebar.BATCH_TYPE_CONNT:
            //     return (this.model as BatchParam).maxNum;
        }
    }
    // private getPlayerData(): Player {
    //     return DataManager.getInstance().playerManager.player;
    // }
    private onInputChage(e: egret.Event) {
        // if (!this.visible) return;
        // var txt: eui.TextInput = e.target;
        // var curr: number = Tool.isNumber(parseInt(txt.text)) ? parseInt(txt.text) : 1;
        // if (curr > this.max()) {
        //     this.num = this.max();
        //     this.setNum(this.num);
        // } else {
        //     this.setNum(curr);
        // }
    }
    public onRegist(): void {
        this.input_num.addEventListener(egret.Event.CHANGE, this.onInputChage, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAdd, this);
        this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchReduce, this);
        // this.btn_min.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMin, this);
        // this.btn_max.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMax, this);
    }
    public onRemove(): void {
        this.input_num.removeEventListener(egret.Event.CHANGE, this.onInputChage, this);
        this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchAdd, this);
        this.btnReduce.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchReduce, this);
        // this.btn_min.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMin, this);
        // this.btn_max.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMax, this);
    }
    public get count(): number {
        return this.num;
    }
    //设置更新回调
    private updateCallFunc;
    private updateCallObj;
    public onSetUpdateCall(callfunc, obj): void {
        this.updateCallFunc = callfunc;
        this.updateCallObj = obj;
    }
}
class BatchParam {
    public maxNum: number = 0;
}