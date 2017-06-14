
<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default_scss');

    //登录信息
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));

    //页面title
    $smarty->assign('INDEX_TITLE','<title>Order</title>');

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','orderconfirm');
    $smarty->assign('INDEX_CSS_NAME','orderconfirm');

    //获取订单确认页信息
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
    $params['opt'] = 'address,price,express';
    $params['select_items'] = json_decode($_REQUEST['select_items'], true);
    $params['is_direct_buy'] = 0;
    $params['buyer_address_id'] = $_REQUEST['address_id'];
    $path = 'v1/buyerCart/';
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $smarty->assign('DATA',$json);
    $smarty->assign('DATA_STR',$ret);


    $smarty->display('orderconfirm.tpl');
?>