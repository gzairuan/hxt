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
 * 学校管理初始化数据  SchoolListInitServlet
 * @time: 2017年6月23日10:52:33
 * @author szs
 */
@WebServlet("/schoolListInitServlet")
public class SchoolListInitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String optFlag = request.getParameter("optFlag"); //操作标识
		String resultJson;
		Map<String, String> map = new HashMap<String, String> ();
		
		if(optFlag.equals("init")){ //数据初始化过程
			//获取每页条数
			int limit = TransformUtils.transformInt(request.getParameter("limit"));
			//获取当前页第一条数据的下标
			int offset = TransformUtils.transformInt(request.getParameter("offset"));
			if(limit == 0)
				limit = 10;
			//算出当前页码
			int pageIndex = offset / limit;
			//查询条件
			String searchSchool = request.getParameter("searchSchool");// 学校名称
			String searchDomain = request.getParameter("searchDomain");// 区域
			
			if(!EmptyUtils.stringIsEmpty(searchSchool)){ //学校名称
				map.put("SNAME", searchSchool);
			}
			if(!EmptyUtils.stringIsEmpty(searchDomain)){//区域ID                       
				map.put("REGION", searchDomain);
			}
			
			map.put("PageIndex", pageIndex + "");
			map.put("PageSize", limit + "");
			resultJson = HttpUtils.getInstance().get("B15", map);
			response.getWriter().print(resultJson);
		}
		else if(optFlag!=null && optFlag.equals("add")){ //执行新增操作
			String domainId = request.getParameter("domainId");
			String domain = request.getParameter("domainName"); //区域名称
			String school = request.getParameter("schoolName");  //学校名称
			String address = request.getParameter("schoolAddress"); //学校地址
			String linkName = request.getParameter("linkName"); //联系人
			String mobile = request.getParameter("mobile"); //手机
			String remark = request.getParameter("remark"); //备注
			
			SchoolInfo schoolInfo = new SchoolInfo();
			schoolInfo.setSID(0); //学校ID
			schoolInfo.setDOMAINID(Integer.valueOf(domainId)); //区域ID 
			schoolInfo.setSNAME(school);
			schoolInfo.setSADDRESS(address);
			schoolInfo.setLINKNAME(linkName);
			schoolInfo.setMOBILE(mobile);
			schoolInfo.setHANDLESTATE(0); //默认值为0
			schoolInfo.setREMARK(remark);
			String schoolJson = JSONUtil.toJSON(schoolInfo);
			map.put("SYS_SCHOOL", schoolJson); //
			
			resultJson = HttpUtils.getInstance().get("B17", map);
			response.getWriter().print(resultJson);
		}else if(optFlag.equals("edit")){
			String domainId = request.getParameter("domainId");
//			String domain = request.getParameter("domainName");
			String school = request.getParameter("schoolName");
			String address = request.getParameter("schoolAddress");
			String linkName = request.getParameter("linkName");
			String mobile = request.getParameter("mobile");
			String remark = request.getParameter("remark");
			System.out.println("remark="+remark);
			
			SchoolInfo schoolInfo = new SchoolInfo();
			schoolInfo.setSID(0);
			schoolInfo.setDOMAINID(Integer.valueOf(domainId));
			schoolInfo.setSNAME(school);
			schoolInfo.setSADDRESS(address);
			schoolInfo.setLINKNAME(linkName);
			schoolInfo.setMOBILE(mobile);
			schoolInfo.setHANDLESTATE(0);
			schoolInfo.setREMARK(remark);
			String schoolJson = JSONUtil.toJSON(schoolInfo);
			map.put("SYS_SCHOOL", schoolJson); //
			resultJson = HttpUtils.getInstance().get("B18", map);
			response.getWriter().print(resultJson);
		}else{//执行单条删除操作
			String sid = request.getParameter("sId");
			map.put("ID", sid);
			resultJson = HttpUtils.getInstance().get("B16", map);
			response.getWriter().write(resultJson);
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
