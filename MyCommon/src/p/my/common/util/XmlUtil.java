package p.my.common.util;

import java.io.ByteArrayInputStream;
import java.io.CharArrayReader;
import java.io.File;
import java.io.StringWriter;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.log4j.Logger;
import org.w3c.dom.Comment;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class XmlUtil {
	
	public static final Logger log = Logger.getLogger(XmlUtil.class.getName());
	
	public static final String BR = System.getProperty("line.separator");
	/**
	 * load a xml file from OS file system and interpret it into a Document no
	 * charset limited
	 * 
	 * @param xmlfile 字节码UTF-8的字符串
	 * @return Document
	 * @throws Exception
	 */
	public static Document loadByStream(String xmlfile) throws Exception {
		javax.xml.parsers.DocumentBuilderFactory factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		factory.setIgnoringComments(false);
		factory.setIgnoringElementContentWhitespace(false);
		factory.setValidating(false);
		factory.setCoalescing(true);
		DocumentBuilder builder = factory.newDocumentBuilder();
		return builder.parse(new ByteArrayInputStream(xmlfile.getBytes("UTF-8")));
	}
	
	/**
	 * load a xml file from OS file system and interpret it into a Document no
	 * charset limited
	 * 
	 * @param xmlfile String 文件路径名
	 * @return Document
	 * @throws Exception
	 */
	public static Document load(String xmlfile) throws Exception {
		javax.xml.parsers.DocumentBuilderFactory factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		factory.setIgnoringComments(false);
		factory.setIgnoringElementContentWhitespace(false);
		factory.setValidating(false);
		factory.setCoalescing(true);
		DocumentBuilder builder = factory.newDocumentBuilder();
		return builder.parse(xmlfile); // 此方法出异常 java.net.MalformedURLException: no protocol
	}
	
	/**
	 * load a xml file from OS file system and interpret it into a Document no
	 * charset limited
	 * 
	 * @param xmlfile
	 *            String 文件路径名
	 * @return Document
	 * @throws Exception
	 */
	public static Document load(File xmlfile) throws Exception {
		javax.xml.parsers.DocumentBuilderFactory factory = javax.xml.parsers.DocumentBuilderFactory.newInstance(); //获取 DocumentBuilderFactory 的新实例
		factory.setIgnoringComments(false); //指定由此代码生成的解析器将忽略注释
		factory.setIgnoringElementContentWhitespace(false); //解析XML文档时，必须删除元素内容中的空格
		factory.setValidating(false); //指定由此代码生成的解析器将验证被解析的文档
		factory.setCoalescing(true); //指定由此代码生成的解析器将把CDATA节点转换为Text节点，并将其附加到相邻（如果有）的Text节点
		DocumentBuilder builder = factory.newDocumentBuilder(); //使用当前配置的参数创建一个新的DocumentBuilder实例
		return builder.parse(xmlfile); //将给定文件的内容解析为一个 XML文档，并且返回一个新的DOM Document对象
	}
	
	/**
	 * 取得文件名
	 * 
	 * @param filePath
	 *            String
	 * @return String
	 */
	public static String getFileName(String filePath) {
		// 将给定的正则表达式编译到模式中
		Pattern p = Pattern.compile("[^\\" + File.separator + "]+.xml"); //separator-->与系统有关的默认名称分隔符
		Matcher m = p.matcher(filePath); //创建匹配给定输入与此模式的匹配器
		if (m.find()) { //尝试查找与该模式匹配的输入序列的下一个子序列
			return m.group().substring(0, m.group().length() - 4); //返回由以前匹配操作所匹配的输入子序列
		}
		return "";
	}
	
	/**
	 * 验证文件名是否合法
	 * 
	 * @param filePath
	 *            String
	 * @return String
	 */
	public static boolean checkValidity(String filePath) {
		String[] array = filePath.split(".");
		if (array[array.length - 1].equals("xml")) {
			return true;
		} else {
			return false;
		}
	}
	
	/** 判断是否为XML文件 */
	public static boolean isXml(String file) {
		if (file.toLowerCase().endsWith("xml")) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * load a String without the title tag of xml into a Document
	 * 
	 * @param domContent
	 *            String 没有head的XML内容
	 * @return Document
	 * @throws Exception
	 */
	public static Document loadStringWithoutTitle(String domContent) throws Exception {
		domContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + BR + domContent;
		return loadString(domContent);
	}
	
	/**
	 * load a String with a title tag of xml into a Document
	 * 
	 * @param domContent
	 *            String XML内容
	 * @return Document
	 * @throws Exception
	 */
	public static Document loadString(String domContent) throws Exception {
		javax.xml.parsers.DocumentBuilderFactory factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		factory.setIgnoringComments(false);
		factory.setIgnoringElementContentWhitespace(false);
		factory.setValidating(false);
		factory.setCoalescing(false);
		DocumentBuilder builder = factory.newDocumentBuilder();
		char[] chars = new char[domContent.length()];
		domContent.getChars(0, domContent.length(), chars, 0); //将字符从此字符串复制到目标字符数组
		InputSource is = new InputSource(new CharArrayReader(chars)); //使用字节流创建新的输入源
		return (builder.parse(is));
	}
	
	/**
	 * 获取子节点的额内容 
	 * 
	 * @param parent
	 *            Element
	 * @param name
	 *            String
	 * @return String
	 */
	public static String getChildText(Element parent, String name) {
		Element e = getChildByName(parent, name);
		if (e == null) {
			return "";
		}
		return getText(e);
	}
	
	/**
	 * 根据名称得到一个父节点下所有的子节点
	 * 
	 * @param e
	 *            Element
	 * @param name
	 *            String
	 * @return Element[]
	 */
	public static Element[] getChildrenByName(Element e, String name) {
		NodeList nl = e.getChildNodes();
		int max = nl.getLength();
		LinkedList<Node> list = new LinkedList<Node>();
		for (int i = 0; i < max; i++) {
			Node n = nl.item(i);
			if (n.getNodeType() == Node.ELEMENT_NODE && n.getNodeName().equals(name)) {
				list.add(n);
			}
		}
		return list.toArray(new Element[list.size()]);
	}
	
	/**
	 * 根据名字查找某个节点下的符合该名字的节点
	 * 
	 * @param e
	 *            Element 父节点
	 * @param name
	 *            String 子节点名称
	 * @return Element
	 */
	public static Element getChildByName(Element e, String name) {
		Element[] list = getChildrenByName(e, name);
		if (list.length == 0) {
			return null;
		}
		if (list.length > 1) {
			throw new IllegalStateException("Too many (" + list.length + ") '" + name + "' elements found!");
		}
		return list[0];
	}
	
	/**
	 * 得到一个节点的文字
	 * 
	 * @param e
	 *            Element
	 * @return String
	 */
	public static String getText(Element e) {
		NodeList nl = e.getChildNodes();
		int max = nl.getLength();
		for (int i = 0; i < max; i++) {
			Node n = nl.item(i);
			if (n.getNodeType() == Node.TEXT_NODE) {
				return n.getNodeValue();
			}
		}
		return "";
	}
	
	public static String getAttribute(Element e, String name) {
		return e.getAttribute(name);
	}
	
	/**
	 * get Int value
	 * @return
	 */
	public static int getIntValue(Element e) {
		return Integer.valueOf(getText(e));
	}
	
	public static Long getLongValue(Element e) {
		return Long.valueOf(getText(e));
	}
	
	
	/**
	 * get byte value
	 * @return
	 */
	public static byte getByteValue(Element e) {
		return Byte.valueOf(getText(e));
	}
	
	/**
	 * 获取Properties格式的xml数据
	 * 
	 * @param root
	 * @return
	 */
	public static Map<String, Object> getProperties(Element root) {
		Map<String, Object> map = new HashMap<String, Object>();
		Element[] list = getChildrenByName(root, "property");
		for (int i = 0; i < list.length; i++) {
			String name = list[i].getAttribute("name");
			String type = list[i].getAttribute("type");
			String valueString = getText(list[i]);
			try {
				Class<?> cls = Class.forName(type);
				Constructor<?> con = cls.getConstructor(new Class[] { String.class });
				Object value = con.newInstance(new Object[] { valueString
						
				});
				map.put(name, value);
			} catch (Exception e) {
				log.error("Unable to parse property '" + name + "'='" + valueString + "': " + e.toString());
			}
		}
		return map;
	}
	
	/**
	 * 将dom中的内容存入xmlfile所指的文件中。 dom==null时，xml文件也是空的。
	 * 
	 * @param xmlfile
	 *            java.lang.String 保存的文件名
	 * @param doc
	 *            ort.w3c.dom.Document 需要保存的DOM
	 * @throws Exception
	 *             任何异常
	 */
	public static void save(String xmlfile, Document doc) throws Exception {
		// 首先创建一个DOMSource对象,该构造函数的参数可以是一个Document对象
		// doc代表更改后的DOM Tree。
		DOMSource doms = new DOMSource(doc);
		
		// 创建一个File对象,代表DOM Tree所包含的数据的输出介质,这是一个XML文件。
		File f = new File(xmlfile);
		File dir = f.getParentFile();
		dir.mkdirs();
		// 创建一个StreamResult对象,该构造函数的参数可以取为File对象。
		StreamResult sr = new StreamResult(f);
		
		// 下面调用JAXP中的XSLT引擎来实现输出DOM Tree中的数据到XML文件中的功能。
		// XSLT引擎的输入为DOMSource对象,输出为StreamResut对象。
		try {
			// 首先创建一个TransformerFactory对象,再由此创建Transformer对象。Transformer
			// 类相当于一个XSLT引擎。通常我们使用它来处理XSL文件,但是在这里我们使
			// 用它来输出XML文档。
			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer t = tf.newTransformer();
			// 设置新的输出属性:输出字符编码为UTF-8,XSLT引擎所输出
			// 的XML文档如果包含了中文字符,可以正常显示,不会出现所谓的"汉字问题"。
			// 请留意OutputKeys类的字符串常数OutputKeys.ENCODING。
			Properties properties = t.getOutputProperties();
			properties.setProperty(OutputKeys.ENCODING, "UTF-8");
			properties.setProperty(OutputKeys.INDENT, "yes");
			// 更新XSLT引擎的输出属性。
			t.setOutputProperties(properties);
			// 关键的一步, 调用Transformer对象 (XSLT引擎)的transform()方法,该方法的第一
			// 个参数是DOMSource对象,第二个参数是StreamResult对象。
			t.transform(doms, sr);
			
		} catch (TransformerConfigurationException tce) {
			log.error(tce);
		} catch (TransformerException te) {
			log.error(te);
		}
		
	}
	
	/**
	 * create a blank Document.
	 * 
	 * @param rootElementName
	 *            String
	 * @return Document
	 * @throws Exception
	 */
	public static Document blankDocument(String rootElementName) throws Exception {
		javax.xml.parsers.DocumentBuilderFactory factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		factory.setIgnoringComments(false);
		factory.setIgnoringElementContentWhitespace(false);
		factory.setValidating(false);
		factory.setCoalescing(false);
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.newDocument();
		Element root = doc.createElement(rootElementName);
		doc.appendChild(root);
		return doc;
	}
	
	public static Element createChild(Document doc, Element root, String name) {
		Element elem = doc.createElement(name);
		root.appendChild(elem);
		return elem;
	}
	
	public static void createChildText(Document doc, Element elem, String name, String value) {
		Element child = doc.createElement(name);
		child.appendChild(doc.createTextNode(value == null ? "" : value));
		elem.appendChild(child);
	}
	
	/**
	 * 创建一个带注释的子节点
	 * 
	 * @param doc
	 *            Document
	 * @param elem
	 *            Element
	 * @param name
	 *            String
	 * @param value
	 *            String
	 * @param comment
	 *            String
	 */
	public static void createChildTextWithComment(Document doc, Element elem,
			String name, String value, String comment) {
		Element child = doc.createElement(name);
		child.appendChild(doc.createTextNode(value == null ? "" : value));
		Comment c = doc.createComment(comment);
		elem.appendChild(c);
		elem.appendChild(child);
	}
	
	/**
	 * 创建一段注释
	 * 
	 * @param doc
	 *            Document
	 * @param comment
	 *            String
	 */
	public static void createComment(Document doc, String comment) {
		Comment c = doc.createComment(comment);
		doc.getDocumentElement().appendChild(c);
	}
	
	public static void createOptionalChildText(Document doc, Element elem,
			String name, String value) {
		if (value == null || value.length() == 0) {
			return;
		}
		Element child = doc.createElement(name);
		child.appendChild(doc.createTextNode(value));
		elem.appendChild(child);
	}
	
	/**
	 * document转化为string
	 * @param doc
	 * @return
	 */
	public static String Doc2String(Document doc) {
		try {
			DOMSource   domSource   =   new   DOMSource(doc);
			StringWriter   writer   =   new   StringWriter();
			StreamResult   result   =   new   StreamResult(writer);
			TransformerFactory   tf   =   TransformerFactory.newInstance();
			Transformer transformer = tf.newTransformer();
//	        transformer.setOutputProperty(OutputKeys.ENCODING, "utf-8");	
			transformer.transform(domSource,   result);
			return writer.toString();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
	
	public static void applyProperties(Object o, Element root) {
		Map<String, Object> map = getProperties(root);
		Iterator<String> it = map.keySet().iterator();
		Field[] fields = o.getClass().getFields();
		Method[] methods = o.getClass().getMethods();
		while (it.hasNext()) {
			String name = (String) it.next();
			Object value = map.get(name);
			try {
				for (int i = 0; i < fields.length; i++) {
					if (fields[i].getName().equalsIgnoreCase(name)
							&& isTypeMatch(fields[i].getType(), value.getClass())) {
						fields[i].set(o, value);
						log.error("Set field " + fields[i].getName() + "=" + value);
						break;
					}
				}
				for (int i = 0; i < methods.length; i++) {
					if (methods[i].getName().equalsIgnoreCase("set" + name)
							&& methods[i].getParameterTypes().length == 1
							&& isTypeMatch(methods[i].getParameterTypes()[0], value.getClass())) {
						methods[i].invoke(o, new Object[] { value });
						log.error("Set method " + methods[i].getName() + "=" + value);
						break;
					}
				}
			} catch (Exception e) {
				log.error("Unable to apply property '" + name + "'");
			}
		}
	}
	
	private static boolean isTypeMatch(Class<?> one, Class<?> two) {
		if (one.equals(two)) {
			return true;
		}
		if (one.isPrimitive()) {
			if (one.getName().equals("int") && two.getName().equals("java.lang.Integer")) {
				return true;
			}
			if (one.getName().equals("long") && two.getName().equals("java.lang.Long")) {
				return true;
			}
			if (one.getName().equals("float") && two.getName().equals("java.lang.Float")) {
				return true;
			}
			if (one.getName().equals("double") && two.getName().equals("java.lang.Double")) {
				return true;
			}
			if (one.getName().equals("char") && two.getName().equals("java.lang.Character")) {
				return true;
			}
			if (one.getName().equals("byte") && two.getName().equals("java.lang.Byte")) {
				return true;
			}
			if (one.getName().equals("short") && two.getName().equals("java.lang.Short")) {
				return true;
			}
			if (one.getName().equals("boolean") && two.getName().equals("java.lang.Boolean")) {
				return true;
			}
		}
		return false;
	}

}
