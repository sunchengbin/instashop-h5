/**
 * Created by sunchengbin on 16/6/6.
 * 首页
 */
require(['lang','lazyload','ajax','config','base','common','cart','fastclick','contact','slide','item'],function(Lang,Lazyload,Ajax,Config,Base,Common,Cart,Fastclick,Contact,Slide,Item){
    var I = {
        init : function(init_data){
            Lazyload();
            var _this = this;
            _this.item_type = Common.getItemListType(init_data.template);
            _this.sortTimes = 0;
            var _cart_num = Cart().getCartNum();
            if(init_data){
                Common.initShopInfo(init_data);
                if(_cart_num > 0){
                    $('.j_cart_wraper').append('<span class="cart-num">'+_cart_num+'</span>');
                }
                _this.initRotateBanner();
            }
            $('.j_php_loding').remove();
            if($('.txt-hide').height() > 44){
                $('.down-btn').show();
            }
            this.handleFn();
        },
        initRotateBanner : function(){
            Common.slideImgNav();
            var _banners = document.querySelectorAll('.j_banner'),
                _len = _banners.length;
            if(_len){
                console.log(1);
                 //$.each(_banners,function(i,item) {
                    for (var i = 0; i < _len; i++){
                        var item = _banners[i];
                        Slide.createNew({
                            dom: item,
                            needTab: true,
                            auto: true
                        });
                    }
                //});
            }
        },
        getTags : function(list){
            if(!list.length)return null;
            var _data = {},
                _list = [],
                _sort = [],
                _result = [],
                i = 0,
                j = 0;
            for(i;i < list.length;i++){
                if(list[i].index_type == 'tags'){
                    if(_data[list[i].tag_id]){
                        //_data[list[i].tag_id].item[list[i].id] = list[i];
                        _data[list[i].tag_id].item.push(list[i]);
                    }else{
                        _sort.push(list[i].tag_id);
                        _data[list[i].tag_id]= {
                            id : list[i].tag_id,
                            name : encodeURIComponent(list[i].tag_name)
                        };
                        _data[list[i].tag_id].item = [];
                        //_data[list[i].tag_id].item[list[i].id] = list[i];
                        _data[list[i].tag_id].item.push(list[i]);
                    }

                }
            }
            for(j;j < _sort.length;j++){
                _result.push(_data[_sort[j]]);
            }
            return {
                tags : _result,
                sort : _sort
            };
        },
        handleFn : function(){
            var page_num = 2,
                _this = this,
                getData = true,
                reqData = {
                    edata : {
                        action: 'index',
                        page_size: 10,
                        page_num: page_num
                    }
                };
            if($('[data-time]').length){
                Item.changeTime();
            }
            Fastclick.attach(document.body);
            if($('.txt-hide').height() > 44){
                console.log(1)
                $('body').on('click','.j_down_box',function(){
                    if($('.j_down_btn').is('.down-btn')){
                        $('.j_down_btn').removeClass('down-btn').addClass('up-btn');
                        $('.txt').css({'maxHeight':'none'});
                    }else{
                        $('.j_down_btn').removeClass('up-btn').addClass('down-btn');
                        $('.txt').css({'maxHeight':'44px'});
                    }
                });
            }
            $(document).on('scroll', function(e) {
                var moz = /Gecko\//i.test(navigator.userAgent);
                var body=document[moz?'documentElement':'body'];
                var _st = body.scrollTop,//firefox下body无scrollTop
                    _wh = $(window).height(),
                    _bh = $(document).height();
                if((_st > 40) && !localStorage.getItem('IndexSortPrompt')){
                    _this.showSortPrompt();
                }
                if ((_st + _wh > _bh - 200) && getData) {
                    getData = false;
                    Ajax.getJsonp(Config.host.actionUrl+Config.actions.shopList+init_data.shop.id+'?param='+JSON.stringify(reqData),function(obj){
                        if(obj.code == 200){
                            reqData = {
                                edata : {
                                    action: 'index',
                                    page_size: 10,
                                    page_num: ++page_num
                                }
                            };
                            if(obj.item_list.list.length > 0){
                                //console.log(obj.item_list.list);
                                var _list_data = _this.transItems(obj.item_list.list);
                                //console.log(_list_data);
                                if(_list_data.item.length){
                                    if(!$('.j_item_box .j_item_list').length){
                                        var _htm = '<p class="item-title"><span></span>'+Lang.H5_GOODS_ORTHER+'</p><ul class="items-list j_item_list clearfix"></ul>';
                                        $('.j_item_box').html(_htm);
                                    }
                                    $('.j_item_box ul').append(Item.addItem(_list_data.item,_this.item_type));
                                }
                                if(_list_data.hot.length){
                                    if(!$('.j_hot_list').length){
                                        var _htm = '<p class="item-title"><span></span>'+Lang.H5_GOODS_HOT+'</p><ul class="items-list j_hot_list clearfix"></ul>';
                                        $('.j_hot_list').html(_htm);
                                    }
                                    $('.j_hot_list').append(Item.addItem(_list_data.hot,_this.item_type));
                                }
                                if(_list_data.tags.length){
                                    var _tags = _list_data.tags;
                                    for(var tagid in _tags){
                                        if($('[data-tagid="'+_tags[tagid].id+'"]').length){
                                            $('[data-tagid="'+_tags[tagid].id+'"] ul').append(Item.addItem(_list_data.tags[tagid].item,_this.item_type));
                                        }else{
                                            var _htm = '<section class="items-box" data-tagid="'+_tags[tagid].id+'">'
                                                +'<p class="item-title b-bottom clearfix"><a class="fr j_item_info" href="javascript:;" data-url="'+Config.host.host+'k/'+_tags[tagid].id+'">more<i class="icon iconfont icon-go-font"></i></a><span></span><em>'+decodeURIComponent(_list_data.tags[tagid].name)+'</em></p>'
                                                +'<ul class="items-list j_item_list clearfix">'
                                                +Item.addItem(_list_data.tags[tagid].item,_this.item_type)
                                                +'</ul>'
                                                +'</section>';
                                            $('.j_box').eq(($('.j_box').length-1)).before(_htm);
                                        }
                                    }
                                }
                                if($('[data-time]').length){
                                    Item.changeTime();
                                }
                                //Common.addItems(obj.item_list.list);
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
            $('body').on('click','.j_item_info',function(){
                var _this = $(this),
                    _url = _this.attr('data-url'),
                    _scroll_top = $(window).scrollTop();
                localStorage.setItem('ScrollTop',_scroll_top);
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            $('body').on('click','.j_cart_wraper',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            $('body').on('click','.j_category',function(){
                var _sort_box = document.querySelector('.j_sort_box');
                var _sort_cover = document.querySelector('.j_sort_cover');
                _sort_box.style.webkitTransitionDuration = '.6s';
                _sort_box.style.webkitTransform = "translate3d(0,0,0)";
                _sort_cover.style.webkitTransitionDuration = '.3s';
                _sort_cover.style.webkitTransform = "translate3d(0,0,0)";
                _sort_box.style.mozTransitionDuration = '.6s';
                _sort_box.style.mozTransform = "translate3d(0,0,0)";
                _sort_cover.style.mozTransitionDuration = '.3s';
                _sort_cover.style.mozTransform = "translate3d(0,0,0)";
                _this.hideSortPrompt();
            });
            $('body').on('click','.j_sort_cover',function(){
                var _sort_box = document.querySelector('.j_sort_box');
                var _sort_cover = document.querySelector('.j_sort_cover');
                _sort_box.style.webkitTransitionDuration = '.3s';
                _sort_box.style.webkitTransform = "translate3d(-100%,0,0)";
                _sort_cover.style.webkitTransitionDuration = '.6s';
                _sort_cover.style.webkitTransform = "translate3d(-100%,0,0)";
            });
            localStorage.removeItem('FromUrl');
            if(localStorage.getItem('ScrollTop') && Base.others.getUrlPrem('item')){//存在scrollTop时页面下滚到记忆中的top值
                //if(Base.others.verifyBower().ios){
                _this.goScroll();
                //}
            }
            if($('.j_show_contact').length){
                _this.contact = Contact({
                    data : {
                        tel : !init_data.shop.line_url&&!init_data.shop.phone?'':init_data.shop.phone,
                        line : init_data.shop.line_url
                    },
                    lang:Lang
                });
                $('body').on('click','.j_show_contact',function(){
                    _this.contact.createHtm({
                        data : {
                            tel : !init_data.shop.line_url&&!init_data.shop.phone?'':init_data.shop.phone,
                            line : init_data.shop.line_url
                        },
                        lang:Lang
                    }).toShow();
                });
            }

        },
        showSortPrompt : function(){
            $('.j_sort_prompt_box .btn-cover').html(Lang.H5_GOOD_SORT);
            $('.j_sort_prompt_box').addClass('sort-prompt-box');
        },
        hideSortPrompt : function(){
            $('.j_sort_prompt_box .btn-cover').html('');
            $('.j_sort_prompt_box').removeClass('sort-prompt-box');
            localStorage.setItem('IndexSortPrompt',1);
        },
        goScroll : function() {
            var _this = this,
                _l_top = Number(localStorage.getItem('ScrollTop'));
            if (!_l_top) {
                _l_top = 0;
            }
            if(_this.t){
                //console.log(1)
                clearTimeout(_this.t);
            }
            _this.t = setTimeout(function(){
                _this.sortTimes++;
                if(_this.sortTimes > 7){
                    clearTimeout(_this.t);
                }else{
                    //console.log(_this.t)
                    $(window).scrollTop(_l_top);
                    if ($(document).height() < _l_top) {
                        _this.goScroll();
                    }else{
                        clearTimeout(_this.t);
                        //console.log('end')
                    }
                }

            },100);

        },
        transItems : function(items){
            var i = 0,
                _hot = [],
                _item = [],
                _this = this;
            for (i; i < items.length;i++) {
                if(items[i].index_type == 'top') {
                    _hot.push(items[i]);
                }
                if(items[i].index_type == 'no_tag'){
                    _item.push(items[i]);
                }
            }
            return {
                hot : _hot,
                item : _item,
                tags : _this.getTags(items).tags
            };
        }
    };
    I.init(init_data);
})
