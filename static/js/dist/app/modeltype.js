/**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

define("base",[],function(){var e={version:"1.0",dom:{},num:{},arr:{},str:{},reg:{},others:{}};return e.dom={getFrameContent:function(e){var t=document,n=navigator;return n.userAgent.indexOf("MSIE")!=-1?t.frames[e].document.body.innerHTML:t.getElementById(e).contentDocument.body.innerHTML},limitIsNum:function(e,t){var n=Number($.trim(e.val()));e.unbind("blur").bind("blur",function(){var e=$(this),r=$.trim(e.val());n=isNaN(r)||Number(r)<0?n:r,e.val(n),t&&t.call(e,n)})}},e.str={charLength:function(e){var t=0,n=0;for(;n<e.length;n++)/^[\u0000-\u00ff]$/.test(e.charAt(n))?t+=1:t+=2;return t}},e.num={transToFloat:function(e,t){if(isNaN(e)){alert("请传数字");return}return e=Number(e),parseInt(e*Math.pow(10,t)+.5)/Math.pow(10,t)}},e.arr={unique:function(t){if(!e.others.isArray(t)){alert("请传入数组");return}var n=[],r={},i=0;for(;i<t.length;i++)r[t[i]]||(n.push(t[i]),r[t[i]]=1);return n}},e.others={zIndex:2015,jsonToStr:function(e){var t=[];if(typeof e=="string")return'"'+e.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+'"';if(typeof e=="object"){if(!e.sort){for(var n in e)t.push('"'+n+'"'+":"+arguments.callee(e[n]));t="{"+t.join()+"}"}else{for(var n=0;n<e.length;n++)t.push(arguments.callee(e[n]));t="["+t.join()+"]"}return t}return e.toString()},ascFn:function(e,t){function n(e,n){return e[t]-n[t]}return e.sort(n)},descFn:function(e,t){function n(e,n){return n[t]-e[t]}return e.sort(n)},getUrlPrem:function(e,t){var n=t||document.location.search,r=new RegExp("[?&]"+e+"=([^&]+)","g"),i=r.exec(n),s=null;if(null!=i)try{s=decodeURIComponent(decodeURIComponent(i[1]))}catch(o){try{s=decodeURIComponent(i[1])}catch(o){s=i[1]}}return s},setInterval:function(e,t){var n=this;n.interval=!0,setTimeout(function(){var r=arguments;e.call(n,function(e){e.call(n),n.interval&&setTimeout(r.callee,t)})},t)},clone:function(e){var t=function(){};return t.prototype=e,new t},extend:function(e,t){var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.chirld=t.prototype,t.prototype.constructor==Object.prototype.constructor&&(t.prototype.constructor=t)},verifyBower:function(){var e=navigator.userAgent;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&e.indexOf("KHTML")==-1,mobile:!!e.match(/AppleWebKit.*Mobile/i)||!!e.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,iPhone:e.indexOf("iPhone")>-1||e.indexOf("Mac")>-1,iPad:e.indexOf("iPad")>-1,webApp:e.indexOf("Safari")==-1}},webpLog:function(){return!0},getImageUrl:function(e,t){var n=function(){var e=navigator.userAgent,t=e.match(/(android) ([\.\d]+)/i)||[],n=e.match(/(ucweb|opera|chrome|mozilla|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[],r=n[1].toLowerCase(),i=n[2],s;if(t.length>0){var o=t[2].replace(/\./g,"");o.length==2&&(o+="0");var u=parseInt(o);if(r=="chrome"){s=parseInt(i.split(".")[0]);if(s>=46)return!0}else if(r=="ucweb"){s=parseInt(i.replace(/\./g,""));if(s>=99)return!0}else if(r=="mozilla"&&u>410)return!0}return!1},r=this;return e},cutImg:function(e,t,n){var r=t?t:$(window).width(),i=this;r+=100,r=r>640?640:r;var s=location.protocol;return e=/https/g.test(s)?e.replace(/http/,"https"):e,n?e=e+"?w="+r:(/w\=\d+/g.test(e)?(e=e.replace(/w\=\d+/g,"w="+r),e=e.replace(/h\=\d+/g,"h="+r)):/\?/g.test(e)?e=e+"&w="+r+"&h="+r:e=e+"?w="+r+"&h="+r,/cp\=/g.test(e)||(e+="&cp=1")),i.getImageUrl(e,!0)},isArray:function(e){return typeof Array.isArray=="function"?Array.isArray(e):Object.prototype.toString.call(e)==="[object Array]"},each:function(e,t){var n=0,r=e.length;if(!this.isArray(e))throw new Error("not Array");for(n;n<r;n++)t&&t(e[n],n)},priceFormat:function(e){if(e<0)return 0;var e,t=[];return e=""+e,e=e.split(".")[0],e=e.split("").reverse(),this.each(e,function(e,n){n&&n%3===0&&t.push("."),t.push(e)}),t=t.reverse().join(""),t},testObject:function(e){var t=!0;if(typeof e=="object")for(var n in e)e.hasOwnProperty(n)&&(t=!1);else console.log("请传object"),t=!1;return t},getCookie:function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null},isCustomHost:function(){var e=location.hostname;return/[^m\.instashop\.co\.id | m\-test\.instashop\.co\.id]/g.test(e)?!0:!1},transTxt:function(e){return e.replace(/\n/g,"<br>")},isInsBrowser:function(){return/Instashop/g.test(navigator.userAgent)}},e}),define("insjs",[],function(){var e=window,t={WebOnReady:function(e,t){var n=this;/Instashop/g.test(navigator.userAgent)?n.connectWebViewBridge(function(t){e&&e(t)}):t&&t()},connectWebViewBridge:function(t){if(/ios/g.test(navigator.userAgent)){if(e.WebViewJavascriptBridge)return t(WebViewJavascriptBridge);if(e.WVJBCallbacks)return e.WVJBCallbacks.push(t);e.WVJBCallbacks=[t];var n=document.createElement("iframe");n.style.display="none",n.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(n),setTimeout(function(){document.documentElement.removeChild(n)},0)}else e.WebViewJavascriptBridge?t(WebViewJavascriptBridge):document.addEventListener("WebViewJavascriptBridgeReady",function(){t(WebViewJavascriptBridge)},!1)}};return t}),function(){function e(t,r){function s(e,t){return function(){return e.apply(t,arguments)}}var i;r=r||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=r.touchBoundary||10,this.layer=t,this.tapDelay=r.tapDelay||200,this.tapTimeout=r.tapTimeout||700;if(e.notNeeded(t))return;var o=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],u=this;for(var a=0,f=o.length;a<f;a++)u[o[a]]=s(u[o[a]],u);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,r){var i=Node.prototype.removeEventListener;e==="click"?i.call(t,e,n.hijacked||n,r):i.call(t,e,n,r)},t.addEventListener=function(e,n,r){var i=Node.prototype.addEventListener;e==="click"?i.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(t,e,n,r)}),typeof t.onclick=="function"&&(i=t.onclick,t.addEventListener("click",function(e){i(e)},!1),t.onclick=null)}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,r=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,i=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=r&&/OS [6-7]_\d/.test(navigator.userAgent),o=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(r&&e.type==="file"||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&e.tagName.toLowerCase()==="select"?"mousedown":"click"},e.prototype.focus=function(e){var t;r&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"&&e.type!=="month"?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;t=e.fastClickScrollParent;if(!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,s;if(e.targetTouches.length>1)return!0;t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0];if(r){s=window.getSelection();if(s.rangeCount&&!s.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){if(!this.trackingClick)return!0;if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))this.trackingClick=!1,this.targetElement=null;return!0},e.prototype.findControl=function(e){return e.control!==undefined?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,o,u,a,f,l=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,o=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s&&(f=e.changedTouches[0],l=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),u=l.tagName.toLowerCase();if(u==="label"){t=this.findControl(l);if(t){this.focus(l);if(n)return!1;l=t}}else if(this.needsFocus(l)){if(e.timeStamp-o>100||r&&window.top!==window&&u==="input")return this.targetElement=null,!1;this.focus(l),this.sendClick(l,e);if(!r||u!=="select")this.targetElement=null,e.preventDefault();return!1}if(r&&!i){a=l.fastClickScrollParent;if(a&&a.fastClickLastScrollTop!==a.scrollTop)return!0}return this.needsClick(l)||(e.preventDefault(),this.sendClick(l,e)),!1},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):e.target.type==="submit"&&e.detail===0?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,r,i,s;if(typeof window.ontouchstart=="undefined")return!0;r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(r){if(!n)return!0;t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1)return!0;if(r>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(o){i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);if(i[1]>=10&&i[2]>=3){t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1)return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}}}if(e.style.msTouchAction==="none"||e.style.touchAction==="manipulation")return!0;s=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(s>=27){t=document.querySelector("meta[name=viewport]");if(t&&(t.content.indexOf("user-scalable=no")!==-1||document.documentElement.scrollWidth<=window.outerWidth))return!0}return e.style.touchAction==="none"||e.style.touchAction==="manipulation"?!0:!1},e.attach=function(t,n){return new e(t,n)},typeof define=="function"&&typeof define.amd=="object"&&define.amd?define("fastclick",[],function(){return e}):typeof module!="undefined"&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e}(),define("config",[],function(){var e=location.protocol,t=location.hostname,n={host:{hostUrl:e+"//"+t+"/html/",host:e+"//"+t+"/",imgUrl:e+"//static-test.instashop.co.id/images",hrefUrl:e+"//"+t+"/html/",hrefHost:e+"//"+t+"/html",actionUrl:"https://apip-test.instashop.co.id/instashop/",imHost:"http://10.5.15.10:2000",imUserNameHost:"http://10.5.15.10:2040/",phpHost:"http://10.5.15.10:8888/instashop/instashop/im/"},actions:{setUserName:"set_user_memo",getUserInfo:"getUserInfo",shopList:"v1/shops/",testCart:"v1/carts/",orderConfirm:"v1/orders",imNum:"v1/im/",expressesList:"v1/expresses/",uploadprove:"v1/evidence",errorAction:"v1/h5log",feedBack:"v1/feedback",domainName:"v1/domain",sortAction:"v1/tag/",saveTemplate:"v1/shopsTemplate"}};return n}),require(["base","insjs","fastclick","config"],function(e,t,n,r){var i={init:function(){var e=this;t.WebOnReady(function(t){e.handelFn(t)},function(){e.handelFn()})},handelFn:function(t){var r=this;n.attach(document.body),$("body").on("click",".j_model_type",function(){var n=$(this).attr("data-type"),r=e.others.getUrlPrem("index"),i={param:{type:"edit_model",param:{index:r,type:n,data:[]}}};t.callHandler("insSocket",i,function(e){return null})}),function(e,t){var n={init:function(){this.bind(),this.switchTap(null,"imageads")},changeId:function(e){var n=t.querySelectorAll(".decorate-sample-panel")||[],r=t.querySelectorAll(".decorate-sample-tab-item")||[];for(var i=0;i<r.length;i++)r[i].className=r[i].className.replace("decorate-sample-tab-active","");for(var i=0;i<n.length;i++)n[i].style.display="none";t.querySelector("#"+e).style.display="block"},switchTap:function(e,t){var n=this,r="";!!e&&e.target?(r=e.target.getAttribute("data-tabid")||"imageads",n.changeId(r),e.target.className=" decorate-sample-tab-item decorate-sample-tab-active"):(n.changeId(t),document.querySelectorAll(".decorate-sample-tab-item")&&(document.querySelectorAll(".decorate-sample-tab-item")[0].className="decorate-sample-tab-item decorate-sample-tab-active"))},bind:function(){var e=this;t.querySelector(".decorate-sample-tab").addEventListener("click",function(t){e.switchTap(t)})}};n.init()}(window,document)}};i.init()}),define("app/modeltype",function(){});