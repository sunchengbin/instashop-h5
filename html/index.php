<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
  <meta content="telephone=no" name="format-detection"/>
  <meta name="apple-touch-fullscreen" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <link href="../css/dist/app/shop_index.css?v=1" rel="stylesheet"/>
  <title>Instashop</title>
  <script>
    <?php
        include_once( dirname(__FILE__).'/../js/router/util.php' );
        $params = [
            'action' => 'index',
            'page_size' => 10,
            'last_id' => '',
            'json' => '0'
        ];
        $seller_id = $_REQUEST['seller_id'];
        if (!$seller_id) {
            $ss = split('\/', $_SERVER['REQUEST_URI']);
            $seller_id = end($ss);
        }
        $path = 'v1/shops/'.$seller_id;
        ?>
        var init_data = JSON.parse(<?php echo get_init_data($path, $params); ?>);
  </script>
</head>
<body>
  <script src="../js/base/require-zepto.js?v=1"></script>
  <!--<script src="../js/base/require-config.js?v=1"></script>-->
  <script src="../js/dist/app/index.js?v=1"></script>
</body>
</html>
