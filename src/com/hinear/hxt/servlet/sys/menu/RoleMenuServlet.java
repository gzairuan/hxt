package com.hinear.hxt.servlet.sys.menu;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.hinear.hxt.entity.MenuInfo;
import com.hinear.hxt.entity.MenuNode;
import com.hinear.hxt.entity.area.RootTreeNode;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 
 * @author szs
 * @time 2017年9月15日 上午11:35:00
 * @version 1.0
 * 描述：菜单管理
 */
@WebServlet("/roleMenuServlet")
public class RoleMenuServlet extends HttpServlet implements Serializable {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result = null;
		String optFlag = request.getParameter("optFlag");
		Map<String, String> map = new HashMap<String, String>();
		
		String m_code, m_name, m_url, m_remark, parentId, json;
		MenuInfo menuInfo;
		switch (optFlag) {
			case "init": //初始化菜单按钮
				String menuData = HttpUtils.getInstance().get("B01", null);
				List<MenuInfo> menuList = JSONUtil.parseJSONList(menuData, new TypeToken<List<MenuInfo>>(){}.getType());
				List<MenuInfo> menuNode = formatMenuInfo(menuList, 0);
				Gson gson = new Gson();
				result = gson.toJson(menuNode);
				break;
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
				m_code = request.getParameter("modulecodeId");
				m_name = request.getParameter("menunameId");
				m_url = request.getParameter("munuurlId");
				m_remark = request.getParameter("remarkId");
				parentId = request.getParameter("parentId");
				
				menuInfo = new MenuInfo();
				menuInfo.setMenuName(m_name);
				menuInfo.setModuleCode(m_code);
				menuInfo.setMenuUrl(m_url);
				menuInfo.setRemark(m_remark);
				menuInfo.setMenuIndex(1);
				menuInfo.setParentId(Integer.valueOf(parentId));
				
				json = JSONUtil.toJSON(menuInfo);
				map.put("SYS_MENU", json);
				result = HttpUtils.getInstance().get("B03", map);
				break;
			case "addChild": //新增子菜单
				m_code = request.getParameter("modulecodeId");
				m_name = request.getParameter("menunameId");
				m_url = request.getParameter("munuurlId");
				m_remark = request.getParameter("remarkId");
				parentId = request.getParameter("parentId");
				
				menuInfo = new MenuInfo();
				menuInfo.setMenuName(m_name);
				menuInfo.setModuleCode(m_code);
				menuInfo.setMenuUrl(m_url);
				menuInfo.setRemark(m_remark);
				menuInfo.setMenuIndex(1);
				menuInfo.setParentId(Integer.valueOf(parentId));
				
				json = JSONUtil.toJSON(menuInfo);
				map.put("SYS_MENU", json);
				result = HttpUtils.getInstance().get("B03", map);
				System.out.println("子菜单："+ result);
				break;
			case "edit": //修改
				m_code = request.getParameter("modulecodeId");
				m_name = request.getParameter("menunameId");
				m_url = request.getParameter("munuurlId");
				m_remark = request.getParameter("remarkId");
				String m_id = request.getParameter("menuId");
				parentId = request.getParameter("parentId");
				
				menuInfo = new MenuInfo();
				menuInfo.setMenuId(Integer.valueOf(m_id));
				menuInfo.setMenuName(m_name);
				menuInfo.setModuleCode(m_code);
				menuInfo.setMenuUrl(m_url);
				menuInfo.setRemark(m_remark);
				menuInfo.setMenuIndex(Integer.valueOf(m_id));
				menuInfo.setParentId(Integer.valueOf(parentId));
				
				json = JSONUtil.toJSON(menuInfo);
				map.put("SYS_MENU", json);
				result = HttpUtils.getInstance().get("B04", map);
				break;
			case "delete":
				String menuId = request.getParameter("menuId");
				map.put("ID", menuId);
				result = HttpUtils.getInstance().get("B02", map);
				break;
		}
		
		response.getWriter().print(result);;
	}

	private List<MenuInfo> formatMenuInfo(List<MenuInfo> menuList, int parentId) {
		List<MenuInfo> menuNode = new ArrayList<MenuInfo>();
		if(menuList != null && menuList.size() > 0){
			for (MenuInfo menuInfo : menuList) {
				if(menuInfo.getParentId() == parentId){
					menuInfo.setText(menuInfo.getMenuName());
					menuNode.add(menuInfo);
				}
			}
			if (!menuNode.isEmpty()) {
				for (MenuInfo menuInfo : menuNode) {
					List<MenuInfo> list = formatMenuInfo(menuList, menuInfo.getMenuId());
					if(!list.isEmpty()) {
						menuInfo.setMenuNodes(list);
					}
				}
			}
		}
		return menuNode;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
