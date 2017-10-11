package com.hinear.hxt.servlet.userinfo;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;

/**
 * 
 * @author szs
 * @time 2017年6月26日 下午2:50:05
 * @version 1.0
 * 描述：个人资料
 */

@WebServlet("/myselfInitServlet")
public class MyselfInitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result = null;
		String optFlag = request.getParameter("optFlag"); //操作符标识
		System.out.println(optFlag);
		UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo"); //获取用户登录信息
		Map<String, String> map = new HashMap<String, String> ();
		switch(optFlag){
			case "init": //初始化
				map.put("UserID", userInfo.getUSERID()+"");
				result = HttpUtils.getInstance().get("40", map);
				break;
			case "saveEvent": //修改操作
				String user = request.getParameter("userInfo");
				System.out.println("user="+user);
				
				map.put("Users", user);
				result = HttpUtils.getInstance().get("40A", map);
				System.out.println("wu="+result);
				break;
			case "updataUrl": //更新图片url
				String userphoto = request.getParameter("userphoto");
				
				System.out.println("userphoto="+userphoto);
				
				map.put("Users", userphoto);
				result = HttpUtils.getInstance().get("40A", map);
				System.out.println("result_up"+result);
				break;
		}
		response.getWriter().print(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
