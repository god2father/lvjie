//tab切换
$('.data-title a').on('click',function () {
    $(this).addClass('active').siblings().removeClass('active')
    var target= $(this).attr('href')
    $('.form-box').hide()
    $(target).fadeIn()
    return false

})
$(function () {
    var currYear = (new Date()).getFullYear();
    dateConfig = {
        theme: 'ios', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        // nowText: "今天",
        startYear: currYear - 100, //开始年份
        endYear: currYear + 20 //结束年份
    };
    start=1970;

    end= 2100;

    $("#StartTime").mobiscroll().date(dateConfig);
    $("#EndTime").mobiscroll().date(dateConfig);
    $("#StartTime1").mobiscroll().date(dateConfig);


})
// 计算两时间相差多少天
function lastTime(startTime, endTime){
    var st = new Date(startTime);
    var et = new Date(endTime);
    return (et.getTime() - st.getTime()) / 86400000;
}
//天数计算
$('#submit').on('click',function () {
    var startTime=$('#StartTime').val()
    var endTime=$('#EndTime').val()
    if (startTime==''||startTime==null){
        alert('请选择开始日期')
        return false
    }
    if(endTime==''||endTime==null){
        alert('请选择结束日期')
        return false
    }
    var time=lastTime(startTime,endTime)
    var html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
        '<p class="jsjg-detail tl pl10">间隔天数（天）：<span class="fr tr pr15">'+time+'天</span></p>' +
        '</div>'

    layer.open({
        content: html
    });
})
//日期计算
var newWeek = new Array("日", "一", "二", "三", "四", "五", "六", "日");
$('#submit1').on('click',function () {
    var startTime=$('#StartTime1').val()
    var jgts=$('#jgts').val()
    var jsfs=$('#jsfs').val()
    var str=/^-?\d+$/;
    var state=str.test(jgts)
    if(!str.test(jgts)){
        alert('天数应为整数')
        return false
    }
    if(startTime==''||startTime==null){
        alert('请选择日期')
        return false
    }
    if(jgts==''||jgts==null||jgts<=0){
        alert('请输入正确的间隔天数')
        return false
    }
    if(jsfs==1){
        var newTime = new Date(startTime).getTime() + jgts*24000*3600
    }else {
        var newTime = new Date(startTime).getTime() - jgts*24000*3600
    }
    var newday = new Date()
    newday.setTime(newTime)
    var y=newday.getFullYear()
    var m=newday.getMonth()+1
    var d=newday.getDate()
    var week = newWeek[newday.getDay()]
    var html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
        '<p class="jsjg-detail tl pl10">结果：<span class="fr tr pr15">'+y+'年'+m+'月'+d+'日<span class="pl10">星期'+week+'</span> </span></p>' +
        '</div>'

    layer.open({
        content: html
    });
})



