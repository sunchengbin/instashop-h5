/**
 * 第三方登录模块
 */
define([
    'base',
    'config',
    'ajax',
    'cache'
], function (Base, Config, Ajax, Cache) {
    'use strict';
    var Oauth = {
        login: function (params) {
            var _reqData = {
                url: location.href,
                action: "loginfb",
                _debug_env:"4.5"
            };
            var reqUrl = "http://api-test.instashop.co.id/instashop/" + Config.actions.oauth + "?param=" + JSON.stringify(_reqData) + "&timestamp=" + new Date().getTime();
            window.location.href = reqUrl;

            // Dialog.confirm({
            //     body_txt: 'Pastikan akun Instagrammu tidak diprivate',
            //     cf_fn: function () {
            //         window.location.href = reqUrl;
            //     },
            //     c_fn: function () {
            //         window.location.href = window.location.href + "&oauth=fail";
            //     }
            // })






            // var loginMemoryCache = window.test = this.loginMemoryCache = new Cache({namespace:"OauthLogin"});
            // loginMemoryCache.set("userInfo",{
            //     id:"342",
            //     username:"sfdf",
            //     avatar:"http://graph.facebook.com/732398890274398/picture?type=large"
            // })
        }
    }
    return Oauth;
});
