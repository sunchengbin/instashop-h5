<?php
function check_api($path, $params){
    if (strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
        $host = 'https://apip-test.instashop.co.id/instashop/';   // 测试
    }else{
        $host = 'https://apip.instashop.co.id/instashop/';
    }
    $api = $host.$path.'?param='.(json_encode([ 'edata' => $params  ]));
    return $api;
}

if (!function_exists('get_all_headers')) {
    function get_all_headers() {
        $headers = array();
        foreach ($_SERVER as $name => $value) {
           if (substr($name, 0, 5) == 'HTTP_') {
               $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
           }
       }
       return $headers;
    }
}

function deal_headers() {
    $headers = get_all_headers();
    unset($headers['Host']);
    unset($headers['Accept']);
    unset($headers['Content-Length']);
    if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
        $headers['X-HTTP-METHOD-OVERRIDE'] = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
    }
    $headers['Accept-Encoding'] = ''; // 内网访问ushop接口不用压缩
	if (isset($headers['X-Forwarded-For']) && $headers['X-Forwarded-For'])
	{
		$headers['X-Forwarded-Ip']= $headers['X-Forwarded-For'];
	}
	else
	{
		$headers['X-Forwarded-Ip']= $_SERVER['REMOTE_ADDR'];
	}
    return $headers;
}

function get_init_php_data($path, $params){
    require_once('HttpProxy.php');

    if (strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
        $host = 'https://apip-test.instashop.co.id/instashop/';   // 测试
    }else{
        $host = 'https://apip.instashop.co.id/instashop/';
    }
    $domain = "instashop.co.id";
    if (strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
        $cookie_name = "test_browser_id";
    } else {
        $cookie_name = "browser_id";
    }

	$browser_id = null;
	if (isset($_COOKIE[$cookie_name]))
	{
		$browser_id = $_COOKIE[$cookie_name];
	}
    $params['client_uuid'] = $browser_id;

    $api = $host.$path.'?param='.json_encode([ 'edata' => $params  ]);

	Log::debug(['url'=>$api, 'headers'=>deal_headers()]);
    $ret = HttpProxy::getInstance(array('timeout'=>20000, 'conn_timeout'=>20000))->callInterfaceCommon($api, 'POST', [], deal_headers());
    //$ret = file_get_contents($api);

    $json = json_decode($ret, true);
    $browser_id = $json["client_uuid"];
    setcookie($cookie_name, $browser_id, time() + 3650*24*3600, '/', $domain);
    return $ret;
}

function get_init_data($path, $params){
    $ret = get_init_php_data($path, $params);
    return json_encode($ret);
}

/**
* 根据用户自己的域名获取seller_id
**/
function get_seller_id_by_personal_host($host)
{
	return 40778;
}

?>
