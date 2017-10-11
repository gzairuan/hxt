package com.hinear.hxt.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Map.Entry;

/**
 * 网络请求工具类
 * 
 * @author ZYZ
 * @time 2017/6/7
 * @version 1.1
 *          <p>
 *          get请求方法{@link HttpUtils#get(String, Map)}
 *          post带参请求{@link HttpUtils#post(String, Map, Map)}
 */
public class HttpUtils {

	/**
	 * 请求网址
	 */
	private final String url = "http://www.hinear.com:81/HXTAPPPWebs.ashx";

	/**
	 * 除查询接口外的所有接口
	 */
	public static final String RESULT_OK = "1";

	public static final String RESULT_NO_DATA = "-1";
	public static final String RESULT_NO_DATA_JSON = "{\"total\":0,\"rows\":[]}";

	public static final String RESULT_OK_JSON = "{\"result\":\"ok\"}";
	public static final String RESULT_FAIL_JSON = "{\"result\":\"fail\"}";

	/*public static String isSubmitSuccess(String result) {
		if (RESULT_OK.equals(result)) {
			return RESULT_OK_JSON;
		}
		return RESULT_FAIL_JSON;
	}

	public static String isNoData(String jsonData) {
		if (RESULT_NO_DATA.equals(jsonData)) {
			return RESULT_NO_DATA_JSON;
		}
		return jsonData;
	}*/

	private static HttpUtils mHttpUtils;

	private HttpUtils() {
		/* 不能实例化 请绕道 */
	}

	public static HttpUtils getInstance() {
		if (mHttpUtils == null) {
			synchronized (HttpUtils.class) {
				if (mHttpUtils == null) {
					mHttpUtils = new HttpUtils();
				}
			}
		}
		return mHttpUtils;
	}

	/**
	 * GET请求
	 * 
	 * @param serverType
	 *            请求入口
	 * @param params
	 *            请求参数
	 * @return 请求结果
	 * @throws IOException
	 */
	public String get(String serverType, Map<String, String> params) throws IOException {
		return executeGet(buildReqUrl(serverType, params));
	}

	/**
	 * POST HTTP请求
	 * 
	 * @param serverType
	 *            请求入口
	 * @param postParams
	 *            请求参数
	 * @return 请求结果
	 */
	public String post(String serverType, Map<String, String> postParams) throws IOException {
		return post(serverType, null, postParams);
	}

	/**
	 * POST 带参请求
	 * 
	 * @param serverType
	 *            请求入口
	 * @param getParams
	 *            请求GET参数（可为null）
	 * @param postParams
	 *            请求POST参数（必须有参数）
	 * @return 请求结果
	 * @throws IOException
	 */
	public String post(String serverType, Map<String, String> getParams, Map<String, String> postParams)
			throws IOException {
		if (postParams == null || postParams.isEmpty()) {
			throw new IOException("POST请求参数不能为空");
		}
		return executePost(buildReqUrl(serverType, getParams), buildParamString(postParams));
	}

	/**
	 * 执行get请求
	 * 
	 * @param url
	 *            请求网址
	 * @return 请求结果
	 * @throws IOException
	 */
	private String executeGet(String url) throws IOException {
		return execute(url, null, "GET");
	}

	/**
	 * 执行post带参请求
	 * 
	 * @param url
	 *            请求网址
	 * @param paramString
	 *            请求参数字符串
	 * @return 请求结果
	 * @throws IOException
	 */
	private String executePost(String url, String paramString) throws IOException {
		return execute(url, paramString, "POST");
	}

	/**
	 * 执行post带参请求
	 * 
	 * @param url
	 *            请求网址
	 * @param paramString
	 *            请求参数字符串
	 * @param method
	 *            请求方式（GET 或 POST）
	 * @return 请求结果 json字符串 
	 * 			{result:xxx}
	 * 			xxx 为ok成功 fail 失败（新增 修改 删除 等接口）
	 * 			{title:0,rows:[]} 请求数据为空 （查询数据等接口）
	 * @throws IOException
	 */
	private String execute(String url, String paramString, String method) throws IOException {
		System.out.println("请求地址：" + url);
		System.out.println("请求参数：" + paramString);
		// 声明网址
		URL _url = new URL(url);
		// 打开和URL之间的连接
		HttpURLConnection urlConnection = (HttpURLConnection) _url.openConnection();
		// 关闭长连接
		// urlConnection.setRequestProperty("Connection", "Close");
		// 设置请求方式
		urlConnection.setRequestMethod(method);
		if("post".equalsIgnoreCase(method)&&paramString!=null){
			// post请求方式必须设置为true
			urlConnection.setDoOutput(true);
			urlConnection.setDoInput(true);
			// 不使用缓存
			urlConnection.setUseCaches(false);
			
			// 获取urlConnection的输出流（开始连接）
			PrintWriter pw = new PrintWriter(urlConnection.getOutputStream());
			// 发送请求参数
			pw.write(paramString);
			// 缓冲输出流
			pw.flush();
			
			pw.close();
		}
		urlConnection.connect();
		if (urlConnection.getResponseCode() != 200){
//			throw new IOException(
//					"错误码：" + urlConnection.getResponseCode() + "\n错误提示：" + urlConnection.getResponseMessage());
			System.out.println("请求响应码：" + urlConnection.getResponseCode() 
						+ "\n请求响应结果：" + urlConnection.getResponseMessage());
			return RESULT_FAIL_JSON;
		}
		// 获取输入流，获取请求结果
		String result = readResult(urlConnection.getInputStream());
		// 断开连接
		urlConnection.disconnect();
		if (result == null || "".equals(result)) {
//			throw new IOException("返回结果为空");
			System.out.println("返回结果为空");
			return RESULT_FAIL_JSON;
		}
		if(RESULT_OK.equals(result)){
			return RESULT_OK_JSON;
		}
		
		if(RESULT_NO_DATA.equals(result)){
			return RESULT_NO_DATA_JSON;
		}
		if(result.indexOf("[")==0||result.indexOf("{")==0){
			return result;
		}
		return RESULT_FAIL_JSON;
	}

	/**
	 * 读取输入流结果
	 * 
	 * @param is
	 *            输入流
	 * @return 结果
	 * @throws IOException
	 */
	private String readResult(InputStream is) throws IOException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int len = 0;
		while (-1 != (len = is.read(buffer))) {
			baos.write(buffer, 0, len);
			baos.flush();
		}
		// 请求结果
		String result = baos.toString("utf-8");

		if (baos != null) {
			baos.close();
		}
		if (is != null) {
			is.close();
		}
		System.out.println("请求接口返回的结果：" + result);
		return result;
	}

	/**
	 * 创建请求网址
	 * 
	 * @param serverType
	 *            请求API入口
	 * @param reqParams
	 *            请求参数
	 * @return 请求网址
	 * @throws IOException
	 */
	private String buildReqUrl(String serverType, Map<String, String> reqParams) throws IOException {
		String rootUrl = rootUrl(serverType);
		String paramString = buildParamString(reqParams);
		if (paramString == null) {
			return rootUrl;
		}
		return rootUrl + "&" + paramString;
	}

	/**
	 * 创建请求参数拼接字符串（key=value&key1=value1）
	 * 
	 * @param params
	 *            请求参数
	 * @return 参数拼接字符串（key=value&key1=value1）
	 * @throws IOException
	 */
	private String buildParamString(Map<String, String> params) throws IOException {
		if (params == null || params.isEmpty()) {
			return null;
		}
		StringBuilder sb = new StringBuilder();
		for (Entry<String, String> entry : params.entrySet()) {
			String strEncode = URLEncoder.encode(entry.getValue(), "UTF-8").replace("+", "%20");
			sb.append(entry.getKey()).append("=").append(strEncode).append("&");
		}
		sb.deleteCharAt(sb.lastIndexOf("&"));
		return sb.toString();
	}

	/**
	 * 创建请求入口网址
	 * 
	 * @param serverType
	 *            请求入口
	 * @return 入口网址
	 */
	private String rootUrl(String serverType) {
		return url + "?SOURCETYPE=1&ServerType=" + serverType;
	}
}
