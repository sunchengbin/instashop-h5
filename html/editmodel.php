<?php
    print_r($_REQUEST);
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    print_r($_REQUEST);
    $skin = getUrlParam('skin');
    $smarty = smartyCommon($skin);
    /*获取model页面的数据*/

    $params = getSellerInfo();
    $path = 'v1/shopsTemplate';
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);

    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('INDEX_DATA_STR',$ret);

    $seller_id = $_REQUEST['seller_id'];
    print_r($_REQUEST);
    exit;
    if (!$seller_id) {
        $ss = split('\/', $_SERVER['REQUEST_URI']);
        if(split('\?', $_SERVER['REQUEST_URI']).length > 0){
            $si = split('\?',end($ss))[0];
            $seller_id = $si;
        }else{
            $seller_id = end($ss);
        }
    }
    $path_shop_info = 'v1/shops/'.$seller_id;
    $paramsForShopInfo = [
        'action' => 'index_shopinfo',
        'platform' => 'web'
    ];
    $ret_shop_info = get_init_php_data($path_shop_info, $paramsForShopInfo);
    $shop_info = json_decode($ret_shop_info, true);
    $smarty->assign('SHOP_INFO_DATA_STR',$ret_shop_info);
    $smarty->assign('SHOP_INFO_DATA',$shop_info["shop"]);

    $itemtype = getItemListType($json["template"]);
    $smarty->assign('ITEMTYPE',$itemtype);

    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);

    $index_title = '<title>Kreasikan Tokomu</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','editmodel');
    $smarty->assign('INDEX_CSS_NAME','editmodel');
    $smarty->display('editmodel.tpl');
?>
