<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    $smarty = smartyCommon();

    /*获取index页面的数据*/
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    $params = [
        'action' => 'index_template',
        'platform' => 'web',
        'page_num' => 1
    ];
    $seller_id = $_REQUEST['seller_id'];
    if (!$seller_id) {
        $ss = split('\/', $_SERVER['REQUEST_URI']);
        if(split('\?', $_SERVER['REQUEST_URI']).length > 0){
            $si = split('\?',end($ss))[0];
            $seller_id = $si;
        }else{
            $seller_id = end($ss);
        }
    }
    $path = 'v1/shops/'.$seller_id;
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $url = $json['shop']['logo'];
    $url = str_replace("w=110", "w=140", $url);
    $url = str_replace("h=110", "h=140", $url);

    // 调试

    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('INDEX_DATA_SHOP',$json);
    $smarty->assign('INDEX_DATA_STR',$ret);

    include_once( dirname(__FILE__).'/../html/router/base.php');
    // $items = transItems($json["item_list"]["list"]);
    $itemtype = getItemListType($json["template"]);
    $smarty->assign('ITEMTYPE',$itemtype);
    $smarty->assign('RECOMMEND_ITEM',$json["item_list"]["list"]);

    // 获取首次渲染的全部商品数据
    $params = [
        'action' => 'index_allitems',
        'platform' => 'web',
        'page_num' => 1
    ];
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $smarty->assign('ALL_ITEM_DATA_STR',$ret);
    $smarty->assign('ALL_ITEM_DATA',$json);
    $smarty->assign('ALL_ITEMS',$json["item_list"]["list"]);

    // 获取店铺信息
    $params = [
        'action' => 'index_shopinfo',
        'platform' => 'web'
    ];
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
    $smarty->assign('SHOP_INFO_DATA_STR',$ret);
    $smarty->assign('SHOP_INFO_DATA',$json["shop"]);
    
    
    
    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);

    $index_title = '<meta property="og:image" content="'.$url.'">'.'<title>'.$json["shop"]["name"].'</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','index');
    $smarty->assign('INDEX_CSS_NAME','index');
    $smarty->display('index.tpl');
?>
