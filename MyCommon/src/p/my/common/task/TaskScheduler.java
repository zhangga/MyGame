package p.my.common.task;

/**
 * 任务调度器
 *
 * @author Created by U-Demon on 2016年10月31日 下午3:33:03
 * @version 1.0.0
 */
public interface TaskScheduler
{
	
	/**
	 * 开始任务
	 */
	public void startup();
	
	/**
	 * 结束任务
	 */
	public void shutdown();
	
	/**
	 * 计划执行一个任务
	 * @param task
	 * @return
	 */
	public PeriodicTaskHandle scheduleTask(Task task);
	
	/**
	 * 计划延时执行一个任务
	 * @param task
	 * @param delay
	 * @return
	 */
	public PeriodicTaskHandle scheduleTask(Task task, long delay);
	
	/**
	 * 计划某时开始执行一个任务
	 * @param task
	 * @param startTime
	 * @return
	 */
	public PeriodicTaskHandle scheduleTimedTask(Task task, long startTime);
	
	/**
	 * 计划执行一个周期任务
	 * @param task
	 * @param startTime
	 * @param period
	 * @return
	 */
	public PeriodicTaskHandle schedulePeriodTask(Task task, long delay, long period);
	
	/**
	 * 强制取消任务
	 * @param task
	 */
	public void cancelTask(Task task);
	
	/**
	 * 强制取消任务
	 * @param taskName
	 */
	public void cancelTask(String taskName);

}
