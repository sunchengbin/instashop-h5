<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default_scss','default_tpl');

    //登录信息
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));

    //页面title
    $smarty->assign('INDEX_TITLE','<title>Keranjangku</title>');

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','distributorcart');
    $smarty->assign('INDEX_CSS_NAME','distributorcart');

    //获取购物车商品信息
    $params = [];
    $params['seller_id'] = 0;
    $params['is_direct_buy'] = 2;
    $params['uss'] = $_REQUEST['uss'];
    $params['buyer_id'] = $_REQUEST['uss_buyer_id'];
    $params['opt'] = 'cart';
    $path = 'v1/buyerCart/';
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $goods = [];
    $goods['data'] = $json['buyer_cart'];
    $goods['hasDistribution'] = true;
    $smarty->assign('GOODS',$goods);
    $smarty->assign('CART_GOODS',$ret);
    $smarty->display('distributorcart.tpl');
?>
