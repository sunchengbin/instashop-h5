/**
 * Created by sunchengbin on 2016/11/10.
 * 店铺装修首页
 */
require(['base','dialog','slide','ajax','lang','common','lazyload','insjs','fastclick','config','hbs','text!views/moudle/model/signage.hbs','text!views/moudle/model/banner.hbs','text!views/moudle/model/itemmodel.hbs','text!views/moudle/model/editbtns.hbs','text!views/moudle/model/navigation.hbs','btn'],function(Base,Dialog,Slide,Ajax,Lang,Common,Lazyload,Insjs,FastClick,Config,Hbs,SignageHtm,StaticBannerHtm,Itemmodel,ModelBtns,Navigation,Btn){
    var EditModel = {
        init : function(){
            var _this = this;
            _this.is_edit = 0;//native是否可以回退
            _this.model_data = init_data.template&&init_data.template.length>0?init_data.template:[
                {
                    index: 0,
                    type: 'edit_signage',
                    data: [init_data.shop]
                }
            ];
            _this.clearNullData();
            _this.getItemListType();
            Lazyload();
            _this.initRotateBanner();
            _this.setBodyHeight();
            //_this.initHtml();
            Insjs.WebOnReady(function(bridge){
                _this.handelFn(bridge);
            },function(){
                _this.handelFn();
            });

        },
        clearNullData:function(){
            var _this =this,
                _arr = [];
            $.each(_this.model_data,function(i,item){
                if(item != null){
                    _arr.push(item);
                }
            });
            _this.model_data = _arr;
        },
        setBodyHeight:function(){
            $('body').height($(window).height());
        },
        getItemListType : function(){
            var _this = this;
            _this.type_num = 0;
            _this.index = [];
            $.each(_this.model_data,function(i,item){
                if(item && item.type == 'item_list_type'){
                    _this.type_num++;
                    _this.index.push(i);
                }
            });
            if(_this.type_num > 1){
                _this.model_data.splice(_this.index[0],1);
            }
            Common.getItemListType(_this.model_data,function(type){
                _this.item_list_type = type;
            });
            Common.isHaveListType(_this.model_data,function(){

                _this.have_list_type = true;
            });
        },
        handelFn : function(bridge){
            var _this = this;
            if(!bridge){
                alert('not find bridge');
                return;
            }
            (function(bridge){
                var _close_param = {
                    param:{
                        type : 'close_loading',
                        param : null
                    }
                };
                //关闭webview的loading动画
                bridge.callHandler('insSocket',_close_param, function(response) {
                    return null;
                });
                var _param = {
                    param:{
                        type : 'go_back',
                        param : {
                            type : 'loaded',
                            result : _this.is_edit
                        }
                    }
                };
                //提供给native设置回退锁,为了回退的时候
                bridge.callHandler('insSocket',_param, function(response) {
                    return null;
                });
            })(bridge);
            _this.registerFn(bridge);
            FastClick.attach(document.body);
            $('body').on('click','.j_insert_model',function(){
                PaqPush && PaqPush('插入模块','insert-model');
                //_paq.push(['trackEvent', '插入模块', 'click', '插入模块']);
                _this.setIsEdited();
                var _dom = $(this),
                    _index = $('.j_insert_model').index(_dom);
                try{
                    goUrlStatistics('insert_model');
                }catch(error){
                    console.log('error')
                }
                var _param = {
                    param:{
                        type:'create_model',
                        param:{
                            index : _index,
                            url : Config.host.hrefUrl+'modeltype.php?index='+_index
                        }
                    }
                };
                bridge.callHandler('insSocket',_param, function(response) {
                      return null;
                });
            });
            $('body').on('click','.j_edit_model',function(){
                _this.setIsEdited();
                var _dom = $(this),
                    _index = $('.j_edit_model').index(_dom),
                    _type = _dom.attr('data-type'),
                    _data = _this.model_data[_index]?_this.model_data[_index]:null;
                PaqPush && PaqPush('编辑模块',_type);
                //_paq.push(['trackEvent', '编辑模板', 'click', _type]);
                if(_type == 'three_li_items' && !Insjs.testJudgeVersion(3.9)){
                    PaqPush && PaqPush('版本低于3.9','version='+window.navigator.userAgent.match(/Instashop\-(.+?)\-/)[1]||"");
                    Dialog.alert({
                        body_txt: 'Silakan update ke 3.9 sebelum menggunakan fitur ini'
                    });
                }else{
                    if(_type == 'item_list_type'){//选择
                        var _sel_htm = '<div>';
                        if(_this.item_list_type != 3){
                            _sel_htm += '<p class="j_item_list_type"><i class="icon iconfont check-btn checked-btn icon-radioed-font" data-type="2"></i>'+Lang.H5_ITEM_LIST_TYPE_TWO+'</p>';
                            _sel_htm += '<p class="j_item_list_type"><i class="icon iconfont check-btn icon-radio-font" data-type="3"></i>'+Lang.H5_ITEM_LIST_TYPE_THREE+'</p>';
                        }else{
                            _sel_htm += '<p class="j_item_list_type"><i class="icon iconfont check-btn icon-radio-font" data-type="2"></i>'+Lang.H5_ITEM_LIST_TYPE_TWO+'</p>';
                            _sel_htm += '<p class="j_item_list_type"><i class="icon iconfont check-btn checked-btn icon-radioed-font" data-type="3"></i>'+Lang.H5_ITEM_LIST_TYPE_THREE+'</p>';
                        }
                        _sel_htm += '</div>';
                        Dialog.confirm({
                            top_txt : '',//可以是html
                            body_txt : _sel_htm,
                            cf_fn : function(){
                                var _type = Number($('.j_item_list_type .checked-btn').attr('data-type'));
                                if(_type != _this.item_list_type){//列表类型被修改了
                                    _this.item_list_type = _type;
                                    _this.setDefaultItemType(_type);
                                }
                            }
                        });
                    }else{
                        var _param = {
                            param:{
                                type:'edit_model',
                                param:{
                                    index : _index,
                                    type : _type,
                                    title : _data&&_data.title?Common.decodeSingleQuotes(_data.title):'',
                                    data : _data&&_data.data?_this.tranfansModelData(_data.data):[]
                                }
                            }
                        };
                        //console.log(_param);
                        bridge.callHandler('insSocket',_param, function(response) {
                            return null;
                        });
                    }
                }
            });
            $('body').on('click','.j_item_list_type',function(){
                if($(this).find('.check-btn').length){
                    PaqPush && PaqPush('切换商品展示',$(this).find('i').attr('data-type'));
                    //_paq.push(['trackEvent', '切换商品展示', 'click', $(this).find('i').attr('data-type')]);
                    $('.checked-btn').addClass('check-btn').removeClass('checked-btn');
                    $(this).find('.check-btn').addClass('checked-btn');
                    $('.icon-radioed-font').addClass('icon-radio-font').removeClass('icon-radioed-font');
                    $(this).find('.check-btn').addClass('icon-radioed-font').removeClass('icon-radio-font');
                }
            });
            $('body').on('click','.j_del_model',function(){
                var _model = $(this).parents('.j_model_box'),
                    _index = Number($('.j_del_model').index($(this)))+1,
                    _insert_dom = _model.prev();
                PaqPush && PaqPush('删除模块','delete-model');
                //_paq.push(['trackEvent', '删除模块', 'click', '删除模块']);
                Dialog.confirm({
                    cover_event : true,
                    cf_fn : function(){
                        PaqPush && PaqPush('确定删除','delete-true');
                        _this.setIsEdited();
                        _model.remove();
                        _insert_dom.remove();
                        _this.model_data.splice(_index,1);
                        _this.reloadOperateBtns();
                        //todo 如果是第一个就需要改变新进的操作btn
                    }
                });
            });
            $('body').on('click','.j_moveup_model',function(){
                PaqPush && PaqPush('上移模块','moveup-model');
                //_paq.push(['trackEvent', '上移模块', 'click', '上移模块']);
                _this.setIsEdited();
                var _dom = $(this),
                    _model = _dom.parents('.j_model_box'),
                    _index = Number($('.j_moveup_model').index(_dom)),
                    _insert_dom = _model.prev();
                var _insert_box = $('.insert-box').eq(_index);
                _insert_dom.remove();
                if(_model.find('.slide_tab').length){//确定是轮播图模块
                    _model.remove();
                    _insert_box.before(_this.rotateBannerHtm({
                        data : _this.model_data[_index+2],
                        notmove : null
                    }));
                }else{
                    _model.remove();
                    _insert_box.before(_insert_dom.clone());
                    _insert_box.before(_model.clone());
                }

                _this.reloadOperateBtns();
                var _move_data = _this.model_data[_index+2],
                    _change_data = _this.model_data[_index+1];
                _this.model_data[_index+2] = _change_data;
                _this.model_data[_index+1] = _move_data;
                //todo 数据前移
            });
            $('body').on('click','.j_submit_btn',function(){
                PaqPush && PaqPush('应用到店铺','save-model');
                _this.subModel();
                var _param = {
                    param:{
                        type:'show_loading',
                        param : null
                    }
                };
                bridge.callHandler('insSocket',_param, function(data) {
                    return null;
                });
            });
            Btn({
                wraper: 'body',
                target: '.j_change_btn',
                event_type: 'click',
                loading_txt: Lang.CHANGE_SKIN,
                callback: function (dom) {
                    var _href = location.href,
                        _skin = $(dom).attr('data-skin');
                    PaqPush && PaqPush('切换皮肤',_skin);
                    _this._loading = Dialog.loading({
                        width: 100,
                        is_cover: true
                    });
                    //alert(!/ios/g.test(navigator.userAgent));
                    if(!/ios/g.test(navigator.userAgent)) {
                        //alert('reload_loading');
                        var _param = {
                            param: {
                                type: 'reload_loading',
                                param: null
                            }
                        };
                        bridge.callHandler('insSocket', _param, function (data) {
                            return null;
                        });
                    }

                    switch(_skin){
                        case 'first':
                            location.href = _this.changeSkinUrlPram(_href,'first',1);
                            break;
                        case 'second':
                            location.href = _this.changeSkinUrlPram(_href,'second',2);
                            break;
                        case 'default':
                            location.href = _this.changeSkinUrlPram(_href,'default',0);
                            break;
                        default :
                            location.href = _this.changeSkinUrlPram(_href,'default',0);
                            break;
                    }

                }
            });
        },
        changeSkinUrlPram : function(href,skin,skin_code){
            var _href = href;
            if(Base.others.getUrlPrem('skin')){
                _href = Base.others.resetUrlPrem('skin',skin,_href);
                _href = Base.others.resetUrlPrem('skin_code',skin_code,_href);
            }else{
                _href += '&skin='+skin+'&skin_code='+skin_code;
            }
            return _href;
        },
        tranfansModelData : function(data){
            return JSON.parse(Common.decodeSingleQuotes(JSON.stringify(data)));
        },

        setDefaultItemType : function(type){//设置默认列表样式type
            var _this = this,
                _item_box = $('.j_default_item_box');
            _item_box.before(Hbs.compile(Itemmodel)({
                type : 'twoItem',
                isdefault: true,
                listtype : type,
                btns : _this.createModelBtnHtm({
                    type : 'item_list_type',
                    notmove : null
                }),
                data : {
                    data : type != 3?init_data.item_list.list.slice(0,2):init_data.item_list.list,
                    title : Lang.H5_EDIT_SHOW_ITEM
                },
                lang : Lang
            }));
            Lazyload();
            _item_box.remove();
        },
        setIsEdited : function(){
            this.is_edit = 1;
        },
        reloadOperateBtns : function(){
            this.initRotateBanner();
            $('.j_model_btns').each(function(i,item){
                var _item = $(item);
                if(i == 0){
                    if(_item.find('.j_moveup_model').length) {
                        _item.find('.j_moveup_model').remove();
                    }
                }else{
                    if(!_item.find('.j_moveup_model').length){
                        if(!_item.parent().is('.j_default_item_box')){
                            _item.append('<button class="move-btn j_moveup_model handle-btn">'+Lang.H5_MOVE_UP+'</button>');
                        }

                    }
                }
            });
        },
        initRotateBanner : function(){
            var _banners = document.querySelectorAll('.j_banner');
            if($('.j_banner').length){
                $.each(_banners,function(i,item){
                    if(!$('.j_banner').eq(i).parent().find('.slide_tab').length){
                        Slide.createNew({
                            dom: item,
                            needTab: true,
                            auto : true
                        });
                    }
                });
            }
            //Common.slideImgNav();
        },
        verifySub : function(){//提交前验证
            if($('.static-banner').length > 5)return false;
            return true;
        },
        subModel : function(bridge){//模板提交
            var _this = this,
                _len = _this.model_data.length;
            if(_this.have_list_type){
                _this.model_data.splice(_len-1,1);
                _this.model_data.push({
                    index: 0,
                    type: 'item_list_type',
                    data: [_this.item_list_type]
                });
            }else{
                _this.model_data.push({
                    index: 0,
                    type: 'item_list_type',
                    data: [_this.item_list_type]
                });
                _this.have_list_type = true;
            }
            var _seller_info = Common.getUrlSellerInfo();
            var _skin_info = _this.getSkinInfo();
            var _req_data = {
                edata : {
                    skin : _skin_info,
                    content : _this.tranfansModelData(_this.model_data),
                    seller_id : _seller_info.seller_id,
                    wduss : _seller_info.wduss
                }
            };
            PaqPush && PaqPush('保存皮肤',_skin_info);
            Ajax.postJsonp({
                url :Config.actions.saveTemplate,
                data : {param:JSON.stringify(_req_data)},
                type : 'POST',
                success : function(obj){
                    _this.closeLoading(bridge,obj);
                },
                error : function(error){
                    _this.closeLoading(bridge,{code:500,message:Lang.H5_ORDER_TIMEOUT_ERROR});
                }
            });
        },
        getSkinInfo : function(){
            var _this = this,
                _skin = Base.others.getUrlPrem('skin'),
                _code = Base.others.getUrlPrem('skin_code');
                _skin = _skin ? _skin : (SKIN?SKIN:'default');
                _code = _code ? _code : _this.getSkinCode(_skin);
            var _data = {
                code : _code,
                name : _skin
            };
            return _data;
        },
        getSkinCode : function(skin){
            var _code = 0;
            switch (skin){
                case 'default':
                    _code = 0;
                    break;
                case 'first':
                    _code = 1;
                    break;
                case 'second':
                    _code = 2;
                    break;
                default :
                    _code = 0;
                    break;
            }
            return _code;
        },
        closeLoading : function(bridge,code){//关闭native的loading
            var _close_param = {
                param:{
                    type : 'close_model',
                    param : code
                }
            };
            bridge.callHandler('insSocket',_close_param, function(response) {
                return null;
            });
        },
        registerFn : function(bridge){//对native内容监控
            var _this = this;
            bridge.registerHandler('registerSocket', function(data, responseCallback) {
                //alert(data);
                if(data != 'done'){
                    if(data == 'back'){
                        var _param = {
                            param:{
                                type : 'go_back',
                                param : {
                                    type : 'edit',
                                    result : _this.is_edit
                                }
                            }
                        };
                        bridge.callHandler('insSocket',_param, function(response) {
                            return null;
                        });
                    }else{
                        //alert(data);
                        _this.insertModel(JSON.parse(data),function(obj){
                            responseCallback(obj);
                        });
                    }
                }else{//如果返回done说明native的loading已经弹出,直接提交数据
                    _this.subModel(bridge);
                }

            });
        },
        insertModel : function(data,callbcak){
            var _this = this,
                _arr = [data.result],
                _index = Number(data.result.index),
                _new_model = _this.createModelHtm(_arr);
            if(data.param.param.data.length > 0){//如果是编辑
                if(data.param.param.type != 'edit_signage'){
                    $('.j_model_box').eq(_index-1).remove();
                    $('.j_insert_model').eq(_index-1).remove();
                    if(data.result.data.length > 0){
                        _this.model_data[_index] = data.result;//修改数据
                        $('.j_insert_model').eq(_index-1).before(_new_model);
                    }else{
                        //如果没有数据(相当于删除了该模块)
                        _this.model_data.splice(_index,1);
                    }
                }else{
                    _this.model_data[0] = data.result;//修改数据
                    $('.j_shop_bg').attr('src',data.result.data[0].front_cover);
                }
            }else{//新建
                if(data.result.data.length > 0){//编辑了新数据
                    _this.model_data.splice(_index+1,0,data.result);
                    $('.j_insert_model').eq(_index).before(_new_model);
                }else{
                    return;
                }
            }
            Lazyload();
            _this.reloadOperateBtns();
            callbcak && callbcak(data);
            //todo native编辑后插入模块
        },
        initHtml : function(){
            var _this = this,
                _html = '';
            _html+= _this.createModelHtm(_this.model_data)
                +_this.defaultItemsHtm()
                +'<button class="j_submit_btn sub-btn b-top">'+Lang.H5_APPLY_MODEL+'</button>';
            $('.edit-wraper-box').html(_html);
        },
        createModelBtnHtm : function(opts){
            return Hbs.compile(ModelBtns)({
                notmove : opts.notmove,
                type : opts.type,
                lang : Lang
            });
        },
        createInsertHtm : function(){
            return '<div class="insert-box j_insert_model"><button class="handle-btn insert-btn">'+Lang.H5_INSERT_MODEL+'</button></div>'
        },
        defaultItemsHtm : function(){
            var _this = this;
            //_this.item_list_type = 3;
            if(!init_data.item_list.list.length){
                return '';
            }
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'twoItem',
                isdefault: true,
                listtype : _this.item_list_type,
                btns : _this.createModelBtnHtm({
                    type : 'item_list_type',
                    notmove : null
                }),
                data : {
                    data : _this.item_list_type == 2?init_data.item_list.list.slice(0,2):init_data.item_list.list,
                    title : Lang.H5_EDIT_SHOW_ITEM
                },
                lang : Lang
            });
        },
        getFolder : function(skin){
            var _folder = '';
            switch (skin){
                case 'default':
                    _folder = '';
                    break;
                case 'first':
                    _folder = '/first';
                    break;
                case 'second':
                    _folder = '/second';
                    break;
                default :
                    _folder = '';
                    break;
            }
            return _folder;
        },
        createModelHtm : function(model){
            var _this = this,
                _html = '',
                _skin_info = _this.getSkinInfo().name;
            if(!model.length)return _html;
            for(var i = 0;i < model.length;i++){
                var _model_info = model[i],
                    _notmove = i==1?'notmove':null;
                if(model[i]){
                    switch(model[i].type){
                        case 'edit_signage':
                            _html+= _this.createSignageHtm(_model_info.data[0],_skin_info);
                            break;
                        case 'static_banner':
                            _html+= _this.staticBannerHtm({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info,
                                static_banner_title:Config.host.imgUrl+_this.getFolder(_skin_info)+'/static_banner_title.png'
                            });
                            break;
                        case 'rotate_banner':
                            _html+= _this.rotateBannerHtm({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info
                            });
                            break;
                        case 'two_list_banner':
                            _html+= _this.twoListBannerHtm({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info,
                                two_li_banner_txt:Config.host.imgUrl+_this.getFolder(_skin_info)+'/two_li_banner_txt.png'
                            });
                            break;
                        case 'img_navigation':
                            _html+= _this.imgNavigationHtm({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info
                            });
                            break;
                        case 'text_navigation':
                            _html+= _this.textNavigationHtm({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info
                            });
                            break;
                        case 'two_li_items':
                            _html+= _this.twoLiItemsHtm({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info
                            });
                            break;
                        case 'big_img_item':
                            _html+= _this.bigImgItem({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info
                            });
                            break;
                        case 'list_items':
                            _html+= _this.listItems({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info
                            });
                            break;
                        case 'three_li_items':
                            _html+= _this.threeRowItems({
                                data : _model_info,
                                notmove : _notmove,
                                skin : _skin_info
                            });
                            break;
                        case 'item_list_type':
                            console.log('选择商品列表样式');
                            break;
                        default :
                            alert('not find '+model[i].type);
                            break;
                    }
                }

            }
            return _html;
        },
        createSignageHtm : function(data,skin){
            return Hbs.compile(SignageHtm)({
                data : data,
                shop : init_data.shop,
                lang:Lang,
                skin : skin
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
                lang : Lang,
                skin : opts.skin,
                static_banner_title:opts.static_banner_title
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
                lang : Lang,
                skin : opts.skin
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
                lang : Lang,
                skin : opts.skin,
                two_li_banner_txt:opts.two_li_banner_txt
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
                skin : opts.skin,
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
                skin : opts.skin,
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
                skin : opts.skin,
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
                skin : opts.skin,
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
                skin : opts.skin,
                lang : Lang
            });
        },
        threeRowItems : function(opts){
            var _this = this;
            return _this.createInsertHtm()+Hbs.compile(Itemmodel)({
                type : 'twoItem',
                listtype:3,
                btns : _this.createModelBtnHtm({
                    type : 'three_li_items',
                    notmove : opts.notmove
                }),
                data : opts.data,
                skin : opts.skin,
                lang : Lang
            });
        }

    };
    EditModel.init();
})
