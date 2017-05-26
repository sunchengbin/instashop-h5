<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon();

    //登录信息
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));

    //页面title
    $smarty->assign('INDEX_TITLE','地址管理');

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','addressadministration');
    $smarty->assign('INDEX_CSS_NAME','addressadministration');

    //获取地址列表信息
    $address_list = [];
    $smarty->assign('ADDRESS_LIST',$address_list);

    $smarty->display('addressadministration.tpl');
?>
