package p.my.common.web;

import org.apache.log4j.Logger;

import com.google.gson.JsonObject;

import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.HttpRequest;
import p.my.common.util.HttpUtil;
import p.my.common.util.StringUtil;

/**
 * 所有GET请求都通过这里处理，需要实现类的抽象方法
 * 这个类里会进行必要的公共部分的处理，例如IP的校验，请求合法性判断等。
 * 请求格式  http://127.0.0.1:8800/action.do?参数		参数json格式
 *
 * @author U-Demon Created on 2016年9月30日 下午1:13:29
 * @version 1.0.0
 */
public abstract class WebAction
{
	
	private static Logger logger = Logger.getLogger(WebAction.class);
	
	/**
	 * 需要子类实现的请求处理
	 * @param obj
	 * @param ctx
	 */
	public abstract void doAction(JsonObject obj, ChannelHandlerContext ctx);
	
	/**
	 * 对HTTP请求进行合法性校验
	 * @param request
	 * @return
	 */
	public boolean doValidate(HttpRequest request)
	{
		return true;
	}
	
	/**
	 * 普通数据的请求
	 * @param request
	 */
	public void doRequest(HttpRequest request, ChannelHandlerContext ctx)
	{
		try {
			//校验合法性
			if (!doValidate(request))
			{
				logger.debug("Web请求合法性校验失败");
				return;
			}
			//提取请求参数
			String uri = request.uri();
			JsonObject obj = null;
			int index = uri.indexOf(HttpUtil.QUEST);
			if (index >= 0) {
				String param = uri.substring(index+1);
				obj = StringUtil.json2Obj(param, JsonObject.class);
			}
			doAction(obj, ctx);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("处理WebJson请求是发生异常！", e);
		}
	}
	
}
