<?php
include_once( dirname(__FILE__).'/../html/router/common.php');

$application_run_flag = false;
function shutdown_func()
{
    global $application_run_flag;
    if (!$application_run_flag) {
        $err = error_get_last();
        if ($err) {
            if (in_array($err['type'], array(E_ERROR, E_PARSE))) {
                Log::error($err);
            }
        }
    }
    return false;
}
register_shutdown_function("shutdown_func");


function handle()
{
	$host_preg = C_RUNTIME_ONLINE ? '/^(www\.)?(.*?)\.instashop\.co\.id$/i' : '/^(www\.)?(.*?)\.test\.instashop\.co\.id$/i';
	$host = $_SERVER['HTTP_HOST'];
	$uri = $_SERVER['REQUEST_URI'];
	$h_match = preg_match($host_preg, $host, $matches);
	if (!$h_match)
	{
		@header("http/1.1 404 not found");
		@header("status: 404 not found");
		Log::debug('404');
		echo '404 not found';//直接输出页面错误信息
		exit();
	}

	$alias = $matches[2];
	$_REQUEST['seller_id'] = $alias;

	if (preg_match('/^\/(\d+)(\?.*)?$/i', $uri, $item_matches))
	{
		$item_id = $item_matches[1];
		$_REQUEST['item_id'] = $item_id;
		require( dirname(__FILE__).'/../html/detail.php');
	}
	else if (preg_match('/^\/o\/([0-9a-zA-Z]{5})(\?.*)?$/i', $uri, $order_matches))
	{
		$order_id = $order_matches[1];
		$_REQUEST['order_id'] = $order_id;
		require( dirname(__FILE__).'/../html/orderdetail.php');
	}
	else if (preg_match('/^\/notice\/(\d+)(\?.*)?$/i', $uri, $notice_matches))
	{
		$notice_id = $notice_matches[1];
		$_REQUEST['notice_id'] = $notice_id;
		require( dirname(__FILE__).'/../html/notice.php');
	}
	else if (preg_match('/^\/address\/([0-9a-zA-Z_]+)(\?.*)?$/i', $uri, $cart_matches))
	{
		$cart_id = $cart_matches[1];
		$_REQUEST['cart_id'] = $cart_id;
		require( dirname(__FILE__).'/../html/quickcarts.php');
	}
	else if (preg_match('/^\/k\/(\d+)(\?.*)?$/i', $uri, $sort_matches))
	{
		$sort_id = $sort_matches[1];
		$_REQUEST['sort_id'] = $sort_id;
		require( dirname(__FILE__).'/../html/sort.php');
	}
	else if (preg_match('/^\/html\/(.*?)(\?.*)?$/i', $uri, $f_matches))
	{
		require( dirname(__FILE__)."/../html/".$f_matches[1]);
	}
	else if (preg_match('/^\/(\?.*)?$/i', $uri))
	{
		require( dirname(__FILE__).'/../html/index.php');
	}
	else
	{
		@header("http/1.1 404 not found");
		@header("status: 404 not found");
		Log::debug('404');
		echo '404 not found';//直接输出页面错误信息
		exit();
	}
}

Timer::start('total');
handle();
Timer::end('total');

$application_run_flag = true;

Log::debug(['request'=>$_REQUEST, 'time'=>Timer::calculate()]);
exit();
?>