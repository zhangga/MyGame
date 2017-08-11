/**
 * 
 * 红点管理
 * @author	lzn	
 * 
 * 
*/
class RedPointManager {
    public redPoints = {};
    public constructor() {
    }
    public static createPoint(param: number): RedPoint[] {
        var points: RedPoint[] = [];
        var point: RedPoint;
        for (var i: number = 0; i < param; i++) {
            point = new RedPoint();
            points.push(point);
        }
        return points;
    }
    private onTimer() {
    }
    public test(cmdID) {
        switch (cmdID) {
            // case MESSAGE_ID.GAME_FIGHT_START_MSG:
            // case MESSAGE_ID.GAME_FIGHT_RESULT_MSG:
            // case MESSAGE_ID.GAME_TICK_MESSAGE:
            //     break;
            // default:
            //     GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.GAME_REDPOINT_TRIGGER), new redPointTrigger(null));
            //     break;
        }
    }
    //The end
}
class RedPointTrigger {
    public systemID: string;
    public redpoint_type: number;
    public constructor(systemID: string, redpoint_type: number = -1) {
        this.systemID = systemID;
        this.redpoint_type = redpoint_type;
    }
}