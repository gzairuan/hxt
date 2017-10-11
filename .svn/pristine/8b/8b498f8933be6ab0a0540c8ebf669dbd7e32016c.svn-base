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
 * 删除通知
 */
@WebServlet("/deleteNewsServlet")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int typeId = TransformUtils.transformInt(request.getParameter("typeId"));
		String serverType;
		switch (typeId) {
			case News.TYPE_HOMEWORK://每日作业
				serverType = "21C";
				break;
	
			default:
				serverType = "";
				break;
		}
		String id = request.getParameter("newsId");
		Map<String, String> params = new HashMap<>();
		params.put("ID", id);
	
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
