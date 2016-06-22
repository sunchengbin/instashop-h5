define(['handlebars','base','config','lang'], function(HBS,Base,Config,Lang) {
    function isEmpty(val) {
        var x = false;
        switch (typeof val) {
            case 'string':
                x = val == '';
                break;

            case 'object':
                if (val instanceof Array) {
                    x = val.length == 0;
                } else if (val == null) {
                    x = true;
                } else {
                    x = Object.keys(val).length == 0;
                }
                break;

            case 'undefined':
                x = true;
                break;

            default:
                x = false;
        }
        return x;
    }

    HBS.registerHelper('replace', function(str, a, b, options) {
        var r = new RegExp(a, 'gi');
        return str.replace(r, b);
    });

    HBS.registerHelper('encode', function(str, options) {
        return encodeURIComponent(str);
    });

    HBS.registerHelper('decode', function(str, options) {
        return decodeURIComponent(str);
    });

    // 相等
    HBS.registerHelper('eq', function(a, b, options) {
        if (a == b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 不相等
    HBS.registerHelper('neq', function(a, b, options) {
        if (a != b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 大于
    HBS.registerHelper('gt', function(a, b, options) {
        if (a > b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 小于
    HBS.registerHelper('lt', function(a, b, options) {
        if (a > b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 大于等于
    HBS.registerHelper('egt', function(a, b, options) {
        if (a >= b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 小于
    HBS.registerHelper('elt', function(a, b, options) {
        if (a >= b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 不为空
    HBS.registerHelper('nempty', function(n, options) {
        if (!isEmpty(n)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 为空
    HBS.registerHelper('empty', function(n, options) {
        if (isEmpty(n)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // price<0
    HBS.registerHelper('noprice', function(price) {
        if(price < 0){
            return '';
        }
        else{
            return '<p class="price">Rp '+Base.others.priceFormat(price)+'</p>';
        }
    });

    //翻译
    HBS.registerHelper('lang', function(prem) {
        return Lang[prem];
    });

    HBS.registerHelper('hotItemList', function(items, options) {
        var out = "",
            i = 0;
        for (i; i < items.length;i++) {
            if(items[i].is_top == 1) {
                var _time = discountTime(items[i].discount.now_time,items[i].discount.end_time);
                out += '<li><a class="item-info j_item_info" data-url="'+(Config.host.host+'detail/'+items[i].id)+'" href="javascript:;">'
                    +'<div class="lazy" data-img="'+Base.others.cutImg(items[i].img,160)+'">';

                if(items[i].is_discount){
                    out +='<span>-'+items[i].discount.value+'%</span>';
                    if(items[i].discounting){
                        out +='<p><i class="icon iconfont">&#xe68e;</i><span data-time="'+_time.second+'">'+_time.time+'</span></p>';
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
                        out +='<p class="discount-price">Rp '+Base.others.priceFormat(items[i].price)+'</p>';
                    }

                }
                if(items[i].price < 0){
                    out +='<p class="price"></p>';
                }else{
                    out +='<p class="price '+(items[i].is_discount?'cost-price':'')+'">Rp '+Base.others.priceFormat(items[i].price)+'</p>';
                }
                out +='</a></li>';
            }
        }
        return out;
    });

    function discountTime(nowTime,endTime){
        var _nt = datetime_to_unix(nowTime),
            _et = datetime_to_unix(endTime),
            _send = (_et - _nt + 3600000)/1000,
            _hour = ''+(_send - _send % 3600)/3600,
            _second = ''+(_send - _hour*3600)%60,
            _minute = ''+(_send - _hour*3600 - _second)/60;
        return {
            time : ((_hour.length<2?'0'+_hour:_hour)+':'+(_minute.length<2?'0'+_minute:_minute)+':'+(_second.length<2?'0'+_second:_second)),
            second : _send
        };
    };
    function datetime_to_unix(datetime){
        var tmp_datetime = datetime.replace(/:/g,'-');
        tmp_datetime = tmp_datetime.replace(/ /g,'-');
        var arr = tmp_datetime.split("-");
        var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
        return parseInt(now.getTime());
    };

    HBS.registerHelper('itemList', function(items, options) {
        var out = "",
            i = 0;
        for (i; i < items.length;i++) {
            if(items[i].is_top == 0){
                var _time = discountTime(items[i].discount.now_time,items[i].discount.end_time);
                out += '<li><a class="item-info j_item_info" data-url="'+(Config.host.host+'detail/'+items[i].id)+'" href="javascript:;">'
                    +'<div class="lazy" data-img="'+Base.others.cutImg(items[i].img,160)+'">';

                if(items[i].is_discount){
                    out +='<span>-'+items[i].discount.value+'%</span>';
                    if(items[i].discounting){
                        out +='<p><i class="icon iconfont">&#xe68e;</i><span data-time="'+_time.second+'">'+_time.time+'</span></p>';
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
                        out +='<p class="discount-price">Rp '+Base.others.priceFormat(items[i].price)+'</p>';
                    }
                }
                if(items[i].price < 0){
                    out +='<p class="price"></p>';
                }else{
                    out +='<p class="price '+(items[i].is_discount?'cost-price':'')+'">Rp '+Base.others.priceFormat(items[i].price)+'</p>';
                }
                out +='</a></li>';
            }
        }
        return out;
    });

    HBS.registerHelper('transprice', function(price) {
        if(price < 0){
            return '';
        }
        return Base.others.priceFormat(price);
    });

    HBS.registerHelper('itemprice', function(data) {
        if(data.is_discount){
            if(data.discount.price > 0){
                if(data.discounting){
                    return Base.others.priceFormat(data.discount.price);
                }else{
                    return Base.others.priceFormat(data.price);
                }
            }
            return '';
        }
        if(data.sku && data.sku.length < 2){
            if(data.price > 0){
                return Base.others.priceFormat(data.price);
            }
            return '';
        }
        else{
            var sku_price = [];
            Base.others.each(data.sku,function(item,i){
                if(Number(item.price) > 0){
                    sku_price.push(Number(item.price));
                }
            });
            sku_price.sort(function(a,b){
                return a - b;
            });
            if(sku_price[0] != sku_price[(sku_price.length-1)]){
                return Base.others.priceFormat(sku_price[0])+'-'+Base.others.priceFormat(sku_price[(sku_price.length-1)]);
            }else{
                return Base.others.priceFormat(sku_price[0]);
            }

        }
    });

    HBS.registerHelper('itemtype', function(data) {
        var _htm = '';
        if(data.sku && data.sku.length){
            Base.others.each(data.sku,function(item,i){
                _htm += '<li class="j_type_li" data-price="'+(data.is_discount&&data.discounting?data.discount.price:item.price)+'" data-stock="'+item.stock+'" data-id="'+item.id+'">'+item.title+'</li>';
            });
        }
        return _htm;
    });

    HBS.registerHelper('itemimgs', function(imgs) {
        var _htm = '';
        if(imgs && imgs.length){
            Base.others.each(imgs,function(item,i){
                _htm += '<li class=""><img data-img="'+Base.others.cutImg(item)+'" src=""/></li>';
            });
        }else{
            _htm += '<li class=""><img data-img="'+Base.others.cutImg(item)+'" src=""/></li>';
        }
        return _htm;
    });

    HBS.registerHelper('carts', function(carts) {
        var _htm = '';
        if(!Base.others.testObject(carts)){
            for(var item in carts){
                var _id = (carts[item].sku?carts[item].sku.id:carts[item].item.id);
                _htm += '<li class="clearfix cart-item j_cart_item" data-id="'+_id+'">'
                    +'<i class="icon iconfont j_del_cart" data-id="'+_id+'">&#xe646;</i>'
                    +'<img src="'+carts[item].item.img+'">'
                    +'<div class="">'
                    +'<p class="name">'+carts[item].item.item_name+'</p>'
                    +(carts[item].sku?'<p class="type">'+Lang.H5_SKU+':'+carts[item].sku.title+'</p>':'')
                    +'<p class="num">'+Lang.H5_QUANTITY+':'+carts[item].num+'</p>';
                    if(carts[item].item.is_discount && carts[item].item.discounting){
                        _htm +='<p class="price">'+Lang.H5_PRICE+':Rp '+Base.others.priceFormat(carts[item].item.discount.price)+'</p>';
                    }else{
                        _htm +='<p class="price">'+Lang.H5_PRICE+':Rp '+Base.others.priceFormat(carts[item].price)+'</p>';

                    }
                _htm +='</div>'
                    +'</li>';
            }
        }else{
            _htm = '<li class="empty-cart">'+Lang.H5_SHOPING_NO_GOODS+'</li>'
        }
        return _htm;
    });

    HBS.registerHelper('cartsconfirm', function(carts) {
        var _htm = '';
        if(!Base.others.testObject(carts)){
            for(var item in carts){
                var _id = (carts[item].sku?carts[item].sku.id:carts[item].item.id);
                _htm += '<li class="clearfix cart-item j_cart_item" data-itemid="'+carts[item].item.id+'" data-id="'+_id+'">'
                    //+'<i class="icon iconfont" data-id="'+_id+'">&#xe63e;</i>'
                    +'<img src="'+carts[item].item.img+'">'
                    +'<div class="">'
                    +'<p class="name">'+carts[item].item.item_name+'</p>'
                    +(carts[item].sku?'<p class="type">'+Lang.H5_SKU+':'+carts[item].sku.title+'</p>':'')
                    +'<p class="num">'+Lang.H5_QUANTITY+':'+carts[item].num+'</p>';
                if(carts[item].item.is_discount && carts[item].item.discounting){
                    _htm +='<p class="price">'+Lang.H5_PRICE+':Rp '+Base.others.priceFormat(carts[item].item.discount.price)+'</p>';
                }else{
                    _htm +='<p class="price">'+Lang.H5_PRICE+':Rp '+Base.others.priceFormat(carts[item].price)+'</p>';

                }
                _htm +='</div>'
                    +'</li>';
            }
        }else{
            _htm = '<li class="empty-cart">'+Lang.H5_SHOPING_NO_GOODS+'</li>'
        }
        return _htm;
    });

    HBS.registerHelper('logistics', function(data) {
        var _htm = '';
        for(var item in data){
            for(var i in data[item]){
                _htm += '<li class="j_logistics_li"  data-level="'+data[item][i].level+'" data-id="'+data[item][i].id+'">'
                    +'<i class="icon iconfont check-btn" data-company="'+item+'" data-price="'+data[item][i].price+'"  data-level="'+data[item][i].level+'" data-id="'+data[item][i].id+'"></i>'
                    +data[item][i].level+'('+data[item][i].cost_days+')'+':Rp '+Base.others.priceFormat(data[item][i].price)
                    +'</li>';
            }
        }
        return _htm;
    });
    HBS.registerHelper('logisticsday', function(date) {
        var _htm = '',
            _date = new Date(date);
        _htm += '<p>'+(_date.getFullYear())+'.'+(_date.getMonth()+1)+'.'+_date.getDate()+'</p>';
        _htm += '<p>'+(_date.getHours())+'.'+(_date.getMinutes())+'</p>';
        return _htm;
    });
    HBS.registerHelper('logisticsstate', function(state) {
        var _htm = '';
        if(state != 'InTransit'){
            _htm +=  '<span></span>';
        }else{
            _htm +=  '<i class="icon iconfont checked-btn"></i>';
        }
        return _htm;
    });
    function transTxt(str){
        var reg=new RegExp("\n","g");
        str= str.replace(reg,"<br>");
        return str;
    }
    HBS.registerHelper('transtxt', function(txt) {
        return transTxt(txt);
    });
    function transDate(datetime){
        var tmp_datetime = datetime.replace(/:/g,'-');
        tmp_datetime = tmp_datetime.replace(/ /g,'-');
        var arr = tmp_datetime.split("-");
        return arr[2]+'/'+arr[1]+' '+arr[3]+'.'+arr[4];
    };
    HBS.registerHelper('transdate', function(time) {
        return transDate(time);
    });
    HBS.registerHelper('transimgurl', function(url) {
        return Base.others.cutImg(url);
    });
    HBS.registerHelper('transpricevalue', function(price) {
        return Number(price)<0?-Number(price):price;
    });
    return HBS;
});