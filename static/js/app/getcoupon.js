/**
 * Created by sunchengbin on 2017/1/11.
 */
require(['lang','ajax','config','fastclick','dialog'],function(Lang,Ajax,Config,Fastclick,Dialog) {
    "use strict";
    var GetCounpon = {
        init : function(){
            var _this = this;
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            Fastclick.attach(document.body);
            $('body').on('click','.j_get_coupon_btn',function(){
                 var _tel = $.trim($('.j_tel').val());
                _this.getCoupon(_tel);
            });
        },
        getCouponId : function(){//获取url
            var _href = location.href,
                _coupon_id = _href.split('/').slice(-1);
            if(/\_/g.test(_coupon_id)){
                _coupon_id = _coupon_id.split('_')[0];
            }
            return {
                href_id : _href.split('/').slice(-1),
                coupon_id : _coupon_id
            };
        },
        saveCouponCode : function(href_id,code){//根据页面url存储领取的code,避免用户同页面url重复领取code
            var _local_coupon = localStorage.getItem('CouponList');
            if(_local_coupon){
                _local_coupon = JSON.parse(_local_coupon);
                if(!_local_coupon[href_id]){
                    _local_coupon[href_id] = code;
                }
            }else{
                _local_coupon = {};
                _local_coupon[href_id] = code;
            }
           localStorage.setItem('CouponList',JSON.stringify(_local_coupon));
        },
        getCoupon : function(tel){//获取优惠券code
            var _this = this;
            if(!tel)return;
            Ajax.postJsonp({
                url: Config.actions.orderConfirm,
                data: {
                    param: JSON.stringify({edata:{
                        tel : tel
                    }})
                },
                type: 'POST',
                timeout: 30000,
                success: function (obj) {
                    if (obj.code == 200) {
                        var _code = 'safadfa';
                        _this.saveCouponCode(_this.getCouponId().href_id,_code);
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">领取成功</p>',
                            after_fn: function () {
                                setTimeout(function () {
                                    location.href = Config.host.hrefUrl + 'coupon.php?coupon_id='+_this.getCouponId().coupon_id+'&code='+_code;
                                }, 2000);
                            }
                        });
                    } else {
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + obj.message + '</p>',
                            after_fn: function () {
                                setTimeout(function () {
                                    location.href = Config.host.hrefUrl + 'cart.php';
                                }, 2000);
                            }
                        });
                    }
                },
                error: function () {
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>'
                    });
                }
            });
        }
    };
    GetCounpon.init();
})