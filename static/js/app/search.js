/**
 * Created by sunchengbin on 2016/12/7.
 */
require(['config','ajax','common','item','fastclick','dialog','lazyload','base','lang'],function(Config,Ajax,Common,Item,Fastclick,Dialog,Lazyload,Base,Lang){
    var Search = {
        init : function(){
            var _this = this;
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            if($('[data-time]').length){
                Item.changeTime();
            }
            Fastclick.attach(document.body);
            if(Base.others.getUrlPrem('key') && Base.others.getUrlPrem('seller_id')){
                Lazyload();
            }
            document.querySelector('.j_key').focus();
            $('body').on('keyup',function(e){
                if(e.keyCode == 13){
                    var _key = $.trim($('.j_key').val());
                    if(!_key)return;
                    _this.getSearchValue(_key);
                }
            });
            _this.searching = false;
            $('body').on('click','.j_search_btn',function(){
                var _key = $.trim($('.j_key').val());
                if(!_key)return;
                if(_this.searching)return;
                _this.getSearchValue(_key);
            });
            $('body').on('blur','.j_key',function(){
                _paq.push(['trackEvent', '失去焦点搜索', 'blur', '搜索']);
                var _key = $.trim($(this).val());
                if(!_key)return;
                if(_this.searching)return;
                _this.getSearchValue(_key);
            });
            $('body').on('click','.j_item_info',function(){
                var _this = $(this),
                    _url = _this.attr('data-url')+'?search='+encodeURIComponent($.trim($('.j_key').val()));
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            $('body').on('click','.j_go_back',function(){
                _paq.push(['trackEvent', '返回', 'click', '']);
                var URL_HTTP_TYPE = location.protocol,
                    URL_HOST_NAME = location.hostname,
                    _shop_data = localStorage.getItem('ShopData'),
                    _home = _shop_data?JSON.parse(_shop_data).ShopInfo.url:URL_HTTP_TYPE+'//'+URL_HOST_NAME;
                location.href = _home;
            });
        },
        getSearchValue : function(val){
            var _this = this,
                _shop_data = localStorage.getItem('ShopData'),
                _s_id = _shop_data?JSON.parse(_shop_data).ShopInfo.id:null;
            _this.searching = true;
            if(!_s_id){return;}
            _this._loading = Dialog.loading({
                width: 100,
                is_cover: true
            });
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
                    _this.searching = false;
                    _this._loading.remove();
                    if(obj.code == 200){
                        var _html = '<div class="no-search-val"><img src="'+Config.host.imgUrl+'/app/404.png"/><p>'+Lang.H5_NO_SEARCH_VAL+'</p></div>';
                        if(obj.item_list.list.length){
                            var _list_type = Common.getItemListType(obj.template);
                                _html = Item.addItem(obj.item_list.list,_list_type);
                            if(_list_type == 3){
                                _html = '<ul class="three-items-list clearfix j_default_item_list">'+_html+'</ul>';
                            }else{
                                _html = '<ul class="items-list clearfix j_item_list">'+_html+'</ul>';
                            }
                        }
                        $('.j_item_box').html(_html);
                        if($('[data-time]').length){
                            Item.changeTime();
                        }
                        Lazyload();
                    }else{
                        Dialog.tip({
                            body_txt:'<p>'+obj.message+'</p>'
                        });
                    }
                },
                function(error){
                    _this.searching = false;
                    _this._loading.remove();
                }
            );
        }
    };
    Search.init();
})