
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

    $("#startDate").mobiscroll().date(dateConfig);
    $("#endDate").mobiscroll().date(dateConfig);

})
$('select[name^=type]').change(function () {
   var type = $('select[name^=type] option:selected').val()
    if(type==4){
       $('#lvbox').hide()
    }else {
        $('#lvbox').show()
    }
})
$('#submitFees').click(function () {
    var type = $('select[name^=type] option:selected').val()//选择利率方式
    var money = $('#money').val()//标的金额
    var ydll = $('#ydll').val()//约定利率
    var startDate = $('#startDate').val()//开始时间
    var endDate = $('#endDate').val()//结束时间
    var arr1 = startDate.split('-')//时间转数组
    var arr2 = endDate.split('-')
    var lastday = lastDays(startDate,endDate)
    var abc = {//人民银行利息表
        "19890201":["0.1134","0.1134","0.1278","0.1440","0.1926"],
        "19900821":["0.0864","0.0936","0.1008","0.1080","0.1116"],
        "19910321":["0.0900","0.1008","0.1080","0.1152","0.1188"],
        "19910421":["0.0810","0.0864","0.0900","0.0954","0.0972"],
        "19930515":["0.0882","0.0936","0.1080","0.1206","0.1224"],
        "19930711":["0.0900","0.1098","0.1224","0.1386","0.1404"],
        "19950101":["0.0900","0.1098","0.1296","0.1458","0.1476"],
        "19950701":["0.1008","0.1206","0.1305","0.1512","0.1530"],
        "19960501":["0.0972","0.1098","0.1314","0.1494","0.1512"],
        "19960823":["0.0918","0.1008","0.1098","0.1170","0.1242"],
        "19971023":["0.0765","0.0864","0.0936","0.0990","0.1053"],
        "19980325":["0.0702","0.0792","0.0900","0.0972","0.1035"],
        "19980701":["0.0657","0.0693","0.0711","0.0765","0.0801"],
        "19981207":["0.0612","0.0639","0.0666","0.0720","0.0756"],
        "19990610":["0.0558","0.0585","0.0594","0.0603","0.0621"],
        "20020221":["0.0504","0.0531","0.0549","0.0558","0.0576"],
        "20041029":["0.0522","0.0558","0.0576","0.0585","0.0612"],
        "20050317":["0.0522","0.0558","0.0576","0.0585","0.0612"],
        "20060428":["0.0540","0.0585","0.0603","0.0612","0.0639"],
        "20060819":["0.0558","0.0612","0.0630","0.0648","0.0684"],
        "20070318":["0.0567","0.0639","0.0657","0.0675","0.0711"],
        "20070519":["0.0585","0.0657","0.0675","0.0693","0.0720"],
        "20070721":["0.0603","0.0684","0.0702","0.0720","0.0738"],
        "20070822":["0.0621","0.0702","0.0720","0.0738","0.0756"],
        "20070915":["0.0648","0.0729","0.0747","0.0765","0.0783"],
        "20071221":["0.0657","0.0747","0.0756","0.0774","0.0783"],
        "20080916":["0.0621","0.0720","0.0729","0.0756","0.0774"],
        "20081009":["0.0612","0.0693","0.0702","0.0729","0.0747"],
        "20081027":["0.0612","0.0693","0.0702","0.0729","0.0747"],
        "20081030":["0.0603","0.0666","0.0675","0.0702","0.0720"],
        "20081127":["0.0504","0.0558","0.0567","0.0594","0.0612"],
        "20081223":["0.0486","0.0531","0.0540","0.0576","0.0594"],
        "20101020":["0.0510","0.0556","0.0560","0.0596","0.0614"],
        "20101226":["0.0535","0.0581","0.0585","0.0622","0.0640"],
        "20110209":["0.0560","0.0606","0.0610","0.0645","0.0660"],
        "20110406":["0.0585","0.0631","0.0640","0.0665","0.0680"],
        "20110707":["0.0610","0.0656","0.0665","0.0690","0.0705"],
        "20120608":["0.0585","0.0631","0.0640","0.0665","0.0680"],
        "20120706":["0.0560","0.0600","0.0615","0.0640","0.0655"],
        "20141122":["0.0560","0.0560","0.0600","0.0600","0.0615"],
        "20150301":["0.0535","0.0535","0.0575","0.0575","0.0590"],
        "20150511":["0.0510","0.0510","0.0550","0.0550","0.0565"],
        "20150628":["0.0485","0.0485","0.0525","0.0525","0.0540"],
        "20150826":["0.0460","0.0460","0.0500","0.0500","0.0515"]
    }
    if(lastday<=0){
        alert('结束日期要大于起算日期')
        return false
    }
    if(money==''||money==null){
        alert('请输入金额')
        return false
    }else if(money<=0){
        alert('输入金额要大于0')
        return false
    }
    if (startDate==''||startDate==null){
        alert('请选择起算日期')
        return false
    }
    if(endDate==''||endDate==null){
        alert('请选择结束日期')
        return false
    }
    var rateNum=0//利率百分比
    var singleDebt = 0//一般债务利息部分
    var doubleDebt = 0//加倍债务利息部分
    var allDebt = 0//延迟期间债务利息部分
    switch (type){//不同利率方式
        case '1'://日利率
            rateNum = ydll/100
            singleDebt = rateNum*money*lastday
            doubleDebt = lastday*money*0.000175
            allDebt = singleDebt+doubleDebt
            var html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">一般债务利息（元）：<span class="fr tr pr15">'+singleDebt.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">加倍部分债务利息（元）：<span class="fr tr pr15">'+doubleDebt.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">延迟期间债务利息（元）：<span class="fr tr pr15">'+allDebt.toFixed(2)+'元</span></p>' +
                '</div>'
            layer.open({
                content: html
            });
            break
        case '2'://月利率
            rateNum = ydll*12/360/100
            singleDebt = rateNum*money*lastday
            doubleDebt = lastday*money*0.000175
            allDebt = singleDebt+doubleDebt
            var html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">一般债务利息（元）：<span class="fr tr pr15">'+singleDebt.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">加倍部分债务利息（元）：<span class="fr tr pr15">'+doubleDebt.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">延迟期间债务利息（元）：<span class="fr tr pr15">'+allDebt.toFixed(2)+'元</span></p>' +
                '</div>'
            layer.open({
                content: html
            });
            break
        case '3'://年利率
            rateNum = ydll/360/100
            singleDebt = rateNum*money*lastday
            doubleDebt = lastday*money*0.000175
            allDebt = singleDebt+doubleDebt
            var html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">一般债务利息（元）：<span class="fr tr pr15">'+singleDebt.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">加倍部分债务利息（元）：<span class="fr tr pr15">'+doubleDebt.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">延迟期间债务利息（元）：<span class="fr tr pr15">'+allDebt.toFixed(2)+'元</span></p>' +
                '</div>'
            layer.open({
                content: html
            });
            break
        case '4'://人民银行同期利率
            if(arr2[2] < 10) arr2[2] = "0"+arr2[2];
            var endTime = arr2[0]+arr2[1]+arr2[2];

            if(arr1[2] < 10) arr1[2] = "0"+arr1[2];
            var beginTime = arr1[0]+arr1[1]+arr1[2];

            var lastTime;
            var breachMoney     = 0;

            for(var item in abc){


                if(endTime > item && item > beginTime ){

                    if(beginTime > lastTime && beginTime < item){
                        lastTime = beginTime;
                    }

                    differYear      = item.substring(0,4);
                    differMonth     = item.substring(4,6);
                    differDay       = item.substring(6,8);
                    var stamp = new Date(differYear,differMonth-1,differDay,0,0,0);

                    differYearOld      = lastTime.substring(0,4);
                    differMonthOld     = lastTime.substring(4,6);
                    differDayOld       = lastTime.substring(6,8);
                    var stampOld = new Date(differYearOld,differMonthOld-1,differDayOld,0,0,0);

                    var differTime = Number(stamp)/1000 - Number(stampOld)/1000;

                    var differTimeDay = differTime/24/60/60;

                    if(differTimeDay < 180){
                        breachMoney += money*differTimeDay*(lastTimeVal[0]/360);
                    }
                    else if(differTimeDay > 180 && differTimeDay < 365){
                        breachMoney += money*differTimeDay*(lastTimeVal[1]/360);
                    }
                    else if(differTimeDay > 365 && differTimeDay < 1095){
                        breachMoney += money*differTimeDay*(lastTimeVal[2]/360);
                    }
                    else if(differTimeDay > 1095 && differTimeDay < 1825){
                        breachMoney += money*differTimeDay*(lastTimeVal[3]/360);
                    }
                    else if(differTimeDay > 1825){
                        breachMoney += money*differTimeDay*(lastTimeVal[4]/360);
                    }
                }
                if(endTime < item){
                    item = endTime;
                    differYear      = item.substring(0,4);
                    differMonth     = item.substring(4,6);
                    differDay       = item.substring(6,8);
                    var stamp = new Date(differYear,differMonth-1,differDay,0,0,0);

                    differYearOld      = lastTime.substring(0,4);
                    differMonthOld     = lastTime.substring(4,6);
                    differDayOld       = lastTime.substring(6,8);
                    var stampOld = new Date(differYearOld,differMonthOld-1,differDayOld,0,0,0);

                    var differTime = Number(stamp)/1000 - Number(stampOld)/1000;

                    var differTimeDay = differTime/24/60/60;

                    if(differTimeDay < 180){
                        breachMoney += money*differTimeDay*(lastTimeVal[0]/360);
                    }
                    else if(differTimeDay > 180 && differTimeDay < 365){
                        breachMoney += money*differTimeDay*(lastTimeVal[1]/360);
                    }
                    else if(differTimeDay > 365 && differTimeDay < 1095){
                        breachMoney += money*differTimeDay*(lastTimeVal[2]/360);
                    }
                    else if(differTimeDay > 1095 && differTimeDay < 1825){
                        breachMoney += money*differTimeDay*(lastTimeVal[3]/360);
                    }
                    else if(differTimeDay > 1825){
                        breachMoney += money*differTimeDay*(lastTimeVal[4]/360);
                    }
                    var html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                        '<p class="jsjg-detail tl pl10">延迟期间债务利息（元）：<span class="fr tr pr15">'+(breachMoney.toFixed(2))*2+'元</span></p>' +
                        '</div>'
                    layer.open({
                        content: html
                    });
                    return false;
                }

                lastTime = item;
                lastTimeVal = abc[item];

            }

            if(endTime > lastTime && beginTime < item){
                item = endTime;
                differYear      = item.substring(0,4);
                differMonth     = item.substring(4,6);
                differDay       = item.substring(6,8);
                var stamp = new Date(differYear,differMonth-1,differDay,0,0,0);

                differYearOld      = lastTime.substring(0,4);
                differMonthOld     = lastTime.substring(4,6);
                differDayOld       = lastTime.substring(6,8);
                var stampOld = new Date(differYearOld,differMonthOld-1,differDayOld,0,0,0);

                var differTime = Number(stamp)/1000 - Number(stampOld)/1000;

                var differTimeDay = differTime/24/60/60;

                if(differTimeDay < 180){
                    breachMoney += money*differTimeDay*(lastTimeVal[0]/360);
                }
                else if(differTimeDay > 180 && differTimeDay < 365){
                    breachMoney += money*differTimeDay*(lastTimeVal[1]/360);
                }
                else if(differTimeDay > 365 && differTimeDay < 1095){
                    breachMoney += money*differTimeDay*(lastTimeVal[2]/360);
                }
                else if(differTimeDay > 1095 && differTimeDay < 1825){
                    breachMoney += money*differTimeDay*(lastTimeVal[3]/360);
                }
                else if(differTimeDay > 1825){
                    breachMoney += money*differTimeDay*(lastTimeVal[4]/360);
                }
            }
            if(beginTime > lastTime){
                item = beginTime;
                differYear      = item.substring(0,4);
                differMonth     = item.substring(4,6);
                differDay       = item.substring(6,8);
                var stamp = new Date(differYear,differMonth-1,differDay,0,0,0);

                differYearOld      = endTime.substring(0,4);
                differMonthOld     = endTime.substring(4,6);
                differDayOld       = endTime.substring(6,8);
                var stampOld = new Date(differYearOld,differMonthOld-1,differDayOld,0,0,0);

                var differTime = Number(stamp)/1000 - Number(stampOld)/1000;

                var differTimeDay = -(differTime/24/60/60);
                if(differTimeDay < 180){
                    breachMoney += money*differTimeDay*(lastTimeVal[0]/360);
                }
                else if(differTimeDay > 180 && differTimeDay < 365){
                    breachMoney += money*differTimeDay*(lastTimeVal[1]/360);
                }
                else if(differTimeDay > 365 && differTimeDay < 1095){
                    breachMoney += money*differTimeDay*(lastTimeVal[2]/360);
                }
                else if(differTimeDay > 1095 && differTimeDay < 1825){
                    breachMoney += money*differTimeDay*(lastTimeVal[3]/360);
                }
                else if(differTimeDay > 1825){
                    breachMoney += money*differTimeDay*(lastTimeVal[4]/360);
                }

            }
            var html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">延迟期间债务利息（元）：<span class="fr tr pr15">'+(breachMoney.toFixed(2))*2+'元</span></p>' +
                '</div>'
            layer.open({
                content: html
            });
            break

    }

})


// 计算两时间相差多少天，如果需要小时的话，除24即可
function lastDays(startTime, endTime){
    var st = new Date(startTime);
    var et = new Date(endTime);
    return (et.getTime() - st.getTime()) / 86400000;
}
