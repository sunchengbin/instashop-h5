/**
 * Created by sunchengbin on 16/6/13.
 */
require(['hbs','text!views/app/orderconfirm.hbs','cart','dialog','ajax','config','base','logistics','common','btn','lang'],function(Hbs,OrderConfirm,Cart,Dialog,Ajax,Config,Base,Logistics,Common,Btn,Lang){
    var OrderConfirmHtm = {
        init : function(){
            var _this = this,
                _carts = Cart().getCarts(),
                _data = localStorage.getItem('ShopData'),
                _address = JSON.parse(_data).Address,
                _htm= Hbs.compile(OrderConfirm)({
                    data:JSON.parse(_data),
                    carts : _carts,
                    sum : _this.countSum(_carts),
                    address : _address,
                    lang:Lang,
                    express : express_data.express_fee_list.list
                });
            $('body').prepend(_htm);
            if(!Base.others.testObject(express_data.express_fee_list.list)){
                _this.logistics = Logistics({
                    data : express_data.express_fee_list.list,
                    sum : _this.countSum(_carts),
                    lang:Lang
                });
            }
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            Btn({
                wraper : 'body',
                target : '.j_submit_buy',
                event_type : 'tap',
                loading_txt:Lang.H5_SUBMITTING_ORDER,
                callback : function(dom){
                    var _that = this;
                    var _data = _this.getData();
                    if(!_data){
                        _that.cancelDisable();
                        _that.setBtnTxt(dom,Lang.H5_CONTINUE_ORDER);
                        return;
                    }
                    Ajax.postJsonp({
                        url :Config.actions.orderConfirm,
                        data : {param:JSON.stringify(_data)},
                        type : 'POST',
                        success : function(obj){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom,Lang.H5_CONTINUE_ORDER);
                            if(obj.code == 200){
                                localStorage.setItem('OrderTotal',_this.countSum(Cart().getCarts()));
                                Cart().clearCarts();
                                location.href = Config.host.hrefUrl+'ordersuccess.php';
                            }else{

                            }
                        },
                        error : function(error){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom,Lang.H5_CONTINUE_ORDER);
                        }
                    });
                }
            });
            $('body').on('tap','.j_go_back',function(){
                location.href = Config.host.hrefUrl+'cart.php';
            });
            $('body').on('tap','.j_address_wraper',function(){
                //Common.saveFromUrl(function(){
                    location.href = Config.host.hrefUrl+'address.php';
                //});
            });
            //$('body').on('tap','.j_cart_item',function(){
            //    location.href = Config.host.host+'detail/'+$(this).attr('data-itemid');
            //});
        },
        getItems : function(){
            var _carts = Cart().getCarts(),
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
        getData : function(){
            var _this = this,
                _logistics_info = $('.j_logistics_info'),
                _company = _logistics_info.length?_logistics_info.attr('data-company'):'',
                _fee_id = _logistics_info.length?_logistics_info.attr('data-id'):'',
                _shop_data = JSON.parse(localStorage.getItem('ShopData')),
                _seller_id = _shop_data.ShopInfo.id,
                _address = _shop_data.Address,
                _note = $.trim($('.j_buyer_note').val());
            if(!_company && _this.logistics){
                _this.logistics.createHtm({
                    data : express_data.express_fee_list.list,
                    lang : Lang
                }).toShow();
                return null;
            }
            var _data = {
                "edata": {
                    "wduss": "",
                    "address_id": "0",
                    "note": "",
                    "pay_way": "11",
                    "pay_type": 1,
                    "seller_id": _seller_id,
                    "buyer_id": "0",
                    "buyer_note": _note,
                    "express_company": (_company?_company:''),
                    "express_fee_id": (_fee_id?_fee_id:''),
                    "items": _this.getItems(),
                    "buyer_address": _address,
                    "frm": 2
                }
            };
            return _data;
        },
        countSum : function(carts){
            var _sum = 0;
            for(var cart in carts){
                if(carts[cart].item.is_discount){
                    _sum += carts[cart].num*carts[cart].item.discount.price;
                }else{
                    _sum += carts[cart].num*carts[cart].price;
                }

            }
            return _sum;
        }
    };
    OrderConfirmHtm.init();
})