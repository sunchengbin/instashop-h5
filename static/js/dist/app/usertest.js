define("config",[],function(){var e=location.protocol,t=location.hostname,n={host:{hostUrl:e+"//"+t+"/html/",host:e+"//"+t+"/",imgUrl:e+"//static-test.instashop.co.id/images",hrefUrl:e+"//"+t+"/html/",hrefHost:e+"//"+t+"/html",actionUrl:"https://apip-test.instashop.co.id/instashop/",imHost:"http://10.5.15.10:2000",imUserNameHost:"http://10.5.15.10:2040/",phpHost:"http://10.5.15.10:8888/instashop/instashop/im/"},linkUrl:{index:"s/",item:"detail/",cart:"html/cart.html",orderConfirm:"html/orderconfirm.html",address:"html/address.html"},actions:{setUserName:"set_user_memo",getUserInfo:"getUserInfo",shopList:"v1/shops/",testCart:"v1/carts/",orderConfirm:"v1/orders",imNum:"v1/im/",expressesList:"v1/expresses/",uploadprove:"v1/evidence",errorAction:"v1/h5log",feedBack:"v1/feedback"}};return n}),define("ajax",["config"],function(e){var t={getJsonp:function(e,t,n){$.ajax({url:e+"&callback=?",dataType:"JSONP",success:function(e){t(e)},error:function(e){n&&n(e)}})},postJsonp:function(t){var n={url:e.host.hostUrl+"router/api.php?_path_="+t.url,dataType:"JSON",data:t.data,type:"POST",headers:{"X-Http-Method-Override":t.type||"PUT"},success:function(e){t.success&&t.success(JSON.parse(e))},error:function(e){t.error&&t.error(e)}};t.timeout&&(n.timeout=t.timeout),$.ajax(n)},transData:function(e){var t={};return e.client_uuid=localStorage.getItem("ClientUuid"),t.edata=e,t}};return t}),cdnjsTime=(new Date).getTime()-startTime,orderStart=(new Date).getTime(),console.log("usertest"+cdnjsTime),require(["ajax"],function(e){if(getUrlPrem("order")){var t={edata:{wduss:"",address_id:"0",note:"",pay_way:"13",pay_type:0,seller_id:"194267",buyer_id:"0",buyer_note:"",express_company:"JNE",express_fee_id:"15041",items:[{itemID:"7457",itemName:"#TBT: Supercute collection of vintage #HelloKitty ceramic banks spotted at #SanrioHQ!",itemNum:1,discount_id:0}],buyer_address:{name:"SunTestOrderConfirm",telephone:"85693543785",post:"",country_code:"62",email:"",address:{province:"Bali",city:"Kab. Buleleng",country:"Kubutambahan",street:"qreqeqwe"}},frm:2}};e.postJsonp({url:"v1/orders",data:{param:JSON.stringify(t)},type:"POST",success:function(e){console.log(e.code),console.log("orderconfirm"+((new Date).getTime()-orderStart))},error:function(e){}})}}),define("app/usertest",function(){});