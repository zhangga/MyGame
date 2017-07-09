package p.my.common.task;

/**
 * 任务接口
 *
 * @author Created by U-Demon on 2016年10月31日 下午3:31:41
 * @version 1.0.0
 */
public interface Task
{
	
	/**
	 * 执行任务
	 */
	void run();
	
	/**
	 * Task名称
	 * @return
	 */
	String name();

}
