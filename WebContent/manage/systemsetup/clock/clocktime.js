/**
 * version 1.0
 */
;
var rootPath = util.getRootPath();

$(function() {
	$('#btnOpenTiming').on('click',openTiming);
	$.post(rootPath+'/clockTimeServlet?optFlag=query',function(data){
		if(data){
			if(data.ISOPEN === 1){
				$('#btnOpenTiming').trigger("click");
			}
			$('#upTime').val(data.UPTIME);
			$('#downTime').val(data.DOWNTIME);
			$('#amUpTime').val(data.AMUPTIME);
			$('#amDownTime').val(data.AMDOWNTIME);
			$('#pmUpTime').val(data.PMUPTIME);
			$('#pmDownTime').val(data.PMDOWNTIME);
			initTime();
		}
	},'json');
});

function saveSchoolTime() {
	console.info($('#submitForm').serialize());
	$.post(rootPath+'/clockTimeServlet?optFlag=update',$('#submitForm').serialize(),function(data){
		if(data.result=='ok'){
			btnEnable(0, 0);
			toastr.success('提示', '保存成功！');
		}else{
			toastr.error('提示', '保存失败！请稍后再试');
		}
	},'json');
}

function initTime() {
	//查询日期设置
	$('#upTimeGroup').datetimepicker({
		format: 'hh:mm:ss', //日期格式
		pickDate: false
	}).on('changeDate',function(e){
		var downtime = $('#downTime').val();
		if(util.text.isEmpty($('#downTime').val())){
			return;
		}
		var sdate = Date.parse('2017-08-08 '+$('#upTime').val());
		var edate = Date.parse('2017-08-08 '+downtime);
		btnEnable(sdate,edate);
	});
	$('#downTimeGroup').datetimepicker({
		format: 'hh:mm:ss', //日期格式
		pickDate: false
	}).on('changeDate',function(e){
		var uptime = $('#upTime').val();
		if(util.text.isEmpty(uptime)){
			return;
		}
		var sdate = Date.parse('2017-08-08 '+uptime);
		var edate = Date.parse('2017-08-08 '+$('#downTime').val());
		btnEnable(sdate,edate);
	});
	$('#amUpTimeGroup').datetimepicker({
		format: 'hh:mm:ss', //日期格式
		pickDate: false
	}).on('changeDate',function(e){
		var downtime = $('#amDownTime').val();
		if(util.text.isEmpty($('#amDownTime').val())){
			return;
		}
		var sdate = Date.parse('2017-08-08 '+$('#amUpTime').val());
		var edate = Date.parse('2017-08-08 '+downtime);
		var sdate1 = Date.parse('2017-08-08 '+$('#pmUpTime').val());
		var edate1 = Date.parse('2017-08-08 '+$('#pmDownTime').val());
		btnEnable1(sdate,edate,sdate1,edate1);
	});
	$('#amDownTimeGroup').datetimepicker({
		format: 'hh:mm:ss', //日期格式
		pickDate: false
	}).on('changeDate',function(e){
		var uptime = $('#amUpTime').val();
		if(util.text.isEmpty(uptime)){
			return;
		}
		var sdate = Date.parse('2017-08-08 '+uptime);
		var edate = Date.parse('2017-08-08 '+$('#amDownTime').val());
		var sdate1 = Date.parse('2017-08-08 '+$('#pmUpTime').val());
		var edate1 = Date.parse('2017-08-08 '+$('#pmDownTime').val());
		btnEnable1(sdate,edate,sdate1,edate1);
	});
	$('#pmUpTimeGroup').datetimepicker({
		format: 'hh:mm:ss', //日期格式
		pickDate: false
	}).on('changeDate',function(e){
		var downtime = $('#pmDownTime').val();
		if(util.text.isEmpty($('#pmDownTime').val())){
			return;
		}
		var sdate = Date.parse('2017-08-08 '+$('#amUpTime').val());
		var edate = Date.parse('2017-08-08 '+$('#amDownTime').val());
		var sdate1 = Date.parse('2017-08-08 '+$('#pmUpTime').val());
		var edate1 = Date.parse('2017-08-08 '+downtime);
		btnEnable1(sdate,edate,sdate1,edate1);
	});
	$('#pmDownTimeGroup').datetimepicker({
		format: 'hh:mm:ss', //日期格式
		pickDate: false
	}).on('changeDate',function(e){
		var uptime = $('#pmUpTime').val();
		if(util.text.isEmpty(uptime)){
			return;
		}
		var sdate = Date.parse('2017-08-08 '+$('#amUpTime').val());
		var edate = Date.parse('2017-08-08 '+$('#amDownTime').val());
		var sdate1 = Date.parse('2017-08-08 '+uptime);
		var edate1 = Date.parse('2017-08-08 '+$('#pmDownTime').val());
		btnEnable1(sdate,edate,sdate1,edate1);
	});
};

function btnEnable(sdate,edate) {
	if(sdate < edate){
		btnOk();
	}else{
		btnNo();
	}
};
function btnEnable1(sdate,edate,sdate1,edate1) {
	if(sdate < edate && sdate1<edate1){
		btnOk();
	}else{
		btnNo();
	}
};
function btnOk(){
	var btn = $('#btnSave');
	btn.removeClass('btn-delete');
	btn.addClass('btn-primary');
	btn.removeAttr('disabled');
};
function btnNo(){
	var btn = $('#btnSave');
	btn.removeClass('btn-primary');
	btn.addClass('btn-delete');
	btn.attr('disabled','disabled');
};
function openTiming() {
	var btn = $('#btnOpenTiming'),
		flag = btn.text();
	$('.days').toggle();
	$('.timing').toggle();
	if('开启时间点考勤'== flag){
		btn.text('关闭时间点考勤');
		$('#isOpen').val('1');
	}else{
		btn.text('开启时间点考勤');
		$('#isOpen').val('0');
	}
	var open = $('#isOpen').val();
	if(open=='1'){
		var sdate = Date.parse('2017-08-08 '+$('#amUpTime').val());
		var edate = Date.parse('2017-08-08 '+$('#amDownTime').val());
		var sdate1 = Date.parse('2017-08-08 '+$('#pmUpTime').val());
		var edate1 = Date.parse('2017-08-08 '+$('#pmDownTime').val());
		btnEnable1(sdate,edate,sdate1,edate1);
	}else{
		var sdate = Date.parse('2017-08-08 '+$('#upTime').val());
		var edate = Date.parse('2017-08-08 '+$('#downTime').val());
		btnEnable(sdate,edate);
	}
};