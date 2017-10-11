/**
 * 
 * @author szs
 * @time 2017年9月7日 下午3:52:26
 * @version 1.0
 * 描述： 区域管理
 */
var rootPath = util.getRootPath();

$(function(){
	//初始化tree
	getTreeData();
	$('#parentcodeId').attr('disabled', 'disabled');
});

//获取后台tree data数据
function getTreeData(){
	var areaData = "";
	$.ajax({
		url: rootPath + '/areaInitServlet?optFlag=init',
		success: function(data){
			areaData = data;
			debugger;
			//初始化tree
		    $('#treeview').treeview({
		      color: "#428bca",
		      expandIcon: 'glyphicon glyphicon-chevron-right',
		      collapseIcon: 'glyphicon glyphicon-chevron-down',
		      data: areaData,  //树节点data结构
		      levels: 0,
		      onNodeSelected: function(event, node){//被选中节点
		      	if(node.parent == 0){//为根节点
		      		$('#parentcodeId').val('区域菜单根目录').attr('disabled', 'disabled')
		      		$('#areacodeId').val(node.code).attr('disabled', 'disabled');
				    $('#areanameId').val(node.text).attr('disabled', 'disabled');
		      		return;
		      	}else{
		      		var prentnode = $('#treeview').treeview('getParent', node.nodeId); //获取父节点
			      	if(prentnode != undefined){
//			      		$('#areaFormId')[0].reset();
			      		//选择节点，填充右边的信息
				      	$('#parentcodeId').val(prentnode.text).attr('disabled', 'disabled')
				      		.attr('data-id', node.id)
				      		.attr('data-parent', node.parent);
				      	$('#areacodeId').val(node.code).attr('disabled', 'disabled');
				      	$('#areanameId').val(node.text).attr('disabled', 'disabled');
			      	}
		      	}
		      }
		    });
		}
	});
	return areaData;
}

var opt = 0;

//新增根节点
function addRootNode(){
	resetValidator();
	//新增一级根目录
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	
	$('#parentcodeId').val('').attr('disabled', 'disabled');
	$('#areacodeId').val('').removeAttr('disabled');
	$('#areanameId').val('').removeAttr('disabled');
	//新增二级根目录
	
	opt = 1;
	
}

//新增下级区域
function addChilNode(){
//	var select_node = $('#treeview').treeview('getSelected');//获取选中的节点
//	var prentnode = $('#treeview').treeview('getParent', select_node[0].parent); //获取父节点
	resetValidator();
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	if(selectedNode == null){
		toastr.info('请选择左边菜单的区域！', '提示');
	}else{
		//获取跟节点
		$('#parentcodeId').val(selectedNode.text).attr('disabled', 'disabled').attr('data-parent', selectedNode.id);
		$('#areacodeId').val('').removeAttr('disabled');
		$('#areanameId').val('').removeAttr('disabled');
		opt = 2;
	}
}

//表单验证
$('#areaFormId').bootstrapValidator({
	fields : {
		areacode : {
			validators : {
				notEmpty : {
					message : '请输入区域代码'
				}
			}
		},
		areaname : {
			validators : {
				notEmpty : {
					message : '请输入区域名称'
				}
			}
		}
	},
	excluded: [':disabled']
})

// 修改节点信息
function editNode(){
	resetValidator();
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	if(selectedNode == null){ //判断节点是否为空
		toastr.info('请选择修改的区域！', '提示');
	}else{
		$('#parentcodeId').attr('data-parent', selectedNode.parent).attr('data-id', selectedNode.id);
	  	$('#areacodeId').removeAttr('disabled');
	  	$('#areanameId').removeAttr('disabled');
	  	opt = 3;
	}
}

//保存按钮
function saveBtn(){
	var $form = $('#areaFormId');
	var valid = $form.data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		switch (opt){
			case 1://新增根节点
				var parentVal = $('#parentcodeId').val(); //根节点值
				if(parentVal == "" || parentVal == null){//上级区域为空时， 保存根区域
					$.ajax({
						url: rootPath + '/areaInitServlet?optFlag=addRootNode',
						dataType: 'json',
						data: $form.serialize(),
						success: function(data){
							if(data.result == "ok"){
								toastr.success('新增成功', '提示');
								getTreeData();
							}else{
								toastr.error('新增失败!请稍后再试 ', '提示');
							}
						}
					});
				}
			break;
			
			case 2: //添加子节点
				var parentId = $('#parentcodeId').attr("data-parent");
				$.ajax({
					url: rootPath + '/areaInitServlet?optFlag=addChildNode',
					dataType: 'json',
					data: $form.serialize() + '&parentId='+parentId,
					success: function(data){
						if(data.result == "ok"){
							toastr.success('操作成功', '提示');
							getTreeData();
							hideInput();
						}else{
							toastr.error('操作失败!请稍后再试 ', '提示');
						}
					}
				});
			break;
			case 3: //编辑
				var parentId = $('#parentcodeId').attr("data-parent");
				var id = $('#parentcodeId').attr("data-id");
				$.ajax({
					url: rootPath + '/areaInitServlet?optFlag=editNode',
					dataType: 'json',
					data: $form.serialize() + '&parentId='+parentId + '&id='+id,
					success: function(data){
						if(data.result == "ok"){
							toastr.success('新增成功', '提示');
							getTreeData();
							hideInput();
						}else{
							toastr.error('新增失败!请稍后再试 ', '提示');
						}
					}
				});
			break;
		}
	}
}

function hideInput(){
	$('#areacodeId').attr('disabled', 'disabled');
	$('#areanameId').attr('disabled', 'disabled');
}

//删除节点
function deleteNode(){
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	var code = $('#areacodeId').val();
	if(selectedNode == null || code == ""){ //判断节点是否为空
		toastr.info('请选择左边菜单要删除的区域！', '提示');
	}else{//显示delete modal
		$('#deleteModal').modal('show'); 
	}
}

//确认删除
function affirmDeleteNode(){
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	var id = selectedNode.id;
	$.ajax({
		url: rootPath + '/areaInitServlet?optFlag=deleteNode',
		data: {
			id: id
		},
		success: function(data){
			var json = JSON.parse(data);
			if(json.result == "ok"){
				toastr.success('操作成功', '提示');
				$('#parentcodeId').val('').removeAttr('disabled');
		      	$('#areacodeId').val('').removeAttr('disabled');
		      	$('#areanameId').val('').removeAttr('disabled');
				getTreeData();
			}else{
				toastr.error('操作失败!请稍后再试 ', '提示');
			}
		}
	});
}

//取消按钮
function cancelBtn(){
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	var prentnode;
	if(selectedNode != null){
		prentnode = $('#treeview').treeview('getParent', selectedNode.nodeId); //获取父节点
	}
	
	switch(opt) {
		case 1: 
			resetValidator();
			break;
		case 2:
			backData(prentnode, selectedNode);
		break;
		
		case 3:
			backData(prentnode, selectedNode);
		break;
		
		default: break;
	}
}

function backData(prentnode, selectedNode){
	$('#parentcodeId').val(prentnode.text).attr('disabled', 'disabled');
  	$('#areacodeId').val(selectedNode.code).attr('disabled', 'disabled');
  	$('#areanameId').val(selectedNode.text).attr('disabled', 'disabled');
}

function resetValidator(){
	if($('#areaFormId').data('bootstrapValidator'))
 	$('#areaFormId').data('bootstrapValidator').resetForm();
}
