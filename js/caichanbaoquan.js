$('#submitFees').on('click',function () {
    var money = $('#money').val()
    if(money<0||money==''||money==null){
        alert('请输入正确金额')
        return false
    }
    if(money <= 1000){
        caichan = 30;
    }else if(money >1000 && money <= 100000){
        caichan = 30+(money-1000)*0.01;
    }else{
        caichan = 30+99000*0.01+(money-100000)*0.005
    }
    if(caichan > 5000){
        caichan = 5000;
    }
    var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
        '<p class="jsjg-detail tl pl10">应缴纳费用（元）：<span class="fr tr pr15">'+caichan.toFixed(2)+'元</span></p>' +
        '</div>'

    layer.open({
        content: Html
    })
})