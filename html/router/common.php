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
    return '<style>@font-face {font-family: "iconfont";src: url("'.$url.'/css/base/fonts/iconfont.ttf?v=1470022488209") format("truetype"),url("'.$url.'/css/base/fonts/iconfont.svg?v=1470022488209#iconfont") format("svg");}</style>';
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
spl_autoload_register('loadClass');
$prompt = is_https() ? 'https:' : 'http:';
$static_host = C_RUNTIME_ONLINE ? $prompt.'//static.instashop.co.id' : $prompt.'//static-test.instashop.co.id';
$static_font_css =C_RUNTIME_ONLINE?getFontCss('../static'):getFontCss('../static');
$static_ico_css =C_RUNTIME_ONLINE?getIco($prompt.'//m.instashop.co.id'):getIco($prompt.'//m-test.instashop.co.id');
$static_dns = '<link rel="dns-prefetch" href="//static.instashop.co.id"><link rel="dns-prefetch" href="//imghk0.geilicdn.com">';
define('STATIC_DNS', $static_dns);
define('STATIC_FONT_CSS', $static_font_css);
define('STATIC_ICO_CSS', $static_ico_css);
define('STATIC_HOST', $static_host);