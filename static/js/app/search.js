/**
 * Created by sunchengbin on 2016/12/7.
 */
require(['config','ajax','common','item','fastclick','dialog'],function(Config,Ajax,Common,Item,Fastclick,Dialog){
    var Search = {
        init : function(){
            var _this = this;
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            Fastclick.attach(document.body);
            document.querySelector('.j_key').focus();
            $('body').on('click','.j_search_btn',function(){
                var _key = $.trim($('.j_key').val());
                if(!_key)return;
                _this.getSearchValue(_key);
            });
        },
        getSearchValue : function(val){
            var _shop_data = localStorage.getItem('ShopData');
            var _s_id = _shop_data?JSON.parse(_shop_data).ShopInfo.id:null;
            if(!_s_id){return;}
            var _data = {
                edata:{
                    action : 'digital',
                    search : encodeURIComponent(val),
                    seller_id : _s_id
                }
            };
            Ajax.getJsonp(
                Config.host.actionUrl+Config.actions.search+'?param='+JSON.stringify(_data),
                function(obj){
                    if(obj.code == 200){
                        var _list_type = Common.getItemListType(obj.template),
                            _html = Item.addItem(obj.item_list.list,_list_type);
                        if(_list_type == 3){
                            _html = '<ul class="items-list clearfix j_item_list">'+_html+'</ul>';
                        }else{
                            _html = '<ul class="three-items-list clearfix j_default_item_list">'+_html+'</ul>';
                        }
                        $('.j_item_box').html(_html);
                    }else{
                        Dialog.tip({
                            body_txt:'<p>'+obj.message+'</p>'
                        });
                    }
                },
                function(error){

                }
            );
        },
        showItemList : function(){

        }
    };
    Search.init();
})