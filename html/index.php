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

    /*获取index页面的数据*/
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    $params = [
        'action' => 'index',
        'page_size' => 10,
        'last_id' => '',
        'json' => '0'
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

    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('INDEX_DATA_STR',$ret);

    include_once( dirname(__FILE__).'/../html/router/base.php');
    $items = transItems($json["item_list"]["list"]);
    $smarty->assign('RECOMMEND_ITEM',$items["hot"]);
    $smarty->assign('TAGS_ITEM',$items["tags"]);
    $smarty->assign('HOT_ITEM',$items["item"]);
    $smarty->assign('TAG_LIST',$json["tag_list"]);

    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);

    $index_title = '<meta property="og:image" content="'.$url.'">'.'<title>'.$json["shop"]["name"].'</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','index');
    $smarty->assign('INDEX_CSS_NAME','shop_index');
    $smarty->display('index.tpl');
?>
