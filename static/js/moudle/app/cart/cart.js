/**
 * Created by sunchengbin on 16/6/2.
 * 添加购物车相关
 */
define(['base', 'lang', 'dialog', 'debug','ajax','config'], function (Base, Lang, Dialog, Debug,Ajax,Config) {
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
                _shop_id = opts.item.shop.id, //商铺id
                _item_id = opts.item.id; //商品id
            var _data = {
                "edata": {

                }
            };
            _this._loading = Dialog.loading();
            Ajax.postJsonp({
                url: Config.actions.addToCart,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'POST',
                timeout: 30000,
                success: function (obj) {
                    _this._loading.remove();
                    if(obj.code == 200){
                        _this.addCartAnimate(function () {
                            opts.callback && opts.callback.apply(_this);
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
            var _this = this;
            var _data = {
                "edata": {

                }
            };
            _this._loading = Dialog.loading();
            Ajax.postJsonp({
                url: Config.actions.delItemFromCart,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'POST',
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
            var _data = {
                "edata": {

                }
            };
            Ajax.postJsonp({
                url: Config.actions.getCartNum,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'POST',
                timeout: 30000,
                success: function (obj) {
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
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>'
                    });
                }
            });
        }

    };
    return function (data) {
        return new Cart(data);
    };
})