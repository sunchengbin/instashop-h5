/**
 * Created by sunchengbin on 16/10/20.
 */
/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang', 'lazyload', 'ajax', 'config', 'base', 'common', 'buyplug', 'slide', 'cart', 'fastclick', 'contact', 'viewer', 'item', 'dialog', 'debug', 'sharecoupon', 'oauth', 'cache', 'bargain'], function (Lang, Lazyload, Ajax, Config, Base, Common, Buyplug, Slide, Cart, Fastclick, Contact, Viewer, Item, Dialog, Debug, Sharecoupon, Oauth, Cache, Bargain) {
    var ITEM = {
        init: function () {
            var _this = this,
                _cart_num = Cart().getCartNum();
            if (init_data && init_data.code == 200) {
                if (_cart_num != 0) {
                    $('.j_cart_wraper').append('<span class="cart-num">' + _cart_num + '</span>');
                }
                try {
                    Lazyload();
                    var _slide = Slide.createNew({
                        dom: document.querySelector('.j_banner'),
                        needTab: true,
                        auto: false
                    });
                    if (!!init_data.item.bargain) {
                        if (!Bargain.checkIsLimitForLogin()) {
                            var _curDateTime = Base.others.getCurDateTime() - 3600;
                            var _bargain_start_time = Base.others.transDateStrToDateTime(init_data.item.bargain.start_time);
                            var _bargain_end_time = Base.others.transDateStrToDateTime(init_data.item.bargain.end_time);
                            if (_curDateTime > _bargain_end_time || _curDateTime < _bargain_start_time) {
                                $(".j_bargain_reachbaseprice").hide();
                                $(".j_bargain_btn_self").hide();
                                $(".j_bargain_btn_continue").hide();
                                $(".j_bargain_tip").hide();
                                $(".bargain-tip-txt-how").hide();
                            } else {
                                _this.BargainPlug = new Bargain({
                                    bargain: init_data.item.bargain
                                });
                                // 根据砍价活动计算sku
                                init_data = _this.BargainPlug.computeAndUpdateSkuPriceForBargain(init_data);
                            }
                        } else {
                            $(".j_bargain_reachbaseprice").hide();
                            $(".j_bargain_btn_self").hide();
                            $(".j_bargain_btn_continue").hide();
                            $(".j_bargain_tip").hide();
                            $(".bargain-tip-txt-how").hide();
                        }

                    }
                    Buyplug({
                        data: init_data,
                        noStockCallback: function () {
                            if ($('.j_show_contact').length) {
                                _this.contact = Contact({
                                    data: {
                                        tel: init_data.item.shop.phone,
                                        line: init_data.item.shop.line_url
                                    },
                                    lang: Lang
                                });
                                _this.contact.createHtm({
                                    data: {
                                        tel: init_data.item.shop.phone,
                                        line: init_data.item.shop.line_url
                                    },
                                    lang: Lang
                                }).toShow();
                            } else {
                                location.href = init_data.item.shop.line_url;
                            }
                        }
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
                } catch (error) {
                    Debug.log({
                        title: "item.js init fail",
                        data: error
                    })
                }
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
                        $('.txt').css({
                            'maxHeight': 'none'
                        });
                    } else {
                        $('.j_down_btn').removeClass('up-btn').addClass('down-btn');
                        $('.txt').css({
                            'maxHeight': '44px'
                        });
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
                PaqPush && PaqPush('返回', '');
                //_paq.push(['trackEvent', '返回', 'click', '']);
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
                                location.href = _this.transUrl(_local_url, _scroll_url);
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
                                    location.href = _this.transUrl(_local_url, _scroll_url);
                                } else {
                                    if (/\/s\//g.test(_local_url)) { //m.instashop域名规则首页
                                        location.href = _this.transUrl(_local_url, _scroll_url);
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
            $('body').on('click', '.j_cart_wraper', function () {
                var _this = $(this),
                    _url = _this.attr('data-url');
                PaqPush && PaqPush('查看购物车', '');
                Common.saveCartFromUrl(function () {
                    location.href = _url;
                });
            });
            //满减 lanchenghao
            $('body').on('click', '.j_reduc_box', function () {
                PaqPush && PaqPush('查看满减公告', '');
                var _htm = '<ul class="reduc-rule-list">';
                var _discount = init_data.item.shop.shop_discount;
                if (!!_discount) {
                    switch (_discount.discount_type) {
                        case "percent":
                            var _percentInfo = _discount.info[0];
                            _htm += 'Minimal Pembelian Rp ' + Base.others.priceFormat(_percentInfo.condition_price) + ' akan mendapat potongan - ' + _percentInfo.discount_percent + '%.';
                            _htm += '<li><span></span>' + $(".reduc-expire-discount").text() + '</li></ul>'
                            break;
                        case "price":
                            for (var i = 0, _reducItem; _reducItem = init_data.item.shop.shop_discount.info[i++];) {
                                _htm += "<li><span></span>Minimal Pembelian Rp " + Base.others.priceFormat(_reducItem.condition_price) + " Potongan Rp " + Base.others.priceFormat(_reducItem.discount_price) + "</li>"
                            }
                            _htm += '<li><span></span>' + $(".reduc-expire").text() + '</li></ul>'
                            break;
                    }
                    Dialog.alert({
                        top_txt: "<p style='text-align:center'>" + Lang.H5_REDUC_TITLE + "</p>",
                        show_top: true,
                        body_txt: _htm,
                        body_fn: function () {
                            $('.j_c_btn').hide();
                        }
                    })
                }
            });
            $('body').on('click', '.j_share_btn', function () {
                PaqPush && PaqPush('分享获取优惠券', '');
                var _coupon_id = $(this).attr('data-couponid');
                Sharecoupon({
                    coupon_url: Config.host.host + 'b/' + _coupon_id
                });
            });
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
            $('body').on('click', '.j_goto_line', function () {
                location.href = init_data.item.shop.line_url;
            })
        },
        transUrl: function (url, scroll_url) {
            if (/\?/g.test(url)) {
                return url + '&item=back' + scroll_url;
            } else {
                return url + '?item=back' + scroll_url;
            }
        }
    };
    ITEM.init();
})
