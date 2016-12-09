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

    /*HOST_NAME*/
    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);

    /*获取item页面的数据*/
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $params = [];
    $item_id = $_REQUEST['item_id'];
    if (!$item_id) {
        $ss = split('\/', $_SERVER['REQUEST_URI']);
        $item_id = end($ss);
    }
    $path = 'v1/items/'.$item_id;
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $url = $json['item']['img'];
    $url = str_replace("w=110", "w=140", $url);
    $url = str_replace("h=110", "h=140", $url);

    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('INDEX_DATA_STR',$ret);

    /*item页面支持app分享的数据*/
    $item_title = '<meta property="og:image" content="'.$url.'"><title>'.$json["item"]["item_name"].'</title>';
    $smarty->assign('INDEX_TITLE',$item_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','item');
    $smarty->assign('INDEX_CSS_NAME','item');
    $smarty->display('detail.tpl');


?>
