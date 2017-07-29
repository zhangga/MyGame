//https://open.mobile.qq.com/api/h5plus/install#api:接入流程简介
//http://qzs.qzone.qq.com/qzone/qzact/act/game/wanba/wiki.html#玩吧支付接入指导文档

var SDKWanBaJS;
(function (SDKWanBaJS) {
    function _init(shortcutOption) {
        window.mqq.invoke('ui', 'setOnAddShortcutHandler', {
            'callback': mqq.callback(function () {
                var url = window.location.href;
                if (window.OPEN_DATA && window.OPEN_DATA.jumpurl) {
                    url = window.OPEN_DATA.jumpurl;
                }
                mqq.ui.addShortcut({
                    action: 'web',
                    title: shortcutOption.title,
                    icon: shortcutOption.image,
                    url: url,
                    callback: function (ret) { }
                });
            }, false, true)
        });
    }
    SDKWanBaJS.init = _init;

    function _getOpenDataSync() {
        return window.OPEN_DATA;
    }
    SDKWanBaJS.getOpenDataSync = _getOpenDataSync;

    function _pay(option) {
        window.__paySuccess = option.paySuccess;
        window.__payError = option.payError;
        window.__payClose = option.payClose;

        window.popPayTips({
            defaultScore: option.defaultScore,
            appid: option.appid
        });
    }
    SDKWanBaJS.pay = _pay;

    // 设置分享按钮监听事件
    function _setOnShareHandler(option, callback) {
        //手机QQ、手机QQ空间或微信：SQ-手Q，QZ-手空，WX-微信
        var app = window.OPEN_DATA.qua.app;
        // //AND-安卓，IPH-IOS
        // var os = window.OPEN_DATA.qua.os;
        console.log("_setOnShareHandler app:" + app);
        if (app == "SQ") {
            // 点击分享事件监听
            mqq.ui.setOnShareHandler(function (type) {
                _doShare(type, option, callback);
            });
        } else {
            // QZ
            mqq.invoke("game", "setShare",
                _getQZShareData(option),
                function (data) {
                    console.log("QZ setShare："+JSON.stringify(data));
                }
            );
        }
    }

    SDKWanBaJS.setOnShareHandler = _setOnShareHandler;

    // 调用分享接口
    function _doShare(type, option, callback) {
        console.log("_doShare app:" + option.url);
        if (!option.url) {
            return;
        }
        var fixedResult = { retCode: 0 };
        
        var app = window.OPEN_DATA.qua.app;
        if (app == "SQ") {
            mqq.ui.shareMessage({
                title: option.title,
                desc: option.desc,
                share_type: type,
                share_url: option.url,
                image_url: option.image,
                back: true
            }, function (result) {
                console.log("SQ shareMessage result.retCode:" + result.retCode);
                fixedResult.retCode = (result.retCode == 0);
                //console.log(callback);
                callback(fixedResult);
            });
        }else{
            var to;
            switch(type){
                case 0:to="toQQ";break;
                case 1:to="toQz";break;
                case 2:to="toWX";break;
                case 3:to="toTL";break;
            }
            mqq.invoke("share", to,{
                    imgUrl:option.image,
                    title:option.title,
                    desc:option.desc,
                    link:option.url
                },function(evt){
                    console.log("QZ shareTo result.code:" + result.code);
                    fixedResult.retCode = (evt.code == 0);
                    callback(fixedResult);
                }
            );
        }
    }
    SDKWanBaJS.doShare = _doShare;

    function _getQZShareData(option) {
        var data =
            {
                'type': "share",
                'image': [option.image, option.image, option.image, option.image, option.image],//分别为默认文案、QQ空间、手机QQ、微信、微信朋友圈,下同
                'title': [option.title, option.title, option.title, option.title, option.title],
                'summary': [option.desc, option.desc, option.desc, option.desc, option.desc],
                'shareURL': [option.url, option.url, option.url, option.url, option.url],
            };
        return data;
    }

    // 调用分享菜单
    function _showShareMenu(option, callback) {
        var app = window.OPEN_DATA.qua.app;
        console.log("_showShareMenu app:" + app);
        if (app == "SQ") {
            // 显示menu
            _setOnShareHandler(option, callback);
            mqq.ui.showShareMenu();
        } else {
            if (!option.url) {
                _setOnShareHandler(option, callback);
                return;
            }
            var fixedResult = { retCode: 0 };
            mqq.invoke("game", "qzoneGameBar",
                _getQZShareData(option),
                function (evt) {
                    console.log("qzoneGameBar result.code:" + result.code);
                    fixedResult.retCode = (evt.code == 0);
                    callback(fixedResult);
                }
            );
        }
    }
    SDKWanBaJS.showShareMenu = _showShareMenu;

    function _register(option, callback){
        window.reportRegister();
    }
    SDKWanBaJS.register = _register;

    function _login(option, callback){
        window.reportLogin();
    }
    SDKWanBaJS.login = _login;
})(SDKWanBaJS || (SDKWanBaJS = {}));


