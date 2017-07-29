class HttpUtil {
    public constructor() {
    }

    public static sendGetRequest(url: string, callback: (event: egret.Event) => void, source: Object): void {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "text/plain");
        request.send();
        if (callback) {
            request.addEventListener(egret.Event.COMPLETE, callback, source);
        }
    }

    public static sendPostStringRequest(url: string, callback: (event: egret.Event) => void, source: Object, data: string) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "text/plain");
        request.send(data);
        if (callback) {
            request.addEventListener(egret.Event.COMPLETE, callback, source);
        }
    }
}