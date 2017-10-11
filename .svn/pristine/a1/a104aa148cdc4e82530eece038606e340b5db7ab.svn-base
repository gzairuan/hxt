<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String basePath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title>角色管理</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico"> 
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrap-treeview/bootstrap-treeview.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet">

</head>
<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <!-- Panel Other -->
        <div class="ibox float-e-margins">
            <div class="ibox-title">
				<h3>角色管理</h3>
			</div>
			<!-- ibox 内容面板 -->
			<div class="ibox-content "><!-- areabox-content -->
				<div class="table-responsive">
					<div id="toolbar">
						<button type="button" id="addBtn" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#AOEModal" data-opt="add"><i class="fa fa-plus"></i> 新增</button>
						<button type="button" id="editBtn" class="btn btn-primary btn-sm" onclick="editBtn()" data-opt="edit"><i class="fa fa-edit"></i> 修改</button>
						<button type="button" id="deleteBtn" class="btn btn-primary btn-sm"><i class="fa fa-close" onclick="deleteBtn()"> 删除</i></button>
					</div>
					<table id="usertypeTable" class="table table-striped">
					
					</table>
				</div> 
			</div>
		</div>
	</div>
	
	<!-- table 新增 modal -->
    <div id="AOEModal" class="modal fade in" aria-labelledby="userModalLabel" aria-hidden="true">
    	<div class="modal-dialog modal-xs">
    		<div class="modal-content" style="width: 90%;">
    			<div class="modal-header">
    				<!-- 模态框头 -->
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <!-- 右上角关闭按钮“x” -->
                    <h5 class="modal-title" id="addModalTitle">角色新增</h5>
    			</div>
    			<div class="modal-body">
    				<form id="role_Mform" name="user-form" class="form-horizontal">
    					<div class="box-body no-padding">
    						<div class="col-md-10">
								<div class="form-group">
									<label for="rolenameId" class="col-sm-4 control-label">角色名称：</label>
									<div class="col-sm-8">
										<input type="text" id="rolenameId" name="rolenameId" class="form-control"/>
									</div>
								</div>
								<div class="form-group">
									<label for="remarkId" class="col-sm-4 control-label">备注：</label>
									<div class="col-sm-8">
										<textarea rows="5" class="form-control" id="remarkId" name="remarkId"></textarea>
									</div>
								</div>
							</div>
    					</div>
    				</form>
    			</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="saveBtn">保存</button>
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
                    <button id="btnDel" type="button" class="btn btn-delete" data-dismiss="modal" onclick="affirmDeleteNode()">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>

            </div>
        </div>
    </div><!-- end deleteModal -->
    
    <!-- 角色权限管理modal -->
    <div id="roleModal" class="modal fade" role='dialog' tabindex="-1"
        aria-labelledby="roleModal" data-backdrop="true"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="width:80%;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <h5 class="modal-title" id="delModalLabel">角色权限分配管理</h5>
                </div>
				<div class="modal-body">
					<div class="row">
						<div class="box-header with-border" style="margin: -3px;">
							<div class="form-group text-center">
								<h3>角色名称：<span id="typenameId" style="color: red;"></span></h3>
							</div>
						</div>
						<!-- 左边区域树结构 -->
						<div class="col-sm-4 b-r" style="margin-top: 2%;">
							<div id="treeview" class="treeview pre-scrollable">
								<ul class="list-group">
								</ul>
							</div>
						</div>
						<!-- 操作权限 -->
						<form id="checkFormId" style="margin-top: 2%;">
							<div style="width: 68%; border-bottom: 1px solid #000000; margin-left: 34%; height: 38px; line-height: 38px; font-weight: bold; font-size: 13px;">
								<span id="menuTitleSpan" style="padding-left: 30%;" class="text-center"></span>
							</div>
							<div class="col-lg-4 col-sm-4 col-xs-4">
								<div class="checkbox">
									<label> <input type="checkbox" id="VISIT" value=""
										class="checkbox-blue role"> <span class="text">可访问</span>
									</label>
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-xs-4">
								<div class="checkbox">
									<label> <input type="checkbox" id="INSERT"
										class="checkbox-blue role"> <span class="text">新增</span>
									</label>
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-xs-4">
								<div class="checkbox">
									<label> <input type="checkbox" id="UPDATE"
										class="checkbox-blue role"> <span class="text">修改</span>
									</label>
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-xs-4">
								<div class="checkbox">
									<label> <input type="checkbox" id="DELETE"
										class=" checkbox-blue role"> <span class="text">删除</span>
									</label>
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-xs-4">
								<div class="checkbox">
									<label> <input type="checkbox" id="IMPORT"
										class="checkbox-blue role"> <span class="text">导入</span>
									</label>
								</div>
							</div>
							<div class="col-lg-4 col-sm-4 col-xs-4">
								<div class="checkbox">
									<label> <input type="checkbox" id="EXPORT"
										class="checkbox-blue role"> <span class="text">导出</span>
									</label>
								</div>
							</div>
						</form>
						<div class="col-sm-4" style="margin-left: 12%;">
							<button id="btnDel" type="button" class="btn btn-primary btn-delete"onclick="saveRoleMenu()">确定</button>
							<button id="reset" type="reset" class="btn btn-primary" onclick="resetCheckBox()">重置</button>
						</div>
					</div><!-- end row -->
				</div>
				<div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
                </div>

            </div>
        </div>
    </div><!-- end deleteModal -->

<!-- 全局js -->
<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
<!-- 兼容ie9及以下 -->
<script src="<%=basePath%>/js/json2.js"></script>
<script src="<%=basePath%>/js/common/util.js"></script>
<script src="<%=basePath%>/js/common/role-handler.js"></script>
<script src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.js"></script>
<script src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
<!-- toastr 提示信息工具 -->
<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
<!-- util -->
<script src="<%=basePath%>/js/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>
<script src="rolelist.js"></script>
</body>
</html>