/**
 * 滚动延迟加载图片，需要提前加载一个预置图片格式为
 * <span data-img="http://www.test.com/1.jpg" class="lazy"></span>
 * 或者<img src="本地默认" data-img="http://www.test.com/1.jpg" class="lazy"></span>
 * @class LazyLoad
 * @static
 * @requires xn.mobile.lib.base.js
 * @author sunchengbin
 */
define(function() {
    var LazyLoad = function(opts){
        this.init();
    };
    LazyLoad.prototype = {
        time: null,
        hasEvent: false,
        init: function(type) {
            var _this = this;
            _this.time && clearTimeout(_this.time);
            _this.time = setTimeout(function() {
                _this.lazyLoadImage(type);
            }, 130);
            /* 绑定一次即可 */
            if (!_this.hasEvent) {
                window.addEventListener('scroll', function() {
                    clearTimeout(_this.time);

                    _this.time = setTimeout(function() {

                        _this.lazyLoadImage();

                    }, 100);

                }, false);
                _this.hasEvent = true;
            }
        },
        lazyLoadImage: function(type, wrap) {
            var imageEls = document.querySelectorAll('[data-img]'),
                i,
                l = imageEls.length,
                _this = this;
            for (i = 0; i < l; i++) {
                /*直接进行加载当页全部图片，而不进行滚动加载*/
                if (type && type == 'all') {
                    _this.imageReplace(imageEls[i]);
                } else {
                    _this.imageVisiable(imageEls[i]);
                }
            }
        },

        /**
         * 判断元素是否在可视区域
         * @param {DOM} imageEl 指定的图片
         * @param {DOM} imageEl 图片容器
         */
        imageVisiable: function(imageEl) {
            var pos = imageEl.getBoundingClientRect(),
                _this = this;

            if ((pos['top'] > 0 && window['innerHeight']+100 - pos['top'] > 0) || (pos['top'] <= 0 && pos['bottom'] >= 0)) {
                _this.imageReplace(imageEl);
            } else {
                return;
            }
        },

        /**
         * 给img元素赋予新的背景图片地址
         * @param {DOM} imageEl 指定的图片
         */
        imageReplace: function(imageEl) {
            if (!imageEl) return;

            var imgEl = $(imageEl),
                imgSrc = imgEl.attr('data-img');

            if (!!imgSrc) {
                if(!imgEl.is('img')){
                    imgEl.css('background-image', 'url(' + imgSrc + ')');
                    imgEl.removeAttr('data-img');
                }else{
                    imgEl.attr("src",imgSrc);
                    imgEl.removeAttr('data-img');
                }

            }

        }
    };

    return function(opts){
        return new LazyLoad(opts);
    };
});