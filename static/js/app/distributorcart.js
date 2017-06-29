/**
 * Created by sunchengbin on 16/6/12.
 * 分销商购物车
 */
require(['cart', 'dialog', 'ajax', 'config', 'base', 'lang', 'fastclick', 'debug', 'cache', 'oauth', 'insjs'], function (Cart, Dialog, Ajax, Config, Base, Lang, Fastclick, Debug, Cache, Oauth, Insjs) {
    var DistributorCart = {
        init: function () {
            var _this = this;
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
            _this.handleFn();
        },
        handleFn: function (bridge) {
            var _that = this;
            Fastclick.attach(document.body);
            $('body').on('click', '.j_del_cart', function () {
                var _this = $(this),
                    _item_id = _this.attr('data-id'),
                    _group_id = _this.attr('group-id');
                PaqPush && PaqPush('从购物车删除', 'itemId=' + _this.attr('data-id') + ',sellerId=' + Base.others.getUrlPrem('seller_id'));
                Dialog.confirm({
                    cover_event: true,
                    cf_fn: function () {
                        Cart().removeItem(_item_id, function () {
                            $('.j_cart_item[data-id="' + _item_id + '"]').remove();
                            if($('.j_cart_item[group-id="' + _group_id + '"]').length == 0){
                                $('.cart-supplier-card[group-id="' + _item_id + '"]').remove();
                            }
                            if(!$('.j_cart_item').length){
                                var _htm = '<ul class=""><li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li></ul>';
                                $('.j_cart_list').html(_htm);
                            }
                        },_group_id);
                    }
                });
            });
            $('body').on('click', '.j_submit_btn', function () {
                var _groupid = $(this).attr('group-id'),
                    _type = $(this).attr('data-type');
                _that.goClear(_groupid,_type);

            });
        },
        goClear: function (groupid,type) {
            var _that = this;
            _that.subData(groupid,type);
        },
        // 对分库商品添加适配处理
        getItems: function (groupid) {
            var _arr = [];
            $('.j_cart_item[group-id="'+groupid+'"]').each(function(i,item){
                _arr.push($(item).attr('data-id'));
            });
            return _arr;
        },
        subData: function (groupid,type) {
            var _this = this,
                _seller_id = Base.others.getUrlPrem('seller_id'),
                _uss = Base.others.getUrlPrem('uss'),//登录的真实账户的uss
                _select_items = _this.getItems(groupid),
                _buyer_id = Base.others.getUrlPrem('uss_buyer_id'); //匿名买家id
            var _data = {
                "edata": {
                    "buyer_id": _buyer_id,
                    "is_direct_buy": 2, //如果是直接购买，则传1。普通情况传0
                    "seller_id": _seller_id,
                    "select_items": _select_items,
                    "opt":'cart,address,price,express'
                }
            };
            _uss && (_data.edata.uss = _uss);
            _this._loading = Dialog.loading({
                can_exist : true
            });
            Ajax.postJsonp({
                url: Config.actions.cartAction,
                data: {
                    param: JSON.stringify(_data)
                },
                type: 'GET',
                success: function (obj) {
                    if (obj.code == 200) {
                        if(_this.testCarts(obj.buyer_cart[groupid])){
                            var _search_address = (obj.buyer_address && obj.buyer_address.id && type=='self')?'&address_id='+obj.buyer_address.id:'';
                            location.href = Config.host.hostUrl+'distributororderconfirm.php'+location.search+'&select_items='+JSON.stringify(_select_items)+'&type='+type+_search_address+'&group_id='+groupid;
                        }
                    } else {
                        Dialog.alert({
                            top_txt: '', //可以是html
                            cfb_txt: Lang.H5_FRESHEN,
                            body_txt: '<p class="dialog-body-p">' + Lang.H5_ERROR + '</p>',
                            cf_fn: function () {
                                location.reload();
                            }
                        });
                    }
                    _this._loading.remove();
                },
                error: function (error) {
                    Dialog.alert({
                        top_txt: '', //可以是html
                        cfb_txt: Lang.H5_FRESHEN,
                        body_txt: '<p class="dialog-body-p">' + Lang.H5_ERROR + '</p>',
                        cf_fn: function () {
                            location.reload();
                        }
                    });
                    _this._loading.remove();
                }
            });
        },
        testCarts: function (cart) {
            var _error_msgs = [],
                _beal = true;
            $.each(cart, function (i,item) {
                if(item.status != 1){
                    _error_msgs.push(item.status_txt);
                    _beal = false;
                    $('.j_cart_item[data-id="' + item.id + '"] .error-p').remove();
                    $('.j_cart_item[data-id="' + item.id + '"]').append('<p class="error-p">' + item.status_txt + '</p>');
                }
            });
            if (!_beal) {
                Dialog.tip({
                    body_txt: '<p class="dialog-body-p">' + _error_msgs[0] + '</p>'
                })
            }
            return _beal;
        }
    };
    DistributorCart.init();
})