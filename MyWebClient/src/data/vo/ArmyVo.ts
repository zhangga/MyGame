/**
 * 军队数据
 */
class ArmyVo {

    //武将列表 id
    private _heros: Array<number> = [];

    //小兵列表 K:id V:SoldierVo
    private _soldiers: {} = {};

    public constructor() {
        
    }

    //是否有某个英雄
    public hasHero(heroId: number): boolean {
        for (var i = 0; i < this._heros.length; i++) {
            if (this._heros[i] == heroId) {
                return true;
            }
        }
        return false;
    }

    //增加英雄
    public addHero(heroId: number): void {
        if (this.hasHero(heroId))
            return;
        this._heros.push(heroId);
    }

    //移除英雄
    public removeHero(heroId: number): void {
        for (var i = 0; i < this._heros.length; i++) {
            if (this._heros[i] == heroId) {
                delete this._heros[i];
                break;
            }
        }
    }

    //获取某类士兵数量
    public getSoldierNum(id: number): number {
        var soldier: SoldierVo = this._soldiers[id];
        if (!soldier)
            return 0;
        return soldier.num;
    }

    //获取所有小兵总和
    public getSoldierTotal(): number {
        var total: number = 0;
        for (var key in this._soldiers) {
            var soldier: SoldierVo = this._soldiers[key];
            if (!soldier)
                continue;
            total += soldier.num;
        }
        return total;
    }

    //增加士兵
    public addSoldier(id: number, num: number): number {
        var soldier: SoldierVo = this._soldiers[id];
        if (!soldier) {
            soldier = new SoldierVo();
            soldier.id = id;
            soldier.num = 0;
        }
        soldier.num += num;
        this._soldiers[soldier.id] = soldier;
        return soldier.num;
    }

    //移除士兵
    public removeSoldier(id: number, num: number): number {
        var soldier: SoldierVo = this._soldiers[id];
        if (!soldier) {
            return 0;
        }
        soldier.num -= num;
        if (soldier.num < 0) {
            soldier.num = 0;
        }
        return soldier.num;
    }

    //移除某类士兵
    public removeSoldiers(id: number): number {
        var soldier: SoldierVo = this._soldiers[id];
        if (!soldier) {
            return 0;
        }
        var num: number = soldier.num;
        soldier = null;
        delete this._soldiers[id];
        return num;
    }

}