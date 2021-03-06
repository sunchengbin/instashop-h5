/**
 * Created by lanchenghao on 16/11/14.
 */
require(['config', 'base', 'lang', 'common', 'dialog'], function (Config, Base, Lang, Common, Dialog) {
    var Instagramcheck = {
        init: function () {
            var ctx = this;
            ctx.deleteAllCookies();
            localStorage && localStorage.clear();
            ctx.main();
        },
        main: function () {
            var ctx = this;
            $("body").on("click", ".j_submit_btn", function () {
                ctx.subData();
            });
            var insflag = Common.getQueryParam("oauth");
            var error_message = Common.getQueryParam("error_message");
            if (insflag == 'fail') {
                if (!!error_message) {
                    Dialog.tip({
                        body_txt: 'Otorisasi akun Instagram tidak berhasil, silakan coba kembali beberapa saat lagi'
                    })
                }
                $(".ins-wraper").show();
            } else {
                $(".ins-wraper").hide();
                ctx.subData();
            }
        },
        deleteAllCookies: function () {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },
        subData: function () {
            var _seller_info = Common.getUrlSellerInfo();
            var _reqData = {
                wduss: _seller_info.wduss,
                seller_id: _seller_info.seller_id,
                action: "instagram"
            };
            var reqUrl = Config.host.phpHost + Config.actions.instagramcheck + "?param=" + JSON.stringify(_reqData) + "&timestamp=" + new Date().getTime();
            Dialog.confirm({
                body_txt: 'Pastikan akun Instagrammu tidak diprivate',
                cf_fn: function () {
                    window.location.href = reqUrl;
                },
                c_fn: function () {
                    window.location.href = window.location.href + "&oauth=fail";
                }
            })
        }
    };
    Instagramcheck.init();
})