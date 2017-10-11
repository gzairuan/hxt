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
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

<title>日志管理</title>

<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico">
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/multiple-select/bootstrap-multiselect.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
	
	<style type="text/css">
		.example-box {
		    position: relative;
		    padding: 15px 0 15px 0;
		    margin-right: 0;
		    margin-left: 0;
		}
		.margin-bottom-10 {
		    margin-bottom: 10px!important;
		}
	</style>

</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- Panel -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>日志管理</h5>
			</div>
			<!-- ibox 主题内容 -->
			<div class="ibox-content">
				<!--查询窗体-->
				<div class="example-box" role="form">
					<div class="row form-inline margin-bottom-10">
						<div class="form-group col-md-6">
							<label for="startDate">开始日期：</label>
							<input id="startDate" type="text" class="form-control">
							<label for="endDate">至</label>
							<input id="endDate" type="text" class="form-control">
						</div>
						<div class="form-group col-md-4">
							<label for="keyword">关键字：</label>
							<input id="keyword" type="text" class="form-control" placeholder="标题或内容">
						</div>
						<div class="form-group col-md-2">
							<a id="btnSearch" type="button" class="btn btn-sm btn-primary"
								onclick="searchData()">搜索</a>
						</div>
					</div>
				</div>
				
				<table id="table"></table>
				
			</div>
		</div>
	</div>
	<!-- table 删除modal -->
	<div id="deleteModal" class="modal fade" role='dialog' tabindex="-1"
		aria-labelledby="delModalLabel" data-backdrop="true"
		aria-hidden="true">
		<div class="modal-dialog" style="width: 20%">
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
					<button id="btnDel" type="button" class="btn btn-delete"
						data-dismiss="modal">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>

			</div>
		</div>
	</div>
	
	<!-- 全局js -->
    <script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
    <script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
    <script src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.js"></script>
    <script src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
    <script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
    <script src="log.js?v=1.1"></script>
</body>
</html>