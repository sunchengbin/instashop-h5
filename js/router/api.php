<?php
/**
 * Created by PhpStorm.
 * User: tanszhe
 * Date: 15/8/21
 * Time: 下午2:20
 */

// header('Access-Control-Allow-Origin:http://localhost:3000');
include_once('function.php');
include_once('HttpProxy.php');


function dealHeaders()
{
	$headers = getallheaders();
	unset($headers['Host']);
	unset($headers['Accept']);
	unset($headers['Content-Length']);
	if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']));
	{
		$headers['X-HTTP-METHOD-OVERRIDE'] = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
	}
	$headers['Accept-Encoding'] = ''; // 内网访问ushop接口不用压缩
	return $headers;
}


function curl_post($url,$data)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);

    curl_close($ch);
    if ($result == NULL) {
        return 0;
    }
    return $result;
}

if(strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
    $host = 'https://api-m-test.instarekber.com/instashop/';   // 测试
      // $host = 'http://10.5.15.10:8888/instashop/';  //本地
    // $host = 'https://apip.instarekber.com/instashop/';
}else{
    // $host = 'https://api-m.instarekber.com/';
    // $host = 'http://10.5.15.10:8888/instashop/';
    $host = 'https://apip.instarekber.com/instashop/';
}

$api = trim($_GET['_path_'],' /');

if(!$api){
    exit('{"error":1}');
}
unset($_GET['_path_']);
$url = $host.$api.'?'.http_build_query($_GET);
// echo $url;
// var_dump( $_POST );
$headers = dealHeaders();
// var_dump( $headers );
$method = 'POST';
$res = HttpProxy::getInstance(array('timeout'=>20000, 'conn_timeout'=>20000))->callInterfaceCommon($url, $method, $_POST, $headers);
echo $res;
