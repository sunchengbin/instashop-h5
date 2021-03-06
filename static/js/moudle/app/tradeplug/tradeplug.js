/**
 * Created by sunchengbin on 16/6/2.
 * 物流插件
 */
define(['common', 'base', 'lang', 'oauth', 'dialog','config'], function (Common, Base, Lang, Oauth, Dialog,Config) {
    var TradePlug = function (opts) {
        var _this = this;
        _this.config = $.extend({
            insertAfterEl: '.address-box',
            carts:null
        }, opts);
        _this.init();
    };
    TradePlug.prototype = {
        goToSelectedTrade: function () {
            var _this = this;
            var _top = ~~$(_this.config.insertAfterEl).offset().top;
            $(window).scrollTop(_top);
        },
        getSelectedTrade: function () {
            return this.selectedTrade || "";
        },
        init: function () {
            this.handelFn();
        },
        checkShopIsOpenWarrant: function () {
            var _this = this;
            var _ShopData = JSON.parse(localStorage.getItem('ShopData'));
            var _isContainSupplyShopGood = false;
            // 判断商品是否含有供应商的
            for (var item in _this.config.carts) {
                if (_this.config.carts[item].item.supply_type == 2) {
                   _isContainSupplyShopGood = true;
                }
            }
            if (!!_isContainSupplyShopGood) {
                // 存在供应商
                var _supplyWarrantFlag = _ShopData.SupplyShopInfo.warrant_flag;
                var _dropshiperWarrantFlag = _ShopData.ShopInfo.warrant_flag;
                if (1 == _supplyWarrantFlag && 1 == _dropshiperWarrantFlag) {
                    return true;
                } else {
                    return false;
                }
            } else {
                var warrant_flag = JSON.parse(localStorage.getItem('ShopData')).ShopInfo.warrant_flag;
                if (1 == warrant_flag) {
                    return true;
                } else {
                    return false;
                }
            }

        },
        handelFn: function () {
            var _this = this;
            //this.createHtm({
            //    isOpenWarrant: _this.checkShopIsOpenWarrant()
            //});
            $("body").on("click", ".j_trade_sel", function () {
                if (!$(this).hasClass("checkbox-disabled")) {
                    // 选担保交易
                    if ("2" == $(this).attr("data-tradetype")) {
                        if (Oauth.checkIsLogin().result) {
                            _this.resetSelectClass();
                            _this.selectedTrade = $(this).attr("data-tradetype");
                            $(this).find(".checkbox-warp").addClass("active");
                        } else {
                            Oauth.openDialog();
                        }
                    } else {
                        _this.resetSelectClass();
                        _this.selectedTrade = $(this).attr("data-tradetype");
                        $(this).find(".checkbox-warp").addClass("active");
                    }
                } else {
                    // 没有开通担保交易
                    var _dialog = Dialog.dialog({
                        body_txt: _this.createUnOpenWarrantHtm(),
                        show_footer: false,
                        body_fn: function () {
                            $("body").on("click", ".j_btn_confrim_i_know", function () {
                                _dialog.remove();
                            })
                        }
                    })
                }
            })
        },
        createUnOpenWarrantHtm: function () {
            var _htm = "";
            _htm = '<div class="warrant-dialog-body" style="text-align:center">' +
                '   <p>' + Lang.TRADE_SUPPORT_NO_TIP + '</p>' +
                '   <div class="j_btn_confrim_i_know btn">' + Lang.TRADE_IKNOW + '</div>' +
                '</div>'
            return _htm;
        },
        checkIsSelectTrade: function () {
            var _this = this;
            if ("" == _this.selectedTrade || _this.selectedTrade == void(0)) {
                return false;
            } else {
                return true;
            }
        },
        createHtm: function (info) {
            var _this = this;
            info.lang = Lang;
            info.host = Config.host;
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