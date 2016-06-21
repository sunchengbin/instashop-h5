/**
 * Created by sunchengbin on 16/6/2.
 * 添加购物车相关
 */
define(['base','lang','dialog'],function(Base,Lang,Dialog){
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
            //if(opts.price < 0 || (opts.sku && (opts.sku.stock >= 9999999)) || (!opts.sku && (opts.item.stock >= 9999999))){
            if(opts.price < 0){
                //alert('请联系商家,进行购买');
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_NO_PRICE+'?</p>'
                });
                return;
            }
            _this.initCart();
            if(!_this.cart){//cart不存在
                _this.cart = {};
                _this.cart[_shop_id] = {};
            }else{
                if(!_this.cart[_shop_id]){//当前店铺cart是否存在
                    _this.cart[_shop_id] = {};
                }
            }
            if(opts.sku){//有规格的商品以规格id为key
                if(!_this.cart[_shop_id][opts.sku.id]){//某个商品的某个规格
                    _this.cart[_shop_id][opts.sku.id] = {};
                }else{
                    var _test_num = opts.num + _this.cart[_shop_id][opts.sku.id].num;
                    if(_this.verifyItem(_test_num,opts.sku.stock)){
                        opts.num += _this.cart[_shop_id][opts.sku.id].num;
                    }else{
                        Dialog.tip({
                            top_txt : '',//可以是html
                            body_txt : '<p class="dialog-body-p">'+Lang.H5_OVER_INVENTORY+'?</p>'
                        });
                        //alert('超出库存');
                        return;
                    }
                }
                _this.cart[_shop_id][opts.sku.id] = opts;
            }else{//没有规格的商品以商品id为key
                if(!_this.cart[_shop_id][_item_id]){
                    _this.cart[_shop_id][_item_id] = {};
                }else{
                    var _test_num = opts.num + _this.cart[_shop_id][_item_id].num;
                    if(_this.verifyItem(_test_num,opts.item.stock)){
                        opts.num += _this.cart[_shop_id][_item_id].num;
                    }else{
                        //alert('超出库存');
                        Dialog.tip({
                            top_txt : '',//可以是html
                            body_txt : '<p class="dialog-body-p">'+Lang.H5_OVER_INVENTORY+'?</p>'
                        });
                        return;
                    }
                }
                _this.cart[_shop_id][_item_id] = opts;
            }
            _this.data.Cart = _this.cart;
            _this.data.ShopInfo = opts.item.shop;
            localStorage.setItem('ShopData',JSON.stringify(_this.data));
            _this.addCartAnimate(function(){
                opts.callback && opts.callback.apply(_this);
            });
            //opts.callback && opts.callback.apply(_this);
        },
        addCartAnimate:function(callback){
            var _w_w = $(window).width(),
                _w_h = $(window).height(),
                _wraper = $('.j_buy_plug'),
                _b_h = _wraper.height()-20;
            if(!$('.j_cart_animate').length){
                $('body').append('<div class="j_cart_animate" style="border-radius:50%;position:fixed;left:1rem;bottom:'+_b_h+'px;width:10px;height:10px;z-index:'+Base.others.zIndex+';background-color:#FD623C;"></div>');
            }
            setTimeout(function(){
                var _ca = document.querySelector('.j_cart_animate');
                _ca.style.webkitTransitionDuration = '.6s';
                _ca.style.webkitTransform = 'translate3d('+(_w_w-50)+'px,'+(-_w_h+_b_h+30)+'px,0)';
                setTimeout(function(){
                    $('.j_cart_animate').remove();
                    callback && callback();
                },700);
            },300);
        },
        clearCarts : function(){//创建订单后清空购物车
            var _json_shop_data = localStorage.getItem('ShopData')?JSON.parse(localStorage.getItem('ShopData')):null;
            if(_json_shop_data){
                _json_shop_data.Cart = null;
                localStorage.setItem('ShopData',JSON.stringify(_json_shop_data));
            }
        },
        removeItem : function(id,callback){
            var _this = this;
            _this.initCart();
            if(!_this.cart){
                return null;
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
            if(Base.others.testObject(_this.cart[_this.data.ShopInfo.id])){
                return [];
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
        verifyItem : function(num,stock){
            if(num > stock){
                return false;
            }
            return true;
        }

    };
    return function(data){
        return new Cart(data);
    };
})