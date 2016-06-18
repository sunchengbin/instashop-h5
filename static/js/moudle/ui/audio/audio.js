/**
 * Created by sunchengbin on 16/3/23.
 */
define([],function(){
    var AUDIO = function(opts){
        this.config = $.extend({
            wraper : 'body',
            dom : '.j_audio',
            btn : '.j_start',
            animateClass:'play',
            callback : null
        },opts);
        this.init();
    };
    AUDIO.prototype = {
        init : function(){
            this.handleFn();
        },
        handleFn:function(){
            var _this = this,
                _config = _this.config;
            _this.play();
            document.querySelector(_config.btn).addEventListener('touchstart',function(){
                var _dom = $(_config.btn);
                if(_dom.is('.'+_config.animateClass)){
                    _this.paused();
                }else{
                    _this.play();
                }
            },false);
        },
        play : function(){//play
            var _this = this,
                _config = _this.config,
                audio = document.querySelector(_config.dom);
            audio.play();
            $(_this.config.btn).addClass(_config.animateClass);
            _config.callback && _config.callback();
        },
        paused : function(){//暂停
            var _this = this,
                _config = _this.config,
                audio = document.querySelector(_config.dom);
            audio.pause();
            $(_config.btn).removeClass(_config.animateClass);
        }
    };
    return function(opts){
        return new AUDIO(opts);
    }
})