<!DOCTYPE html>
<?php
include_once( dirname(__FILE__).'/../html/router/common.php');
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expect" content="0">
    <link href="<?=STATIC_HOST?>/css/dist/app/orderdetail.css?v=1466678282951" rel="stylesheet"/>
    <title>订单详情</title>
    <script>
        <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        $params = [
            'buyer_id' => 0,
            'opt' => 'desc,pay_info,shop_info,logistics_info'
        ];
        $order_id = $_REQUEST['order_id'];
        if (!$order_id) {
            $ss = split('\/', $_SERVER['REQUEST_URI']);
            $order_id = end($ss);
        }
        $path = 'v1/orders/'.$order_id;
        ?>
        var init_data = JSON.parse(<?php echo get_init_data($path, $params); ?>);
    </script>
</head>
<body>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js?v=1466678282951"></script>
    <!--<script src="../js/base/require-config.js"></script>-->
    <script src="<?=STATIC_HOST?>/js/dist/app/orderdetail.js?v=1466678282951"></script>
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