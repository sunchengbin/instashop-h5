/**
 * tab组件
 * 提供tab标签内容切换视图功能
 * @author lanchenghao@weidian.com
 */
define([
    'base',
    'config',
    'lang'
], function(Base, Config,Lang) {
    'use strict';
    var Tab = function(opts){
        this.init(opts);
    }
    Tab.prototype = {
        init:function(opts){
            this.opts = $.extend(opts);
        }
    }

    return function(opts){
        return new Tab(opts);
    }
});