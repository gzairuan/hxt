package com.hinear.hxt.servlet.growup.health;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;


@WebServlet("/healthServlet")
public class HealthServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String flag = request.getParameter("optFlag"); // 操作标记
		String result = "";
		UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
		if (userInfo == null) {
			return;
		}
		Map<String, String> params = new HashMap<>();
		switch (flag) {
		case "query": {
			// 获取每页条数
			int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
			if (pageSize == 0) {
				pageSize = 10;
			}
			// 获取当前页第一条数据的下标
			int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
			// 算出当前页码
			int pageIndex = offset / pageSize;
			String sdate = request.getParameter("startDate");
			String edate = request.getParameter("endDate");
			String cid = request.getParameter("classId");
			String stuNO = request.getParameter("stuNo");
			String stuName = request.getParameter("stuName");
			params.put("SID", "" + userInfo.getSID());
			params.put("PageIndex", "" + pageIndex);
			params.put("PageSize", "" + pageSize);
			if (!EmptyUtils.stringIsEmpty(sdate)) {
				params.put("STARTDATE", sdate);
			}
			if (!EmptyUtils.stringIsEmpty(edate)) {
				params.put("ENDDATE", edate);
			}
			if (!EmptyUtils.stringIsEmpty(cid)) {
				params.put("CID", cid);
			}
			if (!EmptyUtils.stringIsEmpty(stuNO)) {
				params.put("STUNO", stuNO);
			}
			if (!EmptyUtils.stringIsEmpty(stuName)) {
				params.put("STUNAME", stuName);
			}
			result = HttpUtils.getInstance().get("36", params);
		}
			break;
		default:
			break;
		}
		response.getWriter().print(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
