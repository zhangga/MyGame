var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModelManager = (function () {
    function ModelManager() {
        this.modelFishs = {};
        this.onInit();
    }
    Object.defineProperty(ModelManager, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new ModelManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ModelManager.prototype.onInit = function () {
    };
    Object.defineProperty(ModelManager.prototype, "modelFish", {
        get: function () {
            if (!this._modelFish) {
                this._modelFish = {};
                this.initModel(this._modelFish, ModelFish, "fish.xml");
            }
            return this._modelFish;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelDecorate", {
        get: function () {
            if (!this._modelDecorate) {
                this._modelDecorate = {};
                this.initModel(this._modelDecorate, ModelDecorate, "shenqi.xml");
            }
            return this._modelDecorate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelShop", {
        get: function () {
            if (!this._modelShop) {
                this._modelShop = {};
                this.initModel(this._modelShop, ModelShop, "shop.xml");
            }
            return this._modelShop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelItem", {
        get: function () {
            if (!this._modelItem) {
                this._modelItem = {};
                this.initModel(this._modelItem, ModelItem, "item.xml");
            }
            return this._modelItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelLevel", {
        get: function () {
            if (!this._modelLevel) {
                this._modelLevel = {};
                this.initModel(this._modelLevel, ModelLevel, "level.xml");
            }
            return this._modelLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelSynthetic", {
        get: function () {
            if (!this._modelSynthetic) {
                this._modelSynthetic = {};
                this.initModel(this._modelSynthetic, ModelSynthetic, "hecheng.xml");
            }
            return this._modelSynthetic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelDailyTask", {
        get: function () {
            if (!this._modeldailytask) {
                this._modeldailytask = {};
                this.initModel(this._modeldailytask, ModelDailyTask, "taskDaily.xml");
            }
            return this._modeldailytask;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelAchieve", {
        get: function () {
            if (!this._modelAchieve) {
                this._modelAchieve = {};
                this.initModel(this._modelAchieve, ModelAchieve, "chengjiu.xml");
            }
            return this._modelAchieve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelBron", {
        get: function () {
            if (!this._modelBron) {
                this._modelBron = {};
                this.initModel(this._modelBron, ModelBron, "born.xml");
            }
            return this._modelBron;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelSevenLogin", {
        get: function () {
            if (!this._modelSevenLogin) {
                this._modelSevenLogin = [];
                this.initModel(this._modelSevenLogin, ModelSevenLogin, "qiridenglu.xml");
            }
            return this._modelSevenLogin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelTechnology", {
        get: function () {
            if (!this._modelTechnology) {
                this._modelTechnology = {};
                this.initModel(this._modelTechnology, ModelTechnology, "keji.xml");
            }
            return this._modelTechnology;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelText", {
        get: function () {
            if (!this._modelText) {
                this._modelText = {};
                this.initModel(this._modelText, ModelText, "text.xml");
            }
            return this._modelText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelTurnplate", {
        get: function () {
            if (!this._modelTurnplate) {
                this._modelTurnplate = {};
                this.initModel(this._modelTurnplate, ModelTurnplate, "zhuanpan.xml");
            }
            return this._modelTurnplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelEffect", {
        get: function () {
            if (!this._modelEffect) {
                this._modelEffect = {};
                this.initModel(this._modelEffect, ModelEffect, "effect.xml");
            }
            return this._modelEffect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelFieldGuide", {
        get: function () {
            if (!this._modelFieldGuide) {
                this._modelFieldGuide = {};
                this.initModel(this._modelFieldGuide, ModelFieldGuide, "yugang.xml");
            }
            return this._modelFieldGuide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelRandEvent", {
        get: function () {
            if (!this._modelRandEvent) {
                this._modelRandEvent = {};
                this.initModel(this._modelRandEvent, ModelRandEvent, "specialStage.xml");
            }
            return this._modelRandEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelManager.prototype, "modelMonthCard", {
        get: function () {
            if (!this._modelMonthCard) {
                this._modelMonthCard = {};
                this.initModel(this._modelMonthCard, ModelMonthCard, "yueka.xml");
            }
            return this._modelMonthCard;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 初始化模型
    * map：数据保存集合
    * classz：类名
    * xml：xml的地址
    */
    ModelManager.prototype.initModel = function (map, classz, xml, isAll) {
        if (isAll === void 0) { isAll = false; }
        if (map && classz && xml) {
            var res = this.readZipToXml("model_zzp", xml);
            var mapType = 0;
            if (map instanceof Array) {
                mapType = 1;
            }
            for (var i = 0; i < res.children.length; ++i) {
                var model = new classz();
                model.parseXML(res.children[i]);
                if (isAll) {
                    map.push(model);
                    map[model.id] = model;
                }
                else {
                    switch (mapType) {
                        case 0:
                            map[model.id] = model;
                            break;
                        case 1:
                            map.push(model);
                            break;
                    }
                }
            }
        }
        else {
            Tool.throwException();
        }
    };
    //解压ZIP
    ModelManager.prototype.readZipToXml = function (resKey, xmlName) {
        try {
            var zip = new JSZip().load(RES.getRes("model_zzp"), "");
            var xml = zip.file(xmlName).asText();
            xml = xml.replace(/\<?.*?\/?>/, "");
            return egret.XML.parse(xml);
        }
        catch (e) {
            Tool.throwException();
        }
    };
    return ModelManager;
}());
__reflect(ModelManager.prototype, "ModelManager");
//# sourceMappingURL=ModelManager.js.map