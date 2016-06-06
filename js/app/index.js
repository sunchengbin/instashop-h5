/**
 * Created by sunchengbin on 16/6/6.
 */
require(['lang','lazyload','hbs','text!views/app/index.hbs','ajax','config'],function(Lang,Lazyload,Hbs,Index,Ajax,Config){
    Lazyload();
    var IndexHtm = '<div>加载数据中</div>';
    if(init_data){
        IndexHtm= Hbs.compile(Index)({
            data : init_data,
            lang : Lang
        });
    }else{
        IndexHtm = '<div>数据出错</div>';
    }
    $('body').prepend(IndexHtm);
    var page_num = 1,
        reqData = {
            action: 'index',
            page_size: 10,
            page_num: page_num
        };
    $(document).bind('scroll', function(e) {
        if (document.body.scrollTop + window.screen.height > document.body.offsetHeight - 200) {
            Ajax.getJsonp(Config.host.actionUrl+Config.action.shopList+init_data.shop.id+'?param='+JSON.stringify(reqData),function(obj){
                page_num++;
            },function(error){

            });
        }
    })
})