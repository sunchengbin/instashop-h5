/**
 * Created by sunchengbin on 16/6/15.
 */
require(['lang', 'hbs', 'text!views/app/orderdetail.hbs', 'config', 'contact', 'base','oauth'], function (Lang, Hbs, OrderDetail, Config, Contact, Base,Oauth) {
    var OD = {
        init: function () {
            var ItemHtm = '<div>' + Lang.H5_LOADING + '</div>';
            if (init_data && init_data.code == 200) {
                localStorage.setItem('BankInfo', JSON.stringify(init_data.order.pay_info.banks));
                localStorage.setItem('OrderInfo', JSON.stringify(init_data.order));
                localStorage.setItem('RefundBack', location.href);
                if (init_data.order.refund_card && init_data.order.refund_card.b_branch) {
                    localStorage.setItem('RefundCard', JSON.stringify(init_data.order.refund_card));
                }
                ItemHtm = Hbs.compile(OrderDetail)({
                    data: init_data,
                    lang: Lang,
                    hrefUrl: Config.host.hrefUrl,
                    host: Config.host.host,
                    shopUrl: !Base.others.isCustomHost() ? Config.host.host : Config.host.host + 's/' + init_data.order.shop_info.id,
                    isHaveReduc: (function () {
                        if (!!init_data.order.shop_discount) {
                            return (init_data.order.shop_discount.length != 0)
                        }
                        return false;
                    })()
                });
            } else {
                if (init_data.code == 430016) {
                    ItemHtm = '<div class="no-exists"><img src="' + Config.host.imgUrl + '/app/404.png"/><p>Pesanan tidak ditemukan!</p></div>';
                } else {
                    ItemHtm = '<div>' + Lang.H5_ERROR + '</div>';
                }
            }
            $('body').prepend(ItemHtm);
            var _this = this;
            if ($('.j_show_contact').length) {
                _this.contact = Contact({
                    data: {
                        tel: !init_data.order.shop_info.line_url && !init_data.order.shop_info.phone ? '' : init_data.order.shop_info.phone,
                        line: init_data.order.shop_info.line_url
                    },
                    lang: Lang
                });
                $('body').on('click', '.j_show_contact', function () {
                    _this.contact.createHtm({
                        data: {
                            tel: !init_data.order.shop_info.line_url && !init_data.order.shop_info.phone ? '' : init_data.order.shop_info.phone,
                            line: init_data.order.shop_info.line_url
                        },
                        lang: Lang
                    }).toShow();
                });

            }
            //修正因标签属性href有值的问题导致被追加spider参数 line中user not find的问题
            $('body').on('click', '.j_goto_line', function () {
                location.href = init_data.order.shop_info.line_url;
            });
            $('body').on('click', '.j_apply_refund', function () {
                var _this = $(this),
                    _url = _this.attr('data-url'),
                    _item_id = _this.attr('data-item-id'),
                    _item_sku_id = _this.attr('data-item-sku-id');
                var loginResult = Oauth.checkIsLogin();
                if (loginResult.result) {
                    var _urlParam = {
                        buyer_id:loginResult.info.buyer_id,
                        uss:loginResult.info.uss,
                        item_id:_item_id,
                        item_sku_id:_item_sku_id,
                        order_id:init_data.order.id,
                        seller_id:init_data.order.seller_id
                    }
                    var _urlParamStr = ""
                    $.each(_urlParam,function(key,val){
                        _urlParamStr +=key+"="+val+"&";
                        console.log(_urlParamStr)
                    })
                    location.href = _url + "?" + _urlParamStr.replace(/&$/,"");
                } else {
                    Oauth.openDialog();
                }
            });
        }

    };
    OD.init();
})
