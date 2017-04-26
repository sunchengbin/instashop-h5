<?php

    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default');

    $buyer_id = $_REQUEST['buyer_id'];
    $uss = $_REQUEST['uss'];
    $path = 'v1/orders';
    $params = [];
    $params["buyer_id"] = $buyer_id;
    $params["uss"] = $uss;
    $params["state"] = 'unpaid';
    $params["warrant"] = 1;
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);

    $smarty->assign('INDEX_DATA',$json["order_list"]["list"]);

    $index_title = '<title>用户中心</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_CSS_NAME','usercenter');
    $smarty->assign('INDEX_JS_NAME','usercenter');
    $smarty->display('usercenter.tpl');
?>
