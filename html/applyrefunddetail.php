<?php

    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default_scss');

    $order_id = $_REQUEST['order_id'];
    $buyer_id = $_REQUEST['buyer_id'];
    $uss = $_REQUEST['uss'];
    $item_id = $_REQUEST['item_id'];
    $item_sku_id = $_REQUEST['item_sku_id'];
    $path = 'v1/orders/'.$order_id;
    $params = [];
    $params["buyer_id"] = $buyer_id;
    $params["uss"] = $uss;
    $params["action"] = 'refund_detail';
    $params["item_id"] = $item_id;
    $params["item_sku_id"] = $item_sku_id;
    $params["opt"] = 'id_hash';

    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);

    $smarty->assign('INDEX_DATA',$json["refund_detail"]);

    $index_title = '<title>Status Pengembalian Dana</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_CSS_NAME','applyrefunddetail');
    $smarty->display('applyrefunddetail.tpl');
?>
