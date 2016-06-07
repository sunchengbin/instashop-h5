/**
 * Created by sunchengbin on 16/6/7.
 */
define(['base'],function(Base){
    var AppCommon = function(){};
    AppCommon.prototype = {
        saveShopInfo : function(data){
            var _this = this,
                _id = _this.getRequireId(),
                _shop_data = localStorage.getItem('ShopData');
            //if(_shop_data && JSON.parse(_shop_data).){return;}
            var _info = {
                    Cart : {},
                    Items : {},
                    ShopInfo : data.shop,
                    ClientUuid : data.client_uuid
                };
            _info.Items[_id] = data.item_list.list;
            localStorage.setItem('ShopData',JSON.stringify(_info));
        },
        addItems : function(items){

        },
        getRequireId : function(){
            var _url = location.href,
                _match = _url.match(/\/\d+/g),
                _len = _match.length;
            return _match[_len-1].split('/')[1];
        }
    };
    return function(){
        return new AppCommon();
    }
})
