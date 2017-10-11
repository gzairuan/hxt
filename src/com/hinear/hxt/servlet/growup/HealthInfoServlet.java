package com.hinear.hxt.servlet.growup;

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
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * 
 * @author szs
 * @time 2017年7月31日 上午10:32:41
 * @version 1.0
 * 描述：成长管理servlet
 */
@WebServlet("/healthInfoServlet")
public class HealthInfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//操作标记
		String optFlag = request.getParameter("optFlag");
		System.out.println("optFlag=="+optFlag);
		String result = null; //结果集
		int pageSize = 10; //页面table显示数量
		int pageIndex = 0; //table数据重第一条记录开始
		Map<String, String> map = new HashMap<String, String>();
		
		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		int sid = 0;
		if(optFlag == null){
			return;
		}else{
			if("init".equals(optFlag)){ //新增操作
				
				int limit = TransformUtils.transformInt(request.getParameter("limit"));
				int offset = TransformUtils.transformInt(request.getParameter("offset"));
				if(limit == 0){
					limit = 10;
				}
				pageIndex = offset/pageSize;
				
				if(userInfo != null){
					sid = userInfo.getSID(); //获取登录用户学校ID
//					int classeId = userInfo.getCLASSESID();//用户班级ID
					//查询条件
					String startDate = request.getParameter("startDate"); //开始时间
					String endDate = request.getParameter("endDate"); //结束时间
					String cId = request.getParameter("cId"); //班级id
					System.out.println(startDate+"--###--" +endDate +" classesId=="+cId);
					String number = request.getParameter("number"); //学号
					String studentName = request.getParameter("studentName"); //学生姓名
					System.out.println(number + " --- " + studentName);
					
					map.put("PageIndex", pageIndex + "");
					map.put("PageSize", pageSize + "");
					map.put("SID", sid + "");
					/*if(!EmptyUtils.stringIsEmpty(classesId)){ //不为空
						map.put("CID", classesId);
					}*/
					
					if(!EmptyUtils.stringIsEmpty(startDate) ){
						map.put("STARTDAATE", startDate);
					}
					if(!EmptyUtils.stringIsEmpty(endDate)){
						map.put("ENDDATE", endDate);
					}
					if(!EmptyUtils.stringIsEmpty(cId) && cId.indexOf("0")==-1){
						map.put("CID", cId);
					}
					if(!EmptyUtils.stringIsEmpty(number)){
						map.put("NUMBER", number);
					}
					if(!EmptyUtils.stringIsEmpty(studentName)){
						map.put("STUDENTNAME", studentName);
					}
					
					result = HttpUtils.getInstance().get("35", map); //接口返回数据结果
					System.out.println("35结果："+result);
				}
			}
			else if("add".equals(optFlag)){//新增操作
				
			}else if("classesStu".equals(optFlag)){//初始化学生id
				String cid = request.getParameter("cid"); //班级ID
				map.put("PageSize", 100 + "");
				map.put("PageIndex", pageIndex + "");
				map.put("SID", sid+"");
				map.put("CID", cid);
				result = HttpUtils.getInstance().get("B29", map);
			}
		}
		
		response.getWriter().print(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
