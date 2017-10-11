package com.hinear.hxt.servlet.growup;

import java.io.IOException;
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

import com.hinear.hxt.entity.ScoreInfo;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 
 * @author szs
 * @time 2017年8月2日 下午1:45:06
 * @version 1.0
 * 描述：学生成绩查询 servlet
 */
@WebServlet("/studentScoreServlet")
public class StudentScoreServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String optFlag = request.getParameter("optFlag");
		
		int limit = TransformUtils.transformInt(request.getParameter("limit"));
		int offset = TransformUtils.transformInt(request.getParameter("offset"));
		int pageSize = 10;
		int pageIndex = 0;
		String result = null; // 请求接口返回结果
		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		String cid = null; //用户登录班级ID
		String sid = null; //学校ID
		Map<String, String> map = new HashMap<String, String>();
		
		if(limit == 0){
			limit = 10;
		}
		pageIndex = offset / pageSize;
		if(userInfo == null){
			System.out.println("session过期了");
			request.getRequestDispatcher("/login.jsp").forward(request, response);  //跳转到登录页面
		}else{
			if("init".equals(optFlag)){//初始化
				cid = String.valueOf(userInfo.getCLASSESID()); //用户登录班级ID
				sid = String.valueOf(userInfo.getSID()); //学校ID
				String tname = request.getParameter("tname");
				String cname = request.getParameter("cname");
				String subname = request.getParameter("subname");
				String stuname = request.getParameter("stuname");
				
				map.put("PageSize", pageSize+"");
				map.put("PageIndex", pageIndex+"");
				map.put("SID", sid);
				if(!EmptyUtils.stringIsEmpty(cid)){
					map.put("CID", cid);
				}
				if(!EmptyUtils.stringIsEmpty(tname) && tname != "0"){
					System.out.println("tname="+tname);
					map.put("TID", tname);
				}
				if(!EmptyUtils.stringIsEmpty(cname) && cname != "0"){
					map.put("CID", cname);
				}
				if(!EmptyUtils.stringIsEmpty(subname) && subname != "0"){
					System.out.println("subname="+subname);
					map.put("SUBJECTNAME", subname);
				}
				if(!EmptyUtils.stringIsEmpty(stuname)){
					map.put("STUNAME", stuname);
				}
				
				result = HttpUtils.getInstance().get("31", map);
				System.out.println("31接口:"+result);
			}else if("add".equals(optFlag)){//新增学生成绩（发送成绩）
				String tname = request.getParameter("m_tname"); //学期
				String subname = request.getParameter("m_subname"); //科目
				String tbegin = request.getParameter("m_tbegin"); // 开始时间
				String tend = request.getParameter("m_tend"); //结束时间
				String cname = request.getParameter("m_cname"); //班级ID
				String stuid = request.getParameter("m_studentId"); //学生ID
				String score = request.getParameter("m_score");// 分数
				String rank = request.getParameter("m_rank");// 排名
				
				ScoreInfo scoreInfo = new ScoreInfo();
				scoreInfo.setTID(Integer.valueOf(tname));
				scoreInfo.setSTUDENTID(Integer.valueOf(stuid));
				scoreInfo.setSUBJECTNAME(subname);
				scoreInfo.setSCORE(Integer.valueOf(score));
				scoreInfo.setRANK(Integer.valueOf(rank));
				
				List<ScoreInfo> lit = new ArrayList<ScoreInfo>();
				lit.add(scoreInfo);
				String jsonScore = JSONUtil.toJSON(lit);
				map.put("SCORES", jsonScore);
				result = HttpUtils.getInstance().get("31A", map);
			}else if("delete".equals(optFlag)){ //删除操作
				String scoreId = request.getParameter("scoreId");
				map.put("ID", scoreId);
				result = HttpUtils.getInstance().get("31B", map);
			}
		}
		response.getWriter().print(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
