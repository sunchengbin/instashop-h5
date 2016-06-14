/**
 * Created by sunchengbin on 16/6/6.
 */
require(['lang','lazyload','hbs','text!views/app/index.hbs','ajax','config','base','common','cart'],function(Lang,Lazyload,Hbs,Index,Ajax,Config,Base,Common,Cart){
    var I = {
        init : function(init_data){
            Lazyload();
            Common.initShopInfo(init_data);
            var IndexHtm = '<div>加载数据中</div>';
            if(init_data){
                IndexHtm= Hbs.compile(Index)({
                    data : init_data,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    num : Cart().getCartNum()
                });
            }else{
                IndexHtm = '<div>数据出错</div>';
            }
            $('body').prepend(IndexHtm);
            if($('.txt-hide').height() > 20){
                $('.down-btn').show();
            }
            this.getImNum();
            this.handleFn();
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
            $('body').on('tap','.j_down_btn',function(){
                if($(this).is('.down-btn')){
                    $(this).removeClass('down-btn').addClass('up-btn');
                    $('.txt').css({'maxHeight':'none'});
                }else{
                    $(this).removeClass('up-btn').addClass('down-btn');
                    $('.txt').css({'maxHeight':'3rem'});
                }

            });
            $(document).on('scroll', function(e) {
                var _st = $('body').scrollTop(),
                    _wh = $(window).height(),
                    _bh = $(document).height();
                if ((_st + _wh > _bh - 200) && getData) {
                    getData = false;
                    Ajax.getJsonp(Config.host.actionUrl+Config.actions.shopList+init_data.shop.id+'?param='+JSON.stringify(reqData),function(obj){
                        if(obj.code == 200){
                            reqData = {
                                edata : {
                                    action: 'index',
                                    page_size: 10,
                                    page_num: page_num++
                                }
                            };
                            if(obj.item_list.list.length > 0){
                                $('.j_item_list').append(_this.addItem(obj.item_list.list));
                                Common.addItems(obj.item_list.list);
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
                    _url = _this.attr('data-url');
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

        },
        addItem : function(items){
            var out = "",
                i = 0;
            for (i; i < items.length;i++) {
                if(items[i].is_top == 0){
                    out += '<li><a class="item-info j_item_info" data-url="'+items[i].h5_url+'" href="javascript:;">'
                        +'<div class="lazy" data-img="'+items[i].img+'"></div>'
                        +'<p class="title">'+items[i].item_comment+'</p>'
                        +'<p class="price">RP '+Base.others.priceFormat(items[i].price)+'</p>'
                        +'</a></li>';
                }
            }
            return out;
        },
        getImNum : function(){
            var im_id = Base.others.getCookie('insta-im-id');
            if (!im_id) {
                im_id = Base.others.getCookie('test-insta-im-id');
            }
            var toImId = init_data.shop['im_id'];
            if (im_id && toImId) {
                var reqData = {
                    edata: {
                        action: 'unreadnum',
                        uid: toImId,
                        uid2: im_id
                    }
                };
                Ajax.getJsonp(Config.host.actionUrl+Config.actions.imNum + '?param=' + JSON.stringify(reqData), function(data){
                    if (data && data.count > 0) {
                        $('.j_im_num').show();
                    } else {
                        $('.j_im_num').hide();
                    }
                });
            }
        }
    };
    I.init(init_data);
})