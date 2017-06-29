/**
 * Created by sunchengbin on 2017/6/21.
 */
/**
 * Created by sunchengbin on 16/7/26.
 */
require([ 'dialog', 'ajax', 'config', 'base', 'common', 'btn', 'lang', 'fastclick', 'city', 'quickbuyplug', 'validator', 'favorable', 'debug','insjs'], function ( Dialog, Ajax, Config, Base, Common, Btn, Lang, Fastclick, City, QuickBuyplug, Validator, Favorable, Debug,Insjs) {
    var DistributorOrderConfirm = {
        init: function () {
            var _this = this,
                _address = init_data.buyer_address;
            alert(_address);
            _this.carts = _this.transCartInfo();
            //初始化本地数据
            if (!_address.address) {
                //地址信息
                _address = {
                    "name": "",
                    "telephone": "",
                    "post": "",
                    "country_code": "62",
                    "email": "",
                    "address": {
                        "province": '', //省
                        "city": '', //市
                        "country": '', //街道
                        "street": "", //详细地址
                        "post": "" //邮编
                    }
                };
            } else {
                _this['province'] = _address.address.province;
                _this['city'] = _address.address.city;
                _this['country'] = _address.address.country;
                _this['post'] = _address.address.post;
                _this['street'] = _address.address.street;
            }
            //本地地址初始化
            _this.initLocalStorage(_address);
            if (_this['province']) {
                _this.getLogistics();
            }
            Insjs.WebOnReady(function(bridge){
                _this.handleFn(bridge);
            },function(){
                _this.handleFn();
            });
        },
        initLocalStorage: function (address) { //根据本地地址数据自动填写用户信息
            address.name && $('.j_name').val(address.name);
            address.telephone && $('.j_tel').val(address.telephone);
            address.address.street && $('.j_street').val(address.address.street);
            address.address.post && $('.j_post').val(address.address.post);
            if (address.address.province) {
                $('.j_province').html(address.address.province);
                $('[data-name="city"]').addClass('act');
            } else {
                $('.j_province').html(Lang.H5_PROVINCE);
            }
            if (address.address.city) {
                $('.j_city').html(address.address.city);
                $('[data-name="city"]').addClass('act');
                $('[data-name="country"]').addClass('act');
            } else {
                $('.j_city').html(Lang.H5_CITY);
            }
            if (address.address.country) {
                $('.j_country').html(address.address.country);
            } else {
                $('.j_country').html(Lang.H5_DISTRICT);
            }
        },
        handleFn: function (bridge) {
            var _this = this;
            if(!bridge){
                alert('not find bridge');
                return;
            }
            (function(bridge){
                var _close_param = {
                    param:{
                        type : 'close_loading',
                        param : null
                    }
                };
                //关闭webview的loading动画
                bridge.callHandler('insSocket',_close_param, function(response) {
                    return null;
                });
            })(bridge);
            Fastclick.attach(document.body);
            $('body').on('click', '.j_user_address .act', function () {
                var _name = $(this).attr('data-name');
                $('.j_tel').blur();
                $('.j_name').blur();
                $('body').scrollTop(0);
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
            });
            $('body').on('click', '.j_list_item', function () {
                var _name = $(this).attr('data-val'),
                    _type = $(this).attr('data-type');
                _this[_type] = _name;
                $('.j_address_list_box').addClass('hide').removeClass('show');
                //$('body').scrollTop(9999);
                _this.clearAddress();
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
                        _this.getLogistics(1);
                        break;
                }
            });
            $('body').on('click', '.j_logistics_li', function () {
                if ($(this).find('.check-btn').length) {
                    $('.checked-btn').addClass('check-btn').removeClass('checked-btn');
                    $(this).find('.check-btn').addClass('checked-btn');
                    $('.icon-radioed-font').addClass('icon-radio-font').removeClass('icon-radioed-font');
                    $(this).find('.check-btn').addClass('icon-radioed-font').removeClass('icon-radio-font');
                    $('.j_logistics_info').attr({
                        'data-id': $(this).find('.check-btn').attr('data-id'),
                        'data-company': $(this).find('.check-btn').attr('data-company'),
                        'data-price': Number($(this).find('.check-btn').attr('data-price')),
                        'data-tax':Number($(this).find('.check-btn').attr('data-tax'))
                    });
                    _this.getTotal();
                }
            });
            Btn({
                wraper: 'body',
                target: '.j_submit_buy',
                event_type: 'click',
                loading_txt: Lang.H5_SUBMITTING_ORDER,
                callback: function (dom) {
                    var _that = this;
                    try {
                        var _items = _this.carts;
                        if (dom.is('.disable-btn')) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            return;
                        }
                        if (!_items.length || dom.is('.disable-btn')) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            return;
                        }
                        var _data = _this.getData();
                        Debug.log({
                            title: "下单开始-orderconfirm-j_submit_buy",
                            data: _data
                        })
                        if (!_data) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            return;
                        }
                        _this.placeOrder(_data,function(){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                        });
                    }catch(e){
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + e.message + '</p>',
                            auto_fn: function () {
                                this.remove();
                                _that.cancelDisable();
                                _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            }
                        });
                    }
                }
            });
            Common.listenAndroidKeyboardToggle(function () {
                Common.ScorllToBottom('.j_street');
            }, function () {
                Common.ScorllToBottom('.j_street');
            });
        },
        //动态修改总价
        getTotal : function(){
            var _sum = Number($('.j_total').attr('data-price'));
            var _postage = Number($('.j_logistics_info').attr('data-price'));
            var _tax = Number($('.j_logistics_info').attr('data-tax'));
            _postage = _postage?_postage:0;
            _tax = _tax?_tax:0;
            _sum = _sum + _tax + _postage;
            if(_tax){
                var _post_parent = $('.j_freight').parent('p');
                $('<p class="clearfix j_tax"><span class="fr">Rp '+Base.others.priceFormat(_tax)+'</span>Pajak: </p>').insertAfter(_post_parent);
            }else{
                $('.j_tax').remove();
            }
            $('.j_freight').html('Rp '+ Base.others.priceFormat(_postage));
            $('.j_total').html('Rp '+ Base.others.priceFormat(_sum));
        },
        //商品信息数据结构转换
        transCartInfo:function(data){
            var _data = data || init_data.buyer_cart;
            for(var groupid in _data){
                var _carts = _data[groupid];
            }
            return _carts||null;
        },
        //选择地址相关开始
        clearAddress: function () {
            $('.j_logistics_info').removeAttr('data-id');
            $('.j_logistics_info').removeAttr('data-company');
            $('.j_logistics_info').removeAttr('data-price');
            $('.j_logistics').hide();
        },
        //创建地址选择列表
        CreateList: function (data, type) {
            var _htm = '';
            for (var i in data) {
                _htm += '<div class="address-list-item j_list_item" data-type="' + type + '" data-val="' + (isNaN(i) ? i : data[i]) + '">' + (isNaN(i) ? i : data[i]) + '</div>'
            }
            return _htm;
        },
        //动态获取物流列表数据
        getLogistics: function (type) {
            var _this = this;
            var _province = $.trim($('.j_province').html()),
                _city = $.trim($('.j_city').html()),
                _country = $.trim($('.j_country').html()),
                _street = $.trim($('.j_street').html());
            if (!_province || !_city || !_country) {
                return;
            }
            _this.loading = Dialog.loading({
                width: 100
            });
            var _uss =Base.others.getUrlPrem('uss'),
                _buyer_id = Base.others.getUrlPrem('uss_buyer_id');
            var _data = {
                "edata": {
                    seller_id:Base.others.getUrlPrem('seller_id'),
                    uss:_uss,
                    buyer_id:_buyer_id,
                    opt:'express',
                    select_items:JSON.parse(Base.others.getUrlPrem('select_items')),
                    is_direct_buy:2,
                    buyer_address: {
                        "province":_province,
                        "city":_city,
                        "country":_country,
                        "street":_street
                    }
                }
            };
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.cartAction + '?param=' + JSON.stringify(_data),
                function (obj) {
                    _this.loading.remove();
                    if (obj.code == 200) {
                        if (obj.express_free == 0) {
                            if (_this.testExpress(obj.express_fee_list.list)) {
                                $('.j_logistics ul').html(_this.createLogistics(obj.express_fee_list.list));
                                $('.j_logistics').show();
                                $('.j_submit_buy').show();
                                //type && $('body').scrollTop(9999);
                            } else {
                                var _li = '<li class="no-logistic">' + Lang.H5_NO_LOGISTICS_COMPANY + '</li>';
                                $('.j_logistics ul').html(_li);
                                $('.j_logistics').show();
                                $('.j_submit_buy').hide();
                                //不能提交订单
                            }
                        }
                    } else {
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + obj.message + '</p>'
                        });
                    }
                },
                function (error) {
                    _this.loading.remove();
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                        auto_fn: function () {
                            this.remove();
                        }
                    });
                });
        },
        //验证物流信息
        testExpress: function (list) {
            var _bool = false;
            for (var express in list) {
                if (list[express].length) {
                    _bool = true;
                }
            }
            return _bool;
        },
        //创建物流选择列表
        createLogistics: function (data) {
            var _htm = '';
            for (var item in data) {
                for (var i in data[item]) {
                    var _cost_day = data[item][i].cost_days ? '(' + data[item][i].cost_days + Lang.H5_DAYS + ')' : '';
                    _htm += '<li class="j_logistics_li"  data-level="' + (data[item][i].level ? data[item][i].level : item) + '" data-id="' + data[item][i].id + '">' +
                        '<i class="icon iconfont check-btn icon-radio-font" data-tax="'+(data[item][i].tax?data[item][i].tax:'0')+'" data-company="' + item + '" data-price="' + data[item][i].price + '"  data-level="' + (data[item][i].level ? data[item][i].level : item) + '" data-id="' + data[item][i].id + '"></i>' +
                        item + (data[item][i].level || _cost_day ? ' ' : '') + data[item][i].level + _cost_day + ': Rp ' + Base.others.priceFormat(data[item][i].price)
                        +(data[item][i].tax?' (Pajak: Rp '+data[item][i].tax+')':'')
                    '</li>';
                }
            }
            return _htm;
        },
        //选择地址相关结束
        //获取订单数据
        getData: function () {
            var _logistics_info = $('.j_logistics_info'),
                _company = _logistics_info.length ? _logistics_info.attr('data-company') : '',
                _fee_id = _logistics_info.length ? _logistics_info.attr('data-id') : '',
                _seller_id = Base.others.getUrlPrem('group_id'),
                _note = $.trim($('.j_buyer_note').val());
            var _uss = Base.others.getUrlPrem('uss'),
                _buyer_id = Base.others.getUrlPrem('uss_buyer_id'),
                _shipper_name = $.trim($('.j_shipper_name').val()),
                _shipper_tel = $.trim($('.j_shipper_tel').val());
            var _province = $.trim($('.j_province').html()),
                _city = $.trim($('.j_city').html()),
                _country = $.trim($('.j_country').html()),
                _street = $.trim($('.j_street').html()),
                _post = $.trim($('.j_post').val()),
                _name = $.trim($('.j_name').val()),
                _telephone = $.trim($('.j_tel').val());
            if(Base.others.getUrlPrem('type')!='self' && !_shipper_name && !_shipper_tel){
                return null;
            }
            if(!_name && !_telephone){
                return null;
            }
            if (!_company) {
                return null;
            }
            var _data = {
                "edata": {
                    express_sender_name:_shipper_name,
                    express_sender_phone:_shipper_tel,
                    "select_items":JSON.parse(Base.others.getUrlPrem('select_items')),
                    "note": _note,
                    "pay_way": 11,
                    "pay_type": 1,
                    "seller_id": _seller_id,
                    "buyer_id": _buyer_id,
                    "buyer_note": _note,
                    "express_company": (_company ? _company : ''),
                    "express_fee_id": (_fee_id ? _fee_id : ''),
                    "frm": 8
                }
            };
            _data.edata.buyer_address = {
                "name": _name,
                "telephone": _telephone,
                "post": _post,
                "country_code": "62",
                "email": "",
                "address": {
                    "province": _province, //省
                    "city": _city, //市
                    "country": _country, //街道
                    "street": _street, //详细地址
                    "post": _post //邮编
                }
            };
            _uss && (_data.edata.uss = _uss);
            return _data;
        },
        //下单
        placeOrder : function(data,callback){
            PaqPush && PaqPush('下单', '');
            Ajax.postJsonp({
                url: Config.actions.orderConfirm,
                data: {
                    param: JSON.stringify(data)
                },
                type: 'POST',
                timeout: 30000,
                success: function (obj) {
                    if (obj.code == 200) {
                        localStorage.setItem('OrderTotal', obj.order.real_price);
                        localStorage.setItem('BankInfo', JSON.stringify(obj.order.pay_info.banks));
                        localStorage.setItem('OrderInfo', JSON.stringify(obj.order));
                        setTimeout(function () {
                            location.href = Config.host.hrefUrl + 'distributorordersuccess.php'+location.search+'&order_id='+obj.order.id+'&price=' + obj.order.total_price + '&time=' + (obj.order.shop_info.cancel_coutdown / 86400)+'&detail=3&distributor=1';
                        }, 100);
                    } else {
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + obj.message + '</p>',
                            after_fn: function () {
                                setTimeout(function () {
                                    history.back();
                                }, 2000);
                            }
                        });
                    }
                    callback && callback();
                },
                error: function (error) {
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                        auto_fn: function () {
                            this.remove();
                            callback && callback();
                        }
                    });
                }
            });
        }
    };
    DistributorOrderConfirm.init();
})
