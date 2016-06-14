<?php
$callback = $_GET['callback'];
$im_id = $_GET['im_id'];
$domain = "instashop.co.id";
if (strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
    $cookie_name = "test-insta-im-id";
} else {
    $cookie_name = "insta-im-id";
}
setcookie($cookie_name, $im_id, time() + 2*7*24*3600, '/', $domain);
$data = [ 'r' => 1 ];
echo $callback.'('.json_encode($data).')';
