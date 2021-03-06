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
<title>晨检信息</title>
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
<!-- 日期选择 -->
<link
	href="<%=basePath%>/css/plugins/datetimepicker/bootstrap-datetimepicker.min.css"
	rel="stylesheet">
</head>
<body class="gray-bg">
	<!-- 包装内容 动画 从右方进入 -->
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- 面板START -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>晨检信息</h3>
			</div>
			<!-- 内容START -->
			<div class="ibox-content">
				<!-- 在此添加查询窗口 -->
				<div class="box-body no-padding">
					<div class="form-horizontal" role="form">
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-5 control-label" for="queStartDate">开始日期：</label>
								<div class="col-md-7">
									<input type="text" id="queStartDate" class="form-control" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-5 control-label" for="queEndDate">结束日期：</label>
								<div class="col-md-7">
									<input type="text" id="queEndDate" class="form-control" />
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-4 control-label" for="queStuName">姓名：</label>
								<div class="col-md-6">
									<input type="text" id="queStuName" class="form-control" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-4 control-label" for="queStuNo">学号：</label>
								<div class="col-md-6">
									<input type="text" id="queStuNo" class="form-control" />
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-4 control-label" for="queClassID">班级：</label>
								<div class="col-md-6">
									<select id="queClassID" class="form-control">
									</select>
								</div>
							</div>
							<div class="form-group">
								<div class="col-sm-12 col-md-4 col-md-offset-2">
									<a type="button" class="btn btn-sm btn-primary"onclick="searchData()">搜索</a>
								</div>
							</div>
						</div>		
					</div>
				</div>
				<!-- 工具栏toolbar -->
				<!-- table -->
				<table id="tableHealthlist"></table>
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
	<!-- table -->
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.min.js"></script>
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.min.js"></script>
	<!-- 界面js -->
	<!-- 日期选择 -->
	<script
		src="<%=basePath%>/js/plugins/datetimepicker/bootstrap-datetimepicker.min.js"></script>
	<script
		src="<%=basePath%>/js/plugins/datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js"></script>
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
	<script src="healthlist.js?v=1.2"></script>
</body>
</html>