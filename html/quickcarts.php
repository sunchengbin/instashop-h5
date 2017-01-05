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
    include_once( dirname(__FILE__).'/../html/router/base.php' );
    $cart_id = $_REQUEST['cart_id'];
    $path = 'v1/carts/'.$cart_id;
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $arr = array_values($json['carts']);
    $url = $arr[0]['item']['img'];
    $url = str_replace("w=110", "w=140", $url);
    $url = str_replace("h=110", "h=140", $url);

    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('INDEX_DATA_STR',$ret);

    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);

    $index_title = '<meta property="og:image" content="'.$url.'">'.'<title>Alamat Pengiriman</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','quickcarts');
    $smarty->assign('INDEX_CSS_NAME','quickcarts');
    $smarty->display('quickcarts.tpl');
?>
