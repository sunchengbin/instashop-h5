/**
 * Created by sunchengbin on 16/6/12.
 */
require(['hbs','text!views/app/cart.hbs','cart','dialog','ajax','config','base','lang'],function(Hbs,Carthtm,Cart,Dialog,Ajax,Config,Base,Lang){
    var CartIndex = {
        init : function(){
            var _carts = Cart().getCarts(),
                _htm= Hbs.compile(Carthtm)({
                    cart : _carts,
                    lang : Lang
                });
            this.carts = _carts;
            $('body').prepend(_htm);
            this.handleFn();
        },
        getItems : function(){
            var _carts = this.carts,
                _arr = [];
            if(!_carts){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_SHOPING_NO_GOODS+'?</p>'
                });
                //alert('购物车里没有商品')
            }else{
                var _items = _carts;
                for(var item in _items){
                    if(_items[item].sku){
                        _arr.push({
                            itemID:_items[item].item.id,
                            itemName:_items[item].item.item_name,
                            itemNum:_items[item].num,
                            item_sku:_items[item].sku.id,
                            discount_id:(_items[item].item.is_discount?_items[item].item.discount.id:0)
                        });
                    }else{
                        _arr.push({
                            itemID:_items[item].item.id,
                            itemName:_items[item].item.item_name,
                            itemNum:_items[item].num,
                            discount_id:(_items[item].item.is_discount?_items[item].item.discount.id:0)
                        });
                    }
                }
            }
            return _arr;
        },
        handleFn : function(){
            var _that = this;
            $('body').on('tap','.j_del_cart',function(){
                var _this = $(this);
                Dialog.confirm({
                    cover_event : true,
                    cf_fn : function(){
                        Cart().removeItem(_this.attr('data-id'),function(){
                            var _htm = '<ul class=""><li class="empty-cart">'+Lang.H5_SHOPING_NO_GOODS+'</li></ul><button class="btn j_go_shop confirm-btn">'+Lang.H5_BROWSE_SHOP+'</button>';
                            $('.j_cart_list').html(_htm);
                        });
                        $('.j_cart_item[data-id="'+_this.attr('data-id')+'"]').remove();
                        delete  _that.carts[_this.attr('data-id')];
                    }
                });
            });
            $('body').on('tap','.j_go_back',function(){
                var _fromurl = localStorage.getItem('FromUrl');
                if(!_fromurl){
                    location.href = Config.host.host+'s/'+JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id;
                }else{
                    location.href = _fromurl;
                }
            });
            $('body').on('tap','.j_go_shop',function(){
                location.href = Config.host.host+'s/'+JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id;
            });
            $('body').on('tap','.j_submit_btn',function(){
                if(!JSON.parse(localStorage.getItem('ShopData')).Address){
                    Dialog.confirm({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">'+Lang.H5_NO_ADDR_TIP+'?</p>',//弹窗内容区字段
                        cf_fn : function(){
                            location.href = Config.host.hrefUrl+'address.php';
                        }
                    });
                }else{
                    var reqData = {
                        edata : {
                            action : 'check',
                            items : _that.getItems(),
                            telephone:JSON.parse(localStorage.getItem('ShopData')).Address.telephone,
                            seller_id :JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id,
                            wduss : ''
                        }
                    };
                    Ajax.postJsonp({
                        url :Config.actions.testCart,
                        data : {param:JSON.stringify(reqData)},
                        type : 'POST',
                        success : function(obj){
                            if(obj.code == 200){
                                if(obj.carts){
                                    if(_that.testCarts(obj.carts)){
                                        var _shop_data = JSON.parse(localStorage.getItem('ShopData'));
                                        _shop_data.Cart[_shop_data.ShopInfo.id] = _that.carts;
                                        localStorage.setItem('ShopData',JSON.stringify(_shop_data));
                                        var _address= JSON.parse(localStorage.getItem('ShopData')).Address.address,
                                            _addr = _address.street + ',' + _address.country + ',' + _address.city + ',' + _address.province;
                                        location.href = Config.host.hrefUrl+'orderconfirm.php?seller_id='+reqData.edata.seller_id+'&addr='+_addr;
                                    }
                                }
                            }else{
                                Dialog.confirm({
                                    top_txt : '',//可以是html
                                    body_txt : '<p class="dialog-body-p">error</p>',
                                    cf_fn : function(){
                                        location.reload();
                                    }
                                });
                            }
                        },
                        error : function(error){
                            Dialog.confirm({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">error</p>',
                                cf_fn : function(){
                                    location.reload();
                                }
                            });
                        }
                    });
                }
            });
        },
        testCarts : function(carts){
            var _this = this,
                _beal = true;
            Base.others.each(carts,function(item,i){
                var _id = item.item_sku?item.item_sku:item.itemID,
                    _num = Number(item.itemNum),
                    _stock = item.stock,
                    _msg = null;
                if(_stock == 0){//库存为0
                    _msg = Lang.H5_SOLD_OUT;
                }else{
                    if(_stock >= 9999999){//没设置库存,需要联系商家
                        //_msg = Lang.H5_NO_STOCK;
                    }else{
                        if(_stock < _num){//超出库存
                            _msg = Lang.H5_X_PCS_LEFT+_stock+Lang.H5_PCS;
                            $('.j_cart_item[data-id="'+_id+'"] .num').html(Lang.H5_QUANTITY+':'+_stock);
                            _this.carts[_id].num = _stock;
                        }
                    }
                }
                if(!item.valid){_beal = false;}
                if(_msg){
                    $('.j_cart_item[data-id="'+_id+'"] .error-p').remove();
                    $('.j_cart_item[data-id="'+_id+'"]').append('<p class="error-p">'+_msg+'</p>');
                }
            });
            return _beal;
        }
    };
    CartIndex.init();
})