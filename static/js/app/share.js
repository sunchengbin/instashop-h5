/**
 * Created by sunchengbin on 2016/11/21.
 */
require(['insjs','fastclick','config'],function(Insjs,FastClick,Config){
    var Share = {
        init : function(){
            var _this = this;
            Insjs.WebOnReady(function(bridge){
                _this.handelFn(bridge);
            },function(){
                _this.handelFn();
            });
        },
        handelFn : function(bridge){
            $('body').on('click','.j_share_btn',function(){
                var _dom = $(this),
                    _type = _dom.attr('data-type');
                var _param = {
                    param:{
                        type : 'share',
                        param : {
                            type : _type,
                            data : [{
                                img : '',
                                content:'',
                                link_url:''
                            }]
                        }
                    }
                };
                bridge.callHandler('insSocket',_param, function(response) {
                    return null;
                });
            });
        }
    };
    Share.init();

})