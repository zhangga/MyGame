/**
 * 建筑达到多少级，id-建筑等级，value-等级
 */
class ConditionBuildLv extends ConditionCmd {

    private static _instance: ConditionBuildLv = null;
    private ConditionBuildLv() {}
    public static get instance(): ConditionBuildLv {
        if (!this._instance) {
            this._instance = new ConditionBuildLv();
        }
        return this._instance;
    }

    public validate(condition: ConditionData): boolean {
        return true;
    }

}