/**
 * 活动的精灵
 */
abstract class ActiveSprite extends BaseActive {

    //精灵的方向
    private _direction: DIRECTION;
    //一次逻辑移动的时间间隔
    private moveDT: number = GameDefine.SPRITE_MOVE_DT;




    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
    
    //停止移动
	public onStand(): void {
		this.onChangeAction(ACTION.STAND);
	}

    //移动
	public onMove(): void {
        if (this.moveTarget) {
            this.onChangeAction(ACTION.MOVE);
        }
	}


    //更新精灵动作 状态机
    private onChangeAction(action: ACTION): boolean {
        //处理逻辑
        switch (action) {
            case ACTION.MOVE:
                this.onMoveHandler();
                break;
            case ACTION.STAND:
                this.onStandHandler();
                break;
        }
        return true;
    }

    //上次移动时间
    private _lastMoveLogicTime: number = 0;
    //移动逻辑
    private onMoveHandler(): void {
        var curr = egret.getTimer();
        if (curr - this._lastMoveLogicTime < this.moveDT) {
            return;
        }
        this._lastMoveLogicTime = curr;
        if (this.moveTarget) {
            //设置方向
            this._direction = this.checkFace(this.moveTarget.x, this.moveTarget.y);
        }
        super.logicMove();
    }

    private onStandHandler(): void {
		super.stopMove();
	}

    //检查精灵的朝向
    public checkFace(x: number, y: number): DIRECTION {
        return Tool.checkFace8(this.x, this.y, x, y);
    }

}

enum DIRECTION {
    CENTER = 0,
    LEFT = 1,//左
    RIGHT = 2,//右
    UP = 3,//上
    DOWN = 4,//下
    LEFT_UP = 5,//左上
    RIGHT_UP = 6,//右上
    LEFT_DOWN = 7,//左下
    RIGHT_DOWN = 8,//右下
}

enum ACTION {
	NULL = 0,
	STAND = 1,
	MOVE = 2,
	ATTACK = 3,
	DEATH = 4,
	JUMP = 5,
	JUMP_FLY = 6,
	JUMP_OVER = 7,
	HURT = 8,
	WALK = 9,//只是播放行走 但无实际行走路径
}