package p.my.tool.hotswap;

import java.lang.reflect.Method;

/**
 * JavaClass执行工具
 *
 * @author U-Demon Created on 2017年9月18日 下午2:17:53
 * @version 1.0.0
 */
public class JavaClassExecuter {
	
	public static String execute(byte[] classByte) {
		HackSystem.clearBuffer();
		ClassModifier cm = new ClassModifier(classByte);
		byte[] modiBytes = cm.modifyUTF8Contant("java/lang/System", HackSystem.class.getName().replace(".", "/"));
		HotSwapClassLoader loader = new HotSwapClassLoader();
		Class<?> clazz = loader.loadByte(modiBytes);
		try {
			Method method = clazz.getMethod("main", new Class[]{String[].class});
			Object[] args = new String[]{null};
			method.invoke(null, args);
		} catch (Throwable e) {
			e.printStackTrace(HackSystem.out);
		}
		return HackSystem.getBufferString();
	}

}
