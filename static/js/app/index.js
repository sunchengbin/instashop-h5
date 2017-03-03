/**
 * Created by sunchengbin on 16/6/6.
 * 首页
 */
require(['lang','lazyload','ajax','config','base','common','cart','fastclick','contact','slide','item','dialog','sharecoupon'],function(Lang,Lazyload,Ajax,Config,Base,Common,Cart,Fastclick,Contact,Slide,Item,Dialog,Sharecoupon){
    var I = {
        init : function(init_data){
            Lazyload();
            var _this = this;
            _this.item_type = Common.getItemListType(init_data.template);
            _this.sortTimes = 0;
            if(init_data){
                Common.initShopInfo(init_data);
                var _cart_num = Cart().getCartNum();
                if(_cart_num != 0){
                    $('.j_cart_wraper').append('<span class="cart-num">'+_cart_num+'</span>');
                }
                _this.initRotateBanner();
            }
            $('.j_php_loding').remove();
            if($('.txt-hide').height() > 44){
                $('.down-btn').show();
            }
            _this.handleFn();
        },
        initRotateBanner : function(){
            Common.slideImgNav();
            var _banners = document.querySelectorAll('.j_banner'),
                _len = _banners.length;
            if(_len){
                for (var i = 0; i < _len; i++){
                    var item = _banners[i];
                    Slide.createNew({
                        dom: item,
                        needTab: true,
                        auto: true
                    });
                }
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
            $('body').on('click','.j_share_btn',function(){
                PaqPush && PaqPush('分享获取优惠券', '');
                var _coupon_id = $(this).attr('data-couponid');
                Sharecoupon({
                    coupon_url : Config.host.host+'b/'+_coupon_id
                });
            });
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
                                var _list_data = _this.transItems(obj.item_list.list);
                                if(_list_data.item.length){
                                    if(!$('.j_item_box .j_item_list').length){
                                        var _htm = '<p class="item-title"><span></span>'+Lang.H5_GOODS_ORTHER+'</p><ul class="'+(_this.item_type!=3?'items-list':'three-items-list')+' j_item_list clearfix"></ul>';
                                        $('.j_item_box').html(_htm);
                                    }
                                    $('.j_item_box ul').append(Item.addItem(_list_data.item,_this.item_type));
                                }
                                if(_list_data.hot.length){
                                    if(!$('.j_hot_list').length){
                                        var _htm = '<p class="item-title"><span></span>'+Lang.H5_GOODS_HOT+'</p><ul class="'+(_this.item_type!=3?'items-list':'three-items-list')+' j_hot_list clearfix"></ul>';
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
                                                +'<p class="item-title b-bottom clearfix"><a class="fr j_item_info" href="javascript:;" data-url="'+Config.host.host+'k/'+_tags[tagid].id+'">more<i class="icon iconfont icon-go-font"></i></a><span></span><em>'+decodeURIComponent(_list_data.tags[tagid].name)+'</em></p>';
                                            if(_this.item_type != 3){
                                                _htm +='<ul class="items-list j_item_list clearfix">';
                                            }else{
                                                _htm +='<ul class="three-items-list j_item_list clearfix">';
                                            }
                                            _htm += Item.addItem(_list_data.tags[tagid].item,_this.item_type)
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
                    _scroll_top = $(window).scrollTop(),
                    _host_name = location.hostname;
                if(!_url){return;}
                //if(Base.others.isCustomHost()){
                //    if(/\/k\//g.test(_url) || /\/detail\//g.test(_url)){
                //        _url = _url.replace(/\/\/[^\/]+\//,'//'+_host_name+'/');
                //    }else{
                //        _url = _url.replace(/\/\/[^\/]+\//,'//'+_host_name+'/detail/');
                //    }
                //
                //}else{
                //    _url = Common.transFromUrl(_url);
                //}
                localStorage.setItem('ScrollTop',_scroll_top);
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            $('body').on('click','.j_cart_wraper',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveCartFromUrl(function(){
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
            //满减 lanchenghao
            $('body').on('click','.j_reduc_box',function(){
                PaqPush && PaqPush('查看满减公告', '');
                var _htm = '<ul class="reduc-rule-list">';
                if(!!init_data.shop.shop_discount){
                    for(var i=0,_reducItem;_reducItem=init_data.shop.shop_discount.info[i++];){
                        _htm+="<li><span></span>Minimal Pembelian Rp "+Base.others.priceFormat(_reducItem.condition_price)+" Potongan Rp "+ Base.others.priceFormat(_reducItem.discount_price)+"</li>"
                    }
                    _htm +='<li><span></span>'+$(".reduc-expire").text()+'</li></ul>'
                    // _htm = _htm.replace(/,$/gi,'') +"</br>"+ $(".reduc-expire").text();
                    Dialog.alert({
                        top_txt:"<p style='text-align:center'>"+Lang.H5_REDUC_TITLE+"</p>",
                        show_top:true,
                        body_txt:_htm,
                        body_fn:function(){
                            $('.j_c_btn').hide();
                        }
                    })
                }
            });
            $('body').on('click','.j_search_btn',function(){
                var _val = $.trim($('.j_search_ipt').val());
                if(!_val){return;}
                location.href = Config.hrefUrl + 'search.php?key='+encodeURIComponent(_val)+'&seller_id='+init_data.shop.id;
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
            //修正因标签属性href有值的问题导致被追加spider参数 line中user not find的问题
            $('body').on('click','.j_goto_line',function(){
                location.href = init_data.shop.line_url;
            });

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
                clearTimeout(_this.t);
            }
            _this.t = setTimeout(function(){
                _this.sortTimes++;
                if(_this.sortTimes > 7){
                    clearTimeout(_this.t);
                }else{
                    $(window).scrollTop(_l_top);
                    if ($(document).height() < _l_top) {
                        _this.goScroll();
                    }else{
                        clearTimeout(_this.t);
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
