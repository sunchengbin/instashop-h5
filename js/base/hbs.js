define(['handlebars','base'], function(HBS,Base) {
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
                out += '<li><a class="item-info j_item_info" data-url="'+items[i].h5_url+'" href="javascript:;">'
                    +'<div class="lazy" data-img="'+items[i].img+'"></div>'
                    +'<p class="title">'+items[i].item_comment+'</p>';
                if(Base.others.priceFormat(items[i].price) < 0){
                    out +='<p class="price"></p>';
                }else{
                    out +='<p class="price">RP '+Base.others.priceFormat(items[i].price)+'</p>';
                }
                out +='</a></li>';
            }
        }
        return out;
    });

    HBS.registerHelper('itemList', function(items, options) {
        var out = "",
            i = 0;
        for (i; i < items.length;i++) {
            if(items[i].is_top == 0){
                out += '<li><a class="item-info j_item_info" data-url="'+items[i].h5_url+'" href="javascript:;">'
                    +'<div class="lazy" data-img="'+items[i].img+'"></div>'
                    +'<p class="title">'+items[i].item_comment+'</p>';
                if(Base.others.priceFormat(items[i].price) < 0){
                    out +='<p class="price"></p>';
                }else{
                    out +='<p class="price">RP '+Base.others.priceFormat(items[i].price)+'</p>';
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
                _htm += '<li class="j_type_li" data-stock="'+item.stock+'" data-id="'+item.id+'">'+item.title+'</li>';
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

    return HBS;
});