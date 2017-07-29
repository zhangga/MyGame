class InfiniteNumber {
	private _num: number = 0;
	public constructor(value) {
		this._num = InfiniteNumber.toFixedFormat(value);
	}
	public static toFixedFormat(value) {
		return Number(value);
	}

	public add(value: InfiniteNumber | string | number) {
		if (value instanceof InfiniteNumber) {
			this._num += value.num;
		}
		var typeName: string = typeof (value);
		switch (typeName) {
			case "number":
				this._num += InfiniteNumber.toFixedFormat(value);
				break;
			case "string":
				this._num += InfiniteNumber.toFixedFormat(value);
				break;
		}
		this._num = InfiniteNumber.toFixedFormat(this._num);
		return this;
	}

	public subtract(value: InfiniteNumber | string | number) {
		if (value instanceof InfiniteNumber) {
			this._num -= value.num;
		}
		var typeName: string = typeof (value);
		switch (typeName) {
			case "number":
				this._num -= InfiniteNumber.toFixedFormat(value);
				break;
			case "string":
				this._num -= InfiniteNumber.toFixedFormat(value);
				break;
		}
		this._num = InfiniteNumber.toFixedFormat(this._num);
		return this;
	}

	public multiply(value: InfiniteNumber | string | number) {
		if (value instanceof InfiniteNumber) {
			this._num *= value.num;
		}
		var typeName: string = typeof (value);
		switch (typeName) {
			case "number":
				this._num *= InfiniteNumber.toFixedFormat(value);
				break;
			case "string":
				this._num *= InfiniteNumber.toFixedFormat(value);
				break;
		}
		this._num = InfiniteNumber.toFixedFormat(this._num);
		return this;
	}

	public divide(value: InfiniteNumber | string | number) {
		if (value instanceof InfiniteNumber) {
			this._num /= value.num;
		}
		var typeName: string = typeof (value);
		switch (typeName) {
			case "number":
				this._num /= InfiniteNumber.toFixedFormat(value);
				break;
			case "string":
				this._num /= InfiniteNumber.toFixedFormat(value);
				break;
		}
		this._num = InfiniteNumber.toFixedFormat(this._num);
		return this;
	}
	public get num(): number {
		return this._num;
	}
	public set num(param) {
		this._num = InfiniteNumber.toFixedFormat(param);
	}
	public toTextFormat() {
		return GameCommon.toTextFormat(this._num);
	}
}