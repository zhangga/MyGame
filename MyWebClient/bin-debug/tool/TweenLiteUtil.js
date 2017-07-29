var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/***
 * 动画效果管理
 *万有畅想 LYJ.
*/
var TweenLiteUtil = (function () {
    function TweenLiteUtil() {
    }
    /**
     * 飘字动画
     * fontThing 作用对象，callFunc callObj回调对象，flyDir飞行方向（-1左，1右） scaleValue缩放值
     * */
    // public static fontFly(fontThing: egret.DisplayObject, callFunc: Function, callObj, flyDir: number = 1, scaleValue: number = 1) {
    //     var _endPos: any = new egret.Point();
    //     var cusFlyInTime: number = 1000;
    //     var cusOffX: number = (100 + this.getRD(60)) * flyDir;
    //     var cusOffY: number = this.getRD(200) - 100;
    //     _endPos.x = fontThing.x + cusOffX;
    //     _endPos.y = fontThing.y + cusOffY;
    //     var _tweenM = egret.Tween.get(fontThing);
    //     var finishFunc: Function = function () {
    //         egret.Tween.removeTweens(fontThing);
    //         if (fontThing.parent) {
    //             fontThing.parent.removeChild(fontThing);
    //         }
    //         if (callFunc != null && callObj != null) {
    //             Tool.callback(callFunc, callObj, fontThing);
    //         }
    //     }
    //     if (scaleValue > 1) {
    //         var _tweenScale = egret.Tween.get(fontThing);
    //         _tweenScale.to({ scaleX: scaleValue, scaleY: scaleValue }, cusFlyInTime * 0.3, egret.Ease.circOut)
    //             .to({ scaleX: scaleValue - 0.2, scaleY: scaleValue - 0.2 }, cusFlyInTime * 0.3, egret.Ease.circOut)
    //             .call(function (finishFunc: Function) {
    //                 _tweenScale = null;
    //             }, this);
    //     }
    //     _tweenM.to({ x: _endPos.x, y: _endPos.y }, cusFlyInTime * 0.8, egret.Ease.circOut)
    //         .to({ y: _endPos.y - 20 }, cusFlyInTime * 0.2, egret.Ease.circOut)
    //         .call(function (finishFunc: Function) {
    //             _tweenM = null;
    //             finishFunc.call(null);
    //         }, this, [finishFunc]);
    // }
    // //推人技能效果
    // public static pushEnemy(body1: ActionBody, body2: ActionBody, body1Point: egret.Point, body2Point: egret.Point, callFunc: Function, callObj): void {
    //     var _tween1: egret.Tween = egret.Tween.get(body1);
    //     _tween1.to({ x: body1Point.x, y: body1Point.y }, 510, egret.Ease.circOut)
    //         .call(function () {
    //             egret.Tween.removeTweens(body1);
    //             _tween1 = null;
    //             if (callFunc != null && callObj != null) {
    //                 Tool.callback(callFunc, callObj);
    //             }
    //         });
    //     var _tween2: egret.Tween = egret.Tween.get(body2);
    //     _tween2.to({ x: body2Point.x, y: body2Point.y }, 500, egret.Ease.circInOut);
    // }
    // //怪物死亡被打飞
    // public static deathFly(body: ActionBody, callFunc: Function, callObj, downPoint: egret.Point) {
    //     var cusFlyInTime: number = 1500;
    //     // var _flyHigh: number = -(100 + this.getRD(50));
    //     // var _offY: number = _flyHigh * 0.2;
    //     var _tween2 = egret.Tween.get(body);
    //     _tween2.to({ x: downPoint.x, y: downPoint.y }, cusFlyInTime, egret.Ease.circOut)
    //         .call(function () {
    //             egret.Tween.removeTweens(body);
    //             // _tween1 = null;
    //             _tween2 = null;
    //             // body.childOffY = 0;
    //             if (callFunc != null && callObj != null) {
    //                 Tool.callback(callFunc, callObj, body);
    //             }
    //         });
    //     // var _tween1 = egret.Tween.get(body);
    //     // _tween1.to({ childOffY: _flyHigh }, cusFlyInTime * 0.1, egret.Ease.circOut)
    //     //     .to({ childOffY: 0 }, cusFlyInTime * 0.3, egret.Ease.quartIn)
    //     //     .to({ childOffY: _offY }, 100, egret.Ease.circOut)
    //     //     .to({ childOffY: 0 }, 200, egret.Ease.quartIn)
    // }
    // //怪物死亡渐隐
    // public static deathEffect1(body: egret.DisplayObject, callFunc: Function, callObj): void {
    //     var _deathTween = egret.Tween.get(body);
    //     _deathTween.to({ alpha: 0 }, 500, egret.Ease.circIn)
    //         .call(function () {
    //             egret.Tween.removeTweens(body);
    //             _deathTween = null;
    //             Tool.callback(callFunc, callObj, body);
    //         });
    // }
    // //人物跳跃
    // public static bodyJumpFly(body: ActionBody, callFunc: Function, callObj, downPoint: egret.Point, cusFlyInTime: number) {
    //     var _flyHigh: number = -(80 + cusFlyInTime * 0.05);
    //     var _tween2 = egret.Tween.get(body);
    //     _tween2.to({ x: downPoint.x, y: downPoint.y }, cusFlyInTime * 0.9, egret.Ease.circOut);
    //     var _tween1 = egret.Tween.get(body);
    //     _tween1.to({ childOffY: _flyHigh }, cusFlyInTime * 0.5, egret.Ease.circOut)
    //         .to({ childOffY: 0 }, cusFlyInTime * 0.5, egret.Ease.quartIn)
    //         .call(function () {
    //             egret.Tween.removeTweens(body);
    //             _tween2 = null;
    //             _tween1 = null;
    //             body.childOffY = 0;
    //             if (callFunc != null && callObj != null) {
    //                 Tool.callback(callFunc, callObj, body);
    //             }
    //         });
    // }
    //物品掉落
    TweenLiteUtil.dropbodyFly1 = function (body, callFunc, callObj, dropPoint) {
        var currY = body.y;
        var distance = Math.floor(30 + Math.random() * 5);
        var _flyHigh = currY - distance;
        var _tween1 = egret.Tween.get(body);
        var time1 = distance * 3;
        var time2 = 0;
        var time3 = 700;
        time2 = Math.floor(dropPoint.y - _flyHigh) * 3;
        _tween1.to({ y: _flyHigh }, time1, egret.Ease.quartOut)
            .to({ y: dropPoint.y }, time2, egret.Ease.quartIn)
            .to({ y: dropPoint.y - 10 }, 30, egret.Ease.circIn)
            .to({ y: dropPoint.y }, time3, egret.Ease.bounceOut);
        var _tween2 = egret.Tween.get(body);
        _tween2.to({ x: dropPoint.x }, time1 + time2 + time3 + 30, egret.Ease.circOut)
            .call(function () {
            // egret.Tween.removeTweens(body);
            _tween2 = null;
            _tween1 = null;
            if (callFunc != null && callObj != null) {
                Tool.callback(callFunc, callObj, body);
            }
        });
    };
    //直接掉落
    TweenLiteUtil.dropbodyFly2 = function (body, callFunc, callObj, dropPoint) {
        var currY = body.y;
        var _tween1 = egret.Tween.get(body);
        var time2 = 0;
        var time3 = 700;
        time2 = Math.floor(dropPoint.y) * 3;
        _tween1.to({ y: dropPoint.y }, time2, egret.Ease.quartIn)
            .to({ y: dropPoint.y - 10 }, 30, egret.Ease.circIn)
            .to({ y: dropPoint.y }, time3, egret.Ease.bounceOut);
    };
    /**两点直线运动**/
    TweenLiteUtil.beelineTween = function (body, callFunc, callObj, targetPoint, ease, msec) {
        if (ease === void 0) { ease = egret.Ease.circOut; }
        if (msec === void 0) { msec = 600; }
        var _tween2 = egret.Tween.get(body);
        // var tweentiem = Math.floor(egret.Point.distance(new egret.Point(body.x, body.y), targetPoint) / 6) * 3;
        _tween2.to({ x: targetPoint.x, y: targetPoint.y }, msec, ease)
            .call(function () {
            egret.Tween.removeTweens(body);
            _tween2 = null;
            if (callFunc != null && callObj != null) {
                Tool.callback(callFunc, callObj, body);
            }
        });
    };
    /**获得奖励提示动画**/
    TweenLiteUtil.awardTween = function (body, callFunc, callObj, targetPoint) {
        var _tw = egret.Tween.get(body);
        _tw.to({ x: targetPoint.x, y: targetPoint.y }, 600, egret.Ease.backIn)
            .to({ alpha: 0 }, 300)
            .call(function () {
            egret.Tween.removeTweens(body);
            _tw = null;
            if (callFunc != null && callObj != null) {
                Tool.callback(callFunc, callObj, body);
            }
        });
    };
    /**鱼等级提升动画**/
    TweenLiteUtil.secOutputAddTween = function (body, callFunc, callObj, targetPoint) {
        body.scaleX = body.scaleY = 0;
        var _tw = egret.Tween.get(body);
        _tw.to({ scaleX: 1.4, scaleY: 1.4 }, 1200, egret.Ease.backOut)
            .to({ x: targetPoint.x, y: targetPoint.y, alpha: 0 }, 600)
            .call(function () {
            egret.Tween.removeTweens(body);
            _tw = null;
            if (callFunc != null && callObj != null) {
                Tool.callback(callFunc, callObj, body);
            }
        });
    };
    /**转盘转动动画**/
    TweenLiteUtil.TurnplateEffectTween = function (target, rotation, callFunc, callObj) {
        var _turnTween = egret.Tween.get(target);
        _turnTween.to({ rotation: target.rotation + 180 }, 500, egret.Ease.backIn)
            .to({ rotation: rotation - 720 }, Math.floor(rotation * 0.5))
            .to({ rotation: rotation - 180 }, 800)
            .to({ rotation: rotation }, 600, egret.Ease.sineOut)
            .call(function () {
            egret.Tween.removeTweens(target);
            _turnTween = null;
            if (callFunc != null && callObj != null) {
                Tool.callback(callFunc, callObj);
            }
        });
    };
    // //面板打开效果
    // public static openWindowEffect(window: egret.DisplayObject, callFunc: Function = null, callObj = null): void {
    //     window.scaleX = 0.6;
    //     window.scaleY = 0.6;
    //     var _windowTween = egret.Tween.get(window);
    //     _windowTween.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backInOut)
    //         .call(function () {
    //             egret.Tween.removeTweens(window);
    //             _windowTween = null;
    //             if (callFunc != null && callObj != null) {
    //                 Tool.callback(callFunc, callObj);
    //             }
    //         });
    // }
    TweenLiteUtil.getRD = function (value) {
        return Math.round((value * Math.random()));
    };
    return TweenLiteUtil;
}());
__reflect(TweenLiteUtil.prototype, "TweenLiteUtil");
//# sourceMappingURL=TweenLiteUtil.js.map