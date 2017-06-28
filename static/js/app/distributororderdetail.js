/**
 * Created by sunchengbin on 16/6/15.
 */
require(['lang', 'hbs', 'text!views/app/distributororderdetail.hbs', 'config', 'contact', 'base', 'oauth', 'cache', 'ajax', 'dialog','insjs'], function (Lang, Hbs, OrderDetail, Config, Contact, Base, Oauth, Cache, Ajax, Dialog,Insjs) {
    var OD = {
        init: function () {
            var _this = this;
            Insjs.WebOnReady(function(bridge){
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
                })(bridge);
            },function(){

            });
            _this.loginResult = Base.others.getUrlPrem('uss');
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
                    isBack: Base.others.getUrlPrem('from'),
                    isLogin: !_this.loginResult,
                    hrefUrl: Config.host.hrefUrl,
                    host: Config.host.host,
                    detail:Base.others.getUrlPrem('detail'),
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
            $("body").on("click", ".j_order_op", function () {
                var _op = $(this).attr("data-op");
                var _reqData = {
                    edata: {
                        "action": "",
                        "buyer_id": _this.loginResult.info ? _this.loginResult.info.buyer_id : '',
                        "uss": _this.loginResult.info ? _this.loginResult.info.uss : ''
                    }
                }
                switch (_op) {
                    case "receive":
                        _reqData.edata.action = "receive";
                        _this.confirmReceive(_reqData);
                        break;
                    case "extendtime":
                        _reqData.edata.action = "extend";
                        _this.extendReceiveTime(_reqData);
                        break;
                    case "evidence":
                        _this.evidence();
                        break;
                    default:
                        Dialog.tip({
                            body_txt: "unknow op"
                        })
                        break;
                }
            })
            $("body").on("click", ".order-login-btn", function () {
                Oauth.openDialog();
            })
        },
        // 如果有item_id跳到对应位置
        jumpToItemPosition: function () {
            var _item_id = Base.others.getUrlPrem('item_id');
            if (!!_item_id) {
                var _itemTop = ~~$("#"+_item_id).offset().top;
                $(window).scrollTop(_itemTop);
            }
        },
        // 支付证明
        evidence: function () {
            PaqPush && PaqPush('上传支付证明', '');
            location.href = Config.host.hrefUrl + "uploadprove.php?" + "order_id=" + init_data.order.id + "&hash=" + init_data.order.id_hash;
        },
        // 延长收货时间
        extendReceiveTime: function (data) {
            PaqPush && PaqPush('延长收货时间', '');
            Dialog.confirm({
                cfb_txt: Lang.ORDER_CONFIRM_RECEIVE_OK,
                cab_txt: Lang.ORDER_CONFIRM_RECEIVE_CANCEL,
                body_txt: Lang.ORDER_DELAY_TIP,
                cf_fn: function () {
                    Ajax.postJsonp({
                        url: Config.actions.orderConfirm + '/' + init_data.order.id,
                        data: {
                            param: JSON.stringify(data)
                        },
                        type: 'put',
                        timeout: 15000,
                        success: function (obj) {
                            if (obj.code == 200) {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.CONTROLL_SUCCESS + '</p>',
                                    auto_fn: function () {
                                        setTimeout(function () {
                                            location.reload();
                                        }, 2000);
                                    }
                                });
                            } else {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + obj.message || Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                                    auto_fn: function () {
                                        this.remove();
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                                auto_fn: function () {
                                    this.remove();
                                }
                            });

                        }
                    });
                }
            })
        },
        // 确认收货
        confirmReceive: function (data) {
            var _this = this;
            PaqPush && PaqPush('确认收货', '');
            Dialog.confirm({
                cfb_txt: Lang.ORDER_CONFIRM_RECEIVE_OK,
                cab_txt: Lang.ORDER_CONFIRM_RECEIVE_CANCEL,
                body_txt: Lang.ORDER_CONFIRM_RECEIVE_TITLE,
                cf_fn: function () {
                    Ajax.postJsonp({
                        url: Config.actions.orderConfirm + '/' + init_data.order.id,
                        data: {
                            param: JSON.stringify(data)
                        },
                        type: 'put',
                        timeout: 15000,
                        success: function (obj) {
                            if (obj.code == 200) {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.CONTROLL_SUCCESS + '</p>',
                                    auto_fn: function () {
                                        setTimeout(function () {
                                            location.href = localStorage.getItem('RefundBack');
                                        }, 2000);
                                    }
                                });
                            } else {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + obj.message || Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                                    auto_fn: function () {
                                        this.remove();
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                                auto_fn: function () {
                                    this.remove();
                                }
                            });
                        }
                    });
                }
            })
        }
    };
    OD.init();
})
