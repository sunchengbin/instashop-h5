/**
 * Created by sunchengbin on 16/7/26.
 */
require(['cart', 'dialog', 'ajax', 'config', 'base', 'common', 'btn', 'lang', 'fastclick', 'city', 'quickbuyplug', 'validator', 'favorable', 'debug', 'bargain'], function (Cart, Dialog, Ajax, Config, Base, Common, Btn, Lang, Fastclick, City, QuickBuyplug, Validator, Favorable, Debug, Bargain) {
    var QuickCartsHtm = {
        init: function () {
            var _this = this,
                _data = localStorage.getItem('ShopData'),
                _address = _data ? JSON.parse(_data).Address : null,
                _address_id = _this.getAddressId(),
                _is_detail = _address_id.length == 5 ? true : false;
            Debug.log({
                title: "页面初始化数据",
                data: JSON.parse(localStorage.getItem('ShopData'))
            })
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
            if (_is_detail) {
                //判断是否是单品详情页面
                _this.isDetailQuick = _is_detail;
            }
            //本地cart
            _this.carts = init_data.carts;
            //判断是否为供应商产品
            _this.supply_shop_info = (function () {
                var _supply_shop;
                for (var key in init_data.carts) {
                    _supply_shop = !!init_data.carts[key].item.supply_shop ? init_data.carts[key].item.supply_shop : null;
                    return _supply_shop;
                }
            })();
            //页面初始化
            _this.initLocalStorage(_address);

            if (_this['province']) {
                _this.getLogistics();
            }
            if (_this.isDetailQuick && _this.testDetailCarts()) {
                _this.quickbuyplug = QuickBuyplug({
                    data: _this.transCart(),
                    callback: function (opts) {
                        _this.updateCartsNum(opts.id, opts.num);
                        _this.selectQuick(opts);

                    }
                });
            }

            _this.getTotal();
            _this.handleFn();
            //优惠券
            // 添加对优惠券处理 -lanchenghao@weidian.com
            // 如果该有商品为砍价商品
            if (!Bargain.checkIsHaveBargainItem(init_data.carts)) {
                _this.favorablePlugin = Favorable({
                    el: ".total-ps",
                    price: $('.j_total').attr('data-price'),
                    seller_id: init_data.shop.id,
                    usehandle: function (favorablePrice) {
                        var _totalPrice = $(".j_total").attr("data-price"),
                            _price = Number(_totalPrice) - Number(favorablePrice);
                        _price = _price < 0 ? 0 : _price;
                        $(".j_total").html('Rp ' + Base.others.priceFormat(_price));
                    }
                });
            } else {
                // 如果有 并且只有一个商品 那么要返回false 否则返回true 
                if (Object.keys(_this.carts).length == 1) {

                } else {
                    _this.favorablePlugin = Favorable({
                        el: ".total-ps",
                        price: $('.j_total').attr('data-price'),
                        seller_id: init_data.shop.id,
                        usehandle: function (favorablePrice) {
                            var _totalPrice = $(".j_total").attr("data-price"),
                                _price = Number(_totalPrice) - Number(favorablePrice);
                            _price = _price < 0 ? 0 : _price;
                            $(".j_total").html('Rp ' + Base.others.priceFormat(_price));
                        }
                    });
                }
            }
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
        selectQuick: function (opts) {
            var _this = this,
                _wraper = $('.j_cart_item[data-id="' + opts.id + '"]'),
                _type = _wraper.find('.type'),
                _stock = _wraper.find('.num'),
                _price = _wraper.find('.price > span'),
                _num = _wraper.find('.j_item_num');
            _type.html(Lang.H5_SKU + ': ' + opts.sku);
            if (opts.stock) {
                _stock.html(Lang.H5_STOCK + ': ' + opts.stock);
            } else {
                _stock.html('');
            }
            _price.html(Lang.H5_PRICE + ': Rp ' + Base.others.priceFormat(opts.price));
            _num.val(opts.num).attr('data-price', opts.price);
            _this.resetCarts(opts);
            _this.getTotal();
        },
        resetCarts: function (opts) {
            var _this = this,
                _carts = _this.carts;
            for (var cart in _carts) {
                _carts[cart].num = opts.num;
                _carts[cart].price = opts.price;
                _carts[cart].sku = {
                    id: opts.sku_id
                };
            }
        },
        updateCartsNum: function (dataId, num) {
            $('.j_logistics ul').html('');
            var _this = this;
            _this.clearAddress();
            _this.carts[dataId].num = num;
            _this.getLogistics();
        },
        handleFn: function () {
            var _this = this;
            Fastclick.attach(document.body);
            $('.j_cart_list').on('click', '.j_add_btn', function () {
                var _item_num = $(this).parent().find('.j_item_num'),
                    _num = Number(_item_num.val()),
                    _stock = $(this).attr('data-stock'),
                    _limitto = $(this).attr('data-limitto') || 0,
                    _dataId = $(this).attr('data-id');
                if (_limitto != 0) {
                    if (_limitto <= _num) {
                        Dialog.tip({
                            body_txt: "Maksimal Pembelian " + _limitto + " Pc"
                        })
                        return;
                    }
                }
                if (_this.isDetailQuick && _this.testDetailCarts()) { //有sku的单品快速下单
                    _this.quickbuyplug.toShow();
                } else {
                    if (_stock && _stock <= _num) {
                        return;
                    }
                    _item_num.val(++_num);
                    _this.updateCartsNum(_dataId, _num);
                }
                _this.getTotal();
            });
            $('.j_cart_list').on('click', '.j_reduce_btn', function () {
                var _item_num = $(this).parent().find('.j_item_num'),
                    _num = Number(_item_num.val()),
                    _dataId = $(this).attr('data-id');
                _item_num.val((--_num > 0) ? _num : 1);
                _this.updateCartsNum(_dataId, _num);
                _this.getTotal();
            });
            $('body').on('click', '.j_user_address .act', function () {
                var _name = $(this).attr('data-name');
                $('.j_tel').blur();
                $('.j_name').blur();
                $('body').scrollTop(0);
                //$('.j_address_list_box').css('height',$(window).height());
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
                $('body').scrollTop(9999);
                //$('.j_address_header').addClass('hide').removeClass('show');
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
                        //_this.clearAddress();
                        break;
                    case 'city':
                        if ($('.j_city').html() != _name) {
                            $('.j_city').html(_name);
                            $('.j_country').html(Lang.H5_DISTRICT);
                        }
                        $('.j_city').html(_name);
                        $('[data-name="country"]').addClass('act');
                        //_this.clearAddress();
                        break;
                    default:
                        $('.j_country').html(_name);
                        //_this.clearAddress();
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
            $('body').on('click', '.j_check_box', function (e) {
                if ($(this).is('.icon-checked-font')) {
                    $(this).addClass('icon-checkbox-font').removeClass('icon-checked-font');
                    $('.j_submit_buy').addClass('disable-btn');
                } else {
                    $(this).addClass('icon-checked-font').removeClass('icon-checkbox-font');
                    $('.j_submit_buy').removeClass('disable-btn');
                }
            });
            Btn({
                wraper: 'body',
                target: '.j_submit_buy',
                disable: $('.j_submit_buy').attr('data-disable'),
                event_type: 'click',
                loading_txt: Lang.H5_SUBMITTING_ORDER,
                callback: function (dom) {
                    if ($('.j_submit_buy').attr('data-disable')) {
                        return;
                    }
                    var _that = this,
                        _items = _this.getItems();

                    if ($('.j_check_box').is('.icon-checkbox-font')) { //必须同意协议
                        _that.cancelDisable();
                        _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                        Dialog.tip({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">aggree is must checked</p>'
                        });
                        return;
                    }
                    if (!_items.length) { //如果购物车为空
                        _that.cancelDisable();
                        _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                        if ($('.error-item').length == $('.j_cart_item').length) {
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">' + (_this.msg ? _this.msg : Lang.H5_ERROR) + '</p>',
                                after_fn: function () {
                                    var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                                    location.href = _url + '?item=back';
                                    setTimeout(function () {
                                        location.href = _url;
                                    }, 1000);
                                }
                            });
                        }
                        return;
                    }
                    //验证单品快速下单
                    if (_this.isDetailQuick) {
                        var _test_cart = _this.testDetailCarts(),
                            _detail_cart = _this.transCart();
                        if (_test_cart && !_test_cart.sku.id) { //当商品存在sku的时候,弹出购买窗口
                            _this.quickbuyplug.toShow();
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            return;
                        } else { //不存在sku可以直接购买
                            if (_detail_cart.price < 0) {
                                Dialog.tip({
                                    top_txt: '', //可以是html
                                    body_txt: '<p class="dialog-body-p">' + Lang.H5_NO_PRICE + '</p>'
                                });
                                _that.cancelDisable();
                                _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                                return;
                            } else {
                                if ((!Base.others.testObject(_detail_cart.sku) && (_detail_cart.sku.stock >= 9999999)) || (Base.others.testObject(_detail_cart.sku) && (_detail_cart.item.stock >= 9999999))) {
                                    Dialog.confirm({
                                        top_txt: '', //可以是html
                                        body_txt: '<p class="dialog-body-p">' + Lang.H5_NO_STOCK + '</p>',
                                        cf_fn: function () {
                                            _this.quickSubmit(_that, dom);
                                        }
                                    });
                                    _that.cancelDisable();
                                    _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                                    return;
                                }
                            }
                        }
                    } else { //多件商品快速下单
                        if (!_this.testShopCarts(
                                function () {
                                    _this.quickSubmit(_that, dom);
                                },
                                function () {
                                    _that.cancelDisable();
                                    _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                                }
                            )) {
                            return;
                        }
                    }
                    _this.quickSubmit(_that, dom);
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
            });
            Common.listenAndroidKeyboardToggle(function () {
                Common.ScorllToBottom('.j_street');
            }, function () {
                Common.ScorllToBottom('.j_street');
            });
        },
        quickSubmit: function (that, dom) {
            var _this = this,
                _that = that,
                _data = _this.getData(),
                _tel = $.trim($('.j_tel').val());
            if (_data && Common.telVerify(_tel, function () {
                    _this.subAjax({
                        data: _data,
                        that: _that,
                        dom: dom
                    });
                }, function () {
                    _that.cancelDisable();
                    _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                })) {
                _this.subAjax({
                    data: _data,
                    that: _that,
                    dom: dom
                });
            } else {
                _that.cancelDisable();
                _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
            }
        },
        subAjax: function (opts) {
            var _data = opts.data,
                _that = opts.that,
                dom = opts.dom,
                _this = this;
            if (!_data) {
                _that.cancelDisable();
                _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                return;
            }
            PaqPush && PaqPush('下单', 'submit-order');
            Ajax.postJsonp({
                url: Config.actions.orderConfirm,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'POST',
                timeout: 30000,
                success: function (obj) {
                    //_that.cancelDisable();
                    //_that.setBtnTxt(dom,Lang.H5_CREATE_ORDER);
                    if (obj.code == 200) {
                        PaqPush && PaqPush('成功生成订单', 'orderId=' + obj.order.id + ',sellerId=' + init_data.shop.id);
                        //_paq.push(['trackEvent', '成功生成订单', 'orderId=' + obj.order.id + ',sellerId=' + init_data.shop.id, '']);
                        var _bank_info = JSON.stringify(obj.order.pay_info.banks),
                            _name = $.trim($('.j_name').val()),
                            _telephone = $.trim($('.j_tel').val());
                        localStorage.setItem('OrderTotal', obj.order.total_price);
                        localStorage.setItem('BankInfo', _bank_info);
                        localStorage.setItem('OrderInfo', JSON.stringify(obj.order));
                        setTimeout(function () {
                            location.href = Config.host.hrefUrl + 'evidencepayment.php?price=' + obj.order.total_price + '&detail=2&shop_id=' + init_data.shop.id + '&order_id=' + obj.order.id_hash + '&bname=' + _name + '&bphone=' + _telephone + '&sname=' + init_data.shop.name + '&time=' + (init_data.shop.cancel_coutdown / 86400);
                        }, 100);
                    } else {

                        if ("server error" == obj.message) {
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                            var _telephone = $.trim($('.j_tel').val());
                            var reqData = {
                                edata: {
                                    action: 'check',
                                    items: _this.getItems(),
                                    telephone: _telephone,
                                    seller_id: init_data.shop.id,
                                    wduss: ''
                                }
                            };
                            Ajax.postJsonp({
                                url: Config.actions.testCart,
                                data: {
                                    param: JSON.stringify(reqData)
                                },
                                type: 'POST',
                                success: function (obj) {
                                    if (obj.code == 200) {
                                        if (obj.carts) {
                                            if (_this.testCarts(obj.carts)) {
                                                Dialog.tip({
                                                    top_txt: '', //可以是html
                                                    body_txt: '<p class="dialog-body-p">' + (_this.msg ? _this.msg : Lang.H5_ERROR) + '</p>',
                                                    after_fn: function () {
                                                        var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                                                        location.href = _url + '?item=back';
                                                        setTimeout(function () {
                                                            location.href = _url;
                                                        }, 2000);
                                                    }
                                                });
                                            } else {
                                                Dialog.tip({
                                                    top_txt: '', //可以是html
                                                    body_txt: '<p class="dialog-body-p">' + (_this.msg ? _this.msg : Lang.H5_ERROR) + '</p>',
                                                    after_fn: function () {
                                                        setTimeout(function () {
                                                            location.reload();
                                                        }, 2000);
                                                    }
                                                });
                                            }
                                        }
                                    } else {
                                        var _msg = _this.msg || obj.message || Lang.H5_ERROR;
                                        Dialog.tip({
                                            top_txt: '', //可以是html
                                            body_txt: '<p class="dialog-body-p">' + _msg + '</p>',
                                            after_fn: function () {
                                                var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                                                location.href = _url + '?item=back';
                                                setTimeout(function () {
                                                    location.href = _url;
                                                }, 2000);
                                            }
                                        });
                                    }
                                },
                                error: function (error) {
                                    Dialog.alert({
                                        top_txt: '', //可以是html
                                        cfb_txt: Lang.H5_FRESHEN,
                                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ERROR + '</p>',
                                        after_fn: function () {
                                            var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                                            location.href = _url + '?item=back';
                                            setTimeout(function () {
                                                location.href = _url;
                                            }, 2000);
                                        }
                                    });
                                }
                            });
                        } else {
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">' + obj.message + '</p>',
                                after_fn: function () {
                                    var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                                    location.href = _url + '?item=back';
                                    setTimeout(function () {
                                        location.href = _url;
                                    }, 2000);
                                }
                            });
                        }
                    }
                },
                error: function (error) {
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ORDER_TIMEOUT_ERROR + '</p>',
                        after_fn: function () {
                            this.remove();
                            _that.cancelDisable();
                            _that.setBtnTxt(dom, Lang.H5_CREATE_ORDER);
                        }
                    });
                }
            });
        },
        clearAddress: function () {
            $('.j_logistics_info').removeAttr('data-id');
            $('.j_logistics_info').removeAttr('data-company');
            $('.j_logistics_info').removeAttr('data-price');
            $('.j_logistics').hide();
        },
        getData: function () {
            var _this = this;
            var _data = localStorage.getItem('ShopData'),
                _data_json = _data ? JSON.parse(_data) : {},
                _buyer_note = $.trim($(".j_buyer_note").val()),
                _post = $.trim($(".j_post").val()),
                _name = $.trim($('.j_name').val()),
                _telephone = $.trim($('.j_tel').val()),
                _province = $.trim($('.j_province').html()),
                _city = $.trim($('.j_city').html()),
                _country = $.trim($('.j_country').html()),
                _street = $.trim($('.j_street').val());
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
            var _address = {
                "buyer_node": _buyer_note,
                "name": _name,
                "telephone": _telephone,
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
            _data_json.Address = _address;
            localStorage.setItem('ShopData', JSON.stringify(_data_json));
            var _logistics_info = $('.j_logistics_info'),
                _company = _logistics_info.length ? _logistics_info.attr('data-company') : '',
                _fee_id = _logistics_info.length ? _logistics_info.attr('data-id') : '',
                _seller_id = init_data.shop.id,
                _note = _buyer_note;
            if (_logistics_info.children().length && !_company) { //没选择物流信息
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SELECT_ONE_LOGISTICS_COMPANY + '</p>'
                });
                return null;
            }
            if (!_this.getItems().length) { //购物车为空
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SHOPING_NO_GOODS + '</p>'
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
                    "express_company": (_company ? _company : ''),
                    "express_fee_id": (_fee_id ? _fee_id : ''),
                    "items": _this.getItems(),
                    "buyer_address": _address,
                    "frm": 6
                }
            };
            return _data;
        },
        CreateList: function (data, type) {
            var _htm = '';
            for (var i in data) {
                _htm += '<div class="address-list-item j_list_item" data-type="' + type + '" data-val="' + (isNaN(i) ? i : data[i]) + '">' + (isNaN(i) ? i : data[i]) + '</div>'
            }
            return _htm;
        },
        getItems: function () {
            var _carts = this.carts,
                _arr = [];
            if (!_carts) {
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SHOPING_NO_GOODS + '?</p>'
                });
                //alert('购物车里没有商品')
            } else {
                var _items = _carts;
                for (var item in _items) {
                    if (_items[item].sku && _items[item].sku.id) {
                        if (!$('.error-item[data-id="' + _items[item].sku.id + '"]').length) {
                            if (_items[item].item.bargain) {
                                var _num = $('.j_cart_item[data-id="' + _items[item].sku.id + '"] .j_item_num').val();
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    itemName: _items[item].item.item_name,
                                    itemNum: (_num ? _num : _items[item].num),
                                    item_sku: _items[item].sku.id,
                                    bargain_price: _items[item].price,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            } else {
                                var _num = $('.j_cart_item[data-id="' + _items[item].sku.id + '"] .j_item_num').val();
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    itemName: _items[item].item.item_name,
                                    itemNum: (_num ? _num : _items[item].num),
                                    item_sku: _items[item].sku.id,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            }


                        }
                    } else {
                        if (!$('.error-item[data-id="' + _items[item].item.id + '"]').length) {
                            var _num = $('.j_cart_item[data-id="' + _items[item].item.id + '"] .j_item_num').val();
                            if (_items[item].item.bargain) {
                                _arr.push({
                                    itemID: _items[item].item.id,
                                    itemName: _items[item].item.item_name,
                                    itemNum: (_num ? _num : _items[item].num),
                                    bargain_price:_items[item].price,
                                    discount_id: (_items[item].item.is_discount ? _items[item].item.discount.id : 0)
                                });
                            } else {
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
            }
            return _arr;
        },
        getAddressItems: function () {
            var _carts = this.carts,
                _arr = [];
            if (!_carts) {
                Dialog.tip({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_SHOPING_NO_GOODS + '?</p>'
                });
                //alert('购物车里没有商品')
            } else {
                var _items = _carts;
                for (var item in _items) {
                    if (_items[item].sku) {
                        _arr.push({
                            itemID: _items[item].item.id,
                            //itemName:_items[item].item.item_name,
                            itemNum: _items[item].num,
                            item_sku: _items[item].sku.id,
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
            return _arr;
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
                edata: {
                    'action': 'express_fee',
                    'shop_id': init_data.shop.id,
                    'items': _this.getAddressItems(),
                    'supply_shop_id': !!_this.supply_shop_info ? _this.supply_shop_info.id : "",
                    'receive_addr': encodeURIComponent(_addr)
                }
            };
            Debug.log({
                title: "getLogistics-supply_shop_id",
                data: {
                    supply_shop_id: _data.edata.supply_shop_id
                }
            })
            Ajax.getJsonp(Config.host.actionUrl + Config.actions.expressesList + '?param=' + JSON.stringify(_data),
                function (obj) {
                    _this.loading.remove();
                    if (obj.code == 200) {
                        //检查是否为自营还是代理 如果是代理取supply_shop_info中的express_free
                        if (!!_this.supply_shop_info) {
                            //代理的
                            if (_this.supply_shop_info.express_free == 0) {
                                if (_this.testExpress(obj.express_fee_list.list)) {
                                    $('.j_logistics ul').html(_this.createLogistics(obj.express_fee_list.list));
                                    $('.j_logistics').show();
                                    $('.j_submit_buy').show();
                                    type && $('body').scrollTop(9999);
                                } else {
                                    var _li = '<li class="no-logistic">' + Lang.H5_NO_LOGISTICS_COMPANY + '</li>';
                                    $('.j_logistics ul').html(_li);
                                    $('.j_logistics').show();
                                    $('.j_submit_buy').hide();
                                    //不能提交订单
                                }
                            }
                        } else {
                            //自营
                            if (init_data.shop.express_free == 0) {
                                if (_this.testExpress(obj.express_fee_list.list)) {
                                    $('.j_logistics ul').html(_this.createLogistics(obj.express_fee_list.list));
                                    $('.j_logistics').show();
                                    $('.j_submit_buy').show();
                                    type && $('body').scrollTop(9999);
                                } else {
                                    var _li = '<li class="no-logistic">' + Lang.H5_NO_LOGISTICS_COMPANY + '</li>';
                                    $('.j_logistics ul').html(_li);
                                    $('.j_logistics').show();
                                    $('.j_submit_buy').hide();
                                    //不能提交订单
                                }
                            }
                        }
                    }
                },
                function (error) {
                    _this.loading.remove();
                });
        },
        testExpress: function (list) {
            var _bool = false;
            for (var express in list) {
                if (list[express].length) {
                    _bool = true;
                }
            }
            return _bool;
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
        },
        testCarts: function (carts, type) {
            var _this = this,
                _beal = true;
            Base.others.each(carts, function (item, i) {
                var _id = item.item_sku ? item.item_sku : item.itemID,
                    _num = Number(item.itemNum),
                    _stock = item.stock,
                    _msg = null;
                //存在error_status 表示 商品已下架
                if (item.error_status) {
                    _msg = Lang.H5_IS_HAVESHEFL;
                } else {
                    if (_stock == 0) { //库存为0
                        if (item.is_discount_err) {
                            _msg = Lang.H5_DISCOUTN_CAN_NOT_ABOVE_COUNT;
                            //_msg = Lang.H5_MSG_NO_GOO｀D;
                        } else {
                            //_msg = Lang.H5_SOLD_OUT;
                            _msg = Lang.H5_MSG_NO_GOOD;
                        }
                    } else {
                        if (_stock >= 9999999) { //没设置库存,需要联系商家
                            //_msg = Lang.H5_NO_STOCK;
                        } else {
                            if (_stock == -1) {
                                _msg = Lang.H5_COMMODIFY_SHELF;
                            } else {
                                if (_stock < _num) { //超出库存
                                    if (item.is_discount_err) { //超出限购数
                                        //_msg = Lang.H5_X_PCS_LEFT+_stock+Lang.H5_PCS;
                                        _msg = Lang.H5_MAX_BUY + _stock + Lang.H5_PCS;
                                    } else {
                                        _msg = Lang.H5_X_PCS_LEFT + _stock + Lang.H5_PCS;
                                    }
                                }
                            }
                        }
                    }
                }

                if (!item.valid) {
                    _beal = false;
                    if ($('.error-item').length == $('.j_cart_item').length) { //当前购物车全部商品不能购买
                        if (!type) { //提交时验证购物车商品
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">' + _msg + '</p>',
                                after_fn: function () {
                                    var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                                    location.href = _url + '?item=back';
                                    setTimeout(function () {
                                        location.href = _url;
                                    }, 2000);
                                }
                            });
                        } else { //进入页面立即验证
                            _this.msg = _msg;
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">' + _msg + '</p>'
                            });
                        }

                    }
                    if (_msg) {
                        if (_stock > 0 && _stock < _num) { //有库存,但是购物车商品数量超出可购买数量时
                            $('.j_cart_item[data-id="' + _id + '"] .j_item_num').val(_stock);
                            $('.j_cart_item[data-id="' + _id + '"] .j_add_btn').attr('data-stock', _stock);
                            //if(!type){//进入页面就验证
                            //
                            //}else{//提交按钮提交时验证
                            //
                            //}
                            Dialog.tip({
                                top_txt: '', //可以是html
                                body_txt: '<p class="dialog-body-p">' + _msg + '</p>'
                            });
                        } else {
                            $('.j_cart_item[data-id="' + _id + '"]').addClass('error-item');
                            $('.j_cart_item[data-id="' + _id + '"] .j_item_num').val(0);
                            $('.j_cart_item[data-id="' + _id + '"] .j_add_btn').attr('data-stock', 0);
                        }

                    }
                    $('.j_cart_item[data-id="' + _id + '"] .num').html(Lang.H5_STOCK + ': ' + (_stock < 0 ? 0 : _stock));
                    _this.msg = _msg;
                    return _beal;
                }
            });
            return _beal;
        },
        getAddressId: function () {
            var _url = location.href,
                _match = _url.split('/'),
                _len = _match.length;
            return _match[_len - 1].split('?')[0];
        },
        testDetailCarts: function () { //验证cart是否是有sku
            var _this = this,
                _carts = _this.carts,
                _cart = null;
            for (var id in _carts) {
                _cart = _carts[id];
            }
            if (_cart && _cart.item.sku.length) {
                return _cart;
            }
            return false;
        },
        testShopCarts: function (callback, cancelcallback) { //提交前验证快速购物车中是否有没有价格或者没设置库存的
            var _this = this,
                _carts = _this.carts,
                _beal = true;
            for (var _index in _carts) {
                var _detail_cart = _carts[_index];
                if (_detail_cart.price < 0) {
                    Dialog.tip({
                        top_txt: '', //可以是html
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_NO_PRICE + '</p>'
                    });
                    _beal = false;
                    return;
                } else {
                    if ((!Base.others.testObject(_detail_cart.sku) && (_detail_cart.sku.stock >= 9999999)) || (Base.others.testObject(_detail_cart.sku) && (_detail_cart.item.stock >= 9999999))) {
                        Dialog.confirm({
                            top_txt: '', //可以是html
                            body_txt: '<p class="dialog-body-p">' + Lang.H5_NO_STOCK + '</p>',
                            cf_fn: function () {
                                callback && callback();
                            },
                            c_fn: function () {
                                cancelcallback && cancelcallback();
                            }
                        });
                        _beal = false;
                        return;
                    }
                }
            }
            return _beal;
        },
        transCart: function () { //解析cart
            var _this = this,
                _carts = _this.carts,
                _cart = null;
            for (var id in _carts) {
                _cart = _carts[id];
            }
            return _cart;
        },
        getTotalNoReduc: function () { //计算总额(出问题的商品价格不算到总额中)
            var _this = this,
                _sum = 0,
                _freight = 0,
                _tax = 0;
            $('.j_item_num').each(function (i, item) {
                var _num = Number($(item).val()),
                    _price = Number($(item).attr('data-price') || 0);
                Debug.log({
                    title: "each:j_item_num-_num-_price",
                    data: {
                        _num: _num,
                        _price: _price
                    }
                })
                _sum += _num * _price;
            });
            if ($('.icon-radioed-font').length) {
                _freight = Number($('.icon-radioed-font').attr('data-price'));
                _tax = Number($('.icon-radioed-font').attr('data-tax'));
            }
            Debug.log({
                title: "getTotalNoReduc-_sum-_freight",
                data: {
                    _sum: _sum,
                    _freight: _freight,
                    result: 'Rp ' + Base.others.priceFormat((_sum + _freight))
                }
            })
            var _favorablePrice = $(".j_favorable_price").attr('data-price') || 0;
            $('.j_total').attr('data-price', Number(_sum + _freight + _tax - _favorablePrice)).html('Rp ' + Base.others.priceFormat((_sum + _freight+_tax - _favorablePrice)));
            if(_tax){
                var _post_parent = $('.j_freight').parent('p');
                $('<p class="total-p clearfix j_tax"><span class="fr j_tax">Rp '+Base.others.priceFormat(_tax)+'</span>Pajak: </p>').insertAfter(_post_parent);
            }else{
                $('.j_tax').remove();
            }

            $('.j_freight').html('Rp ' + Base.others.priceFormat(_freight));
        },
        //满减
        getTotal: function () {
            var _this = this;
            //判断是否参与满减 如果为0 则为不参加满减
            if (!!init_data.shop.shop_discount) {
                if (init_data.shop.shop_discount.length == 0) {
                    _this.getTotalNoReduc();
                } else {
                    _this.countSumReduc();
                }
            } else {
                _this.getTotalNoReduc();
            }
        },
        //渲染满减活动
        countSumReduc: function () {
            var _this = this;
            var _param = {
                edata: {
                    "action": "price",
                    "seller_id": init_data.shop.id,
                    "wduss": "",
                    "items": _this.getItems()
                }
            }
            var _req = Config.host.actionUrl + Config.actions.shopsDiscount + '?param=' + JSON.stringify(_param);
            Ajax.getJsonp(_req, function (_res) {
                if (_res && _res.code == 200) {
                    var _curSum = "";
                    if (_res.price_info.items_price != _res.price_info.total_price) {
                        $(".reduc-info").show();
                    }
                    var _items_price = _res.price_info.items_price;
                    var _last_price = _res.price_info.total_price;
                    var _freight = 0,
                        _tax = 0;
                    $(".j_reduc_price").html('-Rp ' + Base.others.priceFormat(_items_price - _last_price));

                    if ($('.icon-radioed-font').length) {
                        _freight = Number($('.icon-radioed-font').attr('data-price'));
                        _tax = Number($('.icon-radioed-font').attr('data-tax'));
                    }
                    $('.j_freight').html('Rp ' + Base.others.priceFormat(_freight));
                    var _favorablePrice = $(".j_favorable_price").attr('data-price') || 0;
                    if(_tax){
                        var _post_parent = $('.j_freight').parent('p');
                        $('<p class="total-p clearfix j_tax"><span class="fr ">Rp '+Base.others.priceFormat(_tax)+'</span>Pajak: </p>').insertAfter(_post_parent);
                    }else{
                        $('.j_tax').remove();
                    }
                    $('.j_total').attr('data-price', Number(_res.price_info.total_price + _freight+_tax - _favorablePrice)).html('Rp ' + Base.others.priceFormat(_res.price_info.total_price + _freight+_tax - _favorablePrice));
                }
            }, function () {
                Dialog.alert({
                    top_txt: '', //可以是html
                    cfb_txt: Lang.H5_FRESHEN,
                    body_txt: '<p class="dialog-body-p">' + Lang.H5_ERROR + '</p>',
                    cf_fn: function () {
                        location.reload();
                    }
                });
            })
        }
    };
    QuickCartsHtm.init();
})
