package p.my.gameserver.service;

import org.apache.log4j.Logger;

import p.my.gameserver.constant.GameConfig;
import p.my.gameserver.game.GameWorld;
import p.my.rpc.client.ServerStateClient;
import p.my.rpc.service.ServiceResult;

/**
 * RPC服务类
 *
 * @author U-Demon Created on 2017年7月29日
 * @version 1.0.0
 */
public class RPCService {
	
	private static final Logger logger = Logger.getLogger(RPCService.class);
	
	private static ServerStateClient stateClient = null;
	
	public static void init() {
		stateClient = new ServerStateClient(GameConfig.LOGIN_HOST, ServiceResult.RPC_PORT);
	}
	
	/**
	 * 发送服务器状态
	 */
	public static void sendServerState() {
		try {
			stateClient.sendState(GameConfig.SERVER_ID, GameConfig.CREATE_TIME.toString(), 
					GameConfig.GAME_HOST, GameConfig.GAME_PORT, GameWorld.gi().getOnlineNum());
		} catch (Exception e) {
			logger.error("to send server state exception: 登陆服未开启！！！", e);
		}
	}

}
