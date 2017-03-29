/**
 * Created by sunchengbin on 2017/1/11.
 */
define(['dialog','lang','base'],function(Dialog,Lang,Base){
    var ShareBargain = function(opts){
        var _this = this;
        _this.config = $.extend({
            title : Lang.H5_SHARE_TITLE,
            content : Lang.H5_SHARE_COUPON_TXT,
            coupon_url: 'http://m-test.instashop.co.id/b/0001'
        },opts);
        _this.init();
    };
    ShareBargain.prototype = {
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
                _share_url = _this.urlArithmetic(_this.config.coupon_url),
                _share_content = _this.config.content+'<br>'+_share_url,
                _htm = '';
            _this.share_content = _this.config.content+_share_url;
            _htm +='<div class="share-dialog-box" data-spider="coupon_share_box">'
                +'<div class="share-explain">'+Lang.H5_SHARE_COUPON_RULE
                +'</div>'
                +'<div class="share-info">'+_share_content
                +'</div>'
                +'<div class="share-operate clearfix">'
                +'<a href="javascript:;" class="j_share_action" data-type="line" spm-auto="优惠券分享到line" spm-click="" data-url="http://line.naver.jp/R/msg/text/?">'
                +'<i class="iconfont icon-share-line" ></i>'
                +'<p>LINE</p>'
                +'</a>'
                +'<a href="javascript:;" class="j_share_action" data-type="whatsapp" spm-auto="优惠券分享到whatsapp" spm-click="" data-url="whatsapp://send?text=">'
                +'<i class="iconfont icon-share-whatsapp" ></i>'
                +'<p>WhatsApp</p>'
                +'</a>'
                +'<a href="javascript:;" class="j_share_action" data-type="bbm" spm-auto="优惠券分享到bbm" spm-click="" data-url="bbmi://api/share?message=">'
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
                var _dom = $(this),
                    _type = _dom.attr('data-type');
                setTimeout(function(){
                    if(_type=='bbm'&&Base.others.verifyBower().ios){
                        var _bbm_url = Lang.H5_SHARE_TO_BBM_COUPON_TXT+_this.urlArithmetic(_this.config.coupon_url);
                        location.href = _dom.attr('data-url') + _bbm_url;
                    }else{
                        location.href = _dom.attr('data-url') + _this.share_content;
                    }

                },100);
            });
        },
        urlArithmetic : function(url){//分享url算法
            return url + '_' + Math.round(Math.random() * 10000);
        }
    };
    return function (opts) {
        return new ShareBargain(opts);
    };
})