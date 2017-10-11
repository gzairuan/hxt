package com.hinear.hxt.servlet.common;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.PhotoAblumInfo;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;

/**
 * 
 * @author szs
 * @time 2017年7月14日 下午5:16:21
 * @version 1.0
 * 描述：相册管理 servlet,分别为学校相册和班级相册
 */
@WebServlet("/photoAblumServlet")
public class PhotoAblumServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("执行创建操作");
		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		if(userInfo != null){
			int userId = userInfo.getUSERID(); //用户ID
			int sId = userInfo.getSID(); //学校ID
			int classesId = userInfo.getCLASSESID(); //班级ID
			
			String albumDesc = request.getParameter("albumDesc");
			System.out.println("albumDesc==="+albumDesc);
			PhotoAblumInfo albumInfo = new PhotoAblumInfo();
			albumInfo.setSID(sId);
			albumInfo.setCREUSER(userId+""); //创建人
			albumInfo.setALBUMDESC(albumDesc);
			
			if(albumDesc != null){//相册描述内容不为空
				Map<String, String> map = new HashMap<String, String>();
				String albumInfoJson = JSONUtil.toJSON(albumInfo);
				map.put("Notices", albumInfoJson); 
				String result = HttpUtils.getInstance().get("04F", map);  //创建相册接口
				response.getWriter().print(result);
			}
			
		}
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
