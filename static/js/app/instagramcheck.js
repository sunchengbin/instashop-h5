/**
 * Created by lanchenghao on 16/11/14.
 */
require(['config', 'base', 'lang', 'common'], function (Config, Base, Lang, Common) {
    var Instagramcheck = {
        init: function () {
            var ctx = this;
            document.cookie = name+"=;expires="+(new Date(0)).toGMTString();
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