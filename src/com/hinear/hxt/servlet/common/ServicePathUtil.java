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
import com.hinear.hxt.util.JSONUtil;

/**
 * 
 * @author szs
 * @time 2017年8月9日 下午3:50:09
 * @version 1.0
 * 描述： 获取服务器文件上传路径
 */
@WebServlet("/servicePathUtil")
public class ServicePathUtil extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name1 = request.getParameter("name");
		System.out.println("传递name="+name1);
		
		StringBuffer url = request.getRequestURL();
		String newurl = url.substring(0, url.lastIndexOf("/"));
//		String servicePath = newurl + "/upload" + "/img" + "/lifeSketch"; 
		String servicePath = "upload" + "/img" + "/lifeSketch"; //上传文件服务器目录（学校相册img）如：upload/img/南湾幼儿园学校/相册1
		System.out.println("servicePath="+servicePath);
		
		String basePath = this.getServletContext().getRealPath("/upload" + File.separator + "img" + File.separator + "lifeSketch"); //如：upload/img/南湾幼儿园学校/相册1
		String fullPath = null; //上传文件夹
		String fileName = null; //单独文件名
		String filePath = null;
		String fullName = null; //上传图片全名
		final String allowFileSuffix = "jpg,png,jpeg";
		
//		File serviceDir = new File(basePath);
		File serviceDir = new File(basePath);
		if(!serviceDir.exists()){//判断目录是否存在
			serviceDir.mkdirs();
		}
		
		JsonArray jsonArry = new JsonArray();
		// 检查输入请求是否为multipart表单数据。
		if (ServletFileUpload.isMultipartContent(request)) {
			DiskFileItemFactory dff = new DiskFileItemFactory();// 创建该对象
			dff.setRepository(serviceDir);// 指定上传文件的临时目录
			dff.setSizeThreshold(1024000);// 指定在内存中缓存数据大小,单位为byte
			ServletFileUpload sfu = new ServletFileUpload(dff);// 创建该对象
			sfu.setFileSizeMax(10000000);//指定单个上传文件的最大尺寸
//			  sfu.setSizeMax(10000000);// 指定一次上传多个文件的总尺寸
			sfu.setHeaderEncoding("utf-8");

			List<FileItem> fileItems = new ArrayList<FileItem>();
			
			try {
				fileItems = sfu.parseRequest(request); //获取上传文件
			} catch (FileUploadException e1) {
				System.out.println("文件上传发生错误" + e1.getMessage());
			}
			System.out.println("fileItems内容==》"+fileItems);
			System.out.println("fileItems大小："+fileItems.size());
			
			
			for (FileItem fileItem : fileItems) { //遍历上传文件
				
				// 判断该表单项是否是普通文本类型
				if (fileItem.isFormField()) {
					System.out.println("进入if语句");
					String name = fileItem.getFieldName();// 控件名
					String value = fileItem.getString();
					System.out.println("name="+name + " value="+value);
					
					fileName = name.substring(name.lastIndexOf(File.separator) + 1);
					System.out.println("fileName000=="+fileName);
				} else {
					System.out.println("进入else语句");
					filePath = fileItem.getName(); //
					System.out.println("上传照片名称："+filePath);
					
					if (filePath == null || filePath.trim().length() == 0)
						continue;
					
					fileName = filePath.substring(filePath.lastIndexOf(File.separator) + 1); //获取文件名
//					jsonArry.add(fileName);
					System.out.println("fileName@@@="+fileName);
					String extName = filePath.substring(filePath.lastIndexOf(".") + 1);
					fullPath = basePath + File.separator + fileName; //文件全名
					fullName = servicePath + File.separator + fileName;
					System.out.println("照片全名fullName："+ fullName);
					
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
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}//end for循环
			System.out.println("jsonArry===="+jsonArry);
		}		
		
		JsonObject jsonObj = new JsonObject();
		
//		jsonObj.addProperty("fileName", fileName);
//		jsonObj.addProperty("imgeUrl", fullName);
//		String resultJson = JSONUtil.toJSON(jsonObj);
//		System.out.println("resultJson="+resultJson.toString()); 
		
		jsonObj.addProperty("uploadUrl", servicePath);
		jsonArry.add(jsonObj);
		
		System.out.println("jsonArry="+jsonArry.toString());
		response.getWriter().print(jsonArry); //上传文件路径
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
