<%@page import="com.hinear.hxt.entity.News"%>
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
<title>食谱选项</title>
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
	<!-- 包装内容 动画 从右方进入 -->
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- 面板 -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>食谱选项</h3>
			</div>
			<div class="ibox-content">
				<!-- 表格列表主窗体 -->
				<!-- 表格上班按钮（新增等）的工具条 -->
				<div id="toolbar">
					<button class="btn btn-sm btn-primary add-role" data-toggle="modal"
						data-target="#addModal">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
				</div>
				<!-- 表格内容 -->
				<table id="table">
				</table>
			</div>
		</div>
		<!-- 面板 END -->
	</div>	
	<!-- table 新增 modal -->
	<div class="modal fade" id="addModal" tabindex="-1" role="dialog"
		aria-lablledby="addModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<!-- 会话窗口 -->
			<div class="modal-content">
				<!-- 模态框内容 -->
				<div class="modal-header">
					<!-- 模态框头 -->
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<!-- 右上角关闭按钮“x” -->
					<h5 class="modal-title" id="addModalTitle">新增食谱选项</h5>
				</div>
				<div class="modal-body">
					<!-- 模态框主题内容 -->
					<div class="box-body no-padding">
						<form id="addForm" class="form-horizontal" role="form">
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-md-4 control-label" for="defType">选择编号：</label>
									<div class="col-md-6">
										<input type="text" id="defType" name="defType" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-4 control-label" for="defName">选项名称：</label>
									<div class="col-md-6">
										<input type="text" id="defName" name="defName" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-4 control-label" for="defSEQ">选项排序：</label>
									<div class="col-md-6">
										<input type="number" id="defSEQ" name="defSEQ" class="form-control"/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button id="addBtnSave" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>	
	<!-- table 删除modal -->
	<div id="deleteModal" class="modal fade" role='dialog' tabindex="-1"
		aria-labelledby="delModalLabel" data-backdrop="true"
		aria-hidden="true">
		<div class="modal-dialog modal-sm" role="document">
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
	</div>
	<!--Modal ends here--->
	<!-- 全局js -->
    <script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
    <script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
    <!-- 兼容ie9及以下json -->
	<script src="<%=basePath%>/js/json2.js"></script>
	<!-- 表格js -->
	<script src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.min.js"></script>
	<script src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
	<!-- 在util之前引入 -->
	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
		
	<script src="cookbookoptions.js"></script>
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
	
</body>
</html>