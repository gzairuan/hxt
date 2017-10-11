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
<title>班级管理</title>
<link rel="shortcut icon" href="../icons/favicon.ico"> 
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet">
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight" style="background-color: #bce8f1;">
		<div class="row">
			<div class="col-sm-12" >
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h3>班级管理</h3>
					</div>
					<!-- ibox content -->
					<!-- <div class="ibox-content" style="height: 0px; background-color: #bce8f1;"> -->
						<!-- 班级列表 -->
						<div class="col-sm-3" style="margin-top: 2%; margin-left: 17%;">
                			<div class="ibox">
                				<div class="ibox-title">
			                        <h4>班级列表</h4>
			                        <div class="ibox-tools-custom">
			                        	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
											操作
											<b class="caret"></b>
										</a>
										<ul class="dropdown-menu">
											<li><a href="#" data-toggle="modal" data-target="#addClasModal" data-clasopt="add">新增</a></li>
											<li><a href="#" id="editClas" data-toggle="modal" data-clasopt="edit">修改</a></li>
											<li><a href="#" id="deleteClas" data-toggle="modal" data-clasopt="delete" data-opts="delclass">删除</a></li>
										</ul>
			                           <!--  <a class="collapse-link">
			                                <i class="fa fa-chevron-up"></i>
			                            </a>
			                            <a class="close-link">
			                                <i class="fa fa-times"></i>
			                            </a> -->
			                        </div>
			                    </div>
                				<div class="ibox-content">
                					<!-- 表格内容 -->
	                                <table id="clasTable">
	                                	
	                                </table>
                				</div>
                			</div>
            			</div>
            			<!-- 班级教师列表 -->
			            <div class="col-sm-5" style="margin-top: 2%">
			                <div class="ibox float-e-margins">
			                    <div class="ibox-title">
			                        <h4>班级教师列表</h4>
			                        <div class="ibox-tools-custom">
			                        	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
											操作
											<b class="caret"></b>
										</a>
										<ul class="dropdown-menu">
											<li><a href="#" id="addTeachBtn" data-toggle="modal" onclick="openModal()">新增</a></li>
											<li><a href="#" id="deleteTeachBtn" data-toggle="modal" data-target="#deleteModal">删除</a></li>
										</ul>
			                            <!-- <a class="collapse-link">
			                                <i class="fa fa-chevron-up"></i>
			                            </a>
			                            <a class="close-link">
			                                <i class="fa fa-times"></i>
			                            </a> -->
			                        </div>
			                    </div>
			                    <div class="ibox-content">
			                    	<div class="row row-lg">
					                    <div class="col-sm-12">
					                        <!-- Example Card View -->
					                        <div class="example-wrap">
					                            <div class="example">
													<!-- 表格内容 -->
					                                <table id="clasTeachTable"> 
					                                </table>
					                            </div>
					                        </div>
					                        <!-- End Example Card View -->
					                    </div>
					                </div>
			                    </div>
			                </div>
			            </div>
			            
            			<!-- 教师授课科目  TODO... --> 
			            <!-- <div class="col-sm-4" style="margin-top:2%;">
			                <div class="ibox float-e-margins">
			                    <div class="ibox-title">
			                        <h3>科目</h3>
			                        <div class="ibox-tools">
			                            <a class="collapse-link">
			                                <i class="fa fa-chevron-up"></i>
			                            </a>
			                            <a class="close-link">
			                                <i class="fa fa-times"></i>
			                            </a>
			                        </div>
			                    </div>
			                    <div class="ibox-content">
			                        <div class="summernote">
			                            <h2>hAdmin后台主题</h2>
			                            <p>hAdmin是一个完全响应式，基于Bootstrap3.3.6最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术，她提供了诸多的强大的可以重新组合的UI组件，并集成了最新的jQuery版本(v2.1.1)，当然，也集成了很多功能强大，用途广泛的就jQuery插件，她可以用于所有的Web应用程序，如<b>网站管理后台</b>，<b>网站会员中心</b>，<b>CMS</b>，<b>CRM</b>，<b>OA</b>等等，当然，您也可以对她进行深度定制，以做出更强系统。</p>
			                        </div>
			                    </div>
			                </div>
			            </div> -->
						
						
					<!-- </div> -->
				</div>
			</div>
			
        </div>
	</div><!-- end wrapper -->
	
	<!-- 班级 table 新增 modal -->
    <div class="modal fade" id="addClasModal" tabindex="-1" role="dialog"
        aria-lablledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" style="width: 40%; margin: 5% auto;">
            <!-- 会话窗口 -->
            <div class="modal-content">
                <!-- 模态框内容 -->
                <div class="modal-header">
                    <!-- 模态框头 -->
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <!-- 右上角关闭按钮“x” -->
                    <h4 class="modal-title" id="addModalTitle">新增班级</h4>
                </div>
                
                <div class="modal-body center" style="overflow-y: scroll;">
                    <!-- 模态框主题内容  -->
					<form id="clasmodalForm" class="form-horizontal">
 						<div class="form-group">
 							<label class="control-label col-sm-3">班级编码：</label>
 							<div class="col-sm-6">
 								<input type="text" id="classcode" name="classcode" class="form-control">
 							</div>
 						</div>
 						<div class="form-group">
 							<label class="control-label col-sm-3">班级名称：</label>
 							<div class="col-sm-6">
 								<input type="text" id="classname" name="classname" class="form-control">
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
    
    <!-- 教师 table 新增 modal -->
    <div class="modal fade" id="addTeachModal" tabindex="-1" role="dialog"
        aria-lablledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" style="width: 40%; margin: 5% auto;">
            <!-- 会话窗口 -->
            <div class="modal-content">
                <!-- 模态框内容 -->
                <div class="modal-header">
                    <!-- 模态框头 -->
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <!-- 右上角关闭按钮“x” -->
                    <h4 class="modal-title" id="addModalTitle">添加教师</h4>
                </div>
                
                <div class="modal-body center" style="overflow-y: scroll;">
                    <!-- 模态框主题内容  -->
					<form id="teachmodalForm" class="form-horizontal">
 						<div class="form-group">
 							<label class="control-label col-sm-3">班级：</label>
 							<div class="col-sm-6">
 								<input type="text" id="t_classname" name="t_classname" class="form-control" readonly>
 							</div>
 						</div>
 						<div class="form-group">
 							<!-- 表格内容 -->
                             <table id="teachTable"> 
                             </table>
 						</div>
					</form>
				</div>
                <div class="modal-footer">
                    <button id="btnTSave" type="button" class="btn btn-primary">保存</button>
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
<script src="<%=basePath%>/js/plugins/datetimepicker/bootstrap-datetimepicker.min.js"></script>
<script src="<%=basePath%>/js/plugins/datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="<%=basePath%>/js/common/util.js"></script>
<script src="<%=basePath%>/js/common/util-table.js"></script>
<script src="<%=basePath%>/js/common/role-handler.js"></script>

<script src="classesManage.js?v=1.1"></script> 

</body>
</html>