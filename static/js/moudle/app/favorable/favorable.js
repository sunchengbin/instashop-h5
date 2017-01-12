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
    'text!views/app/favorable.hbs'
], function (Base, Dialog, Lang, Hbs, FavorableHtml) {
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
                    show_top: false
                })
            });
            $(_this.opts.wraper).on('click','.j_favorable_check',function(){
                _this.checkCode();
            })
        },
        createFillCodeHtm: function () {
            var _htm = '<div class="favorable-fill-box">' +
                    '<div class="favorable-fill-header">Kupon code kupon</div>' +
                    '<div class="favorable-fill-input">' +
                    '<input type="text" placeholder="code:"/>' +
                    '</div>' +
                    '<div class="favorable-fill-btn j_favorable_check">menentukan</div>' +
                '</div>'
            return _htm;
        },
        checkCode:function(){
            var _this = this;
            //TODO ajax 不可用提示 可用关闭dialog 回填favorable-price
            _this.fillDialog.remove(_this.checkAfterAction({
                code:"84848483",
                price:"20000"
            }));
        },
        checkAfterAction:function(favorableInfo){
            var _this = this;
            var $favorablePrice = $(".j_favorable_price");
            $favorablePrice
                .text('-Rp '+Base.others.priceFormat(favorableInfo.price))
                .attr("data-code",favorableInfo.code)
                .attr("data-favorable-price",favorableInfo.price)
                .css("color","#F5A623")
        },
        getFavorable:function(){
            //TODO 格式处理
        }
    }
    return function (opts) {
        return new Favorable(opts);
    }
});