;
var menuid = util.getQueryParam('menuid');
var menuData;
roleUtil = {
	roleHandler : function() {
		if (menuData && menuData !== undefined && menuData !== 'undefined') {
			var operateRole=true;
			$.each(menuData, function(index, role) {
				switch (role.ROLE) {
				case 'VISIT':// 查看
				{
				}
					break;
				case 'INSERT'://添加
				{
					var add = $('.add-role');
					if(add.length>0){
						add.show();
					}
				}
					break;
				case 'UPDATE'://修改
				{
					if(operateRole){
						var table = $('.table-role');
						if(table.length>0){
							table.bootstrapTable('showColumn','operate-role');
							operateRole = false;
						}
						var operate = $('.operate-role');
						if(operate.length>0){
							operate.show();
							operateRole = false;
						}
					}
					var edit = $('.edit-role');
					if(edit.length>0){
						edit.show();
					}
				}
					break;
				case 'DELETE'://删除
				{
					if(operateRole){
						var table = $('.table-role');
						if(table.length>0){
							table.bootstrapTable('showColumn','operate-role');
							operateRole = false;
						}
						var operate = $('.operate-role');
						if(operate.length>0){
							operate.show();
							operateRole = false;
						}
					}
					var del = $('.delete-role');
					if(del.length>0){
						del.show();
					}
				}
					break;
				case 'IMPORT'://导入
				{
					var imp = $('.import-role');
					if(imp.length>0){
						imp.show();
					}
				}
					break;
				case 'EXPORT'://导出
				{
					var exp = $('.export-role');
					if(exp.length>0){
						exp.show();
					}
				}
					break;
				default:
					break;
				}
			});
		}else {
			var rootPath = util.getRootPath();
			$.ajax({
				url : rootPath + '/menuRoleServlet',
				data : {
					menuid : menuid
				},
				dataType : 'json',
				success : function(data) {
					menuData = data;
					roleUtil.roleHandler();
				}
			});
		}
	}
};
if (!util.text.isEmpty(menuid)) {
	roleUtil.roleHandler();
}
