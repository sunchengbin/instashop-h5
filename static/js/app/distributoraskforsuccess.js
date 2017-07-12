/**
 * Created by sunchengbin on 16/6/6.
 */
require(['lang','hbs','text!views/app/distributoraskforsuccess.hbs','config','fastclick','common','base','insjs','contact'],function(Lang,Hbs,DistributorAskforSuccess,Config,Fastclick,Common,Base,Insjs,Contact){
    var I = {
        init : function(){
            Fastclick.attach(document.body);
            var _this = this,
                OrderInfo = JSON.parse(localStorage.getItem('OrderInfo')),
                IndexHtm = '<div>'+Lang.H5_LOADING+'</div>',
                _order_url = Config.host.host+'html/distributororderdetail.php'+location.search+'&order_id='+OrderInfo.id;
            try
            {
                IndexHtm= Hbs.compile(DistributorAskforSuccess)({
                    lang : Lang,
                    data : OrderInfo
                });
            }
            catch(error){
                IndexHtm = '<section class="item-out-stock">'
                    +'<i class="icon iconfont icon-error-font"></i>'
                    +'<p>'+Lang.H5_ERROR+'</p>'
                    +'<p><a href="javascript:location.reload();" class="btn confirm-btn">'+Lang.H5_FRESHEN+'</a></p>'
                    +'</section>';
            }
            $('body').prepend(IndexHtm);
            _this.handleFn(OrderInfo);
            Insjs.WebOnReady(function(bridge){
                if(bridge){
                    (function(bridge){
                        var _close_param = {
                            param:{
                                type : 'close_loading',
                                param : null
                            }
                        };
                        //关闭webview的loading动画
                        bridge.callHandler('insSocket',_close_param, function(response) {
                            return null;
                        });
                        $('body').on('click','.j_distributor_order_detail',function(){
                            var _close_param = {
                                param:{
                                    type : 'show_order_detail',
                                    param : {
                                        url : _order_url
                                    }
                                }
                            };
                            //关闭webview的loading动画
                            bridge.callHandler('insSocket',_close_param, function(response) {
                                return null;
                            });
                        });
                    })(bridge);
                }
            },function(){

            });
        },
        handleFn : function(order) {
            var _this = this;
            if ($('.j_show_contact').length) {
                _this.contact = Contact({
                    data: {
                        tel: !order.shop_info.line_url && !order.shop_info.phone ? '' : order.shop_info.phone,
                        line: order.shop_info.line_url,
                        whatsapp: order.shop_info.whatsapp_url
                    },
                    lang: Lang,
                    btn: '.j_show_contact'
                });
            }
            //修正因标签属性href有值的问题导致被追加spider参数 line中user not find的问题
            $('body').on('click', '.j_goto_line', function () {
                location.href = order.shop_info.line_url;
            });
        }
    };
    I.init();
})