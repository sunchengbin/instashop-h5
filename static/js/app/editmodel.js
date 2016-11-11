/**
 * Created by sunchengbin on 2016/11/10.
 * 店铺装修首页
 */
require(['base','insjs','fastclick','config'],function(Base,Insjs,FastClick,Config){
    var EditModel = {
        init : function(){
            var _this = this;
            //_this.initHtml(init_data);
            Insjs.WebOnReady(function(bridge){
                _this.handelFn(bridge);
            },function(){
                _this.handelFn();
            });
        },
        handelFn : function(bridge){
            var _this = this;
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
                            data  : {
                                type:'static_banner',
                                data: [{img:'',link_url:''}]
                            }
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
            bridge.registerHandler('registerSocket',data, function(responseCallback) {
                alert(data);
                responseCallback(responseData);
            });
        },
        initHtml : function(){

        },
        createModelHtm : function(){

        },
        staticBannerHtm : function(){

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
