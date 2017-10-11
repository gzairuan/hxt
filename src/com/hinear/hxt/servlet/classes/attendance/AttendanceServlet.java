package com.hinear.hxt.servlet.classes.attendance;

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
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class AttendanceServlet
 */
@WebServlet("/attendanceServlet")
public class AttendanceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			UserInfo user = (UserInfo) session.getAttribute("userInfo");
			// 获取每页条数
			int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
			if (pageSize == 0) {
				pageSize = 10;
			}
			// 获取当前页第一条数据的下标
			int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
			// 算出当前页码
			int pageIndex = offset / pageSize;

			String sdate = request.getParameter("sdate");
			String edate = request.getParameter("edate");
			String cid = request.getParameter("cid");
			String stuID = request.getParameter("stuID");
			
			Map<String, String> params = new HashMap<>();
			params.put("SID", "" + user.getSID());
			params.put("UserID", "" + user.getUSERID());
			params.put("PageIndex", "" + pageIndex);
			params.put("PageSize", "" + pageSize);
			params.put("SDATE", sdate);
			params.put("EDATE", edate);
			params.put("CID", EmptyUtils.stringIsEmpty(cid) ? "0" : cid);
			params.put("STUID", EmptyUtils.stringIsEmpty(stuID) ? "0" : stuID);
			String result = HttpUtils.getInstance().get("B69", params);
			response.getWriter().write(result);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
