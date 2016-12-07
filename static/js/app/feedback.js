/**
 * Created by sunchengbin on 16/10/13.
 */
require(['ajax','config','dialog','lang','common'],function(Ajax,Config,Dialog,Lang,Common){
    function getRequestParam(param) {
        var value;
        var uri = window.location.href;
        value = uri.match(new RegExp('[\?\&]' + param + '=([^\&\#]*)([\&\#]?)', 'i'));
        return value ? decodeURIComponent(value[1]) : value;
    }
    $('#f-submit').on('click',function(){
        var _seller_info = Common.getUrlSellerInfo(),
            _seller_id = _seller_info.seller_id,
            _wduss = _seller_info.wduss,
            _contact = $('#contact').val(),
            _content = $('#content').val();
        alert(location.href);
        if (!_content) {
            $('#error').show();
            return false;
        }else{
            $('#error').hide();
        }
        var reqData = {
            edata : {
                contact : _contact,
                content : _content,
                seller_id : _seller_id,
                wduss : _wduss
            }
        };
        Ajax.postJsonp({
            url :Config.actions.feedBack,
            data : {param:JSON.stringify(reqData)},
            type : 'POST',
            success : function(obj){
                if(obj.code == 200){
                    Dialog.alert({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">Terima kasih atas masukanmu, tim Instashop akan segera menghubungimu.</p>',
                        cf_fn : function(){
                            location.reload();
                        }
                    });
                }else{
                    Dialog.tip({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">'+obj.message+'</p>',
                        auto_fn : function(){
                            setTimeout(function(){
                                location.reload();
                            },2000);
                        }
                    });
                }
            },
            error : function(error){
                Dialog.alert({
                    top_txt : '',//可以是html
                    cfb_txt:Lang.H5_FRESHEN,
                    body_txt : '<p class="dialog-body-p">'+Lang.H5_ERROR+'</p>',
                    cf_fn : function(){
                        location.reload();
                    }
                });
            }
        });
    });

})