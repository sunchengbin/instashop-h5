/**
 * Created by sunchengbin on 2016/11/10.
 * 店铺装修首页
 */
require(['base','dialog','slide','ajax','lang','lazyload','insjs','fastclick','config','hbs','text!views/moudle/model/signage.hbs','text!views/moudle/model/banner.hbs','text!views/moudle/model/itemmodel.hbs','text!views/moudle/model/editbtns.hbs','text!views/moudle/model/navigation.hbs'],function(Base,Dialog,Slide,Ajax,Lang,Lazyload,Insjs,FastClick,Config,Hbs,SignageHtm,StaticBannerHtm,Itemmodel,ModelBtns,Navigation){
    var EditModel = {
        init : function(){
            var _this = this;
            _this.model_data = init_data.template.length>0?init_data.template:[
                {
                    index : 0,
                    type : 'edit_signage',
                    data : {
                        shop : init_data.shop
                    }
                },
                {
                    index : 0,
                    title : 'static-banner',
                    type : 'static_banner',
                    data : [{img:'http://imghk0.geilicdn.com/test_instashop40732-1474882279724-1.jpg?w=420&h=315&cp=1',link_url:''}]
                },
                {
                    index : 0,
                    title : 'rotate_banner',
                    type : 'rotate_banner',
                    data : [{img:'http://imghk0.geilicdn.com/test_instashop40732-1474882279724-1.jpg?w=420&h=315&cp=1',link_url:''},{img:'http://imghk0.geilicdn.com/test_instashop40732-1474882279724-1.jpg?w=420&h=315&cp=1',link_url:''},{img:'http://imghk0.geilicdn.com/test_instashop40732-1474882279724-1.jpg?w=420&h=315&cp=1',link_url:''}]
                },
                {
                    index : 0,
                    title : 'two_list_banner',
                    type : 'two_list_banner',
                    data : [{img:'http://imghk0.geilicdn.com/test_instashop40732-1474882279724-1.jpg?w=420&h=315&cp=1',link_url:''},{img:'http://imghk0.geilicdn.com/test_instashop40732-1474882279724-1.jpg?w=420&h=315&cp=1',link_url:''}]
                },
                {
                    index : 0,
                    title : 'img_navigation',
                    type : 'img_navigation',
                    data : [{img : 'http://imghk0.geilicdn.com/test_instashop40732-1474529254204-1.jpg',navigation_name:'sfdsf',link_url:''}]
                },
                {
                    index : 0,
                    title : 'text_navigation',
                    type : 'text_navigation',
                    data : [{navigation_name:'sfs',link_url:''}]
                },
                {
                    index : 0,
                    type : 'two_li_items',
                    title : 'two_li_items',
                    data : [{"id":"1136307","item_name":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabet","seller_id":"40733","add_time":"2016-07-01 12:24:36","price":"123654.00","stock":"53","sold":"2","is_top":"1","status":"1","weight":"1000","item_comment":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabeth!","imgs":["http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=480&h=480"],"img":"http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=110&h=110&cp=1","h5_url":"http://badelong7.test.instashop.co.id/1136307","cart_url":"http://badelong7.test.instashop.co.id/address/04LBx","is_discount":0,"discounting":false,"discount":{"start_time":"1970-01-01 08:00:00","end_time":"1970-01-01 08:00:00","now_time":"2016-11-15 16:10:51","min_price":"123654.00","max_price":"123654.00","value":100},"index_type":"top"},{"id":"1136307","item_name":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabet","seller_id":"40733","add_time":"2016-07-01 12:24:36","price":"123654.00","stock":"53","sold":"2","is_top":"1","status":"1","weight":"1000","item_comment":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabeth!","imgs":["http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=480&h=480"],"img":"http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=110&h=110&cp=1","h5_url":"http://badelong7.test.instashop.co.id/1136307","cart_url":"http://badelong7.test.instashop.co.id/address/04LBx","is_discount":0,"discounting":false,"discount":{"start_time":"1970-01-01 08:00:00","end_time":"1970-01-01 08:00:00","now_time":"2016-11-15 16:10:51","min_price":"123654.00","max_price":"123654.00","value":100},"index_type":"top"},{"id":"1136307","item_name":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabet","seller_id":"40733","add_time":"2016-07-01 12:24:36","price":"123654.00","stock":"53","sold":"2","is_top":"1","status":"1","weight":"1000","item_comment":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabeth!","imgs":["http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=480&h=480"],"img":"http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=110&h=110&cp=1","h5_url":"http://badelong7.test.instashop.co.id/1136307","cart_url":"http://badelong7.test.instashop.co.id/address/04LBx","is_discount":0,"discounting":false,"discount":{"start_time":"1970-01-01 08:00:00","end_time":"1970-01-01 08:00:00","now_time":"2016-11-15 16:10:51","min_price":"123654.00","max_price":"123654.00","value":100},"index_type":"top"}]
                },
                {
                    index : 0,
                    type : 'big_img_item',
                    title : 'big_img_item',
                    data : [{"id":"1136307","item_name":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabet","seller_id":"40733","add_time":"2016-07-01 12:24:36","price":"123654.00","stock":"53","sold":"2","is_top":"1","status":"1","weight":"1000","item_comment":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabeth!","imgs":["http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=480&h=480"],"img":"http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=110&h=110&cp=1","h5_url":"http://badelong7.test.instashop.co.id/1136307","cart_url":"http://badelong7.test.instashop.co.id/address/04LBx","is_discount":0,"discounting":false,"discount":{"start_time":"1970-01-01 08:00:00","end_time":"1970-01-01 08:00:00","now_time":"2016-11-15 16:10:51","min_price":"123654.00","max_price":"123654.00","value":100},"index_type":"top"}]
                },
                {
                    index : 0,
                    type : 'list_items',
                    title : 'list_items',
                    data : [{"id":"1136307","item_name":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabet","seller_id":"40733","add_time":"2016-07-01 12:24:36","price":"123654.00","stock":"53","sold":"2","is_top":"1","status":"1","weight":"1000","item_comment":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabeth!","imgs":["http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=480&h=480"],"img":"http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=110&h=110&cp=1","h5_url":"http://badelong7.test.instashop.co.id/1136307","cart_url":"http://badelong7.test.instashop.co.id/address/04LBx","is_discount":0,"discounting":false,"discount":{"start_time":"1970-01-01 08:00:00","end_time":"1970-01-01 08:00:00","now_time":"2016-11-15 16:10:51","min_price":"123654.00","max_price":"123654.00","value":100},"index_type":"top"},{"id":"1136307","item_name":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabet","seller_id":"40733","add_time":"2016-07-01 12:24:36","price":"123654.00","stock":"53","sold":"2","is_top":"1","status":"1","weight":"1000","item_comment":"Happy birthday to this adventurous, whole-hearted and inspiring woman I get to call my mama. I love you so much @roseannelizabeth!","imgs":["http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=480&h=480"],"img":"http://imghk0.geilicdn.com/test_instashop40733-1471502119127-0.jpg?w=110&h=110&cp=1","h5_url":"http://badelong7.test.instashop.co.id/1136307","cart_url":"http://badelong7.test.instashop.co.id/address/04LBx","is_discount":0,"discounting":false,"discount":{"start_time":"1970-01-01 08:00:00","end_time":"1970-01-01 08:00:00","now_time":"2016-11-15 16:10:51","min_price":"123654.00","max_price":"123654.00","value":100},"index_type":"top"}]
                }
            ];
            Lazyload();
            _this.initHtml();
            Slide.createNew({
                dom: document.querySelector('.j_banner'),
                needTab: true,
                auto : false
            });
            Insjs.WebOnReady(function(bridge){
                _this.handelFn(bridge);
            },function(){
                //alert(2)
                _this.handelFn();
            });
        },
        handelFn : function(bridge){
            var _this = this;
            //if(!bridge){
            //    //location.reload();
            //    //alert('not find bridge');
            //    return;
            //}
            //_this.registerFn(bridge);
            FastClick.attach(document.body);
            $('body').on('click','.j_insert_model',function(){
                var _dom = $(this),
                    _index = $('.j_insert_model').index(_dom);
                var _param = {
                    param:{
                        type:'create_model',
                        param:{
                            index : _index,
                            url : Config.host.hrefUrl+'modeltype.php?index='+_index
                        }
                    }
                };
                console.log(JSON.stringify(_param));
                bridge.callHandler('insSocket',_param, function(response) {
                      return null;
                });
            });
            $('body').on('click','.j_edit_model',function(){
                var _dom = $(this),
                    _index = $('.j_edit_model').index(_dom),
                    _type = _dom.attr('data-type'),
                    _data = _this.model_data[_index]?_this.model_data[_index]:null;
                var _param = {
                    param:{
                        type:'edit_model',
                        param:{
                            index : _index,
                            type : _type,
                            title : _data&&_data.title?_data.title:'',
                            data : _data&&_data.data?_data.data:[]
                        }
                    }
                };
                console.log(JSON.stringify(_param));
                bridge.callHandler('insSocket',_param, function(response) {
                    return null;
                });
            });
            $('body').on('click','.j_del_model',function(){
                var _model = $(this).parents('.j_model_box'),
                    _index = Number($('.j_del_model').index($(this)))+1,
                    _insert_dom = _model.prev();
                Dialog.confirm({
                    cover_event : true,
                    cf_fn : function(){
                        _model.remove();
                        _insert_dom.remove();
                        _this.model_data.splice(_index,1);
                        console.log(_this.model_data)
                        _this.reloadOperateBtns();
                        //todo 如果是第一个就需要改变新进的操作btn
                    }
                });
            });
            $('body').on('click','.j_moveup_model',function(){
                var _dom = $(this),
                    _model = _dom.parents('.j_model_box'),
                    _index = Number($('.j_moveup_model').index(_dom)),
                    _insert_dom = _model.prev();
                    _model.remove();
                    _insert_dom.remove();
                var _insert_box = $('.insert-box').eq(_index);
                _insert_box.before(_insert_dom.clone());
                _insert_box.before(_model.clone());
                _this.reloadOperateBtns();
                var _move_data = _this.model_data[_index+2],
                    _change_data = _this.model_data[_index+1];
                _this.model_data[_index+2] = _change_data;
                _this.model_data[_index+1] = _move_data;
                console.log( _this.model_data);
                //todo 数据前移
            });
            $('body').on('click','.j_submit_btn',function(){
                var _param = {
                    param:{
                        type:'show_loading',
                        param : null
                    }
                };
                bridge.callHandler('insSocket',_param, function(data) {
                    return null;
                });
                _this.subModel(bridge);
            });
        },
        reloadOperateBtns : function(){
            $('.j_model_btns').each(function(i,item){
                if(i == 0){
                    if($(item).find('.j_moveup_model').length) {
                        $(item).find('.j_moveup_model').remove();
                    }
                }else{
                    if(!$(item).find('.j_moveup_model').length){
                        $(item).append('<button class="move-btn j_moveup_model handle-btn">Move up</button>');
                    }
                }
            });
        },
        subModel : function(bridge){//模板提交
            var _this = this,
                _req_data = {
                    edata : {
                        content : _this.model_data,
                        seller_id : Base.others.getUrlPrem('seller_id'),
                        wduss : Base.others.getUrlPrem('wduss')
                    }
                };
            Ajax.postJsonp({
                url :Config.actions.saveTemplate,
                data : {param:JSON.stringify(_req_data)},
                type : 'POST',
                success : function(obj){
                    if(obj.code == 200){
                        _this.closeLoading(bridge);
                    }else{
                        _this.closeLoading(bridge,function(){
                            Dialog.tip({
                                top_txt : '',//可以是html
                                body_txt : '<p class="dialog-body-p">'+obj.message+'</p>'
                            });
                        });
                    }
                },
                error : function(error){
                    _this.closeLoading(bridge,function(){
                        Dialog.alert({
                            top_txt : '',//可以是html
                            cfb_txt:Lang.H5_FRESHEN,
                            body_txt : '<p class="dialog-body-p">'+Lang.H5_ERROR+'</p>',
                            cf_fn : function(){
                                location.reload();
                            }
                        });
                    });
                }
            });
        },
        closeLoading : function(bridge,callback){//关闭native的loading
            var _close_param = {
                param:{
                    type : 'close_model',
                    param : null
                }
            };
            bridge.callHandler('insSocket',_close_param, function(response) {
                callback && callback();
                return null;
            });
        },
        registerFn : function(bridge){//对native内容监控
            var _this = this;
            bridge.registerHandler('registerSocket', function(data, responseCallback) {
                //alert(data);
                _this.insertModel(JSON.parse(data),function(obj){
                    responseCallback(obj);
                });
            });
        },
        insertModel : function(data,callbcak){
            var _this = this,
                _arr = [data.result],
                _new_model = _this.createModelHtm(_arr);
            $('.j_insert_model').eq(data.result.index).before(_new_model);
            _this.reloadOperateBtns();
            callbcak && callbcak(data);
            //todo native编辑后插入模块
        },
        initHtml : function(){
            var _this = this,
                _html = '';
            _html+= _this.createModelHtm(_this.model_data)
                +_this.defaultItemsHtm()
                +'<button class="j_submit_btn sub-btn b-top">Applications to shop</button>';
            $('body').prepend(_html);
        },
        createModelBtnHtm : function(opts){
            return Hbs.compile(ModelBtns)({
                notmove : opts.notmove,
                type : opts.type
            });
        },
        createInsertHtm : function(){
            return '<div class="insert-box"><button class="handle-btn j_insert_model insert-btn">Insert ad rotation</button></div>'
        },
        defaultItemsHtm : function(){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'twoItem',
                data : {
                    data : init_data.item_list.list,
                    title : 'Rekomendasi Item'
                },
                lang : Lang
            });
        },
        createModelHtm : function(model){
            var _this = this,
                _html = '';
            if(!model.length)return _html;
            for(var i = 0;i < model.length;i++){
                var _model_info = model[i],
                    _notmove = i==1?'notmove':null;
                switch(model[i].type){
                    case 'edit_signage':
                        _html+= _this.createSignageHtm(_model_info.data);
                        break;
                    case 'static_banner':
                        _html+= _this.staticBannerHtm({
                            data : _model_info,
                            notmove : _notmove
                        });
                        break;
                    case 'rotate_banner':
                        _html+= _this.rotateBannerHtm({
                            data : _model_info,
                            notmove : _notmove
                        });
                        break;
                    case 'two_list_banner':
                        _html+= _this.twoListBannerHtm({
                            data : _model_info,
                            notmove : _notmove
                        });
                        break;
                    case 'img_navigation':
                        _html+= _this.imgNavigationHtm({
                            data : _model_info,
                            notmove : _notmove
                        });
                        break;
                    case 'text_navigation':
                        _html+= _this.textNavigationHtm({
                            data : _model_info,
                            notmove : _notmove
                        });
                        break;
                    case 'two_li_items':
                        _html+= _this.twoLiItemsHtm({
                            data : _model_info,
                            notmove : _notmove
                        });
                        break;
                    case 'big_img_item':
                        _html+= _this.bigImgItem({
                            data : _model_info,
                            notmove : _notmove
                        });
                        break;
                    case 'list_items':
                        _html+= _this.listItems({
                            data : _model_info,
                            notmove : _notmove
                        });
                        break;
                    default :
                        alert('not find '+model[i].type);
                        break;
                }
            }
            return _html;
        },
        createSignageHtm : function(data){
            return Hbs.compile(SignageHtm)({
                data : data
            });
        },
        staticBannerHtm : function(opts){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(StaticBannerHtm)({
                type : 'static',
                btns : _this.createModelBtnHtm({
                    type : 'static_banner',
                    notmove : opts.notmove
                }),
                data : opts.data,
                lang : Lang
            });
        },
        rotateBannerHtm : function(opts){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(StaticBannerHtm)({
                type : 'rotate',
                btns : _this.createModelBtnHtm({
                    type : 'rotate_banner',
                    notmove : opts.notmove
                }),
                data : opts.data,
                lang : Lang
            });
        },
        twoListBannerHtm : function(opts){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(StaticBannerHtm)({
                type : 'two_list',
                btns : _this.createModelBtnHtm({
                    type : 'two_list_banner',
                    notmove : opts.notmove
                }),
                data : opts.data,
                lang : Lang
            });
        },
        imgNavigationHtm : function(opts){
            var _this = this;
            return this.createInsertHtm() + Hbs.compile(Navigation)({
                type : 'img',
                btns : _this.createModelBtnHtm({
                    type : 'img_navigation',
                    notmove : opts.notmove
                }),
                data : opts.data,
                lang : Lang
            });
        },
        textNavigationHtm : function(opts){
            var _this = this;
            return this.createInsertHtm() + Hbs.compile(Navigation)({
                type : 'text',
                btns : _this.createModelBtnHtm({
                    type : 'text_navigation',
                    notmove : opts.notmove
                }),
                data : opts.data,
                lang : Lang
            });
        },
        twoLiItemsHtm : function(opts){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'twoItem',
                btns : _this.createModelBtnHtm({
                    type : 'two_li_items',
                    notmove : opts.notmove
                }),
                data : opts.data,
                lang : Lang
            });
        },
        bigImgItem : function(opts){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'bigitem',
                btns : _this.createModelBtnHtm({
                    type : 'big_img_item',
                    notmove : opts.notmove
                }),
                data : opts.data,
                lang : Lang
            });
        },
        listItems : function(opts){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'listitem',
                btns : _this.createModelBtnHtm({
                    type : 'list_items',
                    notmove : opts.notmove
                }),
                data : opts.data,
                lang : Lang
            });
        }
    };
    EditModel.init();
})
