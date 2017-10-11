package com.hinear.hxt.servlet.school;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.NoticeInfo;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;

/**
 * Servlet implementation class SchoolNoticeAddServlet
 */
@WebServlet("/schoolNoticeAddServlet")
public class SchoolNoticeAddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("doGet(进入该方法)");
		request.setCharacterEncoding("utf-8");

		// 获取request 请求的params
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String typeId = request.getParameter("TYPEID"); // 获取通知类型参数
		String sId = request.getParameter("SID");

		HttpSession session = request.getSession();
		UserInfo user = (UserInfo) session.getAttribute("userInfo");
		NoticeInfo noticeInfo = new NoticeInfo();
		// noticeInfo.setUSERID(user.getUSERID());
		noticeInfo.setUSERID(1);
		noticeInfo.setNEWSTITLE(title);
		noticeInfo.setCONTENT(content);
		// noticeInfo.setRECEIVESCHOOL(user.getSID());
		noticeInfo.setRECEIVESCHOOL(0);
		noticeInfo.setTYPEID(3);// 通知类型（1为学校通知，3为班级通知)

		String noticeJosn = JSONUtil.toJSON(noticeInfo);
		Map<String, String> params = new HashMap<String, String>();
		params.put("Notices", noticeJosn);
		System.out.println(noticeJosn);
		String result = HttpUtils.getInstance().get("06A", params);
		System.out.println(result);
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter pw = response.getWriter();
		pw.write(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
