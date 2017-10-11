package com.hinear.hxt.servlet.school;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 重新summernote 创建的onImageUpload 方法实现把图片上传到服务器 SummernoteFileUpload
 */
@WebServlet("/summernoteFileUpload")
public class SummernoteFileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("SummernoteFileUpload(进入方法。。。)");
		request.setCharacterEncoding("utf-8");

		Map<String, String[]> map = request.getParameterMap();
		// 遍历
		for (Iterator iter = map.entrySet().iterator(); iter.hasNext();) {
			Map.Entry element = (Map.Entry) iter.next();
			// key值
			Object strKey = element.getKey();
			// value,数组形式
			String[] value = (String[]) element.getValue();

			System.out.print(strKey.toString() + "=");
			for (int i = 0; i < value.length; i++) {
				System.out.print(value[i] + ",");
			}
		}

		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
