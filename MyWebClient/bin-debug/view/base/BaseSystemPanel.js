var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseSystemPanel = (function (_super) {
    __extends(BaseSystemPanel, _super);
    function BaseSystemPanel(owner) {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.tabs = {};
        _this.tabFs = {};
        _this.allwindows = {};
        _this.alerts = {};
        _this.isShowAlert = false;
        _this.windowNames = {};
        _this.lockIDs = {};
        _this.owner = owner;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        return _this;
    }
    //添加到舞台
    BaseSystemPanel.prototype.onAddToStage = function () {
        this.onSkinName();
    };
    //皮肤加载完成
    BaseSystemPanel.prototype.onLoadComplete = function () {
        this.onloadComp = true;
        this.onInit();
    };
    BaseSystemPanel.prototype.onSkinName = function () {
    };
    BaseSystemPanel.prototype.onInit = function () {
    };
    BaseSystemPanel.prototype.onRegist = function () {
        var btn;
        for (var key in this.tabFs) {
            this.tabFs[key].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        }
        GameDispatcher.instance.addEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTouchTab, this);
    };
    BaseSystemPanel.prototype.onRemove = function () {
        for (var key in this.tabFs) {
            this.tabFs[key].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        }
        this.index = 0;
        GameDispatcher.instance.removeEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTouchTab, this);
    };
    BaseSystemPanel.prototype.registerPage = function (sysInfo, btnGrp, pos, isResetIndex) {
        if (pos === void 0) { pos = GameDefine.RED_TAB_POS; }
        if (isResetIndex === void 0) { isResetIndex = false; }
        if (!sysInfo)
            return;
        var btn;
        var len = sysInfo.length;
        for (var i = 0; i < sysInfo.length; i++) {
            this.windowNames[i] = sysInfo[i].sysName;
        }
        var imgPoint;
        if (this.basic && this.basic["btnTabLayer"]) {
            if (this.basic["btnTabLayer"].numChildren > 0) {
                this.basic["btnTabLayer"].removeChildren();
            }
            this.lockIDs = {};
            this.tabFs = {};
            this.allwindows = {};
            if (isResetIndex) {
                this.index = 0;
            }
            for (var i = 0; i < len; i++) {
                if (sysInfo[i].btnRes == "")
                    continue;
                var grp = new eui.Group();
                grp.touchEnabled = true;
                grp.name = i.toString();
                btn = new eui.RadioButton();
                btn.value = i;
                btn.groupName = btnGrp;
                btn.skinName = this.getTabButtonSkin(sysInfo[i].btnRes);
                btn.touchEnabled = false;
                this.tabs[i] = btn;
                this.tabFs[i] = grp;
                if (sysInfo[i].redP) {
                    sysInfo[i].redP.addRedPointImg(btn, pos);
                }
                if (sysInfo[i].funcID != -1) {
                    this.lockIDs[i] = sysInfo[i].funcID;
                }
                grp.addChild(btn);
                this.basic["btnTabLayer"].addChild(grp);
            }
        }
    };
    BaseSystemPanel.prototype.getTabButtonSkin = function (btnRes) {
        return GameSkin.getBaseTabButtonSkin(btnRes);
    };
    BaseSystemPanel.prototype.onTouchTab = function (e) {
        var index = parseInt(e.data);
        // if (this.lockIDs[index]) {
        // 	if (FunDefine.onIsLockandErrorHint(this.lockIDs[index])) return;
        // }
        if (this.index != index) {
            this.index = index;
            this.onRefresh();
        }
    };
    BaseSystemPanel.prototype.onRefresh = function () {
        this.onShowPanel();
        this.refreshFunOpen();
        this.trigger();
    };
    BaseSystemPanel.prototype.onShowPanel = function () {
        if (this.currPanel) {
            this.currPanel.onHide();
            this.isShowAlert = false;
        }
        this.currPanel = this.allwindows[this.index];
        if (!this.currPanel) {
            var windowName = this.windowNames[this.index];
            if (!windowName)
                return;
            this.currPanel = new window[windowName](this);
            this.allwindows[this.index] = this.currPanel;
            this.tabLayer.addChild(this.currPanel);
        }
        else {
            this.tabLayer.addChild(this.currPanel);
            this.currPanel.onShow();
        }
        if (this.tabs[this.index]) {
            this.tabs[this.index].selected = true;
        }
    };
    BaseSystemPanel.prototype.onShowAlertByName = function (panelName) {
        if (this.currPanel) {
            this.currPanel.onHide();
        }
        this.currPanel = this.alerts[panelName];
        if (!this.currPanel) {
            this.currPanel = new window[panelName]();
            this.alerts[panelName] = this.currPanel;
            this.tabLayer.addChild(this.currPanel);
        }
        else {
            this.tabLayer.addChild(this.currPanel);
            this.currPanel.onShow();
        }
        this.isShowAlert = true;
    };
    BaseSystemPanel.prototype.refreshFunOpen = function () {
    };
    BaseSystemPanel.prototype.onLevelChange = function (e) {
        if (e.data) {
            this.refreshFunOpen();
        }
    };
    BaseSystemPanel.prototype.addTabChild = function (panelName) {
        if (this.currPanel) {
            this.currPanel.onHide();
        }
        this.currPanel = this.allwindows[panelName];
        if (!this.currPanel) {
            this.currPanel = new window[panelName](this.owner);
            this.allwindows[panelName] = this.currPanel;
        }
        this.tabLayer.addChild(this.currPanel);
        this.currPanel.onShow();
        this.index = -1;
    };
    BaseSystemPanel.prototype.trigger = function () {
        if (this.currPanel) {
            this.currPanel.trigger();
        }
    };
    Object.defineProperty(BaseSystemPanel.prototype, "lockGroup", {
        get: function () {
            if (this.basic) {
                return this.basic["lockGroup"];
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseSystemPanel.prototype.onTimeOut = function () {
    };
    Object.defineProperty(BaseSystemPanel.prototype, "tab", {
        get: function () {
            return this.index;
        },
        enumerable: true,
        configurable: true
    });
    return BaseSystemPanel;
}(eui.Component));
__reflect(BaseSystemPanel.prototype, "BaseSystemPanel");
var RegisterSystemParam = (function () {
    function RegisterSystemParam(sysName, btnRes, redP, funcID) {
        this.funcID = -1;
        this.sysName = sysName;
        this.btnRes = btnRes;
        this.redP = redP;
        this.funcID = funcID;
    }
    return RegisterSystemParam;
}());
__reflect(RegisterSystemParam.prototype, "RegisterSystemParam");
//# sourceMappingURL=BaseSystemPanel.js.map