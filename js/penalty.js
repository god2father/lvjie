$(function () {
    var currYear = (new Date()).getFullYear();
    dateConfig = {
        theme: 'ios', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 100, //开始年份
        endYear: currYear + 20 //结束年份
    };
    start=1970;

    end= 2100;

    $("#StartTime").mobiscroll().date(dateConfig);
    $("#EndTime").mobiscroll().date(dateConfig);


})
// 计算两时间相差多少天，如果需要小时的话，除24即可
function lastTime(startTime, endTime){
    var st = new Date(startTime);
    var et = new Date(endTime);
    return (et.getTime() - st.getTime()) / 86400000;
}
$('#submitFees').click(function () {
    var bdje = $('#bdje').val()
    var startTime = $('#StartTime').val()
    var endTime = $('#EndTime').val()
    var time = lastTime(startTime,endTime)
    var srlv = $('#srlv').val()
    var type = $('select[name^=type] option:selected').val()
    if(bdje==''||bdje==null){
        alert('请输入标的金额')
        return false
    }
    if(startTime==''||startTime==null){
        alert('请选择开始日期')
        return false
    }
    if(endTime==''||endTime==null){
        alert('请选择结束日期')
        return false
    }
    if(time<=0){
        alert('结束日期要大于开始日期，请重新选择')
        return false
    }
    if(srlv==''||srlv==null){
        alert('请输入利率')
        return false
    }
    switch (type){
        case '0':
            alert('请选择利率方式')
            break
        case '1':
            var rate = srlv*0.01
            var rateMoney = (parseFloat(bdje)*parseInt(time)*rate).toFixed(2)
            var rateHtml='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">逾期天数（天）：<span class="fr tr pr15">'+time+'天</span></p>' +
                '<p class="jsjg-detail tl pl10">利率：<span class="fr tr pr15">'+rate+'每天</span></p>' +
                '<p class="jsjg-detail tl pl10">违约金（元）：<span class="fr tr pr15">'+rateMoney+'元</span></p>' +
                '</div>'

            layer.open({
                content: rateHtml
            });
            break
        case '2':
            var rate = (srlv*0.01/30).toFixed(6)
            var rateMoney = (parseFloat(bdje)*parseInt(time)*rate).toFixed(2)
            var rateHtml='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">逾期天数（天）：<span class="fr tr pr15">'+time+'天</span></p>' +
                '<p class="jsjg-detail tl pl10">利率：<span class="fr tr pr15">'+rate+'每天</span></p>' +
                '<p class="jsjg-detail tl pl10">违约金（元）：<span class="fr tr pr15">'+rateMoney+'元</span></p>' +
                '</div>'

            layer.open({
                content: rateHtml
            });
            break
        case '3':
            var rate = (srlv*0.01/360).toFixed(6)
            var rateMoney = (parseFloat(bdje)*parseInt(time)*rate).toFixed(2)
            var rateHtml='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">逾期天数（天）：<span class="fr tr pr15">'+time+'天</span></p>' +
                '<p class="jsjg-detail tl pl10">利率：<span class="fr tr pr15">'+rate+'每天</span></p>' +
                '<p class="jsjg-detail tl pl10">违约金（元）：<span class="fr tr pr15">'+rateMoney+'元</span></p>' +
                '</div>'

            layer.open({
                content: rateHtml
            });
            break
    }
})