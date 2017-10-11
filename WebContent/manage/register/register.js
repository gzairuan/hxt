/**
 * 描述： 学校注册
 * date: 2017-9-13
 * by: szs
 * 
 */
 
 var rootPath = util.getRootPath();
 var areaData;
 
 $(function(){
 	$.ajax({
 		url: rootPath + '/areaInitServlet?optFlag=init',
		success: function(data){
			areaData = data;
		}
 	});
 	
 });
 
 
 // 区域input 点击事件
 $('#domainName').click(function(){
      $("#domainName").popover();
      $('.popover').css({"top": "257.781px", "width": "50%", "left": "525.258px", "display": "block",  "height":"60%"});
 });
 
$('#domainName').on('shown.bs.popover', function () {
    var options = {  
        color: "#428bca",
      	expandIcon: 'glyphicon glyphicon-chevron-right',
      	collapseIcon: 'glyphicon glyphicon-chevron-down',
      	data: areaData,  //树节点data结构
      	levels: 2,
        onNodeSelected : function(event, data) {  
            $("#domainName").val(data.text);  
            $('#domainId').attr('value', data.id);
        }  
    };
    var t = '<div id="treeview" class="pre-scrollable"></div>';
    $('.popover-content').append(t);
    $('#treeview').treeview(options); 
});
 
 //提交表单
 function submitregister(){
	var $form = $('#registerForm');
	$.ajax({
		url: rootPath + '/schoolRegisterServlet',
		data: $form.serialize(),
		success: function(data){ //成功返回信息
			if(data.result == "ok"){
				toastr.success('操作成功', '提示');
				getTreeData();
			}else{
				toastr.error('操作失败!请稍后再试 ', '提示');
			}
		}
	});
}
