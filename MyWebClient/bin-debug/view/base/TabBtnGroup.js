var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TabBtnGroup = (function (_super) {
    __extends(TabBtnGroup, _super);
    function TabBtnGroup() {
        var _this = _super.call(this) || this;
        _this.isLoaded = false;
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        _this.skinName = skins.TabBtnGroupSkin;
        return _this;
    }
    TabBtnGroup.prototype.onLoadComplete = function () {
        this.isLoaded = true;
        if (this._data) {
            this.onInit();
        }
    };
    TabBtnGroup.prototype.onUpdate = function (source, keys) {
        this._data = source;
        this._keys = keys;
        if (this.isLoaded) {
            this.onInit();
        }
    };
    Object.defineProperty(TabBtnGroup.prototype, "selectIndex", {
        get: function () {
            return this._selectIndex;
        },
        set: function (index) {
            for (var key in this.tabs) {
                this.tabs[key].visible = parseInt(key) == index;
            }
            this._selectIndex = index;
        },
        enumerable: true,
        configurable: true
    });
    TabBtnGroup.prototype.onInit = function () {
        this.tabs = {};
        this.subLayer.removeChildren();
        this.topLayer.removeChildren();
        var item;
        for (var i = 0; i < this._data.length; i++) {
            item = new TabBtnItem(0);
            item.data = this._data[i];
            item.name = i.toString();
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);
            this.subLayer.addChild(item);
            item = new TabBtnItem(1);
            item.data = this._data[i];
            this.topLayer.addChild(item);
            this.tabs[i] = item;
        }
    };
    TabBtnGroup.prototype.onTouchItem = function (e) {
        var index = parseInt(e.currentTarget.name);
        if (this.selectIndex != index) {
            this.selectIndex = index;
            GameDispatcher.instance.dispatcherEventWith(GameEvent.TABBTN_TOUCH_EVENT, false, this.selectIndex);
        }
    };
    return TabBtnGroup;
}(eui.Component));
__reflect(TabBtnGroup.prototype, "TabBtnGroup");
var TabBtnItem = (function (_super) {
    __extends(TabBtnItem, _super);
    function TabBtnItem(type) {
        var _this = _super.call(this) || this;
        _this.isLoaded = false;
        _this._type = type;
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        _this.skinName = skins.TabBtnItemSkin;
        return _this;
    }
    TabBtnItem.prototype.onLoadComplete = function () {
        this.isLoaded = true;
        if (this._data) {
            this.onInit();
        }
    };
    Object.defineProperty(TabBtnItem.prototype, "data", {
        set: function (source) {
            this._data = source;
            if (this.isLoaded) {
                this.onInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    TabBtnItem.prototype.onInit = function () {
        if (this._type == 0) {
            this.img_bg.source = "public_tab_selected_png";
            this.img_lab.source = this._data + "0_png";
        }
        else {
            this.img_bg.source = "public_tab_unselected_png";
            this.img_lab.source = this._data + "1_png";
        }
    };
    return TabBtnItem;
}(eui.Component));
__reflect(TabBtnItem.prototype, "TabBtnItem");
//# sourceMappingURL=TabBtnGroup.js.map