/**
 * Created by sunchengbin on 16/6/2.
 * 添加购物车相关
 */
define(['base', 'lang', 'dialog', 'debug','ajax','config','cookie'], function (Base, Lang, Dialog, Debug,Ajax,Config,Cookie) {
    var Cart = function () {};
    Cart.prototype = {
        //把商品加入购物车验证
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
        //加入购物车
        addToCart: function (opts) {
            var _this = this,
                _seller_id = opts.item.shop.id, //店铺id
                _item_id = opts.item.id,//商品
                _item_sku_id = opts.sku&&opts.sku.id?opts.sku.id:0,//商品sku_id
                _num = opts.num,//商品数量
                _uss = Cookie.getCookie('uss'),//登录的真实账户的uss
                _buyer_id = _uss?Cookie.getCookie('uss_buyer_id'):Cookie.getCookie('buyer_id'); //匿名买家id

            //alert('uss='+Cookie.getCookie('uss'));
            //alert('uss_buyer_id='+Cookie.getCookie('uss_buyer_id'));
            //alert('buyer_id='+Cookie.getCookie('buyer_id'));
            //alert('_buyer_id='+_buyer_id);
            var _data = {
                "edata": {
                    "action": "update",
                    "is_direct_buy": opts.is_direct_buy,
                    "seller_id": _seller_id,
                    "buyer_id": _buyer_id,
                    "num": _num,
                    "item_id": _item_id,
                    "item_sku_id": _item_sku_id
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
                    if(obj.code == 200){
                        var _num = obj.cart_num;
                        _this.addCartAnimate(function () {
                            opts.callback && opts.callback.call(_this,_num);
                        }, opts.isbuynow, opts.item.img);
                    }else{
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>'
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
        //加入购物车动画
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
                    $('body').append('<img class="j_cart_animate" style="border-radius:50%;width:3rem;height:3rem;position:fixed;left:.5rem;bottom:' + _b_h + 'px;z-index:' + Base.others.zIndex + ';" src="' + itemimg + '"/>');
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
        //删除商品
        removeItem: function (id, callback) {
            var _this = this,
                _uss = Cookie.getCookie('uss'),//登录的真实账户的uss
                _buyer_id = _uss?Cookie.getCookie('uss_buyer_id'):Cookie.getCookie('buyer_id'); //匿名买家id
            var _data = {
                "edata": {
                    "action": "save",
                    "buyer_id": _buyer_id,
                    "delete_items": [id], //要删除的商品。传购物车里面每个商品的购物车id
                    "edit_items": [],//要修改的商品
                    "seller_id": JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id
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
                    if(obj.code == 200){
                        callback && callback();
                    }else{
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>'
                        });
                    }
                },
                error: function (error) {
                    _this._loading.remove();
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>'
                    });
                }
            });
        },
        //获取购物车中商品数量
        getCartNum: function (callback) {
            var _this = this,
                _uss = Cookie.getCookie('uss'),//登录的真实账户的uss
                _buyer_id = _uss?Cookie.getCookie('uss_buyer_id'):Cookie.getCookie('buyer_id'); //匿名买家id
            var _data = {
                "edata": {
                    "action":"num",
                    "buyer_id": _buyer_id,
                    "seller_id": JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id
                }
            };
            _uss && (_data.edata.uss = _uss);
            Ajax.postJsonp({
                url: Config.actions.cartAction,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'GET',
                timeout: 30000,
                success: function (obj) {
                    if(obj.code == 200){
                        callback && callback(obj.cart_num||0);
                    }else{
                        //Dialog.tip({
                        //    top_txt: '', //可以是html
                        //    body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>'
                        //});
                    }
                },
                error: function (error) {
                    //Dialog.tip({
                    //    top_txt: '', //可以是html
                    //    body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>'
                    //});
                }
            });
        }

    };
    return function (data) {
        return new Cart(data);
    };
})