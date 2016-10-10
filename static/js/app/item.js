/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang','lazyload','hbs','text!views/app/item.hbs','ajax','config','base','common','buyplug','slide','cart','fastclick','contact'],function(Lang,Lazyload,Hbs,Item,Ajax,Config,Base,Common,Buyplug,Slide,Cart,Fastclick,Contact){
    var ITEM = {
        init : function(){
            var _this = this;
            var ItemHtm = '<div>'+Lang.H5_LOADING+'</div>';
            if(init_data && init_data.code == 200){
                ItemHtm= Hbs.compile(Item)({
                    data : init_data,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    host:Config.host.host,
                    imgUrl:Config.host.imgUrl,
                    shopUrl:Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/'+init_data.item.shop.id,
                    num : Cart(init_data).getCartNum(),
                    timeLang : _this.discountTime(init_data.item.discount.now_time,init_data.item.discount.end_time)
                });
            }else{
                if(init_data.code == 420402){
                    ItemHtm ='<div class="no-exists"><img src="'+Config.host.imgUrl+'/app/404.png"/><p>Produk tidak ditemukan!</p></div>';
                }else{
                    ItemHtm = '<div>'+Lang.H5_ERROR+'</div>';
                }

            }
            $('.j_php_loding').remove();
            $('body').prepend(ItemHtm);
            if(init_data && init_data.code == 200) {
                Lazyload();
                Slide.createNew({
                    dom: document.querySelector('.j_banner'),
                    needTab: true,
                    auto : false
                });
                Buyplug({
                    data: init_data
                });
                this.getImNum();
                this.handleFn();
            }

        },
        getImNum : function(){
            var im_id = localStorage.getItem('UID'),//im页面种如cookie
                toImId = init_data.item.shop['im_id'];
            if (im_id && toImId) {
                var reqData = {
                    edata: {
                        action: 'unreadnum',
                        uid: toImId,
                        uid2: im_id
                    }
                };
                Ajax.getJsonp(Config.host.actionUrl+Config.actions.imNum + '?param=' + JSON.stringify(reqData), function(data){
                    //alert(data.count);
                    if (data && data.count > 0) {
                        $('.j_im_num').show();
                    } else {
                        $('.j_im_num').hide();
                    }
                });
            }
        },
        discountTime : function(nowTime,endTime){
            var _nt = this.datetime_to_unix(nowTime),
                _et = this.datetime_to_unix(endTime),
                _send = (_et - _nt + 3600000)/1000,
                _hour = ''+(_send - _send % 3600)/3600,
                _second = ''+(_send - _hour*3600)%60,
                _minute = ''+(_send - _hour*3600 - _second)/60;
            if(_send < 0){
                return {
                    time : '00.00.00',
                    second : _send
                };
            }
            return {
                time : ((_hour.length<2?'0'+_hour:_hour)+'.'+(_minute.length<2?'0'+_minute:_minute)+'.'+(_second.length<2?'0'+_second:_second)),
                second : _send
            };
        },
        datetime_to_unix :function(datetime){
            var tmp_datetime = datetime.replace(/:/g,'-');
            tmp_datetime = tmp_datetime.replace(/ /g,'-');
            var arr = tmp_datetime.split("-");
            var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
            return parseInt(now.getTime());
        },

        countTime : function(_send){
            var _hour = ''+(_send - _send % 3600)/3600,
                _second = ''+(_send - _hour*3600)%60,
                _minute = ''+(_send - _hour*3600 - _second)/60;
            if(_send < 0){
                return '00:00:00';
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
            if($('.txt-hide').height() > 33){
                $('.down-btn').show();
            }
            Fastclick.attach(document.body);
            $('body').on('click','.j_down_box',function(){
                if($('.j_down_btn').is('.down-btn')){
                    $('.j_down_btn').removeClass('down-btn').addClass('up-btn');
                    $('.txt').css({'maxHeight':'none'});
                }else{
                    $('.j_down_btn').removeClass('up-btn').addClass('down-btn');
                    $('.txt').css({'maxHeight':'44px'});
                }
            });
            $('body').on('click','.j_shop_info',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            //item=back是为了让返回首页的时候滚动到指定的scrolltop高度
            $('body').on('click','.j_go_back',function(){
                var _local_url = localStorage.getItem('FromUrl'),
                    _host_name = location.hostname,
                    _ios = Base.others.verifyBower().ios;
                if(_local_url && !/detail/g.test(_local_url)){
                    if(_ios){//ios手机回退
                        if(/\/s\//g.test(_local_url)){
                            console.log(1)
                            history.back();
                        }else{
                            if(/\?/g.test(_local_url)){
                                console.log(2)
                                location.href = localStorage.getItem('FromUrl')+'&item=back';
                            }else{
                                console.log(/\.instashop\.co\.id\/\d+/g.test(_local_url))
                                if(/\.instashop\.co\.id\/\d+/g.test(_local_url)){
                                    var _url = Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/'+init_data.item.shop.id+'?item=back';
                                    location.href = _url;
                                }else{
                                    console.log(3)
                                    location.href = localStorage.getItem('FromUrl')+'?item=back';
                                }
                            }
                        }
                    }else{
                        //if(/\/s\//g.test(_local_url)){
                        //    console.log(1)
                        //    history.back();
                        //}else{
                        //    if(/\?/g.test(_local_url)){
                        //        console.log(2)
                        //        location.href = localStorage.getItem('FromUrl')+'&item=back';
                        //    }else{
                        //        console.log(/\.instashop\.co\.id\/\d+/g.test(_local_url))
                        //        if(/\.instashop\.co\.id\/\d+/g.test(_local_url)){
                        //            var _url = Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/'+init_data.item.shop.id+'?item=back';
                        //            location.href = _url;
                        //        }else{
                        //            console.log(3)
                        //            location.href = localStorage.getItem('FromUrl')+'?item=back';
                        //        }
                        //    }
                        //}
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
