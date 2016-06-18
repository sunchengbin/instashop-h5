/**
 * Created by sunchengbin1 on 2015/6/24.
 * h5项目最基本的小方法
 */
define(function(){

    var SUN = {version:'1.0',dom:{},num:{},arr:{},str:{},reg:{},others:{}};

    /*添加一些父级方法*/

    SUN.others = {
        each : function(arr,fn){
            var _i = 0,
                _len = arr.length;
            if(!_len) return;
            for(;_i < _len;_i++){
                fn && fn(_i,arr[_i]);
            }
        },
        extend : function(opts) {
            
        }
    };

    SUN.dom = {
        eventUtil : {
            constructor : SUN,
            add : function(elem,type,handler){
                if(elem.addEventListener){
                    elem.addEventListener(type,handler,false);
                }else if(elem.attachEvent){
                    elem.attachEvent('on'+type,handler);
                }else{
                    elem['on'+type] = handler;
                }
            },
            remove : function(elem,type,handler){
                if(elem.removeEventListener){
                    elem.removeEventListener(type,handler,false);
                }else if(elem.detachEvent){
                    elem.detachEvent('on'+type,handler);
                }else{
                    elem['on'+type] = null;
                }
            },
            addHandler : function(elem,type,handler){
                var _this = this,
                    _elem = _this.constructor.dom.domSelector(elem);
                _this.constructor.others.each(_elem,function(i,item){
                    _this.add(item,type,handler);
                });
            },
            removeHandler : function(elem,type,handler){
                var _this = this,
                    _elem = _this.constructor.dom.domSelector(elem);                
                _this.constructor.others.each(_elem,function(i,item){
                    _this.remove(item,type,handler);
                });
            },
            getEvent : function(e){
                return e || window.event;
            },
            getTarget : function(e){
                var _this = this,
                    e = _this.getEvent(e);
                return e.target || e.srcElement;
            },
            on : function(type,elem,child,fn){
                var _this = this;
                _this.addHandler(elem,type,function(e){
                    var _target = _this.getTarget(e);
                    if(SUN.dom.matchesSelector(_target,child)){
                        fn.call(_target,e);    
                    }
                })
            }
        },
        domSelector : function (elem) {
           if(typeof elem != 'string') return;
            var _doc = document,
            _target = _doc.querySelectorAll(elem);
            return _target;
        },
        /*用来验证某个节点是否和css样式选择符匹配(用于事件代理)*/
        matchesSelector : function(elem,selector){
            if(elem.matchesSelector){
                return elem.matchesSelector(selector);
            }else if(elem.webkitMatchesSelector){
                return elem.webkitMatchesSelector(selector);
            }else if(elem.msMatchesSelector(selector)){
                return elem.msMatchesSelector(selector);
            }else if(elem.mozMatchesSelector){
                return elem.mozMatchesSelector(selector);
            }else{
                throw new Error("not supported");
            }
        }
    };
   return SUN;
})
