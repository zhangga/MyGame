class FactoryManager {
	public constructor() {
	}
	public static onBuildFish(ids: number[]) {
		var len = ids.length;
		var one: Fish;
		var ret: Fish[] = [];
		for (var i: number = 0; i < len; i++) {
			one = this.onBuildFishOne(ids[i]);
			ret.push(one);
		}
		return ret;
	}
	public static onBuildFishOne(id: number): Fish {
		var one = new Fish(id);
		return one;
	}
	public static onBuildEnjoyFishOne(id: number): EnjoyFish {
		var one = new EnjoyFish(id);
		return one;
	}
}