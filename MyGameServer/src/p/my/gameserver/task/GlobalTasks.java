package p.my.gameserver.task;

import org.apache.log4j.Logger;

import p.my.common.task.Task;
import p.my.common.util.TimeUtil;
import p.my.gameserver.service.RPCService;

public class GlobalTasks {
	
	private static Logger logger = Logger.getLogger(GlobalTasks.class);
	
	private static final GlobalTasks _instance = new GlobalTasks();
	private GlobalTasks() {};
	public static GlobalTasks gi() {
		return _instance;
	}
	
	/**
	 * 初始化GLOBAL task
	 */
	public void init() {
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
					//发送服务器状态
					RPCService.sendServerState();
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
