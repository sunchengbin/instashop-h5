/**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

(function(){function e(t,r){function s(e,t){return function(){return e.apply(t,arguments)}}var i;r=r||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=r.touchBoundary||10,this.layer=t,this.tapDelay=r.tapDelay||200,this.tapTimeout=r.tapTimeout||700;if(e.notNeeded(t))return;var o=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],u=this;for(var a=0,f=o.length;a<f;a++)u[o[a]]=s(u[o[a]],u);n&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,r){var i=Node.prototype.removeEventListener;e==="click"?i.call(t,e,n.hijacked||n,r):i.call(t,e,n,r)},t.addEventListener=function(e,n,r){var i=Node.prototype.addEventListener;e==="click"?i.call(t,e,n.hijacked||(n.hijacked=function(e){e.propagationStopped||n(e)}),r):i.call(t,e,n,r)}),typeof t.onclick=="function"&&(i=t.onclick,t.addEventListener("click",function(e){i(e)},!1),t.onclick=null)}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,r=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,i=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=r&&/OS [6-7]_\d/.test(navigator.userAgent),o=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(r&&e.type==="file"||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,r;document.activeElement&&document.activeElement!==e&&document.activeElement.blur(),r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){return n&&e.tagName.toLowerCase()==="select"?"mousedown":"click"},e.prototype.focus=function(e){var t;r&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"&&e.type!=="month"?(t=e.value.length,e.setSelectionRange(t,t)):e.focus()},e.prototype.updateScrollParent=function(e){var t,n;t=e.fastClickScrollParent;if(!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}t&&(t.fastClickLastScrollTop=t.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(e){return e.nodeType===Node.TEXT_NODE?e.parentNode:e},e.prototype.onTouchStart=function(e){var t,n,s;if(e.targetTouches.length>1)return!0;t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0];if(r){s=window.getSelection();if(s.rangeCount&&!s.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}return this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay&&e.preventDefault(),!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;return Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n?!0:!1},e.prototype.onTouchMove=function(e){if(!this.trackingClick)return!0;if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))this.trackingClick=!1,this.targetElement=null;return!0},e.prototype.findControl=function(e){return e.control!==undefined?e.control:e.htmlFor?document.getElementById(e.htmlFor):e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,o,u,a,f,l=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,o=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s&&(f=e.changedTouches[0],l=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),u=l.tagName.toLowerCase();if(u==="label"){t=this.findControl(l);if(t){this.focus(l);if(n)return!1;l=t}}else if(this.needsFocus(l)){if(e.timeStamp-o>100||r&&window.top!==window&&u==="input")return this.targetElement=null,!1;this.focus(l),this.sendClick(l,e);if(!r||u!=="select")this.targetElement=null,e.preventDefault();return!1}if(r&&!i){a=l.fastClickScrollParent;if(a&&a.fastClickLastScrollTop!==a.scrollTop)return!0}return this.needsClick(l)||(e.preventDefault(),this.sendClick(l,e)),!1},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){return this.targetElement?e.forwardedTouchEvent?!0:e.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(e.stopImmediatePropagation?e.stopImmediatePropagation():e.propagationStopped=!0,e.stopPropagation(),e.preventDefault(),!1):!0:!0:!0},e.prototype.onClick=function(e){var t;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):e.target.type==="submit"&&e.detail===0?!0:(t=this.onMouse(e),t||(this.targetElement=null),t)},e.prototype.destroy=function(){var e=this.layer;n&&(e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0)),e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,r,i,s;if(typeof window.ontouchstart=="undefined")return!0;r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(r){if(!n)return!0;t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1)return!0;if(r>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(o){i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);if(i[1]>=10&&i[2]>=3){t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1)return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}}}if(e.style.msTouchAction==="none"||e.style.touchAction==="manipulation")return!0;s=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(s>=27){t=document.querySelector("meta[name=viewport]");if(t&&(t.content.indexOf("user-scalable=no")!==-1||document.documentElement.scrollWidth<=window.outerWidth))return!0}return e.style.touchAction==="none"||e.style.touchAction==="manipulation"?!0:!1},e.attach=function(t,n){return new e(t,n)},typeof define=="function"&&typeof define.amd=="object"&&define.amd?define("fastclick",[],function(){return e}):typeof module!="undefined"&&module.exports?(module.exports=e.attach,module.exports.FastClick=e):window.FastClick=e})(),define("base",[],function(){var e={version:"1.0",dom:{},num:{},arr:{},str:{},reg:{},others:{}};return e.dom={getFrameContent:function(e){var t=document,n=navigator;return n.userAgent.indexOf("MSIE")!=-1?t.frames[e].document.body.innerHTML:t.getElementById(e).contentDocument.body.innerHTML},limitIsNum:function(e,t){var n=Number($.trim(e.val()));e.unbind("blur").bind("blur",function(){var e=$(this),r=$.trim(e.val());n=isNaN(r)||Number(r)<0?n:r,e.val(n),t&&t.call(e,n)})}},e.str={charLength:function(e){var t=0,n=0;for(;n<e.length;n++)/^[\u0000-\u00ff]$/.test(e.charAt(n))?t+=1:t+=2;return t}},e.num={transToFloat:function(e,t){if(isNaN(e)){alert("请传数字");return}return e=Number(e),parseInt(e*Math.pow(10,t)+.5)/Math.pow(10,t)}},e.arr={unique:function(t){if(!e.others.isArray(t)){alert("请传入数组");return}var n=[],r={},i=0;for(;i<t.length;i++)r[t[i]]||(n.push(t[i]),r[t[i]]=1);return n}},e.others={zIndex:2015,jsonToStr:function(e){var t=[];if(typeof e=="string")return'"'+e.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+'"';if(typeof e=="object"){if(!e.sort){for(var n in e)t.push('"'+n+'"'+":"+arguments.callee(e[n]));t="{"+t.join()+"}"}else{for(var n=0;n<e.length;n++)t.push(arguments.callee(e[n]));t="["+t.join()+"]"}return t}return e.toString()},ascFn:function(e,t){function n(e,n){return e[t]-n[t]}return e.sort(n)},descFn:function(e,t){function n(e,n){return n[t]-e[t]}return e.sort(n)},getUrlPrem:function(e,t){var n=t||document.location.search,r=new RegExp("[?&]"+e+"=([^&]+)","g"),i=r.exec(n),s=null;if(null!=i)try{s=decodeURIComponent(decodeURIComponent(i[1]))}catch(o){try{s=decodeURIComponent(i[1])}catch(o){s=i[1]}}return s},setInterval:function(e,t){var n=this;n.interval=!0,setTimeout(function(){var r=arguments;e.call(n,function(e){e.call(n),n.interval&&setTimeout(r.callee,t)})},t)},clone:function(e){var t=function(){};return t.prototype=e,new t},extend:function(e,t){var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.chirld=t.prototype,t.prototype.constructor==Object.prototype.constructor&&(t.prototype.constructor=t)},verifyBower:function(){var e=navigator.userAgent;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&e.indexOf("KHTML")==-1,mobile:!!e.match(/AppleWebKit.*Mobile/i)||!!e.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,iPhone:e.indexOf("iPhone")>-1||e.indexOf("Mac")>-1,iPad:e.indexOf("iPad")>-1,webApp:e.indexOf("Safari")==-1}},webpLog:function(){return!0},getImageUrl:function(e,t){var n=function(){var e=navigator.userAgent,t=e.match(/(android) ([\.\d]+)/i)||[],n=e.match(/(ucweb|opera|chrome|mozilla|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[],r=n[1].toLowerCase(),i=n[2],s;if(t.length>0){var o=t[2].replace(/\./g,"");o.length==2&&(o+="0");var u=parseInt(o);if(r=="chrome"){s=parseInt(i.split(".")[0]);if(s>=46)return!0}else if(r=="ucweb"){s=parseInt(i.replace(/\./g,""));if(s>=99)return!0}else if(r=="mozilla"&&u>410)return!0}return!1};return e},cutImg:function(e,t,n){var r=t?t:$(window).width(),i=this;return r=640,e=e.replace(/http\:/,"https:"),n?e=e+"?w="+r:(/w\=\d+/g.test(e)?(e=e.replace(/w\=\d+/g,"w="+r),e=e.replace(/h\=\d+/g,"h="+r)):/\?/g.test(e)?e=e+"&w="+r+"&h="+r:e=e+"?w="+r+"&h="+r,/cp\=/g.test(e)||(e+="&cp=1")),i.getImageUrl(e,!0)},isArray:function(e){return typeof Array.isArray=="function"?Array.isArray(e):Object.prototype.toString.call(e)==="[object Array]"},each:function(e,t){var n=0,r=e.length;if(!this.isArray(e))throw new Error("not Array");for(n;n<r;n++)t&&t(e[n],n)},forEach:function(e,t){var n=0,r=e.length;for(n;n<r;n++)t&&t(n,e[n])},priceFormat:function(e){if(e<0)return 0;var e,t=[];return e=""+e,e=e.split(".")[0],e=e.split("").reverse(),this.each(e,function(e,n){n&&n%3===0&&t.push("."),t.push(e)}),t=t.reverse().join(""),t},testObject:function(e){var t=!0;if(typeof e=="object")for(var n in e)e.hasOwnProperty(n)&&(t=!1);else console.log("请传object"),t=!1;return t},getCookie:function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null},isCustomHost:function(){var e=location.hostname;return/^m\-test\.instashop\.co\.id/g.test(e)||/^m\.instashop\.co\.id/g.test(e)?!0:!1},transTxt:function(e){return e.replace(/\n/g,"<br>")},isInsBrowser:function(){return/Instashop/g.test(navigator.userAgent)},fillTemplate:function(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){var r=n.split("."),i=t[r.shift()];for(var s=0,o=r.length;s<o;s++)i=i[r[s]];return typeof i!="undefined"&&i!==null?i:""})}},Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,t=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(i){if(typeof i=="object"||typeof i=="function"&&i!==null){var s=[],o,u;for(o in i)e.call(i,o)&&s.push(o);if(t)for(u=0;u<r;u++)e.call(i,n[u])&&s.push(n[u]);return s}throw new TypeError("Object.keys called on non-object")}}()),e}),define("lang",["base"],function(e){var t={"zh-cn":{H5_SHIPPING_ADDRESS:"收货地址",H5_ADDRESS:"地址",H5_SHIPPING_RECEIVER:"收货人",H5_SHIPPING_COST:"邮费",H5_PRICE:"价格",H5_ITEM_SKU:"型号",H5_ORDER_TOTAL_PRICE:"订单总价",H5_BENEFICIARY:"收款人",H5_ACCOUNT_RECEIVABLES:"收款账号",H5_ORDER_DETAIL:"订单详情",H5_ORDER_STATUS:"Status",H5_CHECK_ACCOUNT_RECEIVABLES:"查看收款账号",H5_SHIP_TO:"邮寄给",H5_ENTER_THE_SHOP:"进入店铺",H5_FAVORITE:"热卖",H5_COPY_FAIL:"复制失败",H5_NEED_MANUAL_COPY:"请手动复制",H5_ORDER_COPY_READY:"已复制到剪切板",H5_CONNACT_SELLER:"联系卖家",H5_QUANTITY:"数量",H5_CONFIRM:"确定",H5_PLEASE_CHOOSE_SKU:"请选择型号",H5_SKU:"型号",H5_ORDER_CONFIRM:"确认订单",H5_ORDER:"订单详情",H5_SUBMITTING_ORDER:"正在提交订单...",H5_CLOSE:"关闭",H5_COUNTER:"收银台",H5_COPY_COUNTER_INFO:"复制收款信息",H5_USER_NAME:"姓名",H5_USER_NAME_PH:"您的姓名",H5_YOUR_TELE_NO:"手机号",H5_USER_TELE_PH:"您的手机号",H5_POST_CODE:"邮编",H5_DETAIL_ADDRESS:"详细地址",H5_PROVINCE:"省份",H5_CITY:"城市",H5_DISTRICT:"街道",H5_FEEDBACK:"反馈",H5_BUY_ONE_AT_LEAST:"至少购买一件",H5_LOW_STOCK:"库存不足",H5_STOCK:"库存",H5_BUY_NOW:"购买",H5_CONFIRM_ORDER:"确认订单",H5_ADD_CART:"加入购物车",H5_COMMODIFY_SHELF:"商品已下架，无法购买",H5_SOLD_OUT:"商品已售完，无法购买",H5_OVER_INVENTORY:"购买的数量超过了库存",H5_CONTACT_US:"联系卖家",H5_SHOPING_NO_GOODS:"购物车中没有商品",H5_SHOPPING_CART:"购物车",H5_COUND_NOT_TALK_WITH_SELF:"不能和自己聊天",H5_ADD_TO_CART_SUCCESS:"已添加到购物车",H5_BUY_LIST:"购买清单",H5_BUY_THE_GOODS:"购买此商品",H5_QUESTION_AND_SUGGESTION:"您的问题或意见",H5_TEL_OR_EMAIL:"手机或邮箱",H5_BUY:"购买",H5_OK_ICON:"Ya",H5_CHECKOUT:"结账",H5_DONE:"完成",H5_X_PCS_LEFT:"仅剩",H5_PCS:"件",H5_LOADING:"加载中...",H5_SEND_PAY_INFO_TO_BUYER:"将收款信息发送给买家",H5_ATM_TRANSFER_GUID:"转账说明",H5_PAY_STATE:"支付状态",H5_PAY_CODE:"支付码",H5_NO_LOGISTICS_UPDATE:"暂时还没有物流状态，请稍后查看",H5_CART_MORE_THAN_STOCK:"添加到购物车的商品数量不能超过库存",H5_LOGISTICS_COMPANY:"物流类型",H5_SELECT_LOGISTICS_COMPANY:"选择物流类型",H5_SELECT_ONE_LOGISTICS_COMPANY:"请选择一个物流类型",H5_NO_LOGISTICS_COMPANY:"没有物流类型能够配送到你指定的收货地址",H5_GOODS_HOT:"推荐",H5_GOODS_ORTHER:"热卖",H5_DAYS:"天",H5_BUYER_NOTE:"买家留言",H5_OPTION:"选填",H5_BUYER_NOTE_TOO_LONG:"留言不能超过500个字",H5_NO_PRICE:"卖家没有设定商品价格，请联系卖家购买",H5_NO_STOCK:"请先联系卖家确认有货后再购买",H5_CONTINUE_ORDER:"继续下单",H5_CANCEL:"取消",H5_ORDER_DETAIL_QUICK_PAY_ADDRESS_TIPS:"快速收款订单，无收货地址",H5_ORDER_DETAIL_QUICK_PAY_ITEM_TIP:"总价为#的商品",H5_MAKE_ORDER:"去结算",H5_BROWSE_SHOP:"去逛逛",H5_NO_ADDR_TIP:"你还没有收货地址，请先填写地址",H5_IS_ABOUT_TO_BEGIN:"即将开始",H5_DISCOUTN_CAN_NOT_ABOVE_COUNT:"不能超过限购数量",H5_DCCORDING_TO_THE_ORIGINAL_PRICE_TO_BUY:"活动尚未开始,需要按照原价购买",H5_LOGISTICS_DETAIL:"物流详情",H5_SHOP_DELETE:"因违反Instashop使用协议，<br>该店铺已被删除",H5_USE_AGREE_title:"已阅读并同意",H5_USE_AGREE:"使用协议",H5_TERMS_KEYWORD:"使用协议",H5_LOOK_ORDER:"查看订单",H5_AGAIN_SHOP:"再逛逛",H5_IN_SHOP:"进入店铺",H5_CREATE_ORDER:"生成订单",H5_SORT_DELED:"分类已被删除",H5_GOOD_SORT:"商品分类",H5_MSG_NO_GOOD:"有商品已经卖完了哦",H5_SORT_EMPTY:"该分类暂无商品",H5_MSG_ADDRESS:"请填写收货地址",H5_MAX_BUY:"最多只能购买",H5_TEL_GO_CONFIRM:"手机号位数可能不正确，建议去确认",H5_GO_CONFIRM:"去确认",H5_TEL_PASS_20:"手机号码不能超过20位",H5_IS_ONLY_NUM:"手机号只能输入数字",H5_CONFIRM_TEL_IS_TRUE:"请确保号码无误，收款信息、付款结果等信息也会通过这个手机号发送给你",H5_SUCCESS_MSG:"已将付款信息通过短信发送给你，若没有收到，请截图保存。",H5_PAY_EXPIRY_DATE:"付款有效期",H5_ERROR:"网络状况不好，请刷新页面",H5_FRESHEN:"刷新",H5_CONFIRM_ORDER_ERROR:"下单失败",H5_DELETE_CONFIRM:"确认删除?",H5_LOGISTICS:"物流",H5_GOOD_DETAIL_CHANGE:"卖家已修改该商品，请重新加入购物车。",H5_ORDER_TIMEOUT_ERROR:"网络状况不好",H5_CALL_TELEPHONE:"打电话",H5_SEND_SMS:"发短信",H5_LINE_CONTACT_ME:"line联系我",H5_NOT_EMPTY:"不能为空",H5_PRICE_MUST_NUM:"金额必须为大于0的整数",H5_SUBMIT_SUCCESS:"提交成功",H5_INDEX_NO_GOOD:"没有商品",H5_SUNMITING:"提交...",H5_ADVICE_FILL:"邮编，选填，建议填写",H5_MODELTYPE_AD_IMG:"图片广告",H5_MODELTYPE_NAVIGATION:"导航",H5_MODELTYPE_RECOMMENDED:"推荐商品",H5_MODELTYPE_AD_NORMAL:"普通广告",H5_MODELTYPE_AD_SLIDE:"轮播广告",H5_MODELTYPE_TWOCOLUMNAD:"两列广告",H5_MODELTYPE_RECOMMENDED_EDITOR:"编辑推荐商品",H5_MODELTYPE_SIZE_UNLIMIT:"不限制图片比例",H5_MODELTYPE_SIZE_43:"图片比例4:3",H5_MODELTYPE_SIZE_11:"图片比例1:1",H5_MODELTYPE_NAV_IMGTEXT:"图文导航",H5_MODELTYPE_NAV_TXT:"文字导航",H5_MODELTYPE_NAV_TITLE:"导航标题",H5_MODELTYPE_OP_ADD_NAVLINK:"添加导航链接",H5_MODELTYPE_TIP_ADD_IMG:"请添加图片",H5_MODELTYPE_TYPE_TWOCOLUMN:"两列式",H5_MODELTYPE_TYPE_BIGIMG:"大图式",H5_MODELTYPE_TYPE_LIST:"列表式",H5_MODELTYPE_GOOD_DESC:"商品描述",H5_INSERT_MODEL:"插入模块",H5_EDIT:"编辑",H5_MOVE_UP:"上移",H5_DELETE:"删除",H5_APPLY_MODEL:"应用到店铺",H5_EDIT_SHOW_ITEM:"商品展示",H5_INS_INPUT_PLACEHOLDER:"如：instashop_ina",H5_INS_VERIFY:"请输入正确的Instagram账户",H5_INS_TIP:"注：请确保你的Instagram账户没有设置为“私密账户”",H5_SUBMIT_TXT:"提交",H5_EDIT_REFUND_CARD:"填写退款账号",H5_BANK_NAME:"银行名称",H5_SUB_BRANCH:"支行",H5_ACCOUNT_NAME:"账户名",H5_ACCOUNT_NUMBER:"银行号码",H5_SUBMITING:"正在提交...",H5_CONFIRM_SUBMIT:"确认提交？",H5_EXIT_CONFIRM:"放弃更改？",H5_REDUC_PAVORABLE:"满减优惠",H5_REDUC_TITLE:"全店满减",H5_ITEM_LIST_TYPE_TWO:"一行2个",H5_ITEM_LIST_TYPE_THREE:"一行3个",H5_VALIDATOR_NAME:"请填写姓名",H5_VALIDATOR_TEL:"请填写手机号",H5_VALIDATOR_PROVINCE:"请填写省",H5_VALIDATOR_CITY:"请填写市",H5_VALIDATOR_DIS:"请填写区",H5_VALIDATOR_STREET:"请填写详细地址",H5_IS_SOLDOUTTRUE:"已下架",H5_IS_HAVESHEFL:"有商品已下架",H5_NO_SEARCH_VAL:"没有找到相关商品",H5_IS_CONFIRM:"已确认",H5_GO_CONTACT:"去联系",H5_CART_GROUP_TITLE:"仓库",H5_FAVORABLE_TIP_NONE:"优惠券不存在",H5_FAVORABLE_TITLE:"优惠券",H5_FAVORABLE_FILL_CODE:"填写code",H5_FAVORABLE_TITLE_PRICE:"优惠",H5_COUPON:"优惠券",H5_SHARE_COUPON_TXT:"我非常喜欢的店铺限时送优惠券了，领取：",H5_SHARE_TO_BBM_COUPON_TXT:"我非常喜欢的店铺限时送优惠券了，领取：",H5_SHARE_COUPON_RULE:"分享到line、BBM、WA就能通过链接领取",H5_SHARE_TITLE:"分享赚优惠券",H5_GET_COUPON_SUCCESS:"领取成功",H5_GETTED:"已经领取过了",H5_GET:"立即领取",H5_GETING:"领取中...",H5_GOOD_COST:"商品总价"},id:{H5_REDUC_TITLE:"Promo Minimal Pembelian",H5_REDUC_PAVORABLE:"Potongan Harga",H5_SUBMIT_TXT:"Ajukan",H5_INS_TIP:"Pastikan akun Instagrammu tidak diprivate",H5_INS_VERIFY:"Silakan masukkan Instagram akun",H5_INS_INPUT_PLACEHOLDER:"Contoh: instashop_ina",H5_MODELTYPE_SIZE_11:"Ukuran gambar harus 1:1",H5_MODELTYPE_GOOD_DESC:"Deskripsi Produk",H5_MODELTYPE_AD_IMG:"Banner",H5_MODELTYPE_NAVIGATION:"Menu",H5_MODELTYPE_RECOMMENDED:"Display Produk",H5_MODELTYPE_AD_NORMAL:"Banner Standar",H5_MODELTYPE_AD_SLIDE:"Banner Bergerak",H5_MODELTYPE_TWOCOLUMNAD:"Banner Dua Kolom",H5_MODELTYPE_RECOMMENDED_EDITOR:"Ubah",H5_MODELTYPE_SIZE_UNLIMIT:"Ukuran gambar tidak ditentukan",H5_MODELTYPE_SIZE_43:"Ukuran gambar harus 4:3",H5_MODELTYPE_NAV_IMGTEXT:"Menu Gambar",H5_MODELTYPE_NAV_TXT:"Menu Tulisan",H5_MODELTYPE_NAV_TITLE:"Judul Menu",H5_MODELTYPE_OP_ADD_NAVLINK:"Tambahkan Link Menu",H5_MODELTYPE_TIP_ADD_IMG:"Tambah Gambar",H5_MODELTYPE_TYPE_TWOCOLUMN:"Tampilan Dua Kolom",H5_MODELTYPE_TYPE_BIGIMG:"Tampilan Satu Kolom",H5_MODELTYPE_TYPE_LIST:"Tampilan Baris",H5_ADVICE_FILL:"Kode Pos: Pilih, Sebaiknya diisi",H5_SHIPPING_ADDRESS:"Alamat Pengiriman",H5_ADDRESS:"Alamat",H5_SHIPPING_RECEIVER:"Penerima",H5_SHIPPING_COST:"Biaya Pengiriman",H5_PRICE:"Harga",H5_ITEM_SKU:"Model",H5_ORDER_TOTAL_PRICE:"Jumlah Total",H5_BENEFICIARY:"Nama Pemilik Rekening",H5_ACCOUNT_RECEIVABLES:"Nomor Rekening",H5_ORDER_DETAIL:"Detail Pesanan",H5_ORDER_STATUS:"Status",H5_CHECK_ACCOUNT_RECEIVABLES:"Cek Nomor Rekening",H5_SHIP_TO:"Kirim ke",H5_ENTER_THE_SHOP:"Masuk ke toko",H5_FAVORITE:"Produk Tersedia",H5_COPY_FAIL:"Gagal menyalin",H5_NEED_MANUAL_COPY:"Silakan salin secara manual",H5_CONNACT_SELLER:"Kontak",H5_BUY_NOW:"Beli sekarang",H5_QUANTITY:"Jumlah",H5_OK_ICON:"Ya",H5_BUY:"Beli",H5_PLEASE_CHOOSE_SKU:"Harap Pilih sebuah Opsi",H5_BUY_ONE_AT_LEAST:"Kuantitas tidak boleh nol",H5_SKU:"Tipe",H5_ORDER_CONFIRM:"Konfirmasi",H5_ORDER:"Detail Pesanan",H5_SUBMITTING_ORDER:"Mengajukan pesanan...",H5_ORDER_COPY_READY:"Sudah Disalin",H5_CLOSE:"Tutup",H5_DONE:"Selesai",H5_COUNTER:"Kasir",H5_COPY_COUNTER_INFO:"Salin Informasi Rekening",H5_USER_NAME:"Nama",H5_USER_NAME_PH:"Nama Anda",H5_YOUR_TELE_NO:"No.Hp",H5_USER_TELE_PH:"No.Hp Anda",H5_POST_CODE:"Kode pos",H5_DETAIL_ADDRESS:"Alamat jelas",H5_PROVINCE:"Provinsi",H5_CITY:"Kota",H5_DISTRICT:"Kecamatan",H5_FEEDBACK:"Ulasan",H5_LOW_STOCK:"Stok produk hampir habis",H5_STOCK:"Stock",H5_ADD_CART:"Masuk keranjang",H5_CONFIRM_ORDER:"Konfirmasi Pesanan",H5_COMMODIFY_SHELF:"Maaf, produk ini telah habis terjual",H5_SOLD_OUT:"Produk telah habis terjual",H5_OVER_INVENTORY:"Melebihi jumlah stok",H5_CONTACT_US:"Kontak",H5_SHOPING_NO_GOODS:"Keranjang belanja Anda kosong",H5_SHOPPING_CART:"Keranjangku",H5_COUND_NOT_TALK_WITH_SELF:"Anda tidak dapat mengirim pesan ke diri sendiri",H5_ADD_TO_CART_SUCCESS:"Produk Berhasil Ditambahkan ke Keranjang",H5_BUY_LIST:"Pesanan",H5_BUY_THE_GOODS:"Beli Produk Ini",H5_QUESTION_AND_SUGGESTION:"Masalah atau Komentar Anda",H5_TEL_OR_EMAIL:"Nomor telpon atau Email",H5_CHECKOUT:"Pembayaran",H5_X_PCS_LEFT:"Hanya tersisa sebanyak",H5_PCS:"pcs",H5_LOADING:"Memuat...",H5_SEND_PAY_INFO_TO_BUYER:"Bagikan informasi rekening ke pembeli",H5_ATM_TRANSFER_GUID:"ATM Transfer Guide",H5_PAY_STATE:"Payment Status",H5_PAY_CODE:"Payment Code",H5_NO_LOGISTICS_UPDATE:"Status pengiriman belum tersedia, silakan coba lagi.",H5_CART_MORE_THAN_STOCK:"Jumlah tidak bisa melebihi jumlah stok",H5_GOODS_HOT:"Rekomendasi Item",H5_GOODS_ORTHER:"Hot Item",H5_LOGISTICS_COMPANY:"Jenis Paket Pengiriman",H5_SELECT_LOGISTICS_COMPANY:"Pilih Jenis Paket Pengiriman",H5_SELECT_ONE_LOGISTICS_COMPANY:"Silakan pilih jenis paket pengiriman",H5_NO_LOGISTICS_COMPANY:"Maaf, saat ini alamat tujuanmu belum dapat dijangkau",H5_DAYS:"hari",H5_BUYER_NOTE:"Keterangan",H5_OPTION:"Opsional",H5_BUYER_NOTE_TOO_LONG:"Tidak dapat melebihi 500 karakter",H5_NO_PRICE:"Maaf, harga produk ini tidak dicantumkan, silakan hubungi penjual.",H5_NO_STOCK:"Silakan hubungi penjual untuk memastikan ketersediaan stok sebelum membeli",H5_CONTINUE_ORDER:"Lanjutkan Order",H5_CANCEL:"Batal",H5_ORDER_DETAIL_QUICK_PAY_ADDRESS_TIPS:"Pesanan ini dibuat dengan menu Penagihan Instan, alamat pengiriman belum dicantumkan",H5_ORDER_DETAIL_QUICK_PAY_ITEM_TIP:"Produk senilai #",H5_MAKE_ORDER:"Checkout",H5_BROWSE_SHOP:"Beli Lagi",H5_NO_ADDR_TIP:"Kamu belum mengisi alamat pengiriman,silakan isi alamat pengiriman terlebih dahulu",H5_CONFIRM:"Ya",H5_IS_ABOUT_TO_BEGIN:" Coming Soon",H5_DISCOUTN_CAN_NOT_ABOVE_COUNT:"Tidak bisa melebihi batas maksimum pembelian",H5_DCCORDING_TO_THE_ORIGINAL_PRICE_TO_BUY:"Program diskon belum dimulai. Kamu akan membeli dengan harga normal",H5_LOGISTICS_DETAIL:"Detail pengiriman",H5_SHOP_DELETE:"Akun ini telah dihapus karena melanggar syarat dan ketentuan penggunaan Instashop",H5_USE_AGREE_title:"Saya telah membaca dan memahami ",H5_USE_AGREE:"syarat dan ketentuan penggunaan",H5_TERMS_KEYWORD:"Syarat dan ketentuan pengguna",H5_LOOK_ORDER:"Lihat Pesanan",H5_AGAIN_SHOP:"Belanja Lagi",H5_IN_SHOP:"Masuk ke Toko",H5_CREATE_ORDER:"Ajukan Pesanan",H5_SORT_DELED:"Kategori ini telah dihapus",H5_GOOD_SORT:"Kategori produk",H5_MSG_NO_GOOD:"Maaf, stok produk ini sudah habis",H5_SORT_EMPTY:"Tidak ada produk untuk kategori ini",H5_MSG_ADDRESS:"Alamat Pengiriman",H5_MAX_BUY:"Kamu maksimal hanya dapat membeli",H5_TEL_GO_CONFIRM:"Format nomor ponsel yang kamu masukkan tidak tepat, silakan cek kembali",H5_GO_CONFIRM:"Cek kembali",H5_TEL_PASS_20:"Nomor ponsel tidak dapat melebihi 20 angka",H5_IS_ONLY_NUM:"Kamu hanya dapat memasukkan angka!",H5_CONFIRM_TEL_IS_TRUE:"Pastikan nomor ponselmu sudah benar. Informasi nomor rekening dan pembayaran akan kami kirimkan ke nomor ponsel ini",H5_SUCCESS_MSG:"Informasi pembayaran sudah dikirimkan melalui SMS. Jika SMS tidak diterima, mohon screenshot halaman ini",H5_PAY_EXPIRY_DATE:"Batas waktu pembayaran",H5_ERROR:"Koneksi internet kurang stabil, silakan refresh halaman",H5_FRESHEN:"Refresh",H5_CONFIRM_ORDER_ERROR:"Gagal Mengajukan Pesanan",H5_DELETE_CONFIRM:"Yakin ingin menghapus?",H5_LOGISTICS:"Jasa Logistik",H5_GOOD_DETAIL_CHANGE:"Penjual kamu sudah mengubah detail produk ini, silakan masukkan ulang produk ini ke keranjang. ",H5_ORDER_TIMEOUT_ERROR:"Koneksi internet kurang stabil",H5_CALL_TELEPHONE:"Telepon",H5_SEND_SMS:"Kirim SMS",H5_LINE_CONTACT_ME:"LINE",H5_NOT_EMPTY:"tidak boleh dikosongkan",H5_PRICE_MUST_NUM:"Jumlah transfer harus lebih besar dari 0",H5_SUBMIT_SUCCESS:"Pengajuan Berhasil",H5_INDEX_NO_GOOD:"Belum ada produk",H5_SUNMITING:"Ajukan...",H5_INSERT_MODEL:"Sisipkan",H5_EDIT:"Ubah",H5_DELETE:"Hapus",H5_MOVE_UP:"Pindah ke Atas",H5_APPLY_MODEL:"Gunakan ke Tokomu",H5_EDIT_SHOW_ITEM:"Tampilan Produk",H5_EDIT_REFUND_CARD:"Nomor rekening pengembalian dana",H5_BANK_NAME:"Nama bank",H5_SUB_BRANCH:"Cabang",H5_ACCOUNT_NAME:"Nama Pemilik Rekening",H5_ACCOUNT_NUMBER:"Nomor Rekening",H5_SUBMITING:"Sedang ditambahkan...",H5_CONFIRM_SUBMIT:"Yakin ingin mengajukan？",H5_EXIT_CONFIRM:"Yakin ingin keluar?",H5_ITEM_LIST_TYPE_TWO:"Tampilan 1 Baris 2 Produk",H5_ITEM_LIST_TYPE_THREE:"Tampilan 1 Baris 3 Produk",H5_VALIDATOR_STREET:"Silakan tulis alamat lengkap pengiriman",H5_VALIDATOR_NAME:"Silakan tulis nama",H5_VALIDATOR_TEL:"Silakan masukkan nomor ponselmu",H5_VALIDATOR_PROVINCE:"Silakan pilih provinsi",H5_VALIDATOR_CITY:"Silakan pilih kota/kabupaten",H5_VALIDATOR_DIS:"Silakan pilih kecamatan",H5_IS_SOLDOUTTRUE:"Sudah Digudangkan",H5_IS_HAVESHEFL:"Ada produk yang sudah digudangkan!",H5_NO_SEARCH_VAL:"Produk tidak ditemukan",H5_IS_CONFIRM:"Nanti Saja",H5_GO_CONTACT:"Kontak Penjual",H5_CART_GROUP_TITLE:"Gudang",H5_FAVORABLE_TIP_NONE:"Voucher tidak ditemukan",H5_FAVORABLE_TITLE:"Voucher",H5_FAVORABLE_FILL_CODE:"Tulis Kode",H5_FAVORABLE_TITLE_PRICE:"Diskon",H5_COUPON:"Voucher",H5_SHARE_COUPON_TXT:"Olshop favoritku lagi bagi-bagi kode voucher nih, klik untuk dapatkan kode voucher: ",H5_SHARE_TO_BBM_COUPON_TXT:"Olshop-favoritku-lagi-bagi-bagi-kode-voucher-nih-klik-untuk-dapatkan-kode-voucher-",H5_SHARE_COUPON_RULE:"Bagikan ke LINE/WhatsApp/BBM, lalu klik link di chatroom kamu untuk mendapatkan kode voucher",H5_SHARE_TITLE:"Bagikan Promo Voucher",H5_GET_COUPON_SUCCESS:"Voucher Berhasil Diambil!",H5_GETTED:"Voucher Sudah Pernah Diambil",H5_GET:"Ambil Sekarang",H5_GETING:"Sedang Diproses...",H5_GOOD_COST:"Harga Total Produk"}};return t[e.others.getUrlPrem("language")]||t[navigator.language.toLowerCase()]||t.id}),define("dialog",["base","lang","fastclick"],function(e,t,n){function i(){var e='<div class="load"><div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div></div>';return e}var r=function(e){var n=this;return n.opts=$.extend({wraper_class:null,top_txt:'<span class="dialog-top-t"></span>',show_top:!0,width:300,height:null,body_txt:'<p class="dialog-body-p">'+t.H5_DELETE_CONFIRM+"</p>",body_fn:null,c_fn:null,cf_fn:null,show_footer:!0,cfb_txt:t.H5_CONFIRM,cab_txt:t.H5_CANCEL,can_exist:!1,is_confirm:!1,is_cover:!0,event_type:"click",wraper_css:null,coverdom:null,animation_css:null,cover_css:null,auto_fn:null,after_fn:null,cover_event:null},e),n.init(),n};return r.prototype={init:function(){n.attach(document.body);var e=this;e.createDialog(),e.handleFn().show(),e.opts.auto_fn&&e.opts.auto_fn.apply(this)},handleFn:function(){var e=this,t=e.opts.wraper,n=e.opts.event_type;return t.on(n,".j_c_btn",function(){e.remove(function(){e.opts.c_fn&&e.opts.c_fn.call(e,$(this))})}),t.on(n,".j_cf_btn",function(){e.remove(function(){e.opts.cf_fn&&e.opts.cf_fn.call(e,$(this))})}),t.on(n,".j_ca_btn",function(){e.remove(function(){e.opts.c_fn&&e.opts.c_fn.call(e,$(this))})}),$(".j_dialog_cover").on(n,function(){e.opts.cover_event||e.remove()}),e},show:function(){var e=this;this.opts.wraper.show(),this.opts.body_fn&&this.opts.body_fn.call(e,$(this))},remove:function(e){var t=this;t.removeCover(),e&&e(),t.removeDialog(),t.opts.after_fn&&t.opts.after_fn()},removeCover:function(){this.opts.can_exist||$(".j_dialog_cover").remove()},removeDialog:function(){var e=this,t=e.opts.animation_css;t?(this.opts.wraper.css(t),setTimeout(function(){e.opts.wraper.remove()},1e3)):this.opts.wraper.remove()},createTop:function(){var e=this,t="";return e.opts.show_top?(t='<div class="dialog-top j_d_top">'+e.opts.top_txt+'<a href="javascript:;" class="j_c_btn fr"><i class="icon iconfont icon-cancel-font"></i></a>'+"</div>",t):""},createBody:function(){var e=this,t="";return t='<div class="dialog-body j_d_body">'+e.opts.body_txt+"</div>",t},createFooter:function(){var e=this,t="";return e.opts.show_footer?(t='<div class="dialog-footer j_d_footer">',e.opts.is_confirm&&(t+='<a href="javascript:;" class="j_ca_btn ca-btn">'+e.opts.cab_txt+"</a>"),t+='<a href="javascript:;" class="j_cf_btn cf-btn">'+e.opts.cfb_txt+"</a>",t+="</div>",t):""},createDialog:function(){var t=this,n=t.opts.wraper_class?t.opts.wraper_class:"",r='<div class="dialog-wraper j_dialog_wraper '+n+'" data-spider="dialog-wraper">'+t.createTop()+t.createBody()+t.createFooter()+"</div>";!t.opts.can_exist&&$(".j_dialog_wraper").length&&$(".j_dialog_wraper").remove(),t.opts.coverdom&&(r=t.opts.body_txt);var i=$(document).height(),s=$(window).height(),o=i>s?i:s,u=t.opts.cover_css?$.extend({height:o},t.opts.cover_css):{height:o};if(t.opts.is_cover&&!$(".j_dialog_cover").length){var a=$('<div class="dialog-cover j_dialog_cover"></div>'),f=e.others.zIndex++;a.css("zIndex",f),$("body").append(a),$(".j_dialog_cover").css(u)}var l=$(r);return t.opts.wraper=l,$("body").append(l),l.css(t.setPosition()),t},setPosition:function(){var t=this,n=e.others.zIndex++,r=t.opts.wraper_css,i=t.countPosition();return console.log(i),t.opts.wraper_class&&(i.top=10),r?(r.top=i.top,r.left=i.left,r.width=t.opts.width,r.zIndex=n,console.log(r),r):{top:i.top,left:i.left,width:t.opts.width,zIndex:n}},countPosition:function(){var e=this,t=e.opts.wraper_css,n=$(window).scrollTop(),r=$(window).scrollLeft(),i=$(window).width(),s=$(window).height(),o=t&&t.width?t.width:e.opts.width,u=e.opts.wraper,a=t&&t.height?t.height:e.opts.height?e.opts.height:u.height(),f=e.opts.show_top?u.find(".j_d_top").height():0,l=e.opts.show_footer?u.find(".j_d_footer").height():0,c=0,h=0;return a>=s?(u.find(".j_d_body").css("maxHeight",s-f-l),c=20+n):c=(s-a)/2+n,o>=i?(u.find(".j_d_body").css("maxWidth",o),h=10+r):h=(i-o)/2+r,{top:c,left:h}}},{dialog:function(e){return new r(e)},alert:function(e){return e=$.extend({show_top:!1},e),new r(e)},confirm:function(e){return e=$.extend({is_confirm:!0,show_top:!1},e),new r(e)},tip:function(e){return e=$.extend({show_footer:!1,show_top:!1,cover_css:{"background-color":"rgba(255,255,255,.1)"},wraper_css:{"background-color":"rgba(0,0,0,.5)",color:"#fff","text-align":"center"},animation_css:{opacity:"1"},auto_fn:function(){var e=this;setTimeout(function(){e.remove()},1e3)}},e),new r(e)},loading:function(e){return e=$.extend({show_footer:!1,show_top:!1,width:0,cover_event:!0,body_txt:i(),wraper_css:{"background-color":"transparent"}},e),new r(e)},cover:function(e){return e=$.extend({coverdom:!0},e),new r(e)}}}),define("sharecoupon",["dialog","lang","base"],function(e,t,n){var r=function(e){var n=this;n.config=$.extend({title:t.H5_SHARE_TITLE,content:t.H5_SHARE_COUPON_TXT,coupon_url:"http://m-test.instashop.co.id/b/0001"},e),n.init()};return r.prototype={init:function(){var t=this;e.dialog({top_txt:'<p class="share-dialog-title">'+t.config.title+"</p>",body_txt:t.createHtm(),show_footer:!1}),t.handleFn()},createHtm:function(){var e=this,n=e.urlArithmetic(e.config.coupon_url),r=e.config.content+"<br>"+n,i="";return e.share_content=e.config.content+n,i+='<div class="share-dialog-box" data-spider="coupon_share_box"><div class="share-explain">'+t.H5_SHARE_COUPON_RULE+"</div>"+'<div class="share-info">'+r+"</div>"+'<div class="share-operate clearfix">'+'<a href="javascript:;" class="j_share_action" data-type="line" spm-auto="优惠券分享到line" spm-click="" data-url="http://line.naver.jp/R/msg/text/?">'+'<i class="iconfont icon-share-line" ></i>'+"<p>LINE</p>"+"</a>"+'<a href="javascript:;" class="j_share_action" data-type="whatsapp" spm-auto="优惠券分享到whatsapp" spm-click="" data-url="whatsapp://send?text=">'+'<i class="iconfont icon-share-whatsapp" ></i>'+"<p>WhatsApp</p>"+"</a>"+'<a href="javascript:;" class="j_share_action" data-type="bbm" spm-auto="优惠券分享到bbm" spm-click="" data-url="bbmi://api/share?message=">'+'<i class="iconfont icon-share-bbm " ></i>'+"<p>BBM</p>"+"</a>"+"</div>"+"</div>",i},handleFn:function(){var e=this;$("body").on("click",".j_share_action",function(){var r=$(this),i=r.attr("data-type");setTimeout(function(){location.href=r.attr("data-url")+(i=="bbm"&&n.others.verifyBower().ios?t.H5_SHARE_TO_BBM_COUPON_TXT+e.urlArithmetic(e.config.coupon_url):e.share_content)},100)})},urlArithmetic:function(e){return e+"_"+Math.round(Math.random()*1e4)}},function(e){return new r(e)}}),require(["fastclick","sharecoupon"],function(e,t){var n={init:function(){var e=this;e.handleFn()},handleFn:function(){e.attach(document.body),$("body").on("click",".j_share_btn",function(){t({coupon_url:init_data})})}};n.init()}),define("app/coupon",function(){});