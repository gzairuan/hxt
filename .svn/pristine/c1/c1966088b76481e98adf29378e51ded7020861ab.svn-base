package com.hinear.hxt.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.Map.Entry;
import java.util.zip.GZIPInputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class IndexServlet
 */
@WebServlet("/TestJson")
public class TestJsonServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		/*offset
		70
		limit
		10*/
		
		Map<String, String[]> map = request.getParameterMap();
		for (Entry<String, String[]> entry : map.entrySet()) {
			System.out.println(entry.getKey());
			for (String s : entry.getValue()) {
				System.out.println(s);
			}
		}
		String sOff = request.getParameter("offset");
		String sLim = request.getParameter("limit");
		
		System.out.println(sOff+"=="+sLim);
		int offset = Integer.parseInt(sOff==null?"0":sOff);
		int limit = Integer.parseInt(sLim==null?"10":sLim);
		int page = offset/limit;
		String url = "http://139.196.176.164:81/HXTAPPPWebs.ashx?ServerType=T01&PageIndex="
		+ page + "&PageSize=" + limit;
		System.out.println(url);
		String jsonData = getJsonData(url);
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonData);
	}

	private String getJsonData(String urlPath) throws MalformedURLException, IOException {
		String jsonData = null;
		URL url = new URL(urlPath);
		// 得到HttpURLConnection对象
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		try {
			// 设置为GET方式
			connection.setRequestMethod("GET");
			// 不要用cache，用了也没有什么用，因为我们不会经常对一个链接频繁访问。（针对程序）
			connection.setUseCaches(false);
			connection.setRequestProperty("Charset", "utf-8");
			connection.connect();

			if (200 == connection.getResponseCode()) {
				InputStream inputStream = null;
				if (isEmpty(connection.getContentEncoding())) {
					String encode = connection.getContentEncoding().toLowerCase();
					if (isEmpty(encode) && encode.indexOf("gzip") >= 0) {
						inputStream = new GZIPInputStream(connection.getInputStream());
					}
				}

				if (null == inputStream) {
					inputStream = connection.getInputStream();
				}

				BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "utf-8"));
				StringBuilder builder = new StringBuilder();
				String line = null;
				while ((line = reader.readLine()) != null) {
					builder.append(line).append("\n");
				}
				jsonData = builder.toString();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (connection != null) {
				connection.disconnect();
			}
		}
		return jsonData;
	}

	private boolean isEmpty(String text) {
		return text != null && text != "";
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
