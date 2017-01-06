/**
 * Created by sunchengbin on 16/6/2.
 * 添加购物车相关
 */
define(['base', 'lang', 'dialog', 'debug'], function (Base, Lang, Dialog, Debug) {
    var Constant = {
        DROPSHIPER_FLAG: 2
    }
    var Cart = function (data) {
        if (data) {
            var _json_shop_data = localStorage.getItem('ShopData') ? JSON.parse(localStorage.getItem('ShopData')) : null;
            if (_json_shop_data && data) {
                if (_json_shop_data.ShopInfo.id != data.item.shop.id) {
                    _json_shop_data['ShopInfo'] = data.item.shop;
                    _json_shop_data['ClientUuid'] = data.client_uuid;
                }
            } //存在且id不相等跳出
            else {
                _json_shop_data = {
                    Cart: null, //购物车数据不需要跟着店铺变化而变化的本地数据
                    Items: null, //根据店铺而变化
                    ShopInfo: data.item.shop, //根据店铺id变化而变化
                    ClientUuid: data.client_uuid || null, //根据店铺而重置
                    Address: null //不需要根据店铺切换而改变的本地数据
                };
            }
            localStorage.setItem('ShopData', JSON.stringify(_json_shop_data));
        }
        this.initCart();
    };
    Cart.prototype = {
        initCart: function () {
            var _this = this;
            var _json_shop_data = localStorage.getItem('ShopData') ? JSON.parse(localStorage.getItem('ShopData')) : null,
                _cart;
            this.data = _json_shop_data;
            if (_json_shop_data) {
                _cart = _json_shop_data.Cart;
            } else {
                _cart = null;
            }
            this.cart = _cart;
            if (!!_cart) this.data.GroupCart = this.convertGroup(_cart);

        },
        //输入原始购物车数据包shop_id->good_id
        convertGroup: function (cart) {
            var _this = this,
                _cart, _shopId, _curShopCart, _curCartPackag;
            try {
                _cart = _this.data.GroupCart || {};
                _shopId = _this.data.ShopInfo.id;
                _curShopCart = cart[_shopId];
                _cart[_this.data.ShopInfo.id] = {
                    isGroup: false, //是否分库标志
                    group: {} //分库后的购物车数据包 
                }
                _curCartPackage = _cart[_this.data.ShopInfo.id];
                for (var item in _curShopCart) {
                    if (_curShopCart[item].item.supply_type == Constant.DROPSHIPER_FLAG) {
                        _curCartPackage.isGroup = true;
                    }
                }
                //分组
                for (var item in _curShopCart) {
                    var _curItemPackage = _curShopCart[item];
                    var _curItem = _curItemPackage.item;
                    var _id = (_curItem.sku.length > 0 ? _curItemPackage.sku.id : _curItem.id);
                    if (_curItem.supply_type == 2) {
                        if (!!_curCartPackage.group[_curItem.supply_shop.id]) {
                            _curCartPackage.group[_curItem.supply_shop.id][_id] = _curItemPackage;
                        } else {
                            _curCartPackage.group[_curItem.supply_shop.id] = {};
                            _curCartPackage.group[_curItem.supply_shop.id][_id] = _curItemPackage;
                        }
                    } else {
                        if (!!_curCartPackage.group[_curItem.seller_id]) {
                            _curCartPackage.group[_curItem.seller_id][_id] = _curItemPackage;
                        } else {
                            _curCartPackage.group[_curItem.seller_id] = {};
                            _curCartPackage.group[_curItem.seller_id][_id] = _curItemPackage;
                        }
                    }
                }
            } catch (error) {
                alert(error);
            }
            return _cart;
        },
        addItem: function (opts) {
            var _this = this;
            if (opts.item.is_discount && !opts.item.discounting) {
                Dialog.confirm({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_DCCORDING_TO_THE_ORIGINAL_PRICE_TO_BUY + '</p>',
                    cf_fn: function () {
                        _this.addToCart(opts);
                    }
                });
                return;
            }
            if (opts.price < 0) {
                //alert('请联系商家,进行购买');
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_NO_PRICE + '</p>'
                });
                return;
            } else {
                if ((opts.sku && (opts.sku.stock >= 9999999)) || (!opts.sku && (opts.item.stock >= 9999999))) {
                    Dialog.confirm({
                        top_txt: '', //可以是html
                        cfb_txt: Lang.H5_IS_CONFIRM, //确定按钮文字
                        cab_txt: Lang.H5_GO_CONTACT, //取消按钮的文字
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_NO_STOCK + '</p>',
                        cf_fn: function () {
                            _this.addToCart(opts);
                        },
                        c_fn: function () {
                            opts.noStockCallback && opts.noStockCallback();
                        }
                    });
                } else {
                    _this.addToCart(opts);
                }
            }
        },
        addToCart: function (opts) {
            var _this = this,
                _shop_id = opts.item.shop.id, //商铺id
                _item_id = opts.item.id; //商品id
            var _groupCart = {};
            _this.initCart();
            if (!_this.cart) { //cart不存在
                _this.cart = {};
                _this.cart[_shop_id] = {};
            } else {
                if (!_this.cart[_shop_id]) { //当前店铺cart是否存在
                    _this.cart[_shop_id] = {};
                }
            }
            console.log(opts.sku);
            if (opts.sku) { //有规格的商品以规格id为key
                var _discout_num = _this.getItemSkus(_shop_id)[_item_id] ? (_this.getItemSkus(_shop_id)[_item_id] + opts.num) : null,
                    _stock = (opts.item.is_discount && opts.item.discounting) ? opts.item.discount.limit_count : opts.sku.stock;;
                if (!_this.cart[_shop_id][opts.sku.id]) { //某个商品的某个规格
                    if (_stock > 0) {
                        if (_discout_num) { //购物车中该商品的数量
                            if (!_this.verifyItem(_discout_num, _stock)) {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT + '</p>'
                                });
                                return;
                            }
                        } else { //不存在该商品
                            if (!_this.verifyItem(opts.num, _stock)) {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT + '</p>'
                                });
                                return;
                            }
                        }
                    }

                    _this.cart[_shop_id][opts.sku.id] = {};
                } else {
                    var _test_num = opts.num + _this.cart[_shop_id][opts.sku.id].num;
                    if (_discout_num) {
                        _test_num = _discout_num;
                    }
                    if (_stock != 0) {
                        if (_this.verifyItem(_test_num, _stock)) {
                            opts.num += _this.cart[_shop_id][opts.sku.id].num;
                        } else {
                            if (_discout_num) {
                                //限购数
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT + '</p>'
                                });
                            } else {
                                //alert('超出库存');
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_OVER_INVENTORY + '</p>'
                                });
                            }
                            return;
                        }
                    }
                }
                _this.cart[_shop_id][opts.sku.id] = opts;
            } else { //没有规格的商品以商品id为key
                var _discout_num = _this.getItemSkus(_shop_id)[_item_id] ? (_this.getItemSkus(_shop_id)[_item_id] + opts.num) : null,
                    _stock = (opts.item.is_discount && opts.item.discounting) ? opts.item.discount.limit_count : opts.item.stock;
                if (!_this.cart[_shop_id][_item_id]) {
                    if (_stock > 0) {
                        if (_discout_num) { //购物车中该商品的数量
                            if (!_this.verifyItem(_discout_num, _stock)) {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT + '</p>'
                                });
                                return;
                            }
                        } else { //不存在该商品
                            if (!_this.verifyItem(opts.num, _stock)) {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT + '</p>'
                                });
                                return;
                            }
                        }
                    }
                    _this.cart[_shop_id][_item_id] = {};
                } else {
                    var _test_num = opts.num + _this.cart[_shop_id][_item_id].num;
                    if (_discout_num) {
                        _test_num = _discout_num;
                    }
                    if (_stock != 0) {
                        if (_this.verifyItem(_test_num, _stock)) {
                            opts.num += _this.cart[_shop_id][_item_id].num;
                        } else {
                            if (_discout_num) {
                                //限购数
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT + '</p>'
                                });
                            } else {
                                //alert('超出库存');
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_OVER_INVENTORY + '</p>'
                                });
                            }
                            return;
                        }
                    }
                }
                _this.cart[_shop_id][_item_id] = opts;
            }
            _this.data.Cart = _this.cart;
            _this.data.GroupCart = _this.convertGroup(_this.cart)
            if (opts.item.supply_type == "2") {
                _this.data.SupplyShopInfo = opts.item.supply_shop;
            }
            _this.data.ShopInfo = opts.item.shop;
            localStorage.setItem('ShopData', JSON.stringify(_this.data));

            _this.addCartAnimate(function () {
                opts.callback && opts.callback.apply(_this);
            }, opts.isbuynow, opts.item.img);
        },
        addCartAnimate: function (callback, buynow, itemimg) {
            var _w_w = $(window).width(),
                _w_h = $(window).height(),
                _wraper = $('.j_buy_plug'),
                _b_h = _wraper.height() - 90;
            if (buynow == 'true') {
                callback && callback();
            } else {
                $('.j_cart_animate').remove();
                if (!$('.j_cart_animate').length) {
                    //$('body').append('<div class="j_cart_animate" style="border-radius:50%;position:fixed;left:1rem;bottom:'+_b_h+'px;width:10px;height:10px;z-index:'+Base.others.zIndex+';background-color:#FD623C;"></div>');
                    $('body').append('<img class="j_cart_animate" style="width:6rem;height:6rem;position:fixed;left:1rem;bottom:' + _b_h + 'px;z-index:' + Base.others.zIndex + ';" src="' + itemimg + '"/>');
                }
                setTimeout(function () {
                    var _ca = document.querySelector('.j_cart_animate');
                    _ca.style.webkitTransitionDuration = '1s';
                    _ca.style.webkitTransform = 'translate3d(' + (_w_w - 80) + 'px,' + (-_w_h + _b_h + 60) + 'px,0) rotate(3600deg) scale(0)';
                    setTimeout(function () {
                        $('.j_cart_animate').remove();
                        callback && callback();
                    }, 1000);
                }, 300);
            }
        },
        //创建订单后清空购物车
        //按分组清空
        clearCarts: function () {
            var _json_shop_data = localStorage.getItem('ShopData') ? JSON.parse(localStorage.getItem('ShopData')) : null;
            if (_json_shop_data) {
                _json_shop_data.Cart = null;
                _json_shop_data.GroupCart = null;
                localStorage.setItem('ShopData', JSON.stringify(_json_shop_data));
            }
        },
        removeItem: function (id, callback) {
            var _this = this;
            _this.initCart();
            if (!_this.cart) {
                return null;
            }
            //同步删除原版的
            delete _this.cart[_this.data.ShopInfo.id][id];
            _this.data.Cart = _this.cart;
            // if (!!_this.data.SupplyShopInfo) {
            _this.data.GroupCart = _this.convertGroup(_this.cart);
            // }
            localStorage.setItem('ShopData', JSON.stringify(_this.data));
            if (Base.others.testObject(_this.cart[_this.data.ShopInfo.id])) {
                callback && callback();
            }
        },
        getIsGroup: function () {
            var _this = this;
            var _isGroup = false;
            if (!_this.data.Cart) return null;
            //每次去检查购物车
            _isGroup = (function () {
                for (var key in _this.data.Cart[_this.data.ShopInfo.id]) {
                    var _cur = _this.data.Cart[_this.data.ShopInfo.id][key];
                    if (_cur.item.supply_type == 2) {
                        return true;
                    }
                }
            })();
            if (_isGroup == void(0)) _isGroup = false;
            return _isGroup;
        },
        getCart: function () {
            var _this = this;
            _this.initCart();
            if (!_this.cart) {
                return null;
            }
            return _this.cart;
        },
        getCarts: function () {
            var _this = this;
            _this.initCart();
            if (!_this.cart) {
                return null;
            }
            if (Base.others.testObject(_this.cart[_this.data.ShopInfo.id])) {
                return [];
            }
            return _this.data.Cart[_this.data.ShopInfo.id];
        },
        getCartNum: function () {
            var _num = 0,
                _this = this,
                carts = _this.getCarts();
            if (!carts) {
                return 0;
            }
            for (var cart in carts) {
                _num += Number(carts[cart].num);
            }
            if (_num > 9) {
                _num = '9+';
            }
            return _num;
        },
        getGroupNum: function () {
            var _this = this,
                _groupCart = _this.data.GroupCart;
            if (!_groupCart) {
                return 0;
            }
            return Object.keys(_groupCart[_this.data.ShopInfo.id].group).length;
        },
        verifyItem: function (num, stock) {
            if (num > stock) {
                return false;
            }
            return true;
        },
        getItemSkus: function (shopid) {
            var _this = this,
                _carts = _this.cart[shopid].carts,
                _item = {};
            if (!_carts) return {};
            for (var item in _carts) {
                console.log(_carts[item].item);
                if (_carts[item].item.is_discount && _carts[item].item.discounting) {
                    if (_item[_carts[item].item.id]) {
                        _item[_carts[item].item.id] += _carts[item].num ? _carts[item].num : 0;
                    } else {
                        _item[_carts[item].item.id] = _carts[item].num ? _carts[item].num : 0;
                    }

                }
            }
            return _item;
        }

    };
    return function (data) {
        return new Cart(data);
    };
})