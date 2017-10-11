package com.hinear.hxt.servlet.sys;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.SchoolInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 学校审核
 * Servlet implementation class SchoolApplInitServlet
 */
@WebServlet("/schoolApplInitServlet")
public class SchoolApplInitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String optFlag = request.getParameter("optFlag");
		String result = null;
		int pageSize = 10;
		Map<String, String> map = new HashMap<String, String> ();
		
		if(optFlag == null){
			System.out.println("操作失败");
			return;
		}else{
			if(optFlag.equals("init")){//页面初始化数据
				System.out.println("进入init方法");
				//获取每页条数
				int limit = TransformUtils.transformInt(request.getParameter("limit"));
				//获取当前页第一条数据的下标
				int offset = TransformUtils.transformInt(request.getParameter("offset"));
				if(limit == 0)
					limit = 10;
				//算出当前页码
				int pageIndex = offset / limit;
				String q_school = request.getParameter("q_school"); //学校名称
				String q_address = request.getParameter("q_address"); //学校地址
				String q_checkstate = request.getParameter("q_checkstate"); //是否审核

				if(!EmptyUtils.stringIsEmpty(q_school)){
					map.put("SNAME", q_school);
				}
				if(!EmptyUtils.stringIsEmpty(q_address)){
					map.put("ADDRESS", q_address);
				}
				if(!EmptyUtils.stringIsEmpty(q_checkstate)){
					map.put("HANDLESTATE", q_checkstate);
				}
				
				map.put("PageIndex", pageIndex+"");
				map.put("PageSize", pageSize+"");
				result = HttpUtils.getInstance().get("B12", map);
				System.out.println("后台json数据：" + result);
				response.getWriter().print(result);
			}else if(optFlag.equals("check")){ //学校审核操作
				System.out.println("进入审核操作"+ optFlag);
				String sId = request.getParameter("SID");
				System.out.println("sId="+sId);
				map.put("SID", sId); //
				result = HttpUtils.getInstance().get("B13", map);
				response.getWriter().print(result);
			}else{ //执行删除操作
				System.out.println("进入delete方法="+optFlag);
				String sid = request.getParameter("sId");
				map.put("ID", sid);
				result = HttpUtils.getInstance().get("B14", map);
				response.getWriter().write(result);
			}
		}
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
