package com.hinear.hxt.servlet.classes;

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
 * 查询班级列表数据
 */
@WebServlet("/queryClassServlet")
public class QueryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		if (userInfo != null) {
			Map<String, String> map = new HashMap<>();// 接口请求参数
			map.put("SID", ""+userInfo.getSID());
			map.put("UserID", "" + userInfo.getUSERID());
			System.out.println(userInfo.getSID()+"@@@@@"+userInfo.getUSERID());
			// 开始接口请求数据
			String jsonData = HttpUtils.getInstance().get("44", map);
			// 返回数据
			response.getWriter().print(jsonData);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
