<?php
define('C_RUNTIME_FILE_PATH', '/data/server/weidian/runtime');

$is_online = false;

if (file_exists(C_RUNTIME_FILE_PATH.'/.iamonline')) {
    $is_online = true;
}

define('C_RUNTIME_ONLINE', $is_online);

$static_host = '';
if (C_RUNTIME_ONLINE)
{
    $static_host = 'http://static.instashop.co.id';
    //$static_host = '..';
}
else
{
    $static_host = 'http://static-test.instashop.co.id';
    //$static_host = '..';
}

define('STATIC_HOST', $static_host);
?>
