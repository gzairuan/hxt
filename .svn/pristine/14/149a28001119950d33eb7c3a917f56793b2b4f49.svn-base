package com.hinear.hxt.upload;

import java.io.IOException;
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
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 查询通知数据
 */
@WebServlet("/HealthknowledgeServlet")
public class HealthknowledgeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		Object userBean = session.getAttribute("userBean");
		if (userBean != null) {
			UserInfo userInfo = JSONUtil.parseJSON(userBean.toString(), UserInfo.class);
			// 获取每页条数
			int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
			if (pageSize == 0) {
				pageSize = 10;
			}

			// 获取当前页第一条数据的下标
			int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
			// 算出当前页码
			int pageIndex = offset / pageSize;
			String serverType;// 接口入口标识
			Map<String, String> map = new HashMap<>();// 接口请求参数载体（将get请求的接口的参数添加到这个集合里面）
			String startDate = request.getParameter("startDate");// 开始日期
			String endDate = request.getParameter("endDate");// 结束日期
			String keyword = request.getParameter("keyword");// 关键字
			System.out.println("1==" + startDate + ";2==" + endDate + ";3==" + keyword);

			// 开始添加get接口请求的参数---格式--> 参数键名--参数值（int类型必须加""强转成字符串型）
			map.put("PageSize", pageSize + "");
			map.put("PageIndex", pageIndex + "");
			if (!EmptyUtils.stringIsEmpty(startDate)) {
				map.put("SDATE", startDate);
			}
			if (!EmptyUtils.stringIsEmpty(endDate)) {
				map.put("TDATE", endDate);
			}
			if (!EmptyUtils.stringIsEmpty(keyword)) {
				map.put("KEYWORD", keyword);
			}

			// 通过http工具类请求接口数据（返回json字符串数据）
			String jsonData = HttpUtils.getInstance().get("37", map);
			// 返回给界面
			response.getWriter().print(jsonData);

		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
