/**
 * Created by sunchengbin on 16/6/15.
 */
require(['lang','hbs','text!views/app/orderdetail.hbs','config','base','common'],function(Lang,Hbs,OrderDetail,Config,Base,Common) {
    var OD = {
        init : function(){
            var ItemHtm = '<div>加载数据中</div>';
            if(init_data){
                ItemHtm= Hbs.compile(OrderDetail)({
                    data : init_data,
                    lang : Lang,
                    hrefUrl : Config.host.hrefUrl,
                    host:Config.host.host
                });
            }else{
                ItemHtm = '<div>数据出错</div>';
            }
            $('body').prepend(ItemHtm);
        }

    };
    OD.init();
})
