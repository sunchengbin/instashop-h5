<?php
/***************************************************************************
 *
 * Copyright (c) 2009 Baidu.com, Inc. All Rights Reserved
 * $Id: HttpProxy.class.php,v 1.4 2009/11/12 09:03:48 zhujt Exp $
 *
 **************************************************************************/

/**
 * @file HttpProxy.class.php
 * @author zhujt(zhujianting@baidu.com)
 * @date 2009/05/11 11:35:23
 * @version $Revision: 1.4 $
 * @brief
 *
 **/

if (!defined('CURLOPT_CONNECTTIMEOUT_MS')) {
    define('CURLOPT_CONNECTTIMEOUT_MS', 156);
}
if (!defined('CURLOPT_TIMEOUT_MS')) {
    define('CURLOPT_TIMEOUT_MS',155);
}
class HttpProxy
{
    const SUCCESS = 0;				//成功
    const errUrlInvalid = 1;		//非法url
    const errServiceInvalid = 2;	//对端服务不正常
    const errHttpTimeout = 3;		//交互超时，包括连接超时
    const errTooManyRedirects = 4;	//重定向次数过多
    const errTooLargeResponse = 5;	//响应内容过大
    const errResponseErrorPage = 6;	//返回错误页面
    const errNoResponse = 7;		//没有响应包
    const errNoResponseBody = 8;	//响应包中没有body内容
    const errOtherEror = 9;			//其余错误

    protected $curl;
    protected $curl_info;
    protected $curl_options = null;	//curl options

    protected $max_response_size;	//max response body size

    protected $errno;
    protected $errmsg;
    protected $header;
    protected $body;
    protected $body_len;

    private static $instance = null;

    protected function __construct($options = null)
    {
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';

        $this->reset();

        $this->curl_options = array(
            'follow_location' => false,
            'max_redirs' => 1,
            'conn_retry' => 3,
            'conn_timeout' => 1000,
            'timeout' => 3000,
            'user_agent' => $user_agent,
            'referer' => $referer,
            'encoding' => '',
            'max_response_size' => 512000,	//default is 500k
        );

        $this->setOptions($options);
    }

    public static function getInstance($options = null)
    {
        if( self::$instance === null )
        {
            self::$instance = new HttpProxy($options);
        }
        else
        {
            self::$instance->setOptions($options);
        }
        return self::$instance;
    }

    public static function onResponseHeader($curl, $header)
    {
        $proxy = HttpProxy::getInstance();
        $proxy->header .= $header;

        $trimmed = trim($header);
        if( preg_match('/^Content-Length: (\d+)$/i', $trimmed, $matches) )
        {
            $content_length = $matches[1];
            if( $content_length > $proxy->max_response_size )
            {
                $proxy->body_len = $content_length;
                return 0;
            }
        }

        return strlen($header);
    }

    public static function onResponseData($curl, $data)
    {
        $proxy = HttpProxy::getInstance();

        $chunck_len = strlen($data);
        $proxy->body .= $data;
        $proxy->body_len += $chunck_len;

        if( $proxy->body_len <= $proxy->max_response_size )
        {
            return $chunck_len;
        }
        else
        {
            return 0;
        }
    }

    public function setOptions($options)
    {
        if( is_array($options) )
        {
            //$options + $default_options results in an assoc array with overlaps
            //deferring to the value in $options
            $this->curl_options = $options + $this->curl_options;
        }

        $this->max_response_size = $this->curl_options['max_response_size'];
    }

    public function get($url, $cookie = array())
    {
        $this->reset();

        extract($this->curl_options);

        $curl = curl_init();
        if( $max_redirs < 1 )
        {
            $max_redirs = 1;
        }

        $curl_opts = array( CURLOPT_URL => $url,
            CURLOPT_NOSIGNAL => 1,          //注意，毫秒超时一定要设置这个
            CURLOPT_CONNECTTIMEOUT_MS => $conn_timeout,
            CURLOPT_TIMEOUT_MS => $timeout, //超时毫秒，cURL 7.16.2中被加入。从PHP 5.2.3起可使用
            CURLOPT_USERAGENT => $user_agent,
            CURLOPT_REFERER => $referer,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => false,
            CURLOPT_FOLLOWLOCATION => $follow_location,
            CURLOPT_MAXREDIRS => $max_redirs,
            CURLOPT_ENCODING => $encoding,
            CURLOPT_WRITEFUNCTION => 'HttpProxy::onResponseData',
            CURLOPT_HEADERFUNCTION => 'HttpProxy::onResponseHeader',
        );

        if( is_array($cookie) && count($cookie) > 0 )
        {
            $cookie_str = '';
            foreach( $cookie as $key => $value )
            {
                $cookie_str .= "$key=$value; ";
            }
            $curl_opts[CURLOPT_COOKIE] = $cookie_str;
        }

        curl_setopt_array($curl, $curl_opts);

        curl_exec($curl);

        $errno = curl_errno($curl);
        $errmsg = curl_error($curl);
        $this->curl_info = curl_getinfo($curl);

        curl_close($curl);

        if( $this->check_http_response($url, $errno, $errmsg) )
        {
            return $this->body;
        }

        return false;
    }

    public function post($url, $params, $cookie = array())
    {
        $this->reset();

        extract($this->curl_options);

        $curl = curl_init();
        if( $max_redirs < 1 )
        {
            $max_redirs = 1;
        }

        $curl_opts = array( CURLOPT_URL => $url,
            CURLOPT_NOSIGNAL => 1,          //注意，毫秒超时一定要设置这个
            CURLOPT_CONNECTTIMEOUT_MS => $conn_timeout,
            CURLOPT_TIMEOUT_MS => $timeout, //超时毫秒，cURL 7.16.2中被加入。从PHP 5.2.3起可使用
            CURLOPT_USERAGENT => $user_agent,
            CURLOPT_REFERER => $referer,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => false,
            CURLOPT_ENCODING => $encoding,
            CURLOPT_WRITEFUNCTION => 'HttpProxy::onResponseData',
            CURLOPT_HEADERFUNCTION => 'HttpProxy::onResponseHeader',
        );

        if( is_array($cookie) && count($cookie) > 0 )
        {
            $cookie_str = '';
            foreach( $cookie as $key => $value )
            {
                $cookie_str .= "$key=$value; ";
            }
            $curl_opts[CURLOPT_COOKIE] = $cookie_str;
        }

        curl_setopt_array($curl, $curl_opts);

        $last_url   = $url;
        $redirects  = 0;
        $retries    = 0;

        $post_str = http_build_query($params);
        //$post_str = $params; //upload image to use this

        if( $max_redirs == 1 )
        {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $post_str);
            //echo $post_str;
            curl_exec($curl);
            $errno = curl_errno($curl);
            $errmsg = curl_error($curl);
            $this->curl_info = curl_getinfo($curl);
        }
        else
        {
            $start_time = microtime(true);
            for( $attempt = 0; $attempt < $max_redirs; $attempt++ )
            {
                curl_setopt($curl, CURLOPT_POSTFIELDS, $post_str);
                curl_exec($curl);
                $errno = curl_errno($curl);
                $errmsg = curl_error($curl);
                $this->curl_info = curl_getinfo($curl);

                //Remove any HTTP 100 headers
                if( ($curl_info['http_code'] == 301 ||
                        $curl_info['http_code'] == 302 ||
                        $curl_info['http_code'] == 307) &&
                    preg_match('/Location: ([^\r\n]+)\r\n/si', $this->header, $matches) )
                {
                    $new_url = $matches[1];

                    //if $new_url is relative path, prefix with domain name
                    if( !preg_match('/^http(|s):\/\//', $new_url) &&
                        preg_match('/^(http(?:|s):\/\/.*?)\//', $url, $matches) )
                    {
                        $new_url = $matches[1] . '/' . $new_url;
                    }
                    $last_url = $new_url;
                    curl_setopt($curl, CURLOPT_URL, $new_url);

                    //reduce the timeout, but keep it at least 1 or we wind up with an infinite timeout
                    curl_setopt($curl, CURLOPT_TIMEOUT_MS, max($start_time + $timeout - microtime(true), 1));
                    ++$redirects;
                }
                elseif( $conn_retry && strlen($this->header) == 0 )
                {
                    //probably a connection failure...if we have time, try again...
                    $time_left = $start_time + $timeout - microtime(true);
                    if( $time_left < 1 )
                    {
                        break;
                    }
                    // ok, we've got some time, let's retry
                    curl_setopt($curl, CURLOPT_URL, $last_url);
                    curl_setopt($curl, CURLOPT_TIMEOUT_MS, $time_left);
                    ++$retries;
                }
                else
                {
                    break; // we have a good response here
                }
            }
        }

        curl_close($curl);

        if( $this->check_http_response($url, $errno, $errmsg) )
        {
            return $this->body;
        }

        return false;
    }

    public function content_type()
    {
        //take content-type field into account first
        if( !empty($this->curl_info['content_type']) &&
            preg_match('#charset=([^;]+)#i', $this->curl_info['content_type'], $matches) )
        {
            return $matches[1];
        }

        return false;
    }

    public function body()
    {
        return $this->body;
    }

    public function cookie()
    {
        if( empty($this->header) )
        {
            return array();
        }

        $new_cookie = array();

        $headers = explode("\n", $this->header);
        foreach( $headers as $item )
        {
            if( strncasecmp($item, 'Set-Cookie:', 11) === 0 )
            {
                $cookiestr = trim(substr($item, 11, -1));
                $cookie = explode(';', $cookiestr);
                $cookie = explode('=', $cookie[0]);

                $cookiename = trim(array_shift($cookie));
                $new_cookie[$cookiename] = trim(implode('=', $cookie));
            }
        }

        return $new_cookie;
    }

    public function errno()
    {
        return $this->errno;
    }

    public function errmsg()
    {
        return $this->errmsg;
    }

    private function check_http_response($url, $errno, $errmsg)
    {
        $url = htmlspecialchars($url, ENT_QUOTES);

        $http_code = $this->curl_info['http_code'];

        if( $errno == CURLE_URL_MALFORMAT ||
            $errno == CURLE_COULDNT_RESOLVE_HOST )
        {
            $this->errno = self::errUrlInvalid;
            $this->errmsg = "The URL $url is not valid.";
        }
        elseif( $errno == CURLE_COULDNT_CONNECT )
        {
            $this->errno = self::errServiceInvalid;
            $this->errmsg = "Service for URL[$url] is invalid now, errno[$errno] errmsg[$errmsg]";
        }
        elseif( $errno == 28/*CURLE_OPERATION_TIMEDOUT*/ )
        {
            $this->errno = self::errHttpTimeout;
            $this->errmsg = "Request for $url timeout: $errmsg";
        }
        elseif( $errno == CURLE_TOO_MANY_REDIRECTS ||
            $http_code == 301 || $http_code == 302 || $http_code == 307 )
        {
            //$errno == CURLE_OK can only indicate that the response is received, but it may
            //also be an error page or empty page, so we also need more checking when $errno == CURLE_OK
            $this->errno = self::errTooManyRedirects;
            $this->errmsg = "Request for $url caused too many redirections.";
        }
        elseif( $http_code >= 400 )
        {
            $this->errno = self::errResponseErrorPage;
            $this->errmsg = "Received HTTP error code $http_code while loading $url";
        }
        elseif( $this->body_len > $this->max_response_size )
        {
            $this->errno = self::errTooLargeResponse;
            $this->errmsg = "Response body for $url has at least {$this->body_len} bytes, " .
                "which has exceed the max response size[{$this->max_response_size}]";
        }
        elseif( $errno != CURLE_OK )
        {
            if( $this->body_len == 0 )
            {
                if( $http_code )
                {
                    $this->errno = self::errNoResponseBody;
                    $this->errmsg = "Request for $url returns HTTP code $http_code and no data.";
                }
                else
                {
                    $this->errno = self::errNoResponse;
                    $this->errmsg = "The URL $url has no response.";
                }
            }
            else
            {
                $this->errno = self::errOtherEror;
                $this->errmsg = "Request for $url failed, errno[$errno] errmsg[$errmsg]";
            }
        }
        else
        {
            $this->errno = self::SUCCESS;
            $this->errmsg = '';
            return true;
        }

        return false;
    }

    private function reset()
    {
        $this->errno = self::SUCCESS;
        $this->errmsg = '';
        $this->header = '';
        $this->body = '';
        $this->body_len = 0;
    }

    public  function https_post($url, $postFields = null, $header = null) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FAILONERROR, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $this->curl_options['conn_timeout']);
        if(!empty($header)) curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

        if (!empty($postFields)){

            curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
        }
        $reponse = curl_exec($ch);
        if (curl_errno($ch)){
            Log::warning('curl errmsg:' .  curl_error($ch) );
            return false;
        }
        else{
            $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if (200 !== $httpStatusCode){
                Log::warning('curl error, httpStatusCode:' .  $httpStatusCode );
                return false;
            }
        }
        curl_close($ch);
        return $reponse;
    }


	/**
	* 不同method请求
	* @author yuhaiwei
	**/
    function callInterfaceCommon($url, $method, $params, $headers){
        $this->reset();

        extract($this->curl_options);
        $ch = curl_init();
        curl_setopt ($ch, CURLOPT_URL, $url);
        if($headers){
			$headers_arr = array();
			while (list($key, $value) = each($headers)) {
			  $headers_arr[] = "$key: $value";
			}
		curl_setopt( $ch, CURLOPT_HEADER, 0);
            curl_setopt ($ch, CURLOPT_HTTPHEADER, $headers_arr);
		}
		curl_setopt( $ch, CURLOPT_HEADER, 0);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT_MS, $conn_timeout);
        curl_setopt ($ch, CURLOPT_TIMEOUT_MS, $timeout);
		$params_str = http_build_query($params);
        switch ($method){
            case "GET" : curl_setopt($ch, CURLOPT_HTTPGET, true);break;
			      case "PUT":
			      case "DELETE":
            case "POST": curl_setopt($ch, CURLOPT_POST,true);
                         curl_setopt($ch, CURLOPT_POSTFIELDS,$params_str);break;
//            case "PUT" : curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "PUT");
//                         curl_setopt($ch, CURLOPT_POSTFIELDS,$params_str);break;
//            case "DELETE":curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
//                          curl_setopt($ch, CURLOPT_POSTFIELDS,$params_str);break;
        }
        $file_contents = curl_exec($ch);//获得返回值
        $this->curl_info = curl_getinfo($ch);
        curl_close($ch);
        return $file_contents;
    }

	function getStatusCode()
	{
		return $this->curl_info['http_code'];
	}

}


/* vim: set ts=4 sw=4 sts=4 tw=90 noet: */
?>
