define("config",[],function(){var e=location.protocol,t=location.hostname,n={host:{hostUrl:e+"//"+t+"/html/",host:e+"//"+t+"/",imgUrl:e+"//static-test.instashop.co.id/images",hrefUrl:e+"//"+t+"/html/",hrefHost:e+"//"+t+"/html",actionUrl:"https://apip-test.instashop.co.id/instashop/",imHost:"http://10.5.15.10:2000",imUserNameHost:"http://10.5.15.10:2040/",phpHost:"http://10.5.15.10:8888/instashop/instashop/im/"},actions:{setUserName:"set_user_memo",getUserInfo:"getUserInfo",shopList:"v1/shops/",testCart:"v1/carts/",orderConfirm:"v1/orders",imNum:"v1/im/",expressesList:"v1/expresses/",uploadprove:"v1/evidence",errorAction:"v1/h5log",feedBack:"v1/feedback",domainName:"v1/domain",instagramcheck:"v1/items"}};return n}),define("base",[],function(){var e={version:"1.0",dom:{},num:{},arr:{},str:{},reg:{},others:{}};return e.dom={getFrameContent:function(e){var t=document,n=navigator;return n.userAgent.indexOf("MSIE")!=-1?t.frames[e].document.body.innerHTML:t.getElementById(e).contentDocument.body.innerHTML},limitIsNum:function(e,t){var n=Number($.trim(e.val()));e.unbind("blur").bind("blur",function(){var e=$(this),r=$.trim(e.val());n=isNaN(r)||Number(r)<0?n:r,e.val(n),t&&t.call(e,n)})}},e.str={charLength:function(e){var t=0,n=0;for(;n<e.length;n++)/^[\u0000-\u00ff]$/.test(e.charAt(n))?t+=1:t+=2;return t}},e.num={transToFloat:function(e,t){if(isNaN(e)){alert("请传数字");return}return e=Number(e),parseInt(e*Math.pow(10,t)+.5)/Math.pow(10,t)}},e.arr={unique:function(t){if(!e.others.isArray(t)){alert("请传入数组");return}var n=[],r={},i=0;for(;i<t.length;i++)r[t[i]]||(n.push(t[i]),r[t[i]]=1);return n}},e.others={zIndex:2015,jsonToStr:function(e){var t=[];if(typeof e=="string")return'"'+e.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+'"';if(typeof e=="object"){if(!e.sort){for(var n in e)t.push('"'+n+'"'+":"+arguments.callee(e[n]));t="{"+t.join()+"}"}else{for(var n=0;n<e.length;n++)t.push(arguments.callee(e[n]));t="["+t.join()+"]"}return t}return e.toString()},ascFn:function(e,t){function n(e,n){return e[t]-n[t]}return e.sort(n)},descFn:function(e,t){function n(e,n){return n[t]-e[t]}return e.sort(n)},getUrlPrem:function(e,t){var n=t||document.location.search,r=new RegExp("[?&]"+e+"=([^&]+)","g"),i=r.exec(n),s=null;if(null!=i)try{s=decodeURIComponent(decodeURIComponent(i[1]))}catch(o){try{s=decodeURIComponent(i[1])}catch(o){s=i[1]}}return s},setInterval:function(e,t){var n=this;n.interval=!0,setTimeout(function(){var r=arguments;e.call(n,function(e){e.call(n),n.interval&&setTimeout(r.callee,t)})},t)},clone:function(e){var t=function(){};return t.prototype=e,new t},extend:function(e,t){var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.chirld=t.prototype,t.prototype.constructor==Object.prototype.constructor&&(t.prototype.constructor=t)},verifyBower:function(){var e=navigator.userAgent;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&e.indexOf("KHTML")==-1,mobile:!!e.match(/AppleWebKit.*Mobile/i)||!!e.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,iPhone:e.indexOf("iPhone")>-1||e.indexOf("Mac")>-1,iPad:e.indexOf("iPad")>-1,webApp:e.indexOf("Safari")==-1}},webpLog:function(){return!0},getImageUrl:function(e,t){var n=function(){var e=navigator.userAgent,t=e.match(/(android) ([\.\d]+)/i)||[],n=e.match(/(ucweb|opera|chrome|mozilla|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[],r=n[1].toLowerCase(),i=n[2],s;if(t.length>0){var o=t[2].replace(/\./g,"");o.length==2&&(o+="0");var u=parseInt(o);if(r=="chrome"){s=parseInt(i.split(".")[0]);if(s>=46)return!0}else if(r=="ucweb"){s=parseInt(i.replace(/\./g,""));if(s>=99)return!0}else if(r=="mozilla"&&u>410)return!0}return!1},r=this;return e},cutImg:function(e,t,n){var r=t?t:$(window).width(),i=this;r+=100,r=r>640?640:r;var s=location.protocol;return e=/https/g.test(s)?e.replace(/http/,"https"):e,n?e=e+"?w="+r:(/w\=\d+/g.test(e)?(e=e.replace(/w\=\d+/g,"w="+r),e=e.replace(/h\=\d+/g,"h="+r)):/\?/g.test(e)?e=e+"&w="+r+"&h="+r:e=e+"?w="+r+"&h="+r,/cp\=/g.test(e)||(e+="&cp=1")),i.getImageUrl(e,!0)},isArray:function(e){return typeof Array.isArray=="function"?Array.isArray(e):Object.prototype.toString.call(e)==="[object Array]"},each:function(e,t){var n=0,r=e.length;if(!this.isArray(e))throw new Error("not Array");for(n;n<r;n++)t&&t(e[n],n)},priceFormat:function(e){if(e<0)return 0;var e,t=[];return e=""+e,e=e.split(".")[0],e=e.split("").reverse(),this.each(e,function(e,n){n&&n%3===0&&t.push("."),t.push(e)}),t=t.reverse().join(""),t},testObject:function(e){var t=!0;if(typeof e=="object")for(var n in e)e.hasOwnProperty(n)&&(t=!1);else console.log("请传object"),t=!1;return t},getCookie:function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null},isCustomHost:function(){var e=location.hostname;return/[^m\.instashop\.co\.id | m\-test\.instashop\.co\.id]/g.test(e)?!0:!1},transTxt:function(e){return e.replace(/\n/g,"<br>")},isInsBrowser:function(){return/Instashop/g.test(navigator.userAgent)}},e}),define("ajax",["config","base"],function(e,t){var n=t.others.getUrlPrem("_debug_env"),r={getJsonp:function(e,r,i){var s=t.others.getUrlPrem("param",e)?JSON.parse(t.others.getUrlPrem("param",e)):null;s&&n&&(s.edata._debug_env=n,e=e.split("?")[0],e=e+"?param="+JSON.stringify(s)),$.ajax({url:e+"&callback=?",dataType:"JSONP",success:function(e){r(e)},error:function(e){i&&i(e)}})},postJsonp:function(t){var r=t.data.param?JSON.parse(t.data.param).edata:null;r&&n&&(r._debug_env=n,t.data.param=JSON.stringify({edata:r}));var r={url:e.host.hostUrl+"router/api.php?_path_="+t.url,dataType:"JSON",data:t.data,type:"POST",headers:{"X-Http-Method-Override":t.type||"PUT"},success:function(e){t.success&&t.success(JSON.parse(e))},error:function(e){t.error&&t.error(e)}};t.timeout&&(r.timeout=t.timeout),$.ajax(r)},transData:function(e){var t={};return e.client_uuid=localStorage.getItem("ClientUuid"),t.edata=e,t}};return r}),cdnjsTime=(new Date).getTime()-startTime,orderStart=(new Date).getTime(),console.log("usertest"+cdnjsTime),require(["ajax"],function(e){if(getUrlPrem("order")){var t={edata:{wduss:"",address_id:"0",note:"",pay_way:"13",pay_type:0,seller_id:"194267",buyer_id:"0",buyer_note:"",express_company:"JNE",express_fee_id:"15041",items:[{itemID:"7457",itemName:"#TBT: Supercute collection of vintage #HelloKitty ceramic banks spotted at #SanrioHQ!",itemNum:1,discount_id:0}],buyer_address:{name:"SunTestOrderConfirm",telephone:"85693543785",post:"",country_code:"62",email:"",address:{province:"Bali",city:"Kab. Buleleng",country:"Kubutambahan",street:"qreqeqwe"}},frm:2}};e.postJsonp({url:"v1/orders",data:{param:JSON.stringify(t)},type:"POST",success:function(e){console.log(e.code),console.log("orderconfirm"+((new Date).getTime()-orderStart))},error:function(e){}})}}),define("app/usertest",function(){});