var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelText = (function (_super) {
    __extends(ModelText, _super);
    function ModelText() {
        return _super.call(this) || this;
    }
    ModelText.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.cn = this.getXmlValue(result, "cn");
    };
    Object.defineProperty(ModelText.prototype, "local", {
        get: function () {
            var local = "";
            switch (Language.instance.type) {
                case LANGUAGE_TYPE.CN:
                    local = this.cn;
                    break;
                case LANGUAGE_TYPE.EN:
                    local = this.cn;
                    break;
            }
            return local;
        },
        enumerable: true,
        configurable: true
    });
    return ModelText;
}(ModelBase));
__reflect(ModelText.prototype, "ModelText");
//# sourceMappingURL=ModelText.js.map