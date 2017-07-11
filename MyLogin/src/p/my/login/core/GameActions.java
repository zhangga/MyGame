package p.my.login.core;

import java.util.HashMap;
import java.util.Map;

import p.my.login.action.game.GameTestAction;

/**
 * 所有的GameAction都在这里进行了对应和枚举。
 *
 * @author U-Demon Created on 2016年9月30日 下午5:41:16
 * @version 1.0.0
 */
public enum GameActions
{
	
	TEST(0, GameTestAction.class, "测试"),
	;
	
	//消息号
	private int cmd;
	
	//描述
	private String desc;
	
	//处理的action
	private GameAction action;
	
	//消息号的映射
	private static Map<Integer, GameActions> actionMap;
	
	GameActions(int cmd, Class<? extends GameAction> actionClass, String desc)
	{
		registCommand(cmd, actionClass, desc, this);
	}
	
	/**
	 * 注册所有的消息
	 * @param cmd
	 * @param actionClass
	 * @param desc
	 * @param actions
	 */
	private static void registCommand(int cmd, Class<? extends GameAction> actionClass, 
			String desc, GameActions actions)
	{
		actions.cmd = cmd;
		actions.desc = desc;
		try
		{
			if (actionClass != null)
			{
				actions.action = actionClass.newInstance();
				actions.action.setCmd(actions.cmd);
			}
			if (actionMap == null)
			{
				actionMap = new HashMap<>();
			}
			actionMap.put(actions.cmd, actions);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
	
	/**
	 * 通过消息号获取action
	 * @param cmd
	 * @return
	 */
	public static GameActions getAction(int cmd)
	{
		GameActions actions = actionMap.get(cmd);
		if (actions == null)
		{
			throw new IllegalArgumentException("不存在的消息号：" + cmd);
		}
		return actions;
	}

	public String getDesc() {
		return desc;
	}

	public GameAction getAction() {
		return action;
	}

}
