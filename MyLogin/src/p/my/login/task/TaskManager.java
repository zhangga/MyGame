package p.my.login.task;

import p.my.common.task.AbstractTaskManager;
import p.my.common.task.TaskScheduler;
import p.my.common.task.TaskSchedulerImpl;

/**
 * 任务管理器
 *
 * @author Created by U-Demon on 2016年10月31日 下午3:32:34
 * @version 1.0.0
 */
public class TaskManager extends AbstractTaskManager<ETaskType>
{
	
	private static final TaskManager _instance = new TaskManager();
	private TaskManager() {}
	public static TaskManager gi() {
		return _instance;
	}
	
	@Override
	public void init() {
		TaskScheduler globalScheduler = new TaskSchedulerImpl(5);
		taskSchedulerMap.put(ETaskType.GLOBAL, globalScheduler);
		
		TaskScheduler commonScheduler = new TaskSchedulerImpl(5);
		taskSchedulerMap.put(ETaskType.COMMON, commonScheduler);
	}

}
