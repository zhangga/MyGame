/**
 * 条件管理器
 */
class ConditionManager {

    private static _instance: ConditionManager = null;
    private ConditionManager() {}
    public static get instance(): ConditionManager {
        if (!this._instance) {
            this._instance = new ConditionManager();
        }
        return this._instance;
    }

    //判断条件是否满足
    public validate(condition: ConditionData): boolean {
        var cmd: ConditionCmd = this.getCmd(condition.type);
        if (cmd == null)
            return false;
        return cmd.validate(condition);
    }

    /**
     * 获取对应的ConditionCmd
     */
    public getCmd(type: EConditionType): ConditionCmd {
        var cmd: ConditionCmd = null;
        switch (type) {
            case EConditionType.BUILD_LV:
                cmd = ConditionBuildLv.instance;
                break;
            default:
                break;
        }
        return cmd;
    }

}