package com.hinear.hxt.servlet.notice;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.NoticeInfo;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * 查询通知数据
 */
@WebServlet("/queryNoticeServlet")
public class QueryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//获取session中保存的参数（session在登录的时候保存）需要这些参数的时候获取
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			UserInfo user = (UserInfo) session.getAttribute("userInfo");
			int pageSize = 10;
			int pageIndex = 0;
			//获取页面传过来的参数 
			String limit = request.getParameter("limit");//每页显示的条数
			if (!EmptyUtils.stringIsEmpty(limit)) {
				pageSize = Integer.parseInt(limit);
			}
			String offset = request.getParameter("offset");// 当前页第一条数据的下标（从0开始）
			if (!EmptyUtils.stringIsEmpty(offset)) {
				pageIndex = Integer.parseInt(offset) / pageSize;
			}
			int typeId = TransformUtils.transformInt(request.getParameter("typeId"));// 通知类型

			if (typeId==0) {
				// 传值错误
				response.getWriter().write("error");
			} else {
				String serverType;// 接口入口标识
				Map<String, String> map = new HashMap<>();// 接口请求参数载体（将get请求的接口的参数添加到这个集合里面）
				String startDate = request.getParameter("startDate");// 开始日期
				String endDate = request.getParameter("endDate");// 结束日期
				String keyword = request.getParameter("keyword");// 关键字
				System.out.println("1=="+startDate+";2=="+endDate+";3=="+keyword);
				if (NoticeInfo.TYPE_TEACHER==typeId) {
					// 教师通知
					String sendFlag = request.getParameter("sendFlag");// 发送者还是接收者
					System.out.println("sendFlag="+sendFlag);
					// 07 接收到通知数据 <---> 07A 自己发送出去的通知数据（默认为获取接收到的数据）
					serverType = EmptyUtils.stringIsEmpty(sendFlag) || "0".equals(sendFlag) ? "07" : "07A";
					map.put("TeacherID", "" + user.getUSERID());
				} else {
					// 学校或者班级通知
					serverType = "06";
					map.put("UserID", "" + user.getUSERID());
					if (NoticeInfo.TYPE_CLASS==typeId) {
						// 获取班级id
						// String cid;
						// map.put("CID", "" + cid);
					}
				}
				System.out.println("typeId=" + typeId + "sId=" + user.getSID() + "limit=" + limit + "offset=" + offset);
				//开始添加get接口请求的参数---格式--> 参数键名--参数值（int类型必须加""强转成字符串型）
				map.put("PageSize", pageSize + "");
				map.put("PageIndex", pageIndex + "");
				map.put("SID", "" + user.getSID());
				map.put("TYPEID", ""+typeId);
				//通过http工具类请求接口数据（返回json字符串数据）
				String jsonData = HttpUtils.getInstance().get(serverType, map);
				//返回给界面
				response.getWriter().print(jsonData);
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
