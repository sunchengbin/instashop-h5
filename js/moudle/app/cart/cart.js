/**
 * Created by sunchengbin on 16/6/2.
 * 添加购物车相关
 */
define(['base'],function(Base){
    var Cart = function(data){
        if(data){
            var _json_shop_data = localStorage.getItem('ShopData')?JSON.parse(localStorage.getItem('ShopData')):null;
            if(_json_shop_data && data){
                if(_json_shop_data.ShopInfo.id != data.item.shop.id){
                    _json_shop_data['ShopInfo']  =  data.item.shop;
                    _json_shop_data['ClientUuid']  =  data.client_uuid;
                }
            }//存在且id不相等跳出
            else{
                _json_shop_data = {
                    Cart : null,//购物车数据不需要跟着店铺变化而变化的本地数据
                    Items : null,//根据店铺而变化
                    ShopInfo : data.item.shop,//根据店铺id变化而变化
                    ClientUuid : data.client_uuid || null,//根据店铺而重置
                    Address : null//不需要根据店铺切换而改变的本地数据
                };
            }
            localStorage.setItem('ShopData',JSON.stringify(_json_shop_data));
        }
        this.initCart();
    };
    Cart.prototype = {
        initCart : function(){
            var _json_shop_data = localStorage.getItem('ShopData')?JSON.parse(localStorage.getItem('ShopData')):null,
                _cart = _json_shop_data?_json_shop_data.Cart:null;
            this.data = _json_shop_data;
            this.cart = _cart;
        },
        addItem : function(opts){
            var _this = this,
                _shop_id = opts.item.shop.id,//商铺id
                _item_id = opts.item.id;//商品id
            _this.initCart();
            if(!_this.cart){//cart不存在
                _this.cart = {};
                _this.cart[_shop_id] = {};
            }else{
                if(!_this.cart[_shop_id]){
                    _this.cart[_shop_id] = {};
                }
            }
            if(opts.sku){
                if(!_this.cart[_shop_id][opts.sku.id]){
                    _this.cart[_shop_id][opts.sku.id] = {};
                }else{
                    opts.num += _this.cart[_shop_id][opts.sku.id].num;
                }
                _this.cart[_shop_id][opts.sku.id] = opts;
            }else{
                if(!_this.cart[_shop_id][_item_id]){
                    _this.cart[_shop_id][_item_id] = {};
                }else{
                    opts.num += _this.cart[_shop_id][_item_id].num;
                }
                _this.cart[_shop_id][_item_id] = opts;
            }
            _this.data.Cart = _this.cart;
            _this.data.ShopInfo = opts.item.shop;
            localStorage.setItem('ShopData',JSON.stringify(_this.data));
            opts.callback && opts.callback.apply(_this);
        },
        removeItem : function(id,callback){
            var _this = this;
            _this.initCart();
            if(!_this.cart){
                return false;
            }
            delete _this.cart[_this.data.ShopInfo.id][id];
            if(Base.others.testObject(_this.cart[_this.data.ShopInfo.id])){
                callback && callback();
            }
            _this.data.Cart = _this.cart;
            localStorage.setItem('ShopData',JSON.stringify(_this.data));
        },
        getCarts:function(){
            var _this = this;
            _this.initCart();
            if(!_this.cart){
                return null;
            }
            return _this.cart[_this.data.ShopInfo.id];
        },
        getCartNum : function(){
            var _num = 0,
                _this = this,
                carts = _this.getCarts();
            if(!carts){return 0;}
            for(var cart in carts){
                _num += Number(carts[cart].num);
            }
            return _num;
        },
        verifyItem : function(num,item){
            var _carts = this.cart,
                _shop_id = item.shop.id;
            if(_carts){
                if(_carts[_shop_id] && _carts[_shop_id][item.id]){
                    var _num = Number(_carts[item.id].num),
                        _now_num = _num+num;
                    if(_now_num > _carts[_shop_id][item.id].stack){
                        return {
                            val : false,
                            msg : '超出库存'
                        };
                    }
                }
            }
            return {
                val : true,
                msg :''
            };
        }

    };
    return function(data){
        return new Cart(data);
    };
})