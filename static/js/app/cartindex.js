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
            $('body').prepend(_htm);
            this.handleFn();
        },
        getItems : function(){
            var _carts = Cart().getCarts(),
                _arr = [];
            if(!_carts){
                Dialog.tip({
                    body_txt : Lang.H5_SHOPING_NO_GOODS,
                    c_fn : function(dom){
                        console.log(dom);
                    }
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
                            item_sku:_items[item].sku.id
                        });
                    }else{
                        _arr.push({
                            itemID:_items[item].item.id,
                            itemName:_items[item].item.item_name,
                            itemNum:_items[item].num
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
                var reqData = {
                    edata : {
                        action : 'check',
                        items : _that.getItems(),
                        seller_id :JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id,
                        wduss : ''
                    }
                };
                if(!JSON.parse(localStorage.getItem('ShopData')).Address){
                    Dialog.confirm({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">'+Lang.H5_NO_ADDR_TIP+'?</p>',//弹窗内容区字段
                        cf_fn : function(){
                            location.href = Config.host.hrefUrl+'address.php';
                        }
                    });
                }else{
                    Ajax.postJsonp({
                        url :Config.actions.testCart,
                        data : {param:JSON.stringify(reqData)},
                        type : 'POST',
                        success : function(obj){
                            if(obj.code == 200){
                                var _address= JSON.parse(localStorage.getItem('ShopData')).Address.address,
                                    _addr = _address.street + ',' + _address.country + ',' + _address.city + ',' + _address.province;
                                location.href = Config.host.hrefUrl+'orderconfirm.php?seller_id='+reqData.edata.seller_id+'&addr='+_addr;
                            }else{

                            }
                        },
                        error : function(error){

                        }

                    });
                }
            });
        }
    };
    CartIndex.init();
})