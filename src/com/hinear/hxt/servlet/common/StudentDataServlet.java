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
 * Servlet implementation class StudentDataServlet
 */
@WebServlet("/studentDataServlet")
public class StudentDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			String cid = request.getParameter("cid");
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			Map<String, String> params = new HashMap<String, String>();
			params.put("SID", "" + userInfo.getSID());
			params.put("UserID", "" + userInfo.getUSERID());
			params.put("CID", cid == null || cid == "" ? "0" : cid);
			String result = HttpUtils.getInstance().get("11C", params);
			response.getWriter().write(result);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
