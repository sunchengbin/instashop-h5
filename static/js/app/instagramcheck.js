/**
 * Created by lanchenghao on 16/11/14.
 */
require(['config', 'base', 'lang', 'common'], function (Config, Base, Lang, Common) {
    var Instagramcheck = {
        init: function () {
            var ctx = this;
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
                wduss: Common.getQueryParam("wduss"),
                seller_id: Common.getQueryParam("seller_id"),
                action: "instagram",
                _debug_env: "3.6"
            }
            var reqUrl = Config.host.phpHost + Config.actions.instagramcheck + "?param=" + JSON.stringify(_reqData);
            window.location.href = reqUrl;
        }
    };
    Instagramcheck.init();
})