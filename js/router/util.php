<?php

function check_api($path, $params){
    if (strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
        $host = 'https://api-m-test.instarekber.com/instashop/';   // 测试
    }else{
        $host = 'https://apip.instarekber.com/instashop/';
    }
    $api = $host.$path.'?param='.(json_encode([ 'edata' => $params  ]));
    return $api;
}

function get_init_data($path, $params){
    if (strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
        $host = 'https://api-m-test.instarekber.com/instashop/';   // 测试
    }else{
        $host = 'https://apip.instarekber.com/instashop/';
    }
    $api = $host.$path.'?param='.json_encode([ 'edata' => $params  ]);
    return json_encode(file_get_contents($api));
}

?>
