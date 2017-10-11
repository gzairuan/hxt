package com.hinear.hxt.servlet.sys.role;

import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.usertype.UserType;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * @author szs
 * @time 2017年9月21日 上午10:35:47
 * @version 1.0
 * 描述：用户类型--角色管理 UserTypeServlet
 */
@WebServlet("/userTypeServlet")
public class UserTypeServlet extends HttpServlet implements Serializable {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String optFlag = request.getParameter("optFlag");
		System.out.println("optFlag="+optFlag);
		String result = null;
		Map<String, String> map = new HashMap<String, String>();
		
		String  typeId, typeName, remark, json, menuid; 
		UserType ut;
		switch(optFlag) {
			case "initUT": //初始化用户类型
				int limit = TransformUtils.transformInt(request.getParameter("limit"));
				int offset = TransformUtils.transformInt(request.getParameter("offset"));
				if (limit == 0) limit = 10;
				int pageIndex = offset / limit;
				map.put("PageIndex", pageIndex + "");
				map.put("PageSize", limit + "");
				result = HttpUtils.getInstance().get("C4", map);
			break;
			case "add":
				typeName = request.getParameter("rolenameId");
				remark = request.getParameter("remarkId");
				ut = new UserType();
				ut.setUSERTYPEID(0);
				ut.setUSERTYPENAME(typeName);
				ut.setREMARK(remark);
				json = JSONUtil.toJSON(ut);
				map.put("USERTYPE", json);
				result = HttpUtils.getInstance().post("C4A", map);
				break;
				
			case "edit":
				typeId = request.getParameter("usertypeId");
				typeName = request.getParameter("rolenameId");
				remark = request.getParameter("remarkId");
				ut = new UserType();
				ut.setUSERTYPEID(Integer.valueOf(typeId));
				ut.setUSERTYPENAME(typeName);
				ut.setREMARK(remark);
				json = JSONUtil.toJSON(ut);
				map.put("USERTYPE", json);
				result = HttpUtils.getInstance().post("C4B", map);
				break;
			case "delete":
				typeId = request.getParameter("usertypeId");
				map.put("IDS", typeId);
				result = HttpUtils.getInstance().post("C4C", map);
				break;
				
			case "rolemenu":
				typeId = request.getParameter("usertypeid");
				menuid = request.getParameter("menuid");
				map.put("USERTYPEID", typeId);
				map.put("MENUID", menuid);
				System.out.println(typeId + "---" + menuid);
				result = HttpUtils.getInstance().get("C1", map);
				break;
			case "saveRoleMenu": //保存角色菜单权限
				typeId = request.getParameter("usertypeid");
				menuid = request.getParameter("menuid");
				String operatetypes = request.getParameter("operatetypes");
//				System.out.println(typeId+" -- "+menuid+" -- "+ operatetypes);
				map.put("USERTYPEID", typeId);
				map.put("MENUID", menuid);
				map.put("OPERATETYPES", operatetypes);
				result = HttpUtils.getInstance().post("C1A", map);
				System.out.println("保存结果：" + result);
				break;
		}
		response.getWriter().print(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
