<?php
date_default_timezone_set('Asia/Chongqing');
header('Content-type: text/html; charset=utf-8');
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
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
    return '<style>@font-face {font-family: "iconfont";src: url("'.$url.'/css/base/fonts/iconfont.ttf?v=1467290761352") format("truetype"),url("'.$url.'/css/base/fonts/iconfont.svg#iconfont") format("svg");}</style>';
}
spl_autoload_register('loadClass');

$static_host = C_RUNTIME_ONLINE ? 'http://static.instashop.co.id' : 'http://static-test.instashop.co.id/static';
$static_font_css =C_RUNTIME_ONLINE?getFontCss('http://static.instashop.co.id'):getFontCss('http://static-test.instashop.co.id/static');
define('STATIC_FONT_CSS', $static_font_css);
define('STATIC_HOST', $static_host);