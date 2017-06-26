//是否涉及财产UI改变
// $("#ccyes").click(function(){
//     $(this).addClass('active');
//     $("#ccno").removeClass('active');
//     $("#ssbd").css("display","block");
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
// $("#ccno").click(function(){
//     $(this).addClass('active');
//     $("#ccyes").removeClass('active');
//     $("#ssbd").css("display","none");
// });
//选择案件类型的UI改变
$("#caseType").change(function(){
    if($(this).val() == 2){
        $("#sjcc,#ssbd").css("display","none");
    }else{
        $("#sjcc,#ssbd").css("display","block");
    }
    if($('#aboutMoney').val()==2){
        $('#ssbd').css('display','none')
    }
});
$('#submitFees').click(function () {
    var city=$('select[name^=city] option:selected').val()//选择的省份
    var caseType=$('#caseType').val()//案件类型


    if(caseType==2){
       var result = calcuateCriminal(city)
        showResult1(result)
    }else{
        var result=calcuateCivil(city)
        if(result){
            showResult2(result)
        }

    }
})


//计算刑事案件
function calcuateCriminal(city) {
    city = parseInt(city)
    switch (city) {
        case 1:
            return resultTxt=["1200-8000元","1200-8000元","1200-15000元"]
            break;
        case 2:
            return resultTxt=["2000-10000元","2000-10000元","4000-30000元"]
            break;
        case 3:
            return resultTxt=["1000—5000元","1000—6000元","1500—12000元"]
            break;
        case 4:
            return resultTxt=["300-3000元","400-5000元","600-5000元"]
            break;
        case 5:
            return resultTxt=["2000-6000元","6000-16000元","6000-33000元"]
            break;
        case 6:
            return resultTxt=["2000-15000元","2000-15000元","2000-150000元"]
            break;
        case 7:
            return resultTxt=["30-3000元","500-5000元","500-5000元"]
            break;
        case 8:
            return resultTxt=["2000-20000元","2000-20000元","2000-50000元"]
             break;
        case 9:
            return resultTxt=["2000-6000元","3000-9000元","4000-12000元"]
            break;
        case 10:
            return resultTxt=["10000元","10000元","10000元"]
            break;
        case 11:
            return resultTxt=["1500元","2000元","3000元"]
           break;
        case 12:
            return resultTxt=["1000-10000元","1000-10000元","1000-15000元"]
            break;
        case 13:
            return resultTxt=["1000-8000元","1000-8000元","2000-12000元"]
            break;
        case 14:
            return resultTxt=["2000元","3000元","5000元"]
            break;
        case 15:
            return resultTxt=["1000-8000元","1500-10000元","2500-20000元"]
            break;
        case 16:
            return resultTxt=["800-5000元","800-5000元","1600-15000元"]
           break;
        case 17:
            return resultTxt=["3000元","3000元","4000元"]
           break;
        case 18:
            return resultTxt=["3000元","3000元","4000元"]
            break;
        case 19:
            return resultTxt=["1000-3000元","1000-4000元","2000-6000元"]
            break;
        case 20:
            return resultTxt=["300-1000元","800-2000元","1000-6000元"]
            break;
        case 21:
            return resultTxt=["500-10000元","1500-12000元","2500-20000元"]
             break;
        case 22:
            return resultTxt=["2000—20000元","2000—20000元","3500—35000元"]
            break;
        case 23:
            return resultTxt=["500-5000元","1000-5000元","1000-10000元"]
             break;
        case 24:
            return resultTxt=["1500-10000元","2000-10000元","3000-30000元"]
            break;
        case 25:
            return resultTxt=["1500-10000元","2000-10000元","3000-30000元"]
             break;
        case 26:
            return resultTxt=["3000元","3000元","6000元"]
            break;
        case 27:
            return resultTxt=["1000-3000元","2000-4000元","3000-10000元"]
            break;
        case 28:
            return resultTxt=["1000-3000元","2000-4000元","3000-10000元"]
            break;
        case 29:
            return resultTxt=["3000元","4000元","20000元"]
            break;
        case 30:
            return resultTxt=["1500-8000元","1500-10000元","2500-25000元"]
            break;
        case 31:
            return resultTxt=["2000元—8000元","3000元—10000元","5000元—30000元"]
            break;
        case 32:
            return resultTxt=["3000元—30000元","5000元—50000元","5000元—50000元"]
            break;
        default:
            break;
    }
}
//计算民事案件
function calcuateCivil(obj) {
    var caseType=$('#caseType').val()//案件类型
    var sjcc = $('#aboutMoney').val()//涉及财产（是、否）
    var ssbd = $('#ssbd input').val()//诉讼标的（涉及金额）
    // alert(obj+":"+chargeText);
    var i = ssbd;
    pid = parseInt(obj);
    switch (pid) {
        case 1:
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                        return resultTxt =  ("1000-8000元")
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.04 + 1000) + "-" + ((i - 100000) * 0.06 + 8000) + "元");
                    } else if (i > 50000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.03 + 17000) + "-" + ((i - 500000) * 0.05 + 32000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 32000) + "-" + ((i - 1000000) * 0.04 + 57000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.01 + 112000) + "-" + ((i - 5000000) * 0.03 + 217000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 162000) + "-" + ((i - 10000000) * 0.02 + 367000) + "元");
                    }
                }
            }else {
                return resultTxt =  ("1000-8000元")
            }

            break;
        case 2:
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                        prompt = (i * 0.1);
                        if (prompt < 3000) {
                            prompt = 3000;
                        }
                        return resultTxt = (prompt + "元");
                    } else if (i > 100000 && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.06 + 10000) + "元");
                    } else if (i > 1000000 && i <= 10000000) {
                        return resultTxt =(((i - 1000000) * 0.04 + 64000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.02 + 404000) + "元");
                    }
                }
            }else {
                return resultTxt =  ("3000-10000元")
            }
            break;
        case 3:
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                       return resultTxt =("800~6000元");
                    } else if (i > 100000 && i <= 500000) {
                       return resultTxt =(((i - 100000) * 0.04 + 800) + "~" + ((i - 100000) * 0.04 + 6000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                       return resultTxt =(((i - 500000) * 0.03 + 16800) + "~" + ((i - 500000) * 0.03 + 22000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                       return resultTxt =(((i - 1000000) * 0.02 + 31800) + "~" + ((i - 1000000) * 0.02 + 37000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                       return resultTxt =(((i - 5000000) * 0.012 + 111800) + "~" + ((i - 5000000) * 0.012 + 117000) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                       return resultTxt =(((i - 10000000) * 0.007 + 171800) + "~" + ((i - 10000000) * 0.007 + 177000) + "元");
                    } else if (i > 50000000) {
                       return resultTxt =(((i - 50000000) * 0.005 + 451800) + "~" + ((i - 50000000) * 0.005 + 457000) + "元");
                    }
                }
            }else {
                return resultTxt =  ("800~6000元")
            }
            break;
        case 4:
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    var prompt2;
                    if (i >= 0 && i <= 100000) {
                        prompt2 = (i * 0.05);
                        if (prompt2 < 800) {
                            prompt2 = 800;
                        }
                        return resultTxt =(prompt2 + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.04 + 5000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.03 + 21000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 36000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.01 + 116000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.005 + 166000) + "元");
                    }
                }
            }else {
                return resultTxt =  ("800-5000元")
            }
            break;
        case 5:
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 50000) {
                        return resultTxt =("1000-8000元");
                    } else if (i > 50000 && i <= 100000) {
                        return resultTxt =(((i - 50000) * 0.08 + 1000) + "-" + ((i - 50000) * 0.08 + 8000) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.05 + 5000) + "-" + ((i - 100000) * 0.05 + 12000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.04 + 25000) + "-" + ((i - 500000) * 0.04 + 32000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 45000) + "-" + ((i - 1000000) * 0.03 + 52000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 165000) + "-" + ((i - 5000000) * 0.02 + 172000) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 265000) + "-" + ((i - 10000000) * 0.01 + 272000) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.001 + 665000) + "-" + ((i - 50000000) * 0.001 + 672000) + "元");
                    }
                }
            }else {
                return resultTxt =  ("3000~10000元")
            }
            break;
        case 6:
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                        return resultTxt = ("1000-10000元");
                        // return resultTxt =((i * 0.05) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.045 + 5000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.04 + 23000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 43000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 163000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 263000) + "元");
                    }
                }
            }else {
                return resultTxt =  ("1000-10000元")
            }
            break;
        case 7:
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == "0") {
                        return resultTxt =("1000-2000元");
                    }
                    if (i > 0 && i <= 10000) {
                        return resultTxt =("1000-2000元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.05 + 500) + "-" + ((i - 10000) * 0.05 + 2000) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.04 + 5000) + "-" + ((i - 100000) * 0.04 + 6500) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.03 + 21000) + "-" + ((i - 500000) * 0.03 + 22500) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 36000) + "-" + ((i - 1000000) * 0.02 + 37500) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.01 + 116000) + "-" + ((i - 5000000) * 0.01 + 117500) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.005 + 616000) + "-" + ((i - 10000000) * 0.005 + 617500) + "元");
                    }
                }
            }else {
                return resultTxt =  ("1000-2000元")
            }
            break;
        case 8:
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if ((i == "0")) {
                        return resultTxt =("2000-30000元");
                    }
                    if (i > 0 && i <= 100000) {
                        prompt = (i * 0.06);
                        if (prompt < 2000) {
                            prompt = 2000;
                        }
                        return resultTxt =(prompt + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.05 + 6000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.04 + 26000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 46000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 166000) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 266000) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.005 + 666000) + "元");
                    }
                }
            }else {
                return resultTxt =  ("1000-2000元")
            }
            break;
        case 9://河北
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                        prompt = (i * 0.08);
                        if (prompt < 3000) {
                            prompt = 3000;
                        }
                        return resultTxt =(prompt+"元");
                    } else if (i > 100000 && i <= 1000000) {
                        return resultTxt =((i*0.06)+ "元");
                    } else if (i > 1000000 && i <= 10000000) {
                        return resultTxt =((i* 0.04) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =((i*0.02) + "元");
                    }
                }
            }else {
                return resultTxt =("3000-10000元");
            }
            break;
        case 10://河南
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == "0") {
                        return resultTxt =("4500-10000元");
                    }
                    if (i > 0 && i <= 10000) {
                        return resultTxt =("1000元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.052 + 1000) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.039 + 5680) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.026 + 21280) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.013 + 34280) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.0065 + 86280) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.00325 + 118780) + "元");
                    }
                }
            }else {
                return resultTxt =("3750元");
            }
            break;
        case 11://黑龙江
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == "0") {
                        return resultTxt =("3000元");
                    }
                    if (i > 0 && i <= 10000) {
                        return resultTxt =("800元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.04 + 800) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.03 + 4400) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.02 + 16400) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.01 + 26400) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.005 + 66400) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.0025 + 91400) + "元");
                    }
                }
            }else {
                return resultTxt =("3000元");
            }
            break;
        case 12://湖北
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                        return resultTxt =("600-8000元");
                    } else if (i > 100000 && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.01 + 600) + "-" + ((i - 100000) * 0.05 + 8000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.005 + 9600) + "-" + ((i - 1000000) * 0.03 + 53000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.003 + 29600) + "-" + ((i - 5000000) * 0.02 + 173000) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.002 + 44600) + "-" + ((i - 10000000) * 0.015 + 273000) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.001 + 124600) + "-" + ((i - 50000000) * 0.01 + 873000) + "元");
                    }
                }
            }else {
                return resultTxt =("500-8000元");
            }
            break;
        case 13://湖南
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if(i=='0'){
                        return resultTxt =("5000~6000元");
                    }
                    if (i > 0 && i <= 10000) {
                        return resultTxt =("500-1500元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.04 + 500) + "-" + ((i - 10000) * 0.06 + 1500) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.03 + 4100) + "-" + ((i - 100000) * 0.04 + 6900) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.02 + 16100) + "-" + ((i - 500000) * 0.03 + 22900) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.01 + 26100) + "-" + ((i - 1000000) * 0.02 + 37900) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.005 + 66100) + "-" + ((i - 5000000) * 0.01 + 117900) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.005 + 91100) + "-" + ((i - 10000000) * 0.005 + 167900) + "元");
                    }
                }
            }else {
                if(caseType==3){
                    return resultTxt =("500-6000元");
                }else {
                    return resultTxt =("5000~6000元");
                }
            }
            break;
        case 14://吉林
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if(i=='0'){
                        return resultTxt =("3000元");
                    }
                    if (i > 0 && i <= 10000) {
                        return resultTxt =("500-1500元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.02 + 500) + "-" + ((i - 10000) * 0.05 + 1500) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.017 + 2400) + "-" + ((i - 100000) * 0.035 + 6000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.014 + 9200) + "-" + ((i - 500000) * 0.028 + 20000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.007 + 16200) + "-" + ((i - 1000000) * 0.015 + 34000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.004 + 44200) + "-" + ((i - 5000000) * 0.008 + 94000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.004 + 64200) + "-" + ((i - 10000000) * 0.004 + 134000) + "元");
                    }
                }
            }else {
                return resultTxt =("3000元");
            }
            break;
        case 15://江苏
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {

                    if (i >=0 && i <= 10000) {
                        return resultTxt =("2500元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.04 + 2500) + "-" + ((i - 10000) * 0.07 + 2500) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.03 + 6100) + "-" + ((i - 100000) * 0.06 + 8800) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.025 + 18100) + "-" + ((i - 500000) * 0.05 + 32800) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 30600) + "-" + ((i - 1000000) * 0.04 + 57800) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.015 + 110600) + "-" + ((i - 5000000) * 0.03 + 217800) + "元");
                    } else if (i > 10000000 && i <= 100000000) {
                        return resultTxt =(((i - 10000000) * 0.007 + 185600) + "-" + ((i - 10000000) * 0.02 + 347800) + "元");
                    } else if (i > 100000000) {
                        return resultTxt =(((i - 100000000) * 0.005 + 815600) + "-" + ((i - 100000000) * 0.005 + 2147800) + "元");
                    }
                }
            }else {
                return resultTxt =("2500-10000元");
            }
            break;
        case 16://江西
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {

                    if (i >= 0 && i <= 50000) {
                        return resultTxt =("1000-6000元");
                    } else if (i > 50000 && i <= 100000) {
                        return resultTxt =(((i - 50000) * 0.015 + 1000) + "-" + ((i - 50000) * 0.05 + 6000) + "元");
                    } else if (i > 100000 && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.012 + 1750) + "-" + ((i - 100000) * 0.04 + 8500) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.01 + 12550) + "-" + ((i - 1000000) * 0.03 + 44500) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.005 + 52550) + "-" + ((i - 5000000) * 0.02 + 164500) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.002 + 77550) + "-" + ((i - 10000000) * 0.015 + 264500) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.0011 + 157550) + "-" + ((i - 50000000) * 0.0011 + 864500) + "元");
                    }
                }
            }else {
                return resultTxt =("1000-6000元");
            }
            break;
        case 17://辽宁
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == "0") {
                        return resultTxt =("5000元");
                    }
                    if (i > 0 && i <= 100000) {
                        prompt = (i * 0.05);
                        if (prompt < 2000) {
                            prompt = 2000;
                        }
                        return resultTxt =(prompt + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.04 + 5000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.03 + 21000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 36000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.01 + 116000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.005 + 166000) + "元");
                    }
                    if ((!chargeText || chargeText == "0") && tid == 3) {
                        return resultTxt =("3000元");
                    }
                }
            }else {
                return resultTxt =("5000元");
            }
            break;
        case 18://内蒙古
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 10000) {
                        return resultTxt =("1000-5000元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.05 + 1000) + "-" + ((i - 10000) * 0.06 + 5000) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.04 + 5500) + "-" + ((i - 100000) * 0.05 + 10400) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.03 + 21500) + "-" + ((i - 500000) * 0.04 + 30400) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 36500) + "-" + ((i - 1000000) * 0.03 + 50400) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.01 + 116500) + "-" + ((i - 5000000) * 0.02 + 170400) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.005 + 166500) + "-" + ((i - 10000000) * 0.01 + 270400) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.005 + 366500) + "-" + ((i - 50000000) * 0.005 + 670400) + "元");
                    }
                }
            }else {
                return resultTxt =("1000-5000元");
            }
            break;
        case 19://宁夏(除银川)
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == "0") {
                        return resultTxt =("500-1000元");
                    }
                    if (i > 0 && i <= 100000) {
                        prompt = (i * 0.05);
                        max = (i * 0.06);
                        if (max <= 500) {
                            return resultTxt =("500元");
                        } else if (prompt <= 500) {
                            return resultTxt =("500-" + max + "元");
                        } else {
                            return resultTxt =(prompt + "-" + max + "元");
                        }

                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.04 + 5000) + "-" + ((i - 100000) * 0.05 + 6000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.03 + 21000) + "-" + ((i - 500000) * 0.04 + 26000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 36000) + "-" + ((i - 1000000) * 0.03 + 46000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.01 + 116000) + "-" + ((i - 5000000) * 0.02 + 166000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.005 + 166000) + "-" + ((i - 10000000) * 0.01 + 266000) + "元");
                    }
                }
            }else {
                if(caseType==3){
                    return resultTxt =("500-5000元");
                }else {
                    return resultTxt =("500-1000元");
                }

            }
            break;
        case 20://青海
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                        return resultTxt =("500-5000元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.045 + 500) + "-" + ((i - 100000) * 0.045 + 5000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.035 + 23000) + "-" + ((i - 100000) * 0.035 + 27500) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.025 + 58000) + "-" + ((i - 1000000) * 0.025 + 62500) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.015 + 183000) + "-" + ((i - 5000000) * 0.015 + 187500) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 333000) + "-" + ((i - 10000000) * 0.01 + 337500) + "元");
                    }
                }
            }else {
                if(caseType==3){
                    return resultTxt =("500-3000元");
                }else {
                    alert("请输入诉讼标的")
                }
            }
            break;
        case 21://山东
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == "0") {
                        return resultTxt =("800-10000元");
                    }
                    if (i > 0 && i <= 10000) {
                        return resultTxt =("1000-2000元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.05 + 1000) + "-" + ((i - 10000) * 0.06 + 2000) + "元");
                    } else if (i > 100000 && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.04 + 5500) + "-" + ((i - 100000) * 0.05 + 7400) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 41500) + "-" + ((i - 1000000) * 0.04 + 52400) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 161500) + "-" + ((i - 5000000) * 0.03 + 212400) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 261500) + "-" + ((i - 10000000) * 0.02 + 362400) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.005 + 661500) + "-" + ((i - 50000000) * 0.01 + 1162400) + "元");
                    }
                }
            }else {
                if(caseType==3){
                    return resultTxt =("1000-10000元");
                }else {
                    return resultTxt =("800-10000元");
                }
            }
            break;
        case 22://山西
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i > 0 && i <= 100000) {
                        prompt = (i * 0.06);
                        if (prompt < 2000) {
                            prompt = 2000;
                        }
                        return resultTxt =(prompt + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.05 + 6000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.04 + 26000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 46000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 166000) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.015 + 266000) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.01 + 866000) + "元");
                    }
                }
            }else {
                alert("请输入诉讼标的")
            }
            break;
        case 23://陕西
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == "0") {
                        return resultTxt =("500-5000元");
                    }
                    if (i > 0 && i <= 10000) {
                        return resultTxt =("1000元");
                    } else if (i > 10000 && i <= 500000) {
                        return resultTxt =(((i - 10000) * 0.05 + 1000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.04 + 25500) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 45500) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 165500) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 265500) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.005 + 665500) + "元");
                    }
                }
            }else {
                return resultTxt =("500-5000元");
            }
            break;
        case 24://上海
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                        prompt = (i * 0.05);
                        max = (i * 0.08);
                        if (max <= 3000) {
                            return resultTxt =("3000元");
                        } else if (prompt <= 3000) {
                            return resultTxt =("3000-" + max + "元");
                        } else {
                            return resultTxt =(prompt + "-" + max + "元");
                        }
                    } else if (i > 100000 && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.05 + 5000) + "-" + ((i - 100000) * 0.07 + 8000) + "元");
                    } else if (i > 1000000 && i <= 10000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 50000) + "-" + ((i - 1000000) * 0.05 + 71000) + "元");
                    } else if (i > 10000000 && i <= 100000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 320000) + "-" + ((i - 10000000) * 0.03 + 521000) + "元");
                    } else if (i > 100000000) {
                        return resultTxt =(((i - 100000000) * 0.005 + 1220000) + "-" + ((i - 100000000) * 0.01 + 3221000) + "元");
                    }
                }
            }else {
                return resultTxt =("3000-30000元");
            }
            break;
        case 25://四川
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if(i==0&&caseType==1){
                        return resultTxt =("1000-10000元");
                    }
                    if(i==0&&caseType==3){
                        return resultTxt =("1000-8000元");
                    }
                    if (i > 0 && i <= 50000) {
                        return resultTxt =("1000-3000元");
                    } else if (i > 50000 && i <= 500000) {
                        return resultTxt =(((i - 50000) * 0.05 + 1000) + "-" + ((i - 50000) * 0.06 + 3000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.04 + 23500) + "-" + ((i - 500000) * 0.05 + 30000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 43500) + "-" + ((i - 1000000) * 0.04 + 55000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 163500) + "-" + ((i - 5000000) * 0.03 + 215000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 263500) + "-" + ((i - 10000000) * 0.01 + 365000) + "元");
                    }
                }
            }else {
                if(caseType==3){
                    return resultTxt =("1000-8000元");
                }else {
                    return resultTxt =("1000-10000元");
                }
            }
            break;
        case 26://天津
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == 0) {
                        return resultTxt =("3000-12000元");
                    }
                    if (i > 0 && i <= 25000) {
                        return resultTxt =("3000元");
                    } else if (i > 25000 && i <= 100000) {
                        return resultTxt =((i * 0.12) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.08 + 12000) + "元");

                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.06 + 44000) + "元");

                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.04 + 74000) + "元");

                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.03 + 234000) + "元");
                    } else if (10000000 < i && i < 50000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 384000) + "元");
                    } else if (i >= 50000000) {
                        return resultTxt =(((i - 50000000) * 0.01 + 1184000) + "元");
                    }
                }
            }else {
                return resultTxt =("3000-12000元");
            }
            break;
        case 27://西藏
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 100000) {
                        prompt = (i * 0.04);
                        max = (i * 0.06);
                        if (max <= 1000) {
                            return resultTxt =("1000元");
                        } else if (prompt <= 1000) {
                            return resultTxt =("1000-" + max + "元");
                        } else {
                            return resultTxt =(prompt + "-" + max + "元");
                        }
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.035 + 4000) + "-" + ((i - 100000) * 0.05 + 6000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.03 + 18000) + "-" + ((i - 500000) * 0.04 + 26000) + "元");
                    } else if (i > 1000000 && i <= 10000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 33000) + "-" + ((i - 1000000) * 0.03 + 46000) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.015 + 213000) + "-" + ((i - 10000000) * 0.02 + 316000) + "元");
                    } else if (i > 50000000 && i <= 100000000) {
                        return resultTxt =(((i - 50000000) * 0.01 + 813000) + "-" + ((i - 50000000) * 0.015 + 1116000) + "元");
                    } else if (i > 100000000) {
                        return resultTxt =(((i - 100000000) * 0.005 + 1313000) + "-" + ((i - 100000000) * 0.005 + 1866000) + "元");
                    }
                }
            }else {
                return resultTxt =("1000元");
            }
            break;
        case 28://新疆
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if(i==0&&caseType==3){
                        return resultTxt =("500-3000元");
                    }
                    if (i == 0) {
                        return resultTxt =("500-4000元");
                    }
                    if (i > 0 && i <= 10000) {
                        return resultTxt =("500-800元");
                    } else if (i > 10000 && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.05 + 500) + "元");
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.04 + 5000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.03 + 21000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.02 + 36000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.01 + 116000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.005 + 166000) + "元");
                    }
                }
            }else {
                return resultTxt =("500-3000元");
            }
            break;
        case 29://云南
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i <= 50000) {
                        return resultTxt =("5000元");
                    } else if (i > 50000 && i <= 100000) {
                        return resultTxt =(((i - 50000) * 0.03 + 5000) + "-" + ((i - 50000) * 0.05 + 5000) + "元");
                    } else if (i > 100000 && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.02 + 6500) + "-" + ((i - 100000) * 0.04 + 7500) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.015 + 24500) + "-" + ((i - 1000000) * 0.03 + 43500) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.01 + 84500) + "-" + ((i - 5000000) * 0.02 + 163500) + "元");
                    } else if (i > 10000000 && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.005 + 134500) + "-" + ((i - 10000000) * 0.01 + 263500) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.002 + 334500) + "-" + ((i - 50000000) * 0.005 + 663500) + "元");
                    }
                }
            }else {
                alert("请输入诉讼标的")
            }
            break;
        case 30://浙江
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == 0) {
                        return resultTxt =("2500-10000元");
                    }
                    if (i > 0 && i <= 100000) {
                        prompt = (i * 0.06);
                        max = (i * 0.08);
                        if (max <= 2500) {
                            return resultTxt =("2500元");
                        } else if (prompt <= 2500) {
                            return resultTxt =("2500-" + max + "元");
                        } else {
                            return resultTxt =(prompt + "-" + max + "元");
                        }
                    } else if (i > 100000 && i <= 500000) {
                        return resultTxt =(((i - 10000) * 0.05 + 6000) + "-" + ((i - 10000) * 0.06 + 8000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 500000) * 0.04 + 26000) + "-" + ((i - 500000) * 0.05 + 32000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 46000) + "-" + ((i - 1000000) * 0.04 + 57000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 166000) + "-" + ((i - 5000000) * 0.03 + 217000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 266000) + "-" + ((i - 10000000) * 0.02 + 367000) + "元");
                    }
                }
            }else {
                alert("请输入诉讼标的")
            }
            break;
        case 31://重庆
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i >= 0 && i < 100000) {
                        return resultTxt =("2000-6000元");
                    } else if (i >= 100000 && i <= 500000) {
                        return resultTxt =(((i - 100000) * 0.05 + 2000) + "-" + ((i - 100000) * 0.06 + 6000) + "元");
                    } else if (i > 500000 && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.04 + 22000) + "-" + ((i - 100000) * 0.05 + 30000) + "元");
                    } else if (i > 1000000 && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.03 + 42000) + "-" + ((i - 1000000) * 0.04 + 55000) + "元");
                    } else if (i > 5000000 && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 162000) + "-" + ((i - 5000000) * 0.03 + 215000) + "元");
                    } else if (i > 10000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 262000) + "-" + ((i - 10000000) * 0.02 + 365000) + "元");
                    }
                }
            }else {
                alert("请输入诉讼标的")
            }
            break;
        case 32://宁夏(银川)
            if(sjcc==1){
                if(ssbd==''){
                    alert('请输入诉讼标的')
                    return false
                }else {
                    if (i == 0) {
                        return resultTxt =("1000~20000元");
                    } else if (0 < i && i <= 10000) {
                        return resultTxt =("1000~3000元");
                    } else if (10000 < i && i <= 100000) {
                        return resultTxt =(((i - 10000) * 0.08 + 1000) + "~" + ((i - 10000) * 0.09 + 3000) + "元");
                    } else if (100000 < i && i <= 1000000) {
                        return resultTxt =(((i - 100000) * 0.06 + 8200) + "~" + ((i - 100000) * 0.08 + 11100) + "元");
                    } else if (1000000 < i && i <= 5000000) {
                        return resultTxt =(((i - 1000000) * 0.04 + 62200) + "~" + ((i - 1000000) * 0.06 + 83100) + "元");
                    } else if (5000000 < i && i <= 10000000) {
                        return resultTxt =(((i - 5000000) * 0.02 + 222200) + "~" + ((i - 5000000) * 0.04 + 323100) + "元");
                    } else if (1000000 < i && i <= 50000000) {
                        return resultTxt =(((i - 10000000) * 0.01 + 322200) + "~" + ((i - 10000000) * 0.02 + 523100) + "元");
                    } else if (i > 50000000) {
                        return resultTxt =(((i - 50000000) * 0.005 + 722200) + "~" + ((i - 50000000) * 0.01 + 1323100) + "元");
                    }
                }
            }else {
                alert("请输入诉讼标的")
            }
            break;
        default:
            break;
    }

}


function showResult1(result) {
    layer.open({
        content: '<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
        '<p class="jsjg-detail tl pl10">侦察阶段：<span class="fr tr pr15">'+result[0]+'</span></p>' +
        '<p class="jsjg-detail tl pl10">审查起诉阶段：<span class="fr tr pr15">'+result[1]+'</span></p>' +
        '<p class="jsjg-detail tl pl10">审判阶段：<span class="fr tr pr15">'+result[2]+'</span></p><' +
        '/div>'
    });
}
function showResult2(result) {
    layer.open({
        content: '<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
        '<p class="jsjg-detail tl pl10">律师费：<span class="fr tr pr15">'+result+'</span></p>' +
       '</div>'
    });
}