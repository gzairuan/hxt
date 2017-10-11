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
<title>菜单管理</title>
<link rel="shortcut icon" href="../icons/favicon.ico"> 
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">

<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrap-treeview/bootstrap-treeview.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet">

<style type="text/css" id="treeview5-style"> 
.treeview .list-group-item{cursor:pointer};
.treeview span.indent{margin-left:10px;margin-right:10px};
.treeview span.icon{width:12px;margin-right:5px};
.treeview .node-disabled{color:silver;cursor:not-allowed};
.node-treeview{color:#428bca;};
.node-treeview:not(.node-disabled):hover{background-color:#F5F5F5;} 
</style>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>菜单管理</h3>
			</div>
			<!-- ibox 内容面板 -->
			<div class="ibox-content areabox-content">
				<div class="row" >
					<!-- 左边区域树结构 -->
					<div class="col-sm-3 b-r" style="height: 380px;">
						<div id="treeview" class="treeview pre-scrollable" style="max-height: 100%; overflow-y: scroll;">
							<ul class="list-group">
							</ul>
						</div>
					</div>
					<div class="col-sm-5">
						<!-- 头部 -->
						<div class="box-header with-border">
							<div class="form-group">
		                        <button type="button" class="btn btn-primary" data-btn-type="addRoot" onclick="addMenuNode()">
		                            <span class="fa fa-plus"> 新增同级菜单</span>
		                        </button>
		                        <button type="button" class="btn btn-primary" data-btn-type="addRoot" onclick="addChildMenuNode()">
		                            <span class="fa  fa-plus-square"> 新增子菜单</span>
		                        </button>
		                        <button type="button" class="btn btn-primary" data-btn-type="edit" onclick="editMenuNode()">
		                            <span class="fa fa-edit"> 编辑</span>
		                        </button>
		                        <button type="button" class="btn btn-primary" data-btn-type="delete" onclick="deleteMenuNode()">
		                            <span class="fa fa-remove"> 删除</span>
		                        </button>
		                        <!-- <button type="button" class="btn btn-default" data-btn-type="delete" onclick="saveMenuNode()">
		                        	<span class="fa fa-save"> 保存</span>
		                        </button> -->
		                      </div>
						</div>
						<!-- <div class="col-xs-offset-1"> -->
						<form class="form-horizontal bv-form" id="menuFormId" style="margin-top: 3%;">
							<div class="col-md-12">
								<div class="form-group has-feedback">
									<label class="control-label col-sm-3">上级菜单：</label>
									<div class="col-sm-9">
										<input type="text" id="rootmenuId" name="rootmenuId" class="form-control">
									</div>
								</div>
								<div class="form-group has-feedback">
									<label class="control-label col-sm-3">菜单编码：</label>
									<div class="col-sm-9">
										<input type="text" id="modulecodeId" name="modulecodeId" class="form-control">
									</div>
								</div>
								<div class="form-group has-feedback">
									<label class="control-label col-sm-3">菜单名称：</label>
									<div class="col-sm-9">
										<input type="text" id="menunameId" name="menunameId" class="form-control">
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-3">URL：</label>
									<div class="col-sm-9">
										<input type="text" id="munuurlId" name="munuurlId" class="form-control">
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-3">备注：</label>
									<div class="col-sm-9">
										<input type="text" id="remarkId" name="remarkId" class="form-control">
									</div>
								</div>
								<div class="form-group" style="margin-left: 40%;">
									<button type="button" class="btn btn-primary" onclick="saveBtn()"><span class="fa fa-save"> 保存</span></button>
									<button type="button" class="btn btn-primary" onclick="cancelBtn()">取消</button>
								</div>
							</div>
						</form> 
						<!-- </div> -->
					</div>
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
<script src="rolemenulist.js"></script>
</body>
</html>