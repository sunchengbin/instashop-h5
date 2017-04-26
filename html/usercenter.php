<?php

    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $smarty = smartyCommon('default');

    $index_title = '<title>用户中心</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_CSS_NAME','usercenter');
    $smarty->assign('INDEX_JS_NAME','usercenter');
    $smarty->display('usercenter.tpl');
?>
