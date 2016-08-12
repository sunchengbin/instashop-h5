/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang','lazyload','hbs','text!views/app/item.hbs','ajax','config','base','common','buyplug','slide','cart','fastclick'],function(Lang,Lazyload,Hbs,Item,Ajax,Config,Base,Common,Buyplug,Slide,Cart,Fastclick){
    var ITEM = {
        init : function(){
            var _this = this;
            var ItemHtm = '<div>'+Lang.H5_LOADING+'</div>';
            if(init_data){
                ItemHtm= Hbs.compile(Item)({
                    data : init_data,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    host:Config.host.host,
                    num : Cart(init_data).getCartNum(),
                    timeLang : _this.discountTime(init_data.item.discount.now_time,init_data.item.discount.end_time)
                });
            }else{
                ItemHtm = '<div>'+Lang.H5_ERROR+'</div>';
            }
            $('body').prepend(ItemHtm);
            Lazyload();
            if(init_data) {
                Slide.createNew({
                    dom: document.querySelector('.j_banner'),
                    needTab: true,
                    auto : false
                });
                Buyplug({
                    data: init_data
                });
            }
            this.getImNum();
            this.handleFn();
        },
        getImNum : function(){
            //var im_id = Base.others.getCookie('insta-im-id');
            //if (!im_id) {
            //    im_id = Base.others.getCookie('test-insta-im-id');
            //}
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
        //getImNum : function(){
        //    var im_id = Base.others.getCookie('insta-im-id');
        //    if (!im_id) {
        //        im_id = Base.others.getCookie('test-insta-im-id');
        //    }
        //    var toImId = init_data.item.shop['im_id'];
        //    if (im_id && toImId) {
        //        var reqData = {
        //            edata: {
        //                action: 'unreadnum',
        //                uid: toImId,
        //                uid2: im_id
        //            }
        //        };
        //        Ajax.getJsonp(Config.host.actionUrl+Config.actions.imNum + '?param=' + JSON.stringify(reqData), function(data){
        //            if (data && data.count > 0) {
        //                $('.j_im_num').show();
        //            } else {
        //                $('.j_im_num').hide();
        //            }
        //        });
        //    }
        //},
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
                    _ios = Base.others.verifyBower().ios;
                if(_local_url && !/detail/g.test(_local_url)){
                    if(_ios){//ios手机回退
                        if(/\?/g.test(_local_url)){
                            location.href = localStorage.getItem('FromUrl')+'&item=back';
                        }else{
                            location.href = localStorage.getItem('FromUrl')+'?item=back';
                        }
                    }else{
                        if(/\/s\//g.test(_local_url)){
                            history.back();
                        }else{
                            if(/\?/g.test(_local_url)){
                                location.href = localStorage.getItem('FromUrl')+'&item=back';
                            }else{
                                location.href = localStorage.getItem('FromUrl')+'?item=back';
                            }
                        }
                    }
                }else{
                    Common.saveFromUrl(function(){
                        location.href = Config.host.host+'s/'+init_data.item.shop.id+'?item=back';
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
        }
    };
    ITEM.init();
})
