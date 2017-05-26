<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon();

    //登录信息
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));
    print_r($_COOKIE['uss']);
    print_r($_COOKIE['buyer_id']);

    //页面title
    $smarty->assign('INDEX_TITLE','Keranjangku');

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','cartindex');
    $smarty->assign('INDEX_CSS_NAME','cart');

    //获取购物车商品信息
    $goods = [];
    $goods['data'] = [];
    $goods['hasDistribution'] = true;
    $smarty->assign('GOODS',$goods);


    $smarty->display('cart.tpl');
?>
