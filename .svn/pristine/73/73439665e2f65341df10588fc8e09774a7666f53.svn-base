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
<title>学校审核</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico"> 
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <!-- Panel Other -->
        <div class="ibox float-e-margins">
            <div class="ibox-title">	
				<h4>学校审核</h4>
			</div>
			<div class="ibox-content">
				<div class="example-box" role="form">
					<div class="row form-inline">
						<div class="form-group col-xs-11">
							<div class="col-xs-4">
								<label for="q_school" class="form-label">学校名称：</label>
								<input id="q_school" name="q_school" type="text" class="form-control">
							</div>
							<div class="col-xs-4">
								<label for="q_address" class="form-label">学校地址：</label>
								<input id="q_address" name="q_address" type="text" class="form-control">
							</div>
							<div class="col-xs-4">
								<label class="control-label" for="q_checkstate">审核状态:</label>
								<select id="q_checkstate" name='q_checkstate' class="form-control"
									style="font-size: 12px; width: 40%;">
									<option value="" selected="selected">全部</option>
									<option value="1">启用</option>
									<option value="0">禁用</option>
								</select>
							</div>
						</div>
						<div class="form-group col-xs-1">
							<div class="col-sm-1">
								<a id="btnSearch" type="button" class="btn btn-sm btn-primary"
								onclick="queryData()">搜索</a>
							</div>
						</div>
					</div>
            	</div>
				<div  id="toolbar">
					
				</div> 
				<!-- table 内容 -->
				<table id="tableSchoolAppl" style="margin: 0px;">
				
				</table>
			</div>
		</div>
	</div>
	
	<!-- table 审核 modal -->
    <div class="modal fade" id="checkModal" tabindex="-1" role="dialog"
        aria-lablledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" style="width: 20%">
            <!-- 会话窗口 -->
            <div class="modal-content">
                <!-- 模态框内容 -->
                <div class="modal-header">
                    <!-- 模态框头 -->
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <!-- 右上角关闭按钮“x” -->
                    <h5 class="modal-title" id="addModalTitle">学校审核</h5>
                </div>
                <div class="modal-body">
					<!-- 模态框主题内容 -->
                    <p class="glyphicon glyphicon-question-sign">&nbsp;是否确认通过该记录？</p>
				</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnSave">通过</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">不通过</button>
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
<script src="<%=basePath%>/js/json2.js"></script>
<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
<!-- util -->
<script src="<%=basePath%>/js/common/util.js"></script>
<!-- role-handler -->
<script src="<%=basePath%>/js/common/role-handler.js"></script>

<!-- js代码 -->
<script src="schoolapplylist.js"></script>
</body>
</html>