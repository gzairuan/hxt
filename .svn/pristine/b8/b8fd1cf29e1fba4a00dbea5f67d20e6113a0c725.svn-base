/**
 * 处理学校相册、相片
 * time: 2017-7-17
 * author: szs
 */
/*<div class="post-option">
<ul class="list-options">
	<li><a type="button" data-toggle="modal" data-target="#addAlbumModal"> <i class="fa fa-edit"></i> <span>修改</span></a></li>
	<li><a href="#"> <i class="fa  fa-industry"></i> <span>设置封面</span></a></li>
	<li><a href="#"> <i class="fa  fa-download"></i> <span>下载</span></a></li>
	<li><a href="#"> <i class="fa fa-trash-o"></i> <span>删除</span></a></li>
</ul>
</div>
<!-- 相册图片 -->
<div class="thumb">
	<a href=""><img src="../../img/album/0.jpg" alt="" /></a>
</div>
<!-- 相册介绍 -->
<div class="post-desc">
	<h2>小一班相册</h2>
	<h3>0张</h3>
</div>
*/
(function($){
	'use strict';
	
	//全部变量
	var albumDesc; //相册描述 如： 小一班相册
	var imgTotal; //图片总数如： 3张
	
	//定义相册悬浮操作栏
	var albumOptDom = '<div class="post-option">' + 
						 '<ul class="list-options">' +
							'<li><a type="button" data-toggle="modal" data-target="#addAlbumModal"> <i class="fa fa-edit"></i> <span>修改</span></a></li>' +
							'<li><a href="#"> <i class="fa  fa-industry"></i> <span>设置封面</span></a></li>' +
							'<li><a href="#"> <i class="fa  fa-download"></i> <span>下载</span></a></li>' +
							'<li><a href="#"> <i class="fa fa-trash-o"></i> <span>删除</span></a></li>' +
						 '</ul>' +
					  '</div>';
	//定义相册图片div
	var albumImgDom = '<div class="thumb">' +
						 '<a href=""><img src="../../img/album/0.jpg" alt="" onerror="this.src=\'../../img/no_photo_s.png\'"/></a>' +
					  '</div>';
	//定义相册介绍div
	var albumFooter = '<div class="post-desc">' +
						'<h2>'+ albumDesc +'</h2>' +
						'<h3>'+ imgTotal +'张</h3>' +
					'</div>';
	
	//初始化相册List
	function initAblumList(){
		$.ajax({
			url: '../../schoolAblumServlet',
			success:function(result){
				var r_json = JSON.parse(result);
				var ablumTotal = r_json.total; //相册总数
				var rowsArr = r_json.rows; //获取rows对象
				
				var ul = $('.prodlist');
				ul.html(""); //清空ul子元素
				for(var i = 0; i < rowsArr.length; i++){
					albumDesc = rowsArr[i].ALBUMDESC; //获取相册描述
					if(albumDesc != null){ //不为空，则生成相册列表
						var dataArr = rowsArr[i].data;  //获取相片data集合
						if(dataArr == null){ //获取data集合 图片总数 ，0张图片
							imgTotal = 0; 
						}else{//有多张图片
							imgTotal = dataArr.length;
						}
						
						ul.append(albumOptDom).append(albumImgDom).append(albumFooter);
					}
				}
			},
		});
	};
	
	//引用photAblum.js 调用相册初始化函数
	$(function(){
		//初始化相册List
		$.fn.initAblumList();
	});
	
})(jQuery);
