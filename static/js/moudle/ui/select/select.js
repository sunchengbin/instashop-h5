/**
 * Created by sunchengbin on 15/6/30.
 * 自定义样式select组建
 */
define(['base'],function(base){
    var others = base.others,
        select = function(opts){
            var _this = this;
            _this.opts = $.extend({
                container : '.j_s_container',//放置select的容器
                options : [{
                    name : '请选择',
                    val : ''
                }],
                value : '',////存储select的选项val值
                value_name : '请选择',//存储select的选项name值
                change_fn : null,//select选项change的时候触发
                event_type : 'click'//默认触发选中状态事件
            },opts);
            _this.init();
            return _this;
        };
    select.prototype = {
        init : function(){
            var _this = this;
            _this.createSelect();
            _this.setZindex();
            _this.handleFn();
        },
        setZindex : function(){
            var _zindex = base.others.zindex++;
            this.opts.wraper.add(this.opts.wraper.find('.j_s_options')).css('zIndex',_zindex);
        },
        handleFn : function(){
            var _this = this,
                _dom = _this.opts.container+' .j_s_wraper';
            $('body').bind(_this.opts.event_type,function(e){
                var _target = $(e.target),
                    _default_val = _this.opts.value;
                if(_target.is(_dom) || _target.parents(_dom).length){
                    if(_target.is('.j_s_options li')){
                        _default_val = _target.attr('data-val');
                    }
                    _this.setAct(_default_val);
                    if($(_dom+' .j_s_options').is('.hidden')){
                        _this.keyupFn();
                        _this.show();
                    }else{
                        _this.setValue();
                        _this.hide();
                    }
                }else{
                    _this.hide();
                }
            });
        },
        keyupFn : function(){
            var _this = this,
                _dom= _this.opts.container+' .j_s_wraper';
            $(document).unbind('keyup').bind('keyup',function(e){
                var _kc = e.keyCode;
                if(!$(_dom+' .j_s_options').is('.hidden')){
                    if(_kc == 13){
                        _this.setValue();
                        _this.hide();
                    }else if(_kc == 38){
                        _this.changeAct('up');
                    }else if(_kc == 40){
                        _this.changeAct('down');
                    }
                }
            });
        },
        changeAct : function(type){
            var _this = this,
                _opts = _this.opts,
                _len = _opts.options.length - 1,
                _act_num = _opts.wraper.find('li').index(_opts.wraper.find('li.act'));
            if(type == 'up'){
                if(_act_num > 0) {
                    _act_num--;
                }else{
                    _act_num = _len;
                }
            }else{
                if(_act_num == _len){
                    _act_num = 0;
                }else{
                    _act_num++;
                }
            }
            _this.setAct(_opts.wraper.find('li:eq('+_act_num+')').attr('data-val'));
        },
        show : function(){
            this.opts.wraper.find('.j_s_options').removeClass('hidden');
        },
        hide : function(){
            this.opts.wraper.find('.j_s_options').addClass('hidden');
        },
        setValue : function(){
            var _opts = this.opts,
                _options = _opts.wraper.find('.j_s_options'),
                _act = _options.find('.act'),
                _old_val = _opts.value,
                _val = _opts.value = _act.attr('data-val'),
                _name = _opts.value_name = _act.text();
            _opts.wraper.find('.j_s_val').html(_name).attr('data-val',_val);
            if(_old_val != _act.attr('data-val')){
                _opts.change_fn && _opts.change_fn.call(this);
            }
        },
        setAct : function(val){
            var _wraper = this.opts.wraper;
            _wraper.find('li.act').removeClass('act');
            _wraper.find('li[data-val="'+val+'"]').addClass('act');
        },
        createSelect : function(){
            var _this = this,
                _htm = '';
            _htm = '<div class="select-wraper j_s_wraper"><input class="j_s_wraper" type="text" style="display: none;"/>'
                    +'<p class="select-value j_s_val" data-val="'+_this.opts.value+'">'+_this.opts.value_name+'</p>'
                    +'<ul class="select-options hidden j_s_options">';
            $.each(_this.opts.options,function(i,item){
                _htm += '<li class="" data-val="'+item.val+'">'+item.name+'</li>';
            });
            _htm +='</ul></div>';
            var _wraper = _this.opts.wraper = $(_htm);
            $(_this.opts.container).html(_wraper);
        },
        getValue : function(){
            return this.opts.value;
        }
    };
    return function(opts){
        return new select(opts);
    };
})