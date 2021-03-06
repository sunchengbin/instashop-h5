/**
 * Created by sunchengbin on 16/6/12.
 */
require(['cart', 'dialog', 'ajax', 'config', 'base', 'lang', 'fastclick', 'debug', 'cache', 'oauth', 'bargain', 'cookie'], function (Cart, Dialog, Ajax, Config, Base, Lang, Fastclick, Debug, Cache, Oauth, Bargain, Cookie) {
    var CartIndex = {
        init: function () {
            var _this = this;
            _this.ShopInfo = JSON.parse(localStorage.getItem('ShopData')).ShopInfo;
            _this.judageOauth = Oauth.checkIsLogin();
            _this.handleFn();
        },
        handleFn: function () {
            var _that = this;
            Fastclick.attach(document.body);
            $('body').on('click', '.j_add_btn,.j_reduce_btn', function () {
                var _item_id = $(this).attr('data-item-id');
                var _item_in_cart_id = $(this).attr('data-id');
                var $_curCartItem = $($('.j_cart_item[data-id="' + _item_in_cart_id + '"]'));
                var _is_add = $(this).attr("class").indexOf("add")==-1?false:true,
                _item_num_input = $($_curCartItem.find('.j_item_num')),
                _item_num = _item_num_input.val(),
                    _num = _is_add?1:-1,
                    
                    _stock = $(this).attr('data-stock'),
                    _item_sku_id = $(this).attr('data-sku-id');
                if(!_is_add&&_item_num<=1)return;
                if (_stock && _stock <= _num) {
                    return;
                }
                _that.updateItemInCartNum({
                    item_id:_item_id,
                    num: _num,
                    item_sku_id: _item_sku_id,
                    noStockCallback: function () {},
                    callback: function (num) {
                        _item_num_input.val(~~_item_num+(_num));
                    }
                });

            });
            // $('body').on('click', '.j_reduce_btn', function () {
            //     var _item_num = $('.j_item_num'),
            //         _num = Number(_item_num.val());
            //     _item_num.val((--_num > 0) ? _num : 1);
            // });
            $('body').on('click', '.j_del_cart', function () {
                var _this = $(this),
                    _item_id = _this.attr('data-id');
                PaqPush && PaqPush('从购物车删除', 'itemId=' + _this.attr('data-id') + ',sellerId=' + JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id);
                Dialog.confirm({
                    cover_event: true,
                    cf_fn: function () {
                        Cart().removeItem(_item_id, function () {
                            //location.reload();
                            $('.j_cart_item[data-id="' + _item_id + '"]').remove();
                            if(!$('.j_cart_item').length){
                                var _htm = '<ul class=""><li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>'
                                    +'<li><div class="no_goods_box"><button class="btn j_go_shop confirm-btn">' + Lang.H5_BROWSE_SHOP + '</button>'+'</div></li></ul>';
                                $('.j_cart_list').html(_htm);
                            }
                        });
                    }
                });
            });
            $('body').on('click', '.j_go_back', function () {
                //TODO 返回埋点
                PaqPush && PaqPush('返回', '');
                var _fromurl = localStorage.getItem('CartFromUrl');
                if (!_fromurl) {
                    var _url = !Base.others.isCustomHost() ? Config.host.host : Config.host.host + 's/' + JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id;
                    localStorage.removeItem('CartFromUrl');
                    setTimeout(function () {
                        location.href = _url;
                    }, 1);
                } else {
                    localStorage.removeItem('CartFromUrl');
                    var _scroll_url = localStorage.getItem('index_route_info') ? localStorage.getItem('index_route_info') : '';
                    setTimeout(function () {
                        if (/pt/g.test(_fromurl)) {
                            location.href = _fromurl.split('?')[0] + '?item=back' + _scroll_url;
                        } else {
                            location.href = _fromurl + '?item=back' + _scroll_url;
                        }

                    }, 1);
                }
            });
            $('body').on('click', '.j_go_shop', function () {
                PaqPush && PaqPush('去逛逛', '');
                var _url = !Base.others.isCustomHost() ? Config.host.host : Config.host.host + 's/' + JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id;
                location.href = _url;
            });
            $('body').on('click', '.j_submit_btn', function () {
                var _groupid = $(this).attr('group-id');

                // 4.7改造更新 判断用户是否需要登录
                if (Oauth.checkIsNeedLogin(JSON.parse(localStorage.getItem('ShopData')).ShopInfo)) {
                    // 具备登录机制
                    var _judageOauth = _that.judageOauth;
                    if (_judageOauth.result) {
                        // 登录的 去结算
                        // 再请求一次活动明细
                        PaqPush && PaqPush('登录结算-' + _judageOauth.info.auth_type, '');
                        _that.goClear(_groupid);
                    } else {
                        Oauth.openDialog("cart", {
                            groupid: _groupid
                        });
                    }
                } else {
                    // 不具备登录机制的 去结算
                    PaqPush && PaqPush('免登录结算', '');
                    _that.goClear(_groupid);
                }
            });
            $('body').on('click', '.j_cart_no_login', function () {
                PaqPush && PaqPush('免登录结算', '');
                var _groupid = $(this).attr('group-id');
                _that.goClear(_groupid);
            })
            if (Base.others.getUrlPrem('error')) {
                _that.subData();
            }
        }, 
        updateItemInCartNum: function (opts) {
            var _this = this,
                _seller_id = _this.ShopInfo.id, //店铺id
                _item_id = opts.item_id, //商品
                _num = opts.num, //商品数量
                _uss = Cookie.getCookie('uss'), //登录的真实账户的uss
                _buyer_id = _uss ? Cookie.getCookie('uss_buyer_id') : Cookie.getCookie('buyer_id'); //匿名买家id

            if (Base.others.getUrlPrem('uss')) {
                _uss = Base.others.getUrlPrem('uss');
                _buyer_id = Base.others.getUrlPrem('uss_buyer_id');
            }
            var _data = {
                "edata": {
                    "action": "update",
                    "is_direct_buy": 0,
                    "seller_id": _seller_id,
                    "buyer_id": _buyer_id,
                    "num": _num,
                    "item_id": _item_id,
                    "item_sku_id": opts.item_sku_id
                }
            };
            _uss && (_data.edata.uss = _uss);
            _this._loading = Dialog.loading();
            Ajax.postJsonp({
                url: Config.actions.cartAction,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'PUT',
                timeout: 30000,
                success: function (obj) {
                    _this._loading.remove();
                    if (obj.code == 200) {
                        var _num = obj.cart_num;
                        opts.callback && opts.callback();
                    } else {
                        //alert( obj.message);
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + obj.message + '</p>'
                        });
                    }
                },
                error: function (error) {
                    _this._loading.remove();
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                        auto_fn: function () {
                            this.remove();
                        }
                    });
                }
            });
        },
        goClear: function (groupid) {
            var _that = this;
            _that.subData(groupid);
        },
        checkIsHasBargain: function () {
            var _data = JSON.parse(localStorage.getItem('ShopData'));
            if (!_data.ShopInfo.bargain) return false;
            if (_data.ShopInfo.bargain.count > 0) {
                return true;
            } else {
                return false;
            }
        },
        // 对分库商品添加适配处理
        getItems: function (groupid) {
            var _arr = [];
            $('.j_cart_item[group-id="' + groupid + '"]').each(function (i, item) {
                _arr.push($(item).attr('data-id'));
            });
            return _arr;
        },
        subData: function (groupid) {
            var _this = this,
                _seller_id = JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id,
                _uss = Cookie.getCookie('uss'), //登录的真实账户的uss
                _select_items = _this.getItems(groupid),
                _buyer_id = _uss ? Cookie.getCookie('uss_buyer_id') : Cookie.getCookie('buyer_id'); //匿名买家id
            var _data = {
                "edata": {
                    "buyer_id": _buyer_id,
                    "is_direct_buy": 0, //如果是直接购买，则传1。普通情况传0
                    "seller_id": _seller_id,
                    "select_items": _select_items,
                    "opt": 'cart,address,price,express'
                }
            };
            _uss && (_data.edata.uss = _uss);
            _this._loading = Dialog.loading({
                can_exist: true
            });
            Ajax.postJsonp({
                url: Config.actions.cartAction,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'GET',
                success: function (obj) {
                    if (obj.code == 200) {
                        if (_this.testCarts(obj.buyer_cart[groupid])) {
                            if (obj.buyer_address && obj.buyer_address.id) {
                                location.href = Config.host.hostUrl + 'orderconfirm.php?select_items=' + JSON.stringify(_select_items) + '&address_id=' + obj.buyer_address.id;
                            } else {
                                Dialog.confirm({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_NO_ADDR_TIP + '</p>',
                                    //cfb_txt : Lang.H5_GO_CONFIRM,//确定按钮文字
                                    cover_event: true,
                                    cf_fn: function () {
                                        location.href = Config.host.hostUrl + 'address.php?select_items=' + JSON.stringify(_select_items);
                                    }
                                });

                            }
                        }
                    } else {
                        Dialog.alert({
                            top_txt: '', //可以是html
                            cfb_txt: Lang.H5_FRESHEN,
                            body_txt: '<p class="dialog-body-p">' + Lang.H5_ERROR + '</p>',
                            cf_fn: function () {
                                location.reload();
                            }
                        });
                    }
                    _this._loading.remove();
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
                    _this._loading.remove();
                }
            });
        },
        testCarts: function (cart) {
            var _error_msgs = [],
                _beal = true;
            $.each(cart, function (i, item) {
                if (item.status != 1) {
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
        }
    };
    CartIndex.init();
})