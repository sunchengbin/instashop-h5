/**
 * 第三方登录模块
 */
define([
    'base',
    'config',
    'ajax',
    'cache',
    'dialog'
], function (Base, Config, Ajax, Cache, Dialog) {
    'use strict';
    var Oauth = {
        login: function (type) {
            var _reqData = {
                url: location.href,
                action: "loginfb",
                _debug_env: "4.5"
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
            var reqUrl = "http://api-test.instashop.co.id/instashop/" + Config.actions.oauth + "?param=" + encodeURIComponent(JSON.stringify(_reqData)) + "&timestamp=" + new Date().getTime();
            window.location.href = reqUrl;
        },
        openDialog: function () {
            Dialog.dialog({
                body_txt: Oauth.createLoginHtm(),
                show_footer:false,
                body_fn: function () {
                    $("body").on("click",".j_dialog_login_btn",function(e){
                        var $this = $(this);
                        var _type = $this.attr("data-type");
                        Oauth.login(_type);
                    })
                }
            })
        },
        createLoginHtm: function () {
            var _htm = "";
            _htm = '<div>' +
                '<div class="login-dialog-header">Untuk mengikuti promo ini, kamu harus login dulu:</div>' +
                '<div>'+
                '<div class="j_dialog_login_line j_dialog_login_btn ins-m-b-2" data-type="line">Login with Line</div>'+
                '<div class="j_dialog_login_facebook j_dialog_login_btn" data-type="facebook">Login with Facebook</div>'+
                '</div>' +
                '</div>';
            return _htm;

        }
    }
    return Oauth;
});
