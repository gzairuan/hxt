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
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title>学校管理</title>
<link rel="shortcut icon" href="../icons/favicon.ico"> 
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">	
<link href="<%=basePath%>/css/plugins/bootstrap-treeview/bootstrap-treeview.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <!-- Panel Other -->
        <div class="ibox float-e-margins">
            <div class="ibox-title">
				<h4>学校管理</h4>
			</div>
			<div class="ibox-content">
				<div class="example-box" role="form">
            		<div class="row form-inline margin-bottom-6">
						<div class="form-group col-md-4">
							<label for="searchSchool" class="form-label">学校名称：</label>
							<input id="searchSchool" type="text" class="form-control">
						</div>
						<div class="form-group col-md-4">
							<label for="searchDomain">所属区域：</label>
							<input id="searchDomain" type="text" class="form-control">
						</div>
						<div class="form-group col-md-1">
							<a id="btnSearch" type="button" class="btn btn-sm btn-primary"
								onclick="queryData()">搜索</a>
						</div>
					</div>
            	</div>
				<div  id="toolbar">
					<button type="button" id="btnAdd" class="btn btn-primary btn-sm"
						data-toggle="modal" data-target="#addModal" data-flag="add">
						<span class="fa  fa-plus" aria-hidden="true">新增</span>
					</button>
				
					<!--
					<button type="button" id="btnAdd" class="btn btn-primary btn-sm"
						data-toggle="modal" data-target="#addModal">
						<span class="fa   fa-close" aria-hidden="true">批量删除</span>
					</button> -->
				</div>
				<!-- table内容 -->
				<table id="tableSchoolList">
					
				</table>
			</div>
		</div>
	</div><!-- end wrapper -->
	
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
                    <h5 class="modal-title" id="addModalTitle">学校新增</h5>
                </div>
                <div class="modal-body">
					<!-- 模态框主题内容 -->
					<form id="addForm" class="form-horizontal">
						<div class="form-group">
							<label class="col-md-4 control-label" for="domainName"> 所属区域:</label>
							<input type="hidden" id="domainId" required="" name="domainId" value="">
							<div class="col-md-6">
								<input id="domainName" name="domainName" placeholder="点击选择所属区域"
									class="form-control input-md" required type="text" readonly 
									title="选择区域" data-container="body" data-toggle="popover" data-placement="bottom" 
									data-content="" data-html=""><span class="help-block required"></span>
							</div>
							<font color="red">*</font>
						</div>
						<!-- Text input-->
						<div class="form-group">
							<label class="col-md-4 control-label" for="schoolName">学校名称:</label>
							<div class="col-md-6">
								<input id="schoolName" name="schoolName"
									class="form-control input-md" required="required" type="text">
								<span class="help-block required"></span>
							</div>
							<font color="red">*</font>
						</div>
						<div class="form-group">
							<label class="col-md-4 control-label" for="schoolAddress">学校地址：</label>
							<div class="col-md-6">
								<input id="schoolAddress" name="schoolAddress"
									class="form-control input-md" required="required" type="text">
								<span class="help-block"> </span>
							</div>
							<font color="red">*</font>
						</div>
						<!-- Text input-->
						<div class="form-group">
							<label class="col-md-4 control-label" for="linkName">联系人:</label>
							<div class="col-md-6">
								<input id="linkName" name="linkName"
									class="form-control input-md" required="required" type="text">
								<span class="help-block"> </span>
							</div>
							<font color="red">*</font>
						</div>
						<div class="form-group">
							<label class="col-md-4 control-label" for="mobile">联系号码:</label>
							<div class="col-md-6">
								<input id="mobile" name="mobile"
									class="form-control input-md" required="required" type="text">
								<span class="help-block"> </span>
							</div>
							<font color="red">*</font>
						</div>
						<div class="form-group">
							<label class="col-md-4 control-label" for="remark">备注:</label>
							<div class="col-md-6">
								<textarea name="remark" class="form-control" id="remark"
									rows="4" placeholder="请输入内容"></textarea>
							</div>
						</div>
					</form>
				</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnSave" onclick="addSchoolNotice()">保存</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div><!-- end addModal -->
    
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
                    <button id="btnDel" type="button" class="btn btn-delete" data-dismiss="modal">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div><!-- end deleteModal -->
    
<!-- 全局js -->
<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
<!-- 兼容ie9及以下 -->
<script src="<%=basePath%>/js/json2.js"></script>
<script src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.js"></script>
<script src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
<!-- 在util之前引入 -->
<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
<!-- util -->
<script src="<%=basePath%>/js/common/util.js"></script>
<script src="<%=basePath%>/js/common/util-table.js"></script>
<script src="<%=basePath%>/js/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>
<script src="schoollist.js"></script>
<script src="<%=basePath%>/js/common/role-handler.js"></script>

</body>
</html>