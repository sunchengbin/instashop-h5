/**
 * Created by sunchengbin on 16/6/6.
 * 首页
 */
require(['lang', 'lazyload', 'ajax', 'config', 'base', 'common', 'cart', 'fastclick', 'contact', 'slide', 'item', 'dialog', 'sharecoupon', 'tab', 'debug', 'viewer'], function (Lang, Lazyload, Ajax, Config, Base, Common, Cart, Fastclick, Contact, Slide, Item, Dialog, Sharecoupon, Tab, Debug, Viewer) {
    var I = {
        indexItemsPagination: {
            page_size: 10,
            page_num: 2,
            getData: true
        },
        allItemsPagination: {
            page_size: 10,
            page_num: 2,
            getData: true,
            orderby: 0,
            filter: Config.businessCodes.FILTER_ALL
        },
        tagInfo: {
            curTab: "index_template"
        },
        route_info: {

        },
        init: function (init_data) {
            Lazyload();
            var _this = this;
            _this.item_type = Common.getItemListType(init_data.template);
            _this.sortTimes = 0;
            if (init_data) {
                Common.initShopInfo(init_data);
                var _cart_num = Cart().getCartNum();
                if (_cart_num != 0) {
                    $('.j_cart_wraper').append('<span class="cart-num">' + _cart_num + '</span>');
                }
                _this.initRotateBanner();
            }
            $('.j_php_loding').remove();
            if ($('.txt-hide').height() > 44) {
                $('.down-btn').show();
            }


            //获取url信息
            _this.route_info.route_pt = route_pt || 1;
            _this.route_info.route_ct = route_ct || 0;
            _this.route_info.route_page_num = route_page_num || 2;
            _this.route_info.route_page_size = route_page_size || 10;

            Debug.log("路由信息", _this.route_info)

            var _allItemsDefaultTab = 1;
            if (_this.route_info.route_pt == 1) {
                _this.tagInfo.curTab = "index_template"
                _this.indexItemsPagination.page_num = _this.route_info.route_page_num + 1
            }
            if (_this.route_info.route_pt == 2) {
                _this.tagInfo.curTab = "index_allitems"
                _this.allItemsPagination.page_num = _this.route_info.route_page_num + 1
                if (_this.route_info.route_ct) {
                    switch (_this.route_info.route_ct) {
                        case 0:
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_DEFAULT;
                            break;
                        case 1:
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_ADDTIME;
                            _allItemsDefaultTab = 2;
                            break;
                        case 2:
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_PRICE_L2H;
                            _allItemsDefaultTab = 3; //低到高
                            break;
                        case 3:
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_PRICE_H2L;
                            _allItemsDefaultTab = 3; //高到低
                            break;
                        default:
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_DEFAULT;
                            break;
                    }
                }
            }

            //首页模块tab
            Tab({
                $header: ".tab-index",
                $content: ".tab-index-content",
                alias: ["index_template", "index_allitems", "index_shopinfo"],
                defaultTab: _this.route_info.route_pt,
                defaultFn: function () {

                },
                switchFn: function (switchInfo) {
                    _this.tagInfo.curTab = switchInfo.tabalias
                    Debug.log("切换信息:", switchInfo)
                }
            })

            //全部商品子TAB
            var allItemTab = Tab({
                $header: ".tab-items",
                alias: ["bycomplex", "bydate", "byprice"],
                defaultTab: _allItemsDefaultTab,
                switchFn: function (switchInfo) {
                    Debug.log("切换信息:", switchInfo)
                    _this.tagInfo.curTab = switchInfo.tabalias
                    //检查是否有切换状态
                    var _tab_status = switchInfo.el.attr("data-status") || "";
                    if (_tab_status) {
                        if ("bypricel2h" == _tab_status) {
                            //改为从高到低
                            _this.tagInfo.curTab = "bypriceh2l"
                            switchInfo.el.attr("data-status", "bypriceh2l")
                            $(".sort-price-l2h").addClass("sort-price-off");
                            $(".sort-price-h2l").removeClass("sort-price-off");
                        } else {
                            _this.tagInfo.curTab = "bypricel2h"
                            switchInfo.el.attr("data-status", "bypricel2h");
                            $(".sort-price-h2l").addClass("sort-price-off");
                            $(".sort-price-l2h").removeClass("sort-price-off");
                        }
                    }
                    switch (_this.tagInfo.curTab) {
                        case "bycomplex":
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_DEFAULT;
                            break;
                        case "bydate":
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_ADDTIME;
                            break;
                        case "bypricel2h":
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_PRICE_L2H; //低到高
                            break;
                        case "bypriceh2l":
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_PRICE_H2L; //高到低
                            break;
                        default:
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_DEFAULT;
                            break;
                    }
                    //清空掉当前排序列表
                    $('.all-items-wrap .items-list').html("")
                    //重置分页计数
                    _this.allItemsPagination.page_num = 1;
                    _this.getAllItem({
                        page_size: _this.allItemsPagination.page_size,
                        page_num: _this.allItemsPagination.page_num, //子tab切换默认第一页
                        orderby: _this.allItemsPagination.orderby,
                        filter: _this.allItemsPagination.filter
                    });
                },
                defaultFn: function () {

                }
            })
            Slide.createNew({
                dom: document.querySelector(".j_store_banner"),
                needTab: true,
                auto: false
            });
            Viewer({
                btn: '.j_store_banner li',
                images: shop_info_data.shop.realinfo.imgs
            }).init();

            _this.handleFn();
        },
        getRecommendItem: function (paginationOpt) {
            //默认加载已经请求了第一页 所以从第二页开始
            var _this = this;
            if (!_this.indexItemsPagination.getData) return;
            _this.indexItemsPagination.getData = false;
            var reqData = {
                edata: {
                    action: 'index_template',
                    page_size: paginationOpt.page_size,
                    page_num: paginationOpt.page_num,
                    orderby: _this.allItemsPagination.orderby,
                    filter: _this.allItemsPagination.filter
                }
            };
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.shopList + init_data.shop.id + '?param=' + JSON.stringify(reqData), function (obj) {
                if (obj.code == 200) {
                    _this.indexItemsPagination.page_num++
                        if (obj.item_list.list.length > 0) {
                            var _list_data = _this.transItems(obj.item_list.list);
                            if (_list_data.item.length) {
                                if (!$('.j_item_box .j_item_list').length) {
                                    var _htm = '<p class="item-title"><span></span>' + Lang.H5_GOODS_ORTHER + '</p><ul class="' + (_this.item_type != 3 ? 'items-list' : 'three-items-list') + ' j_item_list clearfix"></ul>';
                                    $('.j_item_box').html(_htm);
                                }
                                $('.j_item_box ul').append(Item.addItem(_list_data.item));
                            }
                            if ($('[data-time]').length) {
                                Item.changeTime();
                            }
                            //Common.addItems(obj.item_list.list);
                            _this.indexItemsPagination.getData = true;
                        } else {
                            _this.indexItemsPagination.getData = false;
                        }
                } else {
                    _this.indexItemsPagination.getData = true;
                }
            }, function (error) {
                _this.indexItemsPagination.getData = true;
            });
        },
        /**
         * 全部商品tab初始化时加载函数
         */
        getAllItem: function (paginationOpt) {
            var _this = this;
            if (!_this.allItemsPagination.getData) return;
            _this.allItemsPagination.getData = false;
            var reqData = {
                edata: {
                    action: 'index_allitems',
                    page_size: paginationOpt.page_size,
                    page_num: paginationOpt.page_num,
                    orderby: paginationOpt.orderby || Config.businessCodes.ORDER_BY_DEFAULT, //默认排序
                    filter: paginationOpt.fitler || Config.businessCodes.FILTER_ALL //全部商品
                }
            };
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.shopList + init_data.shop.id + '?param=' + JSON.stringify(reqData), function (obj) {
                if (obj.code == 200) {
                    _this.allItemsPagination.page_num++
                        if (obj.item_list.list.length > 0) {
                            var _list_data = obj.item_list.list;
                            if (_list_data.length) {
                                // if (!$('.all-items-wrap .j_item_list').length) {
                                //     var _htm = '<p class="item-title"><span></span>' + Lang.H5_GOODS_ORTHER + '</p><ul class="' + (_this.item_type != 3 ? 'items-list' : 'three-items-list') + ' j_item_list clearfix"></ul>';
                                //     $('.j_item_box').html(_htm);
                                // }

                                $('.all-items-wrap .items-list').append(Item.addItem(_list_data, _this.item_type));
                            }
                            if ($('[data-time]').length) {
                                Item.changeTime();
                            }
                            _this.allItemsPagination.getData = true;
                        } else {
                            _this.allItemsPagination.getData = false;
                        }
                } else {
                    _this.allItemsPagination.getData = true;
                }
            }, function (error) {
                _this.allItemsPagination.getData = true;
            });
        },
        initRotateBanner: function () {
            //Common.slideImgNav();
            var _banners = document.querySelectorAll('.j_banner'),
                _len = _banners.length;
            if (_len) {
                for (var i = 0; i < _len; i++) {
                    var item = _banners[i];
                    Slide.createNew({
                        dom: item,
                        needTab: true,
                        auto: true
                    });
                }
            }
        },
        getRouteInfo: function () {
            var _this = this;
            var _routeInfo = {};
            switch (_this.tagInfo.curTab) {
                case "index_template":
                    _routeInfo.pt = 0; //index_template 
                    _routeInfo.page_num = _this.indexItemsPagination.page_num;
                    _routeInfo.page_size = _this.indexItemsPagination.page_size;
                    break;
                case "bycomplex":
                    _routeInfo.pt = 1; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_DEFAULT; //综合
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                case "bydate":
                    _routeInfo.pt = 1; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_ADDTIME; //时间
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                case "bypricel2h":
                    _routeInfo.pt = 1; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_PRICE_L2H; //由低到高
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                case "bypriceh2l":
                    _routeInfo.pt = 1; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_PRICE_H2L; //由高到低
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                default:
                    _routeInfo.pt = 0; //index_template 
                    _routeInfo.page_num = _this.indexItemsPagination.page_num;
                    _routeInfo.page_size = _this.indexItemsPagination.page_size;
                    break;
            }
            return _routeInfo;
        },
        handleFn: function () {
            var page_num = 2,
                _this = this,
                getData = true,
                reqData = {
                    edata: {
                        action: 'index_template',
                        page_size: 10,
                        page_num: page_num
                    }
                };
            if ($('[data-time]').length) {
                Item.changeTime();
            }
            Fastclick.attach(document.body);
            if ($('.txt-hide').height() > 44) {
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
            $('body').on('click', '.j_share_btn', function () {
                PaqPush && PaqPush('分享获取优惠券', '');
                var _coupon_id = $(this).attr('data-couponid');
                Sharecoupon({
                    coupon_url: Config.host.host + 'b/' + _coupon_id
                });
            });
            $(document).on('scroll', function (e) {
                var moz = /Gecko\//i.test(navigator.userAgent);
                var body = document[moz ? 'documentElement' : 'body'];
                var _st = body.scrollTop, //firefox下body无scrollTop
                    _wh = $(window).height(),
                    _bh = $(document).height();
                //显示分类 不要了
                // if ((_st > 40) && !localStorage.getItem('IndexSortPrompt')) {
                //     _this.showSortPrompt();
                // }
                //获取数据
                if (_st + _wh > _bh - 200) {
                    switch (_this.tagInfo.curTab) {
                        case "index_template":
                            Debug.log("请求推荐商品分页信息", _this.indexItemsPagination)
                            _this.getRecommendItem(_this.indexItemsPagination);
                            break;
                        case "index_allitems":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination);
                            break;
                        case "bycomplex":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination);
                            break;
                        case "bydate":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination);
                            break;
                        case "byprice":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination);
                            break;
                        default:
                            break;
                    }
                }
            });
            $('body').on('click', '.j_item_info', function () {
                var _this = $(this),
                    _url = _this.attr('data-url'),
                    _scroll_top = $(window).scrollTop(),
                    _host_name = location.hostname;
                if (!_url) {
                    return;
                }
                if (Base.others.isCustomHost()) {
                    if (/\/k\//g.test(_url) || /\/detail\//g.test(_url)) {
                        _url = _url.replace(/\/\/[^\/]+\//, '//' + _host_name + '/');
                    } else {
                        _url = _url.replace(/\/\/[^\/]+\//, '//' + _host_name + '/detail/');
                    }

                } else {
                    _url = Common.transFromUrl(_url);
                }
                localStorage.setItem('ScrollTop', _scroll_top);
                Common.saveFromUrl(function () {
                    location.href = _url;
                });
            });
            $('body').on('click', '.j_cart_wraper', function () {
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveCartFromUrl(function () {
                    location.href = _url;
                });
            });
            $('body').on('click', '.j_category', function () {
                var _sort_box = document.querySelector('.j_sort_box');
                var _sort_cover = document.querySelector('.j_sort_cover');
                _sort_box.style.webkitTransitionDuration = '.6s';
                _sort_box.style.webkitTransform = "translate3d(0,0,0)";
                _sort_cover.style.webkitTransitionDuration = '.3s';
                _sort_cover.style.webkitTransform = "translate3d(0,0,0)";
                _sort_box.style.mozTransitionDuration = '.6s';
                _sort_box.style.mozTransform = "translate3d(0,0,0)";
                _sort_cover.style.mozTransitionDuration = '.3s';
                _sort_cover.style.mozTransform = "translate3d(0,0,0)";
                _this.hideSortPrompt();
            });
            $('body').on('click', '.j_sort_cover', function () {
                var _sort_box = document.querySelector('.j_sort_box');
                var _sort_cover = document.querySelector('.j_sort_cover');
                _sort_box.style.webkitTransitionDuration = '.3s';
                _sort_box.style.webkitTransform = "translate3d(-100%,0,0)";
                _sort_cover.style.webkitTransitionDuration = '.6s';
                _sort_cover.style.webkitTransform = "translate3d(-100%,0,0)";
            });
            //满减 lanchenghao
            $('body').on('click', '.j_reduc_box', function () {
                PaqPush && PaqPush('查看满减公告', '');
                var _htm = '<ul class="reduc-rule-list">';
                if (!!init_data.shop.shop_discount) {
                    for (var i = 0, _reducItem; _reducItem = init_data.shop.shop_discount.info[i++];) {
                        _htm += "<li><span></span>Minimal Pembelian Rp " + Base.others.priceFormat(_reducItem.condition_price) + " Potongan Rp " + Base.others.priceFormat(_reducItem.discount_price) + "</li>"
                    }
                    _htm += '<li><span></span>' + $(".reduc-expire").text() + '</li></ul>'
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
            $('body').on('click', '.j_search_btn', function () {
                var _val = $.trim($('.j_search_ipt').val());
                if (!_val) {
                    return;
                }
                location.href = Config.hrefUrl + 'search.php?key=' + encodeURIComponent(_val) + '&seller_id=' + init_data.shop.id;
            });
            localStorage.removeItem('FromUrl');
            if (localStorage.getItem('ScrollTop') && Base.others.getUrlPrem('item')) { //存在scrollTop时页面下滚到记忆中的top值
                //if(Base.others.verifyBower().ios){
                _this.goScroll();
                //}
            }
            if ($('.j_show_contact').length) {
                _this.contact = Contact({
                    data: {
                        tel: !init_data.shop.line_url && !init_data.shop.phone ? '' : init_data.shop.phone,
                        line: init_data.shop.line_url
                    },
                    lang: Lang
                });
                $('body').on('click', '.j_show_contact', function () {
                    _this.contact.createHtm({
                        data: {
                            tel: !init_data.shop.line_url && !init_data.shop.phone ? '' : init_data.shop.phone,
                            line: init_data.shop.line_url
                        },
                        lang: Lang
                    }).toShow();
                });
            }
            //修正因标签属性href有值的问题导致被追加spider参数 line中user not find的问题
            $('body').on('click', '.j_goto_line', function () {
                location.href = init_data.shop.line_url;
            });

        },
        showSortPrompt: function () {
            $('.j_sort_prompt_box .btn-cover').html(Lang.H5_GOOD_SORT);
            $('.j_sort_prompt_box').addClass('sort-prompt-box');
        },
        hideSortPrompt: function () {
            $('.j_sort_prompt_box .btn-cover').html('');
            $('.j_sort_prompt_box').removeClass('sort-prompt-box');
            localStorage.setItem('IndexSortPrompt', 1);
        },
        goScroll: function () {
            var _this = this,
                _l_top = Number(localStorage.getItem('ScrollTop'));
            if (!_l_top) {
                _l_top = 0;
            }
            if (_this.t) {
                clearTimeout(_this.t);
            }
            _this.t = setTimeout(function () {
                _this.sortTimes++;
                if (_this.sortTimes > 7) {
                    clearTimeout(_this.t);
                } else {
                    $(window).scrollTop(_l_top);
                    if ($(document).height() < _l_top) {
                        _this.goScroll();
                    } else {
                        clearTimeout(_this.t);
                    }
                }
            }, 100);
        },
        transItems: function (items) {
            var i = 0,
                _hot = [],
                _item = [],
                _this = this;
            // for (i; i < items.length;i++) {
            //     if(items[i].index_type == 'top') {
            //         _hot.push(items[i]);
            //     }
            //     if(items[i].index_type == 'no_tag'){
            //         _item.push(items[i]);
            //     }
            // }
            return {
                // hot : items
                item: items
                // tags : _this.getTags(items).tags
            };
        }
    };
    I.init(init_data);
})
