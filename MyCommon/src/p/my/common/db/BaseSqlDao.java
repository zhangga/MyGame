package p.my.common.db;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;

/**
 * 所有的DAO需要继承这个类，因为所有基于数据库的基本操作都在这个类里实现的。 所有的操作，当执行结果为-1或者执行结果为null则表示执行失败。
 * 需要根据后台日志进行判断，确定异常原因。
 *
 * @author U-Demon Created on 2017年7月12日
 * @version 1.0.0
 */
public class BaseSqlDao {
	
	private static final Logger logger = Logger.getLogger(BaseSqlDao.class);
	
	/**
	 * 回话工厂对象,提供数据库回话对象
	 */
	private SqlSessionFactory factory;
	
	/**
	 * 该子类自己的名称
	 */
	private String nameSpace;
	
	/**
	 * 供外界调用的创建实例的方法
	 * 
	 * @param sqlSessionFactory
	 */
	public BaseSqlDao(SqlSessionFactory factory) {
		this.factory = factory;
		nameSpace = this.getClass().getSimpleName() + ".";
	}
	
	/**
	 * 打开回话
	 * 
	 * @return
	 */
	private SqlSession openSession() {
		SqlSession session = factory.openSession(true);
		return session;
	}
	
	/**
	 * 执行指定的插入操作
	 * 
	 * @param id
	 * @param parameterObject
	 * @return
	 */
	public int insert(String id, Object parameterObject)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				int i = session.insert(nameSpace + id, parameterObject);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				int i = session.insert(id, parameterObject);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[insert]操作发生异常: "+nameSpace+id, e);
			return -1;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 执行无参数，指定的插入操作
	 * 
	 * @param id
	 * @return
	 */
	public int insert(String id)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				int i = session.insert(nameSpace + id);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				int i = session.insert(id);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[insert]操作发生异常", e);
			return -1;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 执行修改操作
	 * 
	 * @param id
	 * @param parameterObject
	 * @return
	 */
	public int update(String id, Object parameterObject)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				int i = session.update(nameSpace + id, parameterObject);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				int i = session.update(id, parameterObject);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[update]操作发生异常", e);
			return -1;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 执行修改操作
	 * 
	 * @param id
	 * @return
	 */
	public int update(String id)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				int i = session.update(nameSpace + id);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				int i = session.update(id);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[update]操作发生异常", e);
			return -1;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 执行删除操作
	 * 
	 * @param id
	 * @param parameterObject
	 * @return
	 */
	public int delete(String id, Object parameterObject)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				int i = session.delete(nameSpace + id, parameterObject);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				int i = session.delete(id, parameterObject);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[delete]操作发生异常", e);
			return -1;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 执行删除操作
	 * 
	 * @param id
	 * @return
	 */
	public int delete(String id)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				int i = session.delete(nameSpace + id);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				int i = session.delete(id);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[delete]操作发生异常", e);
			return -1;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 查询一个对象
	 * 
	 * @param id
	 * @param parameterObject
	 * @return
	 */
	public <E> E selectOne(String id, Object parameterObject)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				E i = session.selectOne(nameSpace + id, parameterObject);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				E i = session.selectOne(id, parameterObject);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[selectOne]操作发生异常", e);
			return null;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 查询一个对象
	 * 
	 * @param id
	 * @return
	 */
	public <E> E selectOne(String id)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				E i = session.selectOne(nameSpace + id);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				E i = session.selectOne(id);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[selectOne]操作发生异常", e);
			return null;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 查询一个数据集合
	 * 
	 * @param id
	 * @param parameterObject
	 * @return
	 */
	public <E> List<E> selectList(String id, Object parameterObject)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				List<E> i = session.selectList(nameSpace + id, parameterObject);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				List<E> i = session.selectList(id, parameterObject);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[selectList]操作发生异常", e);
			return null;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 查询一个数据集合
	 * 
	 * @param id
	 * @return
	 */
	public <E> List<E> selectList(String id)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				List<E> i = session.selectList(nameSpace + id);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				List<E> i = session.selectList(id);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[selectList]操作发生异常", e);
			return null;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 根据开始位置返回指定数量的记录集合
	 * 
	 * @param id
	 * @param parameterObject
	 * @param offset
	 *            ：开始位置
	 * @param limit
	 *            ：返回上限
	 * @return
	 */
	public <E> List<E> selectList(String id, Object parameterObject, int offset, int limit)
	{
		SqlSession session = null;
		RowBounds bounds = new RowBounds(offset, limit);
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				List<E> i = session.selectList(nameSpace + id, parameterObject, bounds);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				List<E> i = session.selectList(id, parameterObject, bounds);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[selectList]操作发生异常", e);
			return null;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 返回指定位置的数据
	 * 
	 * @param id
	 * @param offset
	 *            ：开始位置
	 * @param limit
	 *            ：数据上限
	 * @return
	 */
	public <E> List<E> selectList(String id, int offset, int limit)
	{
		SqlSession session = null;
		RowBounds bounds = new RowBounds(offset, limit);
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				List<E> i = session.selectList(nameSpace + id, bounds);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				List<E> i = session.selectList(id, bounds);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[selectList]操作发生异常", e);
			return null;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 返回以指定列作为key的数据集合
	 * 
	 * @param id
	 * @param parameterObject
	 * @param mapKey
	 * @return
	 */
	public <K, V> Map<K, V> selectMap(String id, Object parameterObject, String mapKey)
	{
		SqlSession session = null;
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				Map<K, V> i = session.selectMap(nameSpace + id, parameterObject, mapKey);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				Map<K, V> i = session.selectMap(id, parameterObject, mapKey);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[selectMap]操作发生异常", e);
			return null;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	/**
	 * 查询指定范围的数据集合
	 * 
	 * @param id
	 * @param parameterObject
	 * @param mapKey
	 * @param offset
	 * @param limit
	 * @return
	 */
	public <K, V> Map<K, V> selectMap(String id, Object parameterObject, String mapKey, int offset, int limit)
	{
		SqlSession session = null;
		RowBounds bounds = new RowBounds(offset, limit);
		try
		{
			if (SQLMonitor.isOpen())
			{
				long tmpNanoTime = System.nanoTime();
				session = openSession();
				Map<K, V> i = session.selectMap(nameSpace + id, parameterObject, mapKey, bounds);
				SQLMonitor.trace(nameSpace + id, System.nanoTime() - tmpNanoTime);
				return i;
			}
			else
			{
				session = openSession();
				Map<K, V> i = session.selectMap(id, parameterObject, mapKey, bounds);
				return i;
			}
		}
		catch (Exception e)
		{
			logger.error("执行[selectMap]操作发生异常", e);
			return null;
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}

}
