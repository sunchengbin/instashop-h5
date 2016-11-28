/**
 * Created by sunchengbin on 16/7/28.
 */
require(['lang','lazyload','hbs','text!views/app/sort.hbs','ajax','config','base','common','cart','fastclick','item'],function(Lang,Lazyload,Hbs,Sort,Ajax,Config,Base,Common,Cart,Fastclick,Item) {
    var SORT = {
        init : function(){
            Lazyload();
            var SortHtm = '<div>'+Lang.H5_LOADING+'</div>';
            if(init_data){
                SortHtm= Hbs.compile(Sort)({
                    data : init_data,
                    name : init_data.tag.name,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    num : Cart().getCartNum()
                });
            }else{
                SortHtm = '<div>'+Lang.H5_ERROR+'</div>';
            }
            $('body').prepend(SortHtm);
            this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            if($('[data-time]').length){
                Item.changeTime();
            }
            Fastclick.attach(document.body);
            $('body').on('click','.j_go_back',function(){
                var _local_url = localStorage.getItem('FromUrl'),
                    _ios = Base.others.verifyBower().ios;
                var _url = Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/'+init_data.tag.seller_id;
                if(_ios){
                    location.href = _url+'?item=back';
                }else{
                    if(_local_url && /\/s\//g.test(_local_url)){
                        history.back();
                    } else{
                        location.href = _url+'?item=back';
                    }
                }
            });
            $('body').on('click','.j_cart_wraper',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            $('body').on('click','.j_item_info',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                localStorage.setItem('SortTop',$(window).scrollTop());
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            if(localStorage.getItem('SortTop') && Base.others.getUrlPrem('item')){//存在scrollTop时页面下滚到记忆中的top值
                //if(Base.others.verifyBower().ios){
                    _this.goScroll();
                //}
            }
            if(init_data.code == 200){
                var _list = init_data.item_list.list,
                    _last_id = _list.length?_list[(_list.length-1)].id:null,
                    _tag_id = init_data.tag.id,
                    _this = this,
                    getData = _last_id?true:false,
                    reqData = {
                        edata : {
                            action : 'tag',
                            page_size : 10,
                            tag_id : _tag_id,
                            last_id : _last_id,
                            havestock : 1
                        }
                    };
                $(window).on('scroll', function(e) {
                    var _st = $('body').scrollTop(),
                        _wh = $(window).height(),
                        _bh = $(document).height();
                    //(_st + _wh >= _bh - 200)
                    if (_st + _wh >= _bh && getData) {
                        getData = false;
                        Ajax.getJsonp(Config.host.actionUrl+Config.actions.sortAction+_tag_id+'/items?param='+JSON.stringify(reqData),function(obj){
                            if(obj.code == 200){
                                var _list = obj.item_list.list,
                                    _last_id = _list.length?_list[(_list.length-1)].id:null;
                                reqData = {
                                    edata : {
                                        action : 'tag',
                                        page_size : 10,
                                        tag_id : _tag_id,
                                        last_id : _last_id,
                                        havestock : 1
                                    }
                                };
                                if(obj.item_list.list.length > 0){
                                    var _list_data = _this.transItems(obj.item_list.list);
                                    if(_list_data.item.length){
                                        if(!$('.j_item_list').length){
                                            var _htm = '<p class="item-title"><span></span>'+Lang.H5_GOODS_ORTHER+'</p><ul class="items-list j_item_list clearfix"></ul>';
                                            $('.j_item_box').html(_htm);
                                        }
                                        $('.j_item_list').append(Item.addItem(_list_data.item));
                                    }
                                    if($('[data-time]').length){
                                        Item.changeTime();
                                    }
                                    getData = true;
                                }else{
                                    getData = false;
                                }
                            }else{
                                getData = true;
                            }
                        },function(error){
                            getData = true;
                        });
                    }
                });
            }
        },
        goScroll : function(){
            var _this = this,
                _l_top = Number(localStorage.getItem('SortTop'));
            if (!_l_top) {
                _l_top = 0;
            }
            if(_this.t){
                console.log(1)
                clearTimeout(_this.t);
            }
            _this.t = setTimeout(function(){
                console.log(_this.t)
                $(window).scrollTop(_l_top);
                if ($(document).height() < _l_top) {
                    _this.goScroll();
                }else{
                    clearTimeout(_this.t);
                    console.log('end')
                }
            },100);
        },
        transItems : function(items){
            var i = 0,
                _hot = [],
                _item = [];
            for (i; i < items.length;i++) {
                _item.push(items[i]);
            }
            return {
                item : _item
            };
        }
    };
    SORT.init();
})