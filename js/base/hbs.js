define(['handlebars','base','config'], function(HBS,Base,Config) {
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

    HBS.registerHelper('hotItemList', function(items, options) {
        var out = "",
            i = 0;
        for (i; i < items.length;i++) {
            if(items[i].is_top == 1) {
                var _time = discountTime(items[i].discount.now_time,items[i].discount.end_time);
                out += '<li><a class="item-info j_item_info" data-url="'+(Config.host.host+'detail/'+items[i].id)+'" href="javascript:;">'
                    +'<div class="lazy" data-img="'+items[i].img+'">';

                if(items[i].is_discount){
                    out +='<span>-'+items[i].discount.value+'%</span>';
                    if(items[i].discounting){
                        out +='<p><i class="icon iconfont">&#xe68e;</i>Time left:<span data-time="'+_time.second+'">'+_time.time+'</span></p>';
                    }else{
                        out +='<p>限时折扣</p>';
                    }
                }

                out +='</div>'
                    +'<p class="title">'+items[i].item_comment+'</p>';
                if(!items[i].is_discount){
                    out +='<p class="discount-price"></p>';
                }else{
                    out +='<p class="discount-price">RP '+Base.others.priceFormat(items[i].discount.price)+'</p>';
                }
                if(items[i].price < 0){
                    out +='<p class="price"></p>';
                }else{
                    out +='<p class="price '+(items[i].is_discount?'cost-price':'')+'">RP '+Base.others.priceFormat(items[i].price)+'</p>';
                }
                out +='</a></li>';
            }
        }
        return out;
    });

    function discountTime(nowTime,endTime){
        var _nt = Number((new Date(nowTime)).getTime()),
            _et = Number((new Date(endTime)).getTime()),
            _send = (_et - _nt)/1000,
            _hour = (_send - _send % 3600)/3600,
            _second = (_send - _hour*3600)%60,
            _minute = (_send - _hour*3600 - _second)/60;
        return {
            time : (_hour+':'+_minute+':'+_second),
            second : _send
        };
    };

    HBS.registerHelper('itemList', function(items, options) {
        var out = "",
            i = 0;
        for (i; i < items.length;i++) {
            if(items[i].is_top == 0){
                var _time = discountTime(items[i].discount.now_time,items[i].discount.end_time);
                out += '<li><a class="item-info j_item_info" data-url="'+(Config.host.host+'detail/'+items[i].id)+'" href="javascript:;">'
                    +'<div class="lazy" data-img="'+items[i].img+'">';

                if(items[i].is_discount){
                    out +='<span>-'+items[i].discount.value+'%</span>';
                    if(items[i].discounting){
                        out +='<p><i class="icon iconfont">&#xe68e;</i>Time left:<span data-time="'+_time.second+'">'+_time.time+'</span></p>';
                    }else{
                        out +='<p>限时折扣</p>';
                    }
                }
                out +='</div>'
                    +'<p class="title">'+items[i].item_comment+'</p>';
                if(!items[i].is_discount){
                    out +='<p class="discount-price"></p>';
                }else{
                    out +='<p class="discount-price">RP '+Base.others.priceFormat(items[i].discount.price)+'</p>';
                }
                if(items[i].price < 0){
                    out +='<p class="price"></p>';
                }else{
                    out +='<p class="price '+(items[i].is_discount?'cost-price':'')+'">RP '+Base.others.priceFormat(items[i].price)+'</p>';
                }
                out +='</a></li>';
            }
        }
        return out;
    });

    HBS.registerHelper('transprice', function(price) {
        return Base.others.priceFormat(price);
    });

    HBS.registerHelper('itemprice', function(data) {

        if(data.sku && data.sku.length < 2){
            return Base.others.priceFormat(data.price);
        }
        else{
            var sku_price = [];
            Base.others.each(data.sku,function(item,i){
                sku_price.push(Number(item.price));
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
                _htm += '<li class="j_type_li" data-price="'+item.price+'" data-stock="'+item.stock+'" data-id="'+item.id+'">'+item.title+'</li>';
            });
        }
        return _htm;
    });

    HBS.registerHelper('itemimgs', function(imgs) {
        var _htm = '';
        if(imgs && imgs.length){
            Base.others.each(imgs,function(item,i){
                _htm += '<li class=""><img src="'+item+'"/></li>';
            });
        }else{
            _htm += '<li class=""><img src="'+item+'"/></li>';
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
                    +(carts[item].sku?'<p class="type">'+carts[item].sku.title+'</p>':'')
                    +'<p class="num">数量:'+carts[item].num+'</p>';
                    if(!carts[item].item.is_discount){
                        _htm +='<p class="price">RP '+carts[item].price+'</p>';
                    }else{
                        _htm +='<p class="price">RP '+(carts[item].item.discount.price)+'</p>'
                    }
                _htm +='</div>'
                    +'</li>';
            }
        }else{
            _htm = '<li class="empty-cart">购物车为空</li>'
        }
        return _htm;
    });

    HBS.registerHelper('cartsconfirm', function(carts) {
        var _htm = '';
        if(!Base.others.testObject(carts)){
            for(var item in carts){
                var _id = (carts[item].sku?carts[item].sku.id:carts[item].item.id);
                _htm += '<li class="clearfix cart-item j_cart_item" data-id="'+_id+'">'
                    +'<i class="icon iconfont j_del_cart" data-id="'+_id+'">&#xe646;</i>'
                    +'<img src="'+carts[item].item.img+'">'
                    +'<div class="">'
                    +'<p class="name">'+carts[item].item.item_name+'</p>'
                    +(carts[item].sku?'<p class="type">'+carts[item].sku.title+'</p>':'')
                    +'<p class="num">数量:'+carts[item].num+'</p>';
                if(!carts[item].item.is_discount){
                    _htm +='<p class="price">RP '+carts[item].price+'</p>';
                }else{
                    _htm +='<p class="price">RP '+(carts[item].item.discount.price)+'</p>'
                }
                _htm +='</div>'
                    +'</li>';
            }
        }else{
            _htm = '<li class="empty-cart">购物车为空</li>'
        }
        return _htm;
    });

    HBS.registerHelper('logistics', function(data) {
        var _htm = '';
        for(var item in data){
            for(var i in data[item]){
                _htm += '<li class="j_logistics_li"  data-level="'+data[item][i].level+'" data-id="'+data[item][i].id+'">'
                    +'<i class="icon iconfont check-btn" data-company="'+item+'" data-price="'+data[item][i].price+'"  data-level="'+data[item][i].level+'" data-id="'+data[item][i].id+'"></i>'
                    +data[item][i].level+'('+data[item][i].cost_days+')'+':RP '+data[item][i].price
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

    return HBS;
});