package p.my.gameserver.task;

import p.my.common.task.AbstractTaskManager;
import p.my.common.task.TaskScheduler;
import p.my.common.task.TaskSchedulerImpl;

/**
 * 任务管理器
 *
 * @author U-Demon Created on 2017年7月28日
 * @version 1.0.0
 */
public class TaskManager extends AbstractTaskManager<ETaskType> {
	
	private static final TaskManager instance = new TaskManager();
	private TaskManager() {}
	public static TaskManager gi() {
		return instance;
	}
	
	@Override
	public void init() {
		TaskScheduler globalScheduler = new TaskSchedulerImpl(5);
		taskSchedulerMap.put(ETaskType.GLOBAL, globalScheduler);
		
		TaskScheduler commonScheduler = new TaskSchedulerImpl(5);
		taskSchedulerMap.put(ETaskType.COMMON, commonScheduler);
		
		TaskScheduler activityScheduler = new TaskSchedulerImpl(3);
		taskSchedulerMap.put(ETaskType.ACTIVITY, activityScheduler);
		
		TaskScheduler logScheduler = new TaskSchedulerImpl(3);
		taskSchedulerMap.put(ETaskType.LOG, logScheduler);
	}

}
