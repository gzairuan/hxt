package com.hinear.hxt.servlet.growup.bodylist;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.BodyCheck;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class CookbookServlet
 */
@WebServlet("/bodylistServlet")
public class BodyListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// 得到session
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			String flag = request.getParameter("optFlag");
			Map<String, String> params = new HashMap<>();
			switch (flag) {
			case "query": {
				// 获取每页条数
				int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
				if (pageSize == 0) {
					pageSize = 10;
				}
				// 获取当前页第一条数据的下标
				int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
				// 算出当前页码
				int pageIndex = offset / pageSize;
				String sdate = request.getParameter("startDate");
				String edate = request.getParameter("endDate");
				String stuName = request.getParameter("stuName");
				String stuNo = request.getParameter("stuNo");
				String cid = request.getParameter("cid");
				params.put("SID", "" + userInfo.getSID());
				params.put("PageIndex", "" + pageIndex);
				params.put("PageSize", "" + pageSize);
				if (!EmptyUtils.stringIsEmpty(sdate)) {
					params.put("STARTDATE", sdate);
				}
				if (!EmptyUtils.stringIsEmpty(edate)) {
					params.put("ENDDATE", edate);
				}
				if (!EmptyUtils.stringIsEmpty(stuName)) {
					params.put("STUNAME", stuName);
				}
				if (!EmptyUtils.stringIsEmpty(stuNo)) {
					params.put("STUNO", stuNo);
				}
				if (!EmptyUtils.stringIsEmpty(cid)) {
					params.put("CID", cid);
				}
				String result = HttpUtils.getInstance().get("35", params);
				response.getWriter().write(result);
			}
				break;
			case "add": {
				// classID=1&stuID=1&height=122&headSize=22&bodyState=%E5%AF%B9%E5%AF%B9%E5%AF%B9&number=11222&date=2017-08-17&weight=12&bustSize=333
				String stuID = request.getParameter("stuID");
				String height = request.getParameter("height");
				String headSize = request.getParameter("headSize");
				String bodyState = request.getParameter("bodyState");
				String number = request.getParameter("number");
				String date = request.getParameter("date");
				String weight = request.getParameter("weight");
				String bustSize = request.getParameter("bustSize");
				BodyCheck bodyCheck = new BodyCheck();
				bodyCheck.setSTUDENTID(TransformUtils.transformInt(stuID));
				bodyCheck.setHEIGHT(height);
				bodyCheck.setHEADSIZE(headSize);
				bodyCheck.setBODYSTATE(bodyState);
				bodyCheck.setNUMBER(number);
				bodyCheck.setDATE(date);
				bodyCheck.setWEIGHT(weight);
				bodyCheck.setBUSTSIZE(bustSize);
				params.put("BODYCHECK", JSONUtil.toJSON(bodyCheck));
				String result = HttpUtils.getInstance().post("35A", params);
				response.getWriter().write(result);
			}
				break;
			case "edit": {
				String id = request.getParameter("id");
				if (EmptyUtils.stringIsEmpty(id)) {
					response.getWriter().write(HttpUtils.RESULT_FAIL_JSON);
					return;
				}
				String stuID = request.getParameter("stuID");
				String height = request.getParameter("height");
				String headSize = request.getParameter("headSize");
				String bodyState = request.getParameter("bodyState");
				String number = request.getParameter("number");
				String date = request.getParameter("date");
				String weight = request.getParameter("weight");
				String bustSize = request.getParameter("bustSize");
				BodyCheck bodyCheck = new BodyCheck();
				bodyCheck.setID(TransformUtils.transformInt(id));
				bodyCheck.setSTUDENTID(TransformUtils.transformInt(stuID));
				bodyCheck.setHEIGHT(height);
				bodyCheck.setHEADSIZE(headSize);
				bodyCheck.setBODYSTATE(bodyState);
				bodyCheck.setNUMBER(number);
				bodyCheck.setDATE(date);
				bodyCheck.setWEIGHT(weight);
				bodyCheck.setBUSTSIZE(bustSize);
				params.put("BODYCHECK", JSONUtil.toJSON(bodyCheck));
				String result = HttpUtils.getInstance().post("35C", params);
				response.getWriter().write(result);
			}
				break;
			case "delete": {
				String id = request.getParameter("id");
				params.put("ID", id);
				String result = HttpUtils.getInstance().get("35B", params);
				response.getWriter().write(result);
			}
				break;
			default:
				break;
			}
		}
	}

}
