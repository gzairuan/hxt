package com.hinear.hxt.servlet.school.cookbook;

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

import com.google.gson.reflect.TypeToken;
import com.hinear.hxt.entity.Food;
import com.hinear.hxt.entity.FoodsDef;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class CookbookServlet
 */
@WebServlet("/cookbookServlet")
public class CookbookServlet extends HttpServlet {
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
				params.put("SID", "" + userInfo.getSID());
				params.put("PageIndex", "" + pageIndex);
				params.put("PageSize", "" + pageSize);
				if (!EmptyUtils.stringIsEmpty(sdate)) {
					params.put("SDATE", sdate);
				}
				if (!EmptyUtils.stringIsEmpty(edate)) {
					params.put("EDATE", edate);
				}
				String result = HttpUtils.getInstance().get("02H", params);
				response.getWriter().write(result);
			}
				break;
			case "add": {
				String date = request.getParameter("date");
				String defs = request.getParameter("defs");//早餐
				List<FoodsDef> defs2 = JSONUtil.parseJSONList(defs, new TypeToken<List<FoodsDef>>(){}.getType());
				List<FoodsDef> defs3 = new  ArrayList<>();
				for (FoodsDef foodsDef : defs2) {
					if(foodsDef.getDEFNAME()!=null){
						defs3.add(foodsDef);
					}
				}
				Food food = new Food();
				food.setSID(userInfo.getSID());
				food.setFOODDATE(date);
				food.setDATADEF(defs3);
				params.put("JOOBDAILYFOOD", JSONUtil.toJSON(food));
				String result = HttpUtils.getInstance().get("02C", params);
				response.getWriter().write(result);
			}
				break;
			case "edit": {
				String id = request.getParameter("id");
				if(EmptyUtils.stringIsEmpty(id)){
					response.getWriter().write(HttpUtils.RESULT_FAIL_JSON);
					return;
				}
				String date = request.getParameter("date");
				String defs = request.getParameter("defs");//早餐
				List<FoodsDef> defs2 = JSONUtil.parseJSONList(defs, new TypeToken<List<FoodsDef>>(){}.getType());
				List<FoodsDef> defs3 = new  ArrayList<>();
				for (FoodsDef foodsDef : defs2) {
					if(foodsDef.getDEFNAME()!=null){
						defs3.add(foodsDef);
					}
				}
				Food food = new Food();
				food.setFOODID(TransformUtils.transformInt(id));
				food.setSID(userInfo.getSID());
				food.setFOODDATE(date);
				food.setDATADEF(defs3);
				params.put("JOOBDAILYFOOD", JSONUtil.toJSON(food));
				String result = HttpUtils.getInstance().get("02D", params);
				response.getWriter().write(result);
			}
				break;
			case "delete": {
				String id = request.getParameter("id");
				params.put("ID", id);
				String result = HttpUtils.getInstance().get("02B", params);
				response.getWriter().write(result);
			}
				break;
			default:
				break;
			}
		}
	}

}
