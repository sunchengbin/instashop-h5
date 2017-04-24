/**
 * Created by sunchengbin on 16/6/2.
 * 物流插件
 */
define(['common', 'base', 'hbs', 'text!views/moudle/tradeplug.hbs', 'lang'], function (Common, Base, Hbs, TradeHtml, Lang) {
    var TradePlug = function (opts) {
        var _this = this;
        _this.config = $.extend({
            insertAfterEl: '.address-box'
        }, opts);
        _this.init();
    };
    TradePlug.prototype = {
        getSelectedTrade: function () {
            return this.selectedTrade || "";
        },
        init: function () {
            this.handelFn();
        },
        handelFn: function () {
            var _this = this;
            this.createHtm({});
            $("body").on("click", ".j_trade_sel", function () {
                if (!$(this).hasClass("checkbox-disabled")) {
                    _this.resetSelectClass();
                    _this.selectedTrade = $(this).attr("data-tradetype");
                    $(this).find(".checkbox-warp").addClass("active");
                }
            })
        },
        createHtm: function (info) {
            var _this = this;
            info.lang = Lang;
            var PlugHtm = Hbs.compile(TradeHtml)(info);
            $(_this.config.insertAfterEl).after(PlugHtm);
            return this;
        },
        resetSelectClass: function () {
            $(".checkbox-warp").removeClass("active");
        },
        toShow: function () {},
        toHide: function (plug_buy, height) {}
    };
    return function (opts) {
        return new TradePlug(opts);
    }
})