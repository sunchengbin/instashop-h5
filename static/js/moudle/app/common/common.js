/**
 * Created by sunchengbin on 16/6/7.
 */
define(['base','dialog','lang'],function(Base,Dialog,Lang){
    var AppCommon = function(){
        return this;
    };
    AppCommon.prototype = {
        initShopInfo : function(data){//进入店铺首页数据初始化
            var _this = this,
                _id = data.shop.id,//获取连接头部id值
                _shop_data = localStorage.getItem('ShopData'),
                _json_shop_data = _shop_data?JSON.parse(_shop_data):null;
            if(_shop_data){
                if(_json_shop_data.ShopInfo && _json_shop_data.ShopInfo.id && _json_shop_data.ShopInfo.id == _id){
                    if(!_json_shop_data.Items){
                        _json_shop_data['Items']  =  _this.transItems(data.item_list.list);
                    }else{
                        return;
                    }
                }else{
                    _json_shop_data['ShopInfo']  =  data.shop;
                    _json_shop_data['ClientUuid']  =  data.client_uuid;
                    _json_shop_data['Items']  =  _this.transItems(data.item_list.list);
                }
            }//存在且id不相等跳出
            else{
                _json_shop_data = {
                    Cart : null,//购物车数据不需要跟着店铺变化而变化的本地数据
                    Items : null,//根据店铺而变化
                    ShopInfo : data.shop,//根据店铺id变化而变化
                    ClientUuid : data.client_uuid || null,//根据店铺而重置
                    Address : null//不需要根据店铺切换而改变的本地数据
                };
                _json_shop_data.Items = _this.transItems(data.item_list.list);
            }
            localStorage.setItem('ShopData',JSON.stringify(_json_shop_data));
        },
        addItems : function(list){//商铺商品数据添加
            var _shop_data = localStorage.getItem('ShopData'),
                _json_shop_data = _shop_data?JSON.parse(_shop_data):null,
                _items = this.transItems(list);
            if(_json_shop_data && _items){
                _json_shop_data.Items = $.extend(_json_shop_data.Items,_items);
                localStorage.setItem('ShopData',JSON.stringify(_json_shop_data));
            }
        },
        transItems : function(list){//转换商品数据格式为json形式方便添加去重
            if(!list.length){return null;}
            var _items = {};
            Base.others.each(list,function(item,i){
                _items[item.id] = item;
            });
            return _items;
        },
        getItemInfo : function(id){
            var _shop_data = localStorage.getItem('ShopData'),
                _json_shop_data = _shop_data?JSON.parse(_shop_data):null;
            if(!_json_shop_data){return null;}
            return _json_shop_data.Items[id];
        },
        getRequireId : function(){//获取头部id
            var _url = location.href,
                _match = _url.match(/\/\d+/g),
                _len = _match.length;
            return _match[_len-1].split('/')[1];
        },
        saveFromUrl : function(callback){//存储导航中返回上一页的url地址
            var _form_url =  location.href;
            if(Base.others.getUrlPrem('item',_form_url) == 'back' && !Base.others.getUrlPrem('sort_id')){
                _form_url = _form_url.split('?')[0];
            }
            localStorage.setItem('FromUrl',_form_url);
            setTimeout(function(){
                callback && callback();
            },100);
        },
        getFromUrl : function(){//获取返回上一页的url地址
            return localStorage.getItem('FromUrl');
        },
        telVerify : function(tel,callback,ccallback){//手机号验证
            tel = Number(tel);
            if(/^\d{9,12}$/g.test(tel)){
                return true;
            }else{
                if(/^\d{21,}$/g.test(tel)){//手机号码不能超过20位
                    Dialog.tip({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">'+Lang.H5_TEL_PASS_20+'</p>'
                    });
                    return false;
                }else{
                    if(!isNaN(tel)){//纯数字其他错误情况的时候需要确认
                        Dialog.confirm({
                            top_txt : '',//可以是html
                            body_txt : '<p class="dialog-body-p">'+Lang.H5_TEL_GO_CONFIRM+'</p>',
                            cfb_txt : Lang.H5_GO_CONFIRM,//确定按钮文字
                            c_fn : function(){
                                callback && callback();
                            },
                            cf_fn : function(){
                                ccallback && ccallback();
                            }
                        });
                        return false;
                    }
                }
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_CONFIRM_TEL_IS_TRUE+'</p>'
                });
                return false;
            }
            return false;
        },
        replaceUrlPrompt : function(url){
            var URL_HTTP_TYPE = location.protocol;
            if(/https/g.test(URL_HTTP_TYPE) && !/https/g.test(url)){
                return url.replace(/http/g,'https');
            }
            return url;
        }
    };

    return new AppCommon();
})
