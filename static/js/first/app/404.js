/**
 * Created by sunchengbin on 16/10/8.
 */
require(['ajax','config'],function(Ajax,Config) {
    var ERROR = {
        init : function() {
            this.handelFn();
        },
        handelFn : function(){
            $('body').on('click','.j_error',function(){
                var _data = {
                    "edata": {
                        '404log':{
                            time : new Date(),
                            logo : localStorage
                        }
                    }
                };
                Ajax.postJsonp({
                    url: Config.actions.errorAction,
                    data: {param: JSON.stringify(_data)},
                    type: 'POST',
                    success: function (obj) {
                        if(obj.code == 200){
                            alert('Pelaporan Berhasil');
                        }else{
                            alert('Pelaporan Gagal');
                        }

                    },
                    error : function(obj){
                        alert('Pelaporan Gagal');
                    }
                });
            });

        }
    };
    ERROR.init();
})
