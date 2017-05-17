/**
 * Created by sunchengbin on 2017/4/21.
 */
define(['md5','config','base','dialog'],function(SparkMD5,Config,Base,Dialog){
    var UploadImgPlugIn = function(opts){
        var _this = this;
        _this.config = $.extend({
            wrap : '.j_upload_wrap',
            uploadImgSuccess : null//提交上传商品图片后
        },opts);
        this.init();
    };
    UploadImgPlugIn.prototype = {
        init : function(){
            var _this = this,
                _config = _this.config;
            window.handleIframeCall = function(result){//上传图片跨域解决办法
                console.log(result);
                _this.loading && _this.loading.remove();
                if(result.result.length > 0){
                    _config.uploadImgSuccess && _config.uploadImgSuccess(result.result);
                }
            };
            if(!$('#upload-img').length){
                $(_config.wrap).append(_this.createUpLoad());
            }
            _this.handle();
        },
        handle : function(){
            var _this = this;
            $('body').on('change', '[name="imgs[]"]', function (e) {
                _this.upImgFn(e);
            });
        },
        upImgFn : function(e){//上传图片处理方法
            var _this = this,
                _buyer_id = Base.others.getUrlPrem('buyer_id'),
                _uss = Base.others.getUrlPrem('uss'),
                _img_len = $('.j_refund_img').length,
                _file_len = e.target.files.length,
                _len = _img_len + _file_len,
                _data = {
                    buyer_id: _buyer_id,
                    uss: _uss
                };
            if (_file_len > 3 || _len > 3) {
                console.log(3);
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">Kamu hanya dapat memilih maksimal 3 gambar</p>'
                });
                $('#upload_img_ipt').val('');
                return;
            }
            _this.loading = Dialog.loading({
                width: 100,
                is_cover: true
            });
            var midHelperFile = Config.host.hrefHost+'/iframe.html';
            document.querySelector('#upload-img').action =
                Config.host.phpHost+Config.actions.uploadimg+'?param='
                + JSON.stringify(_data)
                + '&redirectUrl=' + encodeURIComponent( midHelperFile );
            $('#upload-img').submit();
            $('#upload_img_ipt').val('');
        },
        createUpLoad : function(){
            var _htm = '',
                _debug_env = Config.getDebugEnv;
            _htm+='<div class="upload-img-box"><form id="upload-img" action="" enctype="multipart/form-data" method="post" target="resultHandlerIframe">';
            _htm+='<input type="file" accept="image/*" multiple="multiple" id="upload_img_ipt" name="imgs[]">';
            if(_debug_env){
                _htm+='<input type="hidden" name="_debug_env" value="'+_debug_env+'">';
            }
            _htm+='<input type="hidden" name="kind" value="refundevidence">';
            _htm+='</form>';
            _htm+='<iframe src="" name="resultHandlerIframe" class="iframe"></iframe></div>';
            return _htm;
        }
    };
    return function(opts){
        return new  UploadImgPlugIn(opts);
    }
})