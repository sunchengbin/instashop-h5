/**
 * Created by lanchenghao on 16/11/14.
 */
require(['hbs', 'text!views/app/instagramcheck.hbs', 'dialog', 'ajax', 'config', 'base', 'lang', 'fastclick','common'], function (Hbs, Checkhtm, Dialog, Ajax, Config, Base, Lang, Fastclick,Common) {
    var Instagramcheck = {
        init: function () {
            var _htm = Hbs.compile(Checkhtm)({
                lang: Lang
            });
            //截取url参数 Common.getQueryParam(key)
            $('body').prepend(_htm);
        },
        subData: function () {
            var _that = this;
            var _instagram_name = $().trim($(".j_instagram_name").val())||"";
            var _reqData = {
                frm: "1",
                wduss: Common.getQueryParam("wduss"),
                seller_id: Common.getQueryParam("seller_id"),
                ins_name: _instagram_name,
                item_count: "0",
                action: "import"
            }
            Ajax.postJsonp({
                url: Config.actions.instagramcheck,
                data: {param: JSON.stringify(_reqData)},
                type: 'POST',
                success: function (obj) {
                    if (obj.code == 200) {
                    } else {
                        window.location.href = "instashop://app/instagram_move?id=bear";
                    }
                },
                error: function (error) {
                    Dialog.alert({
                        top_txt: '',//可以是html
                        cfb_txt: '跳转失败',
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ERROR + '</p>',
                        cf_fn: function () {
                            location.reload();
                        }
                    });
                }
            });
        }
    };
    Instagramcheck.init();
})