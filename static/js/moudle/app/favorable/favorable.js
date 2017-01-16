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
    'text!views/app/favorable.hbs'
], function (Base, Dialog, Lang, Hbs, Ajax, Config, FavorableHtml) {
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
                // 显示弹窗
                _this.fillDialog = Dialog.dialog({
                    body_txt: _this.createFillCodeHtm(),
                    show_footer: false,
                    show_top: false,
                    c_fn: function () {
                        console.log("关闭")
                    }
                })
            });
            $(_this.opts.wraper).on('click', '.j_favorable_check', function () {
                _this.checkCode();
            })
        },
        createFillCodeHtm: function () {
            var _htm = '<div class="favorable-fill-box">' +
                '<div class="favorable-fill-header">Kupon code kupon</div>' +
                '<div class="favorable-fill-input">' +
                '<input class="j_favorable_code" type="text" value="aaaaa" placeholder="code:"/>' +
                '</div>' +
                '<div class="favorable-fill-btn j_favorable_check">menentukan</div>' +
                '</div>'
            return _htm;
        },
        checkCode: function () {
            var _this = this;
            //本地校验
            var _code = $(".j_favorable_code").val() || "";
            if (!_code) {
                alert("请输入")
            }
            var _reqData = {
                edata: {
                    action: "check",
                    price: _this.price,
                    code: _code,
                    _debug_env: "4.0"
                }
            }
            //TODO ajax 不可用提示 可用关闭dialog 回填favorable-price
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.coupon + '/?param=' + JSON.stringify(_reqData), function (obj) {
                if (obj.code && obj.code == 200) {
                    _this.fillDialog.remove(_this.checkAfterAction({
                        code: obj.coupon.code,
                        price: obj.coupon.price
                    }));
                } else {
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
            //渲染订单金额
            //判断是否有邮费
            var _postPrice = $(".j_post").attr("data-price")||0;
            $(".j_sum").text('Rp '+Base.others.priceFormat(_this.price - Number(favorableInfo.price) + Number(_postPrice)));
        },
        getFavorable: function () {
            //TODO 格式处理
        }
    }
    return function (opts) {
        return new Favorable(opts);
    }
});