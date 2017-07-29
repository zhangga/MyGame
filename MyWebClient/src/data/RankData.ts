class RankData {
    private _rank: number = 0;
    private _id: number;
    private _name: string;
    private _head: string;
    private _value: string;

    public constructor(rank: number, value: string) {
        var vs: string[] = value.split(":");
        if (vs.length < 4)
            return;
        this._rank = rank;
        this._id = parseInt(vs[0]);
        this._name = vs[1];
        this._head = vs[2];
        this._value = vs[3];
    }

    public get rank(): number {
        return this._rank;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get head(): string {
        return this._head;
    }

    public get value(): string {
        return this._value;
    }

}