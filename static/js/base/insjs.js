/**
 * Created by sunchengbin on 2016/10/30.
 *
 * 默认情况下webview打开就清掉缓存,url中添加参数ins_keep_cache通知app不清楚缓存
 * 资料
 * ios文档链接地址 https://github.com/marcuswestin/WebViewJavascriptBridge
 * android文档链接地址 https://github.com/lzyzsd/JsBridge
 *
 * webview全局变量通信变量WebViewJavascriptBridge
 *
 * api介绍:WebViewJavascriptBridge简写为bridge
 *
 * js调native内部方法
 * bridge.callHandler('insSocket', {param:{type:,param{}}, function(response) {
 *      //response结构:
 * })
 * 页面中创建一个监听事件registerSocket,等待native通过data传输数据.然后根据data数据进行js中的对应操作.responseCallback为native本地的回调.如果需要我们把数据处理好传给native就通过这个回调来传输处理好的数据
 * bridge.registerHandler('registerSocket',function(data,responseCallback) {
 *      data = {
 *          param:{
				type:'edit_model',
				param:{
					index : 0,
					type : '',
					title : '',
					data : []
				}
			}(insSocket的参数结构),
 *          result : {
 *              //具体模块数据,以标准广告数据为例
 *              index : 0,
				title : '',
				type : edit_signage,
				data : {img:[]}
 *          }
 *      }
 *      var responseData = js对客户端返回的data进行的处理;
 *      responseCallback(responseData);
 * })
 *
 * insSocket桥接种type方法名列表:
 * edit_model//编辑模块
 * bridge.callHandler('insSocket', {param:{type:'edit_model',param:{index:0,data:{type:'static_banner',data:}}}, function(response) {
 *      return null;
 *      //native本地跳转到模板编辑页
 * })
 * create_model//新建模板
 * bridge.callHandler('insSocket', {param:{type:'create_model',param:{index:0,url:'h5选择类型页面url+?index=0'}}, function(response) {
 *      return null;
 *      //native本地跳转到选择模板类型页面
 * })
 * show_loading//调用native本地loading动画
 * bridge.callHandler('insSocket', {param:{type:'show_loading',param:null, function(response) {
 *      return null;
 * })
 * close_model//提交模板数据编辑后操作
 * bridge.callHandler('insSocket', {param:{type:'close_model',param:{code:(保持和后台接口返回code值一样,判断是否提交成功),message:}, function(response) {
 *      return null;
 * })
 * get_seller_info//获取用户seller_id和wduss
 * bridge.callHandler('insSocket', {param:{type:'get_seller_info',param:null, function(response) {
 *      return null;
 * })
 * share//分享
 * var Param = {param:{
		type : 'share',
			param : {
				type : 分享类型,
				data : [{
					img : '',
					content:'',
					link_url:''
				}]
		}
	}}
	type值列表
	share_to_instagram
	share_to_line
	share_to_whatsapp
	share_to_bbm
	share_to_copy
	share_to_more
	share_to_facebook
	share_to_twitter
	share_to_sms
	share_to_preview
	share_to_copy_link
	share_to_copy_detail
	share_to_save
 * bridge.callHandler('insSocket',Param, function(response) {
 *      return null;
 * })
 * moudel : [
		//type为模块类型
		//店招
		//广告类型分为static_banner、rotate_banner、two_list_banner
		//导航类型分为img_navigation、text_navigation
		//推荐商品分为two_li_items、big_img_item、list_items
		{
		    index : 0,
		    title : '',
			type : edit_signage,
			data : {img:[]}
		},
		{
		    index : 0,
		    title : '',
			type : static_banner,
			data : [{img:,link_url:},]
		},
		{
		    index : 0,
		    title : '',
			type : rotate_banner,
			data : [{img:,link_url:},]
		},
		{
		    index : 0,
			type : two_list_banner,
			data : [{img:,link_url:},]
		},
		{
		    index : 0,
		    title : '',
			type : img_navigation,
			data : [{img : ,navigation_name:,link_url:},]
		},
		{
		    index : 0,
		    title : '',
			type : text_navigation,
			data : [{navigation_name:,link_url:}]
		},
		{
		    index : 0,
			type : two_li_items,
			title : '',
			data : [后端item完整数据,]
		},
		{
		    index : 0,
			type : big_img_item,
			title : '',
			data : [后端item完整数据,]
		},
		{
		    index : 0,
			type : list_items,
			title : '',
			data : [后端item完整数据,]
		},
		{//三列模块
		    index : 0,
			type : three_li_items,
			title : '',
			data : [后端item完整数据,]
		},
		{//所有非模块商品列表的样式选择,3列还是2列
		    index : 0,
			type : item_list_type,
			title : '',
			data : []
		}
	]
 *
 */
define([],function(){
    var WIN = window;
	var MATCHVERSION = /Instashop\-(.+?)\-/;
    var INSJS = {
		//todo 目前默认处理不低于targetVersion 如果低于弹出提示
		judgeVersion:function(targetVersion,succ,fail){
			var _getCurVersion = "";
			var _getCurVersionFloat = "";

			try {
				//提取版本号 从Instashop-3.5.1/3.5-ios/Android
				_getCurVersion = window.navigator.userAgent.match(/Instashop\-(.+?)\-/)[1]||"";
				_getCurVersionFloat = parseFloat(_getCurVersion.substr(0,3));//目前只支持取前两位'3.5.1'=>3.5 '3.5'=>3.5
				targetVersion = parseFloat(targetVersion);
				//比较 例:_getCurVersionFloat 3.5| targetVersion 3.4
				//符合
				if(_getCurVersionFloat>=targetVersion){
					succ&&succ();
				}else{//不符合
					fail&&fail();
				}
			}catch (e) {
				//异常情况 [不在壳内] [获取不到 userAgent] 或 [转换出错]
				fail&&fail();
			}
		},
        WebOnReady: function (callback,errorback) {
            var _this = this;
            if (/Instashop/g.test(navigator.userAgent)) {//内嵌浏览器访问
                //todo 区分ios和android
                _this.connectWebViewBridge(function(bridge){
                    callback && callback(bridge);
                });
            } else {
                //任意非内嵌浏览器
                errorback && errorback();
            }
        },
        connectWebViewBridge : function(callback){
            if(/ios/g.test(navigator.userAgent)){
                //ios下注入页面的初始
                //alert('is ios');
                if (WIN.WebViewJavascriptBridge) {
                    return callback(WebViewJavascriptBridge);
                }
                if (WIN.WVJBCallbacks) {
                    return WIN.WVJBCallbacks.push(callback);
                }
                WIN.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() {
                    document.documentElement.removeChild(WVJBIframe)
                }, 0);
            }else{
                if (WIN.WebViewJavascriptBridge) {
                    callback(WebViewJavascriptBridge)
                } else {
                    document.addEventListener(
                        'WebViewJavascriptBridgeReady'
                        , function() {
                            callback(WebViewJavascriptBridge)
                        },
                        false
                    );
                }
            }
        }
    };
    return INSJS;
})
