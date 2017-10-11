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
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<title>科目管理</title>
<!-- 图标 -->
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico">
<!-- 全局公用CSS -->
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7"
	rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0"
	rel="stylesheet">
<!-- base CSS -->
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<!-- table -->
<link
	href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.min.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
</head>
<body class="gray-bg">
	<!-- 包装内容 动画 从右方进入 -->
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- 面板START -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>科目管理</h3>
			</div>
			<!-- 内容START -->
			<div class="ibox-content">
				<!-- 在此添加查询窗口 -->
				<!-- 工具栏toolbar -->
				<div id="toolbar">
					<button type="button" class="btn btn-primary btn-sm add-role"
						data-toggle="modal" data-target="#addModal">
						<span class="glyphicon glyphicon-plus" aria-hidden="true">新增</span>
					</button>
					<button type="button" class="btn btn-danger btn-sm delete-role"
						data-toggle="modal" data-target="#delModal">
						<span class="glyphicon glyphicon-remove" aria-hidden="true">删除</span>
					</button>
				</div>
				<!-- table -->
				<table id="table"></table>
			</div>
			<!-- 内容END -->
		</div>
		<!-- 面板END -->
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
					<h5 class="modal-title" id="addModalTitle">新增</h5>
				</div>
				<div class="modal-body">
					<!-- 模态框主题内容布局 -->
					<form id="addForm" class="form-horizontal" role="form">
						<div class="form-group">
							<label class="col-md-3 control-label" for="addSubjectName">科目名称<font color="red">*</font>：</label>
							<div class="col-md-6">
								<input type="text" name="subjectName" id="addSubjectName" class="form-control" required="required"/>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button id="addBtnSave" type="button" class="btn btn-primary">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!-- table 删除modal -->
	<div id="delModal" class="modal fade" role='dialog' tabindex="-1"
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
					<button id="delBtnOk" type="button" class="btn btn-delete" data-dismiss="modal">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>

			</div>
		</div>
	</div>

	<!-- 全局公用JS -->
	<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
	<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
	<!-- 兼容ie9及以下JSON -->
	<script src="<%=basePath%>/js/json2.js"></script>
	<!-- table -->
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.min.js"></script>
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.min.js"></script>
		
	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
	<!-- 界面js -->
	<script src="subject.js?v=1.0"></script>
	<!-- role-handler must be at end position-->
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
</body>
</html>