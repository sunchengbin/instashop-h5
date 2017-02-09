<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    $smarty = smartyCommon();

    /*获取搜索列表页面*/
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    include_once( dirname(__FILE__).'/../html/router/base.php');
    $seller_id = $_REQUEST['seller_id'];
    $key = $_REQUEST['key'];
    if($seller_id && $key){
        $params = [
            'action' => 'digital',
            'seller_id' => $seller_id,
            'search' => $key,
            'page_size' => 18,
            'page_num' => 0
        ];
        $path = 'v1/shopsItems/self';
        $ret = get_init_php_data($path, $params);
        $json = json_decode($ret, true);
        $smarty->assign('SEARCH_DATA',$json);
        $smarty->assign('SEARCH_DATA_STR',$ret);
        $items = transItems($json["item_list"]["list"]);
        $itemtype = getItemListType($json["template"]);
        $smarty->assign('ITEMTYPE',$itemtype);
        $smarty->assign('KEY',$key);
    }
    $index_title = '<title>Cari</title>';
    $smarty->assign('INDEX_TITLE',$index_title);
    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','search');
    $smarty->assign('INDEX_CSS_NAME','search');
    $smarty->display('search.tpl');
?>
