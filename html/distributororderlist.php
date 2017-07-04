<?php

    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default_scss','default_tpl');

    $buyer_id = $_REQUEST['uss_buyer_id'];
    $seller_id = 0;
    $uss = $_REQUEST['uss'];
    $path = 'v1/orders';
    $params = [];
    $params["buyer_id"] = $buyer_id;
    $params["uss"] = $uss;
    $params["page_num"] = 0;
    $params["page_size"] = 20;
    $params["seller_id"] = $seller_id;
    $params["action"] = 'buyer_list';


    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);

    $smarty->assign('INDEX_DATA_STR',$ret);
    $smarty->assign('INDEX_DATA',$json["order_list"]["list"]);

    $index_title = '<title>Pesanan Saya</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_CSS_NAME','usercenter');
    $smarty->assign('INDEX_JS_NAME','distributororderlist');
    $smarty->display('distributororderlist.tpl');
?>
