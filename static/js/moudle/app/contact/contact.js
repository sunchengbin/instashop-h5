/**
 * Created by sunchengbin on 16/8/30.
 * 联系卖家插件
 */
define(['common','base','btn','lang','fastclick'],function(Common,Base,Btn,Lang,Fastclick){
    var LogisticsPlug = function(opts){
        var _this = this;
        _this.config = $.extend({
            wraper : 'body',
            btn : '.j_sel_logistics',
            closeBtn : '.j_close_logistics_btn',
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
                    _company = _check.attr('data-company');
                if(_len){
                    $('.j_logistics_info').html(_company+' '+_level).attr({
                        'data-id' : _check.attr('data-id'),
                        'data-company' : _check.attr('data-company'),
                        'data-price' : Number(_check.attr('data-price'))
                    });
                    _this.toHide(document.querySelector('.j_logistics_plug'),_w_h);
                    var _sum = Number(_config.sum)+Number(_check.attr('data-price'));
                    $('.j_post').html('Rp '+Base.others.priceFormat(_check.attr('data-price')));
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
            if($('.j_logistics_plug').length)return this;
            //info.lang = Lang;
            //var PlugHtm= Hbs.compile(Contact)(info);
            var PlugHtm= this.createPlugHtm(info.data);
            $('body').prepend(PlugHtm);
            return this;
        },
        createPlugHtm : function(data){
            var _htm = '';
            _htm += '<section class="logistics-plug j_logistics_plug">'
            +'<div class="logistics-plug-top clearfix">'
            +'<i class="icon iconfont j_close_logistics_btn fr icon-cancel-font"></i>'
            +'<p class="title"></p>'
            +'</div>'
            +'<div class="logistics-plug-info" data-spider="contact-box">'
            +'<ul class="logistics-list">';
            if(data.line){
                _htm += '<li class="j_logistics_li b-bottom">'
                +'<a href="javascript:;" spm-auto="联系卖家line" spm-click="go-line" class="j_goto_line">'+Lang.H5_LINE_CONTACT_ME+'</a>'
                +'</li>';
            }
            if(data.tel){
                _htm +='<li class="j_logistics_li b-bottom">'
                    +'<a spm-auto="给卖家打电话" spm-click="go-tel" href="tel:'+data.tel+'">'+Lang.H5_CALL_TELEPHONE+'</a>'
                    +'</li>'
                    +'<li class="j_logistics_li">'
                    +'<a spm-auto="给卖家发短信" spm-click="go-sms" href="sms:'+data.tel+'">'+Lang.H5_SEND_SMS+'</a>'
                    +'</li>';
            }
            _htm += '</ul>'
                +'</div>'
                +'</section>'
                +'<section class="logistics_plug_cover j_logistics_plug_cover"></section>';
            return _htm
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
            _this.cover && _this.cover.hide();
        }
    };
    return function(opts){
        return new LogisticsPlug(opts);
    }
})
