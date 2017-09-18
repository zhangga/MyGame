package p.my.tool.hotswap;

/**
 * 为了多次载入执行类而加入的加载器<br>
 * 把defineClass方法开放出来，只有外部显示调用的时候才会使用到loadByte方法
 * 由虚拟机调用时，仍然按照原来的双亲委派规则使用loadClass方法进行类加载
 *
 * @author U-Demon Created on 2017年9月18日 下午1:10:39
 * @version 1.0.0
 */
public class HotSwapClassLoader extends ClassLoader {

	public HotSwapClassLoader() {
		super(HotSwapClassLoader.class.getClassLoader());
	}
	
	public Class<?> loadByte(byte[] classByte) {
		return defineClass(null, classByte, 0, classByte.length);
	}
	
}
