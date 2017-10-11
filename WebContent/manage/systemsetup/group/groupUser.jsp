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
<title>用户分组</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico">
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css" rel="stylesheet">
<!-- 表格 -->
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.min.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">	
</head>
<body class="gray-bg">
	<!-- 包装内容 动画 从右方进入 -->
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- 面板 -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>用户分组</h5>
			</div>
			<div class="ibox-context">
				<div class="form-horizontal" role="form">
					<div class="box-body">
						<div class="col-md-6 col-sm-12">
							<label class="col-md-2 col-sm-2 control-label"
								for="editGroupName" style="padding-left: 0px;width: auto;">组名：</label>
							<div class="col-md-4 col-sm-4" style="padding-left: 0px;padding-right: 0px;">
								<select id="selectGroupId" onchange="changeGroupList()" class="form-control"></select>
							</div>
						</div>
					</div>
				</div>
				<div class="box-body" style="padding-top: 0px;">
					<div class="col-sm-6">
						<div class="box box-primary">
							<div class="box-header">
								<h5 class="box-title" style="font-size:14px; float: left;">绑定该组的用户</h5>
								<button onclick="shiftOutGroup()" class="btn btn-sm close fa fa-arrow-right" style="float: right;" title="用户移出教师组"></button>
							</div>
							<div class="box-body">
								<table id="tableYet"></table>
							</div>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="box box-primary">
							<div class="box-header">
								<h5 class="box-title" style="font-size:14px; float: right;">未绑定该组的用户</h5>
								<button onclick="shiftInGroup()" class="btn btn-sm close fa fa-arrow-left" style="float: left;" title="用户绑定教师组"></button>
							</div>
							<div class="box-body">
								<table id="tableNot"></table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- 全局js -->
	<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
	<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
	<!-- 表格js -->
	<script src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.min.js"></script>
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
	<!-- 在util之前引入 -->
	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
		
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
	
	<script src="groupUser.js"></script>
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
</body>
</html>