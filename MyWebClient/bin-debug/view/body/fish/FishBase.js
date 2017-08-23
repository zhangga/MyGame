var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishBase = (function (_super) {
    __extends(FishBase, _super);
    function FishBase(id) {
        var _this = _super.call(this) || this;
        _this._move = false;
        _this.direction = 1;
        _this.speed = 2;
        _this.moveDir = FISH_MOVE_DIR.ROW;
        _this.distance = [100, 150];
        _this.targetPos = new egret.Point();
        _this.isTurn = false;
        _this.isDestroy = false;
        _this._id = id;
        // this.graphics.beginFill(0xFFFFFF, 1);
        // this.graphics.drawRect(0, 0, 200, 200);
        // this.graphics.endFill();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //添加到舞台
    FishBase.prototype.onAddToStage = function () {
        this.offX = this.x;
        this.offY = this.y;
    };
    Object.defineProperty(FishBase.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            this.onInit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FishBase.prototype, "model", {
        get: function () {
            return this._data.model;
        },
        enumerable: true,
        configurable: true
    });
    FishBase.prototype.onInit = function () {
        this.width = this.model.size.x;
        this.height = this.model.size.y;
        this.touchChildren = true;
        this.touchEnabled = true;
        this.fishLayer = new eui.Group();
        this.addChild(this.fishLayer);
        this.anim = new Animation(this._data.moveRes);
        this.fishLayer.addChild(this.anim);
        this.model.size;
        var max = Math.max(this.model.size.x, this.model.size.y);
        this.size = max / 130 * 2;
        this.onResetSize();
    };
    FishBase.prototype.onResetSize = function () {
        // var offLv: number = Math.ceil(this._data.model.lvMax / 10);
        // var size = (0.75 + Math.floor((this._data.lv - 1) / offLv) * 0.025) * 0.5;
        // size = Math.min(1, size);
        // this.anim.scaleY = size;
        // this.anim.scaleX = this.anim.scaleX > 0 ? size : -size;
    };
    Object.defineProperty(FishBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FishBase.prototype, "offY", {
        get: function () {
            return this._offY;
        },
        set: function (param) {
            if (param < GameDefine.FISHTANK_GAP_TOP) {
                this.y = GameDefine.FISHTANK_GAP_TOP;
                if (this.anim && this.anim.rotation != 0) {
                    this.anim.rotation = 0;
                }
            }
            else if (param > GameDefine.FISHTANK_HEIGHT - GameDefine.FISHTANK_GAP_BOTTON) {
                this.y = GameDefine.FISHTANK_HEIGHT - GameDefine.FISHTANK_GAP_BOTTON;
                if (this.anim && this.anim.rotation != 0) {
                    this.anim.rotation = 0;
                }
            }
            else {
                this.y = param;
            }
            this._offY = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FishBase.prototype, "offX", {
        get: function () {
            return this._offX;
        },
        set: function (param) {
            if (param < GameDefine.FISHTANK_GAP_LEFT + this.width / 2) {
                this.x = GameDefine.FISHTANK_GAP_LEFT + this.width / 2;
            }
            else if (param > GameDefine.FISHTANK_WIDTH - GameDefine.FISHTANK_GAP_RIGHT) {
                this.x = GameDefine.FISHTANK_WIDTH - GameDefine.FISHTANK_GAP_RIGHT;
            }
            else {
                this.x = param;
            }
            this._offX = param;
        },
        enumerable: true,
        configurable: true
    });
    FishBase.prototype.onAction = function () {
        if (this.isDestroy)
            return;
        if (!this._move) {
            this.onDo();
        }
    };
    FishBase.prototype.onDestory = function () {
        this.isDestroy = true;
        if (this.anim) {
            egret.Tween.removeTweens(this.anim);
            this.anim.onDestroy();
            this.anim = null;
        }
        egret.Tween.removeTweens(this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    FishBase.prototype.onDo = function () {
        this._move = true;
        var percent;
        if ((this.x > GameDefine.FISHTANK_WIDTH - GameDefine.FISH_TURN_MARGIN_RIGHT - this.width / 2 && this.direction > 0)
            || (this.x < GameDefine.FISH_TURN_MARGIN_LEFT + this.width / 2 && this.direction < 0)) {
            this.onTurn();
        }
        else {
            percent = Math.random() * 1000;
            if (this.walkNum >= 2 && percent < 200) {
                this.onTurn();
            }
            else {
                if (percent < 600) {
                    this.angle = 0;
                }
                this.onMove();
            }
        }
    };
    FishBase.prototype.onTurn = function () {
        this.isTurn = true;
        var percent = Math.random() * 10000;
        switch (this.moveDir) {
            case FISH_MOVE_DIR.COL:
                if (this.colNum >= this.randomColTime) {
                    this.moveDir = FISH_MOVE_DIR.ROW;
                    this.angle = 0;
                    this.colNum = 0;
                }
                else {
                    if (percent > 5000) {
                        this.moveDir = FISH_MOVE_DIR.ROW;
                        this.angle = 0;
                        this.colNum = 0;
                    }
                    else {
                        this.angle = this.angle * -this.direction;
                    }
                }
                this.colNum++;
                break;
            case FISH_MOVE_DIR.ROW:
                this.angle = 0;
                if (percent < 3000) {
                    this.colNum = 0;
                    this.randomColTime = Math.floor(Math.random()) * 5 + 1;
                    this.moveDir = FISH_MOVE_DIR.COL;
                    if (this.y >= GameDefine.FISHTANK_HEIGHT / 2) {
                        this.angle = Math.ceil(this.angle - (30 * Math.random()));
                    }
                    else if (this.y <= GameDefine.FISH_TURN_MARGIN_LEFT) {
                        this.angle = Math.ceil(this.angle + (30 * Math.random()));
                    }
                    else if (this.y >= GameDefine.FISHTANK_HEIGHT - GameDefine.FISH_TURN_MARGIN_LEFT) {
                        this.angle = Math.ceil(this.angle - (30 * Math.random()));
                    }
                    else {
                        this.angle = Math.ceil(this.angle + (30 * Math.random()));
                    }
                }
                break;
        }
        this.anim.onUpdateRes(this._data.turnRes, "action", 1);
        this.onTurnBack();
    };
    FishBase.prototype.onTurnBack = function () {
        this.tw = egret.Tween.get(this.anim);
        this.tw.to({ rotation: this.angle }, 375, egret.Ease.circOut).call(this.onActionTurnDone, this);
    };
    FishBase.prototype.onMove = function () {
        this.moveType = FISH_MOVE_TYPE.LINE;
        var percent = Math.random() * 100;
        if (percent > 25) {
            this.speedType = FISH_MOVE_SPEED.CONSTANT;
        }
        else {
            this.speedType = FISH_MOVE_SPEED.CHANGE;
        }
        this.onGetTargetPos();
        this.onWalk();
        this.walkNum++;
    };
    FishBase.prototype.onWalk = function () {
        this.tw = egret.Tween.get(this);
        switch (this.speedType) {
            case FISH_MOVE_SPEED.CONSTANT:
                this.tw.to({ offX: this.targetPos.x, offY: this.targetPos.y }, this.time).call(this.onActionDone);
                break;
            case FISH_MOVE_SPEED.CHANGE:
                this.tw.to({ offX: this.targetPos.x, offY: this.targetPos.y }, 600, egret.Ease.circOut).call(this.onActionDone);
                break;
        }
    };
    FishBase.prototype.onActionTurnDone = function () {
        if (this.isTurn) {
            this.anim.scaleX = -this.anim.scaleX;
            this.anim.onUpdateRes(this._data.moveRes, "action", -1);
            this.isTurn = false;
            this.walkNum = 0;
            this.onActionDone();
        }
    };
    FishBase.prototype.onActionDone = function () {
        this._move = false;
        this.direction = 1;
        if (this.anim.scaleX < 0) {
            this.direction = -1;
        }
        this.offX = this.x;
        this.offY = this.y;
    };
    FishBase.prototype.onGetTargetPos = function () {
        var distance;
        switch (this.speedType) {
            case FISH_MOVE_SPEED.CONSTANT:
                distance = Math.floor(Math.random() * (this.distance[1] - this.distance[0]) + this.distance[0]);
                break;
            case FISH_MOVE_SPEED.CHANGE:
                distance = (this.distance[0]);
                break;
        }
        var point = egret.Point.polar(distance, Math.PI / 180 * this.anim.rotation);
        if (point.y != 0) {
            point.y;
        }
        this.targetPos.x = this.x + Math.floor(point.x) * this.direction;
        this.targetPos.y = this.y + Math.floor(point.y) * this.direction;
        this.time = distance / this.speed * 30;
    };
    //点击鱼捕捉
    FishBase.prototype.onBeCatch = function () {
    };
    return FishBase;
}(egret.Sprite));
__reflect(FishBase.prototype, "FishBase", ["IFish"]);
var FISH_MOVE_TYPE;
(function (FISH_MOVE_TYPE) {
    FISH_MOVE_TYPE[FISH_MOVE_TYPE["LINE"] = 0] = "LINE";
    FISH_MOVE_TYPE[FISH_MOVE_TYPE["ROW"] = 1] = "ROW";
})(FISH_MOVE_TYPE || (FISH_MOVE_TYPE = {}));
var FISH_MOVE_SPEED;
(function (FISH_MOVE_SPEED) {
    FISH_MOVE_SPEED[FISH_MOVE_SPEED["CONSTANT"] = 0] = "CONSTANT";
    FISH_MOVE_SPEED[FISH_MOVE_SPEED["CHANGE"] = 1] = "CHANGE"; //变速
})(FISH_MOVE_SPEED || (FISH_MOVE_SPEED = {}));
var FISH_MOVE_DIR;
(function (FISH_MOVE_DIR) {
    FISH_MOVE_DIR[FISH_MOVE_DIR["ROW"] = 0] = "ROW";
    FISH_MOVE_DIR[FISH_MOVE_DIR["COL"] = 1] = "COL"; //纵向
})(FISH_MOVE_DIR || (FISH_MOVE_DIR = {}));
//# sourceMappingURL=FishBase.js.map