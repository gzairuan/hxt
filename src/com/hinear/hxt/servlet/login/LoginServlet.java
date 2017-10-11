package com.hinear.hxt.servlet.login;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.reflect.TypeToken;
import com.hinear.hxt.entity.MenuNode;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;

/**
 * Servlet implementation class Login
 */
@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//获取session对象
		HttpSession session = request.getSession();
		String codes = request.getParameter("codes");
		Object certCode = session.getAttribute("certCode");
		PrintWriter pw = response.getWriter();
		if(certCode==null || !certCode.toString().equals(codes)){
			pw.write("{\"result\":10001,\"message\":\"验证码错误！\"}");
			return;
		}
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String sid = request.getParameter("sid");

		Map<String, String> params = new HashMap<>();
		params.put("LoginID", username);
		params.put("UserPwd", password);
		params.put("SID", sid == null || "".equals(sid) ? "0" : sid);
		String result = HttpUtils.getInstance().post("01AT", params); // 设置响应编码
		if (result == null || "".equals(result) || "-1".equals(result) || result.indexOf("-100") == 0) {
			pw.write("{\"result\":\"账号或密码错误！\"}");
		} else {
			try {
				List<UserInfo> userInfoList = JSONUtil.parseJSONList(result, new TypeToken<List<UserInfo>>(){}.getType());
				if(userInfoList==null||userInfoList.isEmpty()){
					pw.write("{\"result\":10002,\"message\":\"账号或密码错误！\"}");
					return;
				}
				if(userInfoList.size()>1){
					//用户在多首学校拥有账户
					List<UserInfo> schoolList = new ArrayList<>();
					for (UserInfo userInfo : userInfoList) {
						UserInfo info = new UserInfo();
						info.setSID(userInfo.getSID());
						info.setSNAME(userInfo.getSNAME());
						schoolList.add(info);
					}
					String jsonData = JSONUtil.toJSON(schoolList);
					pw.write(jsonData);
				}else{
					UserInfo userInfo = userInfoList.get(0);
					List<MenuNode> menus = userInfo.getMenus();
					//用户权限菜单排序
					String menuJson = JSONUtil.toJSON(menus);
					//登录账户获取信息成功 保存session
					//把用户数据保存到session对象中
					userInfo.setMenus(null);
					userInfo.setTOKEN(null);
					session.setAttribute("userInfo", userInfo);
					//用户权限菜单
					session.setAttribute("menu",menuJson);
					
					//登录成功
					pw.write("{\"result\":\"ok\"}");
					//跳转到用户主页（使用重定向）
					//response.sendRedirect(request.getContextPath()+"/indexServlet");
				}
			} catch (Exception e) {
				pw.write("{\"result\":10002,\"message\":\"账号或密码错误！\"}");;
			}
		}
	}
	
	/*
	private String getMenuJson(List<MenuInfo> menuInfos) {
		if(menuInfos==null||menuInfos.isEmpty())
			return "";
		List<MenuInfo> nodeList = queryListById(menuInfos, 0);
		addNodes(menuInfos, nodeList);
		return JSONUtil.toJSON(nodeList);
	}


	private void addNodes(List<MenuInfo> menuInfos, List<MenuInfo> nodeList) {
		if(nodeList==null||nodeList.isEmpty())
			return;
		for (MenuInfo info : nodeList) {
			List<MenuInfo> nextNodeList = queryListById(menuInfos, info.getMenuId());
			if(!nextNodeList.isEmpty()){
				info.setMenuNodes(nextNodeList);
				addNodes(menuInfos, nextNodeList);
			}
		}
		
	}


	private List<MenuInfo> queryListById(List<MenuInfo> menuInfos, int parentId) {
		List<MenuInfo> list = new ArrayList<>();
		for (MenuInfo info : menuInfos) {
			if(info.getParentId()==parentId){
				list.add(info);
			}
		}
		if(!list.isEmpty()){
			Collections.sort(list);
		}
		return list;
	}*/

}
