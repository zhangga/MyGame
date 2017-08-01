package p.my.common.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * 时间工具类
 *
 * @author U-Demon Created on 2017年7月8日
 * @version 1.0.0
 */
public class TimeUtil {
	
	/** 秒 */
	public static final long SECOND = 1000;
	public static final String SECOND_CN = "秒";
	/** 分 */
	public static final long MINUTE = 60 * SECOND;
	public static final String MINUTE_CN = "分";
	/** 时 */
	public static final long HOUR = 60 * MINUTE;
	public static final String HOUR_CN = "小时";
	/** 天 */
	public static final long DAY = 24 * HOUR;
	public static final String DAY_CN = "天";
	/** 周 */
	public static final long WEEK = 7 * DAY;
	public static final String WEEK_CN = "周";
	public static final String MONTH_CN = "月";
	public static final String YEAR_CN = "年";
	
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
	
	//北京时区
	public static final long GMT8 = 8 * HOUR;
	
	public static final long GMT4 = 4 * HOUR;
	
	/**
	 * 获取当天的0点时间	time:00:00:00
	 * @param time
	 * @return
	 */
	public static long getDayStartTime(long time)
	{
		return (time+GMT8)/DAY*DAY-GMT8;
	}
	
	/**
	 * 获取当天的4点时间	time:04:00:00
	 *
	 * @param time
	 * @return
	 */
	public static long getDayMorning4(long time)
	{
		return (time+GMT4)/DAY*DAY-GMT4;
	}
	
	/**
	 * 以0点为准判断同一天
	 *
	 * @param time1
	 * @param time2
	 * @return
	 */
	public static boolean dayEqual(long time1, long time2)
	{
		return getDayStartTime(time1) == getDayStartTime(time2);
	}
	
	/**
	 * 获取某一时刻的整点时间
	 *
	 * @return
	 */
	public static long getLastClockTime(long time)
	{
		return time/HOUR*HOUR;
	}
	
	public static long getLastSpaceTime(long time, long space)
	{
		return time/space*space;
	}
	
	/**
	 * 获取两天时间的天数差
	 * @param before
	 * @param after
	 * @return
	 */
	public static int getDistanceDay(Date before, Date after)
	{
		return getDistanceDay(before.getTime(), after.getTime());
	}
	
	/**
	 * 获取两天时间的天数差
	 * @param before
	 * @param after
	 * @return
	 */
	public static int getDistanceDay(long before, long after)
	{
		return (int) (Math.abs(getDayStartTime(after) - getDayStartTime(before)) / DAY);
	}
	
	/**
	 * 获取两天时间的天数差
	 * @param before
	 * @param after
	 * @return
	 * @since 1.8
	 */
	public static long betweenDays(Temporal before, Temporal after) {
		return ChronoUnit.DAYS.between(before, after);
	}
	
	/**
	 * 获取当前的一个周几某时刻的time值	以周日0点算起点
	 * @param dayOfWeek		0周日     1周一    ...  6周六
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static long getCurrDayOfWeekTime(int dayOfWeek, int hour, int minute, int second)
	{
		long curr = System.currentTimeMillis();
		//1970-1-1是周四，算出当日所在周0的时间
		long initWeek0Time = 0 - 4 * DAY;
		//距周0过去多少天
		int day = (int) ((curr - initWeek0Time) / DAY);
		int week = day / 7;
		//当前周0时间
		long currWeek0Time = initWeek0Time + week * 7 * DAY - GMT8;
		//当前周dayOfWeek的时间
		long currDayOfWeekTime = currWeek0Time + dayOfWeek * DAY +
				hour * HOUR + minute * MINUTE + second * SECOND;
		//返回当前周的时间
		return currDayOfWeekTime;
	}
	
	/**
	 * 获取当前的一个周几某时刻的time值	以周日0点算起点
	 * @param dayOfWeek		0周日     1周一    ...  6周六
	 * @param timeFormat	"hh:mm:ss"
	 * @return
	 */
	public static long getCurrDayOfWeekTime(int dayOfWeek, String timeFormat)
	{
		int hour = 0, minute = 0, second = 0;
		if (timeFormat != null)
		{
			String[] times = timeFormat.split(":");
			if (times != null)
			{
				if (times.length == 1)
				{
					hour = Integer.valueOf(times[0]);
				}
				else if (times.length == 2)
				{
					hour = Integer.valueOf(times[0]);
					minute = Integer.valueOf(times[1]);
				}
				else if (times.length >= 3)
				{
					hour = Integer.valueOf(times[0]);
					minute = Integer.valueOf(times[1]);
					second = Integer.valueOf(times[2]);
				}
			}
		}
		return getCurrDayOfWeekTime(dayOfWeek, hour, minute, second);
	}
	
	/**
	 * 获取未到来的最近的一个周几某时刻的time值
	 * @param dayOfWeek		0周日     1周一    ...  6周六
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static long getNextDayOfWeekTime(int dayOfWeek, int hour, int minute, int second)
	{
		long curr = System.currentTimeMillis();
		//当前周dayOfWeek的时间
		long currDayOfWeekTime = getCurrDayOfWeekTime(dayOfWeek, hour, minute, second);
		//返回当前周或者下周的时间
		if (currDayOfWeekTime >= curr)
			return currDayOfWeekTime;
		else
			return currDayOfWeekTime + WEEK;
	}
	
	/**
	 * 获取未到来的最近的一个周几某时刻的time值
	 * @param dayOfWeek		0周日     1周一    ...  6周六
	 * @param timeFormat	"hh:mm:ss"
	 * @return
	 */
	public static long getNextDayOfWeekTime(int dayOfWeek, String timeFormat)
	{
		long curr = System.currentTimeMillis();
		//当前周dayOfWeek的时间
		long currDayOfWeekTime = getCurrDayOfWeekTime(dayOfWeek, timeFormat);
		//返回当前周或者下周的时间
		if (currDayOfWeekTime >= curr)
			return currDayOfWeekTime;
		else
			return currDayOfWeekTime + WEEK;
	}
	
	/** 时间格式串 */
	public static final String dateformatter = "yyyyMMdd";
	public static final String dateformatter_month = "yyyy-MM";
	public static final String dayformatter = "yyyy-MM-dd";
	public static final String dayformatter_en = "MMM.dd'th'.yyyy";
	public static final String timeformatter_minute = "HH:mm";
	public static final String timeformatter_second = "HH:mm:ss";
	public static final String datetimeformatter = "yyyy-MM-dd HH:mm:ss";
	public static final String timeformatter_ms = "HH:mm:ss";
	public static final String datetimeformatter_en = "HH:mm MMM.dd'th'.yyyy";
	public static final String datetimeformatter_cron = "ss mm HH dd MM ? yyyy";
	
	public static final ThreadLocal<SimpleDateFormat> threadDateFormat = new ThreadLocal<SimpleDateFormat>();
	public static final ThreadLocal<SimpleDateFormat> threadDayFormat = new ThreadLocal<SimpleDateFormat>();
	public static final ThreadLocal<SimpleDateFormat> threadDayFormatEn = new ThreadLocal<SimpleDateFormat>();
	public static final ThreadLocal<SimpleDateFormat> threadTimeFormatMinute = new ThreadLocal<SimpleDateFormat>();
	public static final ThreadLocal<SimpleDateFormat> threadTimeFormatSecond = new ThreadLocal<SimpleDateFormat>();
	public static final ThreadLocal<SimpleDateFormat> threadDateTimeFormat = new ThreadLocal<SimpleDateFormat>();
	public static final ThreadLocal<SimpleDateFormat> threadDateFormatMs = new ThreadLocal<SimpleDateFormat>();
	public static final ThreadLocal<SimpleDateFormat> threadDateTimeFormatEn = new ThreadLocal<SimpleDateFormat>();
	public static final ThreadLocal<SimpleDateFormat> threadDateTimeFormatCron = new ThreadLocal<SimpleDateFormat>();
	
	/** 格式化日期时间
	 * "yyyy-MM-dd HH:mm:ss" */
	public static String formatDateTime(Date date) {
		return getDateTimeFormatter().format(date);
	}
	
	/** 格式化日期时间
	 * "yyyy-MM-dd HH:mm:ss" */
	public static String formatDateTime(long time) {
		return getDateTimeFormatter().format(time);
	}
	
	/** 格式化日期时间
	 * "HH:mm MMM.dd'th'.yyyy" */
	public static String formatDateTimeEn(Date date) {
		return getDateTimeFormatterEn().format(date);
	}
	
	/** 格式化日期时间
	 * "HH:mm MMM.dd'th'.yyyy" */
	public static String formatDateTimeEn(long time) {
		return getDateTimeFormatterEn().format(time);
	}
	
	/** 格式化日期
	 * "yyyy-MM" */
	public static String formatMonth(Date date) {
		return getMonthFormatter().format(date);
	}
	
	/** 格式化日期
	 * "yyyy-MM" */
	public static String formatMonth(long time) {
		return getMonthFormatter().format(time);
	}
	
	/** 格式化日期
	 * "yyyyMMdd" */
	public static String formatDate(Date date) {
		return getDateFormatter().format(date);
	}
	
	/** 格式化日期
	 * "yyyyMMdd" */
	public static String formatDate(long time) {
		return getDateFormatter().format(time);
	}
	
	/** 格式化日期
	 * "yyyy-MM-dd" */
	public static String formatDay(Date date) {
		return getDayFormatter().format(date);
	}
	
	/** 格式化日期
	 * "yyyy-MM-dd" */
	public static String formatDay(long time){
		return getDayFormatter().format(time);
	}
	
	/** 格式化日期
	 * "MMM.dd'th'.yyyy" */
	public static String formatDayEn(Date date) {
		return getDayFormatterEn().format(date);
	}
	
	/** 格式化日期
	 * "MMM.dd'th'.yyyy" */
	public static String formatDayEn(long time){
		return getDayFormatterEn().format(time);
	}
	
	/** 格式化时间
	 * "HH:mm" */
	public static String formatTime(long time) {
		return getTimeMinuteFormatter().format(time);
	}
	/** 格式化时间
	 * "HH:mm" */
	public static String formatTime(Date date) {
		return getTimeMinuteFormatter().format(date);
	}
	
	/** 格式化时间
	 * "HH:mm:ss" */
	public static String formatTimeSecond(long time) {
		return getTimeSecondFormatter().format(time);
	}
	
	/** 格式化时间
	 * "HH:mm:ss" */
	public static String formatTimeSecond(Date date) {
		return getTimeSecondFormatter().format(date);
	}
	
	/** 格式化CronExpression时间表达式
	 * "ss mm HH dd MM ? yyyy" */
	public static String formatCronExpression(Date date) {
		return getCronExpressionFormatter().format(date);
	}
	
	/** 格式化日期时间(美式) */
	public static String formatDateMS(long time) {
		DateFormat df = DateFormat.getDateInstance(DateFormat.DEFAULT, new Locale("en-us", "US"));
		return df.format(new Date(time));
	}
	
	/** 格式化日期时间(美式) */
	public static String formatDateMS(Date date) {
		DateFormat df = DateFormat.getDateInstance(DateFormat.DEFAULT, new Locale("en-us", "US"));
		return df.format(date);
	}
	
	/** 格式化日期时间(美式) */
	public static String formatDateTimeMS(long time) {
		DateFormat df = DateFormat.getDateTimeInstance(DateFormat.DEFAULT, DateFormat.DEFAULT, new Locale("en-us", "US"));
		return df.format(new Date(time));
	}
	
	/** 格式化日期时间(美式) */
	public static String formatDateTimeMS(Date date) {
		DateFormat df = DateFormat.getDateTimeInstance(DateFormat.DEFAULT, DateFormat.DEFAULT ,new Locale("en-us", "US"));
		return df.format(date);
	}
	
	/** 解析指定字符串表示的日期
	 * "yyyy-MM-dd HH:mm:ss" */
	public static Date parseDataTime(String source) {
		try {
			return getDateTimeFormatter().parse(source);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/** 解析指定字符串表示的日期
	 * "yyyy-MM-dd" */
	public static Date parseDataDay(String source) {
		try {
			return getDayFormatter().parse(source);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/** 解析指定字符串表示的日期
	 * "MMM.dd'th'.yyyy" */
	public static Date parseDataDayEn(String source) {
		try {
			return getDayFormatterEn().parse(source);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/** 解析指定字符串表示的日期
	 * "HH:mm MMM.dd'th'.yyyy" */
	public static Date parseDataTimeEn(String source) {
		try {
			return getDateTimeFormatterEn().parse(source);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/** 解析指定字符串表示的日期
	 * "ss mm HH dd MM ? yyyy" */
	public static Date parseCronExpression(String source) {
		try {
			return getCronExpressionFormatter().parse(source);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/** 根据表达式计算开始时间,时间以毫秒形式标识 */
	public static long nextTime(String exp, int period) {
		return nextDate(exp, period).getTime();
	}
	
	/**
	 * 根据表达式计算开始时间，时间以Date格式标识
	 * @param exp
	 *            时间表达式<br />
	 *            格式：年-月-日-星期-时-分
	 * @param PERIOD
	 *            重复/间隔时间，以分为单位
	 * @return
	 */
	public static Date nextDate(String exp, int PERIOD) {
		Date time;
		try {
			String[] timer = exp.split("-");
			// Get the User provided Time
			Calendar userCal = Calendar.getInstance();
			// Get System Calendar Date
			Calendar sys = Calendar.getInstance();
			if ("*".equals(timer[0]))
				userCal.set(Calendar.YEAR, sys.get(java.util.Calendar.YEAR));
			else
				userCal.set(Calendar.YEAR, Integer.parseInt(timer[0]));
			if ("*".equals(timer[1]))
				userCal.set(Calendar.MONTH, sys.get(java.util.Calendar.MONTH));
			else
				userCal.set(Calendar.MONTH, Integer.parseInt(timer[1]));
			if ("*".equals(timer[2]))
				userCal.set(Calendar.DAY_OF_MONTH, sys.get(Calendar.DAY_OF_MONTH));
			else
				userCal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(timer[2]));
			if ("*".equals(timer[3]))
				userCal.set(Calendar.DAY_OF_WEEK, sys.get(java.util.Calendar.DAY_OF_WEEK));
			else
				userCal.set(Calendar.DAY_OF_WEEK, Integer.parseInt(timer[3]) + 1);
			if ("*".equals(timer[4]))
				userCal.set(Calendar.HOUR_OF_DAY, sys.get(java.util.Calendar.HOUR_OF_DAY));
			else
				userCal.set(Calendar.HOUR_OF_DAY, Integer.parseInt(timer[4]));
			if ("*".equals(timer[5]))
				userCal.set(Calendar.MINUTE, sys.get(java.util.Calendar.MINUTE));
			else
				userCal.set(Calendar.MINUTE, Integer.parseInt(timer[5]));
			userCal.set(Calendar.SECOND, 0);
			// Compare the two dates.
			while (userCal.getTime().getTime() < sys.getTime().getTime()) {
				// Time has passed. Next Occur Time
				userCal.add(Calendar.MINUTE, PERIOD);
			}
			// Set the time object
			time = userCal.getTime();
		} catch (Exception ex) {
			ex.printStackTrace();
			time = new Date();
		}
		return time;
	}
	
	/**
	 * 取得当前是一周中的第几天<br/>
	 * 1：周日
	 * 2：周一
	 * 3：周二
	 * ...
	 * 7：周六
	 */
	public static int getWeek(){
		return Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
	}
	
	/** 获取当前月份值 */
	public static int getMonth() {
		return Calendar.getInstance().get(Calendar.MONTH) + 1;
	}
	
	/** 某月第一天 */
	public static String beginingOfMonth(int month) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MONTH, month - 1);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMinimum(Calendar.DAY_OF_MONTH));
		return getDateFormatter().format(c.getTime());
	}
	
	/** 某月最后一天 */
	public static String endOfMonth(int month) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MONTH, month - 1);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
		return getDateFormatter().format(c.getTime());
	}
	
	/** 取得指定时间的long型数据 */
	public static long getTime(int day, String hour, String minute, String second) {
		Calendar c = Calendar.getInstance(); // 得到当前日期和时间
		c.set(Calendar.DAY_OF_YEAR, c.get(Calendar.DAY_OF_YEAR)+day);
		c.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hour)); // 设置小时
		c.set(Calendar.MINUTE, Integer.parseInt(minute)); // 设置分钟
		c.set(Calendar.SECOND, Integer.parseInt(second)); // 设置秒数
		c.set(Calendar.MILLISECOND, 0); // 把当前时间毫秒变成０
		return c.getTime().getTime();
	}
	
	/** 取得指定时间的long型数据 */
	public static long getTime(String hour, String minute, String second) {
		Calendar c = Calendar.getInstance(); // 得到当前日期和时间
		c.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hour)); // 设置小时
		c.set(Calendar.MINUTE, Integer.parseInt(minute)); // 设置分钟
		c.set(Calendar.SECOND, Integer.parseInt(second)); // 设置秒数
		c.set(Calendar.MILLISECOND, 0); // 把当前时间毫秒变成０
		return c.getTime().getTime();
	}
	
	/** 取得年份与周数的组合数值 */
	public static long getCountWeek(){
		Calendar ca = Calendar.getInstance();
		int year = ca.get(Calendar.YEAR);
		int week = ca.get(Calendar.WEEK_OF_YEAR);
		return year*100 + week;
	}
	
	/** 比较时间是否在指定两个时间之间 */
	public static boolean between(String start, String end, String time) {
		Date d = null;
		if (time != null && time.trim().length() > 0)
			d = parseDataTime(time);
		Date ds = parseDataTime(start);
		Date de = parseDataTime(end);
		return between(ds, de, d);
	}
	
	/** 比较时间是否在指定两个时间之间 */
	public static boolean between(Date start, Date end, Date time) {
		long ts = time == null ? System.currentTimeMillis() : time.getTime();
		if (start.getTime() <= ts && ts <= end.getTime()) {
			return true;
		}
		return false;
	}
	
	/** 计算两个time之间的时间差，计算包含年月日时分秒 */
	public static String getBetweenTwoDaysTimeStr(Date dt1, Date dt2) {
		long between = 0;
		if ((dt1.getTime() - dt2.getTime()) > 0) {
			between = dt1.getTime() - dt2.getTime();
		} else {
			between = dt2.getTime() - dt1.getTime();
		}
		
		long day = between / DAY;
		long hour = (between - day * DAY) / HOUR;
		long min = (between - day * DAY - hour * HOUR) / MINUTE;
		long sec = (between - day * DAY - hour * HOUR - min * MINUTE) / SECOND;
		
		StringBuilder sb = new StringBuilder();
		sb.append(day).append(DAY_CN).append(hour).append(HOUR_CN)
		.append(min).append(MINUTE_CN).append(sec).append(SECOND_CN);
		return sb.toString();
	}
	
	/** 倒计时形式 */
	public static String getCountdownTime(long time) {
		long day = time / DAY;
		long hour = (time - day * DAY) / HOUR;
		long min = (time - day * DAY - hour * HOUR) / MINUTE;
		long sec = (time - day * DAY - hour * HOUR - min * MINUTE) / SECOND;
		// 显示字符串
		String dayStr = String.valueOf(day);
		if (day < 10) {
			dayStr = "0" + day;
		}
		String hourStr = String.valueOf(hour);
		if (hour < 10) {
			hourStr = "0" + hour;
		}
		String minStr = String.valueOf(min);
		if (min < 10) {
			minStr = "0" + min;
		}
		String secStr = String.valueOf(sec);
		if (sec < 10) {
			secStr = "0" + sec;
		}
		StringBuilder sb = new StringBuilder();
		if (day <= 0) {
			sb.append(hourStr).append(":").append(minStr).append(":").append(secStr);
		} else {
			sb.append(dayStr).append(":").append(hourStr).append(":").append(minStr).append(":").append(secStr);
		}
		return sb.toString();
	}
	
	/** 随机时间(固定时间段) */
	public static long randomTime(long begin, long end) {
		long time = begin + (long) (Math.random() * (end - begin));
		if (time == begin || time == end) {
			return randomTime(begin, end);
		}
		return time;
	}
	
	/** 随机日期(固定日期段) */
	public static Date randomDate(Date beginDate, Date endDate) {
		if (beginDate.getTime() >= endDate.getTime()) {
			return null;
		}
		long date = randomTime(beginDate.getTime(), endDate.getTime());
		return new Date(date);
	}
	
	public static int getDayCount(int year, int month) {
		int daysInMonth[] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		if (1 == month)
			return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28;
		else
			return daysInMonth[month];
	}
	
	/** 计算剩余时间(毫秒数)*/
	public static long getLeftTime(long lastTime, long nowTime) {
		if ((lastTime - nowTime) > 0) {
			return lastTime - nowTime;
		} else {
			return nowTime - lastTime;
		}
	}
	
	/** 计算剩余时间(日时分秒)*/
	public static String getLeftTimeStr(long lastTime, long nowTime) {
		long between = getLeftTime(lastTime, nowTime); // 时间差,毫秒数
		// 时间差,天时分秒
		long day = between / DAY;
		long hour = (between - day * DAY) / HOUR;
		long min = (between - day * DAY - hour * HOUR) / MINUTE;
		long sec = (between - day * DAY - hour * HOUR - min * MINUTE) / SECOND;
		// 提示
		StringBuilder sb = new StringBuilder();
		if (day > 0) { // 天数
			sb.append(day).append(":");
		} else if (hour > 0) { // 小时数
			sb.append(hour).append(":");
		} else if (min > 0) { // 分钟数
			sb.append(min).append(":");
		} else if (sec > 0) { // 秒数
			sb.append(sec).append(":");
		}
		return sb.toString();
	}
	
	/** 获取DateTimeformater实例
	 * "yyyy-MM-dd HH:mm:ss" */
	private static DateFormat getDateTimeFormatter() {
		SimpleDateFormat datetimeFormat = threadDateTimeFormat.get();
		if (datetimeFormat == null) {
			datetimeFormat = new SimpleDateFormat(datetimeformatter);
			threadDateTimeFormat.set(datetimeFormat);
		}
		return datetimeFormat;
	}
	
	/** 获取DateTimeformater实例 
	 * "HH:mm MMM.dd'th'.yyyy"*/
	private static DateFormat getDateTimeFormatterEn() {
		SimpleDateFormat datetimeFormat = threadDateTimeFormatEn.get();
		if (datetimeFormat == null) {
			datetimeFormat = new SimpleDateFormat(datetimeformatter_en, Locale.ENGLISH);
			threadDateTimeFormatEn.set(datetimeFormat);
		}
		return datetimeFormat;
	}
	
	/** 获取Dateformater实例 
	 * "yyyyMMdd"*/
	private static DateFormat getDateFormatter() {
		SimpleDateFormat dateFormat = threadDateFormat.get();
		if (dateFormat == null) {
			dateFormat = new SimpleDateFormat(dateformatter);
			threadDateFormat.set(dateFormat);
		}
		return dateFormat;
	}
	
	/** 获取Dateformater实例 
	 * "yyyy-MM"*/
	private static DateFormat getMonthFormatter() {
		SimpleDateFormat dateFormat = threadDateFormat.get();
		if (dateFormat == null) {
			dateFormat = new SimpleDateFormat(dateformatter_month);
			threadDateFormat.set(dateFormat);
		}
		return dateFormat;
	}
	
	/** 获取Dayformater实例 
	 * "yyyy-MM-dd" */
	private static DateFormat getDayFormatter() {
		SimpleDateFormat dayFormat = threadDayFormat.get();
		if (dayFormat == null) {
			dayFormat = new SimpleDateFormat(dayformatter);
			threadDayFormat.set(dayFormat);
		}
		return dayFormat;
	}
	
	/** 获取Dayformater实例 
	 * "MMM.dd'th'.yyyy"*/
	private static DateFormat getDayFormatterEn() {
		SimpleDateFormat dayFormat = threadDayFormatEn.get();
		if (dayFormat == null) {
			dayFormat = new SimpleDateFormat(dayformatter_en, Locale.ENGLISH);
			threadDayFormatEn.set(dayFormat);
		}
		return dayFormat;
	}
	
	/** 获取TimeMinuteformater实例 
	 * "HH:mm"*/
	private static DateFormat getTimeMinuteFormatter() {
		SimpleDateFormat timeMinuteFormat = threadTimeFormatMinute.get();
		if (timeMinuteFormat == null) {
			timeMinuteFormat = new SimpleDateFormat(timeformatter_minute);
			threadTimeFormatMinute.set(timeMinuteFormat);
		}
		return timeMinuteFormat;
	}
	
	/** 获取TimeMinuteformater实例 
	 * "HH:mm:ss"*/
	private static DateFormat getTimeSecondFormatter() {
		SimpleDateFormat timeSecondFormat = threadTimeFormatSecond.get();
		if (timeSecondFormat == null) {
			timeSecondFormat = new SimpleDateFormat(timeformatter_second);
			threadTimeFormatSecond.set(timeSecondFormat);
		}
		return timeSecondFormat;
	}
	
	/** 获取CronExpression时间表达式实例 
	 * "ss mm HH dd MM ? yyyy"*/
	private static DateFormat getCronExpressionFormatter() {
		SimpleDateFormat timeSecondFormat = threadDateTimeFormatCron.get();
		if (timeSecondFormat == null) {
			timeSecondFormat = new SimpleDateFormat(datetimeformatter_cron);
			threadDateTimeFormatCron.set(timeSecondFormat);
		}
		return timeSecondFormat;
	}
	
}
