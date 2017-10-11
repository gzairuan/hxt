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
<title>每日食谱</title>
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
<!-- 日期选择 -->
<link
	href="<%=basePath%>/css/plugins/datetimepicker/bootstrap-datetimepicker.min.css"
	rel="stylesheet">
<!-- table -->
<link
	href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.min.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/editable/bootstrap-editable.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
</head>
<body class="gray-bg">
	<!-- 包装内容 动画 从右方进入 -->
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- 面板START -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>每日食谱</h3>
			</div>
			<!-- 内容START -->
			<div class="ibox-content">
				<!-- 查询窗口 -->
				<div class="box-body no-padding">
					<div class="form-horizontal" role="form">
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-5 control-label" for="queStartDate">开始日期：</label>
								<div class="col-md-7">
									<div class="input-group date" id="queStartDateGroup">
										<input type="text" id="queStartDate" class="form-control" readonly="readonly"/>
									    <span class="input-group-addon" >
									        <span class="glyphicon glyphicon-calendar"></span>
									    </span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-5 control-label" for="queEndDate">结束日期：</label>
								<div class="col-md-7">
									<div class="input-group date" id="queEndDateGroup">
										<input type="text" id="queEndDate" class="form-control" readonly="readonly"/>
										<span class="input-group-addon" >
									        <span class="glyphicon glyphicon-calendar"></span>
									    </span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<div class="col-md-4">
									<a id="btnSearch" type="button" class="btn btn-sm btn-primary" onclick="searchData()">搜索</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="toolbar">
					<button class="btn btn-sm btn-primary add-role"  data-toggle="modal" style="display: none;"
						data-target="#addModal">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
				</div>
				<table id="table" class="table-role"></table>
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
					<div class="box-body no-padding">
						<form id="addForm" class="form-horizontal" role="form">
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-md-4 control-label" for="addDate">日期：</label>
									<div class="col-md-6">
										<div class="input-group date" id="addDateGroup">
										<input type="text" id="addDate" name="date" class="form-control" readonly="readonly"/>
										<span class="input-group-addon" >
									        <span class="glyphicon glyphicon-calendar"></span>
									    </span>
									</div>
									</div>
								</div>
							</div>
							<div id="addToolbar">
								<a type="button" id="addRecipe" class="btn btn-xs btn-primary">
									添加餐点
								</a>
							</div>
							<table id="addTable"></table>
							<div style="size: 5px;margin-top: 5px;">
								<font color="#DD1144">注意：</font>如填写了食物描叙，餐点不能为空
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
					<button id="delBtnOk" type="button" class="btn btn-delete"
						data-dismiss="modal">确定</button>
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
	<script src="<%=basePath%>/js/plugins/editable/bootstrap-editable.min.js"></script>
	<script src="<%=basePath%>/js/plugins/editable/bootstrap-table-editable.js"></script>
	<!-- 日期选择 -->
	<script
		src="<%=basePath%>/js/plugins/datetimepicker/bootstrap-datetimepicker.min.js"></script>
	<script
		src="<%=basePath%>/js/plugins/datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
	
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
	<script src="cookbook.js?v=1.1"></script>
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
</body>
</html>