/**
 * Created by sunchengbin on 16/6/12.
 */
require(['hbs','text!views/app/address.hbs','city','config','lang','fastclick','dialog','cart','common','validator'],function(Hbs,Addresshtm,City,Config,Lang,Fastclick,Dialog,Cart,Common,Validator){
    var Address = {
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
                        "street": "",//详细地址
                        "post": ""//邮编
                    }
                };
            }else{
                _this['province'] = _address.address.province;
                _this['city'] = _address.address.city;
                _this['country'] = _address.address.country;
                _this['post'] = _address.address.post;
            }
            _address.lang = Lang;
            var _htm= Hbs.compile(Addresshtm)(_address);
            $('body').prepend(_htm);
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            Fastclick.attach(document.body);
            $('body').on('click','.j_go_back',function(){
                history.back();
                //var _fromurl = localStorage.getItem('FromUrl');
                //if(!_fromurl){
                //    location.href = Config.host.host+'s/'+JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id;
                //}else{
                //    location.href = Config.host.hrefUrl+'cart.php';
                //}
            });
            $('body').on('click','.j_user_address .act',function(){
                var _name = $(this).attr('data-name');
                $('.j_tel').blur();
                $('.j_name').blur();
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
                        break;
                }
            });
            $('body').on('click','.j_save_address',function(){
                var _data = localStorage.getItem('ShopData'),
                    _data_json = _data?JSON.parse(_data):{},
                    _name = $.trim($('.j_name').val()),
                    _telephone = $.trim($('.j_tel').val()),
                    _province = $.trim($('.j_province').html()),
                    _city = $.trim($('.j_city').html()),
                    _country = $.trim($('.j_country').html()),
                    _street = $.trim($('.j_street').val()),
                    _post = $.trim($('.j_post').val());
                    Validator.addBatch([
                        {target:_name,rules:[{
                            strategy: 'isNonEmpty',
                            errorMsg: '请输入内容!'
                        }]},
                        {target:_telephone,rules:[{
                            strategy: 'isNonEmpty',
                            errorMsg: '请输入内容!'
                        }]},
                        {target:_province,rules:[{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_PROVINCE
                        },{
                            strategy: 'isEqualPlaceholder',
                            errorMsg: Lang.H5_PROVINCE
                        }]},
                        {target:_city,rules:[{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_CITY
                        },{
                            strategy: 'isEqualPlaceholder',
                            errorMsg: Lang.H5_CITY
                        }]},
                        {target:_country,rules:[{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_DISTRICT
                        },{
                            strategy: 'isEqualPlaceholder',
                            errorMsg: Lang.H5_DISTRICT
                        }]},
                        {target:_street,rules:[{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_STREET
                        }]}
                    ]).start();
                if(Common.telVerify(_telephone,function(){
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
                                "street": _street,//详细地址
                                "post":_post
                            }
                        };
                        _data_json.Address = _address;
                        localStorage.setItem('ShopData',JSON.stringify(_data_json));
                        setTimeout(function(){
                            var _data = JSON.parse(localStorage.getItem('ShopData')),
                                _addr = _country + ',' + _city + ',' + _province;
                            var _item_str = JSON.stringify(_this.getAddressItems());
                            location.href = Config.host.hrefUrl+'orderconfirm.php?seller_id='+_data.ShopInfo.id+'&addr='+encodeURIComponent(_addr)+'&items='+encodeURIComponent(_item_str);
                        },0);
                    })){
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
                            "street": _street,//详细地址
                            "post":_post
                        }
                    };
                    _data_json.Address = _address;
                    localStorage.setItem('ShopData',JSON.stringify(_data_json));
                    setTimeout(function(){
                        var _data = JSON.parse(localStorage.getItem('ShopData')),
                            _addr = _country + ',' + _city + ',' + _province;
                        var _item_str = JSON.stringify(_this.getAddressItems());
                        location.href = Config.host.hrefUrl+'orderconfirm.php?seller_id='+_data.ShopInfo.id+'&addr='+encodeURIComponent(_addr)+'&items='+encodeURIComponent(_item_str);
                    },0);
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
                }
                //if(_val){
                //    Common.telVerify(_dom.val());
                //}
            });
            Common.listenAndroidKeyboardToggle(function(height){
                //$('.address-wraper').height(height);
                Common.ScorllToBottom('.j_street');
            },function(){
                Common.ScorllToBottom('.j_street');
            });

        },
        getAddressItems : function(){
            var _carts = Cart().getCarts(),
                _arr = [];
            if(!_carts){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_SHOPING_NO_GOODS+'?</p>'
                });
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
        getItems : function(){
            var _carts = Cart().getCarts(),
                _arr = [];
            if(!_carts){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_SHOPING_NO_GOODS+'?</p>'
                });
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
        CreateList : function(data,type){
            var _htm = '';
            for(var i in data){
                  _htm += '<div class="address-list-item j_list_item" data-type="'+type+'" data-val="'+(isNaN(i)?i:data[i])+'">'+(isNaN(i)?i:data[i])+'</div>'
            }
            return _htm;
        }
    };
    Address.init();
})