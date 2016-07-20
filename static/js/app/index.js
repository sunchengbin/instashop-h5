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
            if($('.txt-hide').height() > 33){
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
                        page_size: 4,
                        page_num: page_num
                    }
                };
            if($('[data-time]').length){
                _this.changeTime();
            }
            $('body').on('tap','.j_down_box',function(){
                if($('.j_down_btn').is('.down-btn')){
                    $('.j_down_btn').removeClass('down-btn').addClass('up-btn');
                    $('.txt').css({'maxHeight':'none'});
                }else{
                    $('.j_down_btn').removeClass('up-btn').addClass('down-btn');
                    $('.txt').css({'maxHeight':'44px'});
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
                                    page_size: 4,
                                    page_num: ++page_num
                                }
                            };
                            if(obj.item_list.list.length > 0){
                                var _list_data = _this.transItems(obj.item_list.list);
                                console.log(_list_data)
                                if(_list_data.item.length){
                                    if(!$('.j_item_list').length){
                                        var _htm = '<p class="item-title"><span></span>'+Lang.H5_GOODS_ORTHER+'</p><ul class="items-list j_item_list clearfix"></ul>';
                                        $('.j_item_box').html(_htm);
                                    }
                                    $('.j_item_list').append(_this.addItem(_list_data.item));
                                }
                                if(_list_data.hot.length){
                                    if(!$('.j_hot_list').length){
                                        var _htm = '<p class="item-title"><span></span>'+Lang.H5_GOODS_HOT+'</p><ul class="items-list j_hot_list clearfix"></ul>';
                                        $('.j_hot_list').html(_htm);
                                    }
                                    $('.j_hot_list').append(_this.addItem(_list_data.hot));
                                }
                                if($('[data-time]').length){
                                    _this.changeTime();
                                }
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
        transItems : function(items){
            var i = 0,
                _hot = [],
                _item = [];
            for (i; i < items.length;i++) {
                if(items[i].is_top == 1) {
                    _hot.push(items[i]);
                }else{
                    _item.push(items[i]);
                }
            }
            return {
                hot : _hot,
                item : _item
            };
        },
        discountTime : function(nowTime,endTime){
            var _nt = this.datetime_to_unix(nowTime),
                _et = this.datetime_to_unix(endTime),
                _send = (_et - _nt + 3600000)/1000,
                _hour = ''+(_send - _send % 3600)/3600,
                _second = ''+(_send - _hour*3600)%60,
                _minute = ''+(_send - _hour*3600 - _second)/60;
            if(_send < 0){
                return {
                    time : '00.00.00',
                    second : _send
                };
            }
            return {
                time : ((_hour.length<2?'0'+_hour:_hour)+'.'+(_minute.length<2?'0'+_minute:_minute)+'.'+(_second.length<2?'0'+_second:_second)),
                second : _send
            };
        },
        datetime_to_unix :function(datetime){
            var tmp_datetime = datetime.replace(/:/g,'-');
            tmp_datetime = tmp_datetime.replace(/ /g,'-');
            var arr = tmp_datetime.split("-");
            var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
            return parseInt(now.getTime());
        },
        countTime : function(_send){
            var _hour = ''+(_send - _send % 3600)/3600,
                _second = ''+(_send - _hour*3600)%60,
                _minute = ''+(_send - _hour*3600 - _second)/60;
            if(_send < 0){
                return '00:00:00';
            }
            return ((_hour.length<2?'0'+_hour:_hour)+':'+(_minute.length<2?'0'+_minute:_minute)+':'+(_second.length<2?'0'+_second:_second));
        },
        changeTime : function(){
            var _this = this;
            $('[data-time]').each(function(i,item){
                var _second = $(item).attr('data-time');
                setInterval(function(){
                    --_second;
                    $(item).attr('data-time',_second).html(_this.countTime(_second));
                },1000);
            });
        },
        addItem : function(items){
            var out = "",
                _this = this,
                _webplog = Base.others.webpLog(),
                i = 0;
            for (i; i < items.length;i++) {
                var _time = _this.discountTime(items[i].discount.now_time,items[i].discount.end_time);
                out += '<li><a class="item-info j_item_info" data-url="'+(Config.host.host+'detail/'+items[i].id+(_webplog?'?webpLog=1':''))+'" href="javascript:;">'
                    +'<div class="lazy" data-img="'+Base.others.cutImg(items[i].img,160)+'">';
                if(items[i].is_discount){
                    out +='<span>-'+items[i].discount.value+'%</span>';
                    if(items[i].discounting){
                        out +='<p><i class="icon iconfont icon-time-font"></i><span data-time="'+_time.second+'">'+_time.time+'</span></p>';
                    }else{
                        out +='<p>'+Lang.H5_IS_ABOUT_TO_BEGIN+'</p>';
                    }
                }
                out +='</div>'
                    +'<p class="title">'+items[i].item_comment+'</p>';
                if(!items[i].is_discount){
                    out +='<p class="discount-price"></p>';
                }else{
                    if(items[i].discounting){
                        out +='<p class="discount-price">Rp '+Base.others.priceFormat(items[i].discount.price)+'</p>';
                    }else{
                        out +='<p class="discount-price">Rp '+Base.others.priceFormat(items[i].discount.price)+'</p>';
                    }
                    //out +='<p class="discount-price">Rp '+Base.others.priceFormat(items[i].discount.price)+'</p>';
                }
                if(items[i].price < 0){
                    out +='<p class="price"></p>';
                }else{
                    out +='<p class="price '+(items[i].is_discount?'cost-price':'')+'">Rp '+Base.others.priceFormat(items[i].price)+'</p>';
                }

                out +='</a></li>';
            }
            return out;
        },
        getImNum : function(){
            //var im_id = Base.others.getCookie('insta-im-id');
            //if (!im_id) {
            //    im_id = Base.others.getCookie('test-insta-im-id');
            //}
            var im_id = localStorage.getItem('UID'),//im页面种如cookie
                toImId = init_data.shop['im_id'];
            if (im_id && toImId) {
                var reqData = {
                    edata: {
                        action: 'unreadnum',
                        uid: toImId,
                        uid2: im_id
                    }
                };
                Ajax.getJsonp(Config.host.actionUrl+Config.actions.imNum + '?param=' + JSON.stringify(reqData), function(data){
                    //alert(data.count);
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