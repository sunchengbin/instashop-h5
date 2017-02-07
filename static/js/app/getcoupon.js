/**
 * Created by sunchengbin on 2017/1/11.
 */
require(['lang','ajax','config','fastclick','dialog','common','btn'],function(Lang,Ajax,Config,Fastclick,Dialog,Common,Btn) {
    "use strict";
    var GetCounpon = {
        init : function(){
            var _this = this,
                _code = _this.gettedCoupon().code;
            if(_code){
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">'+Lang.H5_GETTED+'</p>',
                    after_fn: function () {
                        setTimeout(function () {
                            location.href = Config.host.hrefUrl + 'coupon.php?coupon_id='+_this.getCouponId().coupon_id+'&code='+_code;
                        }, 2000);
                    }
                });
            }
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            Fastclick.attach(document.body);
            Btn({
                wraper: 'body',
                target: '.j_get_coupon_btn',
                event_type: 'click',
                loading_txt: Lang.H5_SUNMITING,
                callback: function (dom) {
                    var _that = this;
                    var _tel = $.trim($('.j_tel').val());
                    if(!_tel){
                        _that.cancelDisable();
                        _that.setBtnTxt(dom, Lang.H5_GET);
                        return;
                    }
                    if(Common.telVerify(_tel,function(){
                            _this.getCoupon(_tel,function(){
                                _that.cancelDisable();
                                _that.setBtnTxt(dom, Lang.H5_GET);
                            });
                        },function(){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_GET);
                        })){
                        _this.getCoupon(_tel,function(){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_GET);
                        });
                    }
                }
            });
            //$('body').on('click','.j_get_coupon_btn',function(){
            //     var _tel = $.trim($('.j_tel').val());
            //    if(Common.telVerify(_tel,function(){
            //        _this.getCoupon(_tel,function(){
            //
            //        });
            //    })){
            //        _this.getCoupon(_tel,function(){
            //
            //        });
            //    }
            //});
        },
        gettedCoupon : function(){//进入页面要判断是否领过优惠券
            var _this = this,
                _coupon_id = _this.getCouponId(),
                _local_coupon = localStorage.getItem('CouponList');
            if(_local_coupon){
                _local_coupon = JSON.parse(_local_coupon);
                if(_local_coupon[_coupon_id.href_id]){
                    return {
                        code : _local_coupon[_coupon_id.href_id]
                    };
                }else{
                    return {
                        code : null
                    };
                }
            }else{
                return {
                    code : null
                };
            }
        },
        getCouponId : function(){//获取url
            var _href = location.href,
                _coupon_id = _href.split('?')[0].split('/').slice(-1)[0];
            if(/\_/g.test(_coupon_id)){
                _coupon_id = _coupon_id.split('_')[0];
            }
            return {
                href_id : _href.split('?')[0].split('/').slice(-1)[0],
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
        getCoupon : function(tel,callback){//获取优惠券code
            var _this = this,
                _coupon_id = _this.getCouponId();
            if(!tel){
                callback && callback();
                return;
            }
            Ajax.postJsonp({
                url: Config.actions.getCoupon,
                data: {
                    param: JSON.stringify({edata:{
                        telephone : tel,
                        coupon_id : _coupon_id.coupon_id
                    }})
                },
                type: 'PUT',
                timeout: 30000,
                success: function (obj) {
                    callback && callback();
                    if (obj.code == 200) {
                        PaqPush && PaqPush('领取成功', 'tel:'+tel);
                        var _code = obj.coupon.code;
                        _this.saveCouponCode(_coupon_id.href_id,_code);
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">'+Lang.H5_GET_COUPON_SUCCESS+'</p>',
                            after_fn: function () {
                                setTimeout(function () {
                                    location.href = Config.host.hrefUrl + 'coupon.php?coupon_id='+_coupon_id.coupon_id+'&code='+_code;
                                }, 2000);
                            }
                        });
                    } else {
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + obj.message + '</p>'
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