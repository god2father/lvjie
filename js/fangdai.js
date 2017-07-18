//ui变化
changeUI()
$('#type').change(function () {
    changeUI()
})
function changeUI() {
    var type = $('#type').val()
    switch (type){
        case '1':
            $('#dkzeBox').show()
            $('#syBox').hide()
            $('#gjjBox').hide()
            $('#llBox').show()
            $('#syllBox').show()
            $('#gjjllBox').hide()
            $()
            break
        case '2':
            $('#dkzeBox').show()
            $('#syBox').hide()
            $('#gjjBox').hide()
            $('#llBox').hide()
            $('#syllBox').hide()
            $('#gjjllBox').show()
            break
        case '3':
            $('#dkzeBox').hide()
            $('#syBox').show()
            $('#gjjBox').show()
            $('#llBox').show()
            $('#syllBox').show()
            $('#gjjllBox').show()
            break
    }
}
changeRate()
$('#dkll').change(function () {
    changeRate()
})
function changeRate() {
    var rate = $('#dkll').val()
    var baseRate = 4.9//基本利率
    var newRate
    switch (rate){
        case '1':
            newRate = (baseRate*1.1).toFixed(2)
            $('#syll').val(newRate)
            break
        case '2':
            newRate = (baseRate*0.95).toFixed(2)
            $('#syll').val(newRate)
            break
        case '3':
            newRate = (baseRate*0.9).toFixed(2)
            $('#syll').val(newRate)
            break
        case '4':
            newRate = (baseRate*0.88).toFixed(2)
            $('#syll').val(newRate)
            break
        case '5':
            newRate = (baseRate*0.85).toFixed(2)
            $('#syll').val(newRate)
            break
        case '6':
            newRate = (baseRate*0.7).toFixed(2)
            $('#syll').val(newRate)
            break
        case '7':
            $('#syll').val(baseRate)
            break
    }
}
$('#submit').on('click',function () {
    var type = $('#type').val()//贷款类型：1商业；2公积金；3组合贷
    var dkze =$('#dkze').val()//贷款总额
    var sydk = $('#sydk').val()//商业贷款总额
    var gjjdk = $('#gjjdk').val()//公积金贷款总额
    var year = $('#year').val()//贷款年数
    var syll = $('#syll').val()//商业贷款利率
    var gjjll = $('#gjjll').val()//公积金贷款利率
    var hkfs = $('#hkfs').val()//还款方式：1等额本息；2等额本金
    var month = year*12
    dkze = dkze*10000//万元转换成元
    sydk = sydk*10000
    gjjdk = gjjdk*10000
    syll = syll/100
    gjjll = gjjll/100
    switch (type){
        case '1'://商业贷款
            if(dkze==''||dkze==null||dkze<=0){
                alert('请输入正确的贷款总额')
                return false
            }
            if(syll==''||syll==null||syll<=0){
                alert('请输入正确的贷款利率')
                return false
            }
            if(hkfs=='1'){//等额本息
                var money1 = getMonthMoney1(syll,dkze,month)//每月还款
                var totalMoney1 = money1*month //还款总额
                var rateMoney1 = totalMoney1 - dkze//利息总额
                var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                    '<p class="jsjg-detail tl pl10">还款方式：<span class="fr tr pr15">等额本息</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款总额（元）：<span class="fr tr pr15">'+dkze.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">还款总额（元）：<span class="fr tr pr15">'+totalMoney1.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">支付利息（元）：<span class="fr tr pr15">'+rateMoney1.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款月数（月）：<span class="fr tr pr15">'+month+'月</span></p>' +
                    '<p class="jsjg-detail tl pl10">月均还款（元）：<span class="fr tr pr15">'+money1.toFixed(2)+'元</span></p>' +
                    '</div>'

                layer.open({
                    content: Html
                })
            }else {
                var money2=''
                var totalMoney2=0
                var monthMoney2=0
                for(i=0;i<month;i++){
                    monthMoney2 = getMonthMoney2(syll,dkze,month,i)
                    totalMoney2 += parseFloat(monthMoney2)
                    money2 += '<p class="jsjg-detail tl pl10">'+(i+1)+'月：<span class="fr tr pr15">'+monthMoney2.toFixed(2)+'元</span></p>'
                }
                var rateMoney2 = totalMoney2 - dkze
                var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                    '<p class="jsjg-detail tl pl10">还款方式：<span class="fr tr pr15">等额本金</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款总额（元）：<span class="fr tr pr15">'+dkze.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">还款总额（元）：<span class="fr tr pr15">'+parseFloat(totalMoney2).toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">支付利息（元）：<span class="fr tr pr15">'+rateMoney2.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款月数（月）：<span class="fr tr pr15">'+month+'月</span></p>'+
                    '<h2 class="tc w100 color-1b0000 jsjg-title mt50">每月还款</h2>' +money2 +
                    '</div>'

                layer.open({
                    content: Html
                })
            }
            break
        case '2'://公积金贷款
            if(dkze==''||dkze==null||dkze<=0){
                alert('请输入正确的贷款总额')
                return false
            }
            if(gjjll==''||gjjll==null||gjjll<=0){
                alert('请输入正确的贷款利率')
                return false
            }
            if(hkfs=='1'){//等额本息
                var money1 = getMonthMoney1(gjjll,dkze,month)//每月还款
                var totalMoney1 = money1*month //还款总额
                var rateMoney1 = totalMoney1 - dkze//利息总额
                var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                    '<p class="jsjg-detail tl pl10">还款方式：<span class="fr tr pr15">等额本息</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款总额（元）：<span class="fr tr pr15">'+dkze.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">还款总额（元）：<span class="fr tr pr15">'+totalMoney1.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">支付利息（元）：<span class="fr tr pr15">'+rateMoney1.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款月数（月）：<span class="fr tr pr15">'+month+'月</span></p>' +
                    '<p class="jsjg-detail tl pl10">月均还款（元）：<span class="fr tr pr15">'+money1.toFixed(2)+'元</span></p>' +
                    '</div>'

                layer.open({
                    content: Html
                })
            }else {
                var money2=''
                var totalMoney2=0
                var monthMoney2=0
                for(i=0;i<month;i++){
                    monthMoney2 = getMonthMoney2(gjjll,dkze,month,i)
                    totalMoney2 += parseFloat(monthMoney2)
                    money2 += '<p class="jsjg-detail tl pl10">'+(i+1)+'月：<span class="fr tr pr15">'+monthMoney2.toFixed(2)+'元</span></p>'
                }
                var rateMoney2 = totalMoney2 - dkze
                var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                    '<p class="jsjg-detail tl pl10">还款方式：<span class="fr tr pr15">等额本金</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款总额（元）：<span class="fr tr pr15">'+dkze.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">还款总额（元）：<span class="fr tr pr15">'+parseFloat(totalMoney2).toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">支付利息（元）：<span class="fr tr pr15">'+rateMoney2.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款月数（月）：<span class="fr tr pr15">'+month+'月</span></p>'+
                    '<h2 class="tc w100 color-1b0000 jsjg-title mt50">每月还款</h2>' +money2 +
                    '</div>'

                layer.open({
                    content: Html
                })
            }
            break
        case '3'://组合贷款
            if(sydk==''||sydk==null||sydk<=0){
                alert('请输入正确的商业贷款额度')
                return false
            }
            if(gjjdk==''||gjjdk==null||gjjdk<=0){
                alert('请输入正确的公积金贷款额度')
                return false
            }
            if(syll==''||syll==null||syll<=0){
                alert('请输入正确的商业贷款利率')
                return false
            }
            if(gjjll==''||gjjll==null||gjjll<=0){
                alert('请输入正确的公积金贷款利率')
                return false
            }
            if(hkfs=='1'){//等额本息
                var money1 = getMonthMoney1(gjjll,gjjdk,month) + getMonthMoney1(syll,sydk,month)//每月还款
                var totalMoney1 = money1*month //还款总额
                var rateMoney1 = totalMoney1 - (sydk+gjjdk)//利息总额
                var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                    '<p class="jsjg-detail tl pl10">还款方式：<span class="fr tr pr15">等额本息</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款总额（元）：<span class="fr tr pr15">'+(sydk+gjjdk).toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">还款总额（元）：<span class="fr tr pr15">'+totalMoney1.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">支付利息（元）：<span class="fr tr pr15">'+rateMoney1.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款月数（月）：<span class="fr tr pr15">'+month+'月</span></p>' +
                    '<p class="jsjg-detail tl pl10">月均还款（元）：<span class="fr tr pr15">'+money1.toFixed(2)+'元</span></p>' +
                    '</div>'

                layer.open({
                    content: Html
                })
            }else {//等额本金
                var money2=''
                var totalMoney2=0
                var monthMoney2=0
                for(i=0;i<month;i++){
                    monthMoney2 = getMonthMoney2(gjjll,gjjdk,month,i) + getMonthMoney2(syll,sydk,month,i)
                    totalMoney2 += parseFloat(monthMoney2)
                    money2 += '<p class="jsjg-detail tl pl10">'+(i+1)+'月：<span class="fr tr pr15">'+monthMoney2.toFixed(2)+'元</span></p>'
                }
                var rateMoney2 = totalMoney2 - (sydk+gjjdk)
                var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                    '<p class="jsjg-detail tl pl10">还款方式：<span class="fr tr pr15">等额本金</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款总额（元）：<span class="fr tr pr15">'+(sydk+gjjdk).toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">还款总额（元）：<span class="fr tr pr15">'+parseFloat(totalMoney2).toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">支付利息（元）：<span class="fr tr pr15">'+rateMoney2.toFixed(2)+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">贷款月数（月）：<span class="fr tr pr15">'+month+'月</span></p>'+
                    '<h2 class="tc w100 color-1b0000 jsjg-title mt50">每月还款</h2>' +money2 +
                    '</div>'

                layer.open({
                    content: Html
                })
            }
            break
    }
})
//本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 / 贷款当前月0～length-1)
function getMonthMoney2(lilv, total, month, cur_month) {
    var lilv_month = lilv / 12; //月利率
    //return total * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1 );
    var benjin_money = total / month;
    return (total - benjin_money * cur_month) * lilv_month + benjin_money;


}
//本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
function getMonthMoney1(lilv, total, month) {
    var lilv_month = lilv / 12; //月利率
    return total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1);
}