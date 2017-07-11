package p.my.login.action.web;

import com.google.gson.JsonObject;

import io.netty.channel.ChannelHandlerContext;
import p.my.common.web.WebAction;
import p.my.common.web.WebFilter;

/**
 * 测试类
 *
 * @author U-Demon Created on 2017年7月11日
 * @version 1.0.0
 */
@WebFilter(action="test")
public class WebTestAction extends WebAction {

	@Override
	public void doAction(JsonObject obj, ChannelHandlerContext ctx) {
		
	}

}
