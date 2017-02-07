/**
 * 优惠券组件
 * 1.优惠券ui
 * 2.优惠券使用
 */
define([
    'base',
    'dialog',
    'lang',
    'hbs',
    'ajax',
    'config',
    'validator',
    'text!views/app/favorable.hbs'
], function (Base, Dialog, Lang, Hbs, Ajax, Config, Validator, FavorableHtml) {
    var Favorable = function (opts) {
        var _this = this;
        _this.init(opts);
    }
    Favorable.prototype = {
        init: function (opts) {
            var _this = this;
            _this.opts = $.extend({
                wraper: "body",
                btn: ".favorable-box"
            }, opts)
            var _htm = Hbs.compile(FavorableHtml)({
                lang: Lang
            });
            _this.price = opts.price;
            $(opts.el).before(_htm);
            _this.handleEvent();
        },
        handleEvent: function () {
            var _this = this;
            $(_this.opts.wraper).on('click', _this.opts.btn, function () {
                PaqPush && PaqPush('弹出输入优惠券弹窗', '');
                // 显示弹窗
                _this.fillDialog = Dialog.dialog({
                    top_txt:'<div class="favorable-fill-header">'+Lang.H5_FAVORABLE_TITLE+'</div>',
                    body_txt: _this.createFillCodeHtm(),
                    show_footer: false,
                    show_top: true,
                    c_fn: function () {
                        PaqPush && PaqPush('优惠券弹窗关闭', '');
                    }
                })
            });
            $(_this.opts.wraper).on('click', '.j_favorable_check', function () {
                _this.checkCode();
            })
        },
        createFillCodeHtm: function () {
            var _htm = '<div class="favorable-fill-box">' +
                // '<div class="favorable-fill-header">'+Lang.H5_FAVORABLE_TITLE+'</div>' +
                '<div class="favorable-fill-input">' +
                '<input class="j_favorable_code" type="text" value="" placeholder="code:"/>' +
                '</div>' +
                '<div class="favorable-fill-btn j_favorable_check">'+Lang.H5_CONFIRM+'</div>' +
                '</div>'
            return _htm;
        },
        checkCode: function () {
            var _this = this;
            //本地校验
            var _code = $(".j_favorable_code").val() || "";

            Validator.add(_code, [{
                strategy: 'isNonEmpty',
                errorMsg: Lang.H5_FAVORABLE_TIP_NONE
            }])
            try {
                Validator.start();
            } catch (error) {
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + error.message + '</p>'
                });
                return;
            }
            var _reqData = {
                edata: {
                    action: "check",
                    price: _this.price,
                    code: _code,
                    _debug_env: "4.0"
                }
            }
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.getCoupon + '/?param=' + JSON.stringify(_reqData), function (obj) {
                if (obj.code && obj.code == 200) {
                    PaqPush && PaqPush('优惠券可用:金额为'+obj.coupon.price, '');
                    _this.fillDialog.remove(_this.checkAfterAction({
                        code: obj.coupon.code,
                        price: obj.coupon.price
                    }));
                } else {
                    PaqPush && PaqPush('优惠券不可用:原因为'+obj.message, '');
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + obj.message + '</p>'
                    });
                }
            })

        },
        checkAfterAction: function (favorableInfo) {
            var _this = this;
            //渲染优惠券金额
            var $favorablePrice = $(".j_favorable_price");
            $favorablePrice
                .text('-Rp ' + Base.others.priceFormat(Number(favorableInfo.price)))
                .attr("data-code", favorableInfo.code)
                .attr("data-price", Number(favorableInfo.price))
                .css("color", "#F5A623")
            _this.opts.usehandle && _this.opts.usehandle(favorableInfo.price, favorableInfo.code);
        }
    }
    return function (opts) {
        return new Favorable(opts);
    }
});