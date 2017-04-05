/**
 * 砍价模块
 */
define([
    'base',
    'config',
    'ajax',
    'cache',
    'dialog',
    'lang',
    'oauth',
    'sharebargain',
], function (Base, Config, Ajax, Cache, Dialog, Lang, Oauth, Sharebargain) {
    'use strict';
    var Bargain = function (opts) {
        var _this = this;
        _this.config = $.extend({
            bargain: {}
        }, opts);
        _this.init();
    }
    Bargain.prototype = {
        init: function () {
            var _this = this;
            window.Oauth = Oauth;
            window.Cache = Cache;
            _this.loginResultPackage = Oauth.checkIsLogin();
            _this.bargainCache = _this.bargainCache = Cache.getSpace("BargainCache") || new Cache({
                namespace: "BargainCache",
                type: "local"
            });
            // 判断是否有砍价活动
            if (init_data.item.bargain) {

                // 判断有没有砍到底价
                var _amplitude = _this.computeBargainPrice();
                if (Bargain.isReachBaseprice(init_data.item.min_price, _amplitude.price_origin, init_data.item.bargain.base_price)) {
                    $(".j_bargain_reachbaseprice").show();
                    $(".j_bargain_btn_self").hide();
                    $(".j_bargain_btn_continue").hide();
                } else {
                    $(".j_bargain_reachbaseprice").hide();
                    // 判断自己有没有砍一刀
                    if (_this.checkIsBargainSelf()) {
                        // 有的话 显示继续砍价按钮 更新价格视图
                        $(".price").html(_this.transPriceByBargain());
                        $(".j_bargain_btn_continue").show();
                        $(".j_bargain_btn_self").hide();
                    } else {
                        // 没有 显示我要砍价
                        $(".j_bargain_btn_continue").hide();
                        $(".j_bargain_btn_self").show();
                    }
                }

                //判断是否登录
                if (_this.loginResultPackage.result) {
                    // 如果已登录 且有 砍价活动 则请求h5 砍价活动明细 并保存到明细中
                    var _self_bargain_price = _this.bargainCache.find("bargain_price_self");
                    _this.updateRemoteBargainPrice(_self_bargain_price);
                } else {
                    // 如果没有登录的话 先检查有没有本地砍价 有的话 显示继续砍价按钮 没有 显示我要砍价
                }
            }
            _this.handleFn();
        },
        showFriendHelpList: function (bargainDetail) {
            var _bargainHelpFriends = bargainDetail.bargain_detail || [];
            var _htm = '<div class="friend-avatars">';
            if (_bargainHelpFriends.length != 0) {
                $.each(_bargainHelpFriends, function (index, friend) {
                    if (index <= 2) {
                        if (!!friend.buyer_info.pic) {
                            _htm += '<img src="' + friend.buyer_info.pic + '" alt="">'
                        }
                    }
                })
                _htm += ' <div class="friend-bargain-info">' +
                    '       <p>' + _bargainHelpFriends[0].buyer_info.name + ' dkk telah membantumu menawar Rp ' + Base.others.priceFormat(bargainDetail.bargain_result) + '</p>' +
                    '    </div>'
                _htm += '<i class="icon iconfont fr icon-go-font"></i>' +
                    '</div>';
                $(".bargain-friend-list-container").html(_htm).show();
                $(".bargain-friend-list-container").on('click', function () {
                    location.href = bargainDetail.bargain_share_url;
                })
            }
        },
        /**
         * 更新商品信息 将bargain注入到价格信息中
         */
        updateRemoteBargainPrice: function (_self_bargain_price) {
            var _this = this;
            var reqParams = {
                edata: {
                    "_debug_env": "4.5",
                    "action": "h5_detail",
                    "buyer_id": _this.loginResultPackage.info.buyer_id,
                    "price": _self_bargain_price || 0, //自砍一刀的价格，如果没有自砍，就传0
                    "uss": _this.loginResultPackage.info.uss
                }
            }
            var url = Config.host.actionUrl + Config.actions.bargain + "/" + _this.config.bargain.id + "?param=" + JSON.stringify(reqParams);
            Ajax.getJsonp(url, function (obj) {
                if (200 == obj.code) {
                    console.log(obj.bargain_invite_detail)
                    _this.bargainCache.set("remote_bargain_detail", obj.bargain_invite_detail);
                    _this.showFriendHelpList(obj.bargain_invite_detail);
                    //更新result价格
                    $(".price").html(_this.transPriceByBargain(obj.bargain_invite_detail.bargain_result));
                }
            }, function () {

            })
        },
        handleFn: function () {
            var _this = this;
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
                        _this.bargainCache.set("bargain_price_self", _amplitude.price_origin);
                    },
                    c_fn: function () {
                        location.reload();
                    }
                })
            })
            // 登录
            $("body").on("click", ".j_user_login", function () {
                Oauth.openDialog();
            })
            // 砍了多少钱的弹窗 确认按钮 点击刷新
            $("body").on("click", ".j_btn_confrim_bargain_price", function () {
                location.reload();
            })
            $("body").on("click", ".j_bargain_btn_continue", function () {
                // 判断是否登录 登录 弹出 分享 
                if (_this.loginResultPackage.result) {
                    Sharebargain({
                        title: Lang.BARGAIN_DETAIL_INVITE_TIP,
                        content: "Hi, aku lagi ikutan promo tawar " + init_data.item.item_name + " sampai " + "Rp " + Base.others.priceFormat(_this.config.bargain.base_price) + " nih! Bantu aku tawar yuk. Klik ",
                        bargain_inv_url: _this.bargainCache.find("remote_bargain_detail").bargain_share_url,
                        c_fn: function () {
                            //判断是否用户有手机号 如果有 则不提示 如果没有则提示
                            if (_this.loginResultPackage.info.telephone.length == 0) {
                                _this.submitBargainPhone = Dialog.dialog({
                                    body_txt: '<div>' +
                                        '<div class="">' + Lang.BARGAIN_SHARE_AFTER_PHONE + '</div>' +
                                        '<div class="bargain-phone-input clearfix ins-m-t-3"><span class="fl">+62</span> <input type="text" class="j_bargain_inv_telphone fr" /></div>' +
                                        '<div class="bargain-phone-button j_bargain_inv_submit_telphone">Ya</div>' +
                                        '</div>',
                                    show_footer: false,
                                    show_top: false
                                })
                            }
                        }
                    });
                } else {
                    Oauth.openDialog();
                }
                // 未登录 弹出 去登录 
            })
            $("body").on("click", ".j_bargain_inv_submit_telphone", function () {
                //获取手机号
                var _bargainTelphone = $.trim($(".j_bargain_inv_telphone").val());
                //校验手机号 TODO
                //提交手机号
                var _reqParam = {
                    edata: {
                        "action": "addphone",
                        "uss": _this.loginResultPackage.info.uss,
                        "buyer_id": _this.loginResultPackage.info.buyer_id,
                        "telephone": _bargainTelphone
                    }
                }
                Ajax.postJsonp({
                    url: Config.actions.oauth,
                    data: {
                        param: JSON.stringify(_reqParam)
                    },
                    type: 'POST',
                    timeout: 30000,
                    success: function (obj) {
                        if (200 == obj.code) {
                            //更新本地用户信息
                            Cache.getSpace("LoginCache").set("loginInfo", obj.buyer);
                            _this.submitBargainPhone.remove();
                        }
                    }
                })
            })
        },
        /**
         * 检查是否本地自己砍过价
         */
        checkIsBargainSelf: function () {
            var _this = this,
                _bargain_price_self;
            if (_this.bargainCache) {
                _bargain_price_self = _this.bargainCache.find("bargain_price_self");
                if (!!_bargain_price_self) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        /**
         * 转换价格根据砍价幅度
         */
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
            if (!init_data.item.sku.length > 0) {
                var _after_bargain_price = Base.others.priceFormat(~~init_data.item.price - ~~amplitudePrice);
                var _item_price = Base.others.priceFormat(~~init_data.item.price);
                _htm = "Rp " + _after_bargain_price + " <span class='bargain-origin-price'> Rp " + _item_price + "</span>";
            } else {
                // 如果存在sku
                var _min_after_bargain_price = Base.others.priceFormat(~~init_data.item.min_price - ~~amplitudePrice);
                var _max_after_bargain_price = Base.others.priceFormat(~~init_data.item.max_price - ~~amplitudePrice);
                var _min_price = Base.others.priceFormat(~~init_data.item.min_price);
                var _max_price = Base.others.priceFormat(~~init_data.item.max_price);
                var _minPriceBargainHtm = "<p>Rp " + _min_after_bargain_price + " <span class='bargain-origin-price-sku'> Rp " + _min_price + "</span></p>";
                var _maxPriceBargainHtm = "<p>Rp " + _max_after_bargain_price + " <span class='bargain-origin-price-sku'> Rp " + _max_price + "</span></p>";
                _htm = _minPriceBargainHtm + _maxPriceBargainHtm;
            }
            return _htm;
        },
        // 计算砍价幅度 如果登录 则获取remote_bargain_detail中的 如果未登录 获取本地的
        getBargainAmplitudePrice: function () {
            var _bargain_result_price, _this = this;
            if (_this.loginResultPackage.result) {
                _bargain_result_price = _this.bargainCache.find("remote_bargain_detail") ? _this.bargainCache.find("remote_bargain_detail").bargain_result : 0;
            } else {
                _bargain_result_price = _this.bargainCache.find("bargain_price_self") || 0;
            }
            _bargain_result_price = _bargain_result_price;
            return _bargain_result_price;
        },
        // 根据砍价幅度计算sku 并存储到对应item中
        computeAndUpdateSkuPriceForBargain: function (originData) {
            var _this = this;
            var _bargain_result_price = _this.getBargainAmplitudePrice();

            // 有sku
            if (originData.item.sku.length > 0) {
                for (var i = 0; i < originData.item.sku.length; i++) {
                    var _curSku = originData.item.sku[i];
                    var _bargain = {
                        price: 0
                    }
                    _bargain.price = ~~_curSku.price - ~~_bargain_result_price;
                    _curSku.bargain = _bargain;
                }
            } else {
                // 无sku 商品价格重置为 原价减去砍价总幅度
                originData.item.bargain.price = ~~originData.item.price - ~~_bargain_result_price;
            }
            return originData;
        },
        /**
         * 砍了多少钱对话框 html
         */
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
        /**
         * 计算砍价幅度
         * @return Object price_origin:幅度无格式 price_format 格式化后格式
         */
        computeBargainPrice: function () {
            var _this = this;
            //自砍
            var _amplitude = (~~init_data.item.min_price - ~~_this.config.bargain.base_price) * 0.3;
            return {
                price_origin: ~~_amplitude,
                price_format: "Rp " + Base.others.priceFormat(_amplitude)
            };
        }
    }
    Bargain.checkIsHaveBargainItem = function (items) {
        var isHave = false;
        if (items) {
            $.each(items, function (key, item) {
                if (!!item.item.bargain) {
                    isHave = true;
                    return;
                }
            })
        }
        return isHave;
    }
    Bargain.isReachBaseprice = function (itemprice, amplitude, baseprice) {
        var isReach = false;
        isReach = (~~itemprice - ~~amplitude) <= ~~baseprice;
        return isReach;
    }


    return Bargain;
});
