package com.hinear.hxt.servlet.school;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.util.HttpUtils;

/**
 * @author szs
 * @time 2017年6月9日 上午11:03:13
 * @version 1.0 描述：学校通知删除 SchoolNoticeDelServlet
 */
@WebServlet("/schoolNoticeDelServlet")
public class SchoolNoticeDelServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String noticeId = request.getParameter("NOTICEID");
		System.out.println("noticeId=" + noticeId);

		Map<String, String> map = new HashMap<String, String>();
		map.put("ID", noticeId);
		String jsonData = HttpUtils.getInstance().get("06B", map);
		System.out.println("jsonData-->" + jsonData);

		response.setContentType("text/thml;charset=utf-8");
		response.setCharacterEncoding("utf-8");

		response.getWriter().print(jsonData);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
