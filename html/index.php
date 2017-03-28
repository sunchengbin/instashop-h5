<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    $skin = getUrlParam('skin');
    $smarty = smartyCommon($skin);

    /*获取index页面的数据*/
    include_once( dirname(__FILE__).'/../html/router/util.php' );

    // 获取url信息 拼接默认参数
    //首页tab 1-第一个首页模版 2-第二个全部商品 3-第三个店铺简介
    $pt = getUrlParam('pt');
    $pt = $pt ? $pt : 'undefined';
    //全部商品子tab 0 综合 1时间 2由低到高 3由高到低 
    $ct = getUrlParam('ct');
    $ct = $ct ? $ct : 'undefined';
    $page_num = getUrlParam('page_num');
    $page_num = $page_num ? $page_num : 'undefined';
    $default_page_size = 18;
    $page_size = getUrlParam('page_size');
    $page_size = $page_size ? $page_size : $default_page_size;

    $smarty->assign('PT',$pt);
    $smarty->assign('CT',$ct);
    $smarty->assign('PAGE_NUM',$page_num);
    $smarty->assign('PAGE_SIZE',$page_size);

    if($pt&&($pt!='undefined')){
        $page_size = $page_num*$page_size;
        if($pt==1){
            //tab1 数据
            $paramsForIndexTemplate = [
                'action' => 'index_template',
                'platform' => 'web',
                'page_num' => 1,
                'page_size' => $page_size
            ];
            //tab2 数据走默认
            $paramsForAllItems = [
                'action' => 'index_allitems',
                'platform' => 'web',
                'page_size' => $default_page_size,
                'page_num' => 1
            ];
        }
        //全部商品页
        if($pt==2){
            //判断子tab类型 4种
            //tab1 数据
            $paramsForIndexTemplate = [
                'action' => 'index_template',
                'platform' => 'web',
                'page_size' => $default_page_size,
                'page_num' => 1
            ];
            //综合排序
            $paramsForAllItems = [
                'action' => 'index_allitems',
                'platform' => 'web',
                'page_num' => 1,
                'page_size'=> $page_size,
                'orderby' => $ct,
                'filter' => 0
            ];
        }
        //商品简介
        if($pt==3){
            $paramsForIndexTemplate = [
                'action' => 'index_template',
                'platform' => 'web',
                'page_size' => $page_size,
                'page_num' => 1
            ];
            //综合排序
            $paramsForAllItems = [
                'action' => 'index_allitems',
                'platform' => 'web',
                'page_num' => 1,
                'page_size' => $page_size,
                'orderby'=> 0,
                'filter' => 0
            ];
        }
        
    }else{
        //默认url无记录参数
        $paramsForIndexTemplate = [
            'action' => 'index_template',
            'platform' => 'web',
            'page_size' => $page_size,
            'page_num' => 1
        ];
        // 获取首次渲染的按综合排序的全部商品
        $paramsForAllItems = [
            'action' => 'index_allitems',
            'platform' => 'web',
            'page_num' => 1,
            'page_size' => $page_size,
            'orderby'=> 0,
            'filter' => 0
        ];

    }

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

    //请求第一个tab数据
    $path = 'v1/shops/'.$seller_id;
    $ret = get_init_php_data($path, $paramsForIndexTemplate);
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
    $smarty->assign('TAG_LIST',$json["tag_list"]);
    $smarty->assign('RECOMMEND_ITEM',$json["item_list"]["list"]);

    //请求第二个tab数据
    $ret = get_init_php_data($path, $paramsForAllItems);
    $json = json_decode($ret, true);
    $smarty->assign('ALL_ITEM_DATA_STR',$ret);
    $smarty->assign('ALL_ITEM_DATA',$json);
    $smarty->assign('ALL_ITEMS',$json["item_list"]["list"]);

    //请求第三个tab数据
    // 获取店铺信息
    $paramsForShopInfo = [
        'action' => 'index_shopinfo',
        'platform' => 'web'
    ];
    $ret = get_init_php_data($path, $paramsForShopInfo);
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
