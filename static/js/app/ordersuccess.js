/**
 * Created by sunchengbin on 16/7/19.
 */
/**
 * Created by sunchengbin on 16/6/6.
 */
require(['lang','hbs','text!views/app/ordersuccess.hbs','config','fastclick'],function(Lang,Hbs,OrderSuccess,Config,Fastclick){
    var I = {
        init : function(){
            var price = localStorage.getItem('OrderTotal'),
                totalPrice = priceFormat(price),
                linkPrice = getUrlPrem('price',location.href),
                OrderInfo = JSON.parse(localStorage.getItem('OrderInfo')),
                banksInfo = JSON.parse(localStorage.getItem('BankInfo'));
            if(linkPrice){totalPrice = priceFormat(linkPrice);}
            var IndexHtm = '<div>加载数据中</div>';
            IndexHtm= Hbs.compile(OrderSuccess)({
                totalPrice : totalPrice,
                banksInfo : banksInfo,
                lang : Lang,
                host : Config.host,
                num : banksInfo,
                orderUrl : OrderInfo.url,
                shopUrl : Config.host.host+'/s/'+OrderInfo.shop_info.id,
            });
            $('body').prepend(IndexHtm);
            this.handleFn();
        },
        countBankNum : function(banks){
            var _num = 0;
            for(var bank in banks){
                if(banks[bank] == 1){
                    _num++;
                }
            }
            return _num;
        },
        handleFn : function(){
            Fastclick.attach(document.body);
            var data = JSON.parse(localStorage.getItem('ShopData')),
                from = getUrlPrem('detail',location.href),
                _this =this;
            document.querySelector('.j_go_back').addEventListener('click',function(){
                if(!from){
                    location.href = '/s/'+data.ShopInfo.id;
                }else{
                    history.back();
                }
            });
            $('body').on('click','.j_tag_li',function(){
                var _dom = $(this),
                    _tag_name = _dom.attr('data-tag');
                if(!_dom.is('.act')){
                    $('.j_tag_li').removeClass('act');
                    _dom.addClass('act');
                    $('.j_tag').addClass('hide');
                    $('.j_tag_'+_tag_name).removeClass('hide');
                }

            });
        }
    };
    I.init();

    function priceFormat( price ) {
        // e.g. 100.00 => 100
        // e.g 1000.00 => 1.000
        // 去掉 "." 后面的所有数字，然后每隔 3 个数加一个点
        var price, result = [];
        price = '' + price;
        price = price.split( '.' )[ 0 ];
        price = price.split( '' ).reverse();
        for( var num = 0;num < price.length;num++) {
            if( num && ( num % 3 === 0 ) ) {
                result.push( '.' )
            }
            result.push( price[num] )
        }
        result = result.reverse().join( '' );
        return result;
    };
    function getUrlPrem(key,url){
        var _search = url || document.location.search,
            _pattern = new RegExp("[?&]" + key + "\=([^&]+)", "g"),
            _matcher = _pattern.exec(_search),
            _items = null;
        if (null != _matcher) {
            try {
                _items = decodeURIComponent(decodeURIComponent(_matcher[1]));
            } catch (e) {
                try {
                    _items = decodeURIComponent(_matcher[1]);
                } catch (e) {
                    _items = _matcher[1];
                }
            }
        }
        return _items;
    }
})