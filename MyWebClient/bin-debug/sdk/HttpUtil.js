var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpUtil = (function () {
    function HttpUtil() {
    }
    HttpUtil.sendGetRequest = function (url, callback, source) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "text/plain");
        request.send();
        if (callback) {
            request.addEventListener(egret.Event.COMPLETE, callback, source);
        }
    };
    HttpUtil.sendPostStringRequest = function (url, callback, source, data) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "text/plain");
        request.send(data);
        if (callback) {
            request.addEventListener(egret.Event.COMPLETE, callback, source);
        }
    };
    return HttpUtil;
}());
__reflect(HttpUtil.prototype, "HttpUtil");
//# sourceMappingURL=HttpUtil.js.map