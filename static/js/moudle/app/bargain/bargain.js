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
    'cookie'
], function (Base, Config, Ajax, Cache, Dialog, Lang, Oauth, Sharebargain,Cookie) {
    'use strict';
    var Bargain = function (opts) {
        var _this = this;
        _this.config = opts;
        _this.init();
    }
    Bargain.prototype = {
        init: function () {
            var _this = this;
            // 获取用户登陆信息{result boolean,info object}
            _this.loginResultPackage = Oauth.checkIsLogin();
            // 获取操作砍价活动本地数据操作的句柄
            _this.bargainCache = _this.bargainCache = Cache.getSpace("BargainCache") || new Cache({
                namespace: "BargainCache",
                type: "local"
            });
            var _origin_price = _this.origin_price = $(".price").html();
            // 判断是否 有砍价活动 且 在有效期内
            if (Bargain.checkIsHaveBargainProperty(init_data.item) && !Bargain.checkIsOverdue(init_data.item.bargain)) {
                // 判断是否登录
                if (_this.loginResultPackage.result) {
                    // 登录 获取用户砍价详情信息 幅度通过接口获取
                    var _oldBargainPrice = _this.getBargainAmplitudePrice();
                    _this.getLastBargainDetail(_oldBargainPrice, function (obj) {
                        // 用接口的更新本地
                        obj.bargain_invite_detail.id = init_data.item.bargain.id;
                        _this.bargainCache.set("remote_bargain_detail", obj.bargain_invite_detail);
                        // 判断是否真正参加活动-砍过价格
                        if (Bargain.isActualAttendBargain(init_data.item.bargain.id)) {
                            // 砍过价格
                            // 判断是否买过
                            if (!Bargain.checkIsLimitForLogin()) {
                                // 没有买过 可以参加活动
                                // 判断是否 到达底价
                                var _amplitude = _this.computeBargainPrice();
                                var _execAfterData = _this.computeAndUpdateSkuPriceForBargain(init_data)
                                if (Bargain.isReachBaseprice(init_data.item.min_price, _amplitude.price_origin, init_data.item.bargain.base_price)) {
                                    // 到达底价按钮显示
                                    $(".j_bargain_reachbaseprice").show();
                                    // 自砍一刀按钮隐藏
                                    $(".j_bargain_btn_self").hide();
                                    // 继续砍价按钮隐藏
                                    $(".j_bargain_btn_continue").hide();
                                } else {
                                    // 没到底价 砍价幅度
                                    // 到达底价按钮隐藏
                                    $(".j_bargain_btn_continue").show();
                                    $(".j_bargain_reachbaseprice").hide();
                                    $(".j_bargain_btn_self").hide();
                                }
                                _this.config.bargainBuyCallback(_execAfterData);
                                _this.showFriendHelpList(obj.bargain_invite_detail);
                                $(".price").html(_this.transPriceByBargain());
                            } else {
                                // 已经买过了 原价购买
                                Bargain.hideBargain();
                                var _execAfterData = _this.computeAndUpdateSkuPriceForBargain(init_data);
                                _this.config.normalBuyCallback(_execAfterData);
                            }
                        } else {
                            // case:用户登录后下单一个活动 然后再参加另外一个活动 此时用户为登录状态 默认请求一次砍价活动详情 但没有砍过价格 为未参加的状态
                            if (Bargain.isUnAttendBargain(init_data.item.bargain.id)) {
                                // 没有 显示我要砍价
                                $(".j_bargain_btn_continue").hide();
                                $(".j_bargain_btn_self").show();
                                var _execAfterData = _this.computeAndUpdateSkuPriceForBargain(init_data);
                                _this.config.normalBuyCallback(_execAfterData);
                            } else {
                                // case:参加的活动 检查本地是否砍过价
                                if (_this.checkIsBargainSelf()) {
                                    // 将价格同步一次
                                    var _price = _this.bargainCache.find("bargain_price_self")[init_data.item.bargain.id].amplitudeSelfPrice;
                                    _this.getLastBargainDetail(_price, function (obj) {
                                        obj.bargain_invite_detail.id = init_data.item.bargain.id;
                                        _this.bargainCache.set("remote_bargain_detail", obj.bargain_invite_detail);
                                        var _execAfterData = _this.computeAndUpdateSkuPriceForBargain(init_data);
                                        _this.config.bargainBuyCallback(_execAfterData);
                                        _this.showFriendHelpList(obj.bargain_invite_detail);
                                        // 有的话 显示继续砍价按钮 更新价格视图
                                        $(".price").html(_this.transPriceByBargain(obj.bargain_invite_detail.bargain_result));
                                        $(".j_bargain_btn_continue").show();
                                        $(".j_bargain_btn_self").hide();
                                    })
                                } else {
                                    // 没砍过价格 原价购买
                                    Bargain.hideBargain();
                                    var _execAfterData = _this.computeAndUpdateSkuPriceForBargain(init_data);
                                    _this.config.normalBuyCallback(_execAfterData);
                                }

                            }

                        }
                    })
                } else {
                    $(".j_bargain_tip_unlogin_price").show();
                    // 未登录 获取本地自砍一刀信息
                    if (_this.checkIsBargainSelf()) {
                        var _execAfterData = _this.computeAndUpdateSkuPriceForBargain(init_data);
                        _this.config.bargainBuyCallback(_execAfterData);
                        // 有的话 显示继续砍价按钮 更新价格视图
                        $(".price").html(_this.transPriceByBargain());
                        $(".j_bargain_btn_continue").show();
                        $(".j_bargain_btn_self").hide();
                    } else {
                        // 没有 显示我要砍价
                        $(".j_bargain_btn_continue").hide();
                        $(".j_bargain_btn_self").show();
                        var _execAfterData = _this.computeAndUpdateSkuPriceForBargain(init_data);
                        _this.config.normalBuyCallback(_execAfterData);
                    }
                }
            } else {
                // 没有 或者 不在有效期内的活动 在商品详情页中隐藏掉按钮和教程
                Bargain.hideBargain();
                var _execAfterData = _this.computeAndUpdateSkuPriceForBargain(init_data);
                _this.config.normalBuyCallback(_execAfterData);
            }
            _this.handleFn();
        },
        // 展示好友砍价列表
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
        //匿名用户上传自砍一刀信息
        bargainBySelf: function (selfBargainPrice,loading, callback) {
            var _buyer_id = Cookie.getCookie('buyer_id'); //匿名买家id
            var reqParams = {
                edata: {
                    "action": "h5_detail",
                    "buyer_id": _buyer_id,
                    "price": selfBargainPrice || 0 //自砍一刀的价格，如果没有自砍，就传0
                }
            }
            var url = Config.host.actionUrl + Config.actions.bargain + "/" + init_data.item.bargain.id + "?param=" + JSON.stringify(reqParams);
            Ajax.getJsonp(url, function (obj) {
                if (200 == obj.code) {
                    callback && callback(obj);
                }else{
                    Dialog.tip({
                        body_txt: obj.message
                    })
                }
                loading.remove();
            }, function () {
                loading.remove();
                Dialog.tip({
                    body_txt: Lang.H5_ERROR
                })
            })
        },
        // 获取最新的砍价活动详情
        getLastBargainDetail: function (selfBargainPrice, callback) {
            var _this = this;
            var reqParams = {
                edata: {
                    "action": "h5_detail",
                    "buyer_id": _this.loginResultPackage.info.buyer_id,
                    "price": selfBargainPrice || 0, //自砍一刀的价格，如果没有自砍，就传0
                    "uss": _this.loginResultPackage.info.uss
                }
            }
            var url = Config.host.actionUrl + Config.actions.bargain + "/" + init_data.item.bargain.id + "?param=" + JSON.stringify(reqParams);
            Ajax.getJsonp(url, function (obj) {
                if (200 == obj.code) {
                    callback && callback(obj);
                }
            }, function () {
                Dialog.tip({
                    body_txt: Lang.H5_ERROR
                })
            })
        },
        /**
         * 更新商品信息 将bargain注入到价格信息中
         */
        updateRemoteBargainPrice: function (_self_bargain_price) {
            var _this = this;
            var reqParams = {
                edata: {
                    "action": "h5_detail",
                    "buyer_id": _this.loginResultPackage.info.buyer_id,
                    "price": _self_bargain_price || 0, //自砍一刀的价格，如果没有自砍，就传0
                    "uss": _this.loginResultPackage.info.uss
                }
            }
            var url = Config.host.actionUrl + Config.actions.bargain + "/" + init_data.item.bargain.id + "?param=" + JSON.stringify(reqParams);
            Ajax.getJsonp(url, function (obj) {
                if (200 == obj.code) {
                    // 判断是不是买过限购的
                    if (init_data.item.bargain.limit_to != 0) {
                        // 已经买过了
                        if (obj.bargain_invite_detail.bargain_bought_num > 0) {
                            $(".j_bargain_reachbaseprice").hide();
                            $(".j_bargain_btn_self").hide();
                            $(".j_bargain_btn_continue").hide();
                            $(".j_bargain_tip").hide();
                            $(".bargain-tip-txt-how").hide();
                            $(".bargain-buyer-intro-content").hide();
                            // 恢复原价
                            console.log("恢复原价")
                            _this.bargainCache.set("remote_bargain_detail", obj.bargain_invite_detail);
                            $(".price").html(_this.origin_price);
                        } else {
                            obj.bargain_invite_detail.id = init_data.item.bargain.id;
                            _this.showFriendHelpList(obj.bargain_invite_detail);
                            //更新result价格
                            if ("0.00" != obj.bargain_invite_detail.bargain_result) {
                                _this.bargainCache.set("remote_bargain_detail", obj.bargain_invite_detail);
                                $(".price").html(_this.transPriceByBargain(obj.bargain_invite_detail.bargain_result));
                            }
                        }
                    } else {
                        obj.bargain_invite_detail.id = init_data.item.bargain.id;
                        _this.showFriendHelpList(obj.bargain_invite_detail);
                        //更新result价格
                        if ("0.00" != obj.bargain_invite_detail.bargain_result) {
                            _this.bargainCache.set("remote_bargain_detail", obj.bargain_invite_detail);
                            $(".price").html(_this.transPriceByBargain(obj.bargain_invite_detail.bargain_result));
                        }
                    }
                }
                _this.config.afterfn && _this.config.afterfn();
            }, function () {}, {
                async: false
            })
        },
        handleFn: function () {
            var _this = this;
            // 自砍一刀
            $('body').on('click', '.j_bargain_btn_self', function () {
                //弹出 砍了多少钱 dialog
                PaqPush && PaqPush('砍价-自砍一刀', '');
                var _amplitude = _this.computeBargainPrice();
                _this.loading = Dialog.loading({
                    can_exist : true
                });
                Dialog.dialog({
                    body_txt: _this.createBargainPriceDialogHtm(),
                    show_footer: false,
                    cover_event: true,
                    body_fn: function () {
                        _this.bargainBySelf(_amplitude.price_origin,_this.loading,function(){
                            // 回填自砍一刀的
                            $(".j_bargain_amplitude_price").text(_amplitude.price_format);
                            //本地存储这一刀
                            var _curBargainSelfLocal = {};
                            _curBargainSelfLocal[init_data.item.bargain.id] = {
                                amplitudeSelfPrice: _amplitude.price_origin
                            }
                            _this.bargainCache.set("bargain_price_self", _curBargainSelfLocal);
                        });
                    },
                    c_fn: function () {
                        location.reload();
                    }
                })
            })
            // 登录
            $("body").on("click", ".j_user_login", function () {
                PaqPush && PaqPush('登录-弹出登录框', '');
                Oauth.openDialog({
                    title:Lang.BARGAIN_DETAIL_LOGIN_TIP
                });
            })
            // 跳到买家版教程
            $("body").on("click", ".j_bargain_tip", function () {
                PaqPush && PaqPush('查看-买家版砍价教程', '');
                // 获取教程位置 fix 滚动bug
                // 0001870: 锚点定位到教程偏上一点，把我要砍价的按钮露出来
                var _top = ~~$("#bargain-buyer-intro").offset().top-80;
                $(window).scrollTop(_top);
            })
            // 砍了多少钱的弹窗 确认按钮 点击刷新
            $("body").on("click", ".j_btn_confrim_bargain_price", function () {
                PaqPush && PaqPush('砍价-确认砍价金额', '');
                location.reload();
            })
            // 继续砍价
            $("body").on("click", ".j_bargain_btn_continue", function () {
                PaqPush && PaqPush('砍价-继续砍价', '');
                // 判断是否登录 登录 弹出 分享 
                if (_this.loginResultPackage.result) {
                    PaqPush && PaqPush('砍价-弹出分享框', '');
                    Sharebargain({
                        title: Lang.BARGAIN_DETAIL_INVITE_TIP,
                        content: "Hi, aku lagi ikutan promo tawar " + init_data.item.bargain.title + " sampai " + "Rp " + Base.others.priceFormat(init_data.item.bargain.base_price) + " nih! Bantu aku tawar yuk. Klik ",
                        bargain_inv_url: _this.bargainCache.find("remote_bargain_detail").bargain_share_url,
                        c_fn: function () {
                            //判断是否用户有手机号 如果有 则不提示 如果没有则提示
                            if (!_this.loginResultPackage.info.telephone) {
                                PaqPush && PaqPush('砍价-预留手机号', '');
                                _this.submitBargainPhone = Dialog.dialog({
                                    body_txt: '<div>' +
                                        '<div class="">' + Lang.BARGAIN_SHARE_AFTER_PHONE + '</div>' +
                                        '<div class="bargain-phone-input clearfix ins-m-t-3"><span class="fl">+62</span> <input type="tel" class="j_bargain_inv_telphone fr" maxlength="20" /></div>' +
                                        '<div class="bargain-phone-button j_bargain_inv_submit_telphone">Ya</div>' +
                                        '</div>',
                                    show_footer: false,
                                    show_top: false
                                })
                            }
                        }
                    });
                } else {
                    PaqPush && PaqPush('登录-弹出登录框', '');
                    Oauth.openDialog({
                        title:Lang.BARGAIN_DETAIL_LOGIN_TIP
                    });
                }
            })
            // 提交手机号
            $("body").on("click", ".j_bargain_inv_submit_telphone", function () {
                PaqPush && PaqPush('砍价-保存手机号', '');
                //获取手机号
                var _bargainTelphone = $.trim($(".j_bargain_inv_telphone").val());
                if (!_bargainTelphone) {
                    Dialog.tip({
                        body_txt: Lang.H5_VALIDATOR_TEL,
                        can_exist: true
                    })
                    return;
                }
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
                            location.reload();
                        }
                    }
                })
            })
        },
        /**
         * 检查是否本地有这个活动的自砍一刀
         */
        checkIsBargainSelf: function () {
            var _this = this,
                _bargain_price_self;
            if (_this.bargainCache) {
                _bargain_price_self = _this.bargainCache.find("bargain_price_self");
                if (!!_bargain_price_self && !!_bargain_price_self[init_data.item.bargain.id] && !!_bargain_price_self[init_data.item.bargain.id].amplitudeSelfPrice) {
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
            if (amplitudePrice != 0) {
                if (~~init_data.item.min_price == ~~init_data.item.max_price) {
                    var _after_bargain_price = Base.others.priceFormat(~~init_data.item.price - ~~amplitudePrice);
                    var _item_price = Base.others.priceFormat(~~init_data.item.price);
                    _htm = "Rp " + _after_bargain_price + " <span class='bargain-origin-price'> Rp " + _item_price + "</span>";
                } else {
                    var _min_after_bargain_price = Base.others.priceFormat(~~init_data.item.min_price - ~~amplitudePrice);
                    var _max_after_bargain_price = Base.others.priceFormat(~~init_data.item.max_price - ~~amplitudePrice);
                    var _min_price = Base.others.priceFormat(~~init_data.item.min_price);
                    var _max_price = Base.others.priceFormat(~~init_data.item.max_price);
                    var _minPriceBargainHtm = "<p>Rp " + _min_after_bargain_price + " <span class='bargain-origin-price-sku'> Rp " + _min_price + "</span></p>";
                    var _maxPriceBargainHtm = "<p>Rp " + _max_after_bargain_price + " <span class='bargain-origin-price-sku'> Rp " + _max_price + "</span></p>";
                    _htm = _minPriceBargainHtm + _maxPriceBargainHtm;
                }
            } else {
                _htm = $(".price").html();
            }


            return _htm;
        },
        // 获取砍价幅度 如果登录 则获取remote_bargain_detail中的 如果未登录 获取本地的
        getBargainAmplitudePrice: function () {
            var _bargain_result_price, _this = this;
            if (!init_data.item.bargain) {
                _bargain_result_price = 0;
                return _bargain_result_price;
            }
            if (_this.loginResultPackage.result) {
                // 判断是不是1个活动
                var _localRemoteCache = _this.bargainCache.find("remote_bargain_detail");
                if (_localRemoteCache) {
                    if (_localRemoteCache.id == init_data.item.bargain.id) {
                        _bargain_result_price = _localRemoteCache.bargain_result;
                    } else {
                        _bargain_result_price = 0;
                    }
                } else {
                    var _selfPrice = 0;
                    if (_this.bargainCache.find("bargain_price_self")) {
                        if (_this.bargainCache.find("bargain_price_self")[init_data.item.bargain.id]) {
                            _selfPrice = _this.bargainCache.find("bargain_price_self")[init_data.item.bargain.id].amplitudeSelfPrice || 0;
                        }
                    }
                    _bargain_result_price = _selfPrice;
                }
            } else {
                var _selfPrice = 0;
                if (_this.bargainCache.find("bargain_price_self")) {
                    if (_this.bargainCache.find("bargain_price_self")[init_data.item.bargain.id]) {
                        _selfPrice = _this.bargainCache.find("bargain_price_self")[init_data.item.bargain.id].amplitudeSelfPrice || 0;
                    }
                }
                _bargain_result_price = _selfPrice;
            }
            _bargain_result_price = _bargain_result_price;
            return _bargain_result_price;
        },
        // 根据砍价幅度计算sku 并存储到对应item中
        computeAndUpdateSkuPriceForBargain: function (originData) {
            var _this = this;
            var _bargain_result_price = Bargain.checkIsLimitForLogin() ? 0 : _this.getBargainAmplitudePrice();
            if (originData.item.bargain) {
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
            if (Oauth.checkIsLogin()) {
                var _localBargainCache = Cache.getSpace("BargainCache") || new Cache({
                    namespace: "BargainCache",
                    type: "local"
                });
                var _localBargainCacheDetail = _localBargainCache.find("remote_bargain_detail");
                if (_localBargainCacheDetail && init_data.item.bargain.id == _localBargainCacheDetail.id && _localBargainCacheDetail.bargain_result != "0.00") {
                    return {
                        price_origin: ~~_localBargainCacheDetail.bargain_result,
                        price_format: "Rp " + Base.others.priceFormat(_localBargainCacheDetail.bargain_result)
                    };
                } else {
                    var _amplitude = (~~init_data.item.min_price - ~~init_data.item.bargain.base_price) * 0.3;
                    return {
                        price_origin: ~~_amplitude,
                        price_format: "Rp " + Base.others.priceFormat(_amplitude)
                    };
                }

            } else {
                //自砍
                var _amplitude = (~~init_data.item.min_price - ~~init_data.item.bargain.base_price) * 0.3;
                return {
                    price_origin: ~~_amplitude,
                    price_format: "Rp " + Base.others.priceFormat(_amplitude)
                };
            }

        }
    }
    // 检查本地存储和接口返回的活动是否为同一活动
    Bargain.checkIsSameBargain = function () {
        var isSame = false;
        var _localBargainCache = Cache.getSpace("BargainCache") || new Cache({
            namespace: "BargainCache",
            type: "local"
        });
        if (_localBargainCache.find("remote_bargain_detail")) {
            var _localBargainId = _localBargainCache.find("remote_bargain_detail").id;
            var _remoteBargainId = init_data.item.bargain.id;
            if (_localBargainId == _remoteBargainId) {
                isSame = true
            } else {
                _localBargainCache.remove("remote_bargain_detail");
            }
        } else {
            isSame = false;
        }
        return isSame;
    }
    // 检查是否含有砍价活动商品
    Bargain.checkIsHaveBargainItem = function (items) {
        var isHave = false;
        if (items) {
            $.each(items, function (key, item) {
                if(item.discount && item.discount.bargain){
                    isHave = true;
                }
            })
        }
        return isHave;
    }
    // 检查是否含有bargain节点 true 有 false没有
    Bargain.checkIsHaveBargainProperty = function (obj) {
        if (!!obj.bargain && !!obj.bargain.id) return true;
        return false;
    }
    // 如果为印尼时区返回0 如果为北京时区返回3600
    Bargain.getGMTSecond = function(){
        var regex="\\((.+?)\\)";
        var _curDate = new Date()+"";
        var _timeZone = _curDate.match(regex)?_curDate.match(regex)[1]:"WIB";
        var _difference ;
        switch(_timeZone){
            case "WIB":
            _difference = 0;
            break;
            case "CST":
            _difference = 3600;
            break;
            default:
            _difference = 0;
            break;
        }
        return _difference;
    }

    // 检查是否过期 true 过期了 false 没过期
    Bargain.checkIsOverdue = function (bargain) {
        console.log("begin computed overdue")
        var _curDateTime = Base.others.getCurDateTime() - Bargain.getGMTSecond();
        var _bargain_start_time = Base.others.transDateStrToDateTime(bargain.start_time);
        var _bargain_end_time = Base.others.transDateStrToDateTime(bargain.end_time);
        console.log("begin computed overdue curdatetime:"+_curDateTime)
        console.log("begin computed overdue starttime:"+_bargain_start_time)
        console.log("begin computed overdue endtime:"+_bargain_end_time)
        console.log("begin computed overdue:bargain unoverdue")
        if (_curDateTime > _bargain_end_time || _curDateTime < _bargain_start_time) {
            console.log("begin computed overdue:bargain overdue")
            return true;
        } else {
            console.log("begin computed overdue:bargain unoverdue")
            return false;
        }
    }
    // 检查是否登录限购
    Bargain.checkIsLimitForLogin = function () {
        var isLimit = false;
        var _localBargainCache = Cache.getSpace("BargainCache") || new Cache({
            namespace: "BargainCache",
            type: "local"
        });
        var _localBargainCacheDetail = _localBargainCache.find("remote_bargain_detail");
        if (_localBargainCacheDetail) {
            if (init_data.item.bargain) {
                if (init_data.item.bargain.limit_to != 0) {
                    if (_localBargainCacheDetail.bargain_bought_num > 0) {
                        isLimit = true;
                    }
                }
            }
        }

        return isLimit;
    }
    // 订单确认页检查是否登录限购 TODO 后面考虑优化可以和上面方法合并
    Bargain.checkIsLimitForLoginByOrderConfirm = function (bargain) {
        var isLimit = false;
        var _localBargainCache = Cache.getSpace("BargainCache") || new Cache({
            namespace: "BargainCache",
            type: "local"
        });
        var _localBargainCacheDetail = _localBargainCache.find("remote_bargain_detail");
        if (_localBargainCacheDetail) {
            if (bargain) {
                if (bargain.limit_to != 0) {
                    if (_localBargainCacheDetail.bargain_bought_num > 0) {
                        isLimit = true;
                    }
                }
            }
        }

        return isLimit;
    }

    // 检查是否砍到了底价
    Bargain.isReachBaseprice = function (itemprice, amplitude, baseprice) {
        var isReach = false;
        isReach = (~~itemprice - ~~amplitude) <= ~~baseprice;
        return isReach;
    }

    Bargain.hideBargain = function () {
        $(".j_bargain_reachbaseprice").hide();
        $(".j_bargain_btn_self").hide();
        $(".j_bargain_btn_continue").hide();
        $(".j_bargain_tip").hide();
        $(".bargain-tip-txt-how").hide();
        $(".bargain-buyer-intro-content").hide();
    }
    Bargain.isUnAttendBargain = function (bargainId) {
        var isUnAttendBargain = false;
        var _localBargainCache = Cache.getSpace("BargainCache") || new Cache({
            namespace: "BargainCache",
            type: "local"
        });
        var _localBargainCacheDetail = _localBargainCache.find("remote_bargain_detail");
        var _localBargainCacheSelf = _localBargainCache.find("bargain_price_self");
        if (_localBargainCacheDetail && _localBargainCacheDetail.id == bargainId && _localBargainCacheDetail.bargain_result == "0.00") {
            if (!_localBargainCacheSelf || !_localBargainCacheSelf[bargainId]) {
                isUnAttendBargain = true;
            }
        }
        return isUnAttendBargain;
    }

    Bargain.checkBargainStatus = function (bargainId, callback) {
        var _this = this;
        var reqParams = {
            edata: {
                "action": "check"
            }
        }
        var url = Config.host.actionUrl + Config.actions.bargain + "/" + bargainId + "?param=" + JSON.stringify(reqParams);
        Ajax.getJsonp(url, function (obj) {
            callback && callback(obj.bargain.status)
        })
    }

    // 检查是否实际参加
    Bargain.isActualAttendBargain = function (bargainId) {
        var isActualAttend = false;
        var _localBargainCache = Cache.getSpace("BargainCache") || new Cache({
            namespace: "BargainCache",
            type: "local"
        });
        var _localBargainCacheDetail = _localBargainCache.find("remote_bargain_detail");
        var _localBargainCacheSelf = _localBargainCache.find("bargain_price_self");
        // 如果有接口返回的 以接口返回为准
        if (_localBargainCacheDetail) {
            // 是同一个活动
            if (_localBargainCacheDetail.id == bargainId) {
                // 判断是否砍了价格
                if (_localBargainCacheDetail.bargain_result != "0.00") {
                    isActualAttend = true;
                } else {
                    isActualAttend = false;
                }
            } else {
                //检查本地的
                // 如果本地有 且是这个活动的
                if (_localBargainCacheSelf && _localBargainCacheSelf[bargainId]) {
                    // 如果没有值 或者等0.00 都是未参加
                    if (!_localBargainCacheSelf[bargainId].amplitudeSelfPrice || _localBargainCacheSelf[bargainId].amplitudeSelfPrice == "0.00") {
                        isActualAttend = false;
                    } else {
                        isActualAttend = true;
                    }
                } else {
                    //本地没有 或者 有但不是这个活动
                    isActualAttend = false;
                }
            }
        } else {
            //检查本地的
            // 如果本地有 且是这个活动的
            if (_localBargainCacheSelf && _localBargainCacheSelf[bargainId]) {
                // 如果没有值 或者等0.00 都是未参加
                if (!_localBargainCacheSelf[bargainId].amplitudeSelfPrice || _localBargainCacheSelf[bargainId].amplitudeSelfPrice == "0.00") {
                    isActualAttend = false;
                } else {
                    isActualAttend = true;
                }
            } else {
                //本地没有 或者 有但不是这个活动
                isActualAttend = false;
            }
        }
        return isActualAttend;
    }

    return Bargain;
});
