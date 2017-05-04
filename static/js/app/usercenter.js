/**
 * Created by sunchengbin on 2017/4/26.
 */
require(['oauth','base','config','common','lazyload','ajax','dialog'],function(Oauth,Base,Config,Common,Lazyload,Ajax,Dialog){
    var UserCenter = {
        init : function(){
            var _this = this;
            _this.num = 0;
            _this.no_have_data = false;
            _this.get_more = true;
            Lazyload();
            this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            $('body').on('click', '.j_go_back', function () {
                var _local_url = localStorage.getItem('FromUrl'),
                    _host_url = location.href,
                    _key = Base.others.getUrlPrem('search'),
                    _search_url = Config.host.hrefUrl + 'search.php' + (_key ? '?key=' + _key + '&seller_id=' + init_data.item.seller_id : ''),
                    _scroll_url = localStorage.getItem('index_route_info') ? localStorage.getItem('index_route_info') : '';
                if (_local_url && !/detail/g.test(_local_url)) {
                    if (/\.instashop\.co\.id\/\d+/g.test(_local_url)) { //我们自己的域名下
                        if (/\?search/g.test(_host_url)) { //搜索页过来会追加
                            location.href = _search_url;
                        } else {
                            if (/\/s\//g.test(_local_url)) { //m-test或者m.test的首页url
                                location.href = Common.transUrl(_local_url, _scroll_url);
                            } else {
                                if (/\?/g.test(_local_url) && !/\?rec/g.test(_local_url)) {
                                    location.href = localStorage.getItem('FromUrl') + '&item=back' + _scroll_url;
                                } else {
                                    var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                                    location.href = _url + '?item=back' + _scroll_url;
                                }
                            }
                        }
                    } else { //独立域名
                        var _host_name = location.hostname;
                        if (/\?search/g.test(_host_url)) { //搜索页
                            location.href = _search_url;
                        } else {
                            if (/\/\d+/g.test(_local_url)) { //是当前详情页
                                if (/\/k\/\d+/g.test(_local_url)) { //分类页
                                    location.href = Common.transUrl(_local_url, _scroll_url);
                                } else {
                                    if (/\/s\//g.test(_local_url)) { //m.instashop域名规则首页
                                        location.href = Common.transUrl(_local_url, _scroll_url);
                                    } else {
                                        location.href = location.protocol + '//' + _host_name + '?item=back' + _scroll_url;
                                    }
                                }
                            } else {
                                if (/\?/g.test(_local_url) && !/\?rec/g.test(_local_url)) {
                                    location.href = localStorage.getItem('FromUrl') + '&item=back' + _scroll_url;
                                } else {
                                    location.href = location.protocol + '//' + _host_name + '?item=back' + _scroll_url;
                                }
                            }
                        }
                    }
                } else {
                    Common.saveFromUrl(function () {
                        var _url = !Base.others.isCustomHost() ? Config.host.host : Config.host.host + 's/' + init_data.item.shop.id;
                        location.href = _url + '?item=back' + _scroll_url;
                    });
                }
            });
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
            $('body').on('click','.j_log_out',function (e) {
                Oauth.signout(localStorage.getItem('FromUrl'));
            });
            $('body').on('click','.j_order_info',function(){
                PaqPush && PaqPush('查看订单', '');
                var _url = $(this).attr('data-url');
                location.href = _url;

            });
        },
        getMoreOrderList : function(callback){
            var _this = this;
            var reqData = {
                edata: {
                    action: 'buyer_list',
                    page_size: 20,
                    page_num: ++_this.num,
                    seller_id:Base.others.getUrlPrem('seller_id'),
                    buyer_id:Base.others.getUrlPrem('buyer_id'),
                    uss:Base.others.getUrlPrem('uss')
                }
            };
            if(_this.no_have_data){return;}
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