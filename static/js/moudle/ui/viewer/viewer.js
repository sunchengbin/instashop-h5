/**
 * Created by sunchengbin on 16/10/19.
 * 查看大图
 */
define(['base','slide'],function(Base,Slide){
    var VIEWER = function(opts){
        var _this = this;
        _this.config = $.extend({
            wraper : 'body',
            btn : '.j_viewer_btn',
            speed : '.5s',
            images : null
        },opts);
        _this.isSlide = opts.images.length>1;
    };
    VIEWER.prototype = {
        init : function(){
            this.handleFn();
        },
        handleFn : function(){
            var _this = this,
                _config = _this.config;
            $(_config.wraper).on('click',_config.btn,function(){
                var _url = $(this).attr('data-src'),
                    _index = Number($(this).attr('data-num'));
                _this.show(_url,_index);
            });
            $(_config.wraper).on('click','.j_viewer_box li',function(e){
                //if(!$(e.target).is('img')){
                    _this.hide();
                //}
            });
        },
        createViewer : function(url,index){
            var _this = this,
                _imgs = _this.config.images;
            if($('.j_viewer_box').length == 0){
                var _html = '';
                if(_this.isSlide){
                    _html = '<div class="viewer-box j_viewer_box"><ul class="j_viewer_ul clearfix">';
                    for(var i = 0;i < _imgs.length;i++){
                        _html += '<li><div><img src="'+_this.getImageUrl(_imgs[i])+'"></div></li>';
                    }
                    _html += '</ul></div>';
                }else{
                    _html = '<div class="viewer-box j_viewer_box"><ul class="j_viewer_ul clearfix"><li><div><img src="'+_this.getImageUrl(url)+'"></div></li></ul></div>';
                }
                $('body').append(_html);
                $('.j_viewer_ul li').css({
                    width : $(window).width()
                });
                $('.j_viewer_ul li div').css({
                    height : $(window).height()
                });
            }
            $('.j_viewer_box').css('z-index',Base.others.zIndex);
            return this;
        },
        getImageUrl : function(url){
            return url.split('?')[0]+'?w=750';
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
        show : function(url,index){
            var _this = this;
            _this.createViewer(url,index);
            _this.loadImg(url,function(){
                $('.j_viewer_box').show();
                Slide.createNew({
                    dom: document.querySelector('.j_viewer_ul'),
                    needTab: false,
                    auto : false,
                    curPage : index+1
                });
            });
        },
        hide : function(){
            $('.j_viewer_box').remove();
        }
    };
    return function(opts){
        return new VIEWER(opts);
    }
})
