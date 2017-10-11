package com.hinear.hxt.servlet.notice;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.hinear.hxt.entity.MediaInfo;
import com.hinear.hxt.entity.News;
import com.hinear.hxt.entity.NoticeInfo;
import com.hinear.hxt.entity.TeacherGroup;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 新增通知数据
 */
@WebServlet("/addNoticeServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * 参数 title标题 content内容 typeid类型id {@link NoticeInfo#TYPE_CLASS}
	 * 教师通知需teacherGroupIds教师组id集合 班级通知需cid班级id
	 * 
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		int sid = userInfo.getSID(); // 学校ID
		System.out.println("学校ID11：" + sid);
		// 获取request 请求的params
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		int typeid = TransformUtils.transformInt(request.getParameter("typeId")); //通知类型
		
		if (typeid == 0) {
			System.out.println("typeid参数必须设置");
			return;
		}
		NoticeInfo noticeInfo = new NoticeInfo();
		noticeInfo.setTYPEID(typeid);
		noticeInfo.setUSERID(userInfo.getUSERID());
		noticeInfo.setRECEIVESCHOOL(sid);
		noticeInfo.setNEWSTITLE(title);
		noticeInfo.setCONTENT(content);
		String serverType;
		if (NoticeInfo.TYPE_TEACHER == typeid) { // 教师通知2
			serverType = "07B";
			String[] teacherGroupIds = request.getParameterValues("teacherGroupIds");
			if (teacherGroupIds != null && teacherGroupIds.length != 0) {
				List<TeacherGroup> noticegroup = new ArrayList<>();
				for (String tgId : teacherGroupIds) {
					TeacherGroup tGroup = new TeacherGroup();
					tGroup.setGroup_id(Integer.parseInt(tgId));
					noticegroup.add(tGroup);
				}
				noticeInfo.setNoticegroup(noticegroup);
			}
		} else { // 学校通知1；班级通知3
			serverType = "06A";
			// 获取文件名
			String[] arr = request.getParameterValues("imgUrl");
			//保存图片URL到数据库
			List<MediaInfo> list = new ArrayList<MediaInfo>();
			if(NoticeInfo.TYPE_SCHOOL == typeid){//学校通知
				for(int i = 0; i < arr.length; i++){
					System.out.println("arr==="+ arr[i]);
					MediaInfo mediaInfo = new MediaInfo();
					mediaInfo.setATTACHMENTURL(arr[i]);
					mediaInfo.setOTHERTYPEID(1);
					list.add(mediaInfo);
				}
			}
			if (NoticeInfo.TYPE_CLASS == typeid) { // 班级通知
				 String cid = request.getParameter("cid");
				 System.out.println("cid=" +cid);
				 for(int i = 0; i < arr.length; i++){
						System.out.println("arr==="+ arr[i]);
						MediaInfo mediaInfo = new MediaInfo();
						mediaInfo.setATTACHMENTURL(arr[i]);
						mediaInfo.setOTHERTYPEID(3);
						list.add(mediaInfo);
					}
				noticeInfo.setRECEIVECLASSES(Integer.valueOf(cid));
			}
			noticeInfo.setData(list);
		}

		String noticeJson = JSONUtil.toJSON(noticeInfo);
		Map<String, String> params = new HashMap<>();
		params.put("Notices", noticeJson);
		String result = HttpUtils.getInstance().get(serverType, params);
		PrintWriter pw = response.getWriter();
		pw.write(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}


}
