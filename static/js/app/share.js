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
            FastClick.attach(document.body);
            $('body').on('click','.j_share_btn',function(){
                var _dom = $(this),
                    _type = _dom.attr('data-type');
                var _param = {
                    param:{
                        type : 'share',
                        param : {
                            type : _type,
                            data : [{
                                img : 'http://imghk0.geilicdn.com/test_instashop-1479194911269-1unadjust.jpg?w=500&h=500&cp=1',
                                content:'fenxiangceshifenxiangceshishsishsishsihfiadfhafenxiangceshishsishsishsihfiadfhashsishsishsihfiadfha',
                                link_url:'http://badelong7.test.instashop.co.id/1161354'
                            }]
                        }
                    }
                };
                bridge.callHandler('insSocket',_param, function(response) {
                    return null;
                });
            });
            $('body').on('click','.j_share_to_bbm',function(){
                alert('bbmi://api/share?message='+encodeURIComponent('Olshop_favoritku_lagi_bagi-bagi_kode_voucher_nih, klik_untuk_dapatkan_kode_voucher:_')+'http://badelong7.test.instashop.co.id/1161354');
                location.href = 'bbmi://api/share?message='+encodeURIComponent('Olshop_favoritku_lagi_bagi-bagi_kode_voucher_nih, klik_untuk_dapatkan_kode_voucher:_')+'http://badelong7.test.instashop.co.id/1161354';
            });
            $('body').on('click','.j_no_img',function(){
                var _dom = $(this),
                    _type = _dom.attr('data-type');
                var _param = {
                    param:{
                        type : 'share',
                        param : {
                            type : _type,
                            data : [{
                                img : '',
                                content:'fenxiangceshifenxiangceshishsishsishsihfiadfhafenxiangceshishsishsishsihfiadfhashsishsishsihfiadfha',
                                link_url:'http://badelong7.test.instashop.co.id/1161354'
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