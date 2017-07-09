package p.my.common.support;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 标记此的FIELD和TYPE在转换Gson时不序列化。
 *
 * @author U-Demon Created on 2017年6月22日 下午3:12:17
 * @version 1.0.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target( {ElementType.FIELD, ElementType.TYPE} )
public @interface GsonIgnore
{
	
}
