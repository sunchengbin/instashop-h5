/**
 * Created by sunchengbin on 2017/1/11.
 */
define(['dialog'],function(Dialog){
    var ShareCoupon = function(opts){
        var _this = this;
        _this.config = $.extend({
            title : 'Menerima kupon gratis',
            content : 'Aku benar-benar seperti toko untuk mengirim kupon gratis, datang ambil itu, sejumlah pertama datang pertama mendapatkan!',
            coupon_url: 'http://m-test.instashop.co.id/b/0001'
        },opts);
        _this.init();
    };
    ShareCoupon.prototype = {
        init : function(){
            var _this = this;
            Dialog.dialog({
                top_txt : '<p class="share-dialog-title">'+_this.config.title+'</p>',
                body_txt : _this.createHtm(),
                show_footer : false
            });
            _this.handleFn();
        },
        createHtm : function(){
            var _this = this,
                _share_content = _this.config.content+'<br>'+_this.urlArithmetic(_this.config.coupon_url),
                _htm = '';
            _this.share_content = _this.config.content+_this.urlArithmetic(_this.config.coupon_url);
            _htm +='<div class="share-dialog-box" data-spider="coupon_share_box">'
                +'<div class="share-info">'+_share_content
                +'</div>'
                +'<div class="share-explain">Tekan lama untuk berbagi garis konten, whatsapp, bbm dan media sosial lainnya, Anda bisa mendapatkan kupon melalui link.'
                +'</div>'
                +'<div class="share-operate clearfix">'
                +'<a href="javascript:;" class="j_share_action" spm-auto="优惠券分享到line" spm-click="" data-url="http://line.naver.jp/R/msg/text/?">'
                +'<i class="iconfont icon-share-line" ></i>'
                +'<p>LINE</p>'
                +'</a>'
                +'<a href="javascript:;" class="j_share_action" spm-auto="优惠券分享到whatsapp" spm-click="" data-url="whatsapp://send?text=">'
                +'<i class="iconfont icon-share-whatsapp" ></i>'
                +'<p>WhatsApp</p>'
                +'</a>'
                +'<a href="javascript:;" class="j_share_action" spm-auto="优惠券分享到bbm" spm-click="" data-url="bbmi://api/share?message=">'
                +'<i class="iconfont icon-share-bbm " ></i>'
                +'<p>BBM</p>'
                +'</a>'
                +'</div>'
                +'</div>';
            return _htm;
        },
        handleFn : function(){
            var _this = this;
            $('body').on('click','.j_share_action',function(){
                setTimeout(function(){
                    location.href = $(this).attr('data-url') + _this.share_content;
                },100);
            });
        },
        urlArithmetic : function(url){//分享url算法
            return url + '_' + Math.round(Math.random() * 10000);
        }
    };
    return function (opts) {
        return new ShareCoupon(opts);
    };
})