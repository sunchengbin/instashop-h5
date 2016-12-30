define(['handlebars', 'base', 'config', 'lang', 'item'], function (HBS, Base, Config, Lang, Item) {
    function isEmpty(val) {
        var x = false;
        switch (typeof val) {
            case 'string':
                x = $.trim(val) == '';
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

    HBS.registerHelper('replace', function (str, a, b, options) {
        var r = new RegExp(a, 'gi');
        return str.replace(r, b);
    });

    HBS.registerHelper('encode', function (str, options) {
        return encodeURIComponent(str);
    });

    HBS.registerHelper('decode', function (str, options) {
        return decodeURIComponent(str);
    });

    // 相等
    HBS.registerHelper('eq', function (a, b, options) {
        if (a == b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 不相等
    HBS.registerHelper('neq', function (a, b, options) {
        if (a != b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 大于
    HBS.registerHelper('gt', function (a, b, options) {
        if (a > b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 小于
    HBS.registerHelper('lt', function (a, b, options) {
        if (a > b) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    // 大于等于
    HBS.registerHelper('egt', function (a, b, options) {
        if (a >= b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 小于
    HBS.registerHelper('elt', function (a, b, options) {
        if (a >= b) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    // 不为空
    HBS.registerHelper('nempty', function (n, options) {
        if (!isEmpty(n)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 为空
    HBS.registerHelper('empty', function (n, options) {
        if (isEmpty(n)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // price<0
    HBS.registerHelper('noprice', function (price) {
        if (price < 0) {
            return '';
        } else {
            return '<p class="price">Rp ' + Base.others.priceFormat(price) + '</p>';
        }
    });

    //翻译
    HBS.registerHelper('lang', function (prem) {
        return Lang[prem];
    });
    //是否有推荐
    HBS.registerHelper('havehot', function (items, options) {
        var out = false,
            i = 0;
        for (i; i < items.length; i++) {
            if (items[i].is_top == 1) {
                out = true;
            }
        }
        if (out) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    //是否有热卖
    HBS.registerHelper('haveitem', function (items, options) {
        var out = false,
            i = 0;
        for (i; i < items.length; i++) {
            if (items[i].index_type == 'no_tag') {
                out = true;
            }
        }
        if (out) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    HBS.registerHelper('tagItemList', function (items, options) {
        return Item.addItem(items);
    });

    HBS.registerHelper('transprice', function (price) {
        if (price < 0) {
            return '';
        }
        return Base.others.priceFormat(price);
    });

    HBS.registerHelper('itemprice', function (data) {
        if (data.is_discount) {
            if (data.discount.price > 0) {
                if (data.discounting) {
                    return 'Rp ' + Base.others.priceFormat(data.discount.price);
                } else {
                    return 'Rp ' + Base.others.priceFormat(data.discount.price);
                }
            }
            return '';
        }
        if (data.sku && data.sku.length < 2) {
            if (data.price > 0) {
                return 'Rp ' + Base.others.priceFormat(data.price);
            }
            return '';
        } else {
            var sku_price = [];
            Base.others.each(data.sku, function (item, i) {
                if (Number(item.price) > 0) {
                    sku_price.push(Number(item.price));
                }else{
                    //sku_price.push(0);
                }
            });
            sku_price.sort(function (a, b) {
                return a - b;
            });
            if (sku_price[0] != sku_price[(sku_price.length - 1)]) {
                return 'Rp ' + Base.others.priceFormat(sku_price[0]) + '-' + Base.others.priceFormat(sku_price[(sku_price.length - 1)]);
            } else {
                if (sku_price[0] == 0) {
                    return '';
                } else {
                    return 'Rp ' + Base.others.priceFormat(sku_price[0]);
                }

            }

        }
    });

    HBS.registerHelper('itemtype', function (data) {
        var _htm = '';
        if (data.sku && data.sku.length) {
            Base.others.each(data.sku, function (item, i) {
                //_htm += '<li class="j_type_li '+(item.stock==0?'disable':'')+'" data-price="'+(data.is_discount&&data.discounting?data.discount.price:item.price)+'" data-stock="'+item.stock+'" data-id="'+item.id+'">'+item.title+'</li>';
                _htm += '<li class="j_type_li '+(item.stock==0||item.price<0?'disable':'')+'" data-price="'+(data.is_discount?data.discount.price:item.price)+'" data-stock="'+item.stock+'" data-id="'+item.id+'">'+item.title+'</li>';
            });
        }
        return _htm;
    });

    HBS.registerHelper('itemimgs', function (imgs) {
        var _htm = '';
        if (imgs && imgs.length) {
            Base.others.each(imgs, function (item, i) {
                _htm += '<li class="" data-src="' + getViewerUrl(item) + '"><img data-img="' + Base.others.cutImg(item) + '" src=""/></li>';
            });
        } else {
            _htm += '<li class="" data-src="' + getViewerUrl(item) + '"><img data-img="' + Base.others.cutImg(item) + '" src=""/></li>';
        }
        return _htm;
    });

    function getViewerUrl(url) {
        return url.split('?')[0];
    }

    function assembleCartItem(carts,groupid) {
        var _htm = "";
        for (var item in carts) {
            var _id = (carts[item].sku ? carts[item].sku.id : carts[item].item.id);
            _htm += '<li class="clearfix cart-item j_cart_item" data-id="' + _id + '">' +
                '<i class="icon iconfont j_del_cart icon-delete-small" group-id="'+groupid+'" data-id="' + _id + '"></i>' +
                '<img src="' + carts[item].item.img + '">' +
                '<div class="">' +
                '<p class="name">' + carts[item].item.item_name + '</p>' +
                (carts[item].sku ? '<p class="type">' + Lang.H5_SKU + ': ' + carts[item].sku.title + '</p>' : '') +
                '<p class="num">' + Lang.H5_QUANTITY + ': ' + carts[item].num + '</p>';
            if (carts[item].item.is_discount && carts[item].item.discounting) {
                _htm += '<p class="price">' + Lang.H5_PRICE + ': Rp ' + Base.others.priceFormat(carts[item].item.discount.price) + '</p>';
            } else {
                var _price = (carts[item].sku && carts[item].sku.id) ? carts[item].sku.price : carts[item].item.price;
                if (_price >= 0) {
                    _htm += '<p class="price">' + Lang.H5_PRICE + ': Rp ' + Base.others.priceFormat(_price) + '</p>';
                }
            }
            _htm += '</div>' +
                '</li>';
        }
        console.log("判断按钮")
        console.log(carts)
        if(carts){
            _htm +='<button class="btn j_submit_btn confirm-btn" group-id="'+groupid+'">'+Lang.H5_MAKE_ORDER+'</button>'
        }else{
            _htm +='<button class="btn j_go_shop confirm-btn" group-id="'+groupid+'" >'+Lang.H5_BROWSE_SHOP+'</button>'
        }
        return _htm;
    }

    HBS.registerHelper('groupcarts', function (cart) {
        var _htm = '';
        console.log("开始组装groupcarts")
        if (!cart||cart.length==0) {
            _htm += '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>';
            return _htm +='<div class="no_goods_box"><button class="btn j_go_shop confirm-btn">'+Lang.H5_BROWSE_SHOP+'</button></div>'
        }
        if (!Base.others.testObject(cart)) {
            var _curIndex = 1;
            $.each(cart.group, function (key, _groupItem) {
                _htm += '<div class="cart-supplier-card" group-id="'+key+'" >' +
                    '<div class="cart-supplier-header"><i class="iconfont icon-warehourse"></i>仓库' + (_curIndex++) + '</div>' +
                    '<ul>'
                _htm+=assembleCartItem(_groupItem,key)
                _htm+='</ul></div>'
            })
            if(_curIndex==2){
                _htm = _htm.replace("cart-supplier-header","cart-supplier-header hide");
            }
        } else {
            _htm = '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>'
        }
        return _htm;
    });
    HBS.registerHelper('carts', function (cart) {
        var _htm = '';
        console.log("开始组装carts"+cart.length)
        if (!cart||cart.length==0) {
            _htm += '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>';
            return _htm +='<div class="no_goods_box"><button class="btn j_go_shop confirm-btn">'+Lang.H5_BROWSE_SHOP+'</button></div>'
        }
        if (!Base.others.testObject(cart)) {
            _htm = assembleCartItem(cart)
        }else{
            _htm = '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>'
        }
        return _htm;
    })
    HBS.registerHelper('itemlist', function (carts) {
        var _htm = '';
        if (!carts.length) {
            return '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>';
        }
        for (var item in carts) {
            var _item = carts[item],
                _id = (_item.sku?_item.sku.id:_item.id);
            _htm += '<li class="cart-item j_cart_item" data-id="'+_id+'">'
                +'<a class="block clearfix" href="javascript:;">'
                +'<img src="'+Base.others.cutImg(_item.img)+'">';
            _htm +='<div class="item-info-box">'
                +'<p class="name">'+Base.others.transTxt(_item.item_comment)+'</p>';
            if(_item.is_discount && _item.discounting){
                _htm +='<p class="price clearfix"><span class="fr">-'+_item.discount.value+'%</span>'+'Rp '+Base.others.priceFormat(_item.discount.price)+'</p>';
                _htm +='<p class="soon-time">'+transDate(_item.discount.start_time)+'-'+transDate(_item.discount.end_time)+'WIB</p>';
            }else{
                var _price = (_item.sku&&_item.sku.id)?_item.sku.price:_item.price;
                if(_price >= 0){
                    _htm +='<p class="price">Rp '+Base.others.priceFormat(_price)+'</p>';
                }
            }
            _htm += '</div></a>' +
                '</li>';
        }
        return _htm;
    });
    HBS.registerHelper('threeItemList', function (carts) {
        var _htm = '';
        if (!carts.length) {
            return '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li></ul>';
        }
        for (var item in carts) {
            var _item = carts[item];
            _htm += '<li><a class="item-info j_item_info" data-url="' + _item.h5_url + '" href="javascript:;"><div class="lazy" data-img="' + Base.others.cutImg(_item.img) + '">';
            if (_item.is_discount && _item.discounting) {
                _htm += '<span class="">-' + _item.discount.value + '%</span>';
            }
            _htm += '</div></a></li>';
        }
        return _htm;
    });

    function testStock(item) {
        var stock = ((item.sku && item.sku.stock) ? item.sku.stock : item.item.stock);
        return stock >= 9999999;
    }
    HBS.registerHelper('quickcarts', function (carts) {
        var _htm = '';
        if (!carts) {
            return '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>';
        }
        if (!Base.others.testObject(carts)) {
            for (var item in carts) {
                var _id = ((carts[item].sku && carts[item].sku.id) ? carts[item].sku.id : carts[item].item.id);
                _htm += '<li class="clearfix cart-item b-bottom j_cart_item" data-id="' + _id + '">' +
                    '<img src="' + carts[item].item.img + '">' +
                    '<div class="">' +
                    '<p class="name">' + carts[item].item.item_name + '</p>';
                //if(!testStock(carts[item])){
                var _t_stock = (carts[item].sku && carts[item].sku.stock) ? carts[item].sku.stock : carts[item].item.stock;
                _htm += '<p class="num">' + (!testStock(carts[item]) ? Lang.H5_STOCK + ': ' + (_t_stock < 0 ? 0 : _t_stock) : '') + '</p>';
                _htm += '<p class="type">' + (carts[item].sku && carts[item].sku.id ? Lang.H5_SKU + ': ' + carts[item].sku.title : '') + '</p>';
                //}
                if (carts[item].item.is_discount && carts[item].item.discounting) {
                    var _item_stock = carts[item].item.discount.limit_count == 0 ? carts[item].item.stock : carts[item].item.discount.limit_count;
                    var _item_price = carts[item].item.discount.price;
                    _htm += '<div class="price clearfix"><span>' + (_item_price < 0 ? '' : Lang.H5_PRICE + ': Rp ' + Base.others.priceFormat(_item_price)) +
                        '</span><div class="item-num-box clearfix">' +
                        '<span class="j_reduce_btn" data-id="' + _id + '">' +
                        '<i class="icon iconfont icon-minus-font"></i>' +
                        '</span>' +
                        '<input class="fl j_item_num" type="text" data-price="' + carts[item].item.discount.price + '" value="' + carts[item].num + '" readonly="readonly"/>' +
                        '<span class="j_add_btn" data-id="' + _id + '" data-stock="' + _item_stock + '">' +
                        '<i class="icon iconfont icon-add-font"></i>' +
                        '</span>' +
                        '</div>' +
                        '</div>';
                } else {
                    var _price = (carts[item].sku && carts[item].sku.id) ? carts[item].sku.price : carts[item].item.price;
                    _htm += '<div class="price clearfix"><span>' + (_price < 0 ? '' : Lang.H5_PRICE + ': Rp ' + Base.others.priceFormat(_price)) +
                        '</span><div class="item-num-box clearfix">' +
                        '<span class="j_reduce_btn" data-id="' + _id + '" >' +
                        '<i class="icon iconfont icon-minus-font"></i>' +
                        '</span>' +
                        '<input class="fl j_item_num" type="text" data-price="' + _price + '" value="' + carts[item].num + '" readonly="readonly"/>' +
                        '<span class="j_add_btn" data-id="' + _id + '" data-stock="' + (((carts[item].sku && carts[item].sku.stock) ? carts[item].sku.stock : carts[item].item.stock)) + '">' +
                        '<i class="icon iconfont icon-add-font"></i>' +
                        '</span>' +
                        '</div>' +
                        '</div>';
                }
                _htm += '</div>' +
                    '</li>';
            }
        } else {
            _htm = '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>'
        }
        return _htm;
    });

    HBS.registerHelper('cartsconfirm', function (carts) {
        var _htm = '';
        if (!Base.others.testObject(carts)) {
            for (var item in carts) {
                var _id = (carts[item].sku ? carts[item].sku.id : carts[item].item.id);
                _htm += '<li class="clearfix cart-item j_cart_item" data-itemid="' + carts[item].item.id + '" data-id="' + _id + '">'
                    //+'<i class="icon iconfont" data-id="'+_id+'">&#xe63e;</i>'
                    +
                    '<img src="' + carts[item].item.img + '">' +
                    '<div class="">' +
                    '<p class="name">' + carts[item].item.item_name + '</p>' +
                    (carts[item].sku ? '<p class="type">' + Lang.H5_SKU + ': ' + carts[item].sku.title + '</p>' : '') +
                    '<p class="num">' + Lang.H5_QUANTITY + ': ' + carts[item].num + '</p>';
                if (carts[item].item.is_discount && carts[item].item.discounting) {
                    _htm += '<p class="price">' + Lang.H5_PRICE + ': Rp ' + Base.others.priceFormat(carts[item].item.discount.price) + '</p>';
                } else {
                    var _price = (carts[item].sku && carts[item].sku.id) ? carts[item].sku.price : carts[item].item.price;
                    _htm += '<p class="price">' + Lang.H5_PRICE + ': Rp ' + Base.others.priceFormat(_price) + '</p>';

                }
                _htm += '</div>' +
                    '</li>';
            }
        } else {
            _htm = '<li class="empty-cart">' + Lang.H5_SHOPING_NO_GOODS + '</li>'
        }
        return _htm;
    });

    HBS.registerHelper('logistics', function (data) {
        var _htm = '';
        for (var item in data) {
            if (data[item].length > 0) {
                _htm += '<ul class="logistics-list">';
                for (var i in data[item]) {
                    var _cost_day = data[item][i].cost_days ? '(' + data[item][i].cost_days + Lang.H5_DAYS + ')' : '';
                    _htm += '<li class="j_logistics_li" data-company="' + item + '"  data-level="' + (data[item][i].level ? data[item][i].level : '') + '" data-id="' + data[item][i].id + '">' +
                        '<i class="icon iconfont check-btn icon-radio-font" data-company="' + item + '" data-price="' + data[item][i].price + '"  data-level="' + (data[item][i].level ? data[item][i].level : '') + '" data-id="' + data[item][i].id + '"></i>' +
                        item + (data[item][i].level || _cost_day ? ' ' : '') + data[item][i].level + _cost_day + ': Rp ' + Base.others.priceFormat(data[item][i].price) +
                        '</li>';
                }
                _htm += '</ul>';
            }
        }
        return _htm;
    });
    HBS.registerHelper('logisticsday', function (date) {
        var _htm = '',
            _date = new Date(date);
        _htm += '<p>' + (_date.getFullYear()) + '.' + (_date.getMonth() + 1) + '.' + _date.getDate() + '</p>';
        _htm += '<p>' + (_date.getHours()) + '.' + (_date.getMinutes()) + '</p>';
        return _htm;
    });
    HBS.registerHelper('logisticsstate', function (state) {
        var _htm = '';
        if (state != 'InTransit') {
            _htm += '<span></span>';
        } else {
            _htm += '<i class="icon iconfont checked-btn"></i>';
        }
        return _htm;
    });

    function transTxt(str) {
        var reg = new RegExp("\n", "g");
        str = str.replace(reg, "<br>");
        return str;
    }
    HBS.registerHelper('transtxt', function (txt) {
        return transTxt(txt);
    });

    function transDate(datetime) {
        var tmp_datetime = datetime.replace(/:/g, '-');
        tmp_datetime = tmp_datetime.replace(/ /g, '-');
        var arr = tmp_datetime.split("-");
        return arr[2] + '/' + arr[1] + ' ' + arr[3] + '.' + arr[4];
    };
    HBS.registerHelper('transdate', function (time) {
        return transDate(time);
    });
    HBS.registerHelper('transimgurl', function (url) {
        return Base.others.cutImg(url);
    });
    HBS.registerHelper('transbannerimgurl', function (url) {
        return url.replace(/http\:/, 'https:');
    });
    HBS.registerHelper('transshopbgimgurl', function (url) {
        return Base.others.cutImg(url, null, 'bg');
    });
    HBS.registerHelper('transpricevalue', function (price) {
        return Number(price) < 0 ? -Number(price) : price;
    });
    //价格转换
    HBS.registerHelper('transpriceval', function (price) {
        if (price == undefined || price < 0 || price == '' || price == 0) {
            return '';
        }
        return 'Rp ' + Base.others.priceFormat(price);
    });
    //自定义域名
    HBS.registerHelper('iscustomhost', function () {
        return Base.others.isCustomHost();
    });
    //截取lineurl
    HBS.registerHelper('translineurl', function (url) {
        return url.split('http://')[1];
    });
    return HBS;
});