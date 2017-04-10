<?php
/**
* 删除js不能处理的特殊字符
**/
if (!function_exists('deal_special_chars')) {
    function deal_special_chars($str) {
        $str = str_replace(" ", " ", $str);
        return $str;
    }
}

function check_api($path, $params){
    if (strpos($_SERVER['HTTP_HOST'],'-test.')!==false || strpos($_SERVER['HTTP_HOST'],'.test.')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
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

    if (strpos($_SERVER['HTTP_HOST'],'-test.')!==false || strpos($_SERVER['HTTP_HOST'],'.test.')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
        $host = 'https://apip-test.instashop.co.id/instashop/';   // 测试
    }else{
        $host = 'https://apip.instashop.co.id/instashop/';
    }
    if (strpos($_SERVER['HTTP_HOST'],'-test.')!==false || strpos($_SERVER['HTTP_HOST'],'.test.')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
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

	if (!C_RUNTIME_ONLINE )
	{
        $params['_debug_env'] = 'master';
        if($_GET['_debug_env']){
            $params['_debug_env'] = $_GET['_debug_env'];
        }
	}

    $api = $host.$path.'?param='.json_encode([ 'edata' => $params  ]);

	Log::debug(['url'=>$api, 'headers'=>deal_headers()]);
    $ret = HttpProxy::getInstance(array('timeout'=>20000, 'conn_timeout'=>20000))->callInterfaceCommon($api, 'POST', [], deal_headers());
    //$ret = file_get_contents($api);
    $ret = deal_special_chars($ret);

    $json = json_decode($ret, true);
    $browser_id = $json["client_uuid"];
    $domain = get_top_domain($_SERVER['HTTP_HOST']);
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
	$path = 'v1/domain';
	$params = [
		'action' => 'by_domain',
		'domain' => $host,
	];
	$ret = get_init_php_data($path, $params);
	$json = json_decode($ret, true);
	if ($json['domains']['seller_id'])
	{
		return intval($json['domains']['seller_id']);
	}
	else
		return false;
}

/**
* 获取定级域名
**/
function get_top_domain($domain) {  
    if (substr ( $domain, 0, 7 ) == 'http://') {  
        $domain = substr ( $domain, 7 );  
    }  
    if (substr ( $domain, 0, 8 ) == 'https://') {  
        $domain = substr ( $domain, 8 );  
    }  
    if (strpos ( $domain, '/' ) !== false) {  
        $domain = substr ( $domain, 0, strpos ( $domain, '/' ) );  
    }  
    $domain =  strtolower ( $domain );  
    $iana_root = array (  
            'ac',  
            'ad',  
            'ae',  
            'aero',  
            'af',  
            'ag',  
            'ai',  
            'al',  
            'am',  
            'an',  
            'ao',  
            'aq',  
            'ar',  
            'arpa',  
            'as',  
            'asia',  
            'at',  
            'au',  
            'aw',  
            'ax',  
            'az',  
            'ba',  
            'bb',  
            'bd',  
            'be',  
            'bf',  
            'bg',  
            'bh',  
            'bi',  
            'biz',  
            'bj',  
            'bl',  
            'bm',  
            'bn',  
            'bo',  
            'bq',  
            'br',  
            'bs',  
            'bt',  
            'bv',  
            'bw',  
            'by',  
            'bz',  
            'ca',  
            'cat',  
            'cc',  
            'cd',  
            'cf',  
            'cg',  
            'ch',  
            'ci',  
            'ck',  
            'cl',  
            'cm',  
            'cn',  
            'co',  
            'com',  
            'coop',  
            'cr',  
            'cu',  
            'cv',  
            'cw',  
            'cx',  
            'cy',  
            'cz',  
            'de',  
            'dj',  
            'dk',  
            'dm',  
            'do',  
            'dz',  
            'ec',  
            'edu',  
            'ee',  
            'eg',  
            'eh',  
            'er',  
            'es',  
            'et',  
            'eu',  
            'fi',  
            'fj',  
            'fk',  
            'fm',  
            'fo',  
            'fr',  
            'ga',  
            'gb',  
            'gd',  
            'ge',  
            'gf',  
            'gg',  
            'gh',  
            'gi',  
            'gl',  
            'gm',  
            'gn',  
            'gov',  
            'gp',  
            'gq',  
            'gr',  
            'gs',  
            'gt',  
            'gu',  
            'gw',  
            'gy',  
            'hk',  
            'hm',  
            'hn',  
            'hr',  
            'ht',  
            'hu',  
            'id',  
            'ie',  
            'il',  
            'im',  
            'in',  
            'info',  
            'int',  
            'io',  
            'iq',  
            'ir',  
            'is',  
            'it',  
            'je',  
            'jm',  
            'jo',  
            'jobs',  
            'jp',  
            'ke',  
            'kg',  
            'kh',  
            'ki',  
            'km',  
            'kn',  
            'kp',  
            'kr',  
            'kw',  
            'ky',  
            'kz',  
            'la',  
            'lb',  
            'lc',  
            'li',  
            'lk',  
            'lr',  
            'ls',  
            'lt',  
            'lu',  
            'lv',  
            'ly',  
            'ma',  
            'mc',  
            'md',  
            'me',  
            'mf',  
            'mg',  
            'mh',  
            'mil',  
            'mk',  
            'ml',  
            'mm',  
            'mn',  
            'mo',  
            'mobi',  
            'mp',  
            'mq',  
            'mr',  
            'ms',  
            'mt',  
            'mu',  
            'museum',  
            'mv',  
            'mw',  
            'mx',  
            'my',  
            'mz',  
            'na',  
            'name',  
            'nc',  
            'ne',  
            'net',  
            'nf',  
            'ng',  
            'ni',  
            'nl',  
            'no',  
            'np',  
            'nr',  
            'nu',  
            'nz',  
            'om',  
            'org',  
            'pa',  
            'pe',  
            'pf',  
            'pg',  
            'ph',  
            'pk',  
            'pl',  
            'pm',  
            'pn',  
            'pr',  
            'pro',  
            'ps',  
            'pt',  
            'pw',  
            'py',  
            'qa',  
            're',  
            'ro',  
            'rs',  
            'ru',  
            'rw',  
            'sa',  
            'sb',  
            'sc',  
            'sd',  
            'se',  
            'sg',  
            'sh',  
            'si',  
            'sj',  
            'sk',  
            'sl',  
            'sm',  
            'sn',  
            'so',  
            'sr',  
            'ss',  
            'st',  
            'su',  
            'sv',  
            'sx',  
            'sy',  
            'sz',  
            'tc',  
            'td',  
            'tel',  
            'tf',  
            'tg',  
            'th',  
            'tj',  
            'tk',  
            'tl',  
            'tm',  
            'tn',  
            'to',  
            'tp',  
            'tr',  
            'travel',  
            'tt',  
            'tv',  
            'tw',  
            'tz',  
            'ua',  
            'ug',  
            'uk',  
            'um',  
            'us',  
            'uy',  
            'uz',  
            'va',  
            'vc',  
            've',  
            'vg',  
            'vi',  
            'vn',  
            'vu',  
            'wf',  
            'ws',  
            'xxx',  
            'ye',  
            'yt',  
            'za',  
            'zm',  
            'zw'   
    );  
    $sub_domain = explode ( '.', $domain );  
    $top_domain = '';  
    $top_domain_count = 0;  
    for($i = count ( $sub_domain ) - 1; $i >= 0; $i --) {  
        if ($i == 0) {  
            // just in case of something like NAME.COM  
            break;  
        }  
        if (in_array ( $sub_domain [$i], $iana_root )) {  
            $top_domain_count ++;  
            $top_domain = '.' . $sub_domain [$i] . $top_domain;  
            if ($top_domain_count >= 2) {  
                break;  
            }  
        }  
    }  
    $top_domain = $sub_domain [count ( $sub_domain ) - $top_domain_count - 1] . $top_domain;  
    return $top_domain;  
}  

//解析URL参数
function parseUrlParam($query){
    $queryArr = explode('&', $query);
    $params = array();
    if($queryArr[0] !== ''){
        foreach( $queryArr as $param ){
            list($name, $value) = explode('=', $param);
            $params[urldecode($name)] = urldecode($value);
        }       
    }
    return $params;
}

//设置URL参数数组
function setUrlParams($cparams, $url = ''){
  $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
  $query = isset($parse_url['query']) ? $parse_url['query'] : '';
  $params = parseUrlParam($query);
  foreach( $cparams as $key => $value ){
    $params[$key] = $value;
  }
  return $parse_url['path'].'?'.http_build_query($params);
}

//获取URL参数
function getUrlParam($cparam, $url = ''){
    $parse_url = $url === '' ? parse_url($_SERVER["REQUEST_URI"]) : parse_url($url);
    $query = isset($parse_url['query']) ? $parse_url['query'] : '';
    $params = parseUrlParam($query);
    return isset($params[$cparam]) ? $params[$cparam] : '';
}

?>
