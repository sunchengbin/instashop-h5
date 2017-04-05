/**
 * Created by sunchengbin on 16/10/20.
 */
/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang', 'lazyload', 'ajax', 'config', 'base', 'common', 'fastclick', 'item', 'dialog', 'debug', 'oauth', 'cache', 'sharebargain'], function (Lang, Lazyload, Ajax, Config, Base, Common, Fastclick, Item, Dialog, Debug, Oauth, Cache, Sharebargain) {
    var ITEM = {
        init: function () {
            var _this = this;
            _this.invite_params = _this.getInviteId();
            window.Oauth = Oauth;
            window.Cache = Cache;
            // 判断是否登录
            _this.loginResultPackage = _this.checkIsLogin();
            $(".price").html(_this.transPriceByBargain(~~init_data.bargain_invite_detail.bargain_result));
            _this.bargainInviteStorage = new Cache({
                namespace: "BargainInvite"
            });
            _this.handleFn();
        },
        getInviteId: function () { //获取url
            var _href = location.href,
                _invite_id = _href.split('?')[0].split('/').slice(-1)[0];
            if (/\_/g.test(_invite_id)) {
                _invite_id = _invite_id.split('_')[0];
            }
            return {
                href_id: _href.split('?')[0].split('/').slice(-1)[0],
                invite_id: _invite_id
            };
        },
        /**
         * 获取用户信息 获取本地存储中的用户信息 如果两个值不同 设置页面为未登录状态
         */
        checkIsLogin: function () {
            // 获取回传的用户信息
            var loginInfoFromCallBackPost = user_info;
            // 获取存储空间 登录
            var loginInfoFromCache = Cache.getSpace("FriendLoginCache") || new Cache({
                namespace: "FriendLoginCache",
                type: "local"
            });
            // 如果url中有用户信息 说明刚登录完成 更新ui 更新本地存储用户信息
            if (!!loginInfoFromCallBackPost.buyer_id && !!loginInfoFromCallBackPost.name && !!loginInfoFromCallBackPost.pic) {
                loginInfoFromCache.set("friendLoginInfo", loginInfoFromCallBackPost);
                return {
                    result: true,
                    info: loginInfoFromCallBackPost
                }
            } else {
                var loginInfo = loginInfoFromCache.find("friendLoginInfo");
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
        // 计算砍价幅度 如果登录 则获取remote_bargain_detail中的 如果未登录 获取本地的
        getBargainAmplitudePrice: function () {
            return ~~init_data.bargain_invite_detail.bargain_result;
        },
        // 价格html
        transPriceByBargain: function (_amplitudePrice) {
            var _htm = "",
                _this = this,
                amplitudePrice;
            if (amplitudePrice) {
                amplitudePrice = _amplitudePrice;
            } else {
                amplitudePrice = _this.getBargainAmplitudePrice();
            }
            // 如果不是sku 
            // if (!init_data.bargain_invite_detail.item_info.sku.length > 0) {
            //     var _after_bargain_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.price - ~~amplitudePrice);
            //     var _item_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.price);
            //     _htm = "Rp " + _after_bargain_price + " <span class='bargain-origin-price'> Rp " + _item_price + "</span>";
            // } else {
            //     var _min_after_bargain_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.min_price - ~~amplitudePrice);
            //     var _max_after_bargain_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.max_price - ~~amplitudePrice);
            //     var _min_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.min_price);
            //     var _max_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.max_price);
            //     _minPriceBargainHtm = "<p>Rp " + _min_after_bargain_price + " <span class='bargain-origin-price-sku'> Rp " + _min_price + "</span></p>";
            //     _maxPriceBargainHtm = "<p>Rp " + _max_after_bargain_price + " <span class='bargain-origin-price-sku'> Rp " + _max_price + "</span></p>";
            //     _htm = _minPriceBargainHtm + _maxPriceBargainHtm;
            // }

            if (~~init_data.bargain_invite_detail.item_info.min_price == ~~init_data.bargain_invite_detail.item_info.max_price) {
                var _after_bargain_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.price - ~~amplitudePrice);
                var _item_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.price);
                _htm = "Rp " + _after_bargain_price + " <span class='bargain-origin-price'> Rp " + _item_price + "</span>";
            } else {
                var _min_after_bargain_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.min_price - ~~amplitudePrice);
                var _max_after_bargain_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.max_price - ~~amplitudePrice);
                var _min_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.min_price);
                var _max_price = Base.others.priceFormat(~~init_data.bargain_invite_detail.item_info.max_price);
                _minPriceBargainHtm = "<p>Rp " + _min_after_bargain_price + " <span class='bargain-origin-price-sku'> Rp " + _min_price + "</span></p>";
                _maxPriceBargainHtm = "<p>Rp " + _max_after_bargain_price + " <span class='bargain-origin-price-sku'> Rp " + _max_price + "</span></p>";
                _htm = _minPriceBargainHtm + _maxPriceBargainHtm;
            }

            return _htm;
        },
        createBargainPriceDialogHtm: function () {
            var _htm = "";
            _htm = '<div class="bargain-howprice-wrap">' +
                '   <p><img src="' + Config.host.imgUrl + '/app/bargain.png" /></p>' +
                '   <p class="bargain-amplitude-price-tip">Selamat, kamu telah menawar:</p>' +
                '   <p class="bargain-amplitude-price j_bargain_amplitude_price"></p>' +
                '   <div class="j_btn_confrim_bargain_price">Saya mengerti</div>' +
                '</div>'
            return _htm;
        },
        handleFn: function () {
            var _this = this;
            Fastclick.attach(document.body);
            $("body").on("click", ".j_bargain_btn_invite_help", function () {
                if (_this.loginResultPackage.result) {
                    // 登录了
                    var _localBargainInviteStorage = _this.bargainInviteStorage.find("bargainInvite") || {};
                    // 判断是否砍过
                    if (_localBargainInviteStorage[init_data.bargain_invite_detail.bargain_info.id]) {
                        // 砍过 弹出分享框
                        Sharebargain({
                            title: Lang.BARGAIN_DETAIL_INVITE_TIP,
                            content: "Hi, aku lagi ikutan promo tawar " + init_data.bargain_invite_detail.item_info.item_name + " sampai " + "Rp " + Base.others.priceFormat(init_data.bargain_invite_detail.bargain_info.base_price) + " nih! Bantu aku tawar yuk. Klik ",
                            bargain_inv_url: location.href
                        });

                    } else {
                        _this.cutPrice();
                    }
                } else {
                    // 未登录
                    Oauth.openDialog();
                }

            })
            $("body").on("click", ".j_btn_confrim_bargain_price", function () {
                location.reload();
            })
            $("body").on("click", ".j_bargain_btn_invite_self", function () {
                location.href = init_data.bargain_invite_detail.item_info.h5_url;
            })
        },
        cutPrice: function () {
            var _this = this;

            var _reqData = {
                edata: {
                    "action": "bargain", //这里要传action
                    "bargain_invite_id": _this.invite_params.invite_id,
                    "buyer_id": _this.loginResultPackage.info.buyer_id,
                    "uss": _this.loginResultPackage.info.uss
                }
            }
            Debug.log({
                title: "砍一刀请求参数",
                data: _reqData.edata
            })
            Ajax.postJsonp({
                url: Config.actions.bargain,
                data: {
                    param: JSON.stringify(_reqData)
                },
                type: 'POST',
                timeout: 30000,
                success: function (obj) {
                    if (200 == obj.code) {
                        // 本地存储砍了是否砍过
                        var _curBargain = {};
                        _curBargain[init_data.bargain_invite_detail.bargain_info.id] = init_data.bargain_invite_detail.bargain_info;
                        _this.bargainInviteStorage.set("bargainInvite", _curBargain);
                        // 弹出砍了多少钱
                        Dialog.dialog({
                            body_txt: _this.createBargainPriceDialogHtm(),
                            show_footer: false,
                            body_fn: function () {
                                // 回填价格
                                $(".j_bargain_amplitude_price").text("Rp " + Base.othes.priceFormat(obj.price));
                            },
                            c_fn: function () {
                                location.reload();
                            }
                        })
                    } else {
                        Sharebargain({
                            title: Lang.BARGAIN_DETAIL_INVITE_TIP,
                            content: "Hi, aku lagi ikutan promo tawar " + init_data.bargain_invite_detail.item_info.item_name + " sampai " + "Rp " + Base.others.priceFormat(init_data.bargain_invite_detail.bargain_info.base_price) + " nih! Bantu aku tawar yuk. Klik ",
                            bargain_inv_url: location.href
                        });
                    }
                }
            })
        }
    };
    ITEM.init();
})
