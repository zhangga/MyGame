/**
 *
 * @author 
 *
 */
class GameErrorTip {
    private static instance: GameErrorTip;
    public static ERROR_ID_ARENA_CHANGE: number = 62;

    public constructor() {
    }
    public static getInstance(): GameErrorTip {
        if (this.instance == null) {
            this.instance = new GameErrorTip();
        }
        return this.instance;
    }
    public getGameErrorTip(errorCode): string {
        return Language.instance.getDescByKey(`error_tips${errorCode}`);
    }
}
