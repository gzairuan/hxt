/*
 * describe: 生活剪影 js
 * by: szs
 * Date: 2017-8-4
 * version: 1.0 
 */
;
var rootPath = util.getRootPath();
var	table = $('#lifesketchTabelId');

$(function(){
	initTable(); //初始化table
	initClasses($('#qry_cid'));
});

//查询条件：开始日期
$('#qry_startDate').datetimepicker({
    format: 'yyyy-mm-dd', //日期格式
    language: 'zh-CN', // 国际化 为中文
    startDate: "2013-02-14 10:00", //开始日期格式
    minView: 2, // 精确到2天
    todayBtn: true, //显示当天日期
    autoclose: true //选择日期后自动关闭 
}); 
	
//查询条件： 结束日期
$('#qry_endtDate').datetimepicker({
    format: 'yyyy-mm-dd', //日期格式
    language: 'zh-CN', // 国际化 为中文
    startDate: "2013-02-14 10:00", //开始日期格式
    minView: 2, // 精确到2天
    todayBtn: true, //显示当天日期
    autoclose: true //选择日期后自动关闭 
});

//查询初始化班级下拉框
function initClasses(e){
	if(e && e[0].length==1){
		//清空所有的option
		e.empty();
		e.append('<option value="0" selected>全部</option>');
		$.ajax({
			url: rootPath +'/queryClassServlet',
			success: function(data){
				if(data != null){
					var jsonObj=eval("("+data+")");  
					if(jsonObj.length > 0){
						$.each(jsonObj, function (i, item) {  //循环json，添加下拉标签
				            e.append('<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>'); 
				        });
					}
				}
			}
		});
	}
}

//初始化table
function initTable(){
	table.bootstrapTable({
         url: rootPath + '/lifeSketchServlet',//远程请求地址
         method:'post',//请求方式
         type: 'json', //数据类型 
         contentType: "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
         striped: true,      //是否显示行间隔色
         toolbar: "#toolbar",  //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
         cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         sortable: false,      //是否启用排序
         pagination: true,     //是否显示分页（*）
         pageNumber:1,      //初始化加载第一页，默认第一页
         pageSize: 10,      //每页的记录行数（*）
         pageList: [10, 25, 50],  //可供选择的每页的行数（*）
         sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
         clickToSelect: true,    //是否启用点击选中行
         uniqueId:'NEWID',	//每一行的标识（要具有唯一性）
         queryParams: queryParams, //定义请求参数
         columns : [
				//field对应返回数据中的字段
				{
					checkbox:true,
					width: '0.5%'
				},
				{
					field : 'STUDENTNAME',
					title : '学生姓名',
					width: '7%'
				},
				{
					field : 'CLASSESNAME',
					title : '班级名称',
					width: '10%'
				},
				{
					field : 'CONTENT',
					title : '内容 ',
					width: '30%'
				},
				{
					field : 'CRETIME',
					title : '发布时间',
					width: '10%',
					formatter : function(value, row, index) {
						var time = value.replace('T',' ');
						return time;
					}
				},
				{
					title : '操作',
					align : 'center', width:'12%',
					formatter : function(value, row, index) {
						//获取当前row内容
						var newId = row.NEWID, data = row.data;
						//var edit = '<a type="button" title="修改" class="btn btn-primary shiny btn-xs purple" data-id="'+ neewId +'" data-flag="edit" data-toggle="modal" data-target="#addOrEditModal"><i class="fa fa-edit">修改</i></a>&nbsp;';
						var detail = '<div class="split_cell">' +
										'<a type="button" class="btn btn-info shiny btn-xs purple" data-stuname="'+row.STUDENTNAME+'" ' +
												'data-id="'+newId+'" data-clasname="'+ row.CLASSESNAME +'" data-content="'+row.CONTENT+'" ' +
												'data-affix="'+ data +'" data-toggle="modal" data-target="#detailModal" >'+
												'<i class="fa fa-eye"></i>&nbsp;详情' +
										'</a>&nbsp' +
									 '</div>';
						var del = '<div class="split_cell">' +
									  '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-role" style="display:none;" onclick="confirmDeleteModal('+ newId + ')"' +
									  		' data-toggle="modal" data-target="#deleteModal">' +
									  		'<i class="fa fa-trash-o"></i>删除' +
									  '</a>&nbsp;&nbsp;' +
								  '</div>';
						 var seePic = '<div class="split_cell">' +
						 				 '<img title="查看图片" alt="查看图片" src="'+rootPath+'/img/uploadImg.png" style="width:20px;height:20px;">'+
						 			  '</div>';
						return [detail, del].join('');
					}
				}
				], 
         onClickRow:function(row,ele,fileid){//table选中行设置背景色
         	$(".info").removeClass("info");
         	$(ele).addClass("info");
         },
         onLoadSuccess:function(data){
        	 roleUtil.roleHandler();
         }
     });
};

var searchParams = {optFlag: "init"};

/* 初始化/查询时传递参数 */
function queryParams(params){
	params.optFlag = searchParams.optFlag;
	params.startDate = searchParams.startDate;
	params.endDate = searchParams.endDate;
	params.classesId = searchParams.classesId;
	params.stuname = searchParams.stuname;
	return params;
};

/* 查询 */
function searchData(){
	searchParams.startDate = $('#qry_startDate').val();
	searchParams.endDate = $('#qry_startDate').val();
	searchParams.classesId = $('#qry_cid').val();
	searchParams.stuname = $('#stuname').val();
	table.bootstrapTable('destroy');//先要将table销毁，否则会保留上次加载的内容
	//重新初使化表格。
	initTable();
};

/* modal弹出时需要初始化的资源  */
$('#addModal').on('show.bs.modal', function(event){
	$('#addmodalForm')[0].reset(); //重置form表单
	//初始化学生信息
	var ele = $('#studentId');
	var modal = $(this);
	//初始化用户学生信息，清空所有的option
	initUserOwnStu(ele);
	
	//隐藏图片上传组件
	$('#selectImgDiv').hide();
	//重置上传组件，清空缓存
//	$('#selectImgDiv').fileinput('reset');
	
}); //end addModal

/* 查看详情 */
$('#detailModal').on('show.bs.modal', function(event){
	var btn = $(event.relatedTarget),
		id = btn.data("id"),
		row = tableUtil.getRowData('#lifesketchTabelId', id),
		affix = row.data;
	var $form = $('#detailmodalForm');
//		console.info(affix);
		
		$('#imgGroupDiv').remove(); //防止不断添加图片预览标签
		
	//赋值
	$('#d_stuname').val(row.STUDENTNAME);
	$('#d_clasname').val(row.CLASSESNAME);
	$('#d_content').val(row.CONTENT);
	
	//图片预览
	var previewImg = '<div class="col-sm-8 form-group" id="imgGroupDiv">'+
							'<label class="control-label">图片浏览：</label>'+
							'<div class="carousel slide" id="carousel2" style="left: 35%;">'+
	                            '<ol class="carousel-indicators" id="imglinavId">'+
	                               
	                            '</ol>'+
	                            '<div class="carousel-inner" id="imgPreDiv">'+
	                                
	                            '</div>'+
	                            '<a data-slide="prev" href="carousel.html#carousel2" class="left carousel-control"><span class="icon-prev" title="上一张"></span></a>'+
	                            '<a data-slide="next" href="carousel.html#carousel2" class="right carousel-control"><span class="icon-next" title="下一张"></span></a>'+
	                        '</div>'+
						'</div>';
		var linav = null,
			imgItem = null;
	
	
	//图片预览
	if(affix != null){//不为空
		$form.append(previewImg); //添加显示预览图片模块
		
		$.each(affix, function(i, item){// 循环data，获取图片url
			console.info(i);
			console.info(item.ATTACHMENTURL);
			if(i == 0){
				linav = '<li data-slide-to="'+ i +'" data-target="#carousel2" class="active"></li>';
				imgItem = '<div class="item active" align="center">'+
	                          '<a href="'+ item.ATTACHMENTURL +'" target="_blank">'+
                    			 '<img alt="image" class="img-responsive" style="width: auto;height: 200px;" src="'+ item.ATTACHMENTURL +'" onerror="this.src=\''+rootPath+'/img/no_photo_s.png\'">'+
            				  '</a>'+  
	                     '</div>'+
	                     '<div class="carousel-caption">'+
                    		'<p>图片标题'+ i +'</p>'+
                		'</div>'
			}else {
				linav = '<li data-slide-to="'+ i +'" data-target="#carousel2"></li>';
				imgItem = '<div class="item" align="center">'+
	                          '<a href="'+ item.ATTACHMENTURL +'" target="_blank">'+
                    			 '<img alt="image" class="img-responsive" style="width: auto;height: 200px;" src="'+ item.ATTACHMENTURL +'" onerror="this.src=\''+rootPath+'/img/no_photo_s.png\'">'+
            				  '</a>'+  
	                     '</div>'+
	                     '<div class="carousel-caption">'+
                    		'<p>图片标题'+ i +'</p>'+
                		'</div>'
			};
			$('#imglinavId').append(linav);
		$('#imgPreDiv').append(imgItem);
		});// end each data 
		
	}// end if 
});

/* 初始化用户学生信息 */
function initUserOwnStu(ele){
	//初始化班级学生信息，清空所有的option
	ele.empty();
	ele.append('<option value="0" selected>请选择学生</option>');
	$.ajax({
		url: rootPath + '/lifeSketchServlet?optFlag=initStudent',
		success: function(data){
			if(data != null){
				var jsonObj=eval("("+data+")");  
				if(jsonObj.length > 0){
					$.each(jsonObj, function (i, item) {  //循环json，添加下拉标签
		        		ele.append('<option value="'+item.STUDENTID+'" data-cid="'+item.CLASSESID+'">'+item.STUDENTNAME+'</option>'); 
	        		}); 
				}
			}
		}
	}); 
}

/* 上传图片组件显示或隐藏 */
$('#upLifeSketchImg').on('click', function(){
	var upLifeSketchImg = $('#upLifeSketchImg'),
		upVal = upLifeSketchImg.val(),
		imgDiv = $('#selectImgDiv');
	if(upVal == "上传图片"){//点击时显示或隐藏图片上传组件
		upLifeSketchImg.val("隐藏图片");
    	imgDiv.show();
	}else{
		upLifeSketchImg.val("上传图片");
		imgDiv.hide();
	}
	
});

//初始化图片上传组件
$('#selectImgId').fileinput({
 	language: 'zh', //设置语言
 	uploadUrl: rootPath + '/imgUploadHandler?optFlag=lefsketch', //上传的地址
	//设置预览图片大小
 	showPreview : true, //是否显示预览
 	showBrowse: true,
 	showUpload: true, //是否显示上传按钮
	showRemove : true, //显示移除按钮
    showCaption: false,//是否显示标题
    showCancel: true,  //
    resizeImage: true,
//    maxImageWidth: 200, //上传之后图片宽度大小
//    maxImageHeight: 200,
    resizePreference: 'width',
 
	uploadLabel: "上传", ////设置上传按钮的汉字
    browseClass: "btn btn-info", //按钮样式     
    maxFileCount: 9,/*允许最大上传数，可以多个，当前设置9个*/
    msgFilesTooMany: "最多只能上传9张图片", 
    dropZoneTitle: "请通过拖拽图片文件放到这里",
    dropZoneClickTitle: "或者点击此区域添加图片",
    browseOnZoneClick: false, //是否点击区域进行选择文件
    fileActionSettings:{//上传图片动作
   		showUpload: false, //是否显示单个文件上传按钮
   		showZoom: true, //是否显示预览按钮
   		showDrag: false //是否允许拖拽
    },
    layoutTemplates:{
   		progress: ""
    },
//                 elErrorContainer: "",
//                 msgErrorClass: "",//上传错误信息显示
	allowedFileExtensions : ['jpg', 'png','gif', 'jpeg'],//上传文件格式
 	overwriteInitial: false,
 	maxFileSize: 1000, //上传文件大小
 	maxFilesNum: 9, //上传文件最大个数
 	msgFilesTooMany: "最大只能上传9张图片", //上传文件超过最大值提示
 	initialCaption: "选择上传图片", //文本框初始话value
 	removeFromPreviewOnError: false,
 	slugCallback : function(filename) {//处理空格
        return filename.replace('(', '_').replace(']', '_');
    } ,
 	uploadExtraData: function(previewId, index) {   //额外参数的关键点
        var obj = {};
        return obj;
   },
   initialPreviewConfig: [ //配置预览中的一些参数   
       {caption: "gem1.jpg", size: 329892, width: "100px",  key: 1},  
       {caption: "gem15.jpg", size: 872378, width: "100px",  key: 2}  
     ]  
});

/* 新增点击保存按钮 */
$('#btnSave').on('click',function (){// 提交图片信息 //
        //选择图片，在表单提交时执行图片上传按钮，把图片上传到服务器端
        $('#selectImgId').fileinput('upload');
		
		var arr = [];
        //上传图片成功后执行回调函数 filebatchuploadsuccess fileuploaded
        $("#selectImgId").on("fileuploaded", function(event, data, previewId, index) {
        	if(data.response){
	    		var response= data.response, 
	    			files = data.files, 
	    			filenames = data.filenames, //上传文件名
	    			servicePath = response[0].uploadUrl;
	        			
	    		var path = servicePath+"/";
	    		var imgUrl = '';
	        		
	    		if(index == 0){
	    			$.each(filenames, function(i, item){ //遍历获取文件名
	    				imgUrl += 'imgUrl=' + path + filenames[i]+"&";
	    			});
	    		// 保存表单数据到数据库
        		addLifeSketch(imgUrl);
	    		}
    		}
        })  //end fileuploaded 
    }); 

/* 发送生活剪影 */
function addLifeSketch(imgUrl){
	var cid = $('#studentId option:selected').data('cid'); //班级ID
	var $form = $('#addmodalForm');
	$.ajax({
		url: rootPath + '/lifeSketchServlet?optFlag=add',
		data: $form.serialize() + "&cid="+cid + "&"+imgUrl,
		success: function(data){
			var json = JSON.parse(data);
        	if(json.result=="ok")
        		alert("操作成功！");
        	else
        		alert("操作失败！");
			table.bootstrapTable('refresh');
		}
	});
	$('#addModal').modal('hide');//隐藏modal
};

/* table 删除按钮 */
function confirmDeleteModal(id){
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");
	btnDel.attr('onclick', 'deleteData(' + id + ')');
};     
	    
/* modal 确认删除按钮 */
function deleteData(id){
  $.ajax({
    url: rootPath + '/lifeSketchServlet',
    data:{
        newId: id,
        optFlag: "delete"
    },
    success:function(data){
    	var json = JSON.parse(data);
    	if(json.result=="ok")
    		alert("操作成功！");
    	else
    		alert("操作失败！");
    	
		table.bootstrapTable('refresh'); //刷新表格
        }
    });
};