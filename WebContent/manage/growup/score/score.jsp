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
<title>学生成绩查询</title>
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
				<h3>学生成绩查询</h3>
			</div>
			<div class="ibox-content"> <!-- ibox 主体内容 -->
				<!-- 查询条件 -->
				<form id="formSearch" class="form-horizontal">
						<div class="form-group" style="margin-top: 15px">
							<label class="control-label col-sm-2" for="tname">学期：</label>
							<div class="col-sm-2">
								<select id="tname" name='tname' class="form-control" >
									<option value="0">全部</option>
								</select>
							</div>
							<label for="cname" class="control-label col-sm-2">班级：</label>
							<div class="col-sm-2">
								<select id="cname" name='cname' class="form-control" >
									<option value="0">全部</option>
								</select>
							</div>
						</div>

						<div class="form-group" style="margin-top: 15px">
							<label class="control-label col-sm-2" for="subname">科目:</label>
							<div class="col-sm-2">
								<input type="text" class="form-control" id="subname" name="subname">
							</div>
							<label class="control-label col-sm-2" for="stuname">姓名：</label>
							<div class="col-sm-2">
								<input type="text" class="form-control" id="stuname" name="stuname">
							</div>
							<div class="col-sm-2" style="text-align: left;">
								<button type="button" style="margin-left: 90px" id="btn_query"
									class="btn btn-primary" onclick="searchData()">查询</button>
							</div>
						</div>
					</form>
				<!-- toolbar 按钮 -->
				
				<!-- table 内容主体 -->
				<div class="row row-lg">
                    <div class="col-sm-12">
                        <!-- Example Card View -->
                        <div class="example-wrap">
                            <div class="example">
								<div id="toolbar">
									<button id="btn-add" type="button" class="btn btn-sm btn-primary add-role" style="display: none;" data-falg="add" data-toggle="modal" data-target="#addOrEditModal" data-flag="add">
										<span class="fa fa-plus" aria-hidden="true"></span> 新增
									</button>
									<!-- <button id="btn-add" type="button" class="btn btn-sm btn-primary" data-falg="add" data-toggle="modal" data-target="#addOrEditModal" data-flag="add">
										<span class="fa fa-arrow-up" aria-hidden="true"></span> 批量导入
									</button> -->
								</div>
								
								<!-- 表格内容 -->
                                <table id="studentScoreTable" class="table-role"></table>
                                
                            </div>
                        </div>
                        <!-- End Example Card View -->
                    </div>
                </div>
			</div> <!-- end ibox-content  -->
		</div>
	</div>
	
	<!-- table 新增 modal -->
	<div class="modal fade" id="addOrEditModal" tabindex="-1" role="dialog"
		aria-lablledby="healthModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document"
			style="width: 60%; margin: 5% auto;">
			<!-- 会话窗口 -->
			<div class="modal-content">
				<!-- 模态框内容 -->
				<div class="modal-header">
					<!-- 模态框头 -->
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<!-- 右上角关闭按钮“x” -->
					<h4 class="modal-title" id="addModalTitle">添加学生成绩</h4>
				</div>
				<div class="modal-body" style="overflow-y: scroll;">
					<!-- 模态框主题内容 -->
					<form id="modalform" class="form-horizontal">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label col-sm-5" for="m_tname">学期：</label>
								<div class="col-sm-7">
									<select id="m_tname" name='m_tname' class="form-control" onchange="tNameStartAndEndTime(this.options[this.options.selectedIndex].value)">
										<option value="0">全部</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="m_cname" class="col-sm-5 control-label">班级：</label>
								<div class="col-sm-7">
									<select id="m_cname" name='m_cname' class="form-control" onchange="studentSelectItem(this.options[this.options.selectedIndex].value)">
										<option value="0">全部</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label id="m_lscore" class="col-sm-5 control-label">分数：</label>
								<div class="col-sm-7">
									<input id="m_score" type="text" name="m_score" class="form-control">
								</div>
							</div>
						</div>
						
						<div class="col-md-6">
							<div class="form-group">
								<label id="m_stuLabelId" class="col-sm-5 control-label">科目：</label>
								<div class="col-sm-7">
									<input type="text" class="form-control" id="m_subname" name="m_subname">
									<!-- <select id="m_subname" name='m_subname' class="form-control" >
										<option value="0">全部</option>
									</select> -->
								</div>
							</div>
							<div class="form-group">
								<label id="m_stuLabelId" class="col-sm-5 control-label">学生：</label>
								<div class="col-sm-7">
									<select id="m_studentId" name="m_studentId" class="form-control" required>
										<option>请选择学生</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label id="m_rank" class="col-sm-5 control-label">排名：</label>
								<div class="col-sm-7">
									<input id="m_rank"  type="number" name="m_rank" class="form-control">
								</div>
							</div>
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
	
	<!-- 查看详情 -->
	<div class="modal fade" id="detailModal" tabindex="-1" role="dialog"
		aria-lablledby="healthModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document"
			style="width: 60%; margin: 5% auto;">
			<!-- 会话窗口 -->
			<div class="modal-content">
				<!-- 模态框内容 -->
				<div class="modal-header">
					<!-- 模态框头 -->
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<!-- 右上角关闭按钮“x” -->
					<h4 class="modal-title" id="addModalTitle">查看学生分数详情</h4>
				</div>
				<div class="modal-body" style="overflow-y: scroll;">
					<!-- 模态框主题内容 -->
					<form id="modalform" class="form-horizontal">
						<div class="col-md-6">
							<div class="form-group">
								<label id="d_stuLabelId" class="col-sm-5 control-label">学生姓名：</label>
								<div class="col-sm-7">
									<input id="d_studentId" name="d_studentId" class="form-control" readonly>
								</div>
							</div>
							<div class="form-group">
								<label id="d_stuLabelId" class="col-sm-5 control-label">科目：</label>
								<div class="col-sm-7">
									<input id="d_subname" name='d_subname' class="form-control" readonly>
								</div>
							</div>
							<div class="form-group">
								<label id="d_ltbegin" class="col-sm-5 control-label">学期开始日期：</label>
								<div class="col-sm-7">
									<input id="d_tbegin"  type="text" name="d_tbegin" readonly class="form-control">
								</div>
							</div>
						</div>
						<div class="col-md-6">
						 	<div class="form-group">
								<label for="d_tnamel" class="col-sm-5 control-label">学期：</label>
								<div class="col-sm-7">
									<input id="d_tname" name='d_tname' class="form-control" readonly>
								</div>
							</div>
							<div class="form-group">
								<label id="d_lscore" class="col-sm-5 control-label">分数：</label>
								<div class="col-sm-7">
									<input id="d_score"  type="text" name="d_score" class="form-control" readonly>
								</div>
							</div>
							<div class="form-group">
								<label id="d_ltend" class="col-sm-5 control-label">学期结束日期：</label>
								<div class="col-sm-7">
									<input id="d_tend"  type="text" name="d_tend" readonly="readonly" class="form-control">
								</div>
							</div>
						</div>
					</form>
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
  
<!-- util -->
<script src="<%=basePath%>/js/common/util.js"></script>
<script src="<%=basePath%>/js/common/util-table.js"></script>

<script type="text/javascript" src="score.js?v=1.1"></script>
<script type="text/javascript" src="<%=basePath%>/js/common/role-handler.js"></script>

</body>
</html>