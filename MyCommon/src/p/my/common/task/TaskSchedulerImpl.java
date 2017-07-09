package p.my.common.task;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;

/**
 * 任务调度器实例
 *
 * @author Created by U-Demon on 2016年10月31日 下午3:33:37
 * @version 1.0.0
 */
public class TaskSchedulerImpl implements TaskScheduler
{

	private static Logger logger = Logger.getLogger(TaskSchedulerImpl.class);
	
	/**
	 * 任务具体执行的Executor
	 */
	private ScheduledExecutorService executor;
	
	/**
	 * 判断是否已经停止
	 */
	private volatile boolean shutdown = false;
	
	/**
	 * 请求的线程数
	 */
	private int requestedThreads;
	
	private Map<Task, PeriodicTaskHandle> taskMap = new LinkedHashMap<>();
	
	public TaskSchedulerImpl(int requestedThreads)
	{
		if (logger.isDebugEnabled()) {
			logger.debug("Using " + requestedThreads + " task consumer threads.");
		}
		this.requestedThreads = requestedThreads;
	}

	@Override
	public void startup() {
		this.executor = Executors.newScheduledThreadPool(requestedThreads);
		this.shutdown = false;
	}

	@Override
	public void shutdown() {
		this.executor.shutdown();
		taskMap.clear();
		this.shutdown = true;
	}

	public boolean isShutdown() {
		return shutdown;
	}

	/**
	 * 立即执行一个任务
	 */
	@Override
	public PeriodicTaskHandle scheduleTask(Task task) {
		try {
			Future<?> future;
			TaskHandler taskHandler = new TaskHandler(task);
			taskMap.put(task, taskHandler);
			future = this.executor.submit(taskHandler);
			taskHandler.setFuture(future);
			return taskHandler;
		} catch (RejectedExecutionException e) {
			throw new RejectedExecutionException("Couldn't schedule task", e);
		}
	}

	/**
	 * 延时执行一个任务
	 */
	@Override
	public PeriodicTaskHandle scheduleTask(Task task, long delay) {
		try {
			ScheduledFuture<?> future;
			TaskHandler taskHandler = new TaskHandler(task, delay);
			taskMap.put(task, taskHandler);
			future = executor.schedule(taskHandler, delay, TimeUnit.MILLISECONDS);
			taskHandler.setFuture(future);
			return taskHandler;
		} catch (RejectedExecutionException ree) {
			throw new RejectedExecutionException("Couldn't schedule task", ree);
		}
	}

	@Override
	public PeriodicTaskHandle scheduleTimedTask(Task task, long startTime) {
		try {
			ScheduledFuture<?> future;
			long delay = startTime - System.currentTimeMillis();
			if (delay < 0)
				delay = 0;
			TaskHandler taskHandler = new TaskHandler(task, delay);
			taskMap.put(task, taskHandler);
			future = executor.schedule(taskHandler, delay, TimeUnit.MILLISECONDS);
			taskHandler.setFuture(future);
			return taskHandler;
		} catch (RejectedExecutionException ree) {
			throw new RejectedExecutionException("Couldn't schedule task", ree);
		}
	}

	/**
	 * 执行周期任务
	 */
	@Override
	public PeriodicTaskHandle schedulePeriodTask(Task task, long delay, long period) {
		if (period <= 0)
			throw new IllegalArgumentException("illegal period: " + period);
		
		ScheduledFuture<?> future;
		TaskHandler taskHandler = new TaskHandler(task, delay, period);
		taskMap.put(task, taskHandler);
		future = this.executor.scheduleAtFixedRate(taskHandler, delay, period, TimeUnit.MILLISECONDS);
		taskHandler.setFuture(future);
		return taskHandler;
	}
	
	@Override
	public void cancelTask(Task task) {
		if (task == null)
			return;
		if (this.isShutdown())
			return;
		PeriodicTaskHandle handle = taskMap.get(task);
		if (handle == null)
			return;
		handle.cancel();
	}
	
	@Override
	public void cancelTask(String taskName) {
		if (this.isShutdown())
			return;
		for (Entry<Task, PeriodicTaskHandle> entry : taskMap.entrySet())
		{
			if (entry.getKey().name().equals(taskName))
			{
				PeriodicTaskHandle handle = entry.getValue();
				if (handle != null)
					handle.cancel();
				return;
			}
		}
	}
	
	/**
	 * 封装的任务
	 *
	 * @author U-Demon Created on 2016年10月8日 下午6:04:30
	 * @version 1.0.0
	 */
	private class TaskHandler implements PeriodicTaskHandle, Runnable
	{
		
		//具体的任务
		private Task task;
		private long startTime;
		private long delay = -1;
		private long period = -1;
		private long lastRunTime;
		private long lastTakenTime;
		//任务执行的描述(返回结果、状态)
		private Future<?> future;
		
		public TaskHandler(Task task)
		{
			this.task = task;
		}
		
		public TaskHandler(Task task, long delay)
		{
			this.task = task;
			this.delay = delay;
		}
		
		public TaskHandler(Task task, long delay, long period)
		{
			this.task = task;
			this.delay = delay;
			this.period = period;
		}
		
		public void setFuture(Future<?> future)
		{
			this.future = future;
		}
		
		public void release()
		{
			this.task = null;
			this.future = null;
		}

		@Override
		public void run() {
			try {
				this.task.run();
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (period <= 0)
			{
				//如果不是循环任务,则释放
				taskMap.remove(this.getTask());
				release();
			}
		}

		@Override
		public long getStartTime() {
			return this.startTime;
		}

		@Override
		public long getDelay() {
			return this.delay;
		}

		@Override
		public long getPeriod() {
			return this.period;
		}

		@Override
		public long getLastRunTime() {
			return this.lastRunTime;
		}

		@Override
		public long getLastTakenTime() {
			return this.lastTakenTime;
		}

		@Override
		public Task getTask() {
			return this.task;
		}

		@Override
		public void cancel() {
			cancel(true);
		}

		@Override
		public void cancel(boolean force) {
			if(future != null)
				future.cancel(force);
			taskMap.remove(this.getTask());
			release();
		}
		
	}

}
