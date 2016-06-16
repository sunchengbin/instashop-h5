<!DOCTYPE html>
<?php
include_once( dirname(__FILE__).'/../js/router/common.php');
?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
  <meta content="telephone=no" name="format-detection"/>
  <meta name="apple-touch-fullscreen" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <link href="<?=STATIC_HOST?>/css/dist/app/item.css?v=1" rel="stylesheet"/>
  <title>商品详情</title>
  <script>
        <?php
            include_once( dirname(__FILE__).'/../js/router/util.php' );
            $params = [];
            $item_id = $_REQUEST['item_id'];
            if (!$item_id) {
                $ss = split('\/', $_SERVER['REQUEST_URI']);
                $item_id = end($ss);
            }
            $path = 'v1/items/'.$item_id;
            ?>
            var init_data = JSON.parse(<?php echo get_init_data($path, $params); ?>);
  </script>
</head>
<body>
  <script src="<?=STATIC_HOST?>/js/base/require-zepto.js?v=1"></script>
  <!--<script src="../js/base/require-config.js?v=1"></script>-->
  <script src="<?=STATIC_HOST?>/js/dist/app/item.js?v=1"></script>
</body>
</html>
