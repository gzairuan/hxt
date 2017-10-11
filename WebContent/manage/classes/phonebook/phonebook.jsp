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
<title>通讯录</title>
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
</head>
<body class="gray-bg">
	<!-- 包装内容 动画 从右方进入 -->
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- 面板START -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>通讯录</h3>
			</div>
			<!-- 内容START -->
			<div class="ibox-content">
				<!-- 在此添加查询窗口 -->
				<div class="box-body no-padding">
					<div class="form-horizontal" role="form">
						<div class="col-md-3">
							<div class="form-group">
								<label class="col-md-4 control-label" for="queName">姓名：</label>
								<div class="col-md-6">
									<input type="text" id="queName" class="form-control" />
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
								<label class="col-md-4 control-label" for="quePhone">电话：</label>
								<div class="col-md-6">
									<input type="text" id="quePhone" class="form-control"/>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
								<label class="col-md-4 control-label" for="queClassID">班级：</label>
								<div class="col-md-6">
									<select id="queClassID" class="form-control">
									</select>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
								<div class="col-md-4">
									<a type="button" class="btn btn-sm btn-primary" onclick="searchData()">搜索</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- table -->
				<table id="table"></table>
			</div>
			<!-- 内容END -->
		</div>
		<!-- 面板END -->
	</div>

	<!-- 全局公用JS -->
	<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
	<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
	<!-- 兼容ie9及以下JSON -->
	<script src="<%=basePath%>/js/json2.js"></script>
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
	<!-- table -->
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.min.js"></script>
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.min.js"></script>
	<!-- 界面js -->
	<script src="phonebook.js?v=1.4"></script>
	<!-- role-handler must be at end position-->
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
</body>
</html>