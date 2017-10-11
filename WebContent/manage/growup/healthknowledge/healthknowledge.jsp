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
<title>健康常识</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico"> 
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>健康常识</h3>
			</div>
			<div class="ibox-content"> <!-- ibox 主体内容 -->
				<form id="formSearch" class="form-horizontal">
						<div class="form-group" >
							<label class="control-label col-sm-2" for="qry_title">标题：</label>
							<div class="col-sm-2">
								<input id="qry_tile" name='qry_tile' class="form-control" >
							</div>
							<label for="qry_content" class="control-label col-sm-2">内容：</label>
							<div class="col-sm-2">
								<input id="qry_content" name='qry_content' class="form-control" >
							</div>
							<div class="col-sm-2" style="text-align: left;">
								<button type="button" style="margin-left: 90px" id="btn_query"
									class="btn btn-primary" onclick="searchData()">查询</button>
							</div>
						</div>
					</form>
				<!-- table 内容主体 -->
				<div class="row row-lg">
                    <div class="col-sm-12">
                        <!-- Example Card View -->
                        <div class="example-wrap">
                            <div class="example">
								<div id="toolbar">
									<button id="btn-add" type="button" class="btn btn-sm btn-primary add-role" data-flag="add" data-toggle="modal" data-target="#addOrEditModal">
										<span class="fa fa-plus" aria-hidden="true"></span> 新增
									</button>
								</div>
								
								<!-- 表格内容 -->
                                <table id="healthKnowledgeTable" class="table-role"></table>
                                
                            </div>
                        </div>
                        <!-- End Example Card View -->
                    </div>
                </div>
			</div>
		</div>
	</div>
	
	<!-- table 新增 modal -->
    <div class="modal fade" id="addOrEditModal" tabindex="-1" role="dialog"
        aria-lablledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" style="width: 50%; margin: 5% auto;">
            <!-- 会话窗口 -->
            <div class="modal-content">
                <!-- 模态框内容 -->
                <div class="modal-header">
                    <!-- 模态框头 -->
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <!-- 右上角关闭按钮“x” -->
                    <h4 class="modal-title" id="addModalTitle">新增健康常识</h4>
                </div>
                <div class="modal-body" style="overflow-y: scroll;">
                    <!-- 模态框主题内容  -->
					<form id="modalform" class="form-horizontal">
 						<div class="form-group"> 
							<label class="control-label col-md-2" for="cid">班级：</label>
							<div class="col-sm-4">
								<select id="cid" name="cid" class="form-control" style="font-size: 12px; width: 100%;">
									<option value="0">请选择班级</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">标题：</label>
							<div class="col-md-8">
								<input class="form-control" type="text" id="title" name="title" placeholder="请输入标题">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-2">内容：</label>
							<div class="col-md-8">
								<textarea class="form-control" rows="10" id="content" name="content" placeholder="请输入内容"></textarea>
							</div>
							
						</div>
						<div class="form-group" id="selectImgDiv" style="display: none">
							<input id="selectImgId" class="file" type="file" data-preview-file-type="text" multiple>
						</div>
					</form>
				</div>
                <div class="modal-footer">
                    <button id="btnSave" type="button" class="btn btn-primary">保存</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
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
<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/plugins/bootstrapvalidator/bootstrapValidator.min.js?v=0.5.3"></script>
 
<script src="<%=basePath%>/js/common/util.js"></script>
<script src="healthknowledge.js"></script>
<script src="<%=basePath%>/js/common/role-handler.js"></script>
	
</body>
</html>