<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    $smarty = smartyCommon();

    /*获取index页面的数据*/
    include_once( dirname(__FILE__).'/../html/router/util.php' );

    $coupon_id = $_REQUEST['coupon_id'];
    $code = $_REQUEST['code'];
    if ($coupon_id) {
        $path = 'v1/coupon/'.$coupon_id;
        $ret = get_init_php_data($path, []);
        $json = json_decode($ret, true);
        $smarty->assign('INDEX_DATA_CODE',$code);
    }else{
        if(!$code){
            $ss = split('\/', $_SERVER['REQUEST_URI']);
            $code = end($ss);
            $code_arr = split('\?',$code);
            $code = $code_arr[0];
        }
        $path = 'v1/coupon/';
        $params = [];
        $params["code"] = $code;
        $ret = get_init_php_data($path, $params);
        $json = json_decode($ret, true);
        $smarty->assign('INDEX_DATA_CODE',$code);
    }

    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('INDEX_DATA_STR',$json["coupon"]["coupon"]["url"]);

    include_once( dirname(__FILE__).'/../html/router/base.php');

    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);

    $index_title = '<title></title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','coupon');
    $smarty->assign('INDEX_CSS_NAME','coupon');
    $smarty->display('coupon.tpl');
?>
