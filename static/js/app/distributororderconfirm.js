/**
 * Created by sunchengbin on 2017/6/21.
 */
/**
 * Created by sunchengbin on 16/7/26.
 */
require(['cart', 'dialog', 'ajax', 'config', 'base', 'common', 'btn', 'lang', 'fastclick', 'city', 'quickbuyplug', 'validator', 'favorable', 'debug', 'bargain'], function (Cart, Dialog, Ajax, Config, Base, Common, Btn, Lang, Fastclick, City, QuickBuyplug, Validator, Favorable, Debug, Bargain) {
    var QuickCartsHtm = {
        init: function () {
            var _this = this,
                _address = init_data.buyer_address;
            _this.carts = _this.transCartInfo();
            //初始化本地数据
            if (!_address) {
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
            }
            //本地地址初始化
            _this.initLocalStorage(_address);
            if (_this['province']) {
                _this.getLogistics();
            }
            _this.handleFn();
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
                $('body').scrollTop(9999);
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
                        'data-price': Number($(this).find('.check-btn').attr('data-price'))
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
                        if ($('.j_check_box').is('.icon-checkbox-font')) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">aggree is must checked</p>'
                            });
                            return;
                        }
                        // 是否含有bargain商品 如果不含有直接去确认订单 如果有要登录后才能下单
                        var loginResult = _this.loginResult;
                        if (Bargain.checkIsHaveBargainItem(_this.carts)) {
                            if (loginResult.result) {
                                _this.placeOrder(_data,function(){
                                    _that.cancelDisable();
                                    _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                                });
                            } else {
                                Oauth.openDialog();
                            }
                        } else {
                            _this.placeOrder(_data,function(){
                                _that.cancelDisable();
                                _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            });
                        }
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
        CreateList: function (data, type) {
            var _htm = '';
            for (var i in data) {
                _htm += '<div class="address-list-item j_list_item" data-type="' + type + '" data-val="' + (isNaN(i) ? i : data[i]) + '">' + (isNaN(i) ? i : data[i]) + '</div>'
            }
            return _htm;
        },
        getLogistics: function (type) {
            var _this = this;
            var _province = $.trim($('.j_province').html()),
                _city = $.trim($('.j_city').html()),
                _country = $.trim($('.j_country').html()),
                _addr = _country + ',' + _city + ',' + _province;
            if (!_province || !_city || !_country) {
                return;
            }
            _this.loading = Dialog.loading({
                width: 100
            });
            var _data = {
                "edata": {
                    "address_id": Base.others.getUrlPrem('address_id'),
                    "select_items":JSON.parse(Base.others.getUrlPrem('select_items')),
                    "note": "",
                    "pay_way": 11,
                    "pay_type": 1,
                    "seller_id": _seller_id,
                    "buyer_id": _buyer_id,
                    "buyer_note": _note,
                    "express_company": (_company ? _company : ''),
                    "express_fee_id": (_fee_id ? _fee_id : ''),
                    "frm": 2,
                    "warrant": '' == _this.tradeplug.checkIsSelectTrade() ? 0 : _this.tradeplug.getSelectedTrade()
                }
            };
            Ajax.postJsonp({
                url: Config.actions.orderConfirm,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'POST',
                timeout: 30000,
                success: function (obj) {
                    _this.loading.remove();
                    if (obj.code == 200) {

                    } else {
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + obj.message + '</p>',
                            after_fn: function () {
                                setTimeout(function () {
                                    location.href = Config.host.hrefUrl + 'cart.php';
                                }, 2000);
                            }
                        });
                    }
                },
                error: function (error) {
                    _this.loading.remove();
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
        }
        //选择地址相关结束
    };
    QuickCartsHtm.init();
})
