define("config",[],function(){var e=location.protocol,t={host:{hostUrl:e+"//m-test.instashop.co.id/html/",host:e+"//m-test.instashop.co.id/",imgUrl:e+"//m-test.instashop.co.id/static/images",hrefUrl:e+"//m-test.instashop.co.id/html/",hrefHost:e+"//m-test.instashop.co.id/html",actionUrl:"https://apip-test.instashop.co.id/instashop/",imHost:"http://10.5.15.10:2000",imUserNameHost:"http://10.5.15.10:2040/",phpHost:"http://10.5.15.10:8888/instashop/instashop/im/"},linkUrl:{index:"s/",item:"detail/",cart:"html/cart.html",orderConfirm:"html/orderconfirm.html",address:"html/address.html"},actions:{setUserName:"set_user_memo",getUserInfo:"getUserInfo",shopList:"v1/shops/",testCart:"v1/carts/",orderConfirm:"v1/orders",imNum:"v1/im/",expressesList:"v1/expresses/"},actionType:{REQUEST_LOGIN:"REQUEST_LOGIN",LOGIN_SUCCESS:"LOGIN_SUCCESS",START_INPUT_CHAT:"START_INPUT_CHAT",END_INPUT_CHAT:"END_INPUT_CHAT",LISTENING:"LISTENING",RECEIVE_MSG:"RECEIVE_MSG",REQUEST_SEND_MESSAGE:"REQUEST_SEND_MESSAGE",ON_INPUT_CHAT:"ON_INPUT_CHAT",EMPTY_TEXT_INPUT:"EMPTY_TEXT_INPUT",REQUEST_HISTORY_MESSAGE:"REQUEST_HISTORY_MESSAGE",RECEIVE_HISTORY_MESSAGE:"RECEIVE_HISTORY_MESSAGE",RECEIVE_USER_INFO:"RECEIVE_USER_INFO",MAP_IM_UID_TO_UID:"MAP_IM_UID_TO_UID",SHOW_LOADING:"SHOW_LOADING",HIDE_LOADING:"HIDE_LOADING",SHOW_ADDRESS_FROM:"SHOW_ADDRESS_FROM",HIDE_ADDRESS_FORM:"HIDE_ADDRESS_FORM",UPLOAD_START:"UPLOAD_START",UPLOAD_FINISHED:"UPLOAD_FINISHED",REQUEST_WELCOME_MESSAGE:"REQUEST_WELCOME_MESSAGE",SAY_HELLO:"SAY_HELLO"},userCmds:{MAIN:"user",LOGIN:"login",KICKOUT:"kickout"},msgCmds:{MAIN:"msg",GET_HISTORY_MSG:"get_history_msg",CLEAR_UNREAD:"clear_unread",SEND_NOTIFY:"send_notify",SEND_ACK:"send_ack",SEND:"send"}};return t}),define("ajax",["config"],function(e){var t={getJsonp:function(e,t,n){$.ajax({url:e+"&callback=?",dataType:"JSONP",success:function(e){t(e)},error:function(e){n&&n(e)}})},postJsonp:function(t){$.ajax({url:e.host.hostUrl+"router/api.php?_path_="+t.url,dataType:"JSON",data:t.data,type:"POST",headers:{"X-Http-Method-Override":t.type||"PUT"},success:function(e){t.success&&t.success(JSON.parse(e))},error:function(e){t.error&&t.error(e)}})},transData:function(e){var t={};return e.client_uuid=localStorage.getItem("ClientUuid"),t.edata=e,t}};return t}),cdnjsTime=(new Date).getTime()-startTime,orderStart=(new Date).getTime(),console.log("usertest"+cdnjsTime),require(["ajax"],function(e){if(getUrlPrem("order")){var t={edata:{wduss:"",address_id:"0",note:"",pay_way:"13",pay_type:0,seller_id:"194267",buyer_id:"0",buyer_note:"",express_company:"JNE",express_fee_id:"15041",items:[{itemID:"7457",itemName:"#TBT: Supercute collection of vintage #HelloKitty ceramic banks spotted at #SanrioHQ!",itemNum:1,discount_id:0}],buyer_address:{name:"SunTestOrderConfirm",telephone:"85693543785",post:"",country_code:"62",email:"",address:{province:"Bali",city:"Kab. Buleleng",country:"Kubutambahan",street:"qreqeqwe"}},frm:2}};e.postJsonp({url:"v1/orders",data:{param:JSON.stringify(t)},type:"POST",success:function(e){console.log(e.code),console.log("orderconfirm"+((new Date).getTime()-orderStart))},error:function(e){}})}}),define("app/usertest",function(){});