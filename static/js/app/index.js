/**
 * Created by sunchengbin on 16/6/6.
 * 首页
 */
require(['lang', 'lazyload', 'ajax', 'config', 'base', 'common', 'cart', 'fastclick', 'contact', 'slide', 'item', 'dialog', 'sharecoupon', 'tab', 'debug', 'viewer', 'oauth', 'cache'], function (Lang, Lazyload, Ajax, Config, Base, Common, Cart, Fastclick, Contact, Slide, Item, Dialog, Sharecoupon, Tab, Debug, Viewer, Oauth, Cache) {
    var Default_Page_Size = 18;
    var _eventPreventDefault = function (e) {
        e.preventDefault();
    };

    var I = {
        indexItemsPagination: {
            page_size: Default_Page_Size,
            page_num: 2,
            getData: true
        },
        allItemsPagination: {
            page_size: Default_Page_Size,
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
            var _this = this;

            _this.loginResult = Oauth.checkIsLogin();
            _this.lazyload = Lazyload();
            if (!Base.others.getUrlPrem('pt')) {
                localStorage.removeItem('index_route_info');
            }
            _this.item_type = Common.getItemListType(init_data.template);
            _this.sortTimes = 0;
            if (init_data) {
                //初始化店铺数据到localStorage
                Common.initShopInfo(init_data);
                //显示购物车角标
                //Cart().getCartNum(function(num){
                //    if (num != 0) {
                //        num = num > 9?'9+':num;
                //        $('.j_cart_wraper').append('<span class="cart-num">' + num + '</span>');
                //    }
                //});
                //插入模板中的轮播图js初始化
                if (route_pt == 1 || route_pt == undefined) {
                    _this.initRotateBanner();
                }
            }
            //初始化实体店铺图
            if (shop_info_data.shop.realinfo && shop_info_data.shop.realinfo.imgs.length > 0) {
                _this.initShopInfoImgSlideBanner();
            }
            //获取url信息.index.tpl中有记录
            _this.route_info.route_pt = route_pt || 1;
            _this.route_info.route_ct = route_ct || 0;
            _this.route_info.route_page_num = route_page_num || 2;
            _this.route_info.route_page_size = route_page_size || 10;

            Debug.log("路由信息", _this.route_info);

            _this.initTab();
            _this.handleFn();
            _this.checkIsShowGuide();
        },
        initTab: function () {
            var _this = this,
                _allItemsDefaultTab = 1;
            //首页tab
            if (_this.route_info.route_pt == 1) {
                _this.tagInfo.curTab = "index_template";
                _this.indexItemsPagination.page_num = _this.route_info.route_page_num;
            }
            //全部商品
            if (_this.route_info.route_pt == 2) {
                _this.tagInfo.curTab = "index_allitems";
                _this.allItemsPagination.page_num = _this.route_info.route_page_num + 1;
                if (_this.route_info.route_ct) {
                    switch (_this.route_info.route_ct) {
                        case 0:
                            _this.tagInfo.curTab = "bycomplex";
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_DEFAULT;
                            break;
                        case 1:
                            _this.tagInfo.curTab = "bydate";
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_ADDTIME;
                            _allItemsDefaultTab = 2;
                            break;
                        case 2:
                            _this.tagInfo.curTab = "bypricel2h";
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_PRICE_L2H;
                            _allItemsDefaultTab = 3; //低到高
                            break;
                        case 3:
                            _this.tagInfo.curTab = "bypriceh2l";
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_PRICE_H2L;
                            _allItemsDefaultTab = 3; //高到低
                            break;
                        default:
                            _this.allItemsPagination.orderby = Config.businessCodes.ORDER_BY_DEFAULT;
                            break;
                    }
                }
            }
            //店铺信息tab下
            if (_this.route_info.route_pt == 3) {
                _this.tagInfo.curTab = "index_shopinfo";
                if (shop_info_data.shop.realinfo && !!shop_info_data.shop.realinfo.location.vicinity) {
                    _this.createMapIframe("._shopinfo-map-el");
                }
                $(".shopinfo-store-banner").width($(".shopinfo-banner-box").width());
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
                    _this.tagInfo.curTab = switchInfo.tabalias;
                    if ("index_shopinfo" == _this.tagInfo.curTab) {
                        if (shop_info_data.shop.realinfo && !!shop_info_data.shop.realinfo.location.vicinity) {
                            _this.createMapIframe("._shopinfo-map-el");
                        }
                        $(".shopinfo-store-banner").width($(".shopinfo-banner-box").width());
                    }
                    PaqPush && PaqPush('首页父级导航tab-' + _this.tagInfo.curTab, '');
                    Debug.log("切换信息:", switchInfo)
                    if (route_pt != 1) {
                        if (_this.tagInfo.curTab == "index_template") {
                            _this.initRotateBanner();
                        }
                    }
                }
            });
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
                    PaqPush && PaqPush('首页全部商品二级导航tab-' + _this.tagInfo.curTab, '');
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
                    $('.all-items-wrap .j_all_list').html("");
                    //重置分页计数
                    _this.allItemsPagination.page_num = 1;
                    _this.allItemsPagination.getData = true;
                    _this.getAllItem({
                        page_size: _this.allItemsPagination.page_size,
                        page_num: _this.allItemsPagination.page_num, //子tab切换默认第一页
                        orderby: _this.allItemsPagination.orderby,
                        filter: _this.allItemsPagination.filter
                    }, function () {
                        _this.continueLoad = true;
                    });
                },
                defaultFn: function () {

                }
            });
        },
        //店铺详情banner
        initShopInfoImgSlideBanner: function () {
            var _this = this;
            var _shopInfoImgs = shop_info_data.shop.realinfo.imgs;
            _this._groupImgs = [];
            _this.groupArrayByNumber(_shopInfoImgs, 3, _this._groupImgs);
            _this.createShopInfoSlierDom();
            Slide.createNew({
                dom: document.querySelector(".j_store_banner"),
                needTab: true,
                auto: false,
                switchFn: function (curPage) {
                    Debug.log("当前slidepage", curPage);
                    _this.shopStorePicViewer && (_this.shopStorePicViewer.config.images = _this._groupImgs[curPage - 1])
                }
            });
            _this.shopStorePicViewer = Viewer({
                btn: '.shopinfo-store-banner li',
                images: _this._groupImgs[0] //shop_info_data.shop.realinfo.imgs
            }).init();
        },
        //创建店铺详情实体店图片
        createShopInfoSlierDom: function () {
            var _this = this,
                $store_banner = $(".j_store_banner");
            for (var i = 0; i < _this._groupImgs.length; i++) {
                //组
                var _curGroup = _this._groupImgs[i];
                var _curLi = $("<li></li>");
                // var _curUl = $('<ul class="shopinfo-store-banner ins-avg-sm-3 ins-avg-md-3 ins-avg-lg-3"></ul>');
                var _curUl = $('<ul class="shopinfo-store-banner three-items-list"></ul>');
                _curLi.appendTo($store_banner);
                _curLi.append(_curUl);
                for (var j = 0; j < _curGroup.length; j++) {
                    var _curImg = _curGroup[j];
                    // _curUl.append($('<li data-num="'+j+'" data-src="' + _curImg + '"><img data-img="' + _curImg + '"/></li>'));
                    _curUl.append($('<li data-num="' + j + '" data-src="' + _curImg + '"><div class="lazy" style="background-image:url(' + Base.others.cutImg(_curImg) + ')"></div></li>'));
                }
            }
        },
        //实体店图片数组
        groupArrayByNumber: function (array, number, receiveArray) {
            var _this = this;
            if (array.length == 0) return receiveArray;
            var _array = [];
            for (var i = 0; i < number; i++) {
                if (array.length == 0) break;
                _array.push(array.shift());
            }
            receiveArray.push(_array);
            if (array.length > 0) _this.groupArrayByNumber(array, number, receiveArray);
        },
        //创建实体店map
        createMapIframe: function (el) {
            $(el).empty();
            var _this = this;
            var _urlHead = Config.host.maphost + '/html/googlemap.html?';
            var _lat = shop_info_data.shop.realinfo.location.lat || 0;
            var _lng = shop_info_data.shop.realinfo.location.lng || 0;
            var _googleMap$Dom = '<iframe src="' + _urlHead + 'lat=' + _lat + '&lng=' + _lng + '" frameborder="0"></iframe>';
            var $iframe = $(_googleMap$Dom);
            $(el).append($iframe);
        },
        //获取首页数据
        getRecommendItem: function (paginationOpt, callback) {
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
            //if(init_data.item_list.length >= _this.indexItemsPagination.page_size){
            //    _this._loading = Dialog.loading({
            //        width: 100,
            //        is_cover: true
            //    });
            //}
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.shopList + init_data.shop.id + '?param=' + JSON.stringify(reqData), function (obj) {
                if (obj.code == 200) {
                    if (obj.item_list.list.length > 0) {
                        _this.indexItemsPagination.page_num++;
                        var _list_data = _this.transItems(obj.item_list.list);
                        if (_list_data.item.length) {
                            $('.j_hot_list').append(Item.addItem(_list_data.item,_this.item_type));
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
                //_this._loading.remove();
                callback && callback();
            }, function (error) {
                //_this._loading.remove();
                callback && callback();
                _this.indexItemsPagination.getData = true;
            });
        },
        //获取全部商品
        getAllItem: function (paginationOpt, callback) {
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
            _this._loading = Dialog.loading({
                width: 100,
                is_cover: true
            });
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.shopList + init_data.shop.id + '?param=' + JSON.stringify(reqData), function (obj) {
                if (obj.code == 200) {
                    if (obj.item_list.list.length > 0) {
                        _this.allItemsPagination.page_num++;
                        var _list_data = obj.item_list.list;
                        if (_list_data.length) {
                            $('.all-items-wrap .j_all_list').append(Item.addItem(_list_data, _this.item_type));
                        }
                        if ($('[data-time]').length) {
                            Item.changeTime();
                        }
                        _this.allItemsPagination.getData = true;
                    } else {
                        _this.allItemsPagination.getData = false;
                    }
                    _this.lazyload.lazyLoadImage();
                } else {
                    _this.allItemsPagination.getData = true;
                }
                _this._loading.remove();
                callback && callback();
            }, function (error) {
                _this.allItemsPagination.getData = true;
                _this._loading.remove();
                callback && callback();
            });
        },
        //初始化模板中的轮播图
        initRotateBanner: function () {
            var _banners = document.querySelectorAll('.j_banner'),
                _len = _banners.length,
                _this = this;
            console.log(_this.isInitBanner);
            if (_this.isInitBanner) {
                return;
            }
            _this.isInitBanner = true;
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
        //设置从购物车页面/商品详情页/分类页面,跳回首页的tab和页面翻页信息
        setRouteInfo: function () {
            var _this = this,
                _route_info_str = "";
            var _routeInfo = _this.getRouteInfo();
            _route_info_str = "&pt=" + _routeInfo.pt + "&ct=" + _routeInfo.ct + "&page_num=" + _routeInfo.page_num + "&page_size=" + _routeInfo.page_size;
            localStorage.setItem("index_route_info", _route_info_str);
        },
        //获取本地的tab和翻页信息
        getRouteInfo: function () {
            var _this = this;
            var _routeInfo = {};
            switch (_this.tagInfo.curTab) {
                case "index_template":
                    _routeInfo.pt = 1; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_DEFAULT; //综合
                    _routeInfo.page_num = _this.indexItemsPagination.page_num;
                    _routeInfo.page_size = _this.indexItemsPagination.page_size;
                    break;
                case "index_allitems":
                    _routeInfo.pt = 2; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_DEFAULT; //综合
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                case "bycomplex":
                    _routeInfo.pt = 2; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_DEFAULT; //综合
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                case "bydate":
                    _routeInfo.pt = 2; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_ADDTIME; //时间
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                case "bypricel2h":
                    _routeInfo.pt = 2; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_PRICE_L2H; //由低到高
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                case "bypriceh2l":
                    _routeInfo.pt = 2; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_PRICE_H2L; //由高到低
                    _routeInfo.page_num = _this.allItemsPagination.page_num;
                    _routeInfo.page_size = _this.allItemsPagination.page_size;
                    break;
                case "index_shopinfo":
                    _routeInfo.pt = 3; //
                    _routeInfo.ct = 0; //
                    _routeInfo.page_num = 1;
                    _routeInfo.page_size = 10;
                    break;
                default:
                    _routeInfo.pt = 1; //index_template 
                    _routeInfo.ct = Config.businessCodes.ORDER_BY_DEFAULT; //综合
                    _routeInfo.page_num = _this.indexItemsPagination.page_num;
                    _routeInfo.page_size = _this.indexItemsPagination.page_size;
                    break;
            }
            return _routeInfo;
        },
        handleFn: function () {
            var page_num = 2,
                _this = this,
                _that = this,
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
            $('body').on('click', '.j_share_btn', function () {
                PaqPush && PaqPush('分享获取优惠券', '');
                var _coupon_id = $(this).attr('data-couponid');
                Sharecoupon({
                    coupon_url: Config.host.host + 'b/' + _coupon_id
                });
            });
            _that.continueLoad = true;
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
                            _this.getRecommendItem(_this.indexItemsPagination, function () {
                                _that.continueLoad = true;
                            });
                            break;
                        case "index_allitems":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination, function () {
                                _that.continueLoad = true;
                            });
                            break;
                        case "bycomplex":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination, function () {
                                _that.continueLoad = true;
                            });
                            break;
                        case "bydate":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination, function () {
                                _that.continueLoad = true;
                            });
                            break;
                        case "bypricel2h":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination, function () {
                                _that.continueLoad = true;
                            });
                            break;
                        case "bypriceh2l":
                            Debug.log("请求全部商品", _this.allItemsPagination)
                            _this.getAllItem(_this.allItemsPagination, function () {
                                _that.continueLoad = true;
                            });
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
                    //_url = Common.transFromUrl(_url);
                }
                localStorage.setItem('ScrollTop', _scroll_top);
                _that.setRouteInfo();
                Common.saveFromUrl(function () {
                    location.href = _url;
                });
            });
            $('body').on('click', '.j_cart_wraper', function () {
                var _this = $(this),
                    _url = _this.attr('data-url');
                localStorage.setItem('ScrollTop', $(window).scrollTop());
                _that.setRouteInfo();
                Common.saveCartFromUrl(function () {
                    location.href = _url;
                });
            });
            $('body').on('click', '.j_my_order', function () {
                var _this = $(this),
                    _url = _this.attr('data-url');
                var loginResult = _that.loginResult;
                if (loginResult.result) {
                    localStorage.setItem('ScrollTop', $(window).scrollTop());
                    _that.setRouteInfo();
                    Common.saveFromUrl(function () {
                        location.href = _url + "?buyer_id=" + loginResult.info.buyer_id + "&uss=" + loginResult.info.uss + "&seller_id=" + init_data.shop.id;
                    });
                } else {
                    Oauth.openDialog();
                }

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
                var _discount = init_data.shop.shop_discount;
                if (!!_discount) {
                    switch (_discount.discount_type) {
                        case "percent":
                            var _percentInfo = _discount.info[0];
                            _htm += 'Minimal Pembelian Rp ' + Base.others.priceFormat(_percentInfo.condition_price) + ' akan mendapat potongan - ' + _percentInfo.discount_percent + '%.';
                            _htm += '<li><span></span>' + $(".reduc-expire-discount").text() + '</li></ul>'
                            break;
                        case "price":
                            for (var i = 0, _reducItem; _reducItem = init_data.shop.shop_discount.info[i++];) {
                                _htm += "<li><span></span>Minimal Pembelian Rp " + Base.others.priceFormat(_reducItem.condition_price) + " Potongan Rp " + Base.others.priceFormat(_reducItem.discount_price) + "</li>"
                            }
                            _htm += '<li><span></span>' + $(".reduc-expire-discount").text() + '</li></ul>'
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
            $('body').on('click', '.j_search_btn', function () {
                var _val = $.trim($('.j_search_ipt').val());
                if (!_val) {
                    return;
                }
                location.href = Config.hrefUrl + 'search.php?key=' + encodeURIComponent(_val) + '&seller_id=' + init_data.shop.id;
            });
            localStorage.removeItem('FromUrl');
            if (localStorage.getItem('ScrollTop') && Base.others.getUrlPrem('item')) { //存在scrollTop时页面下滚到记忆中的top值
                _this.goScroll();
            }
            if ($('.j_show_contact').length) {
                _this.contact = Contact({
                    data: {
                        tel: !init_data.shop.line_url && !init_data.shop.phone ? '' : init_data.shop.phone,
                        line: init_data.shop.line_url,
                        whatsapp:init_data.shop.whatsapp_url
                    },
                    lang: Lang,
                    btn:'.j_show_contact'
                });
            }
            //修正因标签属性href有值的问题导致被追加spider参数 line中user not find的问题
            $('body').on('click', '.j_goto_line', function () {
                location.href = init_data.shop.line_url;
            });
            $("body").on("click", ".j_close_guide", function () {
                $(".order-guide-cover").hide();
                $(".order-guide-info-wrap").hide();
                var IndexCoverCache = Cache.getSpace("IndexCache") || new Cache({
                    namespace: "IndexCache",
                    type: "local"
                });
                IndexCoverCache.set("isShowOrderGuid", 2);
                _this.allowPageScroll();
            })

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
        checkIsShowGuide: function () {
            var _this = this;
            var IndexCoverCache = Cache.getSpace("IndexCache") || new Cache({
                namespace: "IndexCache",
                type: "local"
            });
            if (init_data.shop.warrant_flag == 1) {
                var isShowOrderGuid = IndexCoverCache.find("isShowOrderGuid");
                // 有值 且 值为1
                if (isShowOrderGuid != void(0) && isShowOrderGuid == 1) {
                    $(".order-guide-info-wrap").show();
                    Base.others.coverGuide(document.querySelector(".order-guide-cover"), document.querySelector(".j_my_order"));
                    var $coverInfoWrap = $(".order-guide-info-wrap");
                    var $coverGuideArrow = $(".order-guide-arrow");
                    var $orderGuideCover = $(".order-guide-cover");

                    var coverInfoWrapWidth = $coverInfoWrap.offset().width;
                    var coverGuideArrowWidth = $coverGuideArrow.offset().width;
                    var coverGuideCoverWidth = ~~$orderGuideCover[0].style.width.replace("px", "");

                    var offsetRight = coverGuideArrowWidth + coverGuideCoverWidth;
                    $coverInfoWrap.css("right", (offsetRight - 30) + "px")
                    $coverGuideArrow.css("right", "-" + (coverGuideArrowWidth) + "px");
                    $(".order-guide-info-wrap").show();
                    _this.disablePageScroll();
                    // IndexCoverCache.set("isShowOrderGuid",2);
                }
            }
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
        },
        disablePageScroll: function () {
            var dom = document;
            dom.querySelector("html").style.overflow = "hidden";
            dom.addEventListener("touchmove", _eventPreventDefault, false);
        },
        allowPageScroll: function () {
            var dom = document;
            dom.querySelector("html").style.overflow = "auto";
            dom.removeEventListener("touchmove", _eventPreventDefault, false);
        }
    };
    I.init(init_data);
})
