class UnitDefine {
	public static BASE_PERCENTAGE: number = 10000;
	public constructor() {
	}
	private static addPercentage(value: number, perc: number, base_perc: number = UnitDefine.BASE_PERCENTAGE): number {
		value = value * perc / base_perc;
		return value;
	}
	public static getTrueValue(value: number) {
		var player = DataManager.instance.playerM.player;
		value = this.addPercentage(value, player.happiness_rate);
		value = this.addPercentage(value, player.artifact_rate);
		value = this.addPercentage(value, player.buff_rate);
		return InfiniteNumber.toFixedFormat(value);
	}
	public static getTrueInfinite(value: InfiniteNumber | number): InfiniteNumber {
		if (value instanceof InfiniteNumber) {
			value.num = this.getTrueValue(value.num);
			return value;
		}
		var typeName: string = typeof (value);
		switch (typeName) {
			case "number":
				value = this.getTrueValue(value);
				return new InfiniteNumber(value);
		}
	}


}