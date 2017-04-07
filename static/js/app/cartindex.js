/**
 * Created by sunchengbin on 16/6/12.
 */
require(['hbs', 'text!views/app/cart.hbs', 'cart', 'dialog', 'ajax', 'config', 'base', 'lang', 'fastclick', 'debug', 'cache', 'oauth', 'bargain'], function (Hbs, Carthtm, Cart, Dialog, Ajax, Config, Base, Lang, Fastclick, Debug, Cache, Oauth, Bargain) {
    var CartIndex = {
        init: function () {
            var _data = JSON.parse(localStorage.getItem('ShopData'));
            var _carts = Cart().getCarts(),
                isGroup = this.isGroup = Cart().getIsGroup();
            if (!_data || !_carts) {
                var _htm = Hbs.compile(Carthtm)({
                    cart: [],
                    groupCart: null,
                    lang: Lang,
                    isGroup: false,
                    isDrop: false
                });
                $('body').prepend(_htm);
            } else {
                var GroupCart = this.GroupCart = (function () {
                    if (!isGroup || !_data.GroupCart) return null;
                    return _data.GroupCart[_data.ShopInfo.id];
                })()
                var _htm = Hbs.compile(Carthtm)({
                    cart: _carts,
                    groupCart: GroupCart,
                    lang: Lang,
                    isGroup: isGroup,
                    isDrop: _data.ShopInfo.drop
                });
                this.carts = _carts;
                $('body').prepend(_htm);
                this.handleFn();
                var _cart_debug = {
                    "isGroup": isGroup,
                    "drop开关": _data.ShopInfo.drop,
                    "组购物车": GroupCart,
                    "组数量": Cart().getGroupNum(),
                    "原始购物车": _carts,
                }
                Debug.log({
                    title: "购物车分组信息",
                    data: _cart_debug
                })
                this.loginResultPackage = Oauth.checkIsLogin();
            }

        },
        handleFn: function () {
            var _that = this;
            Fastclick.attach(document.body);
            $('body').on('click', '.j_del_cart', function () {
                var _this = $(this);
                PaqPush && PaqPush('从购物车删除', 'itemId=' + _this.attr('data-id') + ',sellerId=' + JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id);
                Dialog.confirm({
                    cover_event: true,
                    cf_fn: function () {
                        Cart().removeItem(_this.attr('data-id'), function () {
                            var _htm = '<ul class=""><li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li></ul><button class="btn j_go_shop confirm-btn">' + Lang.H5_BROWSE_SHOP + '</button>';
                            $('.j_cart_list').html(_htm);
                        });
                        delete _that.carts[_this.attr('data-id')];
                        $('.j_cart_item[data-id="' + _this.attr('data-id') + '"]').remove();
                        if (_that.isGroup) {
                            var $curGroupChildren = $('.cart-supplier-card[group-id="' + _this.attr('group-id') + '"]>ul>li');
                            if ($curGroupChildren.length == 0) {
                                $('.cart-supplier-card[group-id="' + _this.attr('group-id') + '"]').remove();
                                $('.j_cart_list').addClass("no_goods_box");
                            }
                            _that.GroupCart = Cart().convertGroup(Cart().getCart())[JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id];
                        } else {
                            //被删空了
                            if ($.isEmptyObject(_that.carts)) {
                                $('.j_cart_list').addClass("no_goods_box");
                            }
                        }

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

                if (_that.checkIsHasBargain()) {
                    // 具备登录机制
                    var _judageOauth = Oauth.checkIsLogin();
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
        getAddressItems: function (groupid) {
            var _carts = this.isGroup ? this.GroupCart : this.carts,
                _arr = [];
            if (!_carts) {
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SHOPING_NO_GOODS + '?</p>'
                });
            } else {
                var _items;
                if (this.isGroup) {
                    _items = _carts.group[groupid];
                    for (var item in _items) {
                        if (_items[item].sku) {
                            if (_items[item].item.bargain) {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    //itemName:_items[item].item.item_name,
                                    itemNum: _items[item].num,
                                    bargain_price: _items[item].sku.bargain_price,
                                    item_sku: _items[item].sku.id,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            } else {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    //itemName:_items[item].item.item_name,
                                    itemNum: _items[item].num,
                                    item_sku: _items[item].sku.id,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            }
                        } else {
                            if (_items[item].item.bargain) {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    //itemName:_items[item].item.item_name,
                                    bargain_price: _items[item].item.bargain.price,
                                    itemNum: _items[item].num,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            } else {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    //itemName:_items[item].item.item_name,
                                    itemNum: _items[item].num,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            }

                        }
                    }
                } else {
                    _items = _carts;
                    for (var item in _items) {
                        if (_items[item].sku) {
                            if (_items[item].item.bargain) {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    //itemName:_items[item].item.item_name,
                                    itemNum: _items[item].num,
                                    item_sku: _items[item].sku.id,
                                    bargain_price: Bargain.isActualAttendBargain(_items[item].item.bargain.id) ? _items[item].sku.bargain_price : 0,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            } else {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    //itemName:_items[item].item.item_name,
                                    itemNum: _items[item].num,
                                    item_sku: _items[item].sku.id,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            }

                        } else {
                            if (_items[item].item.bargain) {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    //itemName:_items[item].item.item_name,
                                    itemNum: _items[item].num,
                                    bargain_price: Bargain.isActualAttendBargain(_items[item].item.bargain.id) ? _items[item].item.bargain.price : 0,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            } else {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    //itemName:_items[item].item.item_name,
                                    itemNum: _items[item].num,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            }

                        }
                    }
                }

            }
            return _arr;
        },
        // 对分库商品添加适配处理
        getItems: function (groupid) {
            var _carts = this.isGroup ? this.GroupCart : this.carts,
                _arr = [];
            if (!_carts) {
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SHOPING_NO_GOODS + '?</p>'
                });
            } else {
                var _items;
                if (this.isGroup) {
                    _items = _carts.group[groupid];
                    console.log("是否分组")
                    console.log(_items)
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
                } else {
                    _items = _carts;
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
            }
            return _arr;
        },
        subData: function (groupid) {
            var _that = this;
            var data = localStorage.getItem('ShopData');
            var _items = _that.getItems(groupid);
            if (!_items.length) {
                return;
            }
            var reqData = {
                edata: {
                    action: 'check',
                    items: _items,
                    telephone: (data && JSON.parse(data).Address ? JSON.parse(data).Address.telephone : 0),
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
                            if (_that.testCarts(obj.carts)) {
                                if (!JSON.parse(localStorage.getItem('ShopData')).Address) {
                                    Dialog.confirm({
                                        top_txt: '', //可以是html
                                        body_txt: '<p class="dialog-body-p">' + Lang.H5_NO_ADDR_TIP + '?</p>', //弹窗内容区字段
                                        cf_fn: function () {
                                            var _shop_data = JSON.parse(localStorage.getItem('ShopData'));
                                            _shop_data.Cart[_shop_data.ShopInfo.id] = _that.carts;
                                            localStorage.setItem('ShopData', JSON.stringify(_shop_data));
                                            setTimeout(function () {
                                                var _buyer_id = _that.loginResultPackage.result ? _that.loginResultPackage.info.buyer_id : "";
                                                if (!!groupid) {
                                                    location.href = Config.host.hrefUrl + 'address.php?groupid=' + groupid + '&buyer_id=' + _buyer_id;
                                                } else {
                                                    location.href = Config.host.hrefUrl + 'address.php' + '?buyer_id=' + _buyer_id;
                                                }
                                            }, 1);
                                        }
                                    });
                                } else {
                                    var _shop_data = JSON.parse(localStorage.getItem('ShopData'));
                                    _shop_data.Cart[_shop_data.ShopInfo.id] = _that.carts;
                                    localStorage.setItem('ShopData', JSON.stringify(_shop_data));
                                    var _address = JSON.parse(localStorage.getItem('ShopData')).Address.address,
                                        _addr = _address.country + ',' + _address.city + ',' + _address.province;
                                    setTimeout(function () {
                                        var _item_str = JSON.stringify(_that.getAddressItems(groupid));
                                        var _buyer_id = _that.loginResultPackage.result ? _that.loginResultPackage.info.buyer_id : "";
                                        location.href = Config.host.hrefUrl + 'orderconfirm.php?seller_id=' + reqData.edata.seller_id + '&addr=' + encodeURIComponent(_addr) + '&buyer_id=' + _buyer_id + '&groupid=' + groupid + '&items=' + encodeURIComponent(_item_str);
                                    }, 1);
                                }
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
        },
        testCarts: function (carts) {
            var _this = this,
                _error_msgs = [],
                _beal = true;
            Base.others.each(carts, function (item, i) {
                var _id = item.item_sku ? item.item_sku : item.itemID,
                    _num = Number(item.itemNum),
                    _stock = item.stock,
                    _msg = null;
                //存在error_status 表示 商品已下架
                if (item.error_status) {
                    _msg = Lang.H5_IS_HAVESHEFL;
                } else {
                    if (_stock == 0) { //库存为0
                        if (item.is_discount_err) {
                            _msg = Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT; //超出限购
                        } else {
                            _msg = Lang.H5_SOLD_OUT;
                        }
                    } else {
                        if (_stock >= 9999999) { //没设置库存,需要联系商家
                            //_msg = Lang.H5_NO_STOCK;
                        } else {
                            if (_stock == -1) {
                                //校验是否存在need_sku
                                //存在need_sku:卖家需要填写sku
                                if (item.need_sku) {
                                    _msg = Lang.H5_GOOD_DETAIL_CHANGE;
                                } else {
                                    //表示商品已售完
                                    _msg = Lang.H5_SOLD_OUT;
                                }
                            } else {
                                if (_stock > 0) {
                                    if (_stock < _num) { //超出库存
                                        _msg = Lang.H5_X_PCS_LEFT + _stock + Lang.H5_PCS;
                                        $('.j_cart_item[data-id="' + _id + '"] .num').html(Lang.H5_QUANTITY + ':' + _stock);
                                        _this.carts[_id].num = _stock;
                                    }
                                } else { //库存小于0的时候提示已售完
                                    _msg = Lang.H5_SOLD_OUT;
                                }
                            }
                        }
                    }
                }
                if (!item.valid) {
                    _beal = false;
                    _error_msgs.push(_msg);
                }
                if (_msg) {
                    $('.j_cart_item[data-id="' + _id + '"] .error-p').remove();
                    $('.j_cart_item[data-id="' + _id + '"]').append('<p class="error-p">' + _msg + '</p>');
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