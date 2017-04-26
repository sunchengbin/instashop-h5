/**
 * 第三方登录模块
 */
define([
    'base',
    'config',
    'ajax',
    'cache',
    'dialog',
    'lang'
], function (Base, Config, Ajax, Cache, Dialog, Lang) {
    'use strict';
    var Oauth = {
        checkIsNeedLogin:function(shopData){
            return shopData.buyer_login_flag||0;
        },
        login: function (type) {
            var _reqData = {
                url: location.href,
                action: "loginfb"
            };
            switch (type) {
                case "facebook":
                    _reqData.action = "loginfb";
                    break;
                case "line":
                    _reqData.action = "loginline";
                    break;
                default:
                    break;
            }
            var reqUrl = Config.host.phpHost + Config.actions.oauth + "?param=" + encodeURIComponent(JSON.stringify(_reqData)) + "&timestamp=" + new Date().getTime();
            window.location.href = reqUrl;
        },
        signout:function(url){
            var loginInfoFromCache = Cache.getSpace("LoginCache") || new Cache({
                namespace: "LoginCache",
                type: "local"
            });
            loginInfoFromCache.remove("loginInfo");
            setTimeout(function(){
                location.href = url;
            },2000)
        },
        openDialog: function (type, opts) {
            Dialog.dialog({
                body_txt: Oauth.createLoginHtm(type, opts),
                show_footer: false,
                show_top: false,
                body_fn: function () {
                    $("body").on("click", ".j_dialog_login_btn", function (e) {
                        var $this = $(this);
                        var _type = $this.attr("data-type");
                        Oauth.login(_type);
                    })
                }
            })
        },
        createLoginHtm: function (type, opts) {
            var _htm = "";
            opts = opts || {}
            _htm = '<div>' +
                '<div class="login-dialog-header">Untuk mengikuti promo ini, kamu harus login terlebih dahulu:</div>' +
                '<div>' +
                '<div class="j_dialog_login_line j_dialog_login_btn ins-m-b-2" data-type="line">Login with Line</div>' +
                '<div class="j_dialog_login_facebook j_dialog_login_btn ' + (type ? 'ins-m-b-2' : '') + '" data-type="facebook">Login with Facebook</div>' +
                '<div class="j_cart_no_login" style="display:' + (type ? 'block' : 'none') + '" group-id="' + opts.groupid + '" data-type="cart_no_logain">' + Lang.BARGAIN_CART_BTN_UNLOGIN + '</div>' +
                '</div>' +
                '</div>';
            return _htm;

        },
        checkIsLogin: function () {
            // 获取回传的用户信息
            var loginInfoFromCallBackPost;
            // 获取存储空间 登录
            var loginInfoFromCache = Cache.getSpace("LoginCache") || new Cache({
                namespace: "LoginCache",
                type: "local"
            });
            try {
                loginInfoFromCallBackPost = user_info;
                if (!!loginInfoFromCallBackPost.buyer_id && !!loginInfoFromCallBackPost.name) {
                    // post 问题 fix
                    var localLoginInfo = loginInfoFromCache.find("loginInfo");
                    if (localLoginInfo) {
                        if (localLoginInfo.buyer_id == loginInfoFromCallBackPost.buyer_id) {
                            // 比对telphone
                            if (!loginInfoFromCallBackPost.telephone && localLoginInfo.telephone) {
                                // 如果远程的没有 本地的有
                                loginInfoFromCallBackPost.telephone = localLoginInfo.telephone;
                            }
                        }
                    }

                    loginInfoFromCache.set("loginInfo", loginInfoFromCallBackPost);
                    return {
                        result: true,
                        info: loginInfoFromCallBackPost
                    }
                } else {
                    throw new Error("uncheck login");
                }
            } catch (e) {
                loginInfoFromCallBackPost = {};
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
        }
    }
    return Oauth;
});
