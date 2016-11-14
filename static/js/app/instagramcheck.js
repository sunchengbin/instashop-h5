/**
 * Created by lanchenghao on 16/11/14.
 */
require(['hbs', 'text!views/app/instagramcheck.hbs', 'dialog', 'ajax', 'config', 'base', 'lang', 'fastclick','common'], function (Hbs, Checkhtm, Dialog, Ajax, Config, Base, Lang, Fastclick,Common) {
    var Instagramcheck = {
        init: function () {
            var ctx = this;
            var _htm = Hbs.compile(Checkhtm)({
                lang: Lang
            });
            //截取url参数 Common.getQueryParam(key)
            $('body').prepend(_htm);
            document.querySelector(".j_submit_check").addEventListener("click",function(){
                ctx.subData();
            })
        },
        subData: function () {
            var _that = this;
            var _instagram_name = $.trim($(".j_instagram_name").val())||"";
            var _reqData = {
                frm: "1",
                wduss: Common.getQueryParam("wduss"),
                seller_id: Common.getQueryParam("seller_id"),
                ins_name: _instagram_name,
                item_count: "0",
                action: "import"
            }
            console.info(_reqData);
            Ajax.postJsonp({
                url: Config.actions.instagramcheck,
                data: {param: JSON.stringify(_reqData)},
                type: 'POST',
                success: function (obj) {
                    if (obj.code == 200) {
                        window.location.href = "instashop://app/instagram_move?id="+_instagram_name;
                    } else {
                        document.querySelector(".error_msg").innerHTML = "出错啦:"+JSON.stringify(obj);
                    }
                },
                error: function (error) {
                    document.querySelector(".error_msg").innerHTML = "出错啦:网络请求出错";
                }
            });
        }
    };
    Instagramcheck.init();
})