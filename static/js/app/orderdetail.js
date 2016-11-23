/**
 * Created by sunchengbin on 16/6/15.
 */
require(['lang','hbs','text!views/app/orderdetail.hbs','config','contact','base'],function(Lang,Hbs,OrderDetail,Config,Contact,Base) {
    var OD = {
        init : function(){
            var ItemHtm = '<div>'+Lang.H5_LOADING+'</div>';
            if(init_data && init_data.code == 200){
                localStorage.setItem('BankInfo',JSON.stringify(init_data.order.pay_info.banks));
                localStorage.setItem('OrderInfo',JSON.stringify(init_data.order));
                if(init_data.order.refund_card && init_data.order.refund_card.b_branch){
                    localStorage.setItem('RefundCard',JSON.stringify(init_data.order.refund_card));
                }
                ItemHtm= Hbs.compile(OrderDetail)({
                    data : init_data,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    host:Config.host.host,
                    shopUrl: Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/'+init_data.order.shop_info.id,
                });
            }else{
                if(init_data.code == 430016){
                    ItemHtm ='<div class="no-exists"><img src="'+Config.host.imgUrl+'/app/404.png"/><p>Pesanan tidak ditemukan!</p></div>';
                }else{
                    ItemHtm = '<div>'+Lang.H5_ERROR+'</div>';
                }
            }
            $('body').prepend(ItemHtm);
            var _this = this;
            if($('.j_show_contact').length){
                _this.contact = Contact({
                    data : {
                        tel : !init_data.order.shop_info.line_url&&!init_data.order.shop_info.phone?'':init_data.order.shop_info.phone,
                        line : init_data.order.shop_info.line_url
                    },
                    lang:Lang
                });
                $('body').on('click','.j_show_contact',function(){
                    _this.contact.createHtm({
                        data : {
                            tel : !init_data.order.shop_info.line_url&&!init_data.order.shop_info.phone?'':init_data.order.shop_info.phone,
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
