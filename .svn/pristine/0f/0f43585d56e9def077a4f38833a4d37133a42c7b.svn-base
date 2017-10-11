package com.hinear.hxt.servlet.sys;

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

import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class SuggestServlet
 */
@WebServlet("/suggestServlet")
public class SuggestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session!=null&&session.getAttribute("userInfo")!=null){
			UserInfo user = (UserInfo) session.getAttribute("userInfo");
			PrintWriter pWriter = response.getWriter();
			// 查询和删除
			String flag = request.getParameter("optFlag");
			switch (flag) {
			case "query": {// 查询
				// 获取每页条数
				int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
				if (pageSize == 0) {
					pageSize = 10;
				}
				// 获取当前页第一条数据的下标
				int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
				// 算出当前页码
				int pageIndex = offset / pageSize;
				String startDate = request.getParameter("startDate");// 开始日期
				String endDate = request.getParameter("endDate");// 结束日期
				String keyword = request.getParameter("keyword");// 关键字

				Map<String, String> params = new HashMap<>();// 接口请求参数
				params.put("PageSize", pageSize + "");
				params.put("PageIndex", pageIndex + "");
				params.put("SID", user.getSID() + "");
				if (!EmptyUtils.stringIsEmpty(startDate)) {
					params.put("sDate", startDate);
				}
				if (!EmptyUtils.stringIsEmpty(endDate)) {
					params.put("eDate", endDate);
				}
				if (!EmptyUtils.stringIsEmpty(keyword)) {
					params.put("keyword", keyword);
				}
				String result = HttpUtils.getInstance().get("B49", params);
				pWriter.print(result);
			}
				break;
			case "delete": {// 删除
				String id = request.getParameter("id");
				Map<String, String> params = new HashMap<>();
				params.put("ID", id);
				String result = HttpUtils.getInstance().get("B50", params);
				pWriter.write(result);
			}
				break;
			default:
				System.out.println("无改标识" + flag);
				break;
			}
		}
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
