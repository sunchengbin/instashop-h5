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
                    express : (JSON.parse(_data).ShopInfo.express_free == 0 && express_data.express_fee_list.list.JNE.length)
                });
            $('body').prepend(_htm);
            if(JSON.parse(_data).ShopInfo.express_free == 0 && express_data.express_fee_list.list.JNE.length){
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
            $('body').on('click',function(e){
                console.log($(e.target))
                if(!$(e.target).is('textarea')){
                    //alert('s')
                    $('textarea').blur();
                }
            });
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
                                var _post_price = $('.j_logistics_info').attr('data-price'),
                                    _total = (_post_price&&_post_price>0)?(Number(_post_price)+Number(_this.countSum(Cart().getCarts()))):_this.countSum(Cart().getCarts());
                                localStorage.setItem('OrderTotal',_total);
                                Cart().clearCarts();
                                location.href = Config.host.hrefUrl+'ordersuccess.php?price='+obj.order.total_price;
                            }else{
                                var reqData = {
                                    edata : {
                                        action : 'check',
                                        items : _this.getItems(),
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
                                                if(_this.testCarts(obj.carts)) {
                                                    var _post_price = $('.j_logistics_info').attr('data-price'),
                                                        _total = (_post_price && _post_price > 0) ? (Number(_post_price) + Number(_this.countSum(Cart().getCarts()))) : _this.countSum(Cart().getCarts());
                                                    localStorage.setItem('OrderTotal', _total);
                                                    Cart().clearCarts();
                                                    location.href = Config.host.hrefUrl + 'ordersuccess.php';
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
        testCarts : function(carts){
            var _this = this,
                _beal = true;
            Base.others.each(carts,function(item,i){
                var _id = item.item_sku?item.item_sku:item.itemID,
                    _num = Number(item.itemNum),
                    _stock = item.stock,
                    _msg = null;
                if(_stock == 0){//库存为0
                    if(item.is_discount_err){
                        _msg = Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT;
                    }else{
                        _msg = Lang.H5_SOLD_OUT;
                    }

                }else{
                    if(_stock >= 9999999){//没设置库存,需要联系商家
                        //_msg = Lang.H5_NO_STOCK;
                    }else{
                        if(_stock == -1){
                            _msg = Lang.H5_COMMODIFY_SHELF;
                        }else{
                            if(_stock < _num){//超出库存
                                if(item.is_discount_err){
                                    _msg = Lang.H5_X_PCS_LEFT+_stock+Lang.H5_PCS;
                                }else{
                                    _msg = Lang.H5_X_PCS_LEFT+_stock+Lang.H5_PCS;
                                }
                            }
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
                if(carts[cart].item.is_discount && carts[cart].item.discounting){
                    _sum += carts[cart].num*carts[cart].item.discount.price;
                }else{
                    _sum += carts[cart].num*carts[cart].item.price;
                }

            }
            return _sum;
        }
    };
    OrderConfirmHtm.init();
})