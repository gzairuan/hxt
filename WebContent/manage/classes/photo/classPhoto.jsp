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
<title>班级相册</title>
<link rel="shortcut icon" href="<%=basePath%>/icons/favicon.ico"> 
<link href="<%=basePath%>/css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="<%=basePath%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="<%=basePath%>/css/animate.css" rel="stylesheet">
<link href="<%=basePath%>/css/style.css?v=4.1.0" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet">
<link href="<%=basePath%>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<!-- 相册blueimp-gallery -->
<link rel="stylesheet" href="http://blueimp.github.io/Gallery/css/blueimp-gallery.min.css">
<link rel="stylesheet" href="<%=basePath%>/css/plugins/blueimp-gallery/bootstrap-image-gallery.min.css">
<!-- 上传文件 -->
<link rel="stylesheet" href="<%=basePath%>/css/plugins/webuploader/webuploader.css">
<link rel="stylesheet" href="../../../css/plugins/webuploader/webuploader-demo.css">
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="ibox float-e-margins" style="width: 75%; margin-left:12%;">
			<div class="ibox-title" >
				<h3>班级相册</h3>
			</div>
			<div class="ibox-content"> <!-- ibox 主体内容 -->
				<div class="photowrapper">
					<div class="photohead">
						<!-- 头部按钮 -->
						<div class="photohead_menu">
							<div style="float: right; margin-top: -1%; width: 50%">
								<select id="classId" class="form-control col-sm-4" style="width: 40%;" onchange="initClassAlbum(this.options[this.options.selectedIndex].value)">
									<option value="0">请选择班级</option>
								</select>&nbsp;&nbsp;
								<button id="createBtn" class="btn btn-primary add-role" style="display:none;" data-toggle="modal" data-target="#addAlbumModal" data-flag="createAlbum">创建相册</button>
								&nbsp;&nbsp;
								<button id="uploadBtn" class="btn btn-primary add-role" style="display:none;" data-toggle="modal" data-target="#uploadPhotoModal">上传照片</button>&nbsp;&nbsp;
								<button id="backBtn" class="btn btn-primary" onclick="backAblum()">返回</button>
							</div>
						</div>
						<!-- 头部分页按钮 -->
						<ul class="photohead_menu" id="ulpageninfoId" style="float: left; margin-top: -1%;">
 							<li id="prevLiId"><a class="prev " title="上一页"></a></li>
 							<li id="nextLiId"><a class="next" title="下一页"></a></li>
							<li class="right"></li>
						</ul>
						&nbsp;&nbsp;<small><span class="pagenuminfo" id="spanCountId"></span></small> <span class="clearall"></span>
					</div>
					<!-- 相册列表内容展示 -->
					<div class="photocontent" id="ablumDivId">
							<!-- 相册album_ul -->
							<ul class="photolist" id="albumUlId">
							</ul>
					</div> <!-- end prodcontent -->
					<!-- 照片列表 -->
					<div class="photocontent" id="photoDivId">
						<ul class="photolist" id="photoUlId">
						<li><p>该相册还没有照片</p></li>
						</ul>
					</div>
				</div>
			</div><!-- end content -->
		</div><!-- end ibox -->
	</div><!-- end wrapper -->
	
	<!-- 班级创建相册 -->
	<div id="addAlbumModal" class="modal fade" role='dialog' tabindex="-1"
        aria-labelledby="delModalLabel" data-backdrop="true" 
        aria-hidden="true">
        <div class="modal-dialog" style="width: 35%;  max-height:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <h5 class="modal-title" id="delModalLabel" >创建班级相册</h5>
                </div>
				<div class="modal-body">
					<form id="ablumFormId" action="" class="form-horizontal">
						<div class="form-group" id="classFormGroup">
							<label class="col-sm-4 control-label">班级：</label>
							<div class="col-sm-6">
								<select id="creatSelectCid" class="form-control col-sm-6">
									<option value="0">请选择班级</option>
								</select>
							</div>
						</div>
						<div class="form-group">
        					<label id="labelDescId" class="col-sm-4 control-label">相册描述：</label>
							<div class="col-sm-6">
			            		<input id="albumDesc" type="text" name="albumDesc" required="required" class="form-control" placeholder="请输入文本">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
                   <!--  <span id='deleteButton'></span> -->
                    <button id="btnSave" type="button" class="btn btn-default" data-dismiss="modal">保存</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>

	<!-- 删除modal -->
	<div id="deleteModal" class="modal fade" role='dialog' tabindex="-1"
        aria-labelledby="delModalLabel" data-backdrop="true"
        aria-hidden="true">
        <div class="modal-dialog" style="width: 20%">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <h5 class="modal-title" id="delModalLabel" style="color: red">删除提示
                    </h5>
                </div>
                <div class="modal-body">
                    <p id="del_pId" class="glyphicon glyphicon-question-sign">&nbsp;是否确定删除该相册？</p>
                </div>
                <div class="modal-footer">
                   <!--  <span id='deleteButton'></span> -->
                    <button id="btnDel" type="button" class="btn btn-delete" data-dismiss="modal">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>

            </div>
        </div>
    </div>
    
    <!-- 弹出照片预览 -->
	<div id="blueimp-gallery" class="blueimp-gallery">
	    图片浏览
	    <div class="slides"></div>
	    Controls for the borderless lightbox
	    <h3 class="title" title="照片描述:"></h3>
	    <a class="prev" title="上一张">‹</a>
	    <a class="next" title="下一张">›</a>
	    <a class="close" title="关闭">×</a>
	    <a class="play-pause" title="自动播放"></a>
	    <ol class="indicator" title="图片跳转"></ol>
	</div>

	<!-- 上传照片 -->
	<div id="uploadPhotoModal" class="modal fade" role='dialog' tabindex="-1"
        aria-labelledby="delModalLabel" data-backdrop="true" 
        aria-hidden="true">
        <div class="modal-dialog" style="width: 63%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <h5 class="modal-title" id="delModalLabel" >上传照片</h5>
                </div>
				<div class="modal-body">
					<form id="photoFormId">
						<div class="page-container">
                            <div class="col-sm-3 col-xs-push-4">
								<select id="albumId" name='albumId' class="form-control" onchange="selectAlbum()"
									style="font-size: 12px; width: 100%;">
									<option value="0"> --请选择相册 -- </option>
								</select>
							</div>
                            <br>
                            <div id="uploader" class="wu-example">
                                <div class="queueList">
                                    <div id="dndArea" class="placeholder">
                                        <div id="filePicker"></div>
                                        <p>或将照片拖到这里，单次最多可选10张</p>
                                    </div>
                                </div>
                                <div class="statusBar" style="display:none;">
                                    <div class="progress">
                                        <span class="text">0%</span>
                                        <span class="percentage"></span>
                                    </div>
                                    <div class="info"></div>
                                    <div class="btns">
                                        <div id="filePicker2"></div>
                                        <div class="uploadBtn">开始上传</div>
                                    </div>
                                </div>
                            </div>
                        </div>
					</form>
				</div>
				<div class="modal-footer">
                    <span id='deleteButton'></span>
                   <!--  <button id="btnSave" type="button" class="btn btn-default" data-dismiss="modal" onclick="creatAblum()">保存</button> -->
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div> 
            </div>
        </div>
    </div>
	
<!-- 全局js -->
<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
<!-- 兼容ie9及以下 -->
<script src="<%=basePath%>/js/json2.js"></script>
<script src="<%=basePath%>/js/plugins/bootstraptable/bootstrap-table.js"></script>
<script src="<%=basePath%>/js/plugins/bootstraptable/locale/bootstrap-table-zh-CN.js"></script>
<script src="<%=basePath%>/js/plugins/toastr/toastr.min.js"></script>
<script src="http://blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>
<script src="http://blueimp.github.io/Gallery/js/blueimp-gallery.min.js"></script>
<script src="<%=basePath%>/js/plugins/blueimp-gallery/bootstrap-image-gallery.min.js"></script>
<script src="<%=basePath%>/js/common/util.js"></script>
<!-- 文件上传 -->
<script type="text/javascript">
        // 添加全局站点信息
        var BASE_URL = '<%=basePath%>/js/plugins/webuploader/Uploader.swf';
</script>
<script src="<%=basePath%>/js/plugins/webuploader/webuploader.min.js"></script>
<script src="classPhoto.js"></script>
<script src="classes-webuploader.js"></script>
<script src="<%=basePath%>/js/common/role-handler.js"></script>
</body>
</html>