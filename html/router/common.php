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
function getFontCss($url){
    return '<style>@font-face {font-family: "iconfont";src: url("'.$url.'/css/base/fonts/iconfont.ttf?v=1481603229710") format("truetype"),url("'.$url.'/css/base/fonts/iconfont.svg?v=1481603229710#iconfont") format("svg");}</style>';
}
function getIco($url){
    return '<link rel="shortcut icon" href="'.$url.'/favicon.ico" type="image/vnd.microsoft.icon"><link rel="icon" href="'.$url.'/favicon.ico" type="image/vnd.microsoft.icon">';
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
    $wduss = $_REQUEST['wduss'];
    $params = [
        'seller_id' => $seller_id,
        'wduss' => urlencode($wduss)
    ];
    return $params;
}
function biJs(){
$js = <<<JS
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
        var _shop_data = localStorage.getItem('ShopData');
        var _s_id = _shop_data?JSON.parse(_shop_data).ShopInfo.id:-1;
        if(getUrlPrem('seller_id')){
            _s_id = -1;
        }
        var _WD_s_id = _s_id;
        //获取当前时间
        var date=new Date();
        var expireDays=10;
        //将date设置为10天以后的时间
        date.setTime(date.getTime()+expireDays*24*3600*1000);
        //将WD_s_id cookie设置为10天后过期
        document.cookie="WD_s_id="+_WD_s_id+";expire="+date.toGMTString();
        return _WD_s_id;
    }
    var _paq = _paq || [];
      _paq.push(['trackPageView']);
      (function(){
          var is_https = ("https:" === document.location.protocol) ? 1 : 0,
          u = (is_https ? "https" : "http") + "://di.instashop.co.id/";
          _paq.push(['setTrackerUrl', u +'index.php'+ '?userID=-1&sellerID='+getSellerID()]);
          _paq.push(['setSiteId', 1]);
          var d = document,
              g = d.createElement('script'),
              s = d.getElementsByTagName('script')[0];
          g.type='text/javascript';
          g.defer=true;
          g.async=true;
          g.src=is_https ? 'http://di.instashop.co.id/piwik-spm.js' : 'http://di.instashop.co.id/piwik-spm.js';
          s.parentNode.insertBefore(g,s);
      })();
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
spl_autoload_register('loadClass');
$prompt = is_https() ? 'https:' : 'http:';
$host_name = $prompt.'//'. $_SERVER['HTTP_HOST'];
$static_host = C_RUNTIME_ONLINE ? $prompt.'//static.instashop.co.id' : $prompt.'//static-test.instashop.co.id';
$static_font_css =C_RUNTIME_ONLINE?getFontCss($host_name.'/static'):getFontCss($host_name.'/static');
$static_ico_css =C_RUNTIME_ONLINE?getIco($prompt.'//m.instashop.co.id'):getIco($prompt.'//m-test.instashop.co.id');
$static_dns = '<meta name="spider-id" content="orju7v"><link rel="dns-prefetch" href="//static.instashop.co.id"><link rel="dns-prefetch" href="//imghk0.geilicdn.com">';
$bi_js = biJs();
define('STATIC_DNS', $static_dns);
define('STATIC_FONT_CSS', $static_font_css);
define('STATIC_ICO_CSS', $static_ico_css);
define('STATIC_HOST', $static_host);
define('HOST_NAME', $host_name);
define('BI_SCRIPT', $bi_js);
