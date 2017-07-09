package p.my.common.util;

import java.util.List;

/**
 * 安全验证的工具类
 *
 * @author U-Demon Created on 2017年7月8日
 * @version 1.0.0
 */
public class SecurityUtil {
	
	/**
	 * 校验HTTP请求的IP是否合法
	 *
	 * @param ip
	 * @return
	 */
	public static boolean ipValidate(List<String> whiteList, String ip) {
		for (String url : whiteList) {
			if (url.endsWith("*")) {
				if (ip.substring(0, ip.lastIndexOf(".") + 1).startsWith(
						url.substring(0, url.length() - 1)))
					return true;
			} else {
				if (ip.startsWith(url))
					return true;
			}
		}
		return false;
	}

}
