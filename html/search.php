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


    /*获取搜索列表页面*/
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    $params = [
        'search' => $_REQUEST['key'],
        'seller_id' => $_REQUEST['seller_id']
    ];
    $path = 'v1/shopsItems/self';
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);

    include_once( dirname(__FILE__).'/../html/router/base.php');
    $items = transItems($json["item_list"]["list"]);
    $itemtype = getItemListType($json["template"]);
    $smarty->assign('ITEMTYPE',$itemtype);
    $smarty->assign('KEY',$_REQUEST['key']);
    $smarty->assign('SEARCH_DATA',$json);
    $smarty->assign('SEARCH_DATA_STR',$ret);


    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','search');
    $smarty->assign('INDEX_CSS_NAME','search');
    $smarty->display('search.tpl');
?>
