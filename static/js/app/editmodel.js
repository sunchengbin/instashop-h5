/**
 * Created by sunchengbin on 2016/11/10.
 * 店铺装修首页
 */
require(['base','dialog','lang','lazyload','insjs','fastclick','config','hbs','text!views/moudle/model/signage.hbs','text!views/moudle/model/banner.hbs','text!views/moudle/model/itemmodel.hbs','text!views/moudle/model/editbtns.hbs','text!views/moudle/model/navigation.hbs'],function(Base,Dialog,Lang,Lazyload,Insjs,FastClick,Config,Hbs,SignageHtm,StaticBannerHtm,Itemmodel,ModelBtns,Navigation){
    var EditModel = {
        init : function(){
            var _this = this;
            //todo 这里要从后端读数据赋值给model_data
            _this.model_data = init_data.template.length>0?init_data.template:[{
                index : 0,
                type : 'edit_signage',
                data : {
                    shop : init_data.shop
                }
            }];
            Lazyload();
            _this.initHtml();
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
            $('body').on('click','.j_show_loading',function(){
                var _param = {
                    param:{
                        type:'show_loading',
                        param:null
                    }
                };
                bridge.callHandler('insSocket',_param, function(response) {
                    return null;
                });
            });
            $('body').on('click','.j_close_loading',function(){
                var _param = {
                    param:{
                        type:'close_model',
                        param:{
                            code : 200,
                            message : 'sss'
                        }
                    }
                };
                bridge.callHandler('insSocket',_param, function(response) {
                    return null;
                });
            });
            $('body').on('click','.j_del_model',function(){
                var _model = $(this).parents('.j_model_box'),
                    _index = $('.j_del_model').index($(this)),
                    _insert_dom = _model.prev();
                console.log(_index)
                Dialog.confirm({
                    cover_event : true,
                    cf_fn : function(){
                        _model.remove();
                        _insert_dom.remove();
                        //todo 删除模块数据
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
                $('.j_model_btns');
                //todo 数据前移
            });
        },
        registerFn : function(bridge){
            var _this = this;
            bridge.registerHandler('registerSocket', function(data, responseCallback) {
                //alert(data);
                //var responseData = JSON.parse(data).result;
                _this.insertModel(JSON.parse(data),function(obj){
                    responseCallback(obj);
                });
            });
        },
        insertModel : function(data,callbcak){

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
                data : init_data.item_list.list
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
                            data : _model_info.data,
                            notmove : _notmove
                        });
                        break;
                    case 'rotate_banner':
                        _html+= _this.rotateBannerHtm({
                            data : _model_info.data,
                            notmove : _notmove
                        });
                        break;
                    case 'two_list_banner':
                        _html+= _this.twoListBannerHtm({
                            data : _model_info.data,
                            notmove : _notmove
                        });
                        break;
                    case 'img_navigation':
                        _html+= _this.imgNavigationHtm({
                            data : _model_info.data,
                            notmove : _notmove
                        });
                        break;
                    case 'text_navigation':
                        _html+= _this.textNavigationHtm({
                            data : _model_info.data,
                            notmove : _notmove
                        });
                        break;
                    case 'two_li_items':
                        _html+= _this.twoLiItemsHtm({
                            data : _model_info.data,
                            notmove : _notmove
                        });
                        break;
                    case 'big_img_item':
                        _html+= _this.bigImgItem({
                            data : _model_info.data,
                            notmove : _notmove
                        });
                        break;
                    case 'list_items':
                        _html+= _this.listItems({
                            data : _model_info.data,
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
        staticBannerHtm : function(notmove){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(StaticBannerHtm)({
                type : 'static',
                btns : _this.createModelBtnHtm({
                    type : 'static_banner',
                    notmove : notmove
                })
            });
        },
        rotateBannerHtm : function(notmove){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(StaticBannerHtm)({
                type : 'rotate',
                btns : _this.createModelBtnHtm({
                    type : 'rotate_banner',
                    notmove : notmove
                })
            });
        },
        twoListBannerHtm : function(notmove){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(StaticBannerHtm)({
                type : 'two_list',
                btns : _this.createModelBtnHtm({
                    type : 'two_list_banner',
                    notmove : notmove
                })
            });
        },
        imgNavigationHtm : function(notmove){
            var _this = this;
            return this.createInsertHtm() + Hbs.compile(Navigation)({
                type : 'img',
                btns : _this.createModelBtnHtm({
                    type : 'img_navigation',
                    notmove : notmove
                })
            });
        },
        textNavigationHtm : function(notmove){
            var _this = this;
            return this.createInsertHtm() + Hbs.compile(Navigation)({
                type : 'text',
                btns : _this.createModelBtnHtm({
                    type : 'text_navigation',
                    notmove : notmove
                })
            });
        },
        twoLiItemsHtm : function(notmove){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'twoItem',
                btns : _this.createModelBtnHtm({
                    type : 'two_li_items',
                    notmove : notmove
                })
            });
        },
        bigImgItem : function(notmove){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'bigitem',
                btns : _this.createModelBtnHtm({
                    type : 'big_img_item',
                    notmove : notmove
                })
            });
        },
        listItems : function(notmove){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'listitem',
                btns : _this.createModelBtnHtm({
                    type : 'list_items',
                    notmove : notmove
                })
            });
        }
    };
    EditModel.init();
})
