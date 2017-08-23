class GameCommon {
	private static _instance: GameCommon;
	private static unitName2Id = GameCommon.onInitUnit();

	public constructor() {
	}
	public static get instance(): GameCommon {
		if (!this._instance) {
			this._instance = new GameCommon();
		}
		return this._instance;
	}

	/**
	 * 将XML中的条件数据转换为ConditionData
	 */
	public parseCondition(value: string): ConditionData {
		var condition: ConditionData = new ConditionData();
		if (value) {
			var vs: string[] = value.split(",");
			if (vs.length == 3) {
				condition.type = parseInt(vs[0]);
				condition.id = parseInt(vs[1]);
				condition.value = parseInt(vs[2]);
			}
		}
		return condition;
	}

	/**
	 * 将一个x,y格式的字符串转换为Grid对象
	 */
	public parseGrid(value: string): Grid {
		var grid: Grid = new Grid();
		if (value) {
			var vs: string[] = value.split(",");
			if (vs.length == 2) {
				grid.x = parseInt(vs[0]);
				grid.y = parseInt(vs[1]);
			}
		}
		return grid;
	}

	/**两个格子的距离 */
	public distance(a: Grid, b: Grid): number {
		return Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2);
	}

	public addChildByLayer(target: egret.DisplayObject, parent: egret.DisplayObjectContainer, pos: egret.Point, register?: egret.Point) {
		if (register) {
			target.anchorOffsetX = register.x;
			target.anchorOffsetY = register.y;
		}
		target.x = pos.x;
		target.y = pos.y;
		parent.addChild(target);
	}
	public getPos(row: number, col: number, rowOff: number = 2, rowBottom: number = 4): egret.Point {
		var offX = Math.floor(col * Math.random()) * _GF.stageWidth / col + Math.floor(_GF.stageWidth / col * Math.random());
		var offY = Math.floor(((row - rowBottom) * Math.random() + rowOff)) * _GF.stageHeight / row + Math.floor(_GF.stageHeight / row * Math.random());
		return new egret.Point(offX, offY);
	}
	public addAlert(text: string): void {
		PromptPanel.getInstance().addPromptError(text);
	}
	public addAlertError(id: number): void {
		this.addAlert(GameErrorTip.getInstance().getGameErrorTip(id));
	}
	//根据id 和 type 获取物品的model
	public getThingModel(type, modelId, quality?: number): ModelThing {
		var _model: ModelThing;
		switch (type) {
			case GOODS_TYPE.GOLD:
				if (!ModelManager.instance.modelItem["BIND_MONEY"]) {
					var _bindMoneyModel: ModelItem = new ModelItem();
					_bindMoneyModel.name = Language.instance.getDescByKey(`money_${type}`);
					_bindMoneyModel.quality = GoodsQuality.Purple;
					_bindMoneyModel.icon = "mainview_gold_png";
					_bindMoneyModel.dropicon = "mainview_gold_png";
					_bindMoneyModel.payIcon = "mainview_gold_png";
					_bindMoneyModel.type = type;
					_bindMoneyModel.des = "罕见货币，通过活动及游戏内系统产出，可以在商场中购买各种道具。";
					ModelManager.instance.modelItem["BIND_MONEY"] = _bindMoneyModel;
				}
				_model = ModelManager.instance.modelItem["BIND_MONEY"];
				break;
			case GOODS_TYPE.DIAMOND:
				if (!ModelManager.instance.modelItem["GOLD"]) {
					var _goldModel: ModelItem = new ModelItem();
					_goldModel.name = Language.instance.getDescByKey(`money_${type}`);
					_goldModel.icon = "icon_goods_diamond_png";
					_goldModel.dropicon = "mainview_gold_png";
					_goldModel.payIcon = "mainview_gold_png";
					_goldModel.quality = GoodsQuality.Orange;
					_goldModel.type = type;
					_goldModel.des = "珍稀的货币，仅可通过充值获得，可用于在商城中购买各种道具以及参与各类活动。";
					ModelManager.instance.modelItem["GOLD"] = _goldModel;
				}
				_model = ModelManager.instance.modelItem["GOLD"];
				break;
			case GOODS_TYPE.ARTIFACT:
				if (!ModelManager.instance.modelItem["ARTIFACT"]) {
					var _goldModel: ModelItem = new ModelItem();
					_goldModel.name = Language.instance.getDescByKey(`money_${type}`);
					_goldModel.icon = "icon_goods_shenqidian_png";
					_goldModel.dropicon = "icon_goods_shenqidian_png";
					_goldModel.payIcon = "icon_goods_shenqidian_png";
					_goldModel.quality = GoodsQuality.Orange;
					_goldModel.type = type;
					_goldModel.des = "珍稀的货币，仅可通过充值获得，可用于在商城中购买各种道具以及参与各类活动。";
					ModelManager.instance.modelItem["ARTIFACT"] = _goldModel;
				}
				_model = ModelManager.instance.modelItem["ARTIFACT"];
				break;
			case GOODS_TYPE.DECORATE:
				if (!ModelManager.instance.modelItem["DECORATE"]) {
					var _decorateModel: ModelDecorate = ModelManager.instance.modelDecorate[modelId];
					if (_decorateModel) {
						var _decorateItem: ModelItem = new ModelItem();
						_decorateItem.name = _decorateModel.name;
						_decorateItem.icon = _decorateModel.icon;
						_decorateItem.quality = _decorateModel.pinzhi;
						_decorateItem.type = type;
						ModelManager.instance.modelItem["ARTIFACT"] = _decorateItem;
					}
				}
				_model = ModelManager.instance.modelItem["ARTIFACT"];
				break;
		}
		return _model;
	}
	public addHintBar(message: Message) {
		var code = message.getShort();
		Tool.log("400 - code:" + code);
		this.addAlert(GameErrorTip.getInstance().getGameErrorTip(code));
	}
	//配置带颜色的HTML字 格式：[#00ff00XXXXXXXX] 转化成<font color='#00ff00'>XXXXXXX</font>
	public readStringToHtml(oldString: string): string {
		var _newHtmlString: string = "";
		if (oldString) {
			var matchStrAry: RegExpMatchArray = oldString.match(/\[#[0-9a-fA-F]{6}.*?]/g);
			if (matchStrAry) {
				for (var i: number = 0; i < matchStrAry.length; i++) {
					var matchStr: string = matchStrAry[i];
					var _colorStr: string = matchStr.slice(1, 8);
					var _descStr: string = matchStr.slice(8, matchStr.length - 1);
					var _htmlStr: string = "<font color='" + _colorStr + "'>" + _descStr + "</font>";
					oldString = oldString.replace(/\[#[0-9a-fA-F]{6}.*?]/, _htmlStr);
				}
			}
			_newHtmlString = oldString;
		}
		return _newHtmlString;
	}
	/**显示警告界面**/
	public onShowWarnigPanel(param: WarningParam): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("WarningPanel", param));
	}
	/**显示奖励界面**/
	public onShowAwardHint(descKey: string, award: ModelAward): void {
		var _alertParam: AlertHintParam = new AlertHintParam(0, Language.instance.getDescByKey(descKey), award);
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("AlertHint", _alertParam));
	}

	public getQualityFrame(quality: number): string {
		return `item_quality_frame${quality}_png`;
	}

	public getQualityBar(quality: number): string {
		return `item_quality_bar${quality}_png`;
	}
	/**
	  * 添加动画到某层
	  * 
	  **/
	public addAnimation(display: egret.DisplayObjectContainer, resName: string, pos: egret.Point = new egret.Point(), playNum: number = -1, autoRemove: boolean = false): Animation {
		var anim = new Animation(resName, playNum, autoRemove);
		anim.x = pos.x;
		anim.y = pos.y;
		display.addChild(anim);
		return anim;
	}
	public static toTextFormat(num: Number): string {
		if (num.valueOf() >= 1000) {
			var str = num.toExponential(6);
			var param = str.split("e+");
			var index: number = param[0].indexOf(".");
			var param2 = param[0].split(".");
			var offbit: number = 0;
			if (index > 1) {
				offbit = Math.ceil(parseInt(param2[0]) / 10);
			}
			var amountS = param2.join("");
			var unit = Math.floor((parseInt(param[1]) + offbit) / 3);
			offbit = (parseInt(param[1]) + offbit) % 3;
			var pointL: string = amountS.substr(0, index + offbit);
			var pointR: string = amountS.substr(index + offbit, 2);
			return pointL + "." + pointR + this.unitName2Id[unit];
		} else {
			var showNum: number = num.valueOf();
			if (showNum < 1000) {
				showNum = Math.floor(showNum);
			}
			return showNum.toString();
		}
	}
	private static onInitUnit() {
		var ret: string[] = [];
		var array = ["0", "K", "M", "B", "G", "T"];
		for (var i = 0; i < array.length; i++) {
			ret.push(array[i]);
		}
		var preLength = array.length;
		var loop = 26;
		// AA~ZZ
		for (var i = 0; i < loop; i++) {
			var l: string = String.fromCharCode("A".charCodeAt(0) + i);
			for (var j = 0; j < loop; j++) {
				var r: string = String.fromCharCode("A".charCodeAt(0) + j);
				var lr: string = l + r;
				ret.push(lr);
			}
		}
		return ret;
	}
	//通过秒来获得时间格式 天时分秒，keep保持显示第几位 秒分时天
	public getTimeStrForSec1(sec: number, keepNum: number = 2, Accurate: number = 0) {
		var timeDesc: string = "";
		var _dayNum = Math.floor(sec / 86400);
		if (_dayNum > 0)
			timeDesc += _dayNum + "天";
		else if (keepNum >= 3)
			timeDesc += "0天";
		sec = sec - _dayNum * 86400;
		if (Accurate == 3) return timeDesc;

		var _hoursNum = Math.floor(sec / 3600);
		if (_hoursNum > 0)
			timeDesc += _hoursNum + "小时";
		else if (keepNum >= 2)
			timeDesc += "0小时";
		sec = sec - _hoursNum * 3600;
		if (Accurate == 2) return timeDesc;

		var _minutesNum = Math.floor(sec / 60);
		if (_minutesNum > 0) {
			timeDesc += _minutesNum < 10 ? "0" + _minutesNum + "分" : _minutesNum + "分";
		} else if (keepNum >= 1) {
			timeDesc += "00分";
		}
		if (Accurate == 1) return timeDesc;

		sec = sec - _minutesNum * 60;
		var _secondsNum = Math.floor(sec);
		timeDesc += _secondsNum < 10 ? "0" + _secondsNum + "秒" : _secondsNum + "秒";
		return timeDesc;
	}
	public getTimeStrForSec2(sec: number, hasHours: boolean = true) {
		var timeDesc: string = "";

		var _hoursNum = Math.floor(sec / 3600);
		if (hasHours || _hoursNum > 0) {
			timeDesc += _hoursNum < 10 ? "0" + _hoursNum : _hoursNum + "";
			timeDesc += "：";
			sec = sec - _hoursNum * 3600;
		}

		var _minutesNum = Math.floor(sec / 60);
		timeDesc += _minutesNum < 10 ? "0" + _minutesNum : _minutesNum + "";
		timeDesc += "：";
		sec = sec - _minutesNum * 60;

		var _secondsNum = Math.floor(sec);
		timeDesc += _secondsNum < 10 ? "0" + _secondsNum : _secondsNum + "";

		return timeDesc;
	}
	public getOnlineTime(sec): string {
		if (sec <= 0)
			return `在线`;
		var _dayNum = Math.floor(sec / 86400);
		if (_dayNum > 0)
			return `${_dayNum}天前`;
		var _hoursNum = Math.floor(sec / 3600);
		if (_hoursNum > 0)
			return `${_hoursNum}小时前`;
		var _minutesNum = Math.floor(sec / 60);
		if (_minutesNum > 0) {
			return `${_minutesNum}分钟前`;
		} else {
			return `刚刚`;
		}
	}

	/**
	 * 返回区间[min, max]的随机数
	 */
	public getRangedRandom(min: number, max: number): number {
		if (min >= max) {
			return min;
		}
		else {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
}