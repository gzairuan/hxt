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
<title>教师通知</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico">
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/multiple-select/bootstrap-multiselect.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/datetimepicker/bootstrap-datetimepicker.min.css"
	rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/upload/fileinput.min.css" rel="stylesheet"> <!-- 文件上传下载 -->

<style type="text/css">
.s_font {
    font-size: 14px;
    border: none;
    background: none;
    font-family: "微软雅黑","Microsoft Yahei",Arial,Helvetica,sans-serif,"宋体";
}
</style>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- Panel -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>教师通知</h3>
			</div>
			<div class="ibox-content">
				<!--查询窗体-->
				<div class="box-body no-padding">
					<div class="form-horizontal" role="form">
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-5 control-label" for="queStartDate">开始日期：</label>
								<div class="col-md-7">
									<input type="text" id="queStartDate" class="form-control"/>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-5 control-label" for="queEndDate">结束日期：</label>
								<div class="col-md-7">
									<input type="text" id="queEndDate" class="form-control"/>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label class="col-md-5 control-label" for="queSendFlag">收发状态：</label>
								<div class="col-md-7">
									<select id="queSendFlag" class="form-control">
										<option selected value="0">接收</option>
										<option value="1">发送</option>
									</select>
								</div>
							</div>
							<div class="form-group">
									<label class="col-md-5 control-label" for="queKeyword">关键字：</label>
									<div class="col-md-7">
										<input type="text" id="queKeyword" class="form-control" placeholder="标题或内容"/>
									</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<div class="col-md-5">
									<a id="btnSearch" type="button" class="btn btn-sm btn-primary"
										onclick="searchData()">搜索</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 表格列表主窗体 -->
				<div id="toolbar" class="btn-group">
					<button class="btn btn-sm btn-primary add-role" data-toggle="modal" style="display: none;"
						data-target="#addModal">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
				</div>
				<!-- 表格内容 -->
				<table id="table">
				</table>
			</div>
		</div>
		<!-- End Panel Other -->
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
					<h5 class="modal-title" id="addModalTitle">新增教师通知</h5>
				</div>
				<div class="modal-body">
				<!-- 模态框主题内容 -->
					<div class="box-body no-padding">
						<form id="addForm" class="form-horizontal" role="form">
							<div class="col-md-12">
								<div class="form-group">
									<label class="control-label">选择教师分组：</label>
									<select id="teacherGroup" name="teacherGroupIds" multiple>
									</select>
								</div>
								<div class="form-group">
									<input name="title" type="text" class="form-control" id="addTitle" placeholder="请输入标题">
								</div>
								<div class="form-group">
									<textarea name="content" class="form-control" id="addContent" rows="5" placeholder="请输入内容"></textarea>
								</div>
								<div class="form-group" id="uploadImgDiv">
		                            <!-- <i class="fa fa-image"></i> -->
									<img alt="图片上传" src="<%=basePath%>/img/uploadImg.png" style="width:20px;height:20px;">
									<input type="button" id="uploadImgId" value="上传图片" class="s_font" onclick="add_img()"></input>
								</div>
								<div class="form-group" id="selectImgDiv" style="display: none;">
									<input id="addImgs" class="form-control file" type="file" multiple>
								</div>
							</div>
						</form>
					</div>
					
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="addNotice()">发布</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

	<!-- table 编辑（修改） modal -->
	<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
		aria-lablledby="editModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<!-- 会话窗口 -->
			<div class="modal-content">
				<!-- 模态框内容 -->
				<div class="modal-header">
					<!-- 模态框头 -->
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<!-- 右上角关闭按钮“x” -->
					<h5 class="modal-title" id="editModalTitle">编辑教师通知</h5>
				</div>
				<div class="modal-body">
					<!-- 模态框主题内容 -->
					<form id="editForm">
						<div class="form-group">
							<label for="edit-title" class="control-label">标题</label> <input
								name="title" type="text" class="form-control" id="editTitle"
								placeholder="请输入标题">
						</div>
						<div class="form-group">
							<label for="edit-content" class="control-label">内容</label>
							<textarea name="content" class="form-control" id="editContent"
								rows="5" placeholder="请输入内容"></textarea>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button id="btnEdit" type="button" class="btn btn-primary">确认</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>


	<!-- table 详情 modal -->
	<div class="modal fade" id="detailModal" tabindex="-1" role="dialog"
		aria-lablledby="detailModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<!-- 回话窗口 -->
			<div class="modal-content">
				<!-- 模态框内容 -->
				<div class="modal-header">
					<!-- 模态框头 -->
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<!-- 右上角关闭按钮“x” -->
					<h5 class="modal-title" id="detailModalLabel">通知详情</h5>
				</div>
				<div class="modal-body">
					<!-- 模态框主题内容 -->
					<div class="form-group">
						<label class="control-label" for="title">通知标题</label> <input
							class="form-control notice-title" readonly>
					</div>
					<div class="form-group">
						<label class="control-label">接收组</label> <input
							class="form-control receive-group" readonly>
					</div>
					<div class="form-group">
						<label class="control-label">发布人</label> <input
							class="form-control issuer" name="name" readonly>
					</div>
					<div class="form-group">
						<label class="control-label">发布日期</label> <input
							class="form-control release-time" readonly>
					</div>
					<div class="form-group">
						<label class="control-label">通知内容</label>
						<textarea rows="5" class="form-control notice-content" readonly></textarea>
					</div>
					<div class="form-group" id="detailImgDiv" style="display: none;">
						<input id="detailImgs" class="form-control file" type="file" multiple>
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
	<!--Modal ends here--->

	<!-- 全局js -->
	<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
	<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
	<!-- 兼容ie9及以下 -->
	<script src="<%=basePath%>/js/json2.js"></script>
	
	<script src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.js"></script>
	<script src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
	<script src="<%=basePath%>/js/plugins/multiple-select/bootstrap-multiselect.js"></script>
	<script src="<%=basePath%>/js/plugins/datetimepicker/bootstrap-datetimepicker.min.js"></script>
	<script src="<%=basePath%>/js/plugins/datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>
   	<!-- 图片文件上传fileinput -->
	<script src="<%=basePath%>/js/plugins/upload/fileinput.js"></script>
	<script src="<%=basePath%>/js/plugins/upload/zh.js"></script>
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/common/util-table.js"></script>
	<script type="text/javascript" src="teachernotice.js"></script>
	<!-- role-handler must be at end position-->
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
</body>
</html>