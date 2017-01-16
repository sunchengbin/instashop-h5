/**
 * Created by sunchengbin on 2017/1/10.
 */
require(['fastclick', 'sharecoupon'], function (Fastclick, Sharecoupon) {
    "use strict";
    var Coupon = {
        init : function(){
            var _this = this;
            _this.handleFn();
        },
        handleFn : function(){
            Fastclick.attach(document.body);
            $('body').on('click','.j_share_btn',function(){
                Sharecoupon({
                    coupon_url : init_data
                });
            });
        }
    };
    Coupon.init();
})