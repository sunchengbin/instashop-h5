/**
 * Created by sunchengbin on 16/10/20.
 */
/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang', 'lazyload', 'ajax', 'config', 'base', 'common', 'buyplug', 'slide', 'cart', 'fastclick', 'contact', 'viewer', 'item','dialog'], function (Lang, Lazyload,  Ajax, Config, Base, Common, Buyplug, Slide, Cart, Fastclick, Contact, Viewer, Item,Dialog) {
    var ITEM = {
        init: function () {
            var _this = this,
                _cart_num = Cart().getCartNum();
            if (init_data && init_data.code == 200) {
                if (_cart_num > 0) {
                    $('.j_cart_wraper').append('<span class="cart-num">' + _cart_num + '</span>');
                }
                Lazyload();
                var _slide = Slide.createNew({
                    dom: document.querySelector('.j_banner'),
                    needTab: true,
                    auto: false
                });
                Buyplug({
                    data: init_data
                });
                Viewer({
                    btn: '.j_banner li',
                    images: init_data.item.imgs
                }).init();
                Viewer({
                    btn: '.slide_arrow',
                    images: init_data.item.imgs
                }).init();
                _this.handleFn();
            }
        },
        handleFn: function () {
            if ($('[data-time]').length) {
                Item.changeTime();
            }
            if ($('.txt-hide').height() > 44) {
                $('.down-btn').show();
                $('body').on('click', '.j_down_box', function () {
                    if ($('.j_down_btn').is('.down-btn')) {
                        $('.j_down_btn').removeClass('down-btn').addClass('up-btn');
                        $('.txt').css({'maxHeight': 'none'});
                    } else {
                        $('.j_down_btn').removeClass('up-btn').addClass('down-btn');
                        $('.txt').css({'maxHeight': '44px'});
                    }
                });
            }
            Fastclick.attach(document.body);
            $('body').on('click', '.j_shop_info', function () {
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function () {
                    location.href = _url;
                });
            });
            //item=back是为了让返回首页的时候滚动到指定的scrolltop高度
            $('body').on('click', '.j_go_back', function () {
                PaqPush && PaqPush('返回','');
                //_paq.push(['trackEvent', '返回', 'click', '']);
                var _local_url = localStorage.getItem('FromUrl'),
                    _host_url = location.href,
                    _key = Base.others.getUrlPrem('search'),
                    _search_url = Config.host.hrefUrl + 'search.php'+(_key?'?key='+_key+'&seller_id='+init_data.item.seller_id:'');
                if (_local_url && !/detail/g.test(_local_url)) {
                    if (/\.instashop\.co\.id\/\d+/g.test(_local_url)) {//我们自己的域名下
                        if(/\?search/g.test(_host_url)){//搜索页
                            location.href = _search_url;
                        }else{
                            if (/\/s\//g.test(_local_url)) {
                                location.href = _this.transUrl(_local_url);
                            } else {
                                if (/\?/g.test(_local_url)) {
                                    location.href = localStorage.getItem('FromUrl') + '&item=back';
                                } else {
                                    var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                                    location.href = _url + '?item=back';
                                }
                            }
                        }
                    } else {//独立域名
                        var _host_name = location.hostname;
                        if(/\?search/g.test(_host_url)){//搜索页
                            location.href = _search_url;
                        }else {
                            if (/\/\d+/g.test(_local_url)) {//是当前详情页
                                if (/\/k\/\d+/g.test(_local_url)) {//分类页
                                    location.href = _this.transUrl(_local_url);
                                } else {
                                    if (/\/s\//g.test(_local_url)) {//m.instashop域名规则首页
                                        location.href = _this.transUrl(_local_url);
                                    } else {
                                        location.href = location.protocol + '//' + _host_name + '?item=back';
                                    }
                                }
                            } else {
                                if (/\?/g.test(_local_url)) {
                                    location.href = localStorage.getItem('FromUrl') + '&item=back';
                                } else {
                                    location.href = location.protocol + '//' + _host_name + '?item=back';
                                }
                            }
                        }
                    }
                } else {
                    Common.saveFromUrl(function () {
                        var _url = Base.others.isCustomHost() ? Config.host.host : Config.host.host + 's/' + init_data.item.shop.id;
                        location.href = _url + '?item=back';
                    });
                }
            });
            $('body').on('click', '.j_cart_wraper', function () {
                var _this = $(this),
                    _url = _this.attr('data-url');
                    PaqPush && PaqPush('查看购物车','');
                Common.saveFromUrl(function () {
                    location.href = _url;
                });
            });
            //满减 lanchenghao
            $('body').on('click','.j_reduc_box',function(){
                var _htm = '<ul class="reduc-rule-list">';
                if(!!init_data.item.shop.shop_discount){
                    PaqPush && PaqPush('查看满减活动公告','');
                    //_paq.push(['trackEvent', '查看满减活动公告', 'click', '']);
                    for(var i=0,_reducItem;_reducItem=init_data.item.shop.shop_discount.info[i++];){
                        _htm+="<li><span></span>Minimal Pembelian Rp "+Base.others.priceFormat(_reducItem.condition_price)+" Potongan Rp "+ Base.others.priceFormat(_reducItem.discount_price)+"</li>"
                    }
                    _htm +='<li><span></span>'+$(".reduc-expire").text()+'</li></ul>';
                    // _htm = _htm.replace(/,$/gi,'') +"</br>"+ $(".reduc-expire").text();
                    Dialog.alert({
                        top_txt:"<p style='text-align:center'>"+Lang.H5_REDUC_TITLE+"</p>",
                        show_top:true,
                        body_txt:_htm,
                        body_fn:function(){
                            $('.j_c_btn').hide();
                        }
                    })
                }
            })
            var _this = this;
            if ($('.j_show_contact').length) {
                _this.contact = Contact({
                    data: {
                        tel: init_data.item.shop.phone,
                        line: init_data.item.shop.line_url
                    },
                    lang: Lang
                });
                $('body').on('click', '.j_show_contact', function () {
                    _this.contact.createHtm({
                        data: {
                            tel: init_data.item.shop.phone,
                            line: init_data.item.shop.line_url
                        },
                        lang: Lang
                    }).toShow();
                });
            }
            $('body').on('click','.j_goto_line',function(){
                    location.href = init_data.item.shop.line_url;
                })
        },
        transUrl: function (url) {
            if (/\?/g.test(url)) {
                return url + '&item=back';
            } else {
                return url + '?item=back';
            }
        }
    };
    ITEM.init();
})
