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
	$host_preg = C_RUNTIME_ONLINE ? '/^(.*?)\.instashop\.co\.id$/i' : '/^(.*?)\.test\.instashop\.co\.id$/i';
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

	$alias = $matches[1];
	$_REQUEST['seller_id'] = $alias;

	$u_match = preg_match('/^\/(\d+)(\?.*)?$/i', $uri, $item_matches);
	if ($u_match)
	{
		$item_id = $item_matches[1];
		$_REQUEST['item_id'] = $item_id;
		require( dirname(__FILE__).'/../html/detail.php');
	}
	else
	{
		require( dirname(__FILE__).'/../html/index.php');
	}
}

Timer::start('total');
handle();
Timer::end('total');

$application_run_flag = true;

Log::debug(['request'=>$_REQUEST, 'time'=>Timer::calculate()]);
exit();
?>