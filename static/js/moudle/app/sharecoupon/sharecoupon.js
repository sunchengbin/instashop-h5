/**
 * Created by sunchengbin on 2017/1/11.
 */
define(['dialog'],function(Dialog){
    var ShareCoupon = function(opts){
        var _this = this;
        _this.config = $.extend({
            title : '',
            content : '',
            coupon_url: 'javascript:;'
        },opts);
        _this.init();
    };
    ShareCoupon.prototype = {
        init : function(){
            var _this = this;
            Dialog.dialog({

            });
            _this.handleFn();
        },
        createHtm : function(){
            var _this = this,
                _htm = '';
            _htm +='<div class="share-dialog-box">'
                +'<p class="title">sdfsdf</p>'
                +'<div class="share-info">sfsdfsdf'
                +'</div>'
                +'<div class="share-explain">sdfsfadsfadf'
                +'</div>'
                +'<div class="share-operate clearfix">'
                +'<a href="javascript:;">'
                +'<i class="iconfont icon-share-line j_share_action" data-url=""></i>'
                +'<p>LINE</p>'
                +'</a>'
                +'<a href="javascript:;">'
                +'<i class="iconfont icon-share-whatsapp j_share_action" data-url=""></i>'
                +'<p>WhatsApp</p>'
                +'</a>'
                +'<a href="javascript:;">'
                +'<i class="iconfont icon-share-bbm j_share_action" data-url=""></i>'
                +'<p>BBM</p>'
                +'</a>'
                +'</div>'
                +'</div>';
            return _htm;
        },
        handleFn : function(){

        }
    };
    return ShareCoupon;
})