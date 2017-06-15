/**
 * Created by sunchengbin on 16/6/13.
 */
require(['cart', 'dialog', 'ajax', 'config', 'base', 'logistics', 'common', 'btn', 'lang', 'fastclick', 'debug', 'favorable', 'cache', 'bargain', 'tradeplug','oauth','cookie'], function ( Cart, Dialog, Ajax, Config, Base, Logistics, Common, Btn, Lang, Fastclick, Debug, Favorable, Cache, Bargain, Tradeplug,Oauth,Cookie) {
    var OrderConfirmHtm = {
        init: function () {
            var _this = this;
            _this.loginResult = Oauth.checkIsLogin();
            //结算的商品
            _this.carts = _this.transCartInfo();
            //结算总价
            var _sum = $('.j_sum').attr('data-price');
            //如果不包邮并且存在运费信息,初始化物流选择插件
            if (ConfirmData.express_free == 0 && _this.testExpress(ConfirmData.express_fee_list.list)) {
                _this.logistics = Logistics({
                    data: ConfirmData.express_fee_list.list,
                    sum: _sum,
                    lang: Lang
                });
            }
            // 添加对优惠券处理 -lanchenghao@weidian.com
            // 砍价和使用优惠券不能同时存在
            if (!Bargain.checkIsHaveBargainItem(_this.carts)) {
                _this.favorablePlugin = Favorable({
                    el: ".order-info",
                    price: $('.j_sum').attr('data-price'),
                    seller_id: ConfirmData.shop_info.id,
                    usehandle: function (favorablePrice, favorableCode) {
                        var _postPrice = $(".j_post").attr("data-price") || 0,
                            _price = _sum - Number(favorablePrice) + Number(_postPrice);
                        _this.favorableCode = favorableCode;
                        _price = _price < 0 ? 0 : _price;
                        $(".j_sum").text('Rp ' + Base.others.priceFormat(_price));
                    }
                });
            } else {
                // 如果有 并且只有一个商品 那么要返回false 否则返回true
                if (Object.keys(_this.carts).length == 1) {

                } else {
                    if (!Bargain.checkIsHaveBargainItem(_this.carts)) {
                        _this.favorablePlugin = Favorable({
                            el: ".order-info",
                            price: _sum,
                            seller_id: ConfirmData.shop_info.id,
                            usehandle: function (favorablePrice, favorableCode) {
                                var _postPrice = $(".j_post").attr("data-price") || 0,
                                    _price = _sum - Number(favorablePrice) + Number(_postPrice);
                                _this.favorableCode = favorableCode;
                                _price = _price < 0 ? 0 : _price;
                                $(".j_sum").text('Rp ' + Base.others.priceFormat(_price));
                            }
                        });
                    }
                }
            }
            // 4.7 新增需求 初始化交易类型选择插件
            _this.tradeplug = Tradeplug({
                carts:_this.carts
            });
            _this.handleFn();
        },
        transCartInfo:function(data){
            var _data = data || ConfirmData.buyer_cart;
            for(var groupid in _data){
               var _carts = _data[groupid];
            }
            return _carts||null;
        },
        testExpress: function (list) {
            var _bool = false;
            for (var express in list) {
                if (list[express].length) {
                    _bool = true;
                }
            }
            return _bool;
        },
        handleFn: function () {
            var _this = this;
            Fastclick.attach(document.body);

            $('body').on('click', '.j_check_box', function (e) {
                if ($(this).is('.icon-checked-font')) {
                    $(this).addClass('icon-checkbox-font').removeClass('icon-checked-font');
                    $('.j_submit_buy').addClass('disable-btn');
                } else {
                    $(this).addClass('icon-checked-font').removeClass('icon-checkbox-font');
                    $('.j_submit_buy').removeClass('disable-btn');
                }
            });
            Btn({
                wraper: 'body',
                target: '.j_submit_buy',
                event_type: 'click',
                loading_txt: Lang.H5_SUBMITTING_ORDER,
                callback: function (dom) {
                    var _that = this;
                    // 检查开启担保交易的卖家店铺 买家是否选择了交易类型
                    if (!_this.tradeplug.checkIsSelectTrade()) {
                        // 开通了但是没有选择交易类型
                        // Dialog.tip({
                        //     body_txt: "请选择交易类型"
                        // })
                        _this.tradeplug.goToSelectedTrade();
                        _that.cancelDisable();
                        _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                        return;
                    }
                    try {
                        var _items = _this.carts;
                        if (dom.is('.disable-btn')) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            return;
                        }
                        if (!_items.length || dom.is('.disable-btn')) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            return;
                        }
                        var _data = _this.getData();
                        Debug.log({
                            title: "下单开始-orderconfirm-j_submit_buy",
                            data: _data
                        })
                        if (!_data) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            return;
                        }
                        if ($('.j_check_box').is('.icon-checkbox-font')) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">aggree is must checked</p>'
                            });
                            return;
                        }
                        // 是否含有bargain商品 如果不含有直接去确认订单 如果有要登录后才能下单
                        var loginResult = _this.loginResult;
                        if (Bargain.checkIsHaveBargainItem(_this.carts)) {
                            if (loginResult.result) {
                                _this.placeOrder(_data,function(){
                                    _that.cancelDisable();
                                    _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                                });
                            } else {
                                Oauth.openDialog();
                            }
                        } else {
                            _this.placeOrder(_data,function(){
                                _that.cancelDisable();
                                _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            });
                        }
                    }catch(e){
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + e.message + '</p>',
                            auto_fn: function () {
                                this.remove();
                                _that.cancelDisable();
                                _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            }
                        });
                    }
                }
            });
            $('body').on('click', '.j_go_back', function () {
                PaqPush && PaqPush('返回', '');
                setTimeout(function () {
                    location.href = Config.host.hrefUrl + 'cart.php';
                }, 1);
            });
            $('body').on('click', '.j_address_wraper', function () {
                location.href = Config.host.hrefUrl + 'addressadministration.php?address_id=' + Base.others.getUrlPrem('address_id')+'&select_items='+Base.others.getUrlPrem('select_items');
            });
            Common.listenAndroidKeyboardToggle(function () {
                Common.ScorllToBottom('.j_buyer_note');
            }, function () {
                Common.ScorllToBottom('.j_buyer_note');
            });
        },
        placeOrder : function(data,callback){
            var _this = this;
            PaqPush && PaqPush('下单', '');
            Ajax.postJsonp({
                url: Config.actions.orderConfirm,
                data: {
                    param: JSON.stringify(data)
                },
                type: 'POST',
                timeout: 30000,
                success: function (obj) {
                    if (obj.code == 200) {
                        //if(_this.testCarts(_this.transCartInfo(obj.buyer_cart))){
                            localStorage.setItem('OrderTotal', obj.order.real_price);
                            localStorage.setItem('BankInfo', JSON.stringify(obj.order.pay_info.banks));
                            localStorage.setItem('OrderInfo', JSON.stringify(obj.order));
                            _this.goToSuccess(obj);
                        //}
                    } else {
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + obj.message + '</p>',
                            after_fn: function () {
                                setTimeout(function () {
                                    location.href = Config.host.hrefUrl + 'cart.php';
                                }, 2000);
                            }
                        });
                    }
                    callback && callback();
                },
                error: function (error) {
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                        auto_fn: function () {
                            this.remove();
                            callback && callback();
                        }
                    });
                }
            });
        },
        testCarts: function (cart) {
            var _error_msgs = [],
                _beal = true;
            $.each(cart, function (i, item) {
                if(item.status != 1){
                    _error_msgs.push(item.status_txt);
                    _beal = false;
                    $('.j_cart_item[data-id="' + item.id + '"] .error-p').remove();
                    $('.j_cart_item[data-id="' + item.id + '"]').append('<p class="error-p">' + item.status_txt + '</p>');
                }
            });
            if (!_beal) {
                Dialog.tip({
                    body_txt: '<p class="dialog-body-p">' + _error_msgs[0] + '</p>'
                })
            }
            return _beal;
        },
        goToSuccess: function (obj) {
            if ("normal" == obj.order.warrant_status) {
                setTimeout(function () {
                    location.href = Config.host.hrefUrl + 'warrantsuccess.php?price=' + obj.order.total_price + '&time=' + (obj.order.shop_info.cancel_coutdown / 86400);
                }, 100);
            } else {
                setTimeout(function () {
                    location.href = Config.host.hrefUrl + 'evidencepayment.php?price=' + obj.order.total_price + '&time=' + (obj.order.shop_info.cancel_coutdown / 86400);
                }, 100);
            }
        },
        getData: function () {
            var _this = this,
                _logistics_info = $('.j_logistics_info'),
                _company = _logistics_info.length ? _logistics_info.attr('data-company') : '',
                _fee_id = _logistics_info.length ? _logistics_info.attr('data-id') : '',
                _seller_id = ConfirmData.shop_info.id,
                _note = $.trim($('.j_buyer_note').val());
            if (!_company && _this.logistics) {
                _this.logistics.createHtm({
                    data: ConfirmData.express_fee_list.list,
                    lang: Lang
                }).toShow();
                return null;
            }
            var _uss = Cookie.getCookie('uss'),
                _buyer_id = _uss?Cookie.getCookie('uss_buyer_id'):Cookie.getCookie('buyer_id');
            var _data = {
                "edata": {
                    "address_id": Base.others.getUrlPrem('address_id'),
                    "select_items":JSON.parse(Base.others.getUrlPrem('select_items')),
                    "note": "",
                    "pay_way": 11,
                    "pay_type": 1,
                    "seller_id": _seller_id,
                    "buyer_id": _buyer_id,
                    "buyer_note": _note,
                    "express_company": (_company ? _company : ''),
                    "express_fee_id": (_fee_id ? _fee_id : ''),
                    "frm": 2,
                    "warrant": '' == _this.tradeplug.checkIsSelectTrade() ? 0 : _this.tradeplug.getSelectedTrade()
                }
            };
            _uss && (_data.edata.uss = _uss);
            if (!!_this.favorableCode) _data.edata.code = _this.favorableCode;
            return _data;
        }
    };
    OrderConfirmHtm.init();
})