/**
 * Created by sunchengbin on 16/6/2.
 * 物流插件
 */
define(['common', 'base', 'hbs', 'text!views/moudle/tradeplug.hbs', 'lang', 'oauth'], function (Common, Base, Hbs, TradeHtml, Lang, Oauth) {
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
                    if (Oauth.checkIsLogin().result) {
                        _this.resetSelectClass();
                        _this.selectedTrade = $(this).attr("data-tradetype");
                        $(this).find(".checkbox-warp").addClass("active");
                    } else {
                        Oauth.openDialog();
                    }
                }
            })
        },
        checkIsSelectTrade:function(){
            var _this = this;
            var warrant_flag = JSON.parse(localStorage.getItem('ShopData')).ShopInfo.warrant_flag;
            if(warrant_flag){
                if(""==_this.selectedTrade){
                    return false;
                }else{
                    return true;
                }
            }else{
                //没有开通
                return true;
            }
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