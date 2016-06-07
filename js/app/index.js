/**
 * Created by sunchengbin on 16/6/6.
 */
require(['lang','lazyload','hbs','text!views/app/index.hbs','ajax','config','base'],function(Lang,Lazyload,Hbs,Index,Ajax,Config,Base){
    var I = {
        init : function(init_data){
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
           this.handleFn();
        },
        handleFn : function(){
            var page_num = 2,
                _this = this,
                getData = true,
                reqData = {
                    edata : {
                        action: 'index',
                        page_size: 10,
                        page_num: page_num
                    }
                };
            $(document).on('scroll', function(e) {
                var _st = $('body').scrollTop(),
                    _wh = $(window).height(),
                    _bh = $(document).height();
                if ((_st + _wh > _bh - 200) && getData) {
                    getData = false;
                    Ajax.getJsonp(Config.host.actionUrl+Config.actions.shopList+init_data.shop.id+'?param='+JSON.stringify(reqData),function(obj){
                        if(obj.code == 200){
                            reqData = {
                                edata : {
                                    action: 'index',
                                    page_size: 10,
                                    page_num: page_num++
                                }
                            };
                            if(obj.item_list.list.length > 0){
                                $('.j_item_list').append(_this.addItem(obj.item_list.list));
                                getData = true;
                            }else{
                                getData = false;
                            }
                        }else{
                            getData = true;
                        }
                    },function(error){
                        getData = true;
                    });
                }
            });
        },
        addItem : function(items){
            var out = "",
                i = 0;
            for (i; i < items.length;i++) {
                if(items[i].is_top == 0){
                    out += '<li><a class="item-info" href="'+items[i].h5_url+'">'
                        +'<div class="lazy" data-img="'+items[i].img+'"></div>'
                        +'<p class="title">'+items[i].item_comment+'</p>'
                        +'<p class="price">RP '+Base.others.priceFormat(items[i].price)+'</p>'
                        +'</a></li>';
                }
            }
            return out;
        }
    };
    I.init(init_data);
})