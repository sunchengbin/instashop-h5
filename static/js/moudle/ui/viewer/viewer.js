/**
 * Created by sunchengbin on 16/10/19.
 * 查看大图
 */
define(['base'],function(Base){
    var VIEWER = function(opts){
        var _this = this;
        _this.config = $.extend({
            wraper : 'body',
            btn : '.j_viewer_btn',
            speed : '.5s'
        },opts);
    };
    VIEWER.prototype = {
        init : function(){
            this.handleFn();
        },
        handleFn : function(){
            var _this = this,
                _config = _this.config;
            $(_config.wraper).on('click',_config.btn,function(){
                var _url = $(this).attr('data-src');
                _this.show(_url);
            });
            $(_config.wraper).on('click','.j_viewer_box',function(){
                _this.hide();
            });
        },
        createViewer : function(url){
            if($('.j_viewer_box').length){
                $('.j_viewer_box img').attr('src',url);
                $('.j_viewer_box div').css({
                    width : $(window).width(),
                    height : $(window).height()
                });
            }else{
                var _html = '<div class="j_viewer_box viewer-box"><div><img src="'+url+'"></div></div>';
                $('body').append(_html);
            }
            $('.j_viewer_box').css('z-index',Base.others.zIndex);
            $('.j_viewer_box div').css({
                width : $(window).width(),
                height : $(window).height()
            });
            return this;
        },
        loadImg : function(url,callback){
            var _img = new Image();
            _img.src = url;
            _img.onload = function(){
                callback && callback();
            };
            _img.onerror = function(){

            }
        },
        show : function(url){
            var _this = this;
            _this.createViewer(url);
            _this.loadImg(url,function(){
                $('.j_viewer_box').show();
                setTimeout(function(){
                    var _img = document.querySelector('.j_viewer_box img');
                    _img.style.webkitTransitionDuration = _this.config.speed;
                    _img.style.webkitTransform = 'scale(1)';
                    _img = null;
                },100);
            });
        },
        hide : function(){
            $('.j_viewer_box').hide();
            var _img = document.querySelector('.j_viewer_box img');
            _img.style.webkitTransform = 'scale(0)';
        }
    };
    return function(opts){
        return new VIEWER(opts);
    }
})
