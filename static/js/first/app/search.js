/**
 * Created by sunchengbin on 2016/12/7.
 */
require(['config','ajax','common','item','fastclick','dialog','lazyload','base','lang'],function(Config,Ajax,Common,Item,Fastclick,Dialog,Lazyload,Base,Lang){
    var Search = {
        init : function(){
            var _this = this;
            _this.hasData = true;
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this,
                _key = Base.others.getUrlPrem('key'),
                _seller_id = Base.others.getUrlPrem('seller_id');
            if($('[data-time]').length){
                Item.changeTime();
            }
            Fastclick.attach(document.body);
            if(_key && _seller_id){
                _this.data =  {
                    edata:{
                        action : 'digital',
                        search : encodeURIComponent(_key),
                        seller_id : _seller_id,
                        page_size : 18,
                        page_num : 1
                    }
                };
                Lazyload();
            }
            //document.querySelector('.j_key').focus();
            $('body').on('keyup',function(e){
                if(e.keyCode == 13){
                    _this.hasData = true;
                    var _key = $.trim($('.j_key').val());
                    if(!_key)return;
                    _this.getSearchValue(_key);
                }
            });
            _this.searching = false;
            $('body').on('click','.j_search_btn',function(){
                _this.hasData = true;
                var _key = $.trim($('.j_key').val());
                if(!_key)return;
                if(_this.searching)return;
                _this.getSearchValue(_key);
            });
            //$('body').on('blur','.j_key',function(){
            //    _paq.push(['trackEvent', '失去焦点搜索', 'blur', '搜索']);
            //    var _key = $.trim($(this).val());
            //    if(!_key)return;
            //    if(_this.searching)return;
            //    _this.getSearchValue(_key);
            //});
            $('body').on('click','.j_item_info',function(){
                var _this = $(this),
                    _url = _this.attr('data-url')+'?search='+encodeURIComponent($.trim($('.j_key').val()));
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            $('body').on('click','.j_go_back',function(){
                PaqPush && PaqPush('返回','');
                //_paq.push(['trackEvent', '返回', 'click', '']);
                var URL_HTTP_TYPE = location.protocol,
                    URL_HOST_NAME = location.hostname,
                    _shop_data = localStorage.getItem('ShopData'),
                    _home = _shop_data?JSON.parse(_shop_data).ShopInfo.url:URL_HTTP_TYPE+'//'+URL_HOST_NAME;
                location.href = _home;
            });
            $(document).on('scroll', function(e) {
                var moz = /Gecko\//i.test(navigator.userAgent);
                var body=document[moz?'documentElement':'body'];
                var _st = body.scrollTop,//firefox下body无scrollTop
                    _wh = $(window).height(),
                    _bh = $(document).height(),
                    _key = $.trim($('.j_key').val());
                if(!_key)return;
                if(_this.searching)return;
                if (_st + _wh > _bh - 200) {
                    _this.getSearchValue(_key,'scroll');
                }
            });
        },
        getSearchValue : function(val,type){
            PaqPush && PaqPush('搜索','key='+val);
            var _this = this,
                _shop_data = localStorage.getItem('ShopData'),
                _s_id = _shop_data?JSON.parse(_shop_data).ShopInfo.id:null;
            _this.searching = true;
            if(!_this.hasData){return;}
            if(!_s_id){return;}
            _this._loading = Dialog.loading({
                width: 100,
                is_cover: true
            });

            var _data = {
                edata:{
                    action : 'digital',
                    search : encodeURIComponent(val),
                    seller_id : _s_id,
                    page_size : 18,
                    page_num : 0
                }
            };
            if(type){
                _this.data = _this.data ? _this.data : _data;
            }else{
                _this.data = _data;
            }
            Ajax.getJsonp(
                Config.host.actionUrl+Config.actions.search+'?param='+JSON.stringify(_this.data),
                function(obj){
                    _this.searching = false;
                    _this._loading.remove();
                    if(obj.code == 200){
                        _this.data = {
                            edata:{
                                action : 'digital',
                                search : _this.data.edata.search,
                                seller_id : _this.data.edata.seller_id,
                                page_size : 18,
                                page_num : ++_this.data.edata.page_num
                            }
                        };
                        var _html = '<div class="no-search-val"><img src="'+Config.host.imgUrl+'/app/404.png"/><p>'+Lang.H5_NO_SEARCH_VAL+'</p></div>';
                        var _list_type = Common.getItemListType(obj.template);
                        if(obj.item_list.list.length){
                            _html = Item.addItem(obj.item_list.list,_list_type);
                            if(type){
                                if(_list_type == 3){
                                    $('.j_default_item_list').append(_html);
                                }else{
                                    $('.j_item_list').append(_html);
                                }
                            }else{
                                if(obj.item_list.list.length){
                                    if(_list_type == 3){
                                        _html = '<ul class="three-items-list clearfix j_default_item_list">'+_html+'</ul>';
                                    }else{
                                        _html = '<ul class="items-list clearfix j_item_list">'+_html+'</ul>';
                                    }
                                }
                                $(window).scrollTop(0);
                                $('.j_item_box').html(_html);
                            }
                            if($('[data-time]').length){
                                Item.changeTime();
                            }
                            Lazyload();
                        }else{
                            _this.hasData = false;
                        }
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