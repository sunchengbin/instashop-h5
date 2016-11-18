/**
 * Created by sunchengbin on 16/8/4.
 */
cdnjsTime = (new Date).getTime() - startTime;
orderStart = (new Date).getTime();
console.log('usertest' + cdnjsTime);
require(['ajax'],function(Ajax){
    if(getUrlPrem('order')){
        var _data = {"edata":{"wduss":"","address_id":"0","note":"","pay_way":"13","pay_type":0,"seller_id":"194267","buyer_id":"0","buyer_note":"","express_company":"JNE","express_fee_id":"15041","items":[{"itemID":"7457","itemName":"#TBT: Supercute collection of vintage #HelloKitty ceramic banks spotted at #SanrioHQ!","itemNum":1,"discount_id":0}],"buyer_address":{"name":"SunTestOrderConfirm","telephone":"85693543785","post":"","country_code":"62","email":"","address":{"province":"Bali","city":"Kab. Buleleng","country":"Kubutambahan","street":"qreqeqwe"}},"frm":2}};
        Ajax.postJsonp({
            url :'v1/orders',
            data : {param:JSON.stringify(_data)},
            type : 'POST',
            success : function(obj){
                console.log(obj.code);
                console.log('orderconfirm'+((new Date).getTime()-orderStart));
            },
            error : function(error){

            }
        });
    }

})