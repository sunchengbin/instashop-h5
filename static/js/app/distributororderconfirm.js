/**
 * Created by sunchengbin on 2017/6/21.
 */
/**
 * Created by sunchengbin on 16/7/26.
 */
require([ 'dialog', 'ajax', 'config', 'base', 'common', 'btn', 'lang', 'fastclick', 'city', 'quickbuyplug', 'validator', 'favorable', 'debug','insjs','logistics'], function ( Dialog, Ajax, Config, Base, Common, Btn, Lang, Fastclick, City, QuickBuyplug, Validator, Favorable, Debug,Insjs,Logistics) {
    var DistributorOrderConfirm = {
        init: function () {
            var _this = this,
                _address = init_data.buyer_address;
            //alert(JSON.stringify(_address));
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
                if(Base.others.getUrlPrem('type')!='self'){
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
                }else{
                    _this['province'] = _address.address.province;
                    _this['city'] = _address.address.city;
                    _this['country'] = _address.address.country;
                    _this['post'] = _address.address.post;
                    _this['street'] = _address.address.street;
                }
            }
            //本地地址初始化
            _this.initLocalStorage(_address);
            if (_this['province']) {
                _this.getLogistics();
            }
            _this.handleFn();
            Insjs.WebOnReady(function(bridge){
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
            },function(){

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
        handleFn: function () {
            var _this = this;
            Fastclick.attach(document.body);
            $('body').on('click', '.j_user_address .act', function () {
                var _name = $(this).attr('data-name');
                $(window).scrollTop(0);
                $('.j_tel').blur();
                $('.j_name').blur();
                switch (_name) {
                    case 'province':
                        $('.j_list_box').html(_this.CreateList(City, 'province'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
                        break;
                    case 'city':
                        $('.j_list_box').html(_this.CreateList(City[_this['province']], 'city'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
                        break;
                    case 'country':
                        $('.j_list_box').html(_this.CreateList(City[_this['province']][_this['city']], 'country'));
                        $('.j_address_list_box').addClass('show').removeClass('hide');
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
            $('body').on('blur','[input-txt]',function(){
                var _val = $.trim($(this).val());
                if(_val){
                    $(this).removeClass('class-error');
                }
            });
            $('body').on('click','.j_sel_logistics',function(){
                if(!_this.logistics){
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">Silahkan mengisi alamat pengiriman</p>'
                    });
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
                    seller_id:Base.others.getUrlPrem('group_id'),
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
                    $(window).scrollTop($('.j_street').offset().top);
                    if (obj.code == 200) {
                        _this.express_free = obj.express_free;
                        if (obj.express_free == 0) {
                            if (_this.testExpress(obj.express_fee_list.list)) {
                                //如果不包邮并且存在运费信息,初始化物流选择插件
                                _this.express_fee_list = obj.express_fee_list.list;
                                if(obj.express_free == 0){
                                    $('.j_logistics_plug').remove();
                                    $('.j_logistics_plug_cover').remove();
                                    _this.logistics = Logistics({
                                        data: obj.express_fee_list.list,
                                        sum: $('.j_sum').attr('data-price'),
                                        lang: Lang,
                                        reset_html:true
                                    });
                                }
                                $('.j_logistics').html('Pilih Jenis Paket Pengiriman<div class="fr"><i class="icon iconfont fr icon-go-font"></i><span class="j_logistics_info"></span></div>').show();
                                $('.j_submit_buy').show();
                            } else {
                                $('.j_logistics').html('Maaf, saat ini alamat tujuanmu belum dapat dijangkau');
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
                _street = $.trim($('.j_street').val()),
                _post = $.trim($('.j_post').val()),
                _name = $.trim($('.j_name').val()),
                _telephone = $.trim($('.j_tel').val());
            if(Base.others.getUrlPrem('type')!='self'){
                if(!_shipper_name){
                    $('.j_shipper_name').addClass('class-error');
                    $(window).scrollTop($('.class-error').eq(0).offset().top);
                    return null;
                }
                if(!_shipper_tel){
                    $('.j_shipper_tel').addClass('class-error');
                    $(window).scrollTop($('.class-error').eq(0).offset().top);
                    return null;
                }
            }
            if(!_name){
                $('.j_name').addClass('class-error');
                $(window).scrollTop($('.class-error').eq(0).offset().top);
                return null;
            }
            if(!_telephone){
                $('.j_tel').addClass('class-error');
                $(window).scrollTop($('.class-error').eq(0).offset().top);
                return null;
            }
            if(!_street){
                $('.j_street').addClass('class-error');
                $(window).scrollTop($('.class-error').eq(0).offset().top);
                return null;
            }
            var _this = this;
            if(!_company && init_data.express_free == 0){
                if (_this.logistics) {
                    _this.logistics.createHtm({
                        data: _this.express_fee_list,
                        lang: Lang
                    }).toShow();
                    return null;
                }
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">Silahkan mengisi alamat pengiriman</p>'
                });
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
            var _address_data = {
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
            if(Base.others.getUrlPrem('type')=='self' && !_this.addressInfoIsEdit(_address_data)){
                _data.edata.address_id = init_data.buyer_address.id;
            }else{
                _data.edata.buyer_address = _address_data;
            }
            _uss && (_data.edata.uss = _uss);
            return _data;
        },
        //验证地址信息是否修改过
        addressInfoIsEdit : function(data){
            var _is = false,
                _old_address = init_data.buyer_address;
            for(var key in _old_address){
                if(_old_address[key] != data[key]){
                    _is = true;
                }
            }
            return _is;//true 修改过 false 未修改
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
