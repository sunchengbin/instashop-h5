/**
 * Created by sunchengbin on 2017/6/1.
 */
/**
 * Created by sunchengbin on 16/6/12.
 */
require(['config','base','fastclick'], function (Config,Base,Fastclick) {
    Fastclick.attach(document.body);
    $('body').on('click','.j_go_back',function(){
        history.go(-1);
    })
    $('body').on('click','.j_address_info',function(){
        var _this = $(this),
            _id = _this.attr('data-id');
        location.href = Config.host.hostUrl+'orderconfirm.php?select_items='+Base.others.getUrlPrem('select_items')+'&address_id='+_id;
    })
    $('body').on('click','.j_edit_address',function(){
        var _this = $(this),
            _id = _this.attr('data-id');
        location.href = Config.host.hostUrl+'address.php?select_items='+Base.others.getUrlPrem('select_items')+'&address_id='+_id;
    })
    $('body').on('click','.j_add_address',function(){
        location.href = Config.host.hostUrl+'address.php?select_items='+Base.others.getUrlPrem('select_items');
    })
})