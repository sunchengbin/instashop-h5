/**
 * Created by sunchengbin on 16/6/2.
 * 物流插件
 */
define(['common','base','hbs','text!views/moudle/logistics.hbs','btn'],function(Common,Base,Hbs,Logistics,Btn){
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
            this.handelFn();
        },
        handelFn : function(){
            var _this = this,
                _config = _this.config,
                _wraper = $('.j_logistics_plug'),
                _w_h = $(window).height(),
                _b_h = _wraper.height();
            $(_config.wraper).on('tap',_config.btn,function(){
                _this.createHtm(_config.data).toShow();
            });
            $(_config.wraper).on('tap','.j_logistics_li',function(){
                if($(this).find('.check-btn').length){
                    $('.checked-btn').addClass('check-btn').removeClass('checked-btn');
                    $(this).find('.check-btn').addClass('checked-btn');
                }
            });
            $(_config.wraper).on('tap','.j_plug_submit',function(){
                var _check = $('.checked-btn'),
                    _len = $('.checked-btn').length,
                    _level = _check.attr('data-level');
                if(_len){
                    $('.j_logistics_info').html(_level).attr({
                        'data-id' : _check.attr('data-id'),
                        'data-company' : _check.attr('data-company')
                    });
                    _this.toHide(document.querySelector('.j_logistics_plug'),_w_h);
                    var _sum = Number(_config.sum)+Number(_check.attr('data-price'));
                    $('.j_post').html('Rp : '+_check.attr('data-price'));
                    $('.j_sum').html('Rp : '+_sum);
                }
            });
            $(_config.wraper).on('tap',_config.closeBtn,function(){
                _this.toHide(document.querySelector('.j_logistics_plug'),_w_h);
            });
            $(_config.wraper).on('tap','.j_logistics_plug_cover',function(){
                _this.toHide(document.querySelector('.j_logistics_plug'),_w_h);
            });

        },
        createHtm : function(info){
            if($('.j_logistics_plug').length)return this;
            var PlugHtm= Hbs.compile(Logistics)(info);
            $('body').prepend(PlugHtm);
            return this;
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
        animate : function(plug_buy,height){
            var _this = this;
            plug_buy.style.webkitTransitionDuration = _this.config.transformSpeed;
            plug_buy.style.webkitTransform = "translate3d(0, " + height + "px,0)";
        },
        toHide : function(plug_buy,height){
            var _this = this;
            _this.animate(plug_buy,height);
            _this.cover.hide();
        }
    };
    return function(opts){
        return new LogisticsPlug(opts);
    }
})