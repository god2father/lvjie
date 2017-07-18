
function changeUI() {
    var type=$('#type').val();
    if(type==1){
        $('#sqgzBox').show()
        $('#shbzBox').show()
        $('#qzdBox').show()
        $('#sqgz').val('')
        $('#shbzf').val('')
        $('#shgzBox').hide()
        $('#nzjjBox').hide()
        $('#srjeBox').hide()
    }else {
        $('#sqgzBox').hide()
    }
    if(type==2){
        $('#shgzBox').show()
        $('#shbzBox').show()
        $('#qzdBox').show()
        $('#sqgzBox').hide()
        $('#nzjjBox').hide()
        $('#srjeBox').hide()
    }else {
        $('#shgzBox').hide()
    }
    if(type==3){
        $('#nzjjBox').show()
        $('#qzdBox').hide()
        $('#shbzBox').hide()
    }else {
        $('#nzjjBox').hide()
    }
    if(type==6){
        $('#monthBox').show()
    }else {
        $('#monthBox').hide()
    }
    if (type==4||type==5||type==6||type==7||type==8||type==9||type==10||type==11||type==12){
        $('#srjeBox').show()
        $('#srje').val('')
        $('#sqgzBox').hide()
        $('#qzdBox').hide()
        $('#shbzBox').hide()
    }else {
        $('#srjeBox').hide()
    }
}
changeUI()
$('#type').change(function () {
    changeUI()
})
$('#submit').on('click',function () {
    var type=$('#type').val()//收入类型
    var sqgz=$('#sqgz').val()//税前工资
    var shgz=$('#shgz').val()//税后工资
    var shbzf=$('#shbzf').val()//社会保障费
    var qzd=$('#qzd').val()//起征点1：3500，2：4800
    var nzjj=$('#nzjj').val()//年终奖金
    var srje=$('#srje').val()//收入金额
    var month=$('#month').val()//经营时间

    switch (type){
        case '1'://工资、薪金所得（月薪）
        if(sqgz<=0||sqgz==''||sqgz==null){
            alert('请输入正确的金额')
            $('#sqgz').focus()
            return false
        }
        if(shbzf<0){
            alert('社会保障费金额不正确')
            $('#shbzf').focus()
            return false
        }
        if(qzd==1){
            qzd=3500
        }else {
            qzd=4800
        }
        var baseMoney=sqgz-shbzf-qzd
        if(baseMoney<=0){
            alert('您无需缴纳个人所得税')
            return false
        }
            var R,Q
            var A=baseMoney
            A=A.toFixed(2)
            if(A<=1500){R=0.03;Q=0;}
            else if(A>1500 && A<=4500){R=0.1;Q=105}
            else if(A>4500 && A<=9000){R=0.2;Q=555}
            else if(A>9000 && A<=35000){R=0.25;Q=1005}
            else if(A>35000 && A<=55000){R=0.3;Q=2755}
            else if(A>55000 && A<=80000){R=0.35;Q=5505}
            else{R=0.45;Q=13505;}
            var tax=A * R -Q
            var realMoney=sqgz - shbzf - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">应纳税部分所得额（元）：<span class="fr tr pr15">'+A+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率（元）：<span class="fr tr pr15">'+R*100+'%</span></p>' +
                '<p class="jsjg-detail tl pl10">速算扣除（元）：<span class="fr tr pr15">'+Q+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">实发工资（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '2'://税后工资推税前
            if(shgz<=0||shgz==''||shgz==null){
                alert('请输入正确的金额')
                $('#shgz').focus()
                return false
            }
            if(shbzf<0){
                alert('社会保障费金额不正确')
                $('#shbzf').focus()
                return false
            }
            if(qzd==1){
                qzd=3500
            }else {
                qzd=4800
            }
            var baseMoney =   shgz - qzd
            if(baseMoney <= 0){
                var realMoney = parseFloat(shgz)+parseFloat(shbzf)
                var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                    '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">0.00 元</span></p>' +
                    '<p class="jsjg-detail tl pl10">税前工资（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                    '</div>'

                layer.open({
                    content: Html
                })
                return false
            }
            var R,Q;
            var A=baseMoney;
            A=A.toFixed(2);

            if(A<=1455){R=0.03;Q=0;}
            else if(A>1455 && A<=4155){R=0.1;Q=105}
            else if(A>4155 && A<=7755){R=0.2;Q=555}
            else if(A>7755 && A<=27255){R=0.25;Q=1005}
            else if(A>27255 && A<=41255){R=0.3;Q=2755}
            else if(A>41255 && A<=57505){R=0.35;Q=5505}
            else{R=0.45;Q=13505;}

            baseMoney=(A - Q)/(1-R);
            A=baseMoney.toFixed(2);
            if(A<=1500){R=0.03;Q=0;}
            else if(A>1500 && A<=4500){R=0.1;Q=105}
            else if(A>4500 && A<=9000){R=0.2;Q=555}
            else if(A>9000 && A<=35000){R=0.25;Q=1005}
            else if(A>35000 && A<=55000){R=0.3;Q=2755}
            else if(A>55000 && A<=80000){R=0.35;Q=5505}
            else{R=0.45;Q=13505;}
            var tax=A * R -Q;
            var sqMoney=parseFloat(shgz) +parseFloat(shbzf) + parseFloat(tax);
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+' 元</span></p>' +
                '<p class="jsjg-detail tl pl10">税前工资（元）：<span class="fr tr pr15">'+sqMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '3'://年终奖个税
            if(nzjj<=0){
                alert('请输入正确的年终奖金额')
                $('#nzjj').focus()
                return false
            }
            var R,Q;
            var A=parseFloat(nzjj)/12;
            A=A.toFixed(2);
            if(A<=1500){R=0.03;Q=0;}
            else if(A>1500 && A<=4500){R=0.1;Q=105}
            else if(A>4500 && A<=9000){R=0.2;Q=555}
            else if(A>9000 && A<=35000){R=0.25;Q=1005}
            else if(A>35000 && A<=55000){R=0.3;Q=2755}
            else if(A>55000 && A<=80000){R=0.35;Q=5505}
            else{R=0.45;Q=13505;}
            var tax = parseFloat(nzjj) * R -Q
            var realMoney = parseFloat(nzjj) - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">平均每月（元）：<span class="fr tr pr15">'+A+' 元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">'+R*100+' %</span></p>' +
                '<p class="jsjg-detail tl pl10">速算扣除（元）：<span class="fr tr pr15">'+Q+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '4'://劳动所得
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            if(srje<800){
                alert('800元以下无需缴税')
                return false
            }
            var lowMoney = 800
            if(srje > 4000){
                lowMoney = parseFloat(srje) * 0.2
            }
            var baseMoney = parseFloat(srje) - lowMoney
            var R = 0.2,Q = 0
            if(baseMoney > 20000 && baseMoney<=50000)
            {
                R=0.3;
                Q=2000;
            }else if( baseMoney > 50000)
            {
                R=0.4;
                Q=7000;
            }
            var tax=baseMoney * R - Q
            var realMoney = parseFloat(srje) - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">减除费用（元）：<span class="fr tr pr15">'+lowMoney.toFixed(2)+' 元</span></p>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+baseMoney.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">'+R*100+' %</span></p>' +
                '<p class="jsjg-detail tl pl10">速算扣除（元）：<span class="fr tr pr15">'+Q+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '5'://个体工商户生产、经营所得
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            var A=parseFloat(srje)
            var R=0,Q=0;
            if(A<=15000){R=0.05;Q=0;}
            else if( A>15000  && A<=30000){R=0.1;Q=750;}
            else if( A>30000 && A<=60000){R=0.2;Q=3750;}
            else if( A>60000 && A<=100000){R=0.3;Q=9750;}
            else if( A>100000){R=0.35;Q=14750;}

            var tax=A * R - Q;
            var realMoney = A - tax;
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+A.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">'+R*100+' %</span></p>' +
                '<p class="jsjg-detail tl pl10">速算扣除（元）：<span class="fr tr pr15">'+Q+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '6'://承包承租
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            srje = parseFloat(srje)
            var baseMoney = srje - month*3500
            if(baseMoney<=0){
                var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                    '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+0+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">'+0+' %</span></p>' +
                    '<p class="jsjg-detail tl pl10">速算扣除（元）：<span class="fr tr pr15">'+Q+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+0+'元</span></p>' +
                    '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+srje.toFixed(2)+'元</span></p>' +
                    '</div>'

                layer.open({
                    content: Html
                })
                return false
            }
            var A=baseMoney.toFixed(2);
            var R=0,Q=0;
            if(A<=15000){R=0.05;Q=0;}
            else if( A>15000  && A<=30000){R=0.1;Q=750;}
            else if( A>30000 && A<=60000){R=0.2;Q=3750;}
            else if( A>60000 && A<=100000){R=0.3;Q=9750;}
            else if( A>100000){R=0.35;Q=14750;}

            var tax=A * R - Q;
            var realMoney = srje - tax;
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+A+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">'+R*100+' %</span></p>' +
                '<p class="jsjg-detail tl pl10">速算扣除（元）：<span class="fr tr pr15">'+Q+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '7'://稿酬所得
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            srje = parseFloat(srje)
            if (srje<800){
                alert('收入少于800元无需缴税')
                return false
            }
            var baseMoney = 800
            if(srje>4000){
                baseMoney = srje * 0.2
            }
            var newMoney = srje - baseMoney
            var tax = newMoney * 0.14
            var realMoney = srje - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">减除费用（元）：<span class="fr tr pr15">'+baseMoney.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+newMoney.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">14 %</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '8'://特许权使用费
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            srje = parseFloat(srje)
            if (srje<800){
                alert('收入少于800元无需缴税')
                return false
            }
            var baseMoney = 800
            if(srje>4000){
                baseMoney = srje * 0.2
            }
            var newMoney = srje - baseMoney
            var tax = newMoney * 0.2
            var realMoney = srje - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">减除费用（元）：<span class="fr tr pr15">'+baseMoney.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+newMoney.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">20 %</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '9'://财产租赁
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            srje = parseFloat(srje)
            if (srje<800){
                alert('收入少于800元无需缴税')
                return false
            }
            var baseMoney = 800
            if(srje>4000){
                baseMoney = srje * 0.2
            }
            var newMoney = srje - baseMoney
            var tax = newMoney * 0.2
            var realMoney = srje - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">减除费用（元）：<span class="fr tr pr15">'+baseMoney.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+newMoney.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">20 %</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '10'://财产转让
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            var tax = srje * 0.2
            var realMoney = srje - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+parseFloat(srje).toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">20 %</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

                layer.open({
                    content: Html
                })
                break
        case '11'://利息、股息、红利
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            var tax = srje * 0.2
            var realMoney = srje - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+parseFloat(srje).toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">20 %</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
        case '12'://偶然所得
            if(srje<=0){
                alert('请输入正确金额')
                $('#srje').focus()
                return false
            }
            var tax = srje * 0.2
            var realMoney = srje - tax
            var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
                '<p class="jsjg-detail tl pl10">应纳税所得额（元）：<span class="fr tr pr15">'+parseFloat(srje).toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">适用税率：<span class="fr tr pr15">20 %</span></p>' +
                '<p class="jsjg-detail tl pl10">应缴税款（元）：<span class="fr tr pr15">'+tax.toFixed(2)+'元</span></p>' +
                '<p class="jsjg-detail tl pl10">税后收入（元）：<span class="fr tr pr15">'+realMoney.toFixed(2)+'元</span></p>' +
                '</div>'

            layer.open({
                content: Html
            })
            break
    }
})