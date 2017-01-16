/**
 * Created by sunchengbin on 16/6/13.
 */
require(['hbs', 'text!views/app/orderconfirm.hbs', 'cart', 'dialog', 'ajax', 'config', 'base', 'logistics', 'common', 'btn', 'lang', 'fastclick', 'debug','favorable'], function (Hbs, OrderConfirm, Cart, Dialog, Ajax, Config, Base, Logistics, Common, Btn, Lang, Fastclick, Debug,Favorable) {
    var OrderConfirmHtm = {
        init: function () {
            var _this = this;
            var _isGroup = _this.isGroup = Cart().getIsGroup();
            var _groupid = this._groupid = Base.others.getUrlPrem("groupid", location.href);
            var _data = localStorage.getItem('ShopData');
            var _carts;
            if (_isGroup) {
                _carts = JSON.parse(_data).GroupCart[JSON.parse(_data).ShopInfo.id].group[_groupid];
            } else {
                _carts = Cart().getCarts();
            }
            var _express_free = _this.getExpressFreeType(_carts);
            _this.carts = _carts;
            Debug.log({
                title: "orderconfim init",
                data: {
                    _express_free: _express_free,
                    carts: _carts
                }
            })
            var _sum = _this.countSum(_carts);
            var _address = JSON.parse(_data).Address,
                _htm = Hbs.compile(OrderConfirm)({
                    data: JSON.parse(_data),
                    carts: _carts,
                    sum: _sum,
                    favorable: (function () {
                        //有就返回优惠额 没有返回0
                        if (!!price_data.price_info.shop_discount) {
                            return price_data.price_info.shop_discount.length != 0 ? _this.getFavorable() : 0
                        }
                        return 0;
                    })(),
                    address: _address,
                    lang: Lang,
                    host: Config.host,
                    nofree: _express_free == 0,
                    express: (_express_free == 0 && _this.testExpress(express_data.express_fee_list.list)),
                    isHaveReduc: (function () {
                        if (!!price_data.price_info.shop_discount) {
                            return (price_data.price_info.shop_discount.length != 0)
                        }
                        return false;
                    })()
                });
            $('body').prepend(_htm);
            if (_express_free == 0 && _this.testExpress(express_data.express_fee_list.list)) {
                _this.logistics = Logistics({
                    data: express_data.express_fee_list.list,
                    sum: _this.countSum(_carts),
                    lang: Lang
                });
            }

            //添加对优惠券处理 -lanchenghao@weidian.com
            _this.favorablePlugin = Favorable({
                el:".order-info",
                price:_sum
            });

            _this.handleFn();
        },
        //1免邮 0付费
        getExpressFreeType: function (carts) {
            var _this = this;
            for (var key in carts) {
                if (!!carts[key].item.supply_shop) {
                    return carts[key].item.supply_shop.express_free;
                } else {
                    return carts[key].item.shop.express_free
                }
            }
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
                    var _that = this,
                        _items = _this.getItems();
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
                    PaqPush && PaqPush('下单', '');
                    //_paq.push(['trackEvent', '下单', 'click', '下单']);
                    //alert(JSON.stringify(_data));
                    Ajax.postJsonp({
                        url: Config.actions.orderConfirm,
                        data: {
                            param: JSON.stringify(_data)
                        },
                        type: 'POST',
                        timeout: 30000,
                        success: function (obj) {
                            if (obj.code == 200) {
                                var _post_price = $('.j_logistics_info').attr('data-price'),
                                    _bank_info = JSON.stringify(obj.order.pay_info.banks),
                                    _total = (_post_price && _post_price > 0) ? (Number(_post_price) + Number(_this.countSum(Cart().getCarts()))) : _this.countSum(Cart().getCarts());
                                localStorage.setItem('OrderTotal', _total);
                                localStorage.setItem('BankInfo', _bank_info);
                                localStorage.setItem('OrderInfo', JSON.stringify(obj.order));
                                for (var index in _items) {
                                    if (!!_items[index].item_sku) {
                                        Cart().removeItem(_items[index].item_sku);
                                    } else {
                                        Cart().removeItem(_items[index].itemID);
                                    }
                                }
                                // Cart().clearCarts();
                                setTimeout(function () {
                                    location.href = Config.host.hrefUrl + 'ordersuccess.php?price=' + obj.order.total_price + '&time=' + (obj.order.shop_info.cancel_coutdown / 86400);
                                }, 100);
                            } else {
                                if ("server error" == obj.message) {
                                    _that.cancelDisable();
                                    _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                                    var reqData = {
                                        edata: {
                                            action: 'check',
                                            items: _this.getItems(),
                                            telephone: JSON.parse(localStorage.getItem('ShopData')).Address.telephone,
                                            seller_id: JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id,
                                            wduss: ''
                                        }
                                    };
                                    Ajax.postJsonp({
                                        url: Config.actions.testCart,
                                        data: {
                                            param: JSON.stringify(reqData)
                                        },
                                        type: 'POST',
                                        success: function (obj) {
                                            if (obj.code == 200) {
                                                if (obj.carts) {
                                                    if (_this.testCarts(obj.carts)) {
                                                        Dialog.tip({
                                                            top_txt: '', //可以是html
                                                            body_txt: '<p class="dialog-body-p">' + Lang.H5_CONFIRM_ORDER_ERROR + '</p>',
                                                            after_fn: function () {
                                                                setTimeout(function () {
                                                                    location.reload();
                                                                }, 2000);
                                                            }
                                                        });
                                                    } else {
                                                        //setTimeout(function(){
                                                        //    location.href = Config.host.hrefUrl+'cart.php?error=confirm';
                                                        //},3000);
                                                    }
                                                } else {
                                                    Dialog.confirm({
                                                        top_txt: '', //可以是html
                                                        body_txt: '<p class="dialog-body-p">' + Lang.H5_CONFIRM_ORDER_ERROR + '</p>',
                                                        cf_fn: function () {
                                                            setTimeout(function () {
                                                                location.reload();
                                                            }, 2000);
                                                        }
                                                    });
                                                }
                                            } else {
                                                Dialog.confirm({
                                                    top_txt: '', //可以是html
                                                    body_txt: '<p class="dialog-body-p">' + obj.msg || obj.message + '</p>',
                                                    cf_fn: function () {
                                                        setTimeout(function () {
                                                            location.href = Config.host.hrefUrl + 'cart.php';
                                                        }, 3000);
                                                    }
                                                });
                                            }
                                        },
                                        error: function (error) {
                                            Dialog.alert({
                                                top_txt: '', //可以是html
                                                cfb_txt: Lang.H5_FRESHEN,
                                                body_txt: '<p class="dialog-body-p">' + Lang.H5_ERROR + '</p>',
                                                cf_fn: function () {
                                                    location.reload();
                                                }
                                            });
                                        }
                                    });
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
                            }
                        },
                        error: function (error) {
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                                auto_fn: function () {
                                    this.remove();
                                    _that.cancelDisable();
                                    _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                                }
                            });

                        }
                    });
                }
            });
            $('body').on('click', '.j_go_back', function () {
                PaqPush && PaqPush('返回', '');
                setTimeout(function () {
                    location.href = Config.host.hrefUrl + 'cart.php';
                }, 1);
            });
            $('body').on('click', '.j_address_wraper', function () {
                //Common.saveFromUrl(function(){
                if (_this._groupid) {
                    location.href = Config.host.hrefUrl + 'address.php?groupid=' + _this._groupid;
                } else {
                    location.href = Config.host.hrefUrl + 'address.php';
                }
                //});
            });
            Common.listenAndroidKeyboardToggle(function () {
                Common.ScorllToBottom('.j_buyer_note');
            }, function () {
                Common.ScorllToBottom('.j_buyer_note');
            });
            //$('body').on('tap','.j_cart_item',function(){
            //    location.href = Config.host.host+'detail/'+$(this).attr('data-itemid');
            //});
        },
        getItems: function () {
            var _this = this;
            var _carts = _this.carts,
                _arr = [];
            console.log("getItems:");
            console.log(_carts);
            if (!_carts) {
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SHOPING_NO_GOODS + '?</p>'
                });
                //alert('购物车里没有商品')
            } else {
                var _items = _carts;
                for (var item in _items) {
                    if (_items[item].sku) {
                        _arr.push({
                            itemID: _items[item].item.id,
                            itemName: _items[item].item.item_name,
                            itemNum: _items[item].num,
                            item_sku: _items[item].sku.id,
                            discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                        });
                    } else {
                        _arr.push({
                            itemID: _items[item].item.id,
                            itemName: _items[item].item.item_name,
                            itemNum: _items[item].num,
                            discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                        });
                    }
                }
            }
            return _arr;
        },
        testCarts: function (carts) {
            var _this = this,
                _beal = true;
            Base.others.each(carts, function (item, i) {
                var _id = item.item_sku ? item.item_sku : item.itemID,
                    _num = Number(item.itemNum),
                    _stock = item.stock,
                    _msg = null;
                if (item.error_status) {
                    _msg = Lang.H5_IS_HAVESHEFL;
                } else {
                    if (_stock == 0) { //库存为0
                        if (item.is_discount_err) {
                            _msg = Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT;
                        } else {
                            _msg = Lang.H5_SOLD_OUT;
                        }

                    } else {
                        if (_stock >= 9999999) { //没设置库存,需要联系商家
                            //_msg = Lang.H5_NO_STOCK;
                        } else {
                            if (_stock == -1) {
                                if (item.need_sku) {
                                    _msg = Lang.H5_GOOD_DETAIL_CHANGE;
                                } else {
                                    _msg = Lang.H5_COMMODIFY_SHELF;
                                }
                            } else {
                                if (_stock > 0) {
                                    if (_stock < _num) { //超出库存
                                        if (item.is_discount_err) {
                                            _msg = Lang.H5_X_PCS_LEFT + _stock + Lang.H5_PCS;
                                        } else {
                                            _msg = Lang.H5_X_PCS_LEFT + _stock + Lang.H5_PCS;
                                        }
                                    }
                                } else {
                                    _msg = Lang.H5_COMMODIFY_SHELF;
                                }
                            }
                        }
                    }
                }

                if (_msg) {
                    $('.j_cart_item[data-id="' + _id + '"] .error-p').remove();
                    $('.j_cart_item[data-id="' + _id + '"]').append('<p class="error-p">' + _msg + '</p>');
                }
                if (!item.valid) {
                    _beal = false;
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + _msg + '</p>',
                        auto_fn: function () {
                            setTimeout(function () {
                                location.href = Config.host.hrefUrl + 'cart.php?error=confirm';
                            }, 3000);
                        }
                    });
                    return _beal;
                }

            });
            return _beal;
        },
        getData: function () {
            var _this = this,
                _logistics_info = $('.j_logistics_info'),
                _company = _logistics_info.length ? _logistics_info.attr('data-company') : '',
                _fee_id = _logistics_info.length ? _logistics_info.attr('data-id') : '',
                _shop_data = JSON.parse(localStorage.getItem('ShopData')),
                _seller_id = _shop_data.ShopInfo.id,
                _address = _shop_data.Address,
                _note = $.trim($('.j_buyer_note').val());
            if (!_company && _this.logistics) {
                _this.logistics.createHtm({
                    data: express_data.express_fee_list.list,
                    lang: Lang
                }).toShow();
                return null;
            }
            var _data = {
                "edata": {
                    "wduss": "",
                    "address_id": "0",
                    "note": "",
                    "pay_way": 11,
                    "pay_type": 1,
                    "seller_id": _seller_id,
                    "buyer_id": "0",
                    "buyer_note": _note,
                    "express_company": (_company ? _company : ''),
                    "express_fee_id": (_fee_id ? _fee_id : ''),
                    "items": _this.getItems(),
                    "buyer_address": _address,
                    "frm": 2
                }
            };
            return _data;
        },
        //满减
        countSum: function (carts) {
            var _this = this;
            //判断是否参与满减 如果为0 则为不参加满减
            if (price_data.price_info.shop_discount.length == 0) {
                return _this.countSumNoReduc(carts);
            } else {
                return _this.countSumReduc();
            }
        },
        countSumNoReduc: function (carts) {
            var _sum = 0;
            for (var cart in carts) {
                if (carts[cart].item.is_discount && carts[cart].item.discounting) {
                    _sum += carts[cart].num * carts[cart].item.discount.price;
                } else {
                    _sum += carts[cart].num * carts[cart].item.price;
                }

            }
            return _sum;
        },
        //渲染满减活动
        countSumReduc: function () {
            var _this = this;
            var _last_price = price_data.price_info.total_price;
            return _last_price;
        },
        //获取优惠
        getFavorable: function () {
            var _this = this;
            var _items_price = price_data.price_info.items_price;
            var _last_price = price_data.price_info.total_price;
            return _items_price - _last_price;
        }
    };
    OrderConfirmHtm.init();
})