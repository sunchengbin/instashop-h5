/**
 * Created by sunchengbin on 16/3/10.
 *
 */
define(['hbs','text!../html/views/ui/slideselect/slideselect.hbs'],function(HBS,Shtml){
    var SS = function(opts){
        var _this = this;
        _this.config = $.extend({
            val : [{
                key : '大床',
                val : 1
            },{
                key : '圆床',
                val : 2
            },{
                key : '小床',
                val : 3
            },{
                key : '单人床',
                val : 4
            },{
                key : '双人床',
                val : 5
            }]
        },opts);
        _this.init();
    };
    SS.prototype = {
        init : function(){
            this.createHtm();
            this.handelFn();
        },
        createHtm : function(){
            var _this = this,
                _htm = HBS.compile(Shtml)(
                    _this.config.val
                );
            $('body').prepend(_htm);
        },
        handelFn : function(){
            var _this = this,
                _config = _this.config,
                _wraper = document.querySelector('.j_cover_box');
            _wraper.addEventListener('touchstart',function(e){
                e.preventDefault();
                _this.touchStart(e);
            },false);
            _wraper.addEventListener('touchmove',function(e){
                e.preventDefault();
                _this.touchMove(e);
            },false);
            _wraper.addEventListener('touchend',function(e){
                e.preventDefault();
                _this.touchEnd(e);
            },false);
        },
        touchStart:function(e){
            if (!e.touches.length) return;
            var _this = this,
                _touch = e.touches[0],
                _start_x = _touch.pageX,
                _start_y = _touch.pageY;
            _this.config.start = {
                x : _start_x,
                y : _start_y
            };
        },
        touchMove:function(e){
            if (!e.touches.length) return;
            var _this = this,
                _touch = e.touches[0],
                _config = _this.config,
                _move_x = _touch.pageX - _config.start.x,
                _move_y = _touch.pageY - _config.start.y,
                _dom = document.querySelector('.j_value_box');
            _dom.style.webkitTransitionDuration = '0.6s';
            _dom.style.webkitTransform = "translate3d(0, "+_move_y+"px,0)";
            _this.config.start = {
                x : _move_x,
                y : _move_y
            };
            //console.log(_move_x+'-'+_move_y)

        },
        touchEnd:function(e){
            e.preventDefault();
            //if (!e.touches.length) return;
            var _this = this,
                _config = _this.config,
                _dom = document.querySelector('.j_value_box');
            _dom.style.webkitTransitionDuration = '0.6s';
            _dom.style.webkitTransform = "translate3d(0, "+_this.countRange(_config.start.y)+"px,0)";

        },
        countRange : function(y){
            var _dom = $('.j_value_box li'),
                _num = _dom.length,
                _li_height = _dom.eq(0).height(),
                _move_y = Math.round(y/26)*26;
                if(_move_y > 2*_li_height){
                    _move_y = 2*_li_height;
                }
                if(_move_y < -2*_li_height){
                    _move_y = -2*_li_height;
                }
            return _move_y;
        }

    };
    return function(opts){
        return new SS(opts);
    }
})