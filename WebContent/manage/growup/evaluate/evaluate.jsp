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
<title>每周评价</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico">
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet">
<!-- 日期控件 -->
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>每周评价</h3>
			</div>
			<div class="ibox-content">
			<!-- ibox 主体内容 -->
				<!-- 查询窗口 -->
				<form role="form" class="form-horizontal">
					<div class="box-body no-padding">
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
					</div>
					<div class="box-body no-padding">
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-5 control-label" for="queClassID">班级：</label>
								<div class="col-md-7">
									<select id="queClassID" class="form-control">
										<option value="0">全部</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-5 control-label" for="queKeyword">关键字：</label>
								<div class="col-md-7">
									<input type="text" class="form-control" id="queKeyword" >
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
				</form>
				
				<!-- toolbar 按钮 -->
				<div id="toolbar" class="btn-group">
					<button id="btn-add" type="button"
						class="btn btn-sm btn-primary add-role" data-falg="add"
						data-toggle="modal" data-target="#addOrEditModal">
						<span class="fa fa-plus" aria-hidden="true"></span>新增
					</button>
				</div>
				<!-- 表格内容 -->
				<table id="table" class="table-role">
				</table>

			</div>
			<!-- end ibox-content  -->
		</div>
	</div>


	<!-- table 新增 modal -->
	<div class="modal fade" id="addOrEditModal" tabindex="-1" role="dialog"
		aria-lablledby="healthModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<!-- 会话窗口 -->
			<div class="modal-content">
				<!-- 模态框内容 -->
				<div class="modal-header">
					<!-- 模态框头 -->
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<!-- 右上角关闭按钮“x” -->
					<h4 class="modal-title" id="addModalTitle">新增每周评价</h4>
				</div>
				<div class="modal-body">
					<div class="box-body no-padding">
						<form id="addForm" class="form-horizontal" role="form">
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-4 control-label" for="addClassID">班级：</label>
									<div class="col-md-6">
										<select class="form-control" id="addClassID" name="classID" onchange="changeClass()"></select>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-4 control-label" for="addStudentID">学生：</label>
									<div class="col-md-6">
										<select class="form-control" id="addStudentID" name="studentID"></select>
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-md-2 control-label" for="addContent">评价：</label>
									<div class="col-md-9">
										<textarea rows="5" id="addContent" name="content" class="form-control" placeholder="请输入评价内容"></textarea>
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

	<!-- 评价详情 -->
	<div class="modal fade" id="detailModal" tabindex="-1" role="dialog"
		aria-lablledby="detailModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<!-- 会话窗口 -->
			<div class="modal-content">
				<!-- 模态框内容 -->
				<div class="modal-header">
					<!-- 模态框头 -->
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<!-- 右上角关闭按钮“x” -->
					<h4 class="modal-title" id="detailModalLabel">查看评价详情</h4>
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						<div class="box-body no-padding">
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-4 control-label" for="detailStudent">学生姓名：</label>
									<div class="col-md-6">
										<input id="detailStudent" type="text" class="form-control" readonly="readonly">
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-4 control-label" for="detailClass">所属班级：</label>
									<div class="col-md-6">
										<input id="detailClass" type="text" class="form-control" readonly="readonly">
									</div>
								</div>
							</div>
						</div>
						<div class="box-body no-padding">
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-4 control-label" for="detailEvaUser">评价人：</label>
									<div class="col-md-6">
										<input id="detailEvaUser" type="text" class="form-control" readonly="readonly">
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-4 control-label" for="detailEvaDate">评价日期：</label>
									<div class="col-md-6">
										<input id="detailEvaDate" type="text" class="form-control" readonly="readonly">
									</div>
								</div>
							</div>
						</div>
						<div class="box-body no-padding">
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-md-2 control-label" for="detailContent">评价：</label>
									<div class="col-md-9">
										<textarea readonly="readonly" rows="5" id="detailContent" class="form-control"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
					<button id="btnDel" type="button" class="btn btn-delete"
						data-dismiss="modal">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>

			</div>
		</div>
	</div>
	<!-- end deleteModal -->

	<!-- 全局js -->
	<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
	<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
	<!-- 兼容ie9及以下 -->
	<script src="<%=basePath%>/js/json2.js"></script>
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.js"></script>
	<script
		src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
	<script
		src="<%=basePath%>/js/plugins/datetimepicker/bootstrap-datetimepicker.min.js"></script>
	<script
		src="<%=basePath%>/js/plugins/datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js"></script>

	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
	<script type="text/javascript"
		src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>

	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>

	<script type="text/javascript" src="evaluate.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/common/role-handler.js"></script>
</body>
</html>