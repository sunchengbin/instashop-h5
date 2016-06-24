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
            var _this = this;
            if(opts.item.is_discount && !opts.item.discounting){
                Dialog.confirm({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_DCCORDING_TO_THE_ORIGINAL_PRICE_TO_BUY+'</p>',
                    cf_fn : function(){
                        _this.addToCart(opts);
                    }
                });
                return;
            }
            if(opts.price < 0){
                //alert('请联系商家,进行购买');
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_NO_PRICE+'</p>'
                });
                return;
            }else{
                if((opts.sku && (opts.sku.stock >= 9999999)) || (!opts.sku && (opts.item.stock >= 9999999))){
                    Dialog.confirm({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">'+Lang.H5_NO_STOCK+'</p>',
                        cf_fn : function(){
                            _this.addToCart(opts);
                        }
                    });
                }else{
                    _this.addToCart(opts);
                }
            }
        },
        addToCart : function(opts){
            var _this = this,
                _shop_id = opts.item.shop.id,//商铺id
                _item_id = opts.item.id;//商品id
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
                var _discout_num = _this.getItemSkus(_shop_id)[_item_id]?(_this.getItemSkus(_shop_id)[_item_id]+opts.num):null,
                    _stock = (opts.item.is_discount && opts.item.discounting)?opts.item.discount.limit_count:opts.sku.stock;;
                if(!_this.cart[_shop_id][opts.sku.id]){//某个商品的某个规格
                    if(_discout_num && !_this.verifyItem(_discout_num,_stock)){
                        Dialog.tip({
                            top_txt : '',//可以是html
                            body_txt : '<p class="dialog-body-p">'+Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT+'</p>'
                        });
                        return;
                    }
                    _this.cart[_shop_id][opts.sku.id] = {};
                }else{
                    var _test_num = opts.num + _this.cart[_shop_id][opts.sku.id].num;
                    if(_discout_num){
                        _test_num = _discout_num;
                    }
                    if(_this.verifyItem(_test_num,_stock)){
                        opts.num += _this.cart[_shop_id][opts.sku.id].num;
                    }else{
                        if(_discout_num){
                            //限购数
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT+'</p>'
                            });
                        }else{
                            //alert('超出库存');
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+Lang.H5_OVER_INVENTORY+'</p>'
                            });
                        }
                        return;
                    }
                }
                _this.cart[_shop_id][opts.sku.id] = opts;
            }else{//没有规格的商品以商品id为key
                var _discout_num = _this.getItemSkus(_shop_id)[_item_id]?(_this.getItemSkus(_shop_id)[_item_id]+opts.num):null,
                    _stock = (opts.item.is_discount && opts.item.discounting)?opts.item.discount.limit_count:opts.item.stock;
                if(!_this.cart[_shop_id][_item_id]){
                    if(_discout_num && !_this.verifyItem(_discout_num,_stock)){
                        Dialog.tip({
                            top_txt : '',//可以是html
                            body_txt : '<p class="dialog-body-p">'+Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT+'</p>'
                        });
                        return;
                    }
                    _this.cart[_shop_id][_item_id] = {};
                }else{
                    var _test_num = opts.num + _this.cart[_shop_id][_item_id].num;
                    if(_discout_num){
                        _test_num = _discout_num;
                    }
                    if(_this.verifyItem(_test_num,_stock)){
                        opts.num += _this.cart[_shop_id][_item_id].num;
                    }else{
                        if(_discout_num){
                            //限购数
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT+'</p>'
                            });
                        }else{
                            //alert('超出库存');
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+Lang.H5_OVER_INVENTORY+'</p>'
                            });
                        }
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
            },opts.isbuynow);
        },
        addCartAnimate:function(callback,buynow){
            var _w_w = $(window).width(),
                _w_h = $(window).height(),
                _wraper = $('.j_buy_plug'),
                _b_h = _wraper.height()-20;
            if(buynow == 'true'){
                callback && callback();
            }else{
                $('.j_cart_animate').remove();
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
            }
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
            if(_num > 9){
                _num = '9+';
            }
            return _num;
        },
        verifyItem : function(num,stock){
            if(num > stock){
                return false;
            }
            return true;
        },
        getItemSkus : function(shopid){
            var _this = this,
                _carts = _this.cart[shopid],
                _item = {};
            if(!_carts)return {};
            for(var item in _carts){
                if(_carts[item].item.is_discount && _carts[item].item.discounting){
                    if(_item[_carts[item].item.id]){
                        _item[_carts[item].item.id] += _carts[item].num?_carts[item].num:0;
                    }else{
                        _item[_carts[item].item.id] = _carts[item].num?_carts[item].num:0;
                    }

                }
            }
            return _item;
        }

    };
    return function(data){
        return new Cart(data);
    };
})