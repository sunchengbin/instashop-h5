/**
 * Created by sunchengbin on 2016/10/31.
 * 商品列表相关
 */
define(['base','config','lang'],function(Base,Config,Lang){
    var ITEM = {
        addItem : function(items,type){
            var out = "",
                _this = this,
                i = 0;
            for (i; i < items.length;i++) {
                if(type == 3){
                    out += _this.threeList(items[i]);
                }else{
                    out += _this.twoList(items[i]);
                }
            }
            return out;
        },
        threeList : function(item){
           var _htm = '<li><a class="item-info j_item_info" data-url="'+item.h5_url+'" href="javascript:;"><div class="lazy" data-img="'+Base.others.cutImg(item.img)+'">';
                if(item.is_discount && item.discounting){
                    _htm +='<span class="">-'+item.discount.value+'%</span>';
                }
            _htm+='</div></a></li>';
            return _htm;
        },
        twoList : function(item){
            var _this = this,
                _webplog = Base.others.webpLog(),
                out = '';
            var _time = _this.discountTime(item.discount.now_time,item.discount.end_time),
                _url = Base.others.isCustomHost()?Config.host.host+item.id:Config.host.host+'detail/'+item.id;
            out += '<li><a class="item-info j_item_info" data-url="'+_url+'" href="javascript:;">'
                +'<div class="lazy" data-img="'+Base.others.cutImg(item.img)+'">';
            if(item.is_discount){
                out +='<span>-'+item.discount.value+'%</span>';
                if(item.discounting){
                    out +='<p><i class="icon iconfont icon-time-font"></i><span data-time="'+_time.second+'">'+_time.time+'</span></p>';
                }else{
                    out +='<p>'+Lang.H5_IS_ABOUT_TO_BEGIN+'</p>';
                }
            }
            out +='</div>'
                +'<p class="title">'+Base.others.transTxt(item.item_comment)+'</p>';
            if(item.price < 0){
                out +='<p class="price"></p>';
            }else{
                out +='<p class="price '+(item.is_discount?'cost-price':'')+'">Rp '+Base.others.priceFormat(item.price)+'</p>';
            }
            if(!item.is_discount){
                out +='<p class="discount-price"></p>';
            }else{
                if(item.discounting){
                    out +='<p class="discount-price">Rp '+Base.others.priceFormat(item.discount.price)+'</p>';
                }else{
                    out +='<p class="discount-price">Rp '+Base.others.priceFormat(item.discount.price)+'</p>';
                }
            }
            out +='</a></li>';
            return out;
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
                    time : '00:00:00',
                    second : _send
                };
            }
            return {
                time : ((_hour.length<2?'0'+_hour:_hour)+':'+(_minute.length<2?'0'+_minute:_minute)+':'+(_second.length<2?'0'+_second:_second)),
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
                setTimeout(setTime,1000);
                function setTime(){
                    --_second;
                    $(item).attr('data-time',_second).html(_this.countTime(_second));
                    setTimeout(arguments.callee,1000);
                }
            });
        }
    };
    return ITEM;
})
