<?php
    include_once( dirname(__FILE__).'/../../../html/router/common.php');
    $smarty = smartyCommon();

    /*获取index页面的数据*/
    include_once( dirname(__FILE__).'/../../../html/router/util.php' );
    $ss = split('\/', $_SERVER['REQUEST_URI']);
    $invite_id = intval(end($ss));
    $path = 'v1/bargain/';
    $params = [
        'action' => 'h5_invite',
        'invite_id' => $invite_id
    ];
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);

    $smarty->assign('INDEX_DATA',$json);
    $smarty->assign('BARGAIN_INVITE_DETAIL',$json['bargain_invite_detail']);
    $smarty->assign('INDEX_DATA_STR',$ret);
    $smarty->assign('INDEX_USER_INFO',json_encode($_POST));

    include_once( dirname(__FILE__).'/../../../html/router/base.php');

    $hostname=$_SERVER['SERVER_NAME'];
    $smarty->assign('HOST_NAME',HOST_NAME);
    $title = '测试语法';
    $index_title = '<title>'.$title+'</title>';
    $smarty->assign('INDEX_TITLE',$index_title);

    /*基础的js,css文件名*/
    $smarty->assign('INDEX_JS_NAME','bargaininvite');
    $smarty->assign('INDEX_CSS_NAME','bargaininvite');
    $smarty->display('bargaininvite.tpl');
?>
