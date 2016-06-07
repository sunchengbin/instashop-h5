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
                out += '<li><a class="item-info" href="'+items[i].h5_url+'">'
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
                out += '<li><a class="item-info" href="'+items[i].h5_url+'">'
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