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
<title>考勤时间</title>
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
<link href="<%=basePath%>/datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
</head>
<body class="gray-bg">
	<!-- 包装内容 动画 从右方进入 -->
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- 面板START -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>考勤时间</h3>
			</div>
			<!-- 内容START -->
			<div class="ibox-content">
			
				<div class="box-body no-padding">
					<form class="form-horizontal" role="form" id="submitForm">
						<div class="col-md-12 days">
							<div class="form-group">
								<label class="col-md-2 col-sm-3 control-label" for="upTime">上学时间：</label>
								<div class="col-md-4 col-sm-6">
									<div class="input-group date" id="upTimeGroup">
										<input type="text" name="upTime" id="upTime" class="form-control" readonly="readonly"/>
									    <span class="input-group-addon" >
									        <i data-time-icon="glyphicon glyphicon-time">
			      							</i>
									    </span>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 col-sm-3 control-label" for="downTime">放学时间：</label>
								<div class="col-md-4 col-sm-6">
									<div class="input-group date" id="downTimeGroup">
										<input type="text" name="downTime" id="downTime" class="form-control" readonly="readonly"/>
										<span class="input-group-addon" >
									        <i data-time-icon="glyphicon glyphicon-time">
			      							</i>
									    </span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 timing" style="display: none;">
							<div class="form-group">
								<label class="col-md-4 col-sm-3 control-label">上午时间点：</label>
							</div>
							<div class="form-group">
								<label class="col-md-4 col-sm-3 control-label" for="amUpTime">上学时间：</label>
								<div class="col-md-6 col-sm-6">
									<div class="input-group date" id="amUpTimeGroup">
										<input type="text" name="amUpTime" id="amUpTime" class="form-control" readonly="readonly"/>
									    <span class="input-group-addon" >
									        <i data-time-icon="glyphicon glyphicon-time">
			      							</i>
									    </span>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-4 col-sm-3 control-label" for="amDownTime">放学时间：</label>
								<div class="col-md-6 col-sm-6">
									<div class="input-group date" id="amDownTimeGroup">
										<input type="text" name="amDownTime" id="amDownTime" class="form-control" readonly="readonly"/>
										<span class="input-group-addon" >
									        <i data-time-icon="glyphicon glyphicon-time">
			      							</i>
									    </span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 timing" style="display: none;">
							<div class="form-group">
								<label class="col-md-4 col-sm-3 control-label">下午时间点：</label>
							</div>
							<div class="form-group">
								<label class="col-md-4 col-sm-3 control-label" for="pmUpTime">上学时间：</label>
								<div class="col-md-6 col-sm-6">
									<div class="input-group date" id="pmUpTimeGroup">
										<input type="text" name="pmUpTime" id="pmUpTime" class="form-control" readonly="readonly"/>
									    <span class="input-group-addon" >
									        <i data-time-icon="glyphicon glyphicon-time">
			      							</i>
									    </span>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-4 col-sm-3 control-label" for="pmDownTime">放学时间：</label>
								<div class="col-md-6 col-sm-6">
									<div class="input-group date" id="pmDownTimeGroup">
										<input type="text" name="pmDownTime" id="pmDownTime" class="form-control" readonly="readonly"/>
										<span class="input-group-addon" >
									        <i data-time-icon="glyphicon glyphicon-time">
			      							</i>
									    </span>
									</div>
								</div>
							</div>
						</div>
						<input id="isOpen" style="display: none;" name="isopen" value="0"/>
						<div class="col-md-12">
							<div class="form-group">
								<div class="col-md-2 col-md-offset-2 col-sm-3 col-sm-offset-3">
									<button id="btnSave" type="button" class="col-md-12 col-sm-12 btn btn-sm btn-delete" disabled="disabled" onclick="saveSchoolTime()">保存</button>
								</div>
								<div class="col-md-2 col-sm-3">
									<button id="btnOpenTiming" type="button" class="col-md-12 col-sm-12 btn btn-sm btn-primary">开启时间点考勤</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			
			</div>
		</div>
	</div>

	
	<!-- 全局公用JS -->
	<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
	<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
	<!-- 兼容ie9及以下JSON -->
	<script src="<%=basePath%>/js/json2.js"></script>
	<!-- 日期选择 -->
	<script src="<%=basePath%>/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="clocktime.js?v=1.3"></script>
	<!-- role-handler -->
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
	
	
</body>
</html>