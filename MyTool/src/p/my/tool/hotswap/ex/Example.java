package p.my.tool.hotswap.ex;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import p.my.tool.hotswap.JavaClassExecuter;

/**
 * 测试远程调用的例子
 * 将TestClass.class文件放在C:/下  执行程序远程调用TestClass.main方法
 * @see JavaClassExecuter
 * ClassModifier.modifyUTF8Contant 方法现在只支持修改常量区
 * 展望一下如果可以替换class中任意方法的对应代码，远程调用该方法
 *
 * @author U-Demon Created on 2017年9月18日
 * @version 1.0.0
 */
public class Example {
	
	public static void main(String[] args) {
		try {
			InputStream is = new FileInputStream("c:/TestClass.class");
			byte[] b = new byte[is.available()];
			is.read(b);
			is.close();
			
			System.out.println(JavaClassExecuter.execute(b));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
