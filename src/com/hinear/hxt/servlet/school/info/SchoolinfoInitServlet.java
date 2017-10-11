package com.hinear.hxt.servlet.school.info;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;

/**
 * 学校简介初始 Servlet
 * 
 * @tiem: 2017-6-19
 * @author szs
 */
@WebServlet("/schoolinfoInitServlet")
public class SchoolinfoInitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session != null && null != session.getAttribute("userInfo")) {
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			Map<String, String> map = new HashMap<String, String>();
			map.put("SID", "" + userInfo.getSID());
			String jsonData = HttpUtils.getInstance().get("05", map);
			response.getWriter().print(jsonData);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
