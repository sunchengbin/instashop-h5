/**
 * Created by sunchengbin on 16/6/8.
 * 商品详情页
 */
require(['lang','lazyload','hbs','text!views/app/item.hbs','ajax','config','base','common','buyplug'],function(Lang,Lazyload,Hbs,Item,Ajax,Config,Base,Common,Buyplug){
    var ITEM = {
        init : function(){
            Lazyload();
            var ItemHtm = '<div>加载数据中</div>';
            if(init_data){
                ItemHtm= Hbs.compile(Item)({
                    data : init_data,
                    lang : Lang
                });
            }else{
                ItemHtm = '<div>数据出错</div>';
            }
            $('body').prepend(ItemHtm);
            Buyplug({
                data : init_data
            });
        },
        handleFn : function(){
            $('body').on('click','.j_item_info',function(){
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
