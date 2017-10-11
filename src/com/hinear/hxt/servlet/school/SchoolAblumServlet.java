package com.hinear.hxt.servlet.school;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
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

import com.hinear.hxt.entity.PhotoAblumInfo;
import com.hinear.hxt.entity.PhotoInfo;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * @author szs
 * @time 2017年7月17日 上午10:57:21
 * @version 1.0
 * 描述：学校相册初始化servlet，相册管理 servlet,分别为学校相册和班级相册
 */


@WebServlet("/schoolAblumServlet")
public class SchoolAblumServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String optFlag = request.getParameter("optFlag"); //操作标识
		String result = null; //response 返回结果
		String albumId = null; //相册ID
		String albumDesc = null; //相册描述
		String photoId = null; //照片ID
		
		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo"); //获取userBean
		int sid = userInfo.getSID();//获取学校ID
		int userId = userInfo.getUSERID();//用户ID
		Map<String, String> map = new HashMap<String, String>();
		
		int limit = TransformUtils.transformInt( request.getParameter("limit"));
		int offset = TransformUtils.transformInt(request.getParameter("offset"));
		System.out.println("limit="+limit + " offset="+offset);
		
		int pageSize = 10000;
		//当前页第一条数据下标索引，0标识 重第一条数据开始
		int pageIndex = 0;
		switch(optFlag){
			case "initalbum": //初始化相册
				map.put("PageSize", pageSize+"");
				map.put("PageIndex", pageIndex+"");
				map.put("CID", "-1"); //校园相册的班级ID必须为-1
				if(!EmptyUtils.stringIsEmpty(String.valueOf(sid))){
					map.put("SID", sid+"");
				}
				if(!EmptyUtils.stringIsEmpty(String.valueOf(userId))){
					map.put("UserID", userId+"");
				}
				result = HttpUtils.getInstance().get("04", map);
				break;
			case "createAlbum": //创建相册
				albumDesc = request.getParameter("albumDesc");
				PhotoAblumInfo albumInfo = new PhotoAblumInfo();
				albumInfo.setSID(sid);
				albumInfo.setCREUSER(userId+""); //创建人
				albumInfo.setALBUMDESC(albumDesc);
				if(albumDesc != null){//相册描述内容不为空
					String albumInfoJson = JSONUtil.toJSON(albumInfo);
					map.put("Notices", albumInfoJson); 
					result = HttpUtils.getInstance().get("04F", map);  //创建相册接口
				}
				break;
			case "editAblum": //修改相册
				albumId = request.getParameter("albumId");  //
				albumDesc = request.getParameter("albumDesc");
				map.put("ID", albumId);
				map.put("ALBUMDESC", albumDesc);
				result = HttpUtils.getInstance().get("04B", map);
				break;
			case "delAblum": //删除相册
				albumId = request.getParameter("albumId");
				map.put("ID", albumId);
				result = HttpUtils.getInstance().get("04A", map);
				break;
			case "initPhoto": //初始化照片
				albumId = request.getParameter("albumId");
				map.put("PageSize", pageSize+"");
				map.put("PageIndex", pageIndex+"");
				map.put("ALBUMID", albumId);
				result = HttpUtils.getInstance().get("04I", map);
				break;
			case "editPhoto": //修改照片
				photoId = request.getParameter("photoId");
				String photoDesc = request.getParameter("photoDesc");
				map.put("ID", photoId);
				map.put("PHOTODESC", photoDesc);
				result = HttpUtils.getInstance().get("04N", map);
				break;
			case "delPhoto": //删除照片
				photoId = request.getParameter("photoId");
				map.put("ID", photoId);
				result = HttpUtils.getInstance().get("04C", map);
				break;
			case "uploadPhoto": //上传照片
				String albumName = request.getParameter("albumName");//相册名称
				//获取相册ID
				albumId = request.getParameter("albumId");
				String album = albumName.replace("\"", "").trim();
				System.out.println(album+"=albumId=" +albumId);
				
				List<String> backList = upaloadImgs(sid, album, albumId, request); //上传图片
				System.out.println("jsonArry返回结果："+backList);
				
				break;
		}
		response.getWriter().print(result);
	}
	
	/**
	 * 学校相册照片上传
	 * @param sid  学校ID
	 * @param albumId 相册ID
	 * @param albumName 相册名称
	 * @param request 
	 * @return
	 * @throws IOException
	 */
	private List<String> upaloadImgs(int sid, String albumName, String albumId, HttpServletRequest request) throws IOException {
		StringBuffer url = request.getRequestURL();
		String newurl = url.substring(0, url.lastIndexOf("/"));
//		String servicePath = "upload/school" + sid + File.separator + "photoAlbum" + File.separator + albumName; //上传文件服务器目录（学校相册img）如：upload/img/南湾幼儿园学校/相册1
		String servicePath = "/uploadnew/school" + sid + "/album/1/"+albumId; //上传文件服务器目录（学校相册img）如：upload/img/南湾幼儿园学校/相册1
		System.out.println("servicePath="+servicePath);
		
		String basePath = this.getServletContext().getRealPath(servicePath); //班级相册路径
		String fullPath = null; //上传文件夹
		String fileName = null; //单独文件名
		String filePath = null;
		String fullName = null; //上传图片全名
		final String allowFileSuffix = ".jpg,.jpeg,.bmp,.png";
		
		File serviceDir = new File(basePath);
		if(!serviceDir.exists()){//判断目录是否存在
			serviceDir.mkdirs();
		}
		
//			JsonArray jsonArry = new JsonArray();
//			JsonObject jsonObj = new JsonObject();
		List<String> list = new ArrayList<>();
		// 检查输入请求是否为multipart表单数据。
		if (ServletFileUpload.isMultipartContent(request)) {
			DiskFileItemFactory dff = new DiskFileItemFactory();// 创建该对象
			dff.setRepository(serviceDir);// 指定上传文件的临时目录
			dff.setSizeThreshold(1024000);// 指定在内存中缓存数据大小,单位为byte
			ServletFileUpload sfu = new ServletFileUpload(dff);// 创建该对象
			sfu.setFileSizeMax(10000000);//指定单个上传文件的最大尺寸
			sfu.setHeaderEncoding("utf-8");

			List<FileItem> fileItems = new ArrayList<FileItem>();
			try {
				fileItems = sfu.parseRequest(request); //获取上传文件
				System.out.println("文件大小："+fileItems.size());
			} catch (FileUploadException e1) {
				System.out.println("文件上传发生错误" + e1.getMessage());
			}
			for (FileItem fileItem : fileItems) { //遍历上传文件
				// 判断该表单项是否是普通文本类型
				if (fileItem.isFormField()) {
//					String name = fileItem.getFieldName();// 控件名
//						String value = fileItem.getString();
//					fileName = name.substring(name.lastIndexOf(File.separator) + 1);
				} else {
					filePath = fileItem.getName(); //
					if (filePath == null || filePath.trim().length() == 0)
						continue;
					SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss", Locale.getDefault());
					String format = sdf.format(new Date());
					int ran = (int) (Math.random() * 1000);
					String suffix = filePath.substring(filePath.lastIndexOf('.'));
					fileName = format + ran + System.currentTimeMillis() + suffix;
//					fileName = filePath.substring(filePath.lastIndexOf(File.separator) + 1); //获取文件名
//					String extName = filePath.substring(filePath.lastIndexOf(".") + 1);
					fullPath = basePath + "/" + fileName; //文件全名
					System.out.println("fullPath图片全名=="+fullPath);
					fullName = servicePath + "/" + fileName;
					list.add(fullName);
					
					System.out.println("fullName服务器路径="+fullName);
					if (allowFileSuffix.indexOf(suffix) != -1) {//读取文件
						try {
							fileItem.write(new File(fullPath)); //写入流,
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else {
						try {
							throw new FileUploadException("文件格式不正确");
						} catch (FileUploadException e) {
							e.printStackTrace();
						}
					}
				}
			}//end for循环
		}
		List<PhotoInfo> piList = new ArrayList<>(); 
		PhotoInfo pi = new PhotoInfo();
		pi.setALBUMID(Integer.valueOf(albumId));
//			pi.setPHOTODESC(fileName);
		pi.setPHOTOURL(fullName);
		piList.add(pi);
		
		Map<String, String> map = new HashMap<String, String>();
		String json = JSONUtil.toJSON(piList);
		System.out.println("json=="+json);
		map.put("PHOTOS", json);
		String result = HttpUtils.getInstance().get("04L", map);
		
		/*jsonObj.addProperty("uploadUrl", basePath);
		jsonArry.add(jsonObj);*/
//			jsonArry.add(fullName);
		return list;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
