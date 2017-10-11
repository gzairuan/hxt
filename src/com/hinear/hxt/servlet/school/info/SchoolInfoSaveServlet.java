package com.hinear.hxt.servlet.school.info;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;

/**
 * 学校简介编辑保存 SchoolInfoSaveServlet
 * 
 * @time: 2017-6-21
 * @author szs
 */
@WebServlet("/schoolInfoSaveServlet")
public class SchoolInfoSaveServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		UserInfo user = (UserInfo) request.getSession().getAttribute("userInfo");
		String newsContent = request.getParameter("newsContent");
		System.out.println("内容："+newsContent);

		Map<String, String> map = new HashMap<String, String>();
		map.put("SID", "" + user.getSID());
		map.put("UserID", "" + user.getUSERID());
		map.put("NEWSCONTENT", newsContent);
		String saveJson = HttpUtils.getInstance().post("05A", map);

		response.getWriter().print(saveJson);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
