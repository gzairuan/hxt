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

import com.hinear.hxt.entity.Group;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class Group
 */
@WebServlet("/groupServlet")
public class GroupServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			UserInfo user = (UserInfo) session.getAttribute("userInfo");

			PrintWriter pWriter = response.getWriter();

			String optFlag = request.getParameter("optFlag");
			switch (optFlag) {
			case "query": { // 分组列表的查询
				// 获取每页条数
				int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
				if (pageSize == 0) {
					pageSize = 10;
				}
				// 获取当前页第一条数据的下标
				int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
				// 算出当前页码
				int pageIndex = offset / pageSize;
				Map<String, String> params = new HashMap<>();
				params.put("PageSize", pageSize + "");
				params.put("PageIndex", pageIndex + "");
				params.put("SID", user.getSID() + "");
				String result = HttpUtils.getInstance().get("B54", params);
				pWriter.write(result);
			}
				break;
			case "add": {
				String gName = request.getParameter("groupName");

				Group group = new Group();
				group.setSID(user.getSID());
				group.setCREATE_USER(user.getUSERID());
				group.setGROUP_NAME(gName);
				String jsonData = JSONUtil.toJSON(group);

				Map<String, String> params = new HashMap<>();
				params.put("GROUP", jsonData);
				String result = HttpUtils.getInstance().get("B55", params);

				pWriter.write(result);
			}
				break;
			case "edit": {
				String group = request.getParameter("groupJson");

				Map<String, String> params = new HashMap<>();
				params.put("GROUP", group);
				String result = HttpUtils.getInstance().get("B55", params);

				pWriter.write(result);
			}
				break;
			case "delete": {
				String ids = request.getParameter("ids");

				Map<String, String> params = new HashMap<>();
				params.put("IDS", ids);
				String result = HttpUtils.getInstance().get("B56", params);

				pWriter.write(result);
			}
				break;
			case "notUser": {// 没有添加分组的用户列表
				String groupId = request.getParameter("groupId");
				if (EmptyUtils.stringIsEmpty(groupId)) {
					pWriter.write(HttpUtils.RESULT_NO_DATA_JSON);
					return;
				}
				// 获取每页条数
				int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
				if (pageSize == 0) {
					pageSize = 10;
				}
				// 获取当前页第一条数据的下标
				int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
				// 算出当前页码
				int pageIndex = offset / pageSize;
				Map<String, String> params = new HashMap<>();
				params.put("PageSize", pageSize + "");
				params.put("PageIndex", pageIndex + "");
				params.put("SID", user.getSID() + "");
				params.put("GROUPID", groupId);
				String result = HttpUtils.getInstance().get("B58", params);
				pWriter.write(result);
			}
				break;
			case "yetUser": { // 已经添加分组的用户列表
				String groupId = request.getParameter("groupId");
				if (EmptyUtils.stringIsEmpty(groupId)) {
					pWriter.write(HttpUtils.RESULT_NO_DATA_JSON);
					return;
				}
				// 获取每页条数
				int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
				if (pageSize == 0) {
					pageSize = 10;
				}
				// 获取当前页第一条数据的下标
				int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
				// 算出当前页码
				int pageIndex = offset / pageSize;
				Map<String, String> params = new HashMap<>();
				params.put("PageSize", pageSize + "");
				params.put("PageIndex", pageIndex + "");
				params.put("SID", user.getSID() + "");
				params.put("GROUPID", groupId);
				String result = HttpUtils.getInstance().get("B57", params);
				pWriter.write(result);
			}
				break;
			case "shiftIn": {// 移入
				String groupId = request.getParameter("groupId");
				String ids = request.getParameter("userIds");
				Map<String, String> params = new HashMap<>();
				params.put("UserIds", ids);
				params.put("GROUPID", groupId);
				String result = HttpUtils.getInstance().get("B59", params);
				pWriter.write(result);
			}
				break;
			case "shiftOut": {// 移出
				String groupId = request.getParameter("groupId");
				String ids = request.getParameter("userIds");
				Map<String, String> params = new HashMap<>();
				params.put("UserIds", ids);
				params.put("GROUPID", groupId);
				String result = HttpUtils.getInstance().get("B60", params);
				pWriter.write(result);
			}
				break;
			default:
				System.out.println("没有该标识：" + optFlag);
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
