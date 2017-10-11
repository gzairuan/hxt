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
<title>班级相册</title>
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
</head>
<body class="gray-bg">
	<!-- 包装内容 动画 从右方进入 -->
	<div class="wrapper wrapper-content animated fadeInRight">
		<!-- 面板START -->
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h3>班级相册</h3>
			</div>
			<!-- 内容START -->
			<div class="ibox-content"> <!-- ibox 主体内容 -->
				<div class="photolist">
					<ul class="col-xs-6 col-md-3">
					    <li class="span3">
					        <div class="thumbnail pull-right">
					            <img src="../../../img/a1.jpg" alt="小熊猫"/>
					            <div class="caption">
					                <h5>小熊猫</h5>
					                <p><small>
					                小熊猫（学名：Ailurus fulgens）又名红熊猫、红猫熊、小猫熊、九节狼等，是一种濒危的哺乳类动物分布在中国南方到喜马拉雅山麓等国。</small>
					                </p>
					                <p><a href="#" class="btn btn-small btn-success pull-right">more
					                </a></p>
					            </div>
					        </div>
					    </li>
					    
					    <li class="span3">
					        <div class="thumbnail pull-right">
					            <img src="../../../img/a1.jpg" alt="考拉" />
					            <div class="caption">
					                <h5>考拉</h5>
					                <p><small>树袋熊，又称考拉，是澳大利亚的国宝，也是澳大利亚奇特的珍贵原始树栖动物。英文名Koala bear来源于古代土著文字，意思是“no drink”。</small></p>
					                <p><a class="btn btn-small btn-success pull-right">more</a></p>
					            </div>
					        </div>
					    </li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- 全局公用JS -->
	<script src="<%=basePath%>/js/jquery-3.2.1.min.js?v=3.2.1"></script>
	<script src="<%=basePath%>/js/bootstrap.min.js?v=3.3.7"></script>
	<!-- 兼容ie9及以下JSON -->
	<script src="<%=basePath%>/js/json2.js"></script>
	<!-- util -->
	<script src="<%=basePath%>/js/common/util.js"></script>
	<script src="<%=basePath%>/js/plugins/hxt/bootstrap-photo.js?V=2.0"></script>
	<script type="text/javascript">
		var pa = $('#photoAlbum').bootstrapPhoto({
			data:[{aa:1},{aa:2},{aa:3},{aa:3}]
		});
		console.info(pa);
	</script>
	<!-- role-handler -->
	<script src="<%=basePath%>/js/common/role-handler.js"></script>
</body>
</html>