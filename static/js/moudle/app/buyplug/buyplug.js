/**
 * Created by sunchengbin on 16/6/2.
 * 添加到购物车插件
 */
define(['common','base','hbs','text!views/moudle/buyplug.hbs','btn','dialog','cart','lang'],function(Common,Base,Hbs,Buyplughtm,Btn,Dialog,Cart,Lang){
    var BuyPlug = function(opts){
        var _this = this;
        _this.config = $.extend({
            wraper : 'body',
            btn : '.j_add_cart',
            buyNow:'.j_buy_btn',
            closeBtn : '.j_close_btn',
            transformSpeed:'.6s'
        },opts);
        _this.init();
    };
    BuyPlug.prototype = {
        init : function(){
            this.handelFn();
        },
        handelFn : function(){
            var _this = this,
                _config = _this.config,
                _wraper = $('.j_buy_plug'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
            _config.data.lang = Lang;
            $(_config.wraper).on('tap',_config.btn,function(){
                _this.createHtm(_config.data).toShow();
            });
            $(_config.wraper).on('tap',_config.buyNow,function(){
                if(_config.data.item.sku.length){
                    _this.createHtm(_config.data).toShow();
                }else{
                    Cart(_config.data).addItem({
                        item : _config.data.item,
                        num : 1,
                        price:_config.data.item.price,
                        callback : function(){
                            _this.resetNum.apply(this);
                        }
                    });
                }
            });
            $(_config.wraper).on('tap',_config.closeBtn,function(){
                _this.toHide(document.querySelector('.j_buy_plug'),_w_h);
            });
            $(_config.wraper).on('tap','.j_buy_plug_cover',function(){
                _this.toHide(document.querySelector('.j_buy_plug'),_w_h);
            });
            $(_config.wraper).on('tap','.j_type_li',function(){
                var _that = $(this);
                if(!_that.is('.act')){
                    $(_config.wraper).find('.act').removeClass('act');
                    _that.addClass('act');
                    if($('.j_type_title').length){
                        $('.j_type_title').html(_that.html());
                    }else{
                        $('.j_buy_info').prepend('<p class="j_type_title">'+_that.html()+'</p>');
                    }
                    $('.j_buy_info_price').html('Rp '+Base.others.priceFormat(_that.attr('data-price')));
                    $('.j_buy_info_title').html(Lang.H5_STOCK+':'+_that.attr('data-stock'));
                }
            });
            $(_config.wraper).on('tap','.j_add_btn',function(){
                var _item_num = $('.j_item_num'),
                    _num = Number(_item_num.val());
                    _item_num.val(++_num);
            });
            $(_config.wraper).on('tap','.j_reduce_btn',function(){
                var _item_num = $('.j_item_num'),
                    _num = Number(_item_num.val());
                _item_num.val((--_num > 0)?_num:1);
            });
            $(_config.wraper).on('tap','.j_plug_submit',function(){
                var _item_num = $('.j_item_num'),
                    _num = Number(_item_num.val()),
                    _has_sku = $('.j_type li').length,
                    _type = $('.j_type .act'),
                    _stock = _type.length?_type.attr('data-stock'):null,
                    _sku_price = _type.length?_type.attr('data-price'):init_data.item.price,
                    _sku_id = _type.length?_type.attr('data-id'):null,
                    _sku_title = _type.length?_type.html():null;
                if(!_has_sku){
                    Cart(init_data).addItem({
                        item : init_data.item,
                        num : _num,
                        price:_sku_price,
                        callback : function(){
                            _this.resetNum.apply(this);
                            _this.toHide(document.querySelector('.j_buy_plug'),_w_h);
                        }
                    });
                }else{
                    if(!_stock){
                        Dialog.tip({
                            body_txt : Lang.H5_LOW_STOCK,
                            c_fn : function(dom){
                                console.log(dom);
                            }
                        });
                    }else{
                        if(_num > _stock){
                            Dialog.tip({
                                body_txt : Lang.H5_OVER_INVENTORY,
                                c_fn : function(dom){
                                    console.log(dom);
                                }
                            });
                        }else{
                            Cart(init_data).addItem({
                                item : init_data.item,
                                sku : {
                                    price : _sku_price,
                                    id : _sku_id,
                                    title : _sku_title,
                                    stock : _stock
                                },
                                price:_sku_price,
                                num : _num,
                                callback : function(){
                                    _this.resetNum.apply(this);
                                    _this.toHide(document.querySelector('.j_buy_plug'),_w_h);
                                }
                            });
                        }
                    }
                }
            });
        },
        resetNum : function(){
            var _this = this;
            if($('.j_cart_wraper span').length){
                $('.j_cart_wraper span').html(_this.getCartNum());
            }else{
                $('.j_cart_wraper').prepend('<span class="cart-num">'+_this.getCartNum()+'</span>');
            }
        },
        createHtm : function(info){
            if($('.j_buy_plug').length)return this;
            var PlugHtm= Hbs.compile(Buyplughtm)(info);
            $('body').prepend(PlugHtm);
            return this;
        },
        toShow : function(){
            var _this = this,
                _wraper = $('.j_buy_plug'),
                _cover = $('.j_buy_plug_cover'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
            _this.wraper = _wraper;
            _this.cover = _cover;
            _cover.css({zIndex:Base.others.zIndex}).show();
            var _plug_buy = document.querySelector('.j_buy_plug');
            _plug_buy.style.webkitTransform = "translate3d(0, " + _w_h + "px,0)";
            _wraper.css({zIndex:++Base.others.zIndex});
            setTimeout(function(){
                _this.animate(_plug_buy,(_w_h-_b_h));
                _plug_buy = null;
                _wraper = null;
                _cover = null;
            },1);
        },
        animate : function(plug_buy,height){
            var _this = this;
            plug_buy.style.webkitTransitionDuration = _this.config.transformSpeed;
            plug_buy.style.webkitTransform = "translate3d(0, " + height + "px,0)";
        },
        toHide : function(plug_buy,height){
            var _this = this;
            _this.animate(plug_buy,height);
            _this.cover.hide();
        },
        resetInfo : function(){
            var _this = this;
            _this.wraper.find().val(1);
        }
    };
    return function(opts){
        return new BuyPlug(opts);
    }
})