package com.hinear.hxt.servlet.news;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.News;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * 修改通知数据
 */
@WebServlet("/updateNewsServlet")
public class UpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// 类型id
		int typeid = TransformUtils.transformInt(request.getParameter("typeId"));
		Map<String, String> params = new HashMap<>();
		String serverType;
		switch (typeid) {
		case News.TYPE_HOMEWORK://每日作业
			String newsJson = request.getParameter("news");
			serverType = "21B";
			params.put("JOBNEWS", newsJson);
			break;
		default:
			serverType = "";
			break;
		}
		String result = HttpUtils.getInstance().get(serverType, params);
		response.getWriter().write(result);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
