<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default_scss');

    //登录信息
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));

    //页面title
    $smarty->assign('INDEX_TITLE','<title>daftar alamat</title>');
    $smarty->assign('INDEX_TITLE_STR','daftar alamat');

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','addressadministration');
    $smarty->assign('INDEX_CSS_NAME','addressadministration');

    //获取地址列表信息

    $params = [];
    $uss = $_COOKIE['uss'];
    if($uss){
        $params['uss'] = $uss;
        $params['buyer_id'] = $_COOKIE['uss_buyer_id'];
    }else{
        $params['buyer_id'] = $_COOKIE['buyer_id'];
    }
    $path = 'v1/receiveAddresses';
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    //print_r($json);
    $address_list = $json['buyer_address']['list'];
    $smarty->assign('ADDRESS_LIST',$address_list);
    $smarty->assign('ADDRESS_ID',$_REQUEST['address_id']);

    $smarty->display('addressadministration.tpl');
?>
