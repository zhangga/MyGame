var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Language = (function () {
    function Language() {
    }
    Object.defineProperty(Language, "instance", {
        get: function () {
            if (!this.language) {
                this.language = new Language();
            }
            return this.language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Language.prototype, "type", {
        set: function (param) {
            this._type = param;
            switch (param) {
                case LANGUAGE_TYPE.CN:
                    break;
                case LANGUAGE_TYPE.EN:
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Language.prototype.getDescByKey = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var model = ModelManager.instance.modelText[key];
        if (model) {
            return this.onParseString.apply(this, [model.local].concat(args));
        }
        else {
            return this.onParseString.apply(this, [key].concat(args));
        }
    };
    Language.prototype.onParseString = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length > 0) {
            var reg = new RegExp(/\{[0-9]{1,2}\}/g);
            var arr = str.match(reg);
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    str = str.replace(arr[i], args[i]);
                }
            }
        }
        return str;
    };
    return Language;
}());
__reflect(Language.prototype, "Language");
var LANGUAGE_TYPE;
(function (LANGUAGE_TYPE) {
    LANGUAGE_TYPE[LANGUAGE_TYPE["CN"] = 0] = "CN";
    LANGUAGE_TYPE[LANGUAGE_TYPE["EN"] = 1] = "EN";
})(LANGUAGE_TYPE || (LANGUAGE_TYPE = {}));
//# sourceMappingURL=Language.js.map