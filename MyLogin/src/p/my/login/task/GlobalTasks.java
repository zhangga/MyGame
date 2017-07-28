package p.my.login.task;

import org.apache.log4j.Logger;

import p.my.common.task.Task;
import p.my.common.util.TimeUtil;
import p.my.login.game.GameWorld;

/**
 * {@code ETaskType.GLOBAL}
 *
 * @author U-Demon Created on 2017年7月11日
 * @version 1.0.0
 */
public class GlobalTasks
{
	
	private static Logger logger = Logger.getLogger(GlobalTasks.class);
	
	private static GlobalTasks _instance = new GlobalTasks();
	
	public static GlobalTasks gi()
	{
		return _instance;
	}
	
	private GlobalTasks() {};
	
	/**
	 * 初始化GLOBAL task
	 */
	public void init()
	{
		initTickTask();
		initMinuteTask();
	}

	/**
	 * 初始化心跳任务
	 */
	private void initTickTask()
	{
		try
		{
			TaskManager.gi().schedulePeriodicTask(ETaskType.GLOBAL, new Task() {
				@Override
				public void run() {
					//更新服务器状态
					GameWorld.gi().updateServerState();
				}
				
				@Override
				public String name() {
					return "TickTask";
				}
			}, 100, 1000);
		}
		catch (Exception e)
		{
            logger.error("初始化心跳任务发生异常。", e);
        }
	}
	
	/**
	 * 初始化每分钟任务
	 */
	private void initMinuteTask()
	{
		try
		{
			TaskManager.gi().schedulePeriodicTask(ETaskType.GLOBAL, new Task() {
				@Override
				public void run() {
					GameWorld.gi().onUpdate();
				}
				
				@Override
				public String name() {
					return "MinuteTask";
				}
			}, 100, TimeUtil.MINUTE);
		}
		catch (Exception e)
		{
            logger.error("初始化每分钟任务发生异常。", e);
        }
	}

}
