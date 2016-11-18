/**
 * Created by sunchengbin on 16/7/19.
 */
/**
 * Created by sunchengbin on 16/6/6.
 */
require(['lang','hbs','text!views/app/ordersuccess.hbs','config','fastclick','common','base'],function(Lang,Hbs,OrderSuccess,Config,Fastclick,Common,Base){
    var I = {
        init : function(){
            var IndexHtm = '<div>'+Lang.H5_LOADING+'</div>';
            try
            {
                var _this = this,
                    price = localStorage.getItem('OrderTotal'),
                    totalPrice = priceFormat(price),
                    linkPrice = getUrlPrem('price',location.href),
                    OrderInfo = JSON.parse(localStorage.getItem('OrderInfo')),
                    banksInfo = JSON.parse(localStorage.getItem('BankInfo')),
                    _detail = getUrlPrem('detail',location.href),
                    _url = Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/',
                    _o_url = OrderInfo?Config.host.host+'o/'+OrderInfo.id_hash:null,
                    _prompt = '';
                if(_detail){
                    var _order_url = _detail==1?Common.replaceUrlPrompt(_o_url):Config.host.host+'o/'+getUrlPrem('order_id'),
                        shopUrl = _detail==1?(Base.others.isCustomHost()?_url:_url+OrderInfo.shop_info.id):(Base.others.isCustomHost()?_url:_url+getUrlPrem('shop_id'));
                }else{
                    var _order_url = Common.replaceUrlPrompt(_o_url),
                        shopUrl = Base.others.isCustomHost()?_url:_url+OrderInfo.shop_info.id;
                }

                if(linkPrice){totalPrice = priceFormat(linkPrice);}
                if(_detail && _detail==2){
                    _prompt = {
                        buyerName : getUrlPrem('bname',location.href),
                        buyerPhone : getUrlPrem('bphone',location.href),
                        sellerName : getUrlPrem('sname',location.href),
                        cancelTime : getUrlPrem('time',location.href)
                    }
                }else{
                    _prompt = {
                        cancelTime : getUrlPrem('time',location.href)
                    }
                }
                IndexHtm= Hbs.compile(OrderSuccess)({
                    totalPrice : totalPrice,
                    shopInfo : OrderInfo.shop_info,
                    banksInfo : banksInfo,
                    prompt : _prompt,
                    lang : Lang,
                    host : Config.host,
                    num : _this.countBankNum(banksInfo),
                    orderUrl : _order_url,
                    shopUrl : shopUrl,
                    detail:_detail
                });
            }
            catch(error){
                console.log(error);
                IndexHtm = '<section class="item-out-stock">'
                    +'<i class="icon iconfont icon-error-font"></i>'
                    +'<p>'+Lang.H5_ERROR+'</p>'
                    +'<p><a href="javascript:location.reload();" class="btn confirm-btn b-btn">'+Lang.H5_FRESHEN+'</a></p>'
                    +'</section>';
                //IndexHtm = '<div>'+Lang.H5_ERROR+'</div>';
            }
            $('body').prepend(IndexHtm);
            this.handleFn();
        },
        countBankNum : function(banks){
            var _num = 0;
            for(var bank in banks){
                if(banks[bank] == 1){
                    ++_num;
                }
            }
            return _num;
        },
        handleFn : function(){
            Fastclick.attach(document.body);
            var data = JSON.parse(localStorage.getItem('ShopData')),
                from = getUrlPrem('detail',location.href),
                _this =this;
            if(document.querySelector('.j_go_back')){
                document.querySelector('.j_go_back').addEventListener('click',function(){
                    if(!from){
                        var _url = Base.others.isCustomHost()?Config.host.host:Config.host.host+'s/'+data.ShopInfo.id;
                        location.href = _url;
                    }else{
                        history.back();
                    }
                });
            }
            $('body').on('click','.j_tag_li',function(){
                var _dom = $(this),
                    _tag_name = _dom.attr('data-tag'),
                    _banksInfo = JSON.parse(localStorage.getItem('BankInfo')),
                    _num = _this.countBankNum(_banksInfo);
                if(_num == 3){
                    if(_tag_name == 'mandiri'){
                        $('.pay-info ul').addClass('three_info_center');
                        $('.pay-info ul').removeClass('three_info_last');
                    }else{
                        if(_tag_name == 'bri'){
                            $('.pay-info ul').addClass('three_info_last');
                        }else{
                            $('.pay-info ul').removeClass('three_info_center');
                        }

                    }
                }
                if(!_dom.is('.act')){
                    $('.j_tag_li').removeClass('act');
                    _dom.addClass('act');
                    $('.j_tag').addClass('hide');
                    $('.j_tag_'+_tag_name).removeClass('hide');
                    $('.j_name').addClass('hide');
                    $('.j_name_'+_tag_name).removeClass('hide');
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