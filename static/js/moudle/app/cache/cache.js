/**
 * Cache模块 缓存工具
 * @author lanchenghao@weidian.com
 * @constructor namespace 命名空间, type 存储类型
 */
define([
    'base',
], function (Base) {

    //切面
    Function.prototype.before = function (func) {
        var _self = this;
        return function () {
            var after_before_args = func.apply(this, arguments)
            if (after_before_args === false) {
                return false;
            }
            return _self.apply(this, after_before_args);
        }
    }
    Function.prototype.after = function (func) {
        var _self = this;
        return function () {
            var ret = _self.apply(this, arguments);
            if (ret === false) {
                return false;
            }
            func.apply(this, arguments);
            return ret;
        }
    }


    var _tool = {
        getForLocalStorage: function (key) {
            var value = localStorage.getItem(key);
            try {
                value = JSON.parse(value);
            } catch (e) {
                return value;
            }
            return value;
        },
        setForLocalStorage: function (key, value) {
            return localStorage.setItem(key, value)
        }
    }
    _tool.setForLocalStorage = _tool.setForLocalStorage.before(function (key, value) {
        //校验是否为对象 如果是则转为json
        if (!!key && value != void 0 && value.length !== '') {
            if (typeof value == 'object') {
                value = JSON.stringify(value);
                return arguments;
            } else {
                return arguments;
            }
        }
    })
    _tool.getForLocalStorage = _tool.getForLocalStorage.before(function (key) {
        if (!(!!key && typeof key == 'string')) {
            console.log('本地存储报错:key:' + key + ":必须为STRING类型");
            return false;
        }
        return arguments;
    })


    var _typeCacheHandler = {
        local: {
            find: function (key) {
                return _tool.getForLocalStorage(key);
            },
            set: function (key, value) {
                //取出来 
                var _local = _tool.getForLocalStorage(key);
                _local = value;
                _tool.setForLocalStorage(key);
            },
            count: function () {

            },
            remove: function () {

            },
            clear: function () {

            }
        },
        memory: {
            find:function(context,key){
                return context.map[key];
            },
            set:function(context,key,value){
                return context.map[key] = value;
            },
            count:function(context){
                return Object.keys(context.map).length||0;
            },
            remove:function(){
                return delete context.map[key];
            },
            clear:function(){
                context.map = Object.create(null);
            }
        }
    }

    
    /**
     * 缓存构造函数
     * @param  {} opts
     */
    var Cache = function (opts) {

        // 命名空间
        this.namespace = opts.namespace || "default";
        // 通过new初始化 无论是否已存在namespace 均重置
        this.map = {};
        // type 存储类型 memory内存 local 本地存储 cookie 型
        this.type = opts.type || "memory";

        //扔到缓存池里
        Cache.set(this.namespace, this)
    }

    //缓存池
    Cache.pools = {};

    /**
     * 获取命名空间
     * static 
     * @param  {} namespace 命名空间
     */
    Cache.get = function (namespace) {
        return Cache.pools[namespace] || undefined;
    }
    Cache.set = function (namespace, cache) {
        Cache.pools[namespace] = cache;
    }

    /**
     * 缓存实例方法
     */
    Cache.prototype = {
        // 查询cache
        find: function (key) {
            var _context = this;
            var _contextForType = _typeCacheHandler[this.type];
            return _contextForType.find.call(_contextForType, _context, key);
        },
        // 设置cache
        set: function (key, value) {
            var _context = this;
            var _contextForType = _typeCacheHandler[this.type];
            return _typeCacheHandler[this.type].set.call(_contextForType,_context, key, value);
        },
        // 移除一个cache记录
        remove: function (key) {
            var _contextForType = _typeCacheHandler[this.type];
            return _typeCacheHandler[this.type].remove.call(_contextForType,_context, key);
        },
        // 清空cache
        clear: function () {
            var _contextForType = _typeCacheHandler[this.type];
            return _typeCacheHandler[this.type].clear.call(_contextForType,_context);
        },
        // 缓存纪录数
        count: function () {
            var _contextForType = _typeCacheHandler[this.type];
            return _typeCacheHandler[this.type].count.call(_contextForType,_context);
        }
    }

    return Cache;
});