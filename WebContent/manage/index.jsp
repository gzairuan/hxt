<%@page import="com.hinear.hxt.entity.UserInfo"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String basePath = request.getContextPath();
	UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
%>
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

<style type="text/css">
.image {
	width: 100%;
	height: auto;
	max-width: 100px;
}

</style>
</head>
<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
	<div id="wrapper">
		<!--左侧导航开始-->
		<nav class="navbar-default navbar-static-side" role="navigation">
			<div class="nav-close">
				<i class="fa fa-times-circle"></i>
			</div>
			<div class="sidebar-collapse">
				<ul class="nav" id="side-menu">
					<!-- 导航头部 显示logo -->
					<li class="nav-header">
						<div class="dropdown profile-element">
							<a data-toggle="dropdown" class="dropdown-toggle" href="#">
								<span class="clear">
									<span class="block m-t-xs"
									style="font-size: 20px;"> <!-- <i class="fa fa-area-chart"></i> -->
										<strong class="font-bold">好校通</strong>
								</span>
							</span>
							</a>
						</div>
						<!-- logo标签 -->
						<div class="logo-element">HXT</div>
					</li>
					<li class="nav-header">
	                   <div class="dropdown profile-element">
	                       <span><img alt="image" class="img-circle image"  src="<%=userInfo.getUSERPHOTO()%>" onerror="this.src='<%=basePath%>/img/none.jpg'" ></span>
	                       <a data-toggle="dropdown" class="dropdown-toggle" href="#" aria-expanded="true">
                               <span class="clear" style="margin-left: 14%;">
	                               <span class="block m-t-xs"><strong class="font-bold"><%=userInfo.getREALNAME() %></strong></span>
	                               <span class="text-muted text-xs block"><%=userInfo.getUSERTYPENAME() == null ? "" : userInfo.getUSERTYPENAME()%><b class="caret"></b></span>
                               </span>
	                       </a>
	                       <ul class="dropdown-menu animated fadeInRight m-t-xs">
	                           <li>
	                               <a class="J_menuItem" href="userinfo/myselfCenter.jsp?menuid=20" data-index="1">
	                               	<i class="fa fa-user"></i> 个人资料</a>
	                           </li>
	                           <li>
	                               <a href="../cancelLogin"><i class="fa fa-sign-out"></i>  安全退出</a>
	                           </li>
	                       </ul>
	                   </div>
	                </li>
					<li>
						<a class="J_menuItem" href="school/intro/schoolinfoindex.jsp?menuid=1">
							<i class="glyphicon glyphicon-home"></i>
							<span class="nav-label">首页</span>
						</a>
					</li>
				</ul>
			</div>
		</nav>
		<!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom">
            	<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0px;">
					<div class="navbar-header">
						<a class="navbar-minimalize minimalize-styl-2 btn btn-primary" href="#">
							<i class="fa fa-bars"></i> 
						</a>
					</div>
					<!-- <ul class="nav navbar-top-links navbar-right">
						<li class="dropdown hidden-xs">
							<a class="right-sidebar-toggle" aria-expanded="false"> 
								<i class="fa fa-tasks"></i>系统通知
							</a>
						</li>
					</ul> -->
				</nav>
            </div>
        	<div class="row content-tabs">
        		<button class="roll-nav roll-left J_tabLeft">
        			<i class="fa fa-backward"></i>
        		</button>
        		<nav class="page-tabs J_menuTabs">
        			<div class="page-tabs-content" style="margin-left: 0px;">
        				<a href="javascript:;" class="J_menuTab active" data-id="school/intro/schoolinfoindex.jsp?menuid=1">首页</a>
        			</div>
        		</nav>
        		<button class="roll-nav roll-right J_tabRight">
        			<i class="fa fa-forward"></i>
        		</button>
        		<div class="btn-group roll-nav roll-right">
        			<button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span>
        			</button>
        			<ul role="menu" class="dropdown-menu dropdown-menu-right">
        				<li class="J_tabRefreshPage">
	                        <a>刷新当前选项卡</a>
	                    </li>
	                    <li class="J_tabCloseOther">
	                        <a>关闭其他选项卡</a>
	                    </li>
	                    <li class="J_tabCloseAll">
	                        <a>关闭所有选项卡</a>
	                    </li>
	                </ul>
        		</div>
        		<a href="../cancelLogin" class="roll-nav roll-right J_tabExit">
        			<i class="fa fa-sign-out"></i>退出
        		</a>
        	</div>
        	<div class="row J_mainContent" id="content-main">
        		<iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="school/intro/schoolinfoindex.jsp?menuid=1" frameborder="0" data-id="school/intro/schoolinfoindex.jsp?menuid=1" seamless style="display: inline;"></iframe>
        	</div>
        	<!-- 页脚 -->
        	<div class="footer">
        		<div class="pull-right">
        			<strong>版权所有 © 2017 <a href="http://www.hinear.com/" target="black_">广州好年华信息科技有限公司</a>.</strong>
        		</div>
        	</div>
        </div>
        <!--右侧部分结束-->
        <!-- 横幅右侧‘系统通知’下拉 -->
        <!-- <div id="right-sidebar" class="">
        <div class="slimScrollDiv" style="position: relative; width: auto; height: 100%;"><div class="sidebar-container" style="width: auto; height: 100%;">
            <ul class="nav nav-tabs navs-3">
            	<li class="active">
                    <a data-toggle="tab" href="#tab-2" aria-expanded="true"><i class="fa fa-bell"></i> 通知</a>
                </li>
                <li class="">
                    <a data-toggle="tab" href="#tab-1" aria-expanded="false">
                        <i class="fa fa-gear"></i> 设置
                    </a>
                </li>
                <li>
                    <a data-toggle="tab" href="#tab-3"><i class="fa fa-bar-chart-o"></i> 统计</a>
                </li>
            </ul>

            <div class="tab-content" style="overflow-y: scroll;">
                <div id="tab-1" class="tab-pane">
                    <div class="sidebar-title">
                        <h3><i class="fa fa-comments-o"></i> 主题设置</h3>
                        <small><i class="fa fa-tim"></i> 你可以从这里选择和预览主题的布局和样式，这些设置会被保存在本地，下次打开的时候会直接应用这些设置。</small>
                    </div>
                    <div class="skin-setttings">
                        <div class="title">主题设置</div>
                        <div class="setings-item">
                            <span>收起左侧菜单</span>
                            <div class="switch">
                                <div class="onoffswitch">
                                    <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="collapsemenu">
                                    <label class="onoffswitch-label" for="collapsemenu">
                                        <span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="setings-item">
                            <span>固定顶部</span>

                            <div class="switch">
                                <div class="onoffswitch">
                                    <input type="checkbox" name="fixednavbar" class="onoffswitch-checkbox" id="fixednavbar">
                                    <label class="onoffswitch-label" for="fixednavbar">
                                        <span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="setings-item">
                                <span>
                        固定宽度
                    </span>

                            <div class="switch">
                                <div class="onoffswitch">
                                    <input type="checkbox" name="boxedlayout" class="onoffswitch-checkbox" id="boxedlayout">
                                    <label class="onoffswitch-label" for="boxedlayout">
                                        <span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="title">皮肤选择</div>
                        <div class="setings-item default-skin nb">
                                <span class="skin-name ">
                         <a href="#" class="s-skin-0">
                             默认皮肤
                         </a>
                    </span>
                        </div>
                        <div class="setings-item blue-skin nb">
                                <span class="skin-name ">
                        <a href="#" class="s-skin-1">
                            蓝色主题
                        </a>
                    </span>
                        </div>
                        <div class="setings-item yellow-skin nb">
                                <span class="skin-name ">
                        <a href="#" class="s-skin-3">
                            黄色/紫色主题
                        </a>
                    </span>
                        </div>
                    </div>
                </div>
                <div id="tab-2" class="tab-pane active">

                    <div class="sidebar-title">
                        <h3><i class="fa fa-comments-o"></i> 最新通知</h3>
                        <small><i class="fa fa-tim"></i> 您当前有10条未读信息</small>
                    </div>

                    <div>

                        <div class="sidebar-message">
                            <a href="#">
                                <div class="pull-left text-center">
                                    <img alt="image" class="img-circle message-avatar" src="http://orheaidcn.bkt.clouddn.com/a1.jpg">

                                    <div class="m-t-xs">
                                        <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i>
                                    </div>
                                </div>
                                <div class="media-body">

                                    据天津日报报道：瑞海公司董事长于学伟，副董事长董社轩等10人在13日上午已被控制。 <br>
                                    <small class="text-muted">今天 4:21</small>
                                </div>
                            </a>
                        </div>
                        <div class="sidebar-message">
                            <a href="#">
                                <div class="pull-left text-center">
                                    <img alt="image" class="img-circle message-avatar" src="http://orheaidcn.bkt.clouddn.com/a2.jpg">
                                </div>
                                <div class="media-body">
                                    HCY48之音乐大魔王会员专属皮肤已上线，快来一键换装拥有他，宣告你对华晨宇的爱吧！ <br>
                                    <small class="text-muted">昨天 2:45</small>
                                </div>
                            </a>
                        </div>
                        <div class="sidebar-message">
                            <a href="#">
                                <div class="pull-left text-center">
                                    <img alt="image" class="img-circle message-avatar" src="http://orheaidcn.bkt.clouddn.com/a3.jpg">

                                    <div class="m-t-xs">
                                        <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i>
                                        <i class="fa fa-star text-warning"></i>
                                    </div>
                                </div>
                                <div class="media-body">
                                    写的好！与您分享 <br>
                                    <small class="text-muted">昨天 1:10</small>
                                </div>
                            </a>
                        </div>
                        <div class="sidebar-message">
                            <a href="#">
                                <div class="pull-left text-center">
                                    <img alt="image" class="img-circle message-avatar" src="http://orheaidcn.bkt.clouddn.com/a4.jpg">
                                </div>

                                <div class="media-body">
                                    国外极限小子的炼成！这还是亲生的吗！！ <br>
                                    <small class="text-muted">昨天 8:37</small>
                                </div>
                            </a>
                        </div>
                        <div class="sidebar-message">
                            <a href="#">
                                <div class="pull-left text-center">
                                    <img alt="image" class="img-circle message-avatar" src="http://orheaidcn.bkt.clouddn.com/a8.jpg">
                                </div>
                                <div class="media-body">

                                    一只流浪狗被收留后，为了减轻主人的负担，坚持自己觅食，甚至......有些东西，可能她比我们更懂。 <br>
                                    <small class="text-muted">今天 4:21</small>
                                </div>
                            </a>
                        </div>
                        <div class="sidebar-message">
                            <a href="#">
                                <div class="pull-left text-center">
                                    <img alt="image" class="img-circle message-avatar" src="http://orheaidcn.bkt.clouddn.com/a7.jpg">
                                </div>
                                <div class="media-body">
                                    这哥们的新视频又来了，创意杠杠滴，帅炸了！ <br>
                                    <small class="text-muted">昨天 2:45</small>
                                </div>
                            </a>
                        </div>
                        <div class="sidebar-message">
                            <a href="#">
                                <div class="pull-left text-center">
                                    <img alt="image" class="img-circle message-avatar" src="http://orheaidcn.bkt.clouddn.com/a3.jpg">

                                    <div class="m-t-xs">
                                        <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i>
                                        <i class="fa fa-star text-warning"></i>
                                    </div>
                                </div>
                                <div class="media-body">
                                    最近在补追此剧，特别喜欢这段表白。 <br>
                                    <small class="text-muted">昨天 1:10</small>
                                </div>
                            </a>
                        </div>
                        <div class="sidebar-message">
                            <a href="#">
                                <div class="pull-left text-center">
                                    <img alt="image" class="img-circle message-avatar" src="http://orheaidcn.bkt.clouddn.com/a4.jpg">
                                </div>
                                <div class="media-body">
                                    我发起了一个投票 【你认为下午大盘会翻红吗？】 <br>
                                    <small class="text-muted">星期一 8:37</small>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
                <div id="tab-3" class="tab-pane">

                    <div class="sidebar-title">
                        <h3><i class="fa fa-cube"></i> 最新任务</h3>
                        <small><i class="fa fa-tim"></i> 您当前有14个任务，10个已完成</small>
                    </div>

                    <ul class="sidebar-list">
                        <li>
                            <a href="#">
                                <div class="small pull-right m-t-xs">9小时以后</div>
                                <h4>市场调研</h4> 按要求接收教材；

                                <div class="small">已完成： 22%</div>
                                <div class="progress progress-mini">
                                    <div style="width: 22%;" class="progress-bar progress-bar-warning"></div>
                                </div>
                                <div class="small text-muted m-t-xs">项目截止： 4:00 - 2015.10.01</div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="small pull-right m-t-xs">9小时以后</div>
                                <h4>可行性报告研究报上级批准 </h4> 编写目的编写本项目进度报告的目的在于更好的控制软件开发的时间,对团队成员的 开发进度作出一个合理的比对

                                <div class="small">已完成： 48%</div>
                                <div class="progress progress-mini">
                                    <div style="width: 48%;" class="progress-bar"></div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="small pull-right m-t-xs">9小时以后</div>
                                <h4>立项阶段</h4> 东风商用车公司 采购综合综合查询分析系统项目进度阶段性报告武汉斯迪克科技有限公司

                                <div class="small">已完成： 14%</div>
                                <div class="progress progress-mini">
                                    <div style="width: 14%;" class="progress-bar progress-bar-info"></div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="label label-primary pull-right">NEW</span>
                                <h4>设计阶段</h4>
                                <div class="small pull-right m-t-xs">9小时以后</div>项目进度报告(Project Progress Report)
                                <div class="small">已完成： 22%</div>
                                <div class="small text-muted m-t-xs">项目截止： 4:00 - 2015.10.01</div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="small pull-right m-t-xs">9小时以后</div>
                                <h4>拆迁阶段</h4> 科研项目研究进展报告 项目编号: 项目名称: 项目负责人:

                                <div class="small">已完成： 22%</div>
                                <div class="progress progress-mini">
                                    <div style="width: 22%;" class="progress-bar progress-bar-warning"></div>
                                </div>
                                <div class="small text-muted m-t-xs">项目截止： 4:00 - 2015.10.01</div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="small pull-right m-t-xs">9小时以后</div>
                                <h4>建设阶段 </h4> 编写目的编写本项目进度报告的目的在于更好的控制软件开发的时间,对团队成员的 开发进度作出一个合理的比对

                                <div class="small">已完成： 48%</div>
                                <div class="progress progress-mini">
                                    <div style="width: 48%;" class="progress-bar"></div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="small pull-right m-t-xs">9小时以后</div>
                                <h4>获证开盘</h4> 编写目的编写本项目进度报告的目的在于更好的控制软件开发的时间,对团队成员的 开发进度作出一个合理的比对

                                <div class="small">已完成： 14%</div>
                                <div class="progress progress-mini">
                                    <div style="width: 14%;" class="progress-bar progress-bar-info"></div>
                                </div>
                            </a>
                        </li>

                    </ul>

                </div>
            </div> 

        </div><div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 4px; position: absolute; top: 66px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 57.5589px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.4; z-index: 90; right: 1px;"></div></div>
    </div>-->
	</div>
	
	<!-- 全局js -->
    <script src="../js/jquery-3.2.1.min.js?v=3.2.1"></script>
    <script src="../js/bootstrap.min.js?v=3.3.7"></script>
    <!-- 自定义js 必须与metisMenu合用并在其之前调用 -->
    <script type="text/javascript" src="../js/common/treeviewMenu.js?v=1.2"></script>
    <!-- 全局js -->
    <script src="../js/plugins/metisMenu/jquery.metisMenu.js"></script>
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
    <script src="../js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="../js/plugins/layer/layer.min.js"></script>

    <!-- 自定义js -->
    <script src="../js/hAdmin.js?v=4.1.0"></script>
    <!-- <script type="text/javascript" src="index.js"></script> -->

    <script src="../js/contabs.min.js"></script>
    <!-- 第三方插件 -->
    <script src="../js/plugins/pace/pace.min.js"></script>
	
</body>
</html>