class ModelManager {
	private static _instance: ModelManager;
	public constructor() {
		this.onInit();
	}
	public static get instance(): ModelManager {
		if (!this._instance) {
			this._instance = new ModelManager();
		}
		return this._instance;
	}
	public onInit() {
	}

	//语言文件
	private _modelText;
	public get modelText() {
		if (!this._modelText) {
			this._modelText = {};
			this.initModel(this._modelText, ModelText, "text.xml");
		}
		return this._modelText;
	}

	//地图
	private _modelMap;
	public get modelMap() {
		if (!this._modelMap) {
			this._modelMap = {};
			this.initModel(this._modelMap, ModelMap, "map.xml");
		}
		return this._modelMap;
	}






















	private _modelFish;
	public get modelFish() {
		if (!this._modelFish) {
			this._modelFish = {};
			this.initModel(this._modelFish, ModelFish, "fish.xml");
		}
		return this._modelFish;
	}

	private _modelDecorate;
	public get modelDecorate() {
		if (!this._modelDecorate) {
			this._modelDecorate = {};
			this.initModel(this._modelDecorate, ModelDecorate, "shenqi.xml");
		}
		return this._modelDecorate;
	}

	private _modelShop;
	public get modelShop() {
		if (!this._modelShop) {
			this._modelShop = {};
			this.initModel(this._modelShop, ModelShop, "shop.xml");
		}
		return this._modelShop;
	}

	private _modelItem;
	public get modelItem() {
		if (!this._modelItem) {
			this._modelItem = {};
			this.initModel(this._modelItem, ModelItem, "item.xml");
		}
		return this._modelItem;
	}

	private _modelLevel;
	public get modelLevel() {
		if (!this._modelLevel) {
			this._modelLevel = {};
			this.initModel(this._modelLevel, ModelLevel, "level.xml");
		}
		return this._modelLevel;
	}

	private _modelSynthetic;
	public get modelSynthetic() {
		if (!this._modelSynthetic) {
			this._modelSynthetic = {};
			this.initModel(this._modelSynthetic, ModelSynthetic, "hecheng.xml");
		}
		return this._modelSynthetic;
	}

	private _modeldailytask;
	public get modelDailyTask() {
		if (!this._modeldailytask) {
			this._modeldailytask = {};
			this.initModel(this._modeldailytask, ModelDailyTask, "taskDaily.xml");
		}
		return this._modeldailytask;
	}

	private _modelAchieve;
	public get modelAchieve() {
		if (!this._modelAchieve) {
			this._modelAchieve = {};
			this.initModel(this._modelAchieve, ModelAchieve, "chengjiu.xml");
		}
		return this._modelAchieve;
	}

	private _modelBron;
	public get modelBron() {
		if (!this._modelBron) {
			this._modelBron = {};
			this.initModel(this._modelBron, ModelBron, "born.xml");
		}
		return this._modelBron;
	}

	private _modelSevenLogin;
	public get modelSevenLogin(): ModelSevenLogin[] {
		if (!this._modelSevenLogin) {
			this._modelSevenLogin = [];
			this.initModel(this._modelSevenLogin, ModelSevenLogin, "qiridenglu.xml");
		}
		return this._modelSevenLogin;
	}

	private _modelTechnology;
	public get modelTechnology(): Object {
		if (!this._modelTechnology) {
			this._modelTechnology = {};
			this.initModel(this._modelTechnology, ModelTechnology, "keji.xml");
		}
		return this._modelTechnology;
	}


	private _modelTurnplate;
	public get modelTurnplate(): Object {
		if (!this._modelTurnplate) {
			this._modelTurnplate = {};
			this.initModel(this._modelTurnplate, ModelTurnplate, "zhuanpan.xml");
		}
		return this._modelTurnplate;
	}

	private _modelEffect;
	public get modelEffect(): Object {
		if (!this._modelEffect) {
			this._modelEffect = {};
			this.initModel(this._modelEffect, ModelEffect, "effect.xml");
		}
		return this._modelEffect;
	}

	private _modelFieldGuide;
	public get modelFieldGuide() {
		if (!this._modelFieldGuide) {
			this._modelFieldGuide = {};
			this.initModel(this._modelFieldGuide, ModelFieldGuide, "yugang.xml");
		}
		return this._modelFieldGuide;
	}

	private _modelRandEvent;
	public get modelRandEvent() {
		if (!this._modelRandEvent) {
			this._modelRandEvent = {};
			this.initModel(this._modelRandEvent, ModelRandEvent, "specialStage.xml");
		}
		return this._modelRandEvent;
	}

	private _modelMonthCard;
	public get modelMonthCard() {
		if (!this._modelMonthCard) {
			this._modelMonthCard = {};
			this.initModel(this._modelMonthCard, ModelMonthCard, "yueka.xml");
		}
		return this._modelMonthCard;
	}


	/**
	* 初始化模型
	* map：数据保存集合
	* classz：类名
	* xml：xml的地址
	*/
	public initModel(map, classz, xml, isAll = false) {
		if (map && classz && xml) {
			var res: egret.XML = this.readZipToXml("model_zzp", xml);
			var mapType = 0;
			if (map instanceof Array) {
				mapType = 1;
			}
			for (var i = 0; i < res.children.length; ++i) {
				var model = new classz();
				model.parseXML(<egret.XML>res.children[i]);
				if (isAll) {
					map.push(model);
					map[model.id] = model;
				} else {
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
		} else {
			Tool.throwException();
		}
	}

	/**实时解析类型**/
    public parseXmlToModel(map, classz, xml, isAll = false): void {
        if (map && classz && xml) {
            var res: egret.XML = <egret.XML>RES.getRes(xml);
            var mapType = 0;
            if (map instanceof Array) {
                mapType = 1;
            }
            for (var i = 0; i < res.children.length; ++i) {
                var model = new classz();
                model.parseXML(<egret.XML>res.children[i]);
                if (isAll) {
                    map.push(model);
                    map[model.id] = model;
                } else {
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
        } else {
            Tool.throwException();
        }
    }
	
	//解压ZIP
	public readZipToXml(resKey: string, xmlName: string): egret.XML {
		try {
			var zip = new JSZip().load(RES.getRes("model_zzp"), "");
			var xml = zip.file(xmlName).asText();
			xml = xml.replace(/\<?.*?\/?>/, "");
			return egret.XML.parse(xml);
		} catch (e) {
			Tool.throwException();
		}
	}
}