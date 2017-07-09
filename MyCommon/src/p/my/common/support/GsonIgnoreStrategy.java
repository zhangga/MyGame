package p.my.common.support;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

/**
 * Gson的忽略字段注解。
 *
 * @author U-Demon Created on 2017年6月22日 下午3:10:00
 * @version 1.0.0
 */
public class GsonIgnoreStrategy implements ExclusionStrategy
{

	@Override
	public boolean shouldSkipField(FieldAttributes f)
	{
		return f.getAnnotation(GsonIgnore.class) != null;
	}

	@Override
	public boolean shouldSkipClass(Class<?> clazz)
	{
		return clazz.getAnnotation(GsonIgnore.class) != null;
	}

}
