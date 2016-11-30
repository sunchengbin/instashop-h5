/**
 * Created by lanchenghao on 16/11/14.
 */
require(['config', 'base', 'lang', 'common'], function (Config, Base, Lang, Common) {
    var Instagramcheck = {
        init: function () {
            var ctx = this;
            
            ctx.deleteAllCookies();
            
            localStorage&&localStorage.clear();
            $("body").on("click",".j_submit_btn",function(){
                ctx.subData();
            });
            var insflag = Common.getQueryParam("oauth");
            if(insflag=='fail'){
                $(".ins-wraper").show();
            }else{
                $(".ins-wraper").hide();
                ctx.subData();
            }

        },
        deleteAllCookies:function() {
            var cookies = document.cookie.split(";");
            for (var i = 0;i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },
        subData: function () {
            var _reqData = {
                wduss: encodeURIComponent(Common.getQueryParam("wduss")),
                seller_id: Common.getQueryParam("seller_id"),
                action: "instagram"
            }
            var reqUrl = Config.host.phpHost + Config.actions.instagramcheck + "?param=" + JSON.stringify(_reqData)+"&timestamp="+new Date().getTime();
            window.location.href = reqUrl;
        }
    };
    Instagramcheck.init();
})