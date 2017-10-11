package com.hinear.hxt.servlet.classes.manage;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.ClassesInfo;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 
 * @author szs
 * @time 2017年8月15日 上午10:13:01
 * @version 1.0
 * 描述：班级管理， 班级指定教师和上课科目
 */
@WebServlet("/classManageServlet")
public class ClassManageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("班级管理servlet");
		
		Map<String, String> map = new HashMap<String, String>();
		String result = null; //接口返回json结果
		HttpSession session = request.getSession();
		UserInfo userInfo = null;
		
		String optFlag = request.getParameter("optFlag");
		System.out.println("optFlag="+optFlag);
		
		int limit = TransformUtils.transformInt(request.getParameter("limit"));
		int offset =  TransformUtils.transformInt(request.getParameter("offset"));
		if(limit == 0)
			limit = 10;
		int pageIndex = offset/limit;
		
		if(session != null){//session 不为空
			userInfo = (UserInfo) session.getAttribute("userInfo"); //获取UserInfo 对象
			int sid = userInfo.getSID(); //学校ID
			String classcode = null;
			String classname = null;
			ClassesInfo clasInfo = null;
			if("initclas".equals(optFlag)){//初始化班级
				map.put("PageIndex", pageIndex + "");
				map.put("PageSize", limit + "");
				map.put("SID", sid +"");
				map.put("USERTYPEID", 1+"");
				result = HttpUtils.getInstance().post("B74", map);
			}else if("addClas".equals(optFlag)){// 班级新增
				classcode = request.getParameter("classcode");
				classname = request.getParameter("classname");
				if(classcode != null && classname != null){ //请求值为空
					clasInfo = new ClassesInfo();
					clasInfo.setSID(sid);
					clasInfo.setCLASSESCODE(classcode);
					clasInfo.setCLASSESNAME(classname);
					String clasjson = JSONUtil.toJSON(clasInfo);
					map.put("CLASSES", clasjson);
					result = HttpUtils.getInstance().post("B75", map);
				}
			}else if("editClas".equals(optFlag)){// 班级新增
				String classId = request.getParameter("classId");
				classcode = request.getParameter("classcode");
				classname = request.getParameter("classname");
				
				System.out.println(classcode+ "---"+classname);
				if(classcode != null && classname != null){ //请求值为空
					clasInfo = new ClassesInfo();
					clasInfo.setCLASSESID(Integer.valueOf(classId));
					clasInfo.setCLASSESCODE(classcode);
					clasInfo.setCLASSESNAME(classname);
					
					String clasjson = JSONUtil.toJSON(clasInfo);
					map.put("CLASSES", clasjson);
					result = HttpUtils.getInstance().post("B76", map);
				}
			}else if("delete".equals(optFlag)){//班级删除
				String clasId = request.getParameter("clasId");
				System.out.println("clasId="+clasId);
				map.put("IDS", clasId);
				result = HttpUtils.getInstance().post("B77", map);
			}else if("initteacher".equals(optFlag)){ //初始化教师 信息
				
				String sidofclas = request.getParameter("sid");
				String cid = request.getParameter("cid");
				map.put("PageIndex", pageIndex+"");
				map.put("PageSize", limit+"");
				map.put("SID", sidofclas);
				map.put("CID", cid);
				map.put("USERTYPEID", "1");
				result = HttpUtils.getInstance().get("B70", map);
			}else if("initTeachInfo".equals(optFlag)){
				String sidofclas = request.getParameter("sid");
				String cid = request.getParameter("cid");
				map.put("PageIndex", pageIndex+"");
				map.put("PageSize", limit+"");
				map.put("SID", sidofclas);
				map.put("CID", cid);
				map.put("USERTYPEID", "1");
				result = HttpUtils.getInstance().get("B71", map);
			}else if("addteach".equals(optFlag)){ //班级添加教师
				String cid = request.getParameter("cid");
				String userid = request.getParameter("userid");
				map.put("CID", cid);
				map.put("UserIds", userid);
				map.put("USERTYPEID", "1");
				result = HttpUtils.getInstance().get("B72", map);
				System.out.println("教师result="+result);
			}else if("deleteTeach".equals(optFlag)){
				String cid = request.getParameter("cid");
				String userid = request.getParameter("userid");
				map.put("CID", cid);
				map.put("UserIds", userid);
				map.put("USERTYPEID", "1");
				result = HttpUtils.getInstance().get("B73", map);
				System.out.println("教师result="+result);
			}
			
			
		}//end if session
		
		response.getWriter().print(result);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
