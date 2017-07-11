package p.my.common.web;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * WEB请求过滤
 *
 * @author U-Demon Created on 2017年7月11日
 * @version 1.0.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface WebFilter {
	
	/**
	 * Action的名称
	 * @return
	 */
	String action() default "";
	
}
