/**
 * 条件实现的基类
 */
abstract class ConditionCmd {

    //是否满足条件
    public validate(condition: ConditionData): boolean {
        return true;
    }

}