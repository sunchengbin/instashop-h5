/**
 * Created by sunchengbin on 16/10/8.
 */
require(['ajax','config'],function(Ajax,Config) {
    var OD = {
        init : function() {
            Ajax.postJsonp({
                url: Config.actions.orderConfirm,
                data: {param: JSON.stringify(_data)},
                type: 'POST',
                success: function (obj) {

                },
                error : function(obj){

                }
            });
        }
    };
    OD.init();
})
