/**
 * **
 * 伤残补助金，标准如下：
 * 一级伤残：本人工资×27; 二级伤残：本人工资×25; 三级伤残：本人工资×23; 四级伤残：本人工资×21;五级伤残：本人工资×18; 六级伤残：本人工资×16; 七级伤残：本人工资×13; 八级伤残：本人工资×11; 九级伤残：本人工资×9; 十级伤残：本人工资×7
 * 伤残津贴，标准如下：
 　　一级伤残：本人工资×90%;
 　　二级伤残：本人工资×85%;
 　　三级伤残：本人工资×80%;
 　　四级伤残：本人工资×75%;
 　　五级伤残：本人工资×70%;
 　　六级伤残：本人工资×60%。
 */

/**
 * 省份-2016年度平均工资
 * @type {{340000: {city: string, money: string}, 110000: {city: string, money: string}, 500000: {city: string, money: string}, 330000: {city: string, money: string}, 350000: {city: string, money: string}, 620000: {city: string, money: string}, 440000: {city: string, money: string}, 450000: {city: string, money: string}, 520000: {city: string, money: string}, 460000: {city: string, money: string}, 130000: {city: string, money: string}, 230000: {city: string, money: string}, 410000: {city: string, money: string}, 420000: {city: string, money: string}, 430000: {city: string, money: string}, 320000: {city: string, money: string}, 360000: {city: string, money: string}, 220000: {city: string, money: string}, 210000: {city: string, money: string}, 150000: {city: string, money: string}, 640000: {city: string, money: string}, 630000: {city: string, money: string}, 370000: {city: string, money: string}, 310000: {city: string, money: string}, 140000: {city: string, money: string}, 610000: {city: string, money: string}, 510000: {city: string, money: string}, 120000: {city: string, money: string}, 540000: {city: string, money: string}, 650000: {city: string, money: string}, 530000: {city: string, money: string}}}
 */
//省---
var arr={

            '340000': {city: '安徽', money: '4294'},
            '110000': {city: '北京', money: '9227'},
            '500000': {city: '重庆', money: '6181'},
            '330000': {city: '浙江', money: '5306'},
            '350000': {city: '福建', money: '4664'},
            '620000': {city: '甘肃', money: '5312'},
            '440000': {city: '广东', money: '4670'},
            '450000': {city: '广西', money: '3826'},
            '520000': {city: '贵州', money: '4041'},
            '460000': {city: '海南', money: '4867'},
            '130000': {city: '河北', money: '4511'},
            '230000': {city: '黑龙江', money: '4981'},
            '410000': {city: '河南', money: '4382'},
            '420000': {city: '湖北', money: '4486'},
            '430000': {city: '湖南', money: '4025'},
            '320000': {city: '江苏', money: '4862'},
            '360000': {city: '江西', money: '3787'},
            '220000': {city: '吉林', money: '4930'},
            '210000': {city: '辽宁', money: '4654'},
            '150000': {city: '内蒙古', money: '4538'},
            '640000': {city: '宁夏', money: '5264'},
            '630000': {city: '青海', money: '5290'},
            '370000': {city: '山东', money: '4880'},
            '310000': {city: '上海', money: '8664'},
            '140000': {city: '山西', money: '3299'},
            '610000': {city: '陕西', money: '5034'},
            '510000': {city: '四川', money: '5150'},
            '120000': {city: '天津', money: '5729'},
            '540000': {city: '西藏', money: '5524'},
            '650000': {city: '新疆', money: '5550'},
            '530000': {city: '云南', money: '4962'}

}
/**
 * 省份填充
 */
$(function () {
    for (item in arr){
        $("select[name^=location]").append("<option value='"+item+"'>"+arr[item].city+"</option>");
    }
})
/**
 * 计算按钮事件
 */
$('#submitFees').click(function () {
    var level = $('select[name^=level] option:selected').val()
    var money = $('#money').val()
    var location = $('select[name^=location] option:selected').val()
    var ylfy = $('#ylfy').val()//医疗费用
    var fzqj = $('#fzqj').val()//辅助器具
    var tglx = $('#tglx').val()//停工天数
    if(level==0){
        alert('请选择伤残等级')
        return false
    }
    if(money==''||money==null||money==0){
        alert('请输入正确的金额')
        return false
    }else {
        if (!/^\d+(\.\d+)?$/.test(money)) {
            alert('请输入正确的金额')
            $('#money').val('')
            $('#money').focus()
            return false;
        }
    }
    if(ylfy != 0||ylfy !=''){
        if (!/^\d+(\.\d+)?$/.test(ylfy)) {
            alert('请输入正确的医疗费用')
            $('#ylfy').val('')
            $('#ylfy').focus()
            return false;
        }
    }
    if(fzqj != 0||fzqj !=''){
        if (!/^\d+(\.\d+)?$/.test(fzqj)) {
            alert('请输入正确的辅助器具费')
            $('#fzqj').val('')
            $('#fzqj').focus()
            return false;
        }
    }
    if(tglx != 0||tglx !=''){
        if (!/^\d+(\.\d+)?$/.test(tglx)) {
            alert('请输入正确的停工留薪天数')
            $('#tglx').val('')
            $('#tglx').focus()
            return false;
        }
    }
    if(location==0){
        alert('请选择受诉法院地址')
        return false
    }
    for(newLocation in arr){
       if(location == newLocation){

           var newMoney = getMoney(money,arr[location].money)
           var resultMoney = getResult(newMoney,level)
           var money1 = parseFloat(resultMoney[0])//转换浮点类型
           var money2 = parseFloat(resultMoney[1])
           var tgMoney = parseFloat(money/30*tglx)//停工留薪=工资÷30天✘停工天数
           if (ylfy==''){//未输入则显示0
               ylfy=0
           }
           if (fzqj==''){
               fzqj=0
           }
           if (tglx==''){
               tglx=0
           }
           var allMoney = parseFloat(ylfy)+parseFloat(fzqj)+tgMoney+money1
           var Html='<div class="jsjg-content"><h2 class="tc w100 color-1b0000 jsjg-title">计算结果</h2>' +
               '<p class="jsjg-detail tl pl10">医疗费用（元）：<span class="fr tr pr15">'+ylfy+'元</span></p>' +
               '<p class="jsjg-detail tl pl10">辅助器械费（元）：<span class="fr tr pr15">'+fzqj+'元</span></p>' +
               '<p class="jsjg-detail tl pl10">赔偿费用（元）：<span class="fr tr pr15">'+money1+'元</span></p>' +
               '<p class="jsjg-detail tl pl10">伤残津贴/月：<span class="fr tr pr15">'+money2+'元</span></p>' +
               '<p class="jsjg-detail tl pl10">总计（元）：<span class="fr tr pr15">'+allMoney.toFixed(2)+'元</span></p>' +
               '</div>'

           layer.open({
               content: Html
           });
            break
       }
    }

})
/**
 *
 * @param money
 * @param moneyDefault
 * @returns {*}
 * 备注：本人工资，是指工伤职工因工作遭受事故伤害或者患职业病前12个月平均月缴费工资。
        本人工资高于统筹地区职工平均工资300%的，按照统筹地区职工平均工资的300%计算;
        本人工资低于统筹地区职工平均工资60%的，按照统筹地区职工平均工资的60%计算。
 */
function getMoney(money,moneyDefault) {//工资计算是否高于三倍或小于60%
    money = parseFloat(money)
    moneyDefault = parseFloat(moneyDefault)
    var maxMoney=moneyDefault*3
    var minMoney=moneyDefault*0.6
    if (eval(money) < eval(minMoney)){
        return minMoney
    }else if (eval(money) > eval(maxMoney)){
        return maxMoney
    }else {
        return money
    }
}
/**
 *
 * @param money
 * @param level
 * @returns {[*,*]}
 * 根据伤残等级计算
 * 2017年度一次性工亡补助金标准为 33616元×20年=672320元（全国统一价）
 */
function getResult(money,level) {
    var resultMoney
    var resultMoney1
    switch (level){
        case '1':
            resultMoney = money*27
            resultMoney1 = money*0.9
            break
        case '2':
            resultMoney = money*25
            resultMoney1 = money*0.85
            break
        case '3':
            resultMoney = money*23
            resultMoney1 = money*0.8
            break
        case '4':
            resultMoney = money*21
            resultMoney1 = money*0.75
            break
        case '5':
            resultMoney = money*18
            resultMoney1 = money*0.75
            break
        case '6':
            resultMoney = money*16
            resultMoney1 = money*0.6
            break
        case '7':
            resultMoney = money*13
            resultMoney1 = 0
            break
        case '8':
            resultMoney = money*11
            resultMoney1 = 0
            break
        case '9':
            resultMoney = money*9
            resultMoney1 = 0
        case '10':
            resultMoney = money*7
            resultMoney1 = 0
            break
        case '11'://死亡
            resultMoney = 672320
            resultMoney1 = 0
            break
    }
    return [resultMoney,resultMoney1]
}