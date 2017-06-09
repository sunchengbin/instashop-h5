/**
 * Created by sunchengbin on 16/6/2.
 * 物流插件
 */
define(['common','base','hbs','text!views/moudle/logistics.hbs','btn','lang','fastclick'],function(Common,Base,Hbs,Logistics,Btn,Lang,Fastclick){
    var LogisticsPlug = function(opts){
        var _this = this;
        _this.config = $.extend({
            wraper : 'body',
            btn : '.j_sel_logistics',
            closeBtn : '.j_close_btn',
            transformSpeed:'.6s'
        },opts);
        _this.init();
    };
    LogisticsPlug.prototype = {
        init : function(){
            Fastclick.attach(document.body);
            this.handelFn();
        },
        handelFn : function(){
            var _this = this,
                _config = _this.config,
                _wraper = $('.j_logistics_plug'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
            $(_config.wraper).on('click',_config.btn,function(){
                _this.createHtm({
                    data : _config.data,
                    lang : Lang
                }).toShow();
            });
            $(_config.wraper).on('click','.j_logistics_li',function(){
                if($(this).find('.check-btn').length){
                    $('.checked-btn').addClass('check-btn').removeClass('checked-btn');
                    $(this).find('.check-btn').addClass('checked-btn');
                    $('.icon-radioed-font').addClass('icon-radio-font').removeClass('icon-radioed-font');
                    $(this).find('.check-btn').addClass('icon-radioed-font').removeClass('icon-radio-font');
                }
            });
            $(_config.wraper).on('click','.j_plug_submit',function(){
                var _check = $('.checked-btn'),
                    _len = $('.checked-btn').length,
                    _level = _check.attr('data-level'),
                    _company = _check.attr('data-company'),
                    _price = Number(_check.attr('data-price')),
                    _tax = Number(_check.attr('data-tax'));
                if(_len){
                    $('.j_logistics_info').html(_company+' '+_level).attr({
                        'data-id' : _check.attr('data-id'),
                        'data-company' : _check.attr('data-company'),
                        'data-price' : Number(_check.attr('data-price'))
                    });
                    _this.toHide(document.querySelector('.j_logistics_plug'),_w_h);
                    //添加对优惠券存在时的处理 -lanchenghao@weidian.com
                    var _favorablePrice = $(".j_favorable_price").attr('data-price')||0;
                    var _sum = Number(_config.sum)+_price+_tax-Number(_favorablePrice);
                    $('.j_post').attr("data-price",_check.attr('data-price'));
                    $('.j_post').html('Rp '+Base.others.priceFormat(_price));
                    if(_tax){
                        var _post_parent = $('.j_post').parent('p');
                        $('<p class="clearfix"><span class="fr j_post">Rp '+Base.others.priceFormat(_tax)+'</span>Pajak: </p>').insertAfter(_post_parent);
                    }
                    $('.j_sum').html('Rp '+Base.others.priceFormat(_sum));
                }
            });
            $(_config.wraper).on('click',_config.closeBtn,function(){
                _this.toHide(document.querySelector('.j_logistics_plug'),_w_h);
            });
            $(_config.wraper).on('click','.j_logistics_plug_cover',function(){
                _this.toHide(document.querySelector('.j_logistics_plug'),_w_h);
            });

        },
        createHtm : function(info){
            if($('.j_logistics_plug').length){
                this.resetSelectLogistics();
                return this;
            }
            info.lang = Lang;
            var PlugHtm= Hbs.compile(Logistics)(info);
            $('body').prepend(PlugHtm);
            return this;
        },
        resetSelectLogistics : function(){
            var _data_id = $('.j_logistics_info').attr('data-id'),
                _checked_dom = $('.j_logistics_li[data-id="'+_data_id+'"]');
            $('.checked-btn').addClass('check-btn').removeClass('checked-btn');
            $('.icon-radioed-font').addClass('icon-radio-font').removeClass('icon-radioed-font');
            _checked_dom.find('.check-btn').addClass('checked-btn');
            _checked_dom.find('.check-btn').addClass('icon-radioed-font').removeClass('icon-radio-font');

        },
        toShow : function(){
            var _this = this,
                _wraper = $('.j_logistics_plug'),
                _cover = $('.j_logistics_plug_cover'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
            _this.wraper = _wraper;
            _this.cover = _cover;
            _cover.css({zIndex:Base.others.zIndex}).show();
            var _plug_buy = document.querySelector('.j_logistics_plug');
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
            _this.animate(plug_buy,height,true);
            _this.cover.hide();
        }
    };
    return function(opts){
        return new LogisticsPlug(opts);
    }
})