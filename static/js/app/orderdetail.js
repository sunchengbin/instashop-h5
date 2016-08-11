/**
 * Created by sunchengbin on 16/6/15.
 */
require(['lang','hbs','text!views/app/orderdetail.hbs','config','base','common'],function(Lang,Hbs,OrderDetail,Config,Base,Common) {
    var OD = {
        init : function(){
            localStorage.setItem('BankInfo',JSON.stringify(init_data.order.pay_info.banks));
            localStorage.setItem('OrderInfo',JSON.stringify(init_data.order));
            var ItemHtm = '<div>'+Lang.H5_LOADING+'</div>';
            if(init_data){
                ItemHtm= Hbs.compile(OrderDetail)({
                    data : init_data,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    host:Config.host.host
                });
            }else{
                ItemHtm = '<div>'+Lang.H5_ERROR+'</div>';
            }
            $('body').prepend(ItemHtm);
        }

    };
    OD.init();
})
