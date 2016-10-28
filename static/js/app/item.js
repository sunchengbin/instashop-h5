/**
 * Created by sunchengbin on 16/10/20.
 */
/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang','lazyload','hbs','text!views/app/item.hbs','ajax','config','base','common','buyplug','slide','cart','fastclick','contact','viewer'],function(Lang,Lazyload,Hbs,Item,Ajax,Config,Base,Common,Buyplug,Slide,Cart,Fastclick,Contact,Viewer){
    var ITEM = {
        init : function(){
            var _this = this,
                _cart_num = Cart().getCartNum();
            if(init_data && init_data.code == 200){
                if(_cart_num > 0){
                    $('.j_cart_wraper').append('<span class="cart-num">'+_cart_num+'</span>');
                }
                Lazyload();
                Slide.createNew({
                    dom: document.querySelector('.j_banner'),
                    needTab: true,
                    auto : false
                });
                Buyplug({
                    data: init_data
                });
                Viewer({
                    btn : '.j_banner li',
                    images : init_data.item.imgs
                }).init();
                _this.handleFn();
            }
        },
        countTime : function(_send){
            var _hour = ''+(_send - _send % 3600)/3600,
                _second = ''+(_send - _hour*3600)%60,
                _minute = ''+(_send - _hour*3600 - _second)/60;
            if(_send < 0){
                return '00.00.00';
            }
            return ((_hour.length<2?'0'+_hour:_hour)+':'+(_minute.length<2?'0'+_minute:_minute)+':'+(_second.length<2?'0'+_second:_second));
        },
        changeTime : function(){
            var _second = $('[data-time]').attr('data-time'),
                _this = this;
            setInterval(function(){
                --_second;
                $('[data-time]').attr('data-time',_second).html(_this.countTime(_second));
            },1000);
        },
        handleFn : function(){
            if($('[data-time]').length){
                this.changeTime();
            }
            if($('.txt-hide').height() > 44){
                $('.down-btn').show();
                $('body').on('click','.j_down_box',function(){
                    if($('.j_down_btn').is('.down-btn')){
                        $('.j_down_btn').removeClass('down-btn').addClass('up-btn');
                        $('.txt').css({'maxHeight':'none'});
                    }else{
                        $('.j_down_btn').removeClass('up-btn').addClass('down-btn');
                        $('.txt').css({'maxHeight':'44px'});
                    }
                });
            }
            Fastclick.attach(document.body);
            $('body').on('click','.j_shop_info',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            //item=back是为了让返回首页的时候滚动到指定的scrolltop高度
            $('body').on('click','.j_go_back',function(){
                var _local_url = localStorage.getItem('FromUrl');
                if(_local_url && !/detail/g.test(_local_url)){
                    if(/\.instashop\.co\.id\/\d+/g.test(_local_url)){//我们自己的域名下
                        if(/\/s\//g.test(_local_url)){
                            history.back();
                        }else{
                            if(/\?/g.test(_local_url)){
                                location.href = localStorage.getItem('FromUrl')+'&item=back';
                            }else{
                                var _url = Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/'+init_data.item.shop.id+'?item=back';
                                location.href = _url;
                            }
                        }
                    }else{//独立域名
                        var _host_name = location.hostname;
                        if(/\/\d+/g.test(_local_url)){//是当前详情页
                            if(/\/k\/\d+/g.test(_local_url)){
                                if(/\?/g.test(_local_url)){
                                    location.href = _local_url+'&item=back';
                                }else{
                                    location.href = _local_url+'?item=back';
                                }
                            }else{
                                location.href = location.protocol+'//'+_host_name+'?item=back';
                            }
                        }else{
                            if(/\?/g.test(_local_url)){
                                location.href = localStorage.getItem('FromUrl')+'&item=back';
                            }else{
                                location.href = location.protocol+'//'+_host_name+'?item=back';
                            }
                        }
                    }
                }else{
                    Common.saveFromUrl(function(){
                        var _url = Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/'+init_data.item.shop.id+'?item=back';
                        location.href = _url;
                    });
                }
            });
            $('body').on('click','.j_cart_wraper',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            var _this = this;
            if($('.j_show_contact').length){
                _this.contact = Contact({
                    data : {
                        tel : init_data.item.shop.phone,
                        line : init_data.item.shop.line_url
                    },
                    lang:Lang
                });
                $('body').on('click','.j_show_contact',function(){
                    _this.contact.createHtm({
                        data : {
                            tel : init_data.item.shop.phone,
                            line : init_data.item.shop.line_url
                        },
                        lang:Lang
                    }).toShow();
                });
            }
        }
    };
    ITEM.init();
})
