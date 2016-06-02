/**
 * Created by sunchengbin on 15/7/1.
 * 按钮防重复提交编写
 */
define(function(){
    var btn = function(opts){
        var _this = this;
        _this.opts = $.extend({
            wraper : '',//按钮的包装层如果不为空的时候做事件代理处理
            target : '.j_btn',//按钮的class
            disable : false,//是否允许点击
            event_type : 'click',//默认点击如果移动端改成tap
            callback : null,//触发之后的操作代码
            loading_txt : '提交中...'
        },opts);
        _this.init();
    };
    btn.prototype = {
        init : function(){
            this.handleFn();
        },
        handleFn : function(){
            var _this = this,
                _opts = _this.opts;
            if(_opts.wraper){
                $(_opts.wraper).on(_opts.event_type,_opts.target,function(){
                    if(_opts.disable) return;
                    var _target = $(this);
                    _this.setDisable();
                    _this.setBtnTxt(_target,_opts.loading_txt);
                    _opts.callback && _opts.callback.call(_this,$(this));
                });
            }else{
                $(_opts.target).on(_opts.event_type,function(){
                    if(_opts.disable) return;
                    var _target = $(this);
                    _this.setDisable();
                    _this.setBtnTxt(_target,_opts.loading_txt);
                    _opts.callback && _opts.callback.call(_this,_target);
                });
            }
        },
        setBtnTxt : function(target,txt){
            $(target).html(txt);
        },
        setDisable : function(){
            this.opts.disable = true;
        },
        cancelDisable : function(){
            this.opts.disable = false;
        }
    };
    return function(opts){
        return new btn(opts);
    }
})
