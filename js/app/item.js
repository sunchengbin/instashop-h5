/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang','lazyload','hbs','text!views/app/item.hbs','ajax','config','base','common','buyplug','slide','cart'],function(Lang,Lazyload,Hbs,Item,Ajax,Config,Base,Common,Buyplug,Slide,Cart){
    var ITEM = {
        init : function(){
            Lazyload();
            var ItemHtm = '<div>加载数据中</div>';
            if(init_data){
                ItemHtm= Hbs.compile(Item)({
                    data : init_data,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    num : Cart(init_data).getCartNum()
                });
            }else{
                ItemHtm = '<div>数据出错</div>';
            }
            $('body').prepend(ItemHtm);
            if(init_data) {
                Slide.createNew({
                    dom: document.querySelector('.j_banner'),
                    needTab: true
                });
                Buyplug({
                    data: init_data
                });
            }
            this.handleFn();
        },
        handleFn : function(){
            $('body').on('click','.j_shop_info',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
            $('body').on('tap','.j_go_back',function(){
                Common.saveFromUrl(function(){
                    location.href = Config.host.host+'s/'+init_data.item.shop.id;
                });
            });
            $('body').on('click','.j_cart_wraper',function(){
                var _this = $(this),
                    _url = _this.attr('data-url');
                Common.saveFromUrl(function(){
                    location.href = _url;
                });
            });
        }
    };
    ITEM.init();
})
