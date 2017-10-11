<%@page import="com.hinear.hxt.entity.UserInfo"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String basePath = request.getContextPath();
	UserInfo userInfo = (UserInfo)session.getAttribute("userInfo");
	pageContext.setAttribute("userTypeId", userInfo.getUSERTYPEID());
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<title>用户管理</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico">
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css" rel="stylesheet">
<!-- 表格 -->
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.min.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <!-- Panel Other -->
        <div class="ibox float-e-margins">
            <div class="ibox-title">
				<h3>用户管理</h3>
			</div>
			<div class="ibox-content">
				<form id="formSearch" class="form-horizontal">
					<div class="box-body no-padding">
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label col-md-4" for="uTypeId">用户类型：</label>
								<div class="col-md-7">
									<select id="uTypeId" name='uTypeId' class="form-control"
										style="font-size: 12px; width: 100%;">
										<option value="0">全部</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label col-md-4" for="uStateId">状态：</label>
								<div class="col-md-7">
									<select id="uStateId" name='uStateId' class="form-control"
										style="font-size: 12px; width: 100%;">
										<option value="all">全部</option>
										<option value="1">启用</option>
										<option value="0">禁用</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<c:if test="${userTypeId==4}">
									<label for="uSchoolId" class="control-label col-md-4">学校：</label>
									<div class="col-md-7">
										<select id="uSchoolId" name='uSchoolId' class="form-control"
											style="font-size: 12px; width: 100%;">
											<option value="0">全部</option>
										</select>
									</div>
								</c:if>
								<c:if test="${userTypeId!=4}">
									<label for="uClassId" class="control-label col-md-4">班级：</label>
									<div class="col-md-7">
										<select id="uClassId" name='uClassId' class="form-control"
											style="font-size: 12px; width: 100%;">
											<option value="0">全部</option>
										</select>
									</div>
								</c:if>
							</div>
						</div>
					</div>
					<div class="box-body no-padding">
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label col-md-4" for="uName">用户名：</label>
								<div class="col-md-7">
									<input type="text" class="form-control" id="uName" name="uName">
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="control-label col-md-4" for="uRName">姓名：</label>
								<div class="col-md-7">
									<input type="text" class="form-control" id="uRName" name="uPhone">
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<div class="col-sm-12 col-md-4 col-md-offset-2">
									<button type="button" id="btn_query" class="btn btn-primary btn-sm" onclick="searchData()">查询</button>
								</div>
							</div>
						</div>
					</div>
				</form>

				<div  id="toolbar">
					<button type="button" id="btnAdd" class="btn btn-primary btn-sm add-role" style="display: none;"
						data-toggle="modal" data-target="#addOrEditModal" data-flag="add">
						<span class="fa fa-plus" aria-hidden="true">新增</span>
					</button>
				
					<button type="button" id="btnAdd" class="btn btn-danger btn-sm delete-role"  style="display: none;"
						data-toggle="modal" data-target="#deleteModal">
						<span class="fa fa-close" aria-hidden="true">删除</span>
					</button>
				</div>
				<!-- 用户table 数据 -->
				<table id="tableUser" class="table-role">
					
				</table>
			</div>
		</div>
	</div>
	
	<!-- table 新增 modal -->
    <div id="addOrEditModal" class="modal fade in" aria-labelledby="userModalLabel" aria-hidden="true">
    	<div class="modal-dialog modal-lg">
    		<div class="modal-content">
    			<div class="modal-header">
    				<!-- 模态框头 -->
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <!-- 右上角关闭按钮“x” -->
                    <h5 class="modal-title" id="addModalTitle">用户新增</h5>
    			</div>
    			<div class="modal-body">
    				<form id="user-form" name="user-form" class="form-horizontal">
    					<div class="box-body no-padding">
    						<div class="col-md-6">
    							<div class="form-group">
									<label class="control-label col-sm-4" for="uTypeId">用户类型：</label>
									<div class="col-sm-7">
										<select id="modalUTypeId" name='uTypeId' class="form-control" onchange="changeUTypeId()" style="font-size: 12px; width: 100%;">
										</select>
									</div>
								</div>
								<c:if test="${userTypeId==4 }">
									<div class="form-group" id="divSchoolId">
										<label for="modalUSchoolId" class="control-label col-sm-4">学校：</label>
										<div class="col-sm-7">
											<select id="modalUSchoolId" name='uSchoolId' class="form-control" style="font-size: 12px; width: 100%;">
											</select>
										</div>
									</div>
								</c:if>
								<c:if test="${userTypeId!=4 }">
									<div class="form-group" id="divStudentId">
										<label for="ustudent" class="col-sm-4 control-label">学生:</label>
										<div class="col-sm-7">
											<input type="text" id="studentId" name="ustudent" class="form-control" readonly="readonly"/>
										</div>
									</div>
								</c:if>
							</div>
    						<div class="col-md-6">
    							<div class="form-group">
									<label class="control-label col-sm-4" for="uStateId">是否启用:</label>
									<div class="col-sm-7">
										<select id="uStateId" name='uStateId' class="form-control"
											style="font-size: 12px; width: 100%;">
											<option value="1">启用</option>
											<option value="0">禁用</option>
										</select>
									</div>
								</div>
								<c:if test="${userTypeId==4 }">
									<div class="form-group" id="divStudentId">
										<label for="ustudent" class="col-sm-4 control-label">学生:</label>
										<div class="col-sm-7">
											<input type="text" id="studentId" name="ustudent" class="form-control" readonly="readonly"/>
										</div>
									</div>
								</c:if>
    						</div>
    					</div>
    					<div class="box-body no-padding">
    						<div class="col-md-6">
								<div class="form-group">
									<label for="uname" class="col-sm-4 control-label">用户名：</label>
									<div class="col-sm-7">
										<input type="text" id="uname" name="uname" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label for="upassword" class="col-sm-4 control-label">用户密码：</label>
									<div class="col-sm-7">
										<input type="password" id="upassword" name="upassword" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label for="uphone" class="col-sm-4 control-label">联系电话：</label>
									<div class="col-sm-7">
										<input type="text" id="uphone" name="uphone"
											class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label for="usignature" class="col-sm-4 control-label">签名：</label>
									<div class="col-sm-7">
										<input type="text" id="usignature" name="usignature"
											class="form-control" />
									</div>
								</div>
							</div>
							
							<div class="col-md-6">
								<div class="form-group">
									<label for="urealName" class="col-sm-4 control-label">真实姓名:</label>
									<div class="col-sm-7">
										<input type="text" id="urealName" name="urealName" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label for="uaffirmPass" class="col-sm-4 control-label">确认密码：</label>
									<div class="col-sm-7">
										<input type="password" id="uaffirmPass" name="uaffirmPass" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label for="uemail" class="col-sm-4 control-label">邮箱：</label>
									<div class="col-sm-7">
										<input type="text" id="uemail" name="uemail" class="form-control" />
									</div>
								</div>
							</div>
    					</div>
    				</form>
    			</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="btnSave">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
    	</div>
    </div>
    
    <!-- table 删除modal -->
    <div id="deleteModal" class="modal fade" role='dialog' tabindex="-1"
        aria-labelledby="delModalLabel" data-backdrop="true"
        aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <h5 class="modal-title" id="delModalLabel" style="color: red">删除
                    </h5>
                </div>
                <div class="modal-body">
                    <p class="glyphicon glyphicon-question-sign">&nbsp;是否确认删除？</p>
                </div>
                <div class="modal-footer">
                   <!--  <span id='deleteButton'></span> -->
                    <button id="btnDel" type="button" class="btn btn-delete" data-dismiss="modal">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>

            </div>
        </div>
    </div><!-- end deleteModal -->
    
    <!-- table 关联modal -->
	<div id="roleModal" class="modal fade" role='dialog' tabindex="-1"
		aria-labelledby="roleModalLabel" data-backdrop="true"
		aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="roleModalLabel">关联学生
					</h5>
				</div>
				<div class="modal-body">
					<div class="box-body no-paddiong">
						<form class="form-horizontal" role="form">
							<div class="col-md-4">
								<div class="form-group">
									<label class="col-md-5 control-label" for="queName">学生姓名：</label>
									<div class="col-md-7">
										<input type="text" id="queName" class="form-control" />
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label class="col-md-5 control-label" for="queClassID">班级：</label>
									<div class="col-md-7">
										<select id = "queClassID" class="form-control">
										</select>
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<div class="col-md-5">
										<a type="button" class="btn btn-sm btn-primary" onclick="searchUserData()">搜索</a>
									</div>
								</div>
							</div>
						</form>
					</div>
					<table id="studentTable"></table>
				</div>
				<div class="modal-footer">
					<button id="roleBtnSave" type="button" class="btn btn-primary" data-dismiss="modal">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>

			</div>
		</div>
	</div>

	<!-- 全局js -->
	<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
	<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
	<!-- 兼容ie9及以下 -->
	<script src="<%=basePath%>/js/json2.js"></script>
	<script src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.js"></script>
	<script src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
	<!-- 在util之前引入 -->
	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
	<script type="text/javascript">
		var userTypeId = <%=userInfo.getUSERTYPEID()%>;
	</script>
	<script src="user.js?v=1.6"></script>
	<script src="<%=basePath%>/js/common/role-handler.js"></script>

</body>
</html>