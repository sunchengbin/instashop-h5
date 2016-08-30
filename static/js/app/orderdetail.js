/**
 * Created by sunchengbin on 16/6/15.
 */
require(['lang','hbs','text!views/app/orderdetail.hbs','config','contact'],function(Lang,Hbs,OrderDetail,Config,Contact) {
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
            var _this = this;
            if($('.j_show_contact').length){
                _this.contact = Contact({
                    data : {
                        tel : init_data.order.shop_info.telephone,
                        line : init_data.order.shop_info.line_url
                    },
                    lang:Lang
                });
                $('body').on('click','.j_show_contact',function(){
                    _this.contact.createHtm({
                        data : {
                            tel : init_data.order.shop_info.telephone,
                            line : init_data.order.shop_info.line_url
                        },
                        lang:Lang
                    }).toShow();
                });
            }
        }

    };
    OD.init();
})
