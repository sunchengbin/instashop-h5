define("config",[],function(){var e=location.protocol,t=location.hostname,n={host:{hostUrl:e+"//"+t+"/html/",host:e+"//"+t+"/",imgUrl:e+"//"+t+"/static/images",hrefUrl:e+"//"+t+"/html/",hrefHost:e+"//"+t+"/html",actionUrl:"https://apip.instashop.co.id/instashop/",imHost:"http://218.213.86.206",phpHost:"http://api.instashop.co.id/instashop/instashop/im/",imUserNameHost:"http://218.213.86.206:2040/"},linkUrl:{index:"s/",item:"detail/",cart:"html/cart.html",orderConfirm:"html/orderconfirm.html",address:"html/address.html"},actions:{setUserName:"set_user_memo",getUserInfo:"getUserInfo",shopList:"v1/shops/",testCart:"v1/carts/",orderConfirm:"v1/orders",imNum:"v1/im/",expressesList:"v1/expresses/",uploadprove:"v1/evidence",errorAction:"v1/h5log"},actionType:{REQUEST_LOGIN:"REQUEST_LOGIN",LOGIN_SUCCESS:"LOGIN_SUCCESS",START_INPUT_CHAT:"START_INPUT_CHAT",END_INPUT_CHAT:"END_INPUT_CHAT",LISTENING:"LISTENING",RECEIVE_MSG:"RECEIVE_MSG",REQUEST_SEND_MESSAGE:"REQUEST_SEND_MESSAGE",ON_INPUT_CHAT:"ON_INPUT_CHAT",EMPTY_TEXT_INPUT:"EMPTY_TEXT_INPUT",REQUEST_HISTORY_MESSAGE:"REQUEST_HISTORY_MESSAGE",RECEIVE_HISTORY_MESSAGE:"RECEIVE_HISTORY_MESSAGE",RECEIVE_USER_INFO:"RECEIVE_USER_INFO",MAP_IM_UID_TO_UID:"MAP_IM_UID_TO_UID",SHOW_LOADING:"SHOW_LOADING",HIDE_LOADING:"HIDE_LOADING",SHOW_ADDRESS_FROM:"SHOW_ADDRESS_FROM",HIDE_ADDRESS_FORM:"HIDE_ADDRESS_FORM",UPLOAD_START:"UPLOAD_START",UPLOAD_FINISHED:"UPLOAD_FINISHED",REQUEST_WELCOME_MESSAGE:"REQUEST_WELCOME_MESSAGE",SAY_HELLO:"SAY_HELLO"},userCmds:{MAIN:"user",LOGIN:"login",KICKOUT:"kickout"},msgCmds:{MAIN:"msg",GET_HISTORY_MSG:"get_history_msg",CLEAR_UNREAD:"clear_unread",SEND_NOTIFY:"send_notify",SEND_ACK:"send_ack",SEND:"send"}};return n}),define("ajax",["config"],function(e){var t={getJsonp:function(e,t,n){$.ajax({url:e+"&callback=?",dataType:"JSONP",success:function(e){t(e)},error:function(e){n&&n(e)}})},postJsonp:function(t){var n={url:e.host.hostUrl+"router/api.php?_path_="+t.url,dataType:"JSON",data:t.data,type:"POST",headers:{"X-Http-Method-Override":t.type||"PUT"},success:function(e){t.success&&t.success(JSON.parse(e))},error:function(e){t.error&&t.error(e)}};t.timeout&&(n.timeout=t.timeout),$.ajax(n)},transData:function(e){var t={};return e.client_uuid=localStorage.getItem("ClientUuid"),t.edata=e,t}};return t}),require(["ajax","config"],function(e,t){var n={init:function(){this.handelFn()},handelFn:function(){$("body").on("click",".j_error",function(){var n={edata:{"404log":{time:new Date,logo:localStorage}}};e.postJsonp({url:t.actions.errorAction,data:{param:JSON.stringify(n)},type:"POST",success:function(e){e.code==200?alert("Pelaporan Berhasil"):alert("Pelaporan Gagal")},error:function(e){alert("Pelaporan Gagal")}})})}};n.init()}),define("app/404",function(){});