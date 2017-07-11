package p.my.common.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import p.my.common.util.FileUtil;

/**
 * 处理Web请求
 *
 * @author U-Demon Created on 2016年9月29日 下午7:14:08
 * @version 1.0.0
 */
public class WebActionManager
{
	
	private static Logger logger = Logger.getLogger(WebActionManager.class);
	
	/**
	 * 存放所有WebAction的容器
	 */
	private static Map<String, WebAction> actionMapper = new HashMap<>();
	
	/**
	 * 外部调用添加新的Action的方法
	 * @param filter
	 * @param action
	 */
	public static void add(String filter, WebAction action)
	{
		logger.debug("增加的Action="+filter+"->"+action.getClass().getName());
		actionMapper.put(filter, action);
	}
	
	/**
	 * 通过发送的请求，获得该请求对应的Aciton实例
	 * @param filter
	 * @return
	 */
	public static WebAction getAction(String filter)
	{
		return actionMapper.get(filter);
	}
	
	/**
	 * 初始化所有的WebAction
	 * @param package_name 例：p.my.action.web
	 */
	public static void init(String package_name)
	{
		//获取包下所有的类
		List<String> webActions = FileUtil.getClasses(package_name);
		webActions.forEach(name -> {
			try {
				Class<?> clazz = Class.forName(name);
				//获取所有WebFilter注解的类
				WebFilter web = (WebFilter) clazz.getAnnotation(WebFilter.class);
				if(web != null)
				{
					WebAction action = (WebAction) clazz.newInstance();
					add(web.action(), action);
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		});
	}

}
