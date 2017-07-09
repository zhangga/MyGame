package p.my.common.util;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

/**
 * 游戏工具类
 *
 * @author U-Demon Created on 2017年7月8日
 * @version 1.0.0
 */
public class GameUtil {
	
	/**
	 * 返回[min,max]间随机数
	 * 
	 * @param min
	 * @param max
	 * @return
	 */
	public static int getRangedRandom(int min, int max) {
		return min >= max ? min : new Random().nextInt(max - min + 1) + min;
	}
	
	/**
	 * 给定一组权重，判断随机数对应权重中的索引
	 * @param weights
	 * @param random
	 * @return
	 */
	public static int getWeightsIndex(final int[] weights, int random) {
		int sum = 0;
		for (int i = 0; i < weights.length; i++) {
			sum += weights[i];
			if (random <= sum)
				return i;
		}
		return -1;
	}
	
	/**
	 * 给定一组值与对应的权重，判断随机数对应权重中的值
	 * @param weights	K-值，V-权重
	 * @param random
	 * @return
	 */
	public static int getWeightsValue(final Map<Integer, Integer> weights, int random) {
		int sum = 0;
		for (Entry<Integer, Integer> entry : weights.entrySet()) {
			sum += entry.getValue();
			if (random <= sum)
				return entry.getKey();
		}
		return -1;
	}

}
