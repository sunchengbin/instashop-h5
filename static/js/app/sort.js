/**
 * Created by sunchengbin on 16/7/28.
 */
require(['lang','lazyload','hbs','text!views/app/sort.hbs','ajax','config','base','common','cart','fastclick'],function(Lang,Lazyload,Hbs,Sort,Ajax,Config,Base,Common,Cart,Fastclick) {
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
                _this.changeTime();
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
                            last_id : _last_id
                        }
                    };
                $(document).on('scroll', function(e) {
                    var _st = $('body').scrollTop(),
                        _wh = $(window).height(),
                        _bh = $(document).height();
                    if ((_st + _wh > _bh - 200) && getData) {
                        getData = false;
                        Ajax.getJsonp(Config.host.actionUrl+Config.actions.shopList+init_data.tag.seller_id+'/items?param='+JSON.stringify(reqData),function(obj){
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
                                        $('.j_item_list').append(_this.addItem(_list_data.item));
                                    }
                                    if($('[data-time]').length){
                                        _this.changeTime();
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
                var _time = _this.discountTime(items[i].discount.now_time,items[i].discount.end_time),
                    _url = Base.others.isCustomHost()?Config.host.host+items[i].id:Config.host.host+'detail/'+items[i].id;
                out += '<li><a class="item-info j_item_info" data-url="'+(_url+(_webplog?'?webpLog=1':''))+'" href="javascript:;">'
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
                if(items[i].price < 0){
                    out +='<p class="price"></p>';
                }else{
                    out +='<p class="price '+(items[i].is_discount?'cost-price':'')+'">Rp '+Base.others.priceFormat(items[i].price)+'</p>';
                }
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


                out +='</a></li>';
            }
            return out;
        }
    };
    SORT.init();
})