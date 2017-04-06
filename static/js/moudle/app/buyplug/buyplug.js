/**
 * Created by sunchengbin on 16/6/2.
 * 添加到购物车插件
 */
define(['common', 'base', 'hbs', 'text!views/moudle/buyplug.hbs', 'btn', 'dialog', 'cart', 'lang', 'config', 'fastclick'], function (Common, Base, Hbs, Buyplughtm, Btn, Dialog, Cart, Lang, Config, Fastclick) {
    var BuyPlug = function (opts) {
        var _this = this;
        _this.config = $.extend({
            wraper: 'body',
            btn: '.j_add_cart',
            buyNow: '.j_buy_btn',
            closeBtn: '.j_close_btn',
            transformSpeed: '.6s'
        }, opts);
        _this.init();
    };
    BuyPlug.prototype = {
        init: function () {
            Fastclick.attach(document.body);
            this.handelFn();
        },
        handelFn: function () {
            var _this = this,
                _config = _this.config,
                _wraper = $('.j_buy_plug'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
            _config.data.lang = Lang;
            $(_config.wraper).on('click', _config.btn, function () {
                if ($(this).is('.disable-btn')) {
                    return false;
                }
                if ($('.j_plug_submit').length) { //用于立即购买自动跳转判断
                    $('.j_plug_submit').attr('data-buynow', 'false');
                }
                _this.createHtm(_config.data).toShow();
            });
            $(_config.wraper).on('click', _config.buyNow, function () {
                if ($(this).is('.disable-btn')) {
                    return false;
                }
                if ($('.j_plug_submit').length) {
                    $('.j_plug_submit').attr('data-buynow', 'true');
                }
                _config.data.buyNow = true;
                _this.createHtm(_config.data).toShow();
            });
            $(_config.wraper).on('click', _config.closeBtn, function () {
                _this.toHide(document.querySelector('.j_buy_plug'), _w_h);
            });
            $(_config.wraper).on('click', '.j_buy_plug_cover', function () {
                _this.toHide(document.querySelector('.j_buy_plug'), _w_h);
            });
            $(_config.wraper).on('click', '.j_type_li', function () {
                var _that = $(this);
                if (_that.is('.disable')) {
                    return false;
                }
                PaqPush && PaqPush('选择商品类型', 'skuId=' + _that.attr('data-id'));
                $('.j_all_stock').remove();
                if (!_that.is('.act')) {
                    $(_config.wraper).find('.act').removeClass('act');
                    _that.addClass('act');
                    if ($('.j_type_title').length) {
                        $('.j_type_title').html(_that.html());
                    } else {
                        $('.j_buy_info').prepend('<p class="j_type_title">' + _that.html() + '</p>');
                    }
                    if (_that.attr('data-price') > 0) {
                        $('.j_buy_info_price').html('Rp ' + Base.others.priceFormat(_that.attr('data-price')));
                    } else {
                        $('.j_buy_info_price').html('');
                    }
                    if (_that.attr('data-stock') < 9999999) {
                        $('.j_buy_info_title').html(Lang.H5_STOCK + ': ' + _that.attr('data-stock'));
                        $('.j_item_num').val(1);

                    } else {
                        $('.j_buy_info_title').html('');
                    }
                    $('.j_add_btn').attr('data-stock', _that.attr('data-stock'));
                }
                $('.j_plug_submit').removeClass('cancel-btn');
            });
            $(_config.wraper).on('click', '.j_add_btn', function () {
                var _item_num = $('.j_item_num'),
                    _num = Number(_item_num.val()),
                    _stock = $(this).attr('data-stock'),
                    _limitto = $(this).attr('data-limitto') || 0;
                if (_stock && _stock <= _num) {
                    return;
                }
                var _curDateTime = Base.others.getCurDateTime();
                var _bargain_start_time = Base.others.transDateStrToDateTime(init_data.item.bargain.start_time);
                var _bargain_end_time = Base.others.transDateStrToDateTime(init_data.item.bargain.end_time);
                if (_curDateTime > _bargain_end_time || _curDateTime < _bargain_start_time) {
                    // 砍价活动过期了
                } else {
                    // 是否限购 0为不限购
                    if (_limitto != 0) {
                        if (_num >= _limitto) {
                            Dialog.tip({
                                body_txt: Lang.BARGAIN_LIMIT
                            })
                            return;
                        }
                    }
                }
                _item_num.val(++_num);
            });
            $(_config.wraper).on('click', '.j_reduce_btn', function () {
                var _item_num = $('.j_item_num'),
                    _num = Number(_item_num.val());
                _item_num.val((--_num > 0) ? _num : 1);
            });
            $(_config.wraper).on('click', '.j_plug_submit', function () {
                var _item_num = $('.j_item_num'),
                    _num = Number(_item_num.val()),
                    _has_sku = $('.j_type li').length,
                    _type = $('.j_type .act'),
                    _stock = _type.length ? _type.attr('data-stock') : null,
                    _sku_price = _type.length ? _type.attr('data-price') : init_data.item.price,
                    _sku_id = _type.length ? _type.attr('data-id') : null,
                    _sku_title = _type.length ? _type.html() : null,
                    _is_buy_now = $(this).attr('data-buynow');
                if ($(this).is('.cancel-btn')) {
                    return;
                }
                PaqPush && PaqPush('确定加入购物车', 'skuId=' + _sku_id);
                if ($('.j_type_li').length && !$('.j_type .act').length) {
                    Dialog.tip({
                        body_txt: Lang.H5_PLEASE_CHOOSE_SKU
                    });
                    return false;
                }
                // 判断是否超过限购数量
                if (init_data.item.is_discount && init_data.item.discounting) {
                    if (init_data.item.discount.limit_count > 0) {
                        // bug:缺少此时对购物车的检查 获取购物车数据 同当前要添加的商品扔进去匹配 匹配到后 获取购买数量 同 限购数做比较
                        var _carts = Cart().getCarts();
                        if (_carts) {
                            try {
                                $.each(_carts, function (key, item) {
                                    //命中
                                    if (key == init_data.item.id) {
                                        //判断限购数量 和 获取购买数量
                                        var _wantBuyNum = parseInt(_num) + parseInt(item.num);
                                        if (_wantBuyNum > init_data.item.discount.limit_count) {
                                            throw new Error(Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT);
                                        }
                                    }
                                })
                            } catch (e) {
                                Dialog.tip({
                                    body_txt: e.message
                                });
                                return;
                            }
                        } else {
                            if (_num > init_data.item.discount.limit_count) {
                                Dialog.tip({
                                    body_txt: Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT
                                });
                                return false;
                            }
                        }
                    }
                }

                if (init_data.item.bargain) {
                    var _curDateTime = Base.others.getCurDateTime();
                    var _bargain_start_time = Base.others.transDateStrToDateTime(init_data.item.bargain.start_time);
                    var _bargain_end_time = Base.others.transDateStrToDateTime(init_data.item.bargain.end_time);
                    if (_curDateTime > _bargain_end_time || _curDateTime < _bargain_start_time) {
                        // 砍价活动过期了
                    } else {
                        if (init_data.item.bargain.limit_to > 0) {
                            var _carts = Cart().getCarts();
                            if (_carts) {
                                try {
                                    $.each(_carts, function (key, item) {
                                        //命中
                                        if (_has_sku) {
                                            // if (key == _sku_id) {
                                            var _wantBuyNum = ~~_num + ~~item.num;
                                            if (item.item.id == init_data.item.id) {
                                                if (_wantBuyNum > init_data.item.bargain.limit_to) {
                                                    throw new Error(Lang.BARGAIN_LIMIT);
                                                }
                                            }
                                            // }
                                        } else {
                                            if (key == init_data.item.id) {
                                                var _wantBuyNum = ~~_num + ~~item.num;
                                                if (_wantBuyNum > init_data.item.bargain.limit_to) {
                                                    throw new Error(Lang.BARGAIN_LIMIT);
                                                }
                                            }
                                        }

                                    })
                                } catch (e) {
                                    Dialog.tip({
                                        body_txt: e.message
                                    });
                                    return;
                                }
                            } else {
                                if (_num > init_data.item.bargain.limit_to) {
                                    Dialog.tip({
                                        body_txt: Lang.BARGAIN_LIMIT
                                    });
                                    return false;
                                }
                            }
                        }
                    }
                }


                if (!_has_sku) {
                    if (init_data.item.bargain) {
                        Cart(init_data).addItem({
                            item: init_data.item,
                            num: _num,
                            price: _sku_price,
                            bargain_price: init_data.item.bargain.price,
                            isbuynow: _is_buy_now,
                            noStockCallback: function () {
                                _this.config.noStockCallback && _this.config.noStockCallback();
                                _this.toHide(document.querySelector('.j_buy_plug'), _w_h);
                            },
                            callback: function () {
                                _this.addSuccessFn(_is_buy_now, _w_h);
                            }
                        });
                    } else {
                        Cart(init_data).addItem({
                            item: init_data.item,
                            num: _num,
                            price: _sku_price,
                            isbuynow: _is_buy_now,
                            noStockCallback: function () {
                                _this.config.noStockCallback && _this.config.noStockCallback();
                                _this.toHide(document.querySelector('.j_buy_plug'), _w_h);
                            },
                            callback: function () {
                                _this.addSuccessFn(_is_buy_now, _w_h);
                            }
                        });
                    }

                } else {
                    if (!_stock) {
                        Dialog.tip({
                            body_txt: Lang.H5_LOW_STOCK,
                            c_fn: function (dom) {
                                console.log(dom);
                            }
                        });
                    } else {
                        if (_num > _stock) {
                            Dialog.tip({
                                body_txt: Lang.H5_OVER_INVENTORY,
                                c_fn: function (dom) {
                                    console.log(dom);
                                }
                            });
                        } else {
                            if (init_data.item.bargain) {
                                var _skuMap = {};
                                $.each(init_data.item.sku, function (index, sku) {
                                    _skuMap[sku.id] = sku;
                                })
                                Cart(init_data).addItem({
                                    item: init_data.item,
                                    sku: {
                                        price: _sku_price,
                                        id: _sku_id,
                                        title: _sku_title,
                                        stock: _stock,
                                        bargain_price: _skuMap[_sku_id].bargain.price
                                    },
                                    price: _sku_price,
                                    isbuynow: _is_buy_now,
                                    noStockCallback: function () {
                                        _this.config.noStockCallback && _this.config.noStockCallback();
                                        _this.toHide(document.querySelector('.j_buy_plug'), _w_h);
                                    },
                                    num: _num,
                                    callback: function () {
                                        _this.addSuccessFn(_is_buy_now, _w_h);
                                    }
                                });
                            } else {
                                Cart(init_data).addItem({
                                    item: init_data.item,
                                    sku: {
                                        price: _sku_price,
                                        id: _sku_id,
                                        title: _sku_title,
                                        stock: _stock
                                    },
                                    price: _sku_price,
                                    isbuynow: _is_buy_now,
                                    noStockCallback: function () {
                                        _this.config.noStockCallback && _this.config.noStockCallback();
                                        _this.toHide(document.querySelector('.j_buy_plug'), _w_h);
                                    },
                                    num: _num,
                                    callback: function () {
                                        _this.addSuccessFn(_is_buy_now, _w_h);
                                    }
                                });
                            }

                        }
                    }
                }
            });
        },
        addSuccessFn: function (is_buy_now, wh) {
            var _this = this;
            if (is_buy_now == 'true') {
                Common.saveCartFromUrl(function () {
                    location.href = Config.host.hrefUrl + 'cart.php';
                });
            } else {
                _this.resetNum.apply(this);
                _this.toHide(document.querySelector('.j_buy_plug'), wh);
            }
        },
        resetNum: function () {
            var _this = this;
            if ($('.j_cart_wraper span').length) {
                $('.j_cart_wraper span').html(Cart().getCartNum());
            } else {
                $('.j_cart_wraper').prepend('<span class="cart-num">' + Cart().getCartNum() + '</span>');
            }
        },
        createHtm: function (info) {
            if ($('.j_buy_plug').length) return this;
            var PlugHtm = Hbs.compile(Buyplughtm)(info);
            $('body').prepend(PlugHtm);
            return this;
        },
        toShow: function () {
            var _this = this,
                _wraper = $('.j_buy_plug'),
                _cover = $('.j_buy_plug_cover'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
            _this.wraper = _wraper;
            _this.cover = _cover;
            _cover.css({
                zIndex: Base.others.zIndex
            }).show();
            var _plug_buy = document.querySelector('.j_buy_plug');
            _plug_buy.style.zIndex = ++Base.others.zIndex;
            _plug_buy.style.webkitTransform = "translate(0," + _w_h + "px)";
            setTimeout(function () {
                _this.animate(_plug_buy, (_w_h - _b_h));
                _plug_buy = null;
                _wraper = null;
                _cover = null;
            }, 1);
        },
        animate: function (plug_buy, height, bottom) {
            var _this = this;
            plug_buy.style.webkitTransitionDuration = _this.config.transformSpeed;
            plug_buy.style.webkitTransform = "translate(0, " + height + "px)";
            //plug_buy.style.bottom = (bottom?-height:0)+'px';
            plug_buy.style.bottom = (bottom ? 0 : height) + 'px';
        },
        toHide: function (plug_buy, height) {
            var _this = this;
            _this.animate(plug_buy, height, 'true');
            _this.cover && _this.cover.hide();
        },
        resetInfo: function () {
            var _this = this;
            _this.wraper.find().val(1);
        }
    };
    return function (opts) {
        return new BuyPlug(opts);
    }
})