<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default');

    //登录信息
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));

    //页面title
    $smarty->assign('INDEX_TITLE','<title>Keranjangku</title>');

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','cartindex');
    $smarty->assign('INDEX_CSS_NAME','cart');

    //获取购物车商品信息
    $params = [];
    $uss = $_COOKIE['uss'];
    $params['seller_id'] = $_REQUEST['seller_id'];
    $params['is_direct_buy'] = 0;
    if($uss){
        $params['uss'] = $uss;
        $params['buyer_id'] = $_COOKIE['uss_buyer_id'];
    }else{
        $params['buyer_id'] = $_COOKIE['buyer_id'];
    }
    $path = 'v1/buyerCart/';
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $goods = [];
    $goods['data'] = $json['buyerCart'];
    $goods['hasDistribution'] = false;

    $smarty->assign('GOODS',$goods);


    $smarty->display('cart.tpl');
?>
