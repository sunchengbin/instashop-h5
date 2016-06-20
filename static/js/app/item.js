/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang','lazyload','hbs','text!views/app/item.hbs','ajax','config','base','common','buyplug','slide','cart'],function(Lang,Lazyload,Hbs,Item,Ajax,Config,Base,Common,Buyplug,Slide,Cart){
    var ITEM = {
        init : function(){
            var _this = this;
            Lazyload();
            var ItemHtm = '<div>loading..</div>';
            if(init_data){
                ItemHtm= Hbs.compile(Item)({
                    data : init_data,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    num : Cart(init_data).getCartNum(),
                    timeLang : _this.discountTime(init_data.item.discount.now_time,init_data.item.discount.end_time)
                });
            }else{
                ItemHtm = '<div>loading error</div>';
            }
            $('body').prepend(ItemHtm);
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
            var im_id = Base.others.getCookie('insta-im-id');
            if (!im_id) {
                im_id = Base.others.getCookie('test-insta-im-id');
            }
            var toImId = init_data.item.shop['im_id'];
            if (im_id && toImId) {
                var reqData = {
                    edata: {
                        action: 'unreadnum',
                        uid: toImId,
                        uid2: im_id
                    }
                };
                Ajax.getJsonp(Config.host.actionUrl+Config.actions.imNum + '?param=' + JSON.stringify(reqData), function(data){
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
                _send = (_et - _nt)/1000,
                _hour = (_send - _send % 3600)/3600,
                _second = (_send - _hour*3600)%60,
                _minute = (_send - _hour*3600 - _second)/60;
            return {
                time : (_hour+':'+_minute+':'+_second),
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
            var _hour = (_send - _send % 3600)/3600,
                _second = (_send - _hour*3600)%60,
                _minute = (_send - _hour*3600 - _second)/60;
            return (_hour+':'+_minute+':'+_second);
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
            $('body').on('click','.j_shop_info',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            $('body').on('tap','.j_go_back',function(){
                Common.saveFromUrl(function(){
                    location.href = Config.host.host+'s/'+init_data.item.shop.id;
                });
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