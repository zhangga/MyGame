package p.my.common.task;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import p.my.common.util.TimeUtil;

/**
 * 任务管理器/子类实现单利模式
 *
 * @author U-Demon Created on 2017年7月11日
 * @version 1.0.0
 */
public abstract class AbstractTaskManager<T> {
	
	/**
	 * 不同类型的任务调度
	 */
	protected Map<T, TaskScheduler> taskSchedulerMap = new HashMap<>();
	
	/**
	 * 初始化任务管理器
	 */
	public abstract void init();
	
	public void release()
	{
		taskSchedulerMap.clear();
		taskSchedulerMap = null;
	}
	
	public boolean startService()
	{
		for (TaskScheduler taskScheduler : taskSchedulerMap.values())
		{
			taskScheduler.startup();
		}
		return true;
	}
	
	public boolean stopService()
	{
		for (TaskScheduler taskScheduler : taskSchedulerMap.values())
		{
			taskScheduler.shutdown();
		}
		return true;
	}
	
	public TaskScheduler geTaskScheduler(T taskType)
	{
		return taskSchedulerMap.get(taskType);
	}
	
	/**
	 * 调度周期任务
	 * @param taskType
	 * @param task
	 * @param delay
	 * @param period
	 * @return
	 */
	public PeriodicTaskHandle schedulePeriodicTask(T taskType, Task task, long delay, long period)
	{
		TaskScheduler taskScheduler = geTaskScheduler(taskType);
		return taskScheduler.schedulePeriodTask(task, delay, period);
	}
	
	/**
	 * 中止任务
	 * @param taskType
	 * @param task
	 */
	public void cancleTask(T taskType, Task task)
	{
		TaskScheduler taskScheduler = geTaskScheduler(taskType);
		taskScheduler.cancelTask(task);
	}
	
	/**
	 * 中止任务
	 * @param taskType
	 * @param name
	 */
	public void cancleTask(T taskType, String name)
	{
		TaskScheduler taskScheduler = geTaskScheduler(taskType);
		taskScheduler.cancelTask(name);
	}
	
	/**
	 * 计划每日任务
	 * @param taskType
	 * @param task
	 * @param formatTime
	 * @return
	 * @throws ParseException
	 */
	public PeriodicTaskHandle scheduleDailyTask(T taskType, final Task task, String formatTime)
			throws ParseException
	{
		DateFormat dateFormat = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
		DateFormat dayFormat = new SimpleDateFormat("yy-MM-dd");
		Date targetDate = dateFormat.parse(dayFormat.format(new Date()) + " " + formatTime);
		long targetTime = targetDate.getTime();
		long initDelay = targetTime - System.currentTimeMillis();
		initDelay = initDelay > 0 ? initDelay : TimeUtil.DAY + initDelay;

		return schedulePeriodicTask(taskType, task, initDelay, TimeUtil.DAY);
	}
	
	/**
	 * 立即执行一个任务
	 * @param taskType
	 * @param task
	 * @return
	 */
	public PeriodicTaskHandle scheduleTask(T taskType, Task task)
	{
		if (task == null)
			throw new NullPointerException("Task must not be null");
		TaskScheduler taskScheduler = geTaskScheduler(taskType);
		return taskScheduler.scheduleTask(task);
	}
	
	/**
	 * 调度延时任务
	 * @param taskType
	 * @param task
	 * @param delay
	 * @return
	 */
	public PeriodicTaskHandle scheduleDelayTask(T taskType, Task task, long delay)
	{
		if (task == null)
			throw new NullPointerException("Task must not be null");
		if (delay < 0)
			throw new IllegalArgumentException("Delay must not be negative");
		TaskScheduler taskScheduler = geTaskScheduler(taskType);
		return taskScheduler.scheduleTask(task, delay);
	}

}
