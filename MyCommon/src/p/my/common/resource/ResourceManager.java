package p.my.common.resource;

import java.io.File;
import java.util.*;

import org.apache.log4j.Logger;

/**
 * 资源加载/更新检测器
 */
public class ResourceManager implements Runnable {

	public static Logger log = Logger.getLogger(ResourceManager.class.getName());

	private static final ResourceManager instance = new ResourceManager();

	public static ResourceManager getInstance() {
		return instance;
	}

	private ResourceManager() {
		resources = new LinkedHashMap<File, ResourceListener>(0);
		lastModif = new HashMap<File, Long>(0);
	}

	volatile boolean dirty;

	Collection<Change> changes = Collections.synchronizedCollection(new ArrayList<Change>());

	public Collection<Change> getChanges() {
		return changes;
	}

	public static class Change {
		ResourceListener l;
		File f;
	}

	/** 默认忽略的文件或文件夹 */
	static public String[] IGNORE_FILE = new String[] { ".svn" };

	/** 默认刷新时间 */
	static final public long DEFAULT_DELAY = 60 * 1000;

	volatile boolean shutdown; // 关闭

	/** 屏蔽更新的文件列表*/
	List<File> ignoredFileList = new ArrayList<File>(0);
	/** 所有监听资源 */
	Map<File, ResourceListener> resources = new LinkedHashMap<File, ResourceListener>(0);
	/** 所有文件监听器 */
	Map<String, ResourceListener> listeners = new HashMap<String, ResourceListener>(0);
	/** 文件上次修改时间 */
	Map<File, Long> lastModif = new HashMap<File, Long>(0);

	// volatile boolean dirty;

	private final Thread thread = new Thread(this, "ResourceListener") {
		{
			setDaemon(true);
		}
	};

	public final void shutdown() {
		shutdown = true;
	}

	/** 启动线程 */
	public void start() {
		if (!thread.isAlive()) {
			thread.start();
		}
	}

	/** 运行线程 */
	public void run() {
		while (!shutdown) {
			try {
				Thread.sleep(DEFAULT_DELAY);
				checkChanges();
				//World.getInstance().removeOuttimeSession();
				// 资源更新提示
				if (dirty) {
					synchronized (changes) {
						for (Change l : changes) {
							log.info("Resource Loaded：" + l.f.getPath());
							l.l.onResourceChange(l.f);
						}
						changes.clear();
					}
					dirty = false;
				}
			} catch (Exception e) {
				log.error("监测资源变更线程出错...");
			}
		}
	}

	/** 列出所有的listener */
	public Collection<ResourceListener> getAllListeners() {
		return resources.values();
	}

	public ResourceListener getListener(String id) {
		return listeners.get(id);
	}

	/** 添加资源监听器 */
	public void addResourceListener(ResourceListener listener) {
		addResourceListener(listener, false);
	}

	/** 添加资源监听器
	 * @param listener 待添加的监听器
	 * @param loadOnAdded 添加监听器时，更新资源
	 */
	public void addResourceListener(ResourceListener listener, boolean loadOnAdded) {
		resources.put(listener.listenedFile(), listener);
		listeners.put(listener.toString(), listener);
		if (loadOnAdded)
			checkChange(listener.listenedFile(), listener, Long.MIN_VALUE, false);
		else
			lastModif.put(listener.listenedFile(), getLastModified(listener
					.listenedFile(), listener.listenedFile().lastModified()));
	}

	/** 获取文件上次修改时间 */
	private static final long getLastModified(File file, long lastModified) {
		if (file.isDirectory()) {
			for (File f : file.listFiles()) {
				if (getLastModified(f, lastModified) > lastModified) {
					lastModified = f.lastModified();
				}
			}
			return lastModified;
		} else {
			return Math.max(file.lastModified(), lastModified);
		}
	}

	/** 检测更新 */
	public void checkChanges() {
		for (Map.Entry<File, ResourceListener> entry : resources.entrySet()) {
			File file = entry.getKey();
			checkChange(file, resources.get(file), lastModif.get(file), true);
		}

	}

	/** 检测资源变化 */
	private void checkChange(ResourceListener listener) {
		checkChange(listener.listenedFile(), listener, lastModif.get(listener.listenedFile()), true);
	}

	/** 加载资源 */
	void loadResource(ResourceListener listener) {
		checkChange(listener.listenedFile(), listener, Long.MIN_VALUE, false);
	}

	/** 加载单个文件 */
	public boolean reload(String name, String fileName) {
		for (ResourceListener listener : resources.values()) {
			File file = listener.listenedFile();
			if (!listener.toString().equals(name) // 监听器ID错误
					|| !file.getName().equals(fileName)) { // 文件错误
				continue;
			}
			//file = new File(file.getPath());
			if (file.exists()) {
				listener.onResourceChange(file);
				return true;
			}
		}
		return false;
	}

	/** 更新单个资源 */
	public boolean checkChange(String name, boolean force) {
		for (ResourceListener l : resources.values()) {
			if (l.toString().equals(name)) {
				if (force)
					loadResource(l);
				else
					checkChange(l);
				return true;
			}
		}
		return false;
	}

//	public static final void main(String[] args) {
//		File[] list = new File("D:").listFiles();
//		Arrays.sort(list, new Comparator<File>() {
//			public int compare(File o1, File o2) {
//				if (o1.isDirectory()) {
//					if (o2.isDirectory()) {
//						return o1.getName().compareTo(o2.getName());
//					} else {
//						return 1;
//					}
//				} else if (o2.isDirectory()) {
//					return -1;
//				} else
//					return o1.getName().compareTo(o2.getName());
//			}
//		});
//		for (File f : list) {
//			System.out.println(f);
//		}
//	}

	/** 是否异步更新，是则加入更新列表等待主线程tick，否则直接更新 */
	private void checkChange(final File file, final ResourceListener listener, long lastModified, boolean async) {
		if (isIgnoredFile(file)) {
			return;
		}
		if (file.isDirectory()) {
			File[] list = file.listFiles();
			if (list.length > 0) {
				Arrays.sort(list, new Comparator<File>() {
					public int compare(File o1, File o2) {
						if (o1.isDirectory()) {
							if (o2.isDirectory()) {
								return o1.getName().compareTo(o2.getName());
							} else {
								return 1;
							}
						} else if (o2.isDirectory()) {
							return -1;
						} else
							return o1.getName().compareTo(o2.getName());
					}
				});
				for (File f : list) {
					checkChange(f, listener, lastModified, async);
				}
			}
		} else {
			long modif = file.lastModified();
			if (modif > lastModified) {
				try {
					if (async) {// 修改成从world主线程更新
						changes.add(new Change() {
							{
								this.l = listener;
								this.f = file;
							}
						});
						this.dirty = true;
					} else {
						listener.onResourceChange(file);
					}
					Long last = lastModif.get(listener.listenedFile());
					if (last == null || modif > last)
						lastModif.put(listener.listenedFile(), modif);
				} catch (Exception e) {
					log.error("更新资源出错...");
				}
			}
		}
	}

	/** 增加屏蔽加载的文件 */
	public void addIgnoredFile(File file) {
		ignoredFileList.add(file);
	}

	/** 是否被屏蔽加载 */
	public boolean isIgnoredFile(File file) {
		for (String s : IGNORE_FILE) {
			if (s.equals(file.getName())) { // skip igore file name
				return true;
			}
		}
		for (File f : ignoredFileList) {
			if (f.equals(file)) { // skip igore file name
				return true;
			}
		}
		return false;
	}

}
