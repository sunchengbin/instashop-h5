/**
 * Created by lanchenghao on 16/11/14.
 */
require(['config', 'base', 'lang', 'common'], function (Config, Base, Lang, Common) {
    var Instagramcheck = {
        init: function () {
            var ctx = this;
            ctx.subData();
        },
        subData: function () {
            var _reqData = {
                wduss: Common.getQueryParam("wduss"),
                seller_id: Common.getQueryParam("seller_id"),
                action: "instagram",
                _debug_env: "3.6"
            }
            //"m-test.instashop.co.id/html/instagramcheck.php?wduss=1k29nj9vdh6Pz/jqIZtKWdbTLsYA7YzMfdjiJm4UrQI=&seller_id=40687"
            var reqUrl = Config.host.phpHost + Config.actions.instagramcheck + "?param=" + JSON.stringify(_reqData);
            window.location.href = reqUrl;
        }
    };
    Instagramcheck.init();
})