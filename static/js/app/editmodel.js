/**
 * Created by sunchengbin on 2016/11/10.
 * 店铺装修首页
 */
require(['base','lazyload','insjs','fastclick','config','hbs','text!views/moudle/model/signage.hbs','text!views/moudle/model/staticbanner.hbs','text!views/moudle/model/itemmodel.hbs'],function(Base,Lazyload,Insjs,FastClick,Config,Hbs,SignageHtm,StaticBannerHtm,Itemmodel){
    var EditModel = {
        init : function(){
            var _this = this;
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
            if(!bridge){
                //location.reload();
                return;
            }
            _this.registerFn(bridge);
            FastClick.attach(document.body);
            $('body').on('click','.j_insert_model',function(){
                var _dom = $(this),
                    _index = $('.j_insert_model').index(_dom);
                console.log(_index);
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
                var _dom = $(this),
                    _index = $('.j_edit_model').index(_dom);
                console.log(_index);
                var _param = {
                    param:{
                        type:'edit_model',
                        param:{
                            index : _index,
                            type:'static_banner',
                            data: [{img:'',link_url:''}]
                        }
                    }
                };
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

            });
            $('body').on('click','.j_moveup_model',function(){

            });
        },
        registerFn : function(bridge){
            bridge.registerHandler('registerSocket', function(data, responseCallback) {
                alert(data);
                var responseData = JSON.parse(data).result;
                alert(responseData);
                responseCallback(responseData);
            });
        },
        initHtml : function(){
            var _this = this,
                _html = '';
            _html+= _this.createModelHtm()+_this.createInsertHtm()+_this.defaultItemsHtm();
            $('body').prepend(_html);
        },
        createInsertHtm : function(){
            return '<div class="insert-box"><button class="handle-btn insert-btn">Insert ad rotation</button></div>'
        },
        defaultItemsHtm : function(){
            return Hbs.compile(Itemmodel)({
                data : {shop:init_data}
            });
        },
        createModelHtm : function(){
            var _this = this;
            return _this.createSignageHtm()+_this.staticBannerHtm();
        },
        createSignageHtm : function(){
            return Hbs.compile(SignageHtm)({
                data : {shop:init_data}
            });
        },
        staticBannerHtm : function(){
            return Hbs.compile(StaticBannerHtm)({
                name : 'static-banner'
            });
        },
        rotateBannerHtm : function(){

        },
        twoListBannerHtm : function(){

        },
        imgNavigationHtm : function(){

        },
        textNavigationHtm : function(){

        },
        twoLiItemsHtm : function(){

        },
        bigImgItem : function(){

        },
        listItems : function(){

        }
    };
    EditModel.init();
})
