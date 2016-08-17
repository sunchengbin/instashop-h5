/**
 * Created by sunchengbin on 16/8/16.
 * 快速添加到
 */
define(['common','base','hbs','text!views/moudle/buyplug.hbs','btn','dialog','lang','config','fastclick'],function(Common,Base,Hbs,Buyplughtm,Btn,Dialog,Lang,Config,Fastclick){
    var QuickBuyPlug = function(opts){
        var _this = this;
        _this.config = $.extend({
            wraper : '.j_buy_plug',
            btn : '.j_add_cart',
            buyNow:'.j_buy_btn',
            closeBtn : '.j_close_btn',
            transformSpeed:'.6s'
        },opts);
        _this.init();
    };
    QuickBuyPlug.prototype = {
        init : function(){
            Fastclick.attach(document.body);
            var _this = this,
                _config = _this.config;
            _config.data.lang = Lang;
            _this.createHtm(_config.data).toHide(document.querySelector('.j_buy_plug'),$(window).height());
            this.handelFn();
        },
        handelFn : function(){
            var _this = this,
                _config = _this.config,
                _wraper = $('.j_buy_plug'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
            $(_config.wraper).on('click',_config.closeBtn,function(){
                _this.toHide(document.querySelector('.j_buy_plug'),_w_h);
            });
            $(_config.wraper).on('click','.j_buy_plug_cover',function(){
                _this.toHide(document.querySelector('.j_buy_plug'),_w_h);
            });
            $(_config.wraper).on('click','.j_type_li',function(){
                var _that = $(this);
                if(_that.is('.disable')){
                    return false;
                }
                $('.j_all_stock').remove();
                if(!_that.is('.act')){
                    $(_config.wraper).find('.act').removeClass('act');
                    _that.addClass('act');
                    if($('.j_type_title').length){
                        $('.j_type_title').html(_that.html());
                    }else{
                        $('.j_buy_info').prepend('<p class="j_type_title">'+_that.html()+'</p>');
                    }
                    if(_that.attr('data-price') > 0){
                        $('.j_buy_info_price').html('Rp '+Base.others.priceFormat(_that.attr('data-price')));
                    }else{
                        $('.j_buy_info_price').html('');
                    }
                    if(_that.attr('data-stock') < 9999999){
                        $('.j_buy_info_title').html(Lang.H5_STOCK+':'+_that.attr('data-stock'));
                        $('.j_buy_plug .j_item_num').val(1);

                    }else{
                        $('.j_buy_info_title').html('');
                    }
                    $('.j_add_btn').attr('data-stock',_that.attr('data-stock'));
                }
                $('.j_plug_submit').removeClass('cancel-btn');
            });
            $(_config.wraper).on('click','.j_add_btn',function(){
                var _item_num = $('.j_buy_plug .j_item_num'),
                    _num = Number(_item_num.val()),
                    _stock = $(this).attr('data-stock');
                if(_stock && _stock <= _num){
                    return;
                }
                _item_num.val(++_num);
            });
            $(_config.wraper).on('click','.j_reduce_btn',function(){
                var _item_num = $('.j_buy_plug .j_item_num'),
                    _num = Number(_item_num.val());
                _item_num.val((--_num > 0)?_num:1);
            });
            $(_config.wraper).on('click','.j_plug_submit',function(){
                var _item_num = $('.j_buy_plug .j_item_num'),
                    _item = _this.config.data.item,
                    _num = Number(_item_num.val()),
                    _has_sku = $('.j_type li').length,
                    _type = $('.j_type .act'),
                    _stock = _type.length?_type.attr('data-stock'):null,
                    _sku_price = _type.length?_type.attr('data-price'):_item.price,
                    _sku_id = _type.length?_type.attr('data-id'):null,
                    _sku_title = _type.length?_type.html():null,
                    _is_buy_now = $(this).attr('data-buynow');
                if($(this).is('.cancel-btn')){
                    return;
                }
                if($('.j_type_li').length && !$('.j_type .act').length){
                    Dialog.tip({
                        body_txt : Lang.H5_PLEASE_CHOOSE_SKU
                    });
                    return false;
                }
                if(_item.is_discount && _item.discounting){
                    if(_item.discount.limit_count > 0){
                        if(_num > _item.discount.limit_count){
                            Dialog.tip({
                                body_txt : Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT
                            });
                            return false;
                        }
                    }
                }
                if(!_has_sku){
                    //正常操作
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
                            //正常操作
                            _config.callback && _config.callback({
                                id : _item.id,
                                sku : _sku_title,
                                stock : _stock,
                                price : _sku_price,
                                num : _num,
                                sku_id: _sku_id
                            });
                            _this.toHide(document.querySelector('.j_buy_plug'),_w_h);
                        }
                    }
                }
            });
        },
        addSuccessFn:function(is_buy_now,wh){
            var _this = this;
            _this.resetNum.apply(this);
            _this.toHide(document.querySelector('.j_buy_plug'),wh);
        },
        createHtm : function(info){
            if($('.j_buy_plug').length)return this;
            var PlugHtm= Hbs.compile(Buyplughtm)(info);
            $('body').prepend(PlugHtm);
            this.cover = $('.j_buy_plug_cover');
            this.wraper = $('.j_buy_plug');
            return this;
        },
        toShow : function(){
            var _this = this,
                _wraper = $('.j_buy_plug'),
                _cover = $('.j_buy_plug_cover'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
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
        animate : function(plug_buy,height,bottom){
            var _this = this;
            plug_buy.style.webkitTransitionDuration = _this.config.transformSpeed;
            plug_buy.style.webkitTransform = "translate3d(0, " + height + "px,0)";
            plug_buy.style.bottom = (bottom?0:height)+'px';
        },
        toHide : function(plug_buy,height){
            var _this = this;
            _this.animate(plug_buy,height,'true');
            _this.cover.hide();
            _this.resetInfo();
        },
        resetInfo : function(){
            //$('.j_buy_plug .j_item_num').val(1);
        }
    };
    return function(opts){
        return new QuickBuyPlug(opts);
    };
})