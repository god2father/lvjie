//是否涉及财产UI改变
// $("#ccyes").click(function(){
//     $(this).addClass('active');
//     $("#ccno").removeClass('active');
//     $("#ssbd").css("display","block");
// });
// $("#ccno").click(function(){
//     $(this).addClass('active');
//     $("#ccyes").removeClass('active');
//     $("#ssbd").css("display","none");
// });
$("#aboutMoney").change(function(){
    if($(this).val() == 2){
        $("#ssbd").css("display","none");
    }else{
        $("#ssbd").css("display","block");
    }
    if($('#ccno').hasClass('active')){
        $('#ssbd').css('display','none')
    }
});

$("#fullMoney").click(function(){
    $(this).addClass('active');
    $("#halfMoney").removeClass('active');
});
$("#halfMoney").click(function(){
    $(this).addClass('active');
    $("#fullMoney").removeClass('active');
});

var resultHtml=''
var caseType='0'
$("select[name^=caseType]").change(function(){
    caseType = $(this).val();
    if( caseType==='labourDisputes'||caseType==='jurisdictionObjection'||caseType==='copyright'||caseType==='otherAdministrative'||caseType==='servicePublication'){
        $("#ssbd,#sjcc").hide();
    }else {
        $("#ssbd,#sjcc").show();
    }
    if(caseType==='property'||caseType==='accountableWarrant'){
        $('#sjcc').hide()
    }
});
//点击计算按钮
$('#submitFees').click(function () {
    console.log(caseType)
    var sjcc = $('#aboutMoney').val()//涉及财产（是、否）

    var jsfs = $('#jsfs1').val()//计算方式（全额、半额）

    var ssbd = $('#ssbd input').val()//诉讼标的（涉及金额）

    var costsMoney//计算结果

    var qb=0
    if(jsfs == 1){
        qb = 1
    }
    if (jsfs == 2){
        qb = 0.5
    }
    if(caseType=='0'){
        alert('请选择案件类型')
        return false
    }
    if(caseType=='property'){//财产案件

        if(ssbd==''){
            alert('请填写诉讼金额')
            return false
        }
        var allMoney = [10000,100000,200000,500000,1000000,2000000,5000000,10000000,20000000];
        var allPer = [50,0.025,0.02,0.015,0.01,0.009,0.008,0.007,0.006,0.005];
        var allPerMoney = [50,2250,2000,4500,5000,9000,24000,35000,60000];
        var index=-1
        for(var i=0;i<allMoney.length;i++){
            if (ssbd - allMoney[i] < 0){
                index=i
                break
            }
        }
    //    第一个区间
        if(index==0){
            costsMoney=allPerMoney[0]*qb//区间金额X全额or半额=诉讼费金额
            showResult(costsMoney.toFixed(2))
            return false
        }

    //    最大区间
        var d=0
        if (index == -1) {
            for (var i = 0; i < allPerMoney.length; i++) {
                d += allPerMoney[i];
            }
            var v = (ssbd - allMoney[allMoney.length - 1]) *allPer[allPer.length-1] + d;
            costsMoney = v*qb;
            showResult(costsMoney.toFixed(2))
            return false;
        }

    //    正常流程
        for (var i = 1; i <= index; i++) {
            d = allPerMoney[i - 1] + d;
        }
        var v = (ssbd - allMoney[index - 1]) * allPer[index] + d;
        costsMoney = v*qb;
        showResult(costsMoney.toFixed(2))
        return false;
    }
    if(caseType=='divorce'){//离婚案件
        var lhfei = ["25~150","50~300"]
        var lihun = 0
        if (sjcc == 1){//涉及财产
            if(ssbd==''){
                alert('请输入诉讼金额')
                return false
            }
            if(ssbd <= 200000){
                if(jsfs == 1){
                    showResult(lhfei[1])
                    return false
                }
                if(jsfs == 2){
                    showResult(lhfei[0])
                    return false
                }
            }
            if(ssbd > 200000){
                var resultTxt=''
                if(jsfs == 1){
                    lihun = (ssbd - 200000) * 0.005
                    var min = lihun + 50
                    var max = lihun +300
                    min= min.toFixed(2)
                    max= max.toFixed(2)
                    resultTxt = min+"~"+max
                    showResult(resultTxt)
                    return false
                }
                if(jsfs == 2){
                    lihun = (ssbd - 200000) * 0.005
                    var min = lihun + 25
                    var max = lihun +150
                    min= min.toFixed(2)
                    max= max.toFixed(2)
                    resultTxt = min+"~"+max
                    showResult(resultTxt)
                    return false
                }
            }
        }
        if(sjcc == 2){//不涉及财产
            if(jsfs == 1){
                showResult(lhfei[1])
                return false
            }
            if(jsfs == 2){
                showResult(lhfei[0])
                return false
            }
        }
    }
    if(caseType=='personaRight'){//人格权案件
        var personaRightFees = ['50~250','100~500']
        if(sjcc==1){
            if (ssbd==''){
                alert('请输入诉讼金额')
                return false
            }
            if(ssbd<=50000){//5w以内
                if(jsfs==1){
                    showResult(personaRightFees[1])
                    return false
                }
                if (jsfs==2){
                    showResult(personaRightFees[0])
                    return false
                }
            }
            if(ssbd>50000 && ssbd<=100000){//5w~10w
                var min = (ssbd - 50000) * 0.01*qb + 100;
                min=min.toFixed(2)
                var max = (ssbd - 50000) * 0.01*qb + 500;
                max=max.toFixed(2)
                resultTxt = min+"~"+max
                showResult(resultTxt)
                return false
            }
            if(ssbd>100000){//大于10w
                var min = (100000 - 50000) * 0.01*qb + (ssbd - 100000) * 0.005 * qb + 100;
                min=min.toFixed(2)
                var max = (100000 - 50000) * 0.01*qb + (ssbd - 100000) * 0.005 * qb + 500;
                max=max.toFixed(2)
                resultTxt = min+"~"+max
                showResult(resultTxt)
                return false
            }
        }
        if(sjcc==2){
            if(jsfs==1){
                showResult(personaRightFees[1])
               return false
            }
            if(jsfs==2){
                showResult(personaRightFees[0])
                return false
            }
        }

    }
    if(caseType=='intelligenceFruit'){//知识产权案件
        if(sjcc==1){
            if(ssbd==''){
                alert('请输入诉讼金额')
            }
            var allMoney = [10000,100000,200000,500000,1000000,2000000,5000000,10000000,20000000];
            var allPer = [50,0.025,0.02,0.015,0.01,0.009,0.008,0.007,0.006,0.005];
            var allPerMoney = [50,2250,2000,4500,5000,9000,24000,35000,60000];


            var index = -1;
            for (var i = 0; i < allMoney.length; i++) {
                if (ssbd - allMoney[i] < 0) {
                    index = i;
                    break;
                }
            }
            //第一个区间
            if (index == 0) {

                var resultMoney =allPerMoney[0]*qb
                resultMoney=resultMoney.toFixed(2)
                showResult(resultMoney)
                return false;
            }

            //最大的区间
            var d=0;
            if (index == -1) {
                for (var i = 0; i < allPerMoney.length; i++) {
                    d += allPerMoney[i];
                }
                var v = (ssbd - allMoney[allMoney.length - 1]) *allPer[allPer.length-1] + d;
                v=v*qb
                showResult(v.toFixed(2))
                return false;
            }


            //正常流程
            for (var i = 1; i <= index; i++) {
                d = allPerMoney[i - 1] + d;
            }
            var v = (ssbd - allMoney[index - 1]) * allPer[index] + d;
           v=v*qb
            showResult(v.toFixed(2))
            return false;
        }
        if(sjcc == 2){
            var ifFees = ["250~500","500~1000"]
            if(jsfs == 1){
                showResult(ifFees[1])
                return false;
            }
            if(jsfs == 2){
                showResult(ifFees[0])
                return false;
            }
        }
    }
    if(caseType=='propertyPreservation'){//财产保全案件
        if(sjcc == 1){
            if(ssbd== ''){
                alert('请输入诉讼金额')
                return false
            }
            if(ssbd <= 1000){
                showResult(30*qb)
                return false
            }
            if(ssbd > 1000 && ssbd <= 100000){
                var resultMoney = (30 + (ssbd - 1000)*0.01)*qb
               showResult(resultMoney.toFixed(2))
                return false
            }
            if(ssbd > 100000){
                var resultMoney = (30 + (100000 - 1000)*0.01 + (ssbd - 100000)*0.005)*qb;
                if(resultMoney > 5000){
                    resultMoney = 5000
                }
                showResult(resultMoney.toFixed(2))
                return false
            }
        }
        if(sjcc == 2){
            showResult(30*qb)
            return false
        }
    }
    if(caseType=='labourDisputes'){//劳动争议案件
        showResult(10*qb)
    }
    if(caseType=='jurisdictionObjection'){//管辖权异议不成立的案件
        var jurisdictionObjectionFees = ["25~50","50~100","（省、自治区、直辖市人民政府可以结合本地实际情况在本条第（二）项、第（三）项、第（六）项规定的幅度内制定具体交纳标准。）"]
        if(jsfs == 1){
            showResult(jurisdictionObjectionFees[1])
            return false
        }
        if(jsfs == 2){
            showResult(jurisdictionObjectionFees[0])
            return false
        }
    }
    if(caseType=='copyright'){//商标、专利、海事行政案件
        showResult(100*qb)
        return false
    }
    if(caseType=='otherAdministrative'){//其他行政案件
        showResult(50*qb)
        return false
    }
    if(caseType=='accountableWarrant'){//支付令
        if(ssbd==''){
            alert('请输入诉讼金额')
            return false
        }
        var allMoney = [10000,100000,200000,500000,1000000,2000000,5000000,10000000,20000000];
        var allPer = [50,0.025,0.02,0.015,0.01,0.009,0.008,0.007,0.006,0.005];
        var allPerMoney = [50,2250,2000,4500,5000,9000,24000,35000,60000];

        var index=-1
        for(var i=0;i<allMoney.length;i++){
            if(ssbd-allMoney[i] < 0){
                index=i
                break
            }
        }
        if(index==0){//第一个区间
            showResult(((allPerMoney[0]/3)*qb).toFixed(2))
            return false
        }
    //    最大区间
        var d=0
        if(index==-1){
            for(var i=0;i<allPerMoney.length-1;i++){
                d+=allPerMoney[i]
            }
            var v= (ssbd-allMoney[allMoney.length-1])*allPer[allPer.length-1]+d
            v=v/3
            showResult((v*qb).toFixed(2))
            return false
        }
    //    正常流程
        for(var i=1;i<=index;i++){
            d =allPerMoney[i-1]+d
        }
        var v=(ssbd-allMoney[index-1])*allPer[index]+d
        showResult(((v/3)*qb).toFixed(2))
        return false
    }
    if(caseType=='servicePublication'){//公示催告
        showResult(100*qb)
        return false
    }
})





function showResult(costsMoney) {//计算结果显示
    layer.open({
        content: '<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
        '<p class="jsjg-detail tl pl10">受理费（元）：<span class="fr tr pr15">'+costsMoney+'元</span></p>' +
        '</div>'
    });
}