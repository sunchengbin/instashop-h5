/**
 * Created by sunchengbin on 2016/11/11.
 * 选择模块类型
 */
require(['base','insjs','fastclick','config'],function(Base,Insjs,FastClick,Config){
    var ModelType = {
        init : function(){
            var _this = this;
            Insjs.WebOnReady(function(bridge){
                _this.handelFn(bridge);
            },function(){
                _this.handelFn();
            });
        },
        handelFn : function(bridge){
            var _this = this;
            FastClick.attach(document.body);
            $('body').on('click','.j_model_type',function(){
                var _type = $(this).attr('data-type'),
                    _index = Base.others.getUrlPrem('index');
                var _param = {
                    param:{
                        type:'edit_model',
                        param:{
                            index : _index,
                            type: _type,
                            data: []
                        }
                    }
                };
                bridge.callHandler('insSocket',_param, function(response) {
                    return null;
                });
            });
        }
    };
    ModelType.init();
})
