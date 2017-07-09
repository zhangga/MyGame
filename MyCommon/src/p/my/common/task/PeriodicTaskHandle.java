package p.my.common.task;

/**
 * 周期任务
 *
 * @author Created by U-Demon on 2016年10月31日 下午3:32:02
 * @version 1.0.0
 */
public interface PeriodicTaskHandle
{
	
	public long getStartTime();
	
	public long getDelay();
	
	public long getPeriod();
	
	public long getLastRunTime();
	
	public long getLastTakenTime();
	
	public Task getTask();
	
	public void cancel();
	
	public void cancel(boolean force);

}
