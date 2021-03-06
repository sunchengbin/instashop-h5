/**
 * Created by sunchengbin on 16/6/12.
 */
require(['base', 'hbs', 'text!views/app/address.hbs', 'city', 'config', 'lang', 'fastclick', 'dialog', 'cart', 'common', 'validator','bargain','ajax','cookie'], function (Base, Hbs, Addresshtm, City, Config, Lang, Fastclick, Dialog, Cart, Common, Validator,Bargain,Ajax,Cookie) {
    var Address = {
        init: function () {
            var _this = this,
                _address = EditAddress ? EditAddress.buyer_address : null;
            //var _isGroup = _this.isGroup = Cart().getIsGroup();
            //var _groupid = _this._groupid = Base.others.getUrlPrem("groupid", location.href);
            //var _buyer_id = _this._buyer_id = Base.others.getUrlPrem("buyer_id", location.href) || "";
            if (!_address) {
                _address = {
                    "name": "",
                    "telephone": "",
                    "post": "",
                    "country_code": "62",
                    "email": "",
                    "address": {
                        "province": "", //省
                        "city": "", //市
                        "country": "", //街道
                        "street": "", //详细地址
                        "post": "" //邮编
                    }
                };
            } else {
                _this['province'] = _address.address.province;
                _this['city'] = _address.address.city;
                _this['country'] = _address.address.country;
                _this['post'] = _address.address.post;
            }
            _address.lang = Lang;
            var _htm = Hbs.compile(Addresshtm)(_address);
            $('body').prepend(_htm);
            _this.handleFn();
        },
        handleFn: function () {
            var _this = this;
            Fastclick.attach(document.body);
            $('body').on('click', '.j_go_back', function () {
                PaqPush && PaqPush('返回', '');
                history.back();
            });
            $('body').on('click', '.j_user_address .act', function () {
                var _name = $(this).attr('data-name');
                $('.j_tel').blur();
                $('.j_name').blur();
                switch (_name) {
                    case 'province':
                        $('.j_list_box').html(_this.CreateList(City, 'province'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
                        //$('.j_address_header').addClass('show').removeClass('hide');
                        break;
                    case 'city':
                        $('.j_list_box').html(_this.CreateList(City[_this['province']], 'city'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
                        //$('.j_address_header').addClass('show').removeClass('hide');
                        break;
                    case 'country':
                        $('.j_list_box').html(_this.CreateList(City[_this['province']][_this['city']], 'country'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
                        //$('.j_address_header').addClass('show').removeClass('hide');
                        break;
                    default:
                        break;
                }
            });
            $('body').on('click', '.j_go_address', function () {
                $('.j_address_list_box').addClass('hide').removeClass('show');
                //$('.j_address_header').addClass('hide').removeClass('show');
            });
            $('body').on('click', '.j_list_item', function () {
                var _name = $(this).attr('data-val'),
                    _type = $(this).attr('data-type');
                _this[_type] = _name;
                $('.j_address_list_box').addClass('hide').removeClass('show');
                //$('.j_address_header').addClass('hide').removeClass('show');
                switch (_type) {
                    case 'province':
                        if ($('.j_province').html() != _name) {
                            $('.j_city').html(Lang.H5_CITY);
                            $('.j_country').html(Lang.H5_DISTRICT);
                            $('[data-name="country"]').removeClass('act');
                        }
                        $('.j_province').html(_name);
                        $('[data-name="city"]').addClass('act');
                        break;
                    case 'city':
                        if ($('.j_city').html() != _name) {
                            $('.j_city').html(_name);
                            $('.j_country').html(Lang.H5_DISTRICT);
                        }
                        $('.j_city').html(_name);
                        $('[data-name="country"]').addClass('act');
                        break;
                    default:
                        $('.j_country').html(_name);
                        break;
                }
            });
            $('body').on('click', '.j_save_address', function () {
                PaqPush && PaqPush('保存', '');
                var _data = localStorage.getItem('ShopData'),
                    _data_json = _data ? JSON.parse(_data) : {},
                    _name = $.trim($('.j_name').val()),
                    _telephone = $.trim($('.j_tel').val()),
                    _province = $.trim($('.j_province').html()),
                    _city = $.trim($('.j_city').html()),
                    _country = $.trim($('.j_country').html()),
                    _street = $.trim($('.j_street').val()),
                    _post = $.trim($('.j_post').val()),
                    _is_default = $('.j_set_default').is(':checked')?1:0;
                //update by lanchenghao-https://trello.com/c/BF8TbDWE
                //信息校验
                try {
                    Validator.execBatch([{
                        target: _name,
                        rules: [{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_VALIDATOR_NAME
                        }]
                    }, {
                        target: _telephone,
                        rules: [{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_VALIDATOR_TEL
                        }]
                    }, {
                        target: _province,
                        rules: [{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_VALIDATOR_PROVINCE
                        }, {
                            strategy: 'isEqualPlaceholder:' + Lang.H5_PROVINCE,
                            errorMsg: Lang.H5_VALIDATOR_PROVINCE
                        }]
                    }, {
                        target: _city,
                        rules: [{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_VALIDATOR_CITY
                        }, {
                            strategy: 'isEqualPlaceholder:' + Lang.H5_CITY,
                            errorMsg: Lang.H5_VALIDATOR_CITY
                        }]
                    }, {
                        target: _country,
                        rules: [{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_VALIDATOR_DIS
                        }, {
                            strategy: 'isEqualPlaceholder:' + Lang.H5_DISTRICT,
                            errorMsg: Lang.H5_VALIDATOR_DIS
                        }]
                    }, {
                        target: _street,
                        rules: [{
                            strategy: 'isNonEmpty',
                            errorMsg: Lang.H5_VALIDATOR_STREET
                        }]
                    }])
                } catch (error) {
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + error.message + '</p>'
                    });
                    return;
                }
                if (Common.telVerify(_telephone, function () {
                        PaqPush && PaqPush('直接保存', '');
                        var _address = {
                            "name": _name,
                            "telephone": _telephone,
                            "post": _post,
                            "country_code": "62",
                            "flag":_is_default, //1 为默认地址 ， 0 普通地址
                            "email": "",
                            "address": {
                                "province": _province, //省
                                "city": _city, //市
                                "country": _country, //街道
                                "street": _street //详细地址
                            }
                        };
                        _this.saveAddress(_address,function(address_id){
                            location.href = Config.host.hrefUrl + 'orderconfirm.php?address_id='+address_id+'&select_items='+Base.others.getUrlPrem('select_items');
                        });
                    })) {
                    PaqPush && PaqPush('取消保存', '');
                    var _address = {
                        "name": _name,
                        "telephone": _telephone,
                        "post": _post,
                        "country_code": "62",
                        "email": "",
                        "flag":_is_default, //1 为默认地址 ， 0 普通地址
                        "address": {
                            "province": _province, //省
                            "city": _city, //市
                            "country": _country, //街道
                            "street": _street //详细地址
                        }
                    };
                    _this.saveAddress(_address,function(address_id){
                        location.href = Config.host.hrefUrl + 'orderconfirm.php?address_id='+address_id+'&select_items='+Base.others.getUrlPrem('select_items');
                    });
                }

            });
            $('body').on('keyup', '.j_tel', function () {
                var _dom = $(this),
                    _val = $.trim(_dom.val());
                if (_val.length == 20) {
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_TEL_PASS_20 + '</p>'
                    });
                }
                //if(_val){
                //    Common.telVerify(_dom.val());
                //}
            });
            Common.listenAndroidKeyboardToggle(function (height) {
                //$('.address-wraper').height(height);
                Common.ScorllToBottom('.j_street');
            }, function () {
                Common.ScorllToBottom('.j_street');
            });
            //$('body').on('click','.j_set_default',function(){
            //    var _dom = $(this);
            //    if(_dom.is('.icon-radioed-font')){
            //        _dom.removeClass('icon-radioed-font').attr();
            //    }else{
            //        _dom.addClass('icon-radioed-font').attr();
            //    }
            //});
        },
        saveAddress : function(address_info,callback){
            var _address_id = Base.others.getUrlPrem('address_id'),
                _action_url = _address_id?Config.actions.addressAction+'/'+_address_id:Config.actions.addressAction;
            var _this = this,
                _uss = Cookie.getCookie('uss'),//登录的真实账户的uss
                _buyer_id = _uss?Cookie.getCookie('uss_buyer_id'):Cookie.getCookie('buyer_id'); //匿名买家id
            var _data = {
                "edata": address_info
            };
            _address_id && (_data.edata.address_id = _address_id);
            _data.edata.buyer_id = _buyer_id;
            _uss && (_data.edata.uss = _uss);
            _this._loading = Dialog.loading();
            Ajax.postJsonp({
                url: _action_url,
                data: {
                    param: JSON.stringify(_data)
                },
                type: _address_id?'PUT':'POST',
                timeout: 30000,
                success: function (obj) {
                    _this._loading.remove();
                    if(obj.code == 200){
                        console.log(obj);
                        callback && callback(obj.buyer_address.id);
                    }else{
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>'
                        });
                    }
                },
                error: function (error) {
                    _this._loading.remove();
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                        auto_fn: function () {
                            this.remove();
                        }
                    });
                }
            });
        },
        getAddressItems: function () {
            var _this = this,
                _carts = Cart().getCarts(),
                _arr = [];
            if (!_carts) {
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SHOPING_NO_GOODS + '?</p>'
                });
            } else {
                var _items;
                //如果是分销 lanchenghao@weidian.com
                if (!!_this.isGroup) {
                    var _data = localStorage.getItem('ShopData');
                    _items = JSON.parse(_data).GroupCart[JSON.parse(_data).ShopInfo.id].group[_this._groupid];; //groupdata
                } else {
                    _items = _carts;
                }
                for (var item in _items) {
                    if (_items[item].sku) {
                        if (_items[item].item.bargain&& !Bargain.checkIsOverdue(_items[item].item.bargain)) {
                            _arr.push({
                                itemID: _items[item].item.id,
                                //itemName:_items[item].item.item_name,
                                bargain_price: Bargain.isActualAttendBargain(_items[item].item.bargain.id)?_items[item].sku.bargain_price:0,
                                itemNum: _items[item].num,
                                item_sku: _items[item].sku.id,
                                discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                            });
                        } else {
                            _arr.push({
                                itemID: _items[item].item.id,
                                //itemName:_items[item].item.item_name,
                                itemNum: _items[item].num,
                                item_sku: _items[item].sku.id,
                                discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                            });
                        }
                    } else {
                        if (_items[item].item.bargain&& !Bargain.checkIsOverdue(_items[item].item.bargain)) {
                            _arr.push({
                                itemID: _items[item].item.id,
                                bargain_price:Bargain.isActualAttendBargain(_items[item].item.bargain.id)?_items[item].item.bargain.price:0,
                                //itemName:_items[item].item.item_name,
                                itemNum: _items[item].num,
                                discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                            });
                        } else {
                            _arr.push({
                                itemID: _items[item].item.id,
                                //itemName:_items[item].item.item_name,
                                itemNum: _items[item].num,
                                discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                            });
                        }
                    }
                }
            }
            return _arr;
        },
        getItems: function () {
            var _carts = Cart().getCarts(),
                _arr = [];
            if (!_carts) {
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SHOPING_NO_GOODS + '?</p>'
                });
            } else {
                var _items = _carts;
                for (var item in _items) {
                    if (_items[item].sku) {
                        _arr.push({
                            itemID: _items[item].item.id,
                            itemName: _items[item].item.item_name,
                            itemNum: _items[item].num,
                            item_sku: _items[item].sku.id,
                            discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                        });
                    } else {
                        _arr.push({
                            itemID: _items[item].item.id,
                            itemName: _items[item].item.item_name,
                            itemNum: _items[item].num,
                            discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                        });
                    }
                }
            }
            return _arr;
        },
        CreateList: function (data, type) {
            var _htm = '';
            for (var i in data) {
                _htm += '<div class="address-list-item j_list_item" data-type="' + type + '" data-val="' + (isNaN(i) ? i : data[i]) + '">' + (isNaN(i) ? i : data[i]) + '</div>'
            }
            return _htm;
        }
    };
    Address.init();
})