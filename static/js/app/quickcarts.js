/**
 * Created by sunchengbin on 16/7/26.
 */
require(['hbs','text!views/app/quickcarts.hbs','cart','dialog','ajax','config','base','common','btn','lang','fastclick','city'],function(Hbs,QuickCarts,Cart,Dialog,Ajax,Config,Base,Common,Btn,Lang,Fastclick,City){
    var QuickCartsHtm = {
        init : function(){
            var _this = this,
                _data = localStorage.getItem('ShopData'),
                _address = _data?JSON.parse(_data).Address:null;
            if(!_address){
                _address = {
                    "name": "",
                    "telephone": "",
                    "post": "",
                    "country_code": "62",
                    "email": "",
                    "address": {
                        "province": "",//省
                        "city": "",//市
                        "country": "",//街道
                        "street": ""//详细地址
                    }
                };
            }else{
                _this['province'] = _address.address.province;
                _this['city'] = _address.address.city;
                _this['country'] = _address.address.country;
            }
            var _htm= Hbs.compile(QuickCarts)({
                carts:init_data.carts,
                shop:init_data.shop,
                address : _address,
                name:'',
                telephone:'',
                lang:Lang
            });
            _this.carts = init_data.carts;
            $('body').prepend(_htm);
            if(_this['province']){
                _this.getLogistics();
            }
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            Fastclick.attach(document.body);
            _this.subData();
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
                        _this.clearAddress();
                        break;
                    case 'city' :
                        if($('.j_city').html() != _name){
                            $('.j_city').html(_name);
                            $('.j_country').html(Lang.H5_DISTRICT);
                        }
                        $('.j_city').html(_name);
                        $('[data-name="country"]').addClass('act');
                        _this.clearAddress();
                        break;
                    default :
                        $('.j_country').html(_name);
                        _this.getLogistics(1);
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
                disable : $('.j_submit_buy').attr('data-disable'),
                event_type : 'click',
                loading_txt:Lang.H5_SUBMITTING_ORDER,
                callback : function(dom){
                    var _that = this,
                        _items = _this.getItems();
                    if(!_items.length){
                        _that.cancelDisable();
                        _that.setBtnTxt(dom,Lang.H5_CREATE_ORDER);
                        if( $('.error-item').length == $('.j_cart_item').length){
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+(_this.msg?_this.msg:Lang.H5_ERROR)+'</p>',
                                auto_fn : function(){
                                    setTimeout(function(){
                                        location.href = Config.host.host+'s/'+init_data.shop.id;
                                    },1000);
                                }
                            });
                        }
                        return;
                    }
                    var _data = _this.getData(),
                        _tel = $.trim($('.j_tel').val());
                    if(_data && Common.telVerify(_tel,function(){
                            _this.subAjax({
                                data : _data,
                                that : _that,
                                dom : dom
                            });
                        },function(){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom,Lang.H5_CREATE_ORDER);
                        })){
                        _this.subAjax({
                            data : _data,
                            that : _that,
                            dom : dom
                        });
                    }else{
                        _that.cancelDisable();
                        _that.setBtnTxt(dom,Lang.H5_CREATE_ORDER);
                    }
                }
            });
            $('body').on('keyup','.j_tel',function(){
                var _dom = $(this),
                    _val = $.trim(_dom.val());
                if(_val.length == 20){
                    Dialog.tip({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">'+Lang.H5_TEL_PASS_20+'</p>'
                    });
                }else{

                }
                //if(_val){
                //    Common.telVerify(_dom.val());
                //}
            });
        },
        subAjax : function(opts){
            var _data = opts.data,
                _that = opts.that,
                dom = opts.dom,
                _this = this;
            if(!_data){
                _that.cancelDisable();
                _that.setBtnTxt(dom,Lang.H5_CREATE_ORDER);
                return;
            }
            Ajax.postJsonp({
                url :Config.actions.orderConfirm,
                data : {param:JSON.stringify(_data)},
                type : 'POST',
                success : function(obj){
                    //_that.cancelDisable();
                    //_that.setBtnTxt(dom,Lang.H5_CREATE_ORDER);
                    if(obj.code == 200){
                        var _bank_info = JSON.stringify(obj.order.pay_info.banks),
                            _name = $.trim($('.j_name').val()),
                            _telephone = $.trim($('.j_tel').val());
                        localStorage.setItem('OrderTotal',obj.order.total_price);
                        localStorage.setItem('BankInfo',_bank_info);
                        localStorage.setItem('OrderInfo',JSON.stringify(obj.order));
                        location.href = Config.host.hrefUrl+'ordersuccess.php?price='+obj.order.total_price+'&detail=2&shop_id='+init_data.shop.id+'&order_id='+obj.order.id_hash+'&bname='+_name+'&bphone='+_telephone+'&sname='+init_data.shop.name+'&time='+(init_data.shop.cancel_coutdown/86400);
                    }else{
                        _that.cancelDisable();
                        _that.setBtnTxt(dom,Lang.H5_CREATE_ORDER);
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
                                            Dialog.tip({
                                                top_txt : '',//可以是html
                                                body_txt : '<p class="dialog-body-p">'+(_this.msg?_this.msg:Lang.H5_ERROR)+'</p>',
                                                auto_fn : function(){
                                                    setTimeout(function(){
                                                        location.href = Config.host.host+'s/'+init_data.shop.id;
                                                    },2000);
                                                }
                                            });
                                        }else{
                                            Dialog.tip({
                                                top_txt : '',//可以是html
                                                body_txt : '<p class="dialog-body-p">'+(_this.msg?_this.msg:Lang.H5_ERROR)+'</p>',
                                                auto_fn : function(){
                                                    setTimeout(function(){
                                                        location.reload();
                                                    },2000);
                                                }
                                            });
                                        }
                                    }
                                }else{
                                    Dialog.tip({
                                        top_txt : '',//可以是html
                                        body_txt : '<p class="dialog-body-p">'+(_this.msg?_this.msg:Lang.H5_ERROR)+'</p>',
                                        auto_fn : function(){
                                            setTimeout(function(){
                                                location.href = Config.host.host+'s/'+init_data.shop.id;
                                            },2000);
                                        }
                                    });
                                }
                            },
                            error : function(error){
                                Dialog.alert({
                                    top_txt : '',//可以是html
                                    cfb_txt:Lang.H5_FRESHEN,
                                    body_txt : '<p class="dialog-body-p">'+Lang.H5_ERROR+'</p>',
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
                    _that.setBtnTxt(dom,Lang.H5_OK_ICON);
                    Dialog.alert({
                        top_txt : '',//可以是html
                        cfb_txt:Lang.H5_FRESHEN,
                        body_txt : '<p class="dialog-body-p">'+Lang.H5_ERROR+'</p>',
                        cf_fn : function(){
                            location.reload();
                        }
                    });
                }
            });
        },
        clearAddress : function(){
            $('.j_logistics_info').removeAttr('data-id');
            $('.j_logistics_info').removeAttr('data-company');
            $('.j_logistics_info').removeAttr('data-price');
            $('.j_logistics').hide();
        },
        getData : function(){
            var _this = this;
            var _data = localStorage.getItem('ShopData'),
                _data_json = _data?JSON.parse(_data):{},
                _name = $.trim($('.j_name').val()),
                _telephone = $.trim($('.j_tel').val()),
                _province = $.trim($('.j_province').html()),
                _city = $.trim($('.j_city').html()),
                _country = $.trim($('.j_country').html()),
                _street = $.trim($('.j_street').val());
            if(!_name||!_telephone||!_province||!_city||!_country||!_street||(_province==Lang.H5_PROVINCE)||(_city==Lang.H5_CITY)||(_country==Lang.H5_DISTRICT)){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_MSG_ADDRESS+'</p>'
                });
                return null;
            }//信息不完整
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
            _data_json.Address = _address;
            localStorage.setItem('ShopData',JSON.stringify(_data_json));
            var _logistics_info = $('.j_logistics_info'),
                _company = _logistics_info.length?_logistics_info.attr('data-company'):'',
                _fee_id = _logistics_info.length?_logistics_info.attr('data-id'):'',
                _seller_id = init_data.shop.id,
                _note = $.trim($('.j_buyer_note').val());
            if(_logistics_info.length && !_company){//没选择物流信息
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_SELECT_ONE_LOGISTICS_COMPANY+'</p>'
                });
                return null;
            }
            if(!_this.getItems().length){//购物车为空
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_SHOPING_NO_GOODS+'</p>'
                });
                return null;
            }
            var _data = {
                "edata": {
                    "wduss": "",
                    "address_id": "0",
                    "note": "",
                    "pay_way": "13",
                    "pay_type": 0,
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
                        if(!$('.error-item[data-id="'+_items[item].sku.id+'"]').length){
                            var _num = $('.j_cart_item[data-id="'+_items[item].sku.id+'"] .j_item_num').val();
                            _arr.push({
                                itemID:_items[item].item.id,
                                itemName:_items[item].item.item_name,
                                itemNum:(_num?_num:_items[item].num),
                                item_sku:_items[item].sku.id,
                                discount_id:(_items[item].item.is_discount?_items[item].item.discount.id:0)
                            });
                        }
                    }else{
                        if(!$('.error-item[data-id="'+_items[item].item.id+'"]').length) {
                            var _num = $('.j_cart_item[data-id="' + _items[item].item.id + '"] .j_item_num').val();
                            _arr.push({
                                itemID: _items[item].item.id,
                                itemName: _items[item].item.item_name,
                                itemNum: (_num ? _num : _items[item].num),
                                discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                            });
                        }
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
        getLogistics : function(type){
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
                        if(init_data.shop.express_free == 0){
                            if(_this.testExpress(obj.express_fee_list.list)){
                                $('.j_logistics ul').html(_this.createLogistics(obj.express_fee_list.list));
                                $('.j_logistics').show();
                                type && $('body').scrollTop(9999);
                            }else{
                                var _li = '<li>'+Lang.H5_NO_LOGISTICS_COMPANY+'</li>';
                                $('.j_logistics ul').html(_li);
                                $('.j_submit_buy').attr('data-disable',true);
                                //不能提交订单
                            }
                        }
                    }else{

                    }
                },
                function(error){
                });
        },
        testExpress : function(list){
            var _bool = false;
            for(var express in list){
                if(list[express].length){
                    _bool = true;
                }
            }
            return _bool;
        },
        createLogistics : function(data){
            var _htm = '';
            for(var item in data){
                for(var i in data[item]){
                    var _cost_day = data[item][i].cost_days?'('+data[item][i].cost_days+Lang.H5_DAYS+')':'';
                    _htm += '<li class="j_logistics_li"  data-level="'+(data[item][i].level?data[item][i].level:item)+'" data-id="'+data[item][i].id+'">'
                        +'<i class="icon iconfont check-btn icon-radio-font" data-company="'+item+'" data-price="'+data[item][i].price+'"  data-level="'+(data[item][i].level?data[item][i].level:item)+'" data-id="'+data[item][i].id+'"></i>'
                        +item+' '+data[item][i].level+_cost_day+':Rp '+Base.others.priceFormat(data[item][i].price)
                        +'</li>';
                }
            }
            return _htm;
        },
        testCarts : function(carts,type){
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
                        //_msg = Lang.H5_MSG_NO_GOOD;
                    }else{
                        //_msg = Lang.H5_SOLD_OUT;
                        _msg = Lang.H5_MSG_NO_GOOD;
                    }

                }else{
                    if(_stock >= 9999999){//没设置库存,需要联系商家
                        //_msg = Lang.H5_NO_STOCK;
                    }else{
                        if(_stock == -1){
                            _msg = Lang.H5_COMMODIFY_SHELF;
                        }else{
                            if(_stock < _num){//超出库存
                                if(item.is_discount_err){//超出限购数
                                    //_msg = Lang.H5_X_PCS_LEFT+_stock+Lang.H5_PCS;
                                    _msg = Lang.H5_MAX_BUY+_stock+Lang.H5_PCS;
                                }else{
                                    _msg = Lang.H5_X_PCS_LEFT+_stock+Lang.H5_PCS;
                                }
                            }
                        }
                    }
                }

                if(!item.valid){
                    _beal = false;
                    if($('.error-item').length == $('.j_cart_item').length){//当前购物车全部商品不能购买
                        if(!type){//提交时验证购物车商品
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+_msg+'</p>',
                                auto_fn : function(){
                                    setTimeout(function(){
                                        location.href = Config.host.host+'s/'+init_data.shop.id;
                                    },2000);
                                }
                            });
                        }else{//进入页面立即验证
                            _this.msg = _msg;
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+_msg+'</p>'
                            });
                        }

                    }
                    if(_msg){
                        if(_stock > 0 && _stock < _num){//有库存,但是购物车商品数量超出可购买数量时
                            $('.j_cart_item[data-id="'+_id+'"] .j_item_num').val(_stock);
                            $('.j_cart_item[data-id="'+_id+'"] .j_add_btn').attr('data-stock',_stock);
                            //if(!type){//进入页面就验证
                            //
                            //}else{//提交按钮提交时验证
                            //
                            //}
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+_msg+'</p>'
                            });
                        }else{
                            $('.j_cart_item[data-id="'+_id+'"]').addClass('error-item');
                            $('.j_cart_item[data-id="'+_id+'"] .j_item_num').val(0);
                            $('.j_cart_item[data-id="'+_id+'"] .j_add_btn').attr('data-stock',0);
                        }

                    }
                    $('.j_cart_item[data-id="'+_id+'"] .num').html(Lang.H5_STOCK+': '+(_stock < 0?0:_stock));
                    _this.msg = _msg;
                    return _beal;
                }
            });
            return _beal;
        },
        subData : function(){//进入页面对购物车商品进行检查
            var _that = this;
            var _items = _that.getItems(),
                _telephone = $.trim($('.j_tel').val());
            if(!_items.length){
                return;
            }
            var reqData = {
                edata : {
                    action : 'check',
                    items : _items,
                    telephone : _telephone,
                    seller_id : init_data.shop.id,
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
                            if(_that.testCarts(obj.carts,1)){
                                if($('.error-item').length == $('.j_cart_item').length){
                                    _that.msg = obj.msg;
                                }
                            }
                        }
                    }else{
                        Dialog.tip({
                            top_txt : '',//可以是html
                            body_txt : '<p class="dialog-body-p">'+obj.msg+'</p>',
                            auto_fn : function(){
                                setTimeout(function(){
                                    location.reload();
                                },2000);
                            }
                        });
                    }
                },
                error : function(error){
                    Dialog.alert({
                        top_txt : '',//可以是html
                        cfb_txt:Lang.H5_FRESHEN,
                        body_txt : '<p class="dialog-body-p">'+Lang.H5_ERROR+'</p>',
                        cf_fn : function(){
                            location.reload();
                        }
                    });
                }
            });
        }
    };
    QuickCartsHtm.init();
})