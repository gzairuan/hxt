package com.hinear.hxt.servlet.common;

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
 * Servlet implementation class ClassDataServlet
 */
@WebServlet("/schoolDataServlet")
public class SchoolDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			Map<String, String> params = new HashMap<String, String>();
			params.put("UserID", ""+userInfo.getUSERID());
			String resutl = HttpUtils.getInstance().get("13C", params );
			response.getWriter().write(resutl);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
