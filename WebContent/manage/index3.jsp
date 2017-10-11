<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title>好校通系统管理</title>

<link rel="shortcut icon" href="../icons/favicon.ico"> 
<link href="../css/bootstrap.min.css?v=3.3.7" rel="stylesheet">
<link href="../css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
<link href="../css/animate.css" rel="stylesheet">
<link href="../css/style.css?v=4.1.0" rel="stylesheet">
<link href="bootstrap.addtabs.css" rel="stylesheet">

</head>
<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
	<div id="wrapper">
		<!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                	<!-- 导航头部 显示logo -->
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="clear">
                                    <span class="block m-t-xs" style="font-size:20px;">
                                        <!-- <i class="fa fa-area-chart"></i> -->
                                        <strong class="font-bold">好校通</strong>
                                    </span>
                                </span>
                            </a>
                        </div>
                        <!-- logo标签 -->
                        <div class="logo-element">HXT
                        </div>
                    </li>
                   <!--  <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">分类</span>
                    </li> -->
                    <li>
						<a class="J_menuItem" data-addtab="HXT_HOME" data-url="school/intro/schoolinfoindex.jsp">首页</a>
						<!-- <a aria-controls="home" data-toggle="tab" href="#home" role="tab">首页 </a> -->
					</li>
                    <!-- <li>
                        <a class="J_menuItem" href="school/intro/schoolinfoindex.jsp?menuid=1">
                            <i class="glyphicon glyphicon-home"></i>
                            <span class="nav-label">首页</span>
                        </a>
                    </li> -->
                </ul>
            </div>
        </nav>
        <!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header"><a class="navbar-minimalize minimalize-styl-2 btn btn-info " href="#"><i class="fa fa-bars"></i> </a>
                        <!-- <form role="search" class="navbar-form-custom" method="post" action="search_results.html">
                            <div class="form-group">
                                <input type="text" placeholder="请输入您需要查找的内容 …" class="form-control" name="top-search" id="top-search">
                            </div>
                        </form> -->
                    </div>
                    <!-- 右边导航，可用于做信息提示，TODO... -->
                    <ul class="nav navbar-top-links navbar-right">
                        <!-- <li class="dropdown">
                            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i class="fa fa-envelope"></i> <span class="label label-warning">16</span>
                            </a>
                            <ul class="dropdown-menu dropdown-messages">
                                <li class="m-t-xs">
                                    <div class="dropdown-messages-box">
                                        <a href="profile.html" class="pull-left">
                                            <img alt="image" class="img-circle" src="../img/a7.jpg">
                                        </a>
                                        <div class="media-body">
                                            <small class="pull-right">46小时前</small>
                                            <strong>小四</strong> 是不是只有我死了,你们才不骂爵迹
                                            <br>
                                            <small class="text-muted">3天前 2014.11.8</small>
                                        </div>
                                    </div>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <div class="dropdown-messages-box">
                                        <a href="profile.html" class="pull-left">
                                            <img alt="image" class="img-circle" src="../img/a4.jpg">
                                        </a>
                                        <div class="media-body ">
                                            <small class="pull-right text-navy">25小时前</small>
                                            <strong>二愣子</strong> 呵呵
                                            <br>
                                            <small class="text-muted">昨天</small>
                                        </div>
                                    </div>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <div class="text-center link-block">
                                        <a class="J_menuItem" href="mailbox.html">
                                            <i class="fa fa-envelope"></i> <strong> 查看所有消息</strong>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i class="fa fa-bell"></i> <span class="label label-primary">8</span>
                            </a>
                            <ul class="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="mailbox.html">
                                        <i class="fa fa-envelope fa-fw"></i> 您有16条未读消息
                                        <span class="pull-right text-muted small">4分钟前</span>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="profile.html">
                                        <i class="fa fa-qq fa-fw"></i> 3条新回复
                                        <span class="pull-right text-muted small">12分钟钱</span>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <div class="text-center link-block">
                                        <a class="J_menuItem" href="notifications.html">
                                            <strong>查看所有 </strong>
                                            <i class="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li> -->
                    	<li class="dropdown">
                    		<a type="button" href="../cancelLogin">注销</a>
                    	</li>
                    </ul>
                </nav>
            </div>
            <!-- tab导航 -->
            <div class="row content-tabs">
            	<!-- <div class="page-tabs">
            		<div class="page-tabs-content">
            			 <a href="javascript:;" class="J_menuTab active" data-id="https://www.hao123.com/?tn=93288632_hao_pg">首页</a>
            			 <a href="javascript:;" class="J_menuTab " data-id="mail_detail.html">查看邮件 <i class="fa fa-times-circle"></i></a>
            			 <a href="javascript:;" class="J_menuTab" data-id="profile.html">个人资料 <i class="fa fa-times-circle"></i></a>
            		</div>
            	</div> -->
                 <ul class="nav nav-tabs" id="tabs1" role="tablist">
					<li class="active" role="presentation" id="tab_tab_HXT_HOME" aria-url="school/student/student.jsp" aria-ajax="false">
						<a aria-controls="tab_HXT_HOME" data-toggle="tab" href="#tab_HXT_HOME" role="tab" aria-expanded="true">首页 </a>
					</li>
				</ul>
				<!-- 右边内容区域 -->
            	<div class="tab-content">
					<!-- <div class="tab-pane active" id="home" role="tabpanel">
						这里是首页</div> -->
					<div class="tab-pane active" id="tab_HXT_HOME" role="tabpanel">
						<iframe class="iframeClass" frameborder="0" border="0" src="school/intro/schoolinfoindex.jsp" style="height: 100%;"></iframe>
					</div>
				</div>
            </div>
            <!-- Tab panes内容区域  -->
            <!-- <div class="row J_mainContent" id="content-main">
                <iframe id="J_iframe" width="100%" height="100%" src="school/intro/schoolinfoindex.jsp?menuid=1" frameborder="0" data-id="index_v1.html" seamless></iframe>
            </div> -->
        </div>
        <!--右侧部分结束-->
        <!-- 页脚 -->
       	<footer class="main-footer text-center">
		    <strong>Copyright © 2017 <a href="http://www.hinear.com/">广州好年华信息科技有限公司</a>.</strong> All rights reserved. &nbsp;&nbsp;&nbsp;
		    <a href="http://www.miitbeian.gov.cn">粤ICP备16023920号-1</a>
	  	</footer>
	</div>
	
	<!-- 全局js -->
    <script src="../js/jquery-3.2.1.min.js?v=3.2.1"></script>
    <script src="../js/bootstrap.min.js?v=3.3.7"></script>
    <!-- 自定义js 必须与metisMenu合用并在其之前调用 -->
    <script type="text/javascript" src="../js/common/treeviewMenu.js?v=1.1"></script>
    <script type="text/javascript">
    	$(function() {
    		var menu = <%=session.getAttribute("menu")%>;
			if (menu && menu != 'null') {
				//var jsonMenu = $.parseJSON(menu);
				$('#side-menu').treeviewMenu({
					data : menu
				});
			}
		});
    	
	</script>
    <!-- 全局js -->
    <script src="../js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="../js/plugins/layer/layer.min.js"></script>

    <!-- 自定义js -->
    <script src="../js/hAdmin.js?v=4.1.0"></script>
    <!-- <script type="text/javascript" src="index.js"></script> -->

    <!-- 第三方插件 -->
    <script src="../js/plugins/pace/pace.min.js"></script>
    <script src="bootstrap.addtabs.js"></script>
	
</body>
</html>