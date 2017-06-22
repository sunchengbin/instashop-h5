/**
 * Created by sunchengbin on 2017/6/20.
 * app内嵌分销商商品详情页js
 */
require(['lang', 'lazyload', 'ajax', 'config', 'base', 'common', 'buyplug', 'slide', 'cart', 'fastclick', 'contact', 'viewer', 'item', 'dialog', 'debug'], function (Lang, Lazyload, Ajax, Config, Base, Common, Buyplug, Slide, Cart, Fastclick, Contact, Viewer, Item, Dialog, Debug) {
    var ITEM = {
        init: function () {
            var _this = this;
            if (init_data && init_data.code == 200) {

                if ($('.j_show_contact').length) {
                    var _contact_data = {
                        tel: init_data.item.shop.phone,
                        line: init_data.item.shop.line_url,
                        whatsapp:init_data.item.shop.whatsapp_url
                    };
                    _this.contact = Contact({
                        data: _contact_data,
                        btn:'.j_show_contact',
                        lang: Lang
                    });

                }
                try {
                    Lazyload();

                    //商品图片轮播初始化
                    var _slide = Slide.createNew({
                        dom: document.querySelector('.j_banner'),
                        needTab: true,
                        auto: false
                    });
                    //添加到购物车插件
                    Buyplug({
                        data:init_data,
                        is_direct_buy:2,
                        noStockCallback: function () {
                            if ($('.j_show_contact').length) {
                                _this.contact && _this.contact.createHtm({
                                    data: _contact_data,
                                    lang: Lang
                                }).toShow();
                            } else {
                                location.href = init_data.item.shop.line_url;
                            }
                        }
                    });
                    //点击轮播图查看原图初始化
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
            //初始化fastclick事件
            Fastclick.attach(document.body);
            var _this = this;
            //查看店铺描述
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
            //查看购物车
            $('body').on('click', '.j_cart_wraper', function () {
                var _this = $(this),
                    _url = _this.attr('data-url');
                PaqPush && PaqPush('查看购物车', '');
                Common.saveCartFromUrl(function () {
                    location.href = _url;
                });
            });
            //通过line联系供货商
            $('body').on('click', '.j_goto_line', function () {
                location.href = init_data.item.shop.line_url;
            })
            //保存商品照片
            $('body').on('click', '.j_save_imgs', function () {

            })
        }
    };
    ITEM.init();
})
