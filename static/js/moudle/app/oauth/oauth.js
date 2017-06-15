/**
 * 第三方登录模块
 */
define([
    'base',
    'config',
    'ajax',
    'cache',
    'dialog',
    'lang',
    'cookie'
], function (Base, Config, Ajax, Cache, Dialog, Lang,Cookie) {
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
            var Debug = Config.getDebugEnv;
            var reqUrl = Config.host.phpHost + Config.actions.oauth + "?param=" + encodeURIComponent(JSON.stringify(_reqData)) + "&timestamp=" + new Date().getTime()+"&_debug_env="+Debug;
            window.location.href = reqUrl;
        },
        //重置登录信息,清空4.8版本以前用户登录状态
        initSignOut:function(){
            if(localStorage.getItem('InitSignOut')){
                return;
            }
            var loginInfoFromCache = Cache.getSpace("LoginCache") || new Cache({
                    namespace: "LoginCache",
                    type: "local"
                });
            loginInfoFromCache.remove("loginInfo");
            Cookie.removeCookie('uss','',0,'/');
            Cookie.removeCookie('uss_buyer_id','',0,'/');
            localStorage.setItem('InitSignOut','true');
        },
        //退出登录
        signout:function(url){
            var loginInfoFromCache = Cache.getSpace("LoginCache") || new Cache({
                namespace: "LoginCache",
                type: "local"
            });
            loginInfoFromCache.remove("loginInfo");
            Cookie.removeCookie('uss','',0,'/');
            Cookie.removeCookie('uss_buyer_id','',0,'/');
            localStorage.removeItem('cartIsMerged');
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
                '<div class="login-dialog-header">'+(opts.title||'Agar keamanan akun terjaga, kamu harus login terlebih dahulu')+'</div>' +
                '<div>' +
                '<div class="j_dialog_login_line j_dialog_login_btn ins-m-b-2" data-type="line">Login with Line</div>' +
                '<div class="j_dialog_login_facebook j_dialog_login_btn ' + (type ? 'ins-m-b-2' : '') + '" data-type="facebook">Login with Facebook</div>' +
                '<div class="j_cart_no_login" style="display:' + (type ? 'block' : 'none') + '" group-id="' + opts.groupid + '" data-type="cart_no_logain">' + Lang.BARGAIN_CART_BTN_UNLOGIN + '</div>' +
                '</div>' +
                '</div>';
            return _htm;

        },
        //判断和获取是否登录
        checkIsLogin: function () {
            var _time = (new Date()).getTime(),
                _this = this;
            //重置登录信息,清空4.8版本以前用户登录状态
            _this.initSignOut();
            // 获取回传的用户信息
            var loginInfoFromCallBackPost;
            // 获取存储空间 登录
            var loginInfoFromCache = Cache.getSpace("LoginCache") || new Cache({
                namespace: "LoginCache",
                type: "local"
            });
            try {
                loginInfoFromCallBackPost = user_info;
                if (!!loginInfoFromCallBackPost.buyer_id) {
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
                    loginInfoFromCallBackPost.options = {
                        plant:Base.others.getCurDateTime(),
                        expire:2592000//30天-2592000
                    }
                    loginInfoFromCache.set("loginInfo", loginInfoFromCallBackPost);
                    //把uss种到cookie中方便php接口请求中读取到
                    //第一次登录,或者换账号登录
                    if(!Cookie.getCookie('uss') || (Cookie.getCookie('uss') && Cookie.getCookie('uss') != loginInfoFromCallBackPost.uss)){
                        Cookie.setCookie('uss',loginInfoFromCallBackPost.uss,_time+2592000,'/');
                        Cookie.setCookie('uss_buyer_id',loginInfoFromCallBackPost.buyer_id,_time+2592000,'/');
                    }
                    if(loginInfoFromCallBackPost.uss){
                        _this.mergeBuyerAndUssBuyer(Cookie.getCookie('buyer_id'),loginInfoFromCallBackPost.buyer_id,loginInfoFromCallBackPost.uss);
                    }
                    return {
                        result: true,
                        info: loginInfoFromCallBackPost
                    }
                } else {
                    if(Cookie.getCookie('uss') && Cookie.getCookie('uss_buyer_id') && Cookie.getCookie('buyer_id')){
                        _this.mergeBuyerAndUssBuyer(Cookie.getCookie('buyer_id'),Cookie.getCookie('uss_buyer_id'),Cookie.getCookie('uss'));
                    }
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
                    if(loginInfo.options){
                        var curDateTime = Base.others.getCurDateTime();
                        var plantTime = loginInfo.options.plant;
                        if(~~(curDateTime-plantTime)<=~~loginInfo.options.expire){
                            // 本地存储有 返回用户信息
                            Cookie.setCookie('uss',loginInfo.uss,_time+2592000,'/');
                            return {
                                result: true,
                                info: loginInfo
                            };
                        }else{
                            return {
                                result: false
                            };
                        }
                    }else{
                        // 本地存储有 返回用户信息
                        Cookie.setCookie('uss',loginInfo.uss,_time+2592000,'/');
                        return {
                            result: true,
                            info: loginInfo
                        };
                    }
                    
                }
            }
        },
        //合并匿名用户和登录用户信息合并
        mergeBuyerAndUssBuyer : function(buyer_id,uss_buyer_id,uss){
            var _cart_is_merged = localStorage.getItem('cartIsMerged');
            _cart_is_merged = _cart_is_merged?JSON.parse(_cart_is_merged):{};
            if(_cart_is_merged[uss_buyer_id]){
                console.log('this uss '+uss_buyer_id+' is megred');
                return;
            }else{
                _cart_is_merged[uss_buyer_id] = uss_buyer_id;

            }
            var _data = {
                "edata": {
                    "action": "merge",
                    "buyer_id": uss_buyer_id, //实名登录后的买家id
                    "from_buyer_id": buyer_id,//匿名的买家id
                    "seller_id": JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id
                }
            };
            uss && (_data.edata.uss = uss);
            console.log(JSON.stringify(_data));
            Ajax.postJsonp({
                url: Config.actions.cartAction,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'PUT',
                timeout: 30000,
                success: function (obj) {
                    console.log(JSON.stringify(_cart_is_merged));
                    if(obj.code == 200){
                        localStorage.setItem('cartIsMerged',JSON.stringify(_cart_is_merged));
                    }
                },
                error: function (error) {

                }
            });
        }
    }
    return Oauth;
});
