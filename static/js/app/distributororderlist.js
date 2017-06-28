/**
 * Created by sunchengbin on 2017/4/26.
 */
require(['oauth','base','config','common','lazyload','ajax','dialog','insjs'],function(Oauth,Base,Config,Common,Lazyload,Ajax,Dialog,Insjs){
    var UserCenter = {
        init : function(){
            var _this = this;
            _this.num = 0;
            _this.no_have_data = false;
            _this.get_more = true;
            Lazyload();
            this.handleFn();
            Insjs.WebOnReady(function(bridge){
                (function(bridge){
                    var _close_param = {
                        param:{
                            type : 'close_loading',
                            param : null
                        }
                    };
                    //关闭webview的loading动画
                    bridge.callHandler('insSocket',_close_param, function(response) {
                        return null;
                    });
                })(bridge);
            },function(){

            });
        },
        handleFn : function(){
            var _this = this;
            $(document).on('scroll', function (e) {
                var moz = /Gecko\//i.test(navigator.userAgent);
                var body = document[moz ? 'documentElement' : 'body'];
                var _st = body.scrollTop, //firefox下body无scrollTop
                    _wh = $(window).height(),
                    _bh = $(document).height();
                //获取数据
                if (_st + _wh > _bh - 200) {
                    _this.getMoreOrderList();
                }
            });
            $(".j_order_info").on("click",function(){
                PaqPush && PaqPush('查看订单', '');
                var _id = $(this).attr('data-id')
                var _url = Config.host.hrefUrl+"distributororderdetail.php?order_id="+_id;
                location.href = _url;
            })
        },
        getMoreOrderList : function(callback){
            var _this = this;
            var reqData = {
                edata: {
                    action: 'buyer_list',
                    page_size: 20,
                    page_num: ++_this.num,
                    seller_id:0,
                    buyer_id:Base.others.getUrlPrem('uss_buyer_id'),
                    uss:Base.others.getUrlPrem('uss')
                }
            };
            // if(_this.no_have_data){return;}
            if(!_this.get_more){return;}
            _this.get_more = false;
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.orderConfirm+'?param=' + JSON.stringify(reqData), function (obj) {
                _this.get_more = true;
                if (obj.code == 200) {
                    if (obj.order_list.list.length > 0) {
                        $('.j_order_list').append(_this.createListHtml(obj.order_list.list));
                    } else {
                        _this.no_have_data = true;
                    }
                } else {
                    alert(obj.msg)
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">'+obj.msg+'</p>'
                    });
                }
                callback && callback();
            }, function (error) {
                _this.get_more = true;
                callback && callback();
            });
        },
        createListHtml : function(list){
            var _htm = '';
            $.each(list,function(i,item){
                if(item.items.length > 1) {
                    _htm += '<li class="order-info j_order_info" data-url="'+item.url+'">';
                    _htm += '<p class="order-status b-bottom"><span>'+item.state_txt+'</span>'+Base.others.transDateStrToOrderDateTime(item.add_time)+'</p>';
                    _htm += '<div class="info-detail">';
                    _htm += '<div class="items-img">';
                    $.each(item.items,function(i,oneitem) {
                        _htm += '<img data-img="'+oneitem.img_head+'">';
                    });
                    _htm += '</div>';
                    _htm += '</div>';
                    _htm += '<p class="clearfix total-price">'+(item.warrant_status?'<i class="icon iconfont fl icon-warrant-flag"></i>':'')+'Jumlah Total：Rp '+Base.others.priceFormat(item.total_price)+'</p>';
                    _htm += '</li>';
                }else{
                    _htm += '<li class="order-info j_order_info" data-url="'+item.url+'">';
                    _htm += '<p class="order-status b-bottom"><span>'+item.state_txt+'</span>'+Base.others.transDateStrToOrderDateTime(item.add_time)+'</p>';
                    _htm += '<div class="info-detail" flex="dir:left">';
                    _htm += '<div class="one-item">';
                    _htm += '<img data-img="'+item.items[0].img_head+'">';
                    _htm += '</div>';
                    _htm += '<div class="one-item-explain">'+item.items[0].item_title;
                    _htm += '</div>';
                    _htm += '</div>';
                    _htm += '<p class="clearfix total-price">'+(item.warrant_status?'<i class="icon iconfont fl icon-warrant-flag"></i>':'')+'Jumlah Total：Rp '+Base.others.priceFormat(item.total_price)+'</p>';
                    _htm += '</li>';
                }
            });
            return _htm;
        }
    };
    UserCenter.init();
})