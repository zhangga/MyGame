class Tool {
	private static timerManager = {};
	private static callbacktimeManager = {};
	public constructor() {
	}
	public static log(str) {
		if (SDKManager.getChannel() == EChannel.CHANNEL_WYCX) {
			egret.log("log: " + str);
		}
	}
	public static callback(callback, target, ...param) {
		egret.callLater(callback, target, ...param);
	}
	public static callbackTime(callback, target, time, ...param) {
		var timeoutKey = -1;
		if (time > 0) {
			var callbackObj = { intervalId: 0, callback: callback, target: target, time: time, args: param };
			var callbackFunc = function (callbackObj): void {
				this.callback(callbackObj.callback, callbackObj.target, ...callbackObj.args);
				egret.clearTimeout(callbackObj.intervalId);
			}
			callbackObj.intervalId = egret.setTimeout(callbackFunc, this, time, callbackObj);
			timeoutKey = callbackObj.intervalId;
		} else {
			this.callback(callback, target, ...param);
		}
		return timeoutKey;
	}
	public static addTimer(callback, thisObject, time: number = 1000) {
		if (!Tool.timerManager[time.toString()]) {
			var timer: egret.Timer = new egret.Timer(time);
			timer.start();
			Tool.timerManager[time.toString()] = timer;
		}
		Tool.callback(callback, thisObject);
		Tool.timerManager[time.toString()].addEventListener(egret.TimerEvent.TIMER, callback, thisObject);
	}
	public static removeTimer(callback, thisObject, time: number = 1000) {
		if (Tool.timerManager[time.toString()]) {
			Tool.timerManager[time.toString()].removeEventListener(egret.TimerEvent.TIMER, callback, thisObject);
		}
	}
	public static throwException(logstr = undefined, classz = ExceptionBase) {
		if (logstr) {
			this.log(logstr);
		}
		throw new classz();
	}
	public static rand(limit: number, wave: number, scale: number = 1) {
		return Math.floor(Math.random() * wave + limit) * scale;
	}

	//计算朝向
    public static checkFace8(startx, starty, endx, endy) {// 角度0-360
        var angle = (-(Math.atan2((endy - starty), (endx - startx))) * (180 / Math.PI));
        return Tool.getFaceByAngle(angle);
    }

	//根据角度计算出朝向 angle角度 X逆时针0~180；X轴顺时针0~-180
    public static getFaceByAngle(angle: number): DIRECTION {
        var _diretion: DIRECTION;
        if (angle > 67.5 && angle < 112.5) {
            _diretion = DIRECTION.UP;
        }
        else {
            if (angle > 22.5 && angle < 67.5) {
                _diretion = DIRECTION.RIGHT_UP;
            }
            else {
                if (angle > -22.5 && angle < 22.5) {
                    _diretion = DIRECTION.RIGHT;
                } else {
                    if (angle > -67.5 && angle < -22.5) {
                        _diretion = DIRECTION.RIGHT_DOWN;
                    } else {
                        if (angle > -112.5 && angle < -67.5) {
                            _diretion = DIRECTION.DOWN;
                        } else {
                            if (angle > -157.5 && angle < -112.5) {
                                _diretion = DIRECTION.LEFT_DOWN;
                            } else {
                                if (angle > 112.5 && angle < 157.5) {
                                    _diretion = DIRECTION.LEFT_UP;
                                } else {
                                    _diretion = DIRECTION.LEFT;
                                }
                            }
                        }
                    }
                }
            }
        }
        return _diretion;
    }

}
class ExceptionBase implements ExceptionInformation { }