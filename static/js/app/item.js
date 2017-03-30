/**
 * Created by sunchengbin on 16/10/20.
 */
/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang', 'lazyload', 'ajax', 'config', 'base', 'common', 'buyplug', 'slide', 'cart', 'fastclick', 'contact', 'viewer', 'item', 'dialog', 'debug', 'sharecoupon', 'oauth', 'cache', 'sharebargain'], function (Lang, Lazyload, Ajax, Config, Base, Common, Buyplug, Slide, Cart, Fastclick, Contact, Viewer, Item, Dialog, Debug, Sharecoupon, Oauth, Cache, Sharebargain) {
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
            window.Oauth = Oauth;
            window.Cache = Cache;
            window.Base = Base;
            _this.loginResultPackage = _this.checkIsLogin();
            if (init_data.item.bargain) {
                if (_this.loginResultPackage.result) {
                    // 如果已登录 且有 砍价活动 则请求h5 砍价活动明细
                    var reqParams = {
                        edata: {
                            "_debug_env": "4.5",
                            "action": "h5_detail",
                            "buyer_id": _this.loginResultPackage.info.buyer_id,
                            "price": Cache.getSpace("BargainCache") ? Cache.getSpace("BargainCache").find("bargain_price_self") : 0, //自砍一刀的价格，如果没有自砍，就传0
                            "wduss": _this.loginResultPackage.info.wduss
                        }
                    }
                    var url = Config.host.actionUrl + Config.actions.bargain + "/25?param=" + JSON.stringify(reqParams);
                    Ajax.getJsonp(url, function (obj) {
                        console.log(obj)
                    }, function () {

                    })
                    $(".j_bargain_btn_continue").show();
                    $(".j_bargain_btn_self").hide();
                    $(".j_bargain_tip_unlogin_price").hide();
                } else {
                    $(".j_bargain_btn_continue").hide();
                    $(".j_bargain_btn_self").show();
                    $(".j_bargain_tip_unlogin_price").show();
                }
            }
        },
        /**
         * 检查是否本地自己砍过价
         */
        checkIsBargainSelf: function () {

        },
        /**
         * 获取url中用户信息 获取本地存储中的用户信息 如果两个值不同 设置页面为未登录状态
         */
        checkIsLogin: function () {
            // 获取回传的用户信息
            var loginInfoFromCallBackPost = user_info;
            // 获取存储空间 登录
            var loginInfoFromCache = Cache.getSpace("LoginCache") || new Cache({
                namespace: "LoginCache",
                type: "local"
            });
            // 如果url中有用户信息 说明刚登录完成 更新ui 更新本地存储用户信息
            if (!!loginInfoFromCallBackPost.buyer_id && !!loginInfoFromCallBackPost.name && !!loginInfoFromCallBackPost.pic) {
                loginInfoFromCache.set("loginInfo", loginInfoFromCallBackPost);
                return {
                    result: true,
                    info: loginInfoFromCallBackPost
                }
            } else {
                var loginInfo = loginInfoFromCache.find("loginInfo");
                if (!loginInfo || !loginInfo.buyer_id) {
                    // 本地存储没有 则返回false 未登录
                    return {
                        result: false
                    };
                } else {
                    // 本地存储有 返回用户信息
                    return {
                        result: true,
                        info: loginInfo
                    };
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
                var _htm = '<ul class="reduc-rule-list">';
                if (!!init_data.item.shop.shop_discount) {
                    PaqPush && PaqPush('查看满减活动公告', '');
                    //_paq.push(['trackEvent', '查看满减活动公告', 'click', '']);
                    for (var i = 0, _reducItem; _reducItem = init_data.item.shop.shop_discount.info[i++];) {
                        _htm += "<li><span></span>Minimal Pembelian Rp " + Base.others.priceFormat(_reducItem.condition_price) + " Potongan Rp " + Base.others.priceFormat(_reducItem.discount_price) + "</li>"
                    }
                    _htm += '<li><span></span>' + $(".reduc-expire").text() + '</li></ul>';
                    // _htm = _htm.replace(/,$/gi,'') +"</br>"+ $(".reduc-expire").text();
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
            $('body').on('click', '.j_bargain_btn_self', function () {
                //弹出 砍了多少钱 dialog
                var _amplitude = _this.computeBargainPrice();
                Dialog.dialog({
                    body_txt: _this.createBargainPriceDialogHtm(),
                    show_footer: false,
                    body_fn: function () {
                        // 回填自砍一刀的
                        $(".j_bargain_amplitude_price").text(_amplitude.price_format);
                        //本地存储这一刀
                        _this.bargainCache = new Cache({
                            namespace: "BargainCache",
                            type: "local"
                        });
                        _this.bargainCache.set("bargain_price_self", _amplitude.price_origin);
                        // 确认砍价金额 刷新页面
                        $("body").on("click", ".j_btn_confrim_bargain_price", function () {

                        })
                    }
                })
            })
            $("body").on("click", ".j_user_login", function () {
                Oauth.openDialog();
            })
            $("body").on("click", ".j_bargain_btn_continue", function () {
                // 判断是否登录 登录 弹出 分享 
                if (_this.loginResultPackage.result) {
                    Sharebargain({
                        title: ""
                    });
                } else {
                    Oauth.openDialog();
                }
                // 未登录 弹出 去登录 


                // Dialog.dialog({
                //     body_fn:function(){

                //     }
                // })
            })
        },
        // TODO 模块化
        //创建砍了多少价弹窗
        createBargainPriceDialogHtm: function () {
            var _htm = "";
            _htm = '<div class="bargain-howprice-wrap">' +
                '   <p><img src="' + Config.host.imgUrl + '/app/bargain.png" /></p>' +
                '   <p>Memotong</p>' +
                '   <p class="j_bargain_amplitude_price"></p>' +
                '   <div class="j_btn_confrim_bargain_price">Ya</div>' +
                '</div>'
            return _htm;
        },
        computeBargainPrice: function () {
            //自砍
            var _amplitude = (~~init_data.item.price - ~~init_data.item.bargain.base_price) * 0.1;
            return {
                price_origin: _amplitude,
                price_format: "Rp " + Base.others.priceFormat(_amplitude)
            };
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
