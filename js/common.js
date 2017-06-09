//是否涉及财产UI改变
$("#ccyes").click(function(){
    $(this).addClass('active');
    $("#ccno").removeClass('active');
    $("#ssbd").css("display","block");
});
$("#ccno").click(function(){
    $(this).addClass('active');
    $("#ccyes").removeClass('active');
    $("#ssbd").css("display","none");
});
//选择案件类型的UI改变
$("#caseType").change(function(){
    if($(this).val() == 2){
        $("#sjcc,#ssbd").css("display","none");
    }else{
        $("#sjcc,#ssbd").css("display","block");
    }
});
//选择省份
$("select[name^=city]").change(function(){
    var city = $(this).val();
    // alert(city)
});
//利息计算
//选择利率类型：银行同期贷款利率、约定利率----贷款期限显示和隐藏
$("select[name^=rateType]").change(function(){
    var rateType = $(this).val();
    if( rateType==='bank'){
        $('#rateTime').hide()
    }else {
        $('#rateTime').show()
    }
});