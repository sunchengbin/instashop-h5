<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');

    $smarty = smartyCommon();

    /*HOST_NAME*/
    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);

    /*获取item页面的数据*/
    $params = [];
    $item_id = $_REQUEST['item_id'];
    if (!$item_id) {
        $ss = split('\/', $_SERVER['REQUEST_URI']);
        $item_id = end($ss);
    }
    $params["opt"] = 'H5_Detail,bargain';
    $path = 'v1/items/'.$item_id;
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $url = $json['item']['img'];
    $url = str_replace("w=110", "w=140", $url);
    $url = str_replace("h=110", "h=140", $url);

    


    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('INDEX_DATA_SHOP',$json['item']);
    $smarty->assign('INDEX_DATA_STR',$ret);
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));

    /*item页面支持app分享的数据*/
    $item_title = '<meta property="og:image" content="'.$url.'"><title>'.$json["item"]["item_name"].'</title>';
    $smarty->assign('INDEX_TITLE',$item_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','detail');
    $smarty->assign('INDEX_CSS_NAME','detail');

    //请求第三个tab数据
    // 获取店铺信息
    $seller_id = $json['item']['shop']['id'];
    $path = 'v1/shops/'.$seller_id;
    $paramsForShopInfo = [
        'action' => 'index_shopinfo',
        'platform' => 'web'
    ];
    $ret = get_init_php_data($path, $paramsForShopInfo);
    $json = json_decode($ret, true);
    $smarty->assign('SHOP_INFO_DATA_STR',$ret);
    $smarty->assign('SHOP_INFO_DATA',$json["shop"]);


    $smarty->display('detail.tpl');


?>
