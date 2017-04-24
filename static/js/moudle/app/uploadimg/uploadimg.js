/**
 * Created by sunchengbin on 2017/4/21.
 */
define(['md5','config'],function(SparkMD5,Config){
    var UploadImgPlugIn = function(opts){
        var _this = this;
        _this.config = $.extend({
            wrap : '.j_upload_wrap',
            selectedImgSuccess : null,//选完需要上传商品后操作
            uploadImgSuccess : null//提交上传商品图片后
        },opts);
        this.init();
    }
    UploadImgPlugIn.prototype = {
        init : function(){
            var _this = this,
                _config = _this.config;
            window.handleIframeCall = function(result){//上传图片跨域解决办法
                if(result.status.status_code == 0){
                    _config.uploadImgSuccess && _config.uploadImgSuccess(result);
                }else{

                }
            };
            if(!$('#upload-img').length){
                $(_config.wrap).append(_this.createUpLoad());
            }
            _this.handle();
        },
        handle : function(){
            var _this = this,
                _reader = new FileReader(),
                _config = _this.config;
            _reader.onload = function(e){
                //选完照片后触发
                //e.target.result
                _config.selectedImgSuccess && _config.selectedImgSuccess(e.target.result);
            };
            document.querySelector('[name="upload_img_ipt"]').onchange = function(e){
                var input = this;
                if (input.files && input.files[0]) {
                    _reader.readAsDataURL(input.files[0]);
                    _this.upImgFn(e);
                }
            };
        },
        upImgFn : function(e){//上传图片处理方法
            function getParam( md5 ) {
                return {
                    cur_idx : 1,
                    split_num : 1,
                    extend : '.jpg',
                    wduss:'',
                    seq_id : SparkMD5.hash('' + (new Date()).getTime()),//唯一值
                    user_id : '',
                    md5_cur : md5,//文件MD5值
                    md5_all : md5//文件md5值
                }
            }
            var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                file = e.target.files[0],
                chunkSize = 2097152, // read in chunks of 2MB
                chunks = Math.ceil( file.size / chunkSize ),
                currentChunk = 0,
                spark = new SparkMD5.ArrayBuffer(),
                frOnload = function(e){
                    spark.append( e.target.result ); // append array buffer
                    currentChunk++;
                    if (currentChunk < chunks){
                        loadNext();
                    } else {
                        var midHelperFile = Config.host.hrefHost+'/iframe.html';
                        document.querySelector('#upload-img').action =
                            Config.host.phpHost+'upload_split?param='
                            + JSON.stringify( getParam( spark.end() ) )
                            + '&redirectUrl=' + encodeURIComponent( midHelperFile );
                        document.querySelector('#upload-img').submit();
                        $('[name="upload_img_ipt"]').val('');
                    }
                }.bind( this ),
                frOnerror = function () {
                    //console.log( 'md5 error.' )
                };
            function loadNext() {
                var fileReader = new FileReader();
                fileReader.onload = frOnload;
                fileReader.onerror = frOnerror;
                var start = currentChunk * chunkSize,
                    end = ( ( start + chunkSize ) >= file.size ) ? file.size : start + chunkSize;
                fileReader.readAsArrayBuffer( blobSlice.call( file, start, end ) );
            }
            loadNext();
        },
        createUpLoad : function(){
            var _htm = '';
            _htm+='<div class="upload-img-box"><form id="upload-img" action="" enctype="multipart/form-data" method="post" target="resultHandlerIframe">';
            _htm+='<a class="icon-picture iconfont icon-upimg-font" href="javascript:;">';
            _htm+='<input type="file" accept="image/*" name="upload_img_ipt">';
            _htm+='</a>';
            _htm+='</form>';
            _htm+='<iframe src="" name="resultHandlerIframe" class="iframe"></iframe></div>';
            return _htm;
        }
    };
    return function(opts){
        return new  UploadImgPlugIn(opts);
    }
})