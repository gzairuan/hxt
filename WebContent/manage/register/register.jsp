<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <% String basePath = request.getContextPath(); %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title>学校注册--基本资料</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico"> 
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrap-treeview/bootstrap-treeview.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">

<style type="text/css">
body {
	padding-top: 50px;
}

fieldset {
	border: thin solid #ccc;
	border-radius: 4px;
	padding: 20px;
	padding-left: 40px;
	background: #fbfbfb;
}

legend {
	color: #678;
}

.form-control {
	width: 95%;
}

label small {
	color: #678 !important;
}

span.req {
	color: maroon;
	font-size: 20%;
}
</style>
</head>

<body class="fixed-sidebar full-height-layout">
	<div class="row border-bottom">
		<nav class="navbar navbar-fixed-top" role="navigation"
			style="margin-bottom: 0">
			<div class="navbar-header">
				<a class="minimalize-styl-3" href="http://www.hinear.com" target="_black" style="font-size: 18px;color: black;">
                	<img alt="好校通" src="<%=basePath%>/img/logo.png" width="30" height="30" style="margin-right: 5px;">好校通 
				</a>
			</div>
			<div>
				<ul class="nav navbar-top-links navbar-right">
					<li>
						<a type="button" href="http://www.hinear.com" target="_black"> <span class="label label-primary">联系我们</span> </a>
					</li>
					<li>
						<a type="button" href="<%=basePath%>/login.jsp"><span class="label label-success">登录</span></a>
					</li>
					<li>
						<a type="button" href="http://www.hinear.com/haonianhua.html" target="_black"><span class="label label-info" style="background-color:#2c4762">手机客户端下载</span></a>
					</li>
				</ul>
			</div>

		</nav>

	</div>
	<div class="container" style="margin-top:1cm;">
		<div class="row">
			<form class="form-horizontal" method="post" id="registerForm" role="form">
				<fieldset>
					<!-- Form Name -->
					<legend class="text-center">
						请填写贵校基本资料 <span
							style="margin-left: 800px; color: red; font-size: small">*表示必填</span>
					</legend>

					<!-- Text input-->
					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput"><span class="req">*</span> 学校校名:</label>
						<div class="col-md-4">
							<input id="sName" name="sName" placeholder="学校名称"
								class="form-control input-md" required type="text">
						</div>
					</div>
					<div class="hr-line-dashed"></div>
					<!-- Text input-->
					<div class="form-group">
						<label class="col-md-4 control-label" for="domainName"><span class="req">*</span> 所属区域:</label>
							<input type="hidden" id="domainId" required="" name="domainId" value="">
						<div class="col-md-4">
							<input id="domainName" name="domainName" placeholder="点击选择所属区域"
								class="form-control input-md" required type="text" readonly
								title="选择区域" data-container="body" data-toggle="popover" data-placement="bottom" 
								data-content="" data-html="">
							 <!-- <div id="treeview"></div> -->
						</div>
					</div>
					<div class="hr-line-dashed"></div>
					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput"><span class="req">*</span> 学校地址:</label>
						<div class="col-md-4">
							<input id="sAddress" name="sAddress" placeholder="学校详细地址"
								class="form-control input-md" required type="text">
						</div>
					</div>
					<div class="hr-line-dashed"></div>
					<!-- Text input-->
					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput"><span class="req">*</span> 姓名:</label>
						<div class="col-md-4">
							<input id="linkName" name="linkName" placeholder="您的姓名"
								class="form-control input-md" required type="text">
						</div>
					</div>
					<div class="hr-line-dashed"></div>
					<!-- Text input-->
					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput"><span class="req">*</span> 手机号码:</label>
						<div class="col-md-4">
							<input id="mobile" name="mobile" maxlength="13"
								placeholder="13位手机号码" onkeyup="validatephone(this)"
								class="form-control input-md phone" required type="text">
						</div>
					</div>
					<div class="hr-line-dashed"></div>
					<!-- Text input-->
					<div class="form-group">
						<label class="col-md-4 control-label" for="textinput">留言:</label>
						<div class="col-md-4">
							<textarea rows="3" id="remark" name="remark" placeholder="这里可以给我们留言"
								class="form-control input-md"  type="text"></textarea>
						</div>
					</div>
					<!-- Button -->
					<div class="form-group">
						<label class="col-md-4 control-label" for="singlebutton">
						</label>
						<div class="col-md-4">
							<button id="submitId" name="singlebutton"
								onclick="submitregister()" class="btn btn-primary">提交申请</button>
						</div>
					</div>
					<hr>
				</fieldset>
			</form>
		</div>
	</div>

<!-- 全局js -->
<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
<!-- 兼容ie9及以下 -->
<script src="<%=basePath%>/js/json2.js"></script>
<!-- toastr 提示信息工具 -->
<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
<!-- util -->
<script src="<%=basePath%>/js/common/util.js"></script>
<script src="<%=basePath%>/js/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>
<script src="register.js"></script>

</body>
</html>