/**
 * Created by sunchengbin on 16/6/15.
 */
require(['lang', 'hbs', 'text!views/app/orderdetail.hbs', 'config', 'contact', 'base', 'oauth', 'cache', 'ajax', 'dialog'], function (Lang, Hbs, OrderDetail, Config, Contact, Base, Oauth, Cache, Ajax, Dialog) {
    var OD = {
        init: function () {
            var _this = this;
            _this.loginResult = Oauth.checkIsLogin();
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
                    isLogin: !_this.loginResult.result,
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
            _this.jumpToItemPosition();
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
                PaqPush && PaqPush('跳转到line', '');
                location.href = init_data.order.shop_info.line_url;
            });
            // 申请退款
            $('body').on('click', '.j_apply_refund', function () {
                PaqPush && PaqPush('去申请退款', '');
                var $this = $(this),
                    _url = $this.attr('data-url'),
                    _item_id = $this.attr('data-item-id'),
                    _item_sku_id = $this.attr('data-item-sku-id');
                var loginResult = _this.loginResult;
                if (loginResult.result) {
                    var _urlParam = {
                        buyer_id: loginResult.info.buyer_id,
                        uss: loginResult.info.uss,
                        item_id: _item_id,
                        item_sku_id: _item_sku_id,
                        order_id: init_data.order.id,
                        seller_id: init_data.order.seller_id
                    }
                    var _urlParamStr = ""
                    $.each(_urlParam, function (key, val) {
                        _urlParamStr += key + "=" + val + "&";
                        console.log(_urlParamStr)
                    })
                    location.href = _url + "?" + _urlParamStr.replace(/&$/, "");
                } else {
                    Oauth.openDialog();
                }
            });
            // 查看退款进展
            $('body').on('click', '.j_check_refund', function () {
                PaqPush && PaqPush('查看退款进展', '');
                var $this = $(this),
                    _url = $this.attr('data-url'),
                    _item_id = $this.attr('data-item-id'),
                    _item_sku_id = $this.attr('data-item-sku-id');
                var loginResult = _this.loginResult;
                if (loginResult.result) {
                    var _urlParam = {
                        buyer_id: loginResult.info.buyer_id,
                        uss: loginResult.info.uss,
                        item_id: _item_id,
                        item_sku_id: _item_sku_id,
                        order_id: init_data.order.id,
                        seller_id: init_data.order.seller_id
                    }
                    var _urlParamStr = ""
                    $.each(_urlParam, function (key, val) {
                        _urlParamStr += key + "=" + val + "&";
                        console.log(_urlParamStr)
                    })
                    location.href = _url + "?" + _urlParamStr.replace(/&$/, "");
                } else {
                    Oauth.openDialog();
                }
            });

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
                    case "bindcard":
                        _this.bindCard();
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
            $("body").on("click", ".j_go_back", function () {
                var _from = Base.others.getUrlPrem('from');
                if (!!_from) {
                    var _urlParam = {
                        buyer_id: _this.loginResult.info.buyer_id,
                        uss: _this.loginResult.info.uss,
                        seller_id: init_data.order.seller_id
                    }
                    var _urlParamStr = ""
                    $.each(_urlParam, function (key, val) {
                        _urlParamStr += key + "=" + val + "&";
                    })
                    location.href = Config.host.hrefUrl + "usercenter.php?" + _urlParamStr.replace(/&$/, "");
                } else {
                    history.back();
                }
            })
        },
        // 如果有item_id跳到对应位置
        jumpToItemPosition: function () {
            var _item_id = Base.others.getUrlPrem('item_id');
            if (!!_item_id) {
                var _itemTop = ~~$("#"+_item_id).offset().top;
                $(window).scrollTop(_top);
            }
        },
        // 退款
        bindCard: function () {
            PaqPush && PaqPush('退款', '');
            location.href = Config.host.hrefUrl + "refund.php?" + "order_id=" + init_data.order.id;
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
