package com.hinear.hxt.servlet.common;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 * 
 * @author szs
 * @time 2017年7月18日 下午5:17:57
 * @version 1.0
 * 描述：学校通知图片管理servlet
 */
@WebServlet("/noticImgUploadFile")
public class NoticImgUploadFile extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String optFlag = request.getParameter("optFlag");
		//获取服务器IP
		String serviceIp = request.getLocalAddr();
		//获取请求服务器的URL
		StringBuffer url = request.getRequestURL();
		String newurl = url.substring(0, url.lastIndexOf("/"));	
		String servicePath = null;
		String basePath = null;
		switch(optFlag){
			case "schoolnotice": //学校通知
				servicePath =  "upload" + "/img" + "/schoolNoticeImg"; //上传文件服务器目录（学校通知img）
				basePath = this.getServletContext().getRealPath("/upload" + File.separator + "img" + File.separator + "schoolNoticeImg");
				break;
			case "classesnotice": //班级通知
				servicePath =  "upload" + "/img" + "/claeseNoticeImg"; //上传文件服务器目录（学校通知img）
				basePath = this.getServletContext().getRealPath("/upload" + File.separator + "img" + File.separator + "claeseNoticeImg");
				break;
		}
		
		ArrayList<Object> list = new ArrayList<Object>();
		String fullPath = null; //文件全名
		String fileName = null; //单独文件名
		String filePath = null;
		final String allowFileSuffix = "jpg,png,jpeg";
		
		File serviceDir = new File(basePath);
		if(!serviceDir.exists()){//判断目录是否存在
			serviceDir.mkdirs();
		}
		
		// 检查输入请求是否为multipart表单数据。
		if (ServletFileUpload.isMultipartContent(request)) {
			DiskFileItemFactory dff = new DiskFileItemFactory();// 创建该对象
			dff.setRepository(serviceDir);// 指定上传文件的临时目录
			dff.setSizeThreshold(1024000);// 指定在内存中缓存数据大小,单位为byte
			ServletFileUpload sfu = new ServletFileUpload(dff);// 创建该对象
			sfu.setFileSizeMax(10000000);//指定单个上传文件的最大尺寸
//			sfu.setSizeMax(10000000);// 指定一次上传多个文件的总尺寸
			sfu.setHeaderEncoding("utf-8");

			List<FileItem> fileItems = new ArrayList<FileItem>();
			
			try {
				fileItems = sfu.parseRequest(request); //获取上传文件
			} catch (FileUploadException e1) {
				System.out.println("文件上传发生错误" + e1.getMessage());
			}
			
			for (FileItem fileItem : fileItems) { //遍历上传文件

				// 判断该表单项是否是普通文本类型
				if (fileItem.isFormField()) {
					String name = fileItem.getFieldName();// 控件名
					String value = fileItem.getString();
					fileName = name.substring(name.lastIndexOf(File.separator) + 1);
				} else {
					filePath = fileItem.getName(); //
					if (filePath == null || filePath.trim().length() == 0)
						continue;
					
					fileName = filePath.substring(filePath.lastIndexOf(File.separator) + 1); //获取文件名
					String extName = filePath.substring(filePath.lastIndexOf(".") + 1);
					fullPath = basePath + File.separator + fileName; //文件全名
					list.add(fullPath);
					
					if (allowFileSuffix.indexOf(extName) != -1) {//读取文件
						try {
							fileItem.write(new File(fullPath)); //写入流
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
			}
		}		
		
		JsonArray jsonArry = new JsonArray();
		JsonObject jsonObj = new JsonObject();
		jsonObj.addProperty("imgeUrl", basePath);
		jsonObj.addProperty("fileName", fileName);
		jsonObj.addProperty("list", list.toString());
		jsonObj.addProperty("uploadUrl", servicePath);
		jsonArry.add(jsonObj);
		response.getWriter().print(jsonArry); //上传文件路径
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
