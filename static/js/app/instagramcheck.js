/**
 * Created by lanchenghao on 16/11/14.
 */
require(['hbs', 'text!views/app/instagramcheck.hbs', 'dialog', 'ajax', 'config', 'base', 'lang', 'fastclick', 'common'], function (Hbs, Checkhtm, Dialog, Ajax, Config, Base, Lang, Fastclick, Common) {
    var Instagramcheck = {
        init: function () {
            var ctx = this;
            var _htm = Hbs.compile(Checkhtm)({
                lang: Lang
            });
            $('body').prepend(_htm);
            document.querySelector(".j_submit_check").addEventListener("click", function () {
                ctx.subData();
            })
        },
        subData: function () {
            var _this = this;
            var _instagram_name = $.trim($(".j_instagram_name").val()) || "";
            if (/^[A-Za-z0-9_.]+$/.test(_instagram_name)) {
                var _reqData = {
                    edata: {
                        frm: Common.getQueryParam("frm"),
                        wduss: Common.getQueryParam("wduss"),
                        seller_id: Common.getQueryParam("seller_id"),
                        ins_name: _instagram_name,
                        item_count: "0",
                        action: "import",
                        _debug_env: "3.4"
                    }
                }
                Ajax.postJsonp({
                    url: Config.actions.instagramcheck,
                    data: {param: JSON.stringify(_reqData)},
                    type: 'POST',
                    success: function (obj) {
                        if (obj.code == 200) {
                            window.location.href = "instashop://app/instagram_move?id=" + _instagram_name;
                        } else {
                            Dialog.tip({
                                top_txt: '',//可以是html
                                body_txt: '<p class="dialog-body-p">' + (_this.msg ? _this.msg : Lang.H5_ERROR) + '</p>',
                                auto_fn: function () {
                                    setTimeout(function () {
                                        location.reload();
                                    }, 2000);
                                }
                            });
                        }
                    },
                    error: function (error) {
                        Dialog.alert({
                            top_txt: '',//可以是html
                            cfb_txt: Lang.H5_FRESHEN,
                            body_txt: '<p class="dialog-body-p">' + Lang.H5_ERROR + '</p>',
                            cf_fn: function () {
                                location.reload();
                            }
                        });
                    }
                });
            } else {
                Dialog.tip({
                    top_txt: '',//可以是html
                    body_txt: '<p class="dialog-body-p">' + (_this.msg ? _this.msg : Lang.H5_ERROR) + '</p>',
                    auto_fn: function () {
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }
                });
            }
        }
    };
    Instagramcheck.init();
})