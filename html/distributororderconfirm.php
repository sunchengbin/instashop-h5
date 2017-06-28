
<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default_scss','default_tpl');

    //登录信息
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));

    //页面title
    $smarty->assign('INDEX_TITLE','<title>Order</title>');

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','distributororderconfirm');
    $smarty->assign('INDEX_CSS_NAME','distributororderconfirm');

    //获取订单确认页信息
    $params = [];
    $params['seller_id'] = 0;
    $params['uss'] = $_REQUEST['uss'];
    $params['buyer_id'] = $_REQUEST['uss_buyer_id'];
    $params['opt'] = 'address,price,express';
    $params['select_items'] = json_decode($_REQUEST['select_items'], true);
    $params['is_direct_buy'] = 2;
    $params['buyer_address_id'] = $_REQUEST['address_id'];
    $path = 'v1/buyerCart/';
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $json['carts']=setCarts($json['buyer_cart'])[0];
    function setCarts($buyer_cart){
        $result = [];
        foreach ($buyer_cart as $carts){
            $result[] = $carts;
        }
        return $result;
    }
    $smarty->assign('SHOW_SEND_USER_INFO',$_REQUEST['type']);
    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('INDEX_DATA_STR',$ret);


    $smarty->display('distributororderconfirm.tpl');
?>