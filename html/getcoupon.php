<?php
    require_once('./lib/libs/Smarty.class.php');
    $smarty = new Smarty();
    $smarty->setTemplateDir('./templates/');
    $smarty->setCompileDir('./templates_c/');
    $smarty->setConfigDir('./configs/');
    $smarty->setCacheDir('./cache/');

    include_once( dirname(__FILE__).'/../html/router/common.php');
    $smarty->assign('STATIC_DNS',STATIC_DNS);
    $smarty->assign('STATIC_ICO_CSS',STATIC_ICO_CSS);
    $smarty->assign('STATIC_FONT_CSS',STATIC_FONT_CSS);
    $smarty->assign('STATIC_HOST',STATIC_HOST);
    $smarty->assign('BI_SCRIPT',BI_SCRIPT);

    /*获取index页面的数据*/
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    $params = [
        'action' => 'index'
    ];
    $coupon_id = $_REQUEST['coupon_id'];

    $smarty->assign('INDEX_DATA',$coupon_id);
    $smarty->assign('INDEX_DATA_STR','0002');

    include_once( dirname(__FILE__).'/../html/router/base.php');

    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);

    $index_title = '<title></title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','getcoupon');
    $smarty->assign('INDEX_CSS_NAME','getcoupon');
    $smarty->display('getcoupon.tpl');
?>
