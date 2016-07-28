<!DOCTYPE html>
<?php
include_once( dirname(__FILE__).'/../html/router/common.php');
?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
  <meta content="telephone=no" name="format-detection"/>
  <meta name="apple-touch-fullscreen" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <?=STATIC_DNS?>
  <?=STATIC_ICO_CSS?>
  <?=STATIC_FONT_CSS?>
  <link href="<?=STATIC_HOST?>/css/app/shop_index.css?v=1469594573578" rel="stylesheet"/>
    <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        $sort_id = $_REQUEST['sort_id'];
        if (!$sort_id) {
            $ss = split('\/', $_SERVER['REQUEST_URI']);
            $si = split('\?', end($ss));
            $sort_id = $si[0];
        }
        $sort_name = $_REQUEST['name'];
        $params = [
            'action' => 'tag',
            'page_size' => 10,
            'tag_id' => $sort_id
        ];
        $seller_id = $_REQUEST['seller_id'];
        $path = 'v1/shops/'.$seller_id.'/items';
        $ret = get_init_php_data($path, $params);
        $json = json_decode($ret, true);
        echo '<title>'.$sort_name.'</title>';
        echo '<script>var init_data = JSON.parse('.json_encode($ret).');</script>';
    ?>
</head>
<body>
  <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
  <script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>
  <script src="<?=STATIC_HOST?>/js/app/sort.js?v=1469594573578"></script>
  <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-78448705-7', 'auto');
      ga('send', 'pageview');

  </script>
</body>
</html>
