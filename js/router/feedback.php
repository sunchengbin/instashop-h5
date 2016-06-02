<?php
include_once('function.php');
include_once('HttpProxy.php');
function dealHeaders()
{
    $headers = getallheaders();
    unset($headers['Host']);
    unset($headers['Accept']);
    unset($headers['Content-Length']);
    $headers['X-HTTP-METHOD-OVERRIDE'] = 'POST';
    $headers['Accept-Encoding'] = ''; // 内网访问ushop接口不用压缩
    return $headers;
}

if(strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
    $host = 'https://api-m-test.instarekber.com/instashop/';   // 测试
}else{
    $host = 'https://apip.instarekber.com/instashop/';
}

$api = 'v1/feedback';
$contact = urlencode($_REQUEST['contact']);
$content = urlencode($_REQUEST['content']);
$sellerId = urlencode($_REQUEST['seller_id']);
$wduss = urlencode($_REQUEST['wduss']);
$url = $host.$api.'?param={%22edata%22:{%22contact%22:%22'.$contact.'%22,%22content%22:%22'.$content.'%22,%22seller_id%22:%22'.$sellerId.'%22,%22wduss%22:%22'.$wduss.'%22}}&callback=jsonp1';
#echo $url;
$headers = dealHeaders();
$method = 'POST';
$res = HttpProxy::getInstance(array('timeout'=>20000, 'conn_timeout'=>20000))->callInterfaceCommon($url, $method, $_POST, $headers);
#echo $res;
header("location:/pages/result/success.html");
exit();
