<?php
$callback = $_GET['callback'];
$im_id = $_GET['im_id'];
if (strpos($_SERVER['HTTP_HOST'],'test')!==false || strpos($_SERVER['HTTP_HOST'], 'localhost')!==false){
    $domain = "m-test.instashop.co.id";
} else {
    $domain = "m.instashop.co.id";
}
setcookie("insta-im-id", $im_id, time() + 2*7*24*3600, '/', $domain);
$data = [ 'r' => 1 ];
echo $callback.'('.json_encode($data).')';
