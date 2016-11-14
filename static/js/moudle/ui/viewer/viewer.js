/**
 * Created by sunchengbin on 16/10/19.
 * 查看大图
 */
define(['base','slide','dialog'],function(Base,Slide,Dialog){
    var VIEWER = function(opts){
        var _this = this;
        _this.config = $.extend({
            wraper : 'body',
            btn : '.j_viewer_btn',
            arrowbox:".slide_arrow",
            speed : '.5s',
            images : null
        },opts);
        _this.isSlide = opts.images.length>1;
        _this.whichPlatform = (function (win) {
            var _is_pc = false;
            var _is_phone = false;
            if (/Android|webOS|iPhone|iPod|BlackBerry|iPad|SymbianOS|Windows Phone/i.test(win.navigator.userAgent)) {
                _is_phone = true;
            } else {
                _is_pc = true;
            }
            return {
                isPc: _is_pc,
                isPhone: _is_phone
            }
        })(window);
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
                var $viewerBox = $('<div class="viewer-box j_viewer_box"></div>');
                _this.$viewerBoxUl = $('<ul class="j_viewer_ul clearfix"></ul>');
                $viewerBox.append(_this.$viewerBoxUl);
                if(_this.isSlide){
                    for(var i = 0;i < _imgs.length;i++){
                        if(i==index){
                            _this.$viewerBoxUl.append($('<li data-src="'+_this.getImageUrl(_imgs[i])+'"><div><img src="'+_this.getImageUrl(_imgs[i])+'"></div></li>'))
                        }else{
                            _this.$viewerBoxUl.append($('<li data-src="'+_this.getImageUrl(_imgs[i])+'"><div><img src=""></div></li>'))
                        }
                    }
                }else{
                    _this.$viewerBoxUl.append('<li><div><img src="'+_this.getImageUrl(url)+'"></div></li>')
                }
                $('body').append($viewerBox);
                $('.j_viewer_ul li').css({
                    width : $(window).width()
                });
                $('.j_viewer_ul li div').css({
                    height : $(window).height(),
                    lineHeight:$(window).height()+"px"
                });
            }
            $('.j_viewer_box').css('z-index',Base.others.zIndex);
            return this;
        },
        getImageUrl : function(url){
            return url.split('?')[0]+'?w=750';
        },
        loadImg : function(url,callback){
            var _this = this;
            var _img = new Image();
            _img.src = url;
            if(_img.complete){
                _this._loading.remove();
            }
            _img.onload = function(){
                callback && callback(_img);
            };
            _img.onerror = function(){
                _this._loading.remove();
            }
        },
        fixedImageSize:function(_viewerImages,_img,index){
            var _curImg = $(_viewerImages[index]).find("img");
            _curImg.css({
                height:"100%",
                width:"inherit"
            })
            if(_img.width<_img.height){
                _curImg.css({
                    background:"#000"
                })
            }
        },
        show : function(url,index){
            var _this = this;
            _this.createViewer(url,index);
            _this._loading = Dialog.loading({
                width:100,
                is_cover:false
            })
            var _viewerImages = [];
            var _viewerLis = _this.$viewerBoxUl.children();
            for(var i=0,len=_viewerLis.length;i<len;i++){
                _viewerImages.push(_viewerLis[i]);
            }
            $('.j_viewer_box').show();
            _this.loadImg(url,function(_img){
                if(_this.whichPlatform.isPc){
                    _this.fixedImageSize(_viewerImages,_img,index)
                }
                var _slide = Slide.createNew({
                    dom: document.querySelector('.j_viewer_ul'),
                    needTab: true,
                    auto : false,
                    viewerImageLis:_viewerImages,
                    curPage : index+1
                });
                if(_slide.arrowBox){
                    $(_slide.arrowBox).on("click",function(event){
                        if("slide_arrow"==event.target.className){
                            _this.hide();
                        }
                    })
                }
                console.info(_slide);
            });
        },
        hide : function(){
            var _this = this;
            if(_this._loading)_this._loading.remove();
            $('.j_viewer_box').remove();
        }
    };
    return function(opts){
        return new VIEWER(opts);
    }
})
