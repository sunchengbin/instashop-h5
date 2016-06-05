/**
 * Created by sunchengbin on 16/6/2.
 * 添加到购物车插件
 */
define([],function(){
    var BuyDialog = function(opts){
        this.config = $.extend({
            itemId : null

        },opts);
        this.init();
    };
})