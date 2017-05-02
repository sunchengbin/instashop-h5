<?php
date_default_timezone_set('Asia/Chongqing');
header('Content-type: text/html; charset=utf-8');
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
define('MODE_NAME', 'instashoph5');
define('BASE_PATH', '/data/server/weidian');

define('C_RUNTIME_FILE_PATH', BASE_PATH.'/runtime');
$is_online = false;
if(file_exists(C_RUNTIME_FILE_PATH.'/.iamonline')){
	$is_online = true;
}
define('C_RUNTIME_ONLINE', $is_online);

define('LOG_ROOT', '/data/logs/' . MODE_NAME);
define('COM_LIB_PATH', BASE_PATH . '/libs');
define('LOG_ID', '' . time() . rand(10000, 20000));

function loadClass($strClassName)
{
    $pathArray = array(
        COM_LIB_PATH
    );
    foreach ($pathArray as $path) {
        $strClassName = str_replace('\\', '/', $strClassName);
        $classPath = $path . '/' . str_replace('_', '/', $strClassName) . '.php';
        if (file_exists($classPath)) {
            require_once $classPath;
            break;
        }
    }
}
function is_https()
{
	if (!isset($_SERVER['HTTP_X_FORWARDED_PROTO']))
	{
		return false;
	}

	$proto = $_SERVER['HTTP_X_FORWARDED_PROTO'];
	$p_arr = explode(':', $proto);
	return trim($p_arr[0]) === 'https';
}
function getSellerInfo(){
    $seller_id = $_REQUEST['seller_id'];
    if (!$seller_id) {
        $seller_id = getUrlParam('seller_id');
    }
    $wduss = $_REQUEST['wduss'];
    $params = [
        'seller_id' => $seller_id,
        'wduss' => urlencode($wduss)
    ];
    return $params;
}
function flexible(){
$js = <<<JS
!function(a,b){function c(){var b=f.getBoundingClientRect().width;b/i>540&&(b=540*i);var c=b/10;f.style.fontSize=c+"px",k.rem=a.rem=c}var d,e=a.document,f=e.documentElement,g=e.querySelector('meta[name="viewport"]'),h=e.querySelector('meta[name="flexible"]'),i=0,j=0,k=b.flexible||(b.flexible={});if(g){console.warn("将根据已有的meta标签来设置缩放比例");var l=g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l&&(j=parseFloat(l[1]),i=parseInt(1/j))}else if(h){var m=h.getAttribute("content");if(m){var n=m.match(/initial\-dpr=([\d\.]+)/),o=m.match(/maximum\-dpr=([\d\.]+)/);n&&(i=parseFloat(n[1]),j=parseFloat((1/i).toFixed(2))),o&&(i=parseFloat(o[1]),j=parseFloat((1/i).toFixed(2)))}}if(!i&&!j){var p=a.navigator.userAgent,q=(!!p.match(/android/gi),!!p.match(/iphone/gi)),r=q&&!!p.match(/OS 9_3/),s=a.devicePixelRatio;i=q&&!r?s>=3&&(!i||i>=3)?3:s>=2&&(!i||i>=2)?2:1:1,j=1/i}if(f.setAttribute("data-dpr",i),!g)if(g=e.createElement("meta"),g.setAttribute("name","viewport"),g.setAttribute("content","initial-scale="+j+", maximum-scale="+j+", minimum-scale="+j+", user-scalable=no"),f.firstElementChild)f.firstElementChild.appendChild(g);else{var t=e.createElement("div");t.appendChild(g),e.write(t.innerHTML)}a.addEventListener("resize",function(){clearTimeout(d),d=setTimeout(c,300)},!1),a.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(d),d=setTimeout(c,300))},!1),"complete"===e.readyState?e.body.style.fontSize=12*i+"px":e.addEventListener("DOMContentLoaded",function(){e.body.style.fontSize=12*i+"px"},!1),c(),k.dpr=a.dpr=i,k.refreshRem=c,k.rem2px=function(a){var b=parseFloat(a)*this.rem;return"string"==typeof a&&a.match(/rem$/)&&(b+="px"),b},k.px2rem=function(a){var b=parseFloat(a)/this.rem;return"string"==typeof a&&a.match(/px$/)&&(b+="rem"),b}}(window,window.lib||(window.lib={}));
JS;
return $js;
}
function biJs(){
$js = <<<JS
    (function(){
        var ua = navigator.userAgent;
        if(ua.indexOf('Opera Mini')!=-1)(
           alert('Maaf, browser ini tidak dapat memuat halaman web ini. Silakan gunakan browser lainnya')
        )
    })()
    function getUrlPrem(key,url){
          var _search = url || document.location.search,
              _pattern = new RegExp("[?&]" + key + "\=([^&]+)", "g"),
              _matcher = _pattern.exec(_search),
              _items = null;
          if (null != _matcher) {
              try {
                  _items = decodeURIComponent(decodeURIComponent(_matcher[1]));
              } catch (e) {
                  try {
                      _items = decodeURIComponent(_matcher[1]);
                  } catch (e) {
                      _items = _matcher[1];
                  }
              }
          }
          return _items;
    }
    function getSellerID() {
        var _s_id = -1;
        if (/Instashop/g.test(navigator.userAgent)) {
            //内嵌浏览器在cookie中和统计参数中加入seller_id
            _s_id = getUrlPrem('seller_id') || -1;
        }
        var _WD_s_id = _s_id;
        //获取当前时间
        var date=new Date();
        var expireDays=10;
        //将date设置为10天以后的时间
        date.setTime(date.getTime()+expireDays*24*3600*1000);
        //将WD_s_id cookie设置为10天后过期
        document.cookie="WD_s_id="+_WD_s_id+";expire="+date.toGMTString();
        return _s_id;
    }
    function getShopId(){
        var _shop_id = -1;
        if (/Instashop/g.test(navigator.userAgent)) {
            //内嵌浏览器在cookie中和统计参数中加入seller_id
            _shop_id = getUrlPrem('seller_id') || -1;
        }else{
            var _shop_data = localStorage.getItem('ShopData')?JSON.parse(localStorage.getItem('ShopData')).ShopInfo:null;
            _shop_id = _shop_data && _shop_data.id ?_shop_data.id:getOrderShopId();
        }
        function getOrderShopId(){
            try{
                if(init_data.order){
                    return init_data.order.shop_info.id;
                }
                if(init_data.shop){
                    return init_data.shop.id;
                }
                if(init_data.item){
                    return init_data.item.shop.id;
                }
            }catch(error){

            }
            return -1;
        }
        return _shop_id;
    }
    var _paq = _paq || [];
      _paq.push(['trackPageView']);
      (function(){
          var is_https = ("https:" === document.location.protocol) ? 1 : 0,
          u = (is_https ? "https" : "http") + "://di.instashop.co.id/";
          _paq.push(['setTrackerUrl', u +'index.php'+ '?userID=-1&shopId='+getShopId()+'&sellerId='+getSellerID()]);
          _paq.push(['setSiteId', 1]);
          var d = document,
              g = d.createElement('script'),
              s = d.getElementsByTagName('script')[0];
          g.type='text/javascript';
          g.defer=true;
          g.async=true;
          g.src=is_https ? 'https://di.instashop.co.id/piwik-spm.js' : 'http://di.instashop.co.id/piwik-spm.js';
          s.parentNode.insertBefore(g,s);
      })();

    function PaqPush(e_c,e_n,type){
        try{
           _paq.push(['trackEvent',e_c,(type||'click'), e_n]);
        }catch(e){
        }
    }
JS;
return $js;
}

function setHref($link){
    if(!$link){
        $link = 'javascript:;';
    }
    return $link;
}
function transUrl($url){
    if(is_https()){
        return str_replace('http:', 'https:', $url);
    }
    return $url;
}
function isDebug(){
    $is_debug = false;
    $debug = $_REQUEST['static_debug'];
    if($debug){
        $is_debug = true;
    }
    return $is_debug;
}
function getFontCss($url,$folder_name){
    if($folder_name){
        return '<style>@font-face {font-family: "iconfont";src: url("'.$url.'/css/'.$folder_name.'/base/fonts/iconfont.ttf?v=1493368767032") format("truetype"),url("'.$url.'/css/base/fonts/iconfont.svg?v=1493368767032#iconfont") format("svg");}</style>';
    }else{
        return '<style>@font-face {font-family: "iconfont";src: url("'.$url.'/css/base/fonts/iconfont.ttf?v=1493368767032") format("truetype"),url("'.$url.'/css/base/fonts/iconfont.svg?v=1493368767032#iconfont") format("svg");}</style>';
    }
}
function getIco($url){
    return '<link rel="shortcut icon" href="'.$url.'/favicon.ico" type="image/vnd.microsoft.icon"><link rel="icon" href="'.$url.'/favicon.ico" type="image/vnd.microsoft.icon">';
}
function smartyCommon($folder){
    require_once(__DIR__.'/../lib/libs/Smarty.class.php');
    $smarty = new Smarty();
    $folder_name = getSkinInfo();
    $folder_name = $folder?$folder:$folder_name;
    $folder_name = 'first';
    $static_font_css = setStaticFontCss($folder_name);
    define('STATIC_FONT_CSS', $static_font_css);
    if($folder_name != 'default'){
        $smarty->setTemplateDir(__DIR__.'/../templates/'.$folder_name.'/');
        $smarty->setCompileDir(__DIR__.'/../templates_c/'.$folder_name.'/');
        $smarty->assign('TEMP_FOLDER',$folder_name.'/');
        $smarty->assign('CSS_DEBUG','debug');
        $smarty->assign('FLEXIBLE',FLEXIBLE);
    }else{
        $smarty->setTemplateDir(__DIR__.'/../templates/');
        $smarty->setCompileDir(__DIR__.'/../templates_c/');
        if($folder){
            $smarty->assign('TEMP_FOLDER','default/');
            $smarty->assign('FLEXIBLE',FLEXIBLE);
        }else{
            $smarty->assign('TEMP_FOLDER','');
        }
    }
    $smarty->assign('STATIC_DNS',STATIC_DNS);
    $smarty->assign('STATIC_ICO_CSS',STATIC_ICO_CSS);
    $smarty->assign('STATIC_FONT_CSS',STATIC_FONT_CSS);
    $smarty->assign('STATIC_HOST',STATIC_HOST);
    $smarty->assign('HOST_URL',HOST_URL);
    $smarty->assign('BI_SCRIPT',BI_SCRIPT);
    $smarty->assign('IS_DEBUG',IS_DEBUG);
    $smarty->assign('SKIN_INFO',$folder_name);
    return $smarty;
}
function setStaticFontCss($folder_name){
    if($folder_name && $folder_name == 'default'){
        $folder_name = '';
    }
    return C_RUNTIME_ONLINE?getFontCss($host_name.'/static',$folder_name):getFontCss($host_name.'/static',$folder_name);
}
function set_request_seller_id() {
	// 测试环境，便于h5调试
	if (!C_RUNTIME_ONLINE && $_REQUEST['seller_id']) {
		return;
	}
    include_once( dirname(__FILE__).'/util.php');
	$host_preg = C_RUNTIME_ONLINE ? '/^(www\.)?(.*?)\.instashop\.co\.id$/i' : '/^(www\.)?(.*?)\.test\.instashop\.co\.id$/i';
	$host = $_SERVER['HTTP_HOST'];
	$h_match = preg_match($host_preg, $host, $matches);
	if ($h_match)
	{
		$alias = $matches[2];
	}
	else
	{
		$alias = get_seller_id_by_personal_host($host);
	}
	if(!$_REQUEST['seller_id']){
	    $_REQUEST['seller_id'] = $alias;
	}
}
function getSkinInfo(){
    set_request_seller_id();
    include_once( dirname(__FILE__).'/util.php');
    $seller_id = $_REQUEST['seller_id'];
    if (!$seller_id) {
        $seller_id = getUrlParam('seller_id');
    }
    $skin_path = 'v1/shopsSkin/';
    $skin_ret = json_decode(get_init_php_data($skin_path, ["seller_id" => $seller_id]), true);

    if($skin_ret['code'] == 200){
        return $skin_ret['shop_skin']['name'];
    }else{
        return 'default';
    }
}
function setStaticConfig(){
    $prompt = is_https() ? 'https:' : 'http:';
    $host_name = $prompt.'//'. $_SERVER['HTTP_HOST'];
    $static_host = C_RUNTIME_ONLINE ? $prompt.'//static.instashop.co.id' : $prompt.'//static-test.instashop.co.id';
    $static_ico_css =C_RUNTIME_ONLINE?getIco($prompt.'//m.instashop.co.id'):getIco($prompt.'//m-test.instashop.co.id');
    $host_url =C_RUNTIME_ONLINE?$prompt.'//m.instashop.co.id':$prompt.'//m-test.instashop.co.id';
    $static_dns = '<meta name="spider-id" content="orju7v"><link rel="dns-prefetch" href="//static.instashop.co.id"><link rel="dns-prefetch" href="//imghk0.geilicdn.com">';
    $bi_js = biJs();
    $static_font_css = setStaticFontCss();
    define('STATIC_DNS', $static_dns);
    define('STATIC_FONT_CSS', $static_font_css);
    define('STATIC_ICO_CSS', $static_ico_css);
    define('HOST_URL', $host_url);
    define('STATIC_HOST', $static_host);
    define('HOST_NAME', $host_name);
    define('BI_SCRIPT', $bi_js);
    define('IS_DEBUG', isDebug());
    define('FLEXIBLE', flexible());
    $folder_name = getSkinInfo();
    define('SKIN_INFO', $folder_name);
    $folder_name = 'first';
    if($folder_name != 'default'){
        define('TEMP_FOLDER', $folder_name.'/');
    }else{
        define('TEMP_FOLDER', '');
    }
}

spl_autoload_register('loadClass');
setStaticConfig();
function initPhpJs($js_name){
    $skin_info = '<script>var SKIN="'.SKIN_INFO.'";</script>';
    if(isDebug()){
        return '<script src="'.STATIC_HOST.'/js/base/require-config.js"></script><script src="'.STATIC_HOST.'/js/app/'.$js_name.'.js?v=1493368767032"></script>';
    }else{
        return $skin_info.'<script src="'.STATIC_HOST.'/js/dist/app/'.$js_name.'.js?v=1493368767032"></script>';
    }
}
function initPhpCss($css_name,$folder){
    $folder_name = TEMP_FOLDER;
    if($folder && $folder_name == ''){
        $folder_name = $folder.'/';
    }
    if($folder_name){
        $static_info = STATIC_DNS.STATIC_ICO_CSS.STATIC_FONT_CSS.'<script>'.FLEXIBLE.'</script>';
    }else{
        $static_info = STATIC_DNS.STATIC_ICO_CSS.STATIC_FONT_CSS;
    }
    if(isDebug()){
        if(TEMP_FOLDER){
            return $static_info.'<link href="'.STATIC_HOST.'/css/dist/'.$folder_name.'app/'.$css_name.'.css?v=1493368767032" rel="stylesheet"/>';
        }else{
            return $static_info.'<link href="'.STATIC_HOST.'/css/app/'.$css_name.'.css?v=1493368767032" rel="stylesheet"/>';
        }
    }else{
        return $static_info.'<link href="'.STATIC_HOST.'/css/dist/'.$folder_name.'app/'.$css_name.'.css?v=1493368767032" rel="stylesheet"/>';
    }
}


