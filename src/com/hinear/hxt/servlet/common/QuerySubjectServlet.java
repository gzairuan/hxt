package com.hinear.hxt.servlet.common;

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
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;

/**
 * 
 * @author szs
 * @time 2017年8月2日 下午5:19:49
 * @version 1.0
 * 描述：获取学校科目信息 servlet
 */
@WebServlet("/querySubjectServlet")
public class QuerySubjectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int pageSize = 100;
		int pageIndex = 0;
		String result = null;
		HttpSession session = request.getSession();
		if(session != null && session.getAttribute("userInfo") != null){
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			if(userInfo == null){
				PrintWriter out = response.getWriter();
		        out.print("<a href=\"/hxt/login.jsp\">返回登录界面</a>");
				return ;
			}else{
				Map<String, String> map = new HashMap<String, String>();
				String sid = String.valueOf(userInfo.getSID());
				map.put("PageIndex", 0+"");
				map.put("PageSize", pageSize+"");
				map.put("SID", sid);
				result = HttpUtils.getInstance().get("B61", map);
			}
		}
		response.getWriter().print(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
