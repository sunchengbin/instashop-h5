/**
 * Created by sunchengbin on 16/7/26.
 */
require(['hbs','text!views/app/quickcarts.hbs','cart','dialog','ajax','config','base','common','btn','lang','fastclick','city'],function(Hbs,QuickCarts,Cart,Dialog,Ajax,Config,Base,Common,Btn,Lang,Fastclick,City){
    var QuickCartsHtm = {
        init : function(){
            var _this = this,
                _htm= Hbs.compile(QuickCarts)({
                    carts:init_data.carts,
                    shop:init_data.shop,
                    address : '',
                    name:'',
                    telephone:'',
                    lang:Lang
                });
            _this.carts = init_data.carts;
            console.log(_this.getItems());
            console.log(init_data)
            $('body').prepend(_htm);
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            Fastclick.attach(document.body);
            $('body').on('click','.j_add_btn',function(){
                var _item_num = $(this).parent().find('.j_item_num'),
                    _num = Number(_item_num.val()),
                    _stock = $(this).attr('data-stock');
                if(_stock && _stock <= _num){
                    return;
                }
                _item_num.val(++_num);
            });
            $('body').on('click','.j_reduce_btn',function(){
                var _item_num =  $(this).parent().find('.j_item_num'),
                    _num = Number(_item_num.val());
                _item_num.val((--_num > 0)?_num:1);
            });
            $('body').on('click','.j_user_address .act',function(){
                var _name = $(this).attr('data-name');
                $('.j_tel').blur();
                $('.j_name').blur();
                $('body').scrollTop(0);
                //$('.j_address_list_box').css('height',$(window).height());
                switch(_name){
                    case 'province' :
                        $('.j_list_box').html(_this.CreateList(City,'province'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
                        //$('.j_address_header').addClass('show').removeClass('hide');
                        break;
                    case 'city' :
                        $('.j_list_box').html(_this.CreateList(City[_this['province']],'city'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
                        //$('.j_address_header').addClass('show').removeClass('hide');
                        break;
                    case 'country' :
                        $('.j_list_box').html(_this.CreateList(City[_this['province']][_this['city']],'country'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
                        //$('.j_address_header').addClass('show').removeClass('hide');
                        break;
                    default :
                        break;
                }
            });
            $('body').on('click','.j_go_address',function(){
                $('.j_address_list_box').addClass('hide').removeClass('show');
                //$('.j_address_header').addClass('hide').removeClass('show');
            });
            $('body').on('click','.j_list_item',function(){
                var _name = $(this).attr('data-val'),
                    _type = $(this).attr('data-type');
                _this[_type] = _name;
                $('.j_address_list_box').addClass('hide').removeClass('show');
                $('body').scrollTop(9999);
                //$('.j_address_header').addClass('hide').removeClass('show');
                switch(_type){
                    case 'province' :
                        if($('.j_province').html() != _name){
                            $('.j_city').html(Lang.H5_CITY);
                            $('.j_country').html(Lang.H5_DISTRICT);
                            $('[data-name="country"]').removeClass('act');
                        }
                        $('.j_province').html(_name);
                        $('[data-name="city"]').addClass('act');
                        break;
                    case 'city' :
                        if($('.j_city').html() != _name){
                            $('.j_city').html(_name);
                            $('.j_country').html(Lang.H5_DISTRICT);
                        }
                        $('.j_city').html(_name);
                        $('[data-name="country"]').addClass('act');
                        break;
                    default :
                        $('.j_country').html(_name);
                        _this.getLogistics();
                        break;
                }
            });
            $('body').on('click','.j_logistics_li',function(){
                if($(this).find('.check-btn').length){
                    $('.checked-btn').addClass('check-btn').removeClass('checked-btn');
                    $(this).find('.check-btn').addClass('checked-btn');
                    $('.icon-radioed-font').addClass('icon-radio-font').removeClass('icon-radioed-font');
                    $(this).find('.check-btn').addClass('icon-radioed-font').removeClass('icon-radio-font');
                    $('.j_logistics_info').attr({
                        'data-id' : $(this).find('.check-btn').attr('data-id'),
                        'data-company' : $(this).find('.check-btn').attr('data-company'),
                        'data-price' : Number($(this).find('.check-btn').attr('data-price'))
                    });
                }
            });
            Btn({
                wraper : 'body',
                target : '.j_submit_buy',
                event_type : 'click',
                loading_txt:Lang.H5_SUBMITTING_ORDER,
                callback : function(dom){
                    var _that = this,
                        _items = _this.getItems();
                    if(!_items.length){
                        _that.cancelDisable();
                        _that.setBtnTxt(dom,Lang.H5_OK_ICON);
                        return;
                    }
                    var _data = _this.getData();
                    if(!_data){
                        _that.cancelDisable();
                        _that.setBtnTxt(dom,Lang.H5_OK_ICON);
                        return;
                    }
                    Ajax.postJsonp({
                        url :Config.actions.orderConfirm,
                        data : {param:JSON.stringify(_data)},
                        type : 'POST',
                        success : function(obj){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom,Lang.H5_OK_ICON);
                            if(obj.code == 200){
                                var _bank_info = JSON.stringify(obj.order.pay_info.banks);
                                localStorage.setItem('OrderTotal',obj.order.total_price);
                                localStorage.setItem('BankInfo',_bank_info);
                                localStorage.setItem('OrderInfo',JSON.stringify(obj.order));
                                location.href = Config.host.hrefUrl+'ordersuccess.php?price='+obj.order.total_price+'&detail=2&shop_id='+init_data.shop.id+'&order_id='+obj.order.id_hash;
                            }else{
                                var _telephone = $.trim($('.j_tel').val());
                                var reqData = {
                                    edata : {
                                        action : 'check',
                                        items : _this.getItems(),
                                        telephone:_telephone,
                                        seller_id :init_data.shop.id,
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
                                                    Dialog.confirm({
                                                        top_txt : '',//可以是html
                                                        body_txt : '<p class="dialog-body-p">error</p>',
                                                        cf_fn : function(){
                                                            location.href = Config.host.hrefUrl+'cart.php';
                                                        }
                                                    });
                                                    //var _post_price = $('.j_logistics_info').attr('data-price'),
                                                    //    _total = (_post_price && _post_price > 0) ? (Number(_post_price) + Number(_this.countSum(Cart().getCarts()))) : _this.countSum(Cart().getCarts());
                                                    //localStorage.setItem('OrderTotal', _total);
                                                    //Cart().clearCarts();
                                                    //location.href = Config.host.hrefUrl + 'ordersuccess.php';
                                                    //location.href = Config.host.hrefUrl+'cart.php';
                                                }
                                            }
                                        }else{
                                            Dialog.confirm({
                                                top_txt : '',//可以是html
                                                body_txt : '<p class="dialog-body-p">error</p>',
                                                cf_fn : function(){
                                                    location.href = Config.host.hrefUrl+'cart.php';
                                                }
                                            });
                                        }
                                    },
                                    error : function(error){
                                        Dialog.confirm({
                                            top_txt : '',//可以是html
                                            body_txt : '<p class="dialog-body-p">error</p>',
                                            cf_fn : function(){
                                                location.href = Config.host.hrefUrl+'cart.php';
                                            }
                                        });
                                    }
                                });
                            }
                        },
                        error : function(error){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom,Lang.H5_OK_ICON);
                        }
                    });
                }
            });
        },
        getData : function(){
            var _this = this;
            var _name = $.trim($('.j_name').val()),
                _telephone = $.trim($('.j_tel').val()),
                _province = $.trim($('.j_province').html()),
                _city = $.trim($('.j_city').html()),
                _country = $.trim($('.j_country').html()),
                _street = $.trim($('.j_street').val());
            if(!_name||!_telephone||!_province||!_city||!_country||!_street){return null;}//信息不完整
            var _address = {
                "name": _name,
                "telephone": _telephone,
                "post": "",
                "country_code": "62",
                "email": "",
                "address": {
                    "province": _province,//省
                    "city": _city,//市
                    "country": _country,//街道
                    "street": _street//详细地址
                }
            };
            var _logistics_info = $('.j_logistics_info'),
                _company = _logistics_info.length?_logistics_info.attr('data-company'):'',
                _fee_id = _logistics_info.length?_logistics_info.attr('data-id'):'',
                _seller_id = init_data.shop.id,
                _note = $.trim($('.j_buyer_note').val());
            if(!_company){//没选择物流信息
                return null;
            }
            if(!_this.getItems().length){//购物车为空
                return null;
            }
            var _data = {
                "edata": {
                    "wduss": "",
                    "address_id": "0",
                    "note": "",
                    "pay_way": "13",
                    "pay_type": 1,
                    "seller_id": _seller_id,
                    "buyer_id": "0",
                    "buyer_note": _note,
                    "express_company": (_company?_company:''),
                    "express_fee_id": (_fee_id?_fee_id:''),
                    "items": _this.getItems(),
                    "buyer_address": _address,
                    "frm": 6
                }
            };
            return _data;
        },
        CreateList : function(data,type){
            var _htm = '';
            for(var i in data){
                _htm += '<div class="address-list-item j_list_item" data-type="'+type+'" data-val="'+(isNaN(i)?i:data[i])+'">'+(isNaN(i)?i:data[i])+'</div>'
            }
            return _htm;
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
                    if(_items[item].sku && _items[item].sku.id){
                        var _num = $('.j_cart_item[data-id="'+_items[item].sku.id+'"] .j_item_num').val();
                        _arr.push({
                            itemID:_items[item].item.id,
                            itemName:_items[item].item.item_name,
                            itemNum:(_num?_num:_items[item].num),
                            item_sku:_items[item].sku.id,
                            discount_id:(_items[item].item.is_discount?_items[item].item.discount.id:0)
                        });
                    }else{
                        var _num = $('.j_cart_item[data-id="'+_items[item].item.id+'"] .j_item_num').val();
                        _arr.push({
                            itemID:_items[item].item.id,
                            itemName:_items[item].item.item_name,
                            itemNum:(_num?_num:_items[item].num),
                            discount_id:(_items[item].item.is_discount?_items[item].item.discount.id:0)
                        });
                    }
                }
            }
            return _arr;
        },
        getAddressItems : function(){
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
                            //itemName:_items[item].item.item_name,
                            itemNum:_items[item].num,
                            item_sku:_items[item].sku.id,
                            discount_id:(_items[item].item.is_discount?_items[item].item.discount.id:0)
                        });
                    }else{
                        _arr.push({
                            itemID:_items[item].item.id,
                            //itemName:_items[item].item.item_name,
                            itemNum:_items[item].num,
                            discount_id:(_items[item].item.is_discount?_items[item].item.discount.id:0)
                        });
                    }
                }
            }
            return _arr;
        },
        getLogistics : function(){
            var _this = this;
            var _province = $.trim($('.j_province').html()),
                _city = $.trim($('.j_city').html()),
                _country = $.trim($('.j_country').html()),
                _addr =  _country + ',' + _city + ',' + _province;
            if(!_province||!_city||!_country){return;}
            var _data = {
                edata:{
                    'action' : 'express_fee',
                    'shop_id' : init_data.shop.id,
                    'items' : _this.getAddressItems(),
                    'receive_addr' : encodeURIComponent(_addr)
                }
            };
            Ajax.getJsonp(Config.host.actionUrl+Config.actions.expressesList+'?param='+JSON.stringify(_data),
                function(obj){
                    if(obj.code == 200){
                        if(init_data.shop.express_free == 0 && obj.express_fee_list.list.JNE.length){
                            $('.j_logistics ul').html(_this.createLogistics(obj.express_fee_list.list));
                            $('.j_logistics').show();
                            $('body').scrollTop(9999);
                        }
                    }else{

                    }
                },
                function(error){
                });
        },
        createLogistics : function(data){
            var _htm = '';
            for(var item in data){
                for(var i in data[item]){
                    var _cost_day = data[item][i].cost_days?'('+data[item][i].cost_days+')':'';
                    _htm += '<li class="j_logistics_li"  data-level="'+data[item][i].level+'" data-id="'+data[item][i].id+'">'
                        +'<i class="icon iconfont check-btn icon-radio-font" data-company="'+item+'" data-price="'+data[item][i].price+'"  data-level="'+data[item][i].level+'" data-id="'+data[item][i].id+'"></i>'
                        +data[item][i].level+_cost_day+':Rp '+Base.others.priceFormat(data[item][i].price)
                        +'</li>';
                }
            }
            return _htm;
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
                if(_msg){
                    $('.j_cart_item[data-id="'+_id+'"] .error-p').remove();
                    $('.j_cart_item[data-id="'+_id+'"]').append('<p class="error-p">'+_msg+'</p>');
                }
                if(!item.valid){
                    _beal = false;
                    Dialog.tip({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">'+_msg+'</p>',
                        auto_fn : function(){
                            location.href = Config.host.hrefUrl+'cart.php?error=confirm';
                        }
                    });
                    return _beal;
                }

            });
            return _beal;
        }
    };
    QuickCartsHtm.init();
})