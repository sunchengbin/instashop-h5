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
    <meta name="format-detection" content="telephone=no" />
    <?=STATIC_DNS?>
    <?=STATIC_ICO_CSS?>
    <?=STATIC_FONT_CSS?>
    <link href="<?=STATIC_HOST?>/css/dist/app/orderdetail.css?v=1489716868400" rel="stylesheet"/>
    <title>Detail Pesanan</title>
    <script>
        <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        $params = [
            'buyer_id' => 0,
            'opt' => 'desc,pay_info,shop_info,logistics_info,refund_card,buyer_op'
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
<body data-spider="wqk2d63u"></body>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <!--<script src="../js/base/require-config.js"></script>-->
    <script src="<?=STATIC_HOST?>/js/dist/app/orderdetail.js?v=1489716868400"></script>
    <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-78448705-7', 'auto');
          ga('send', 'pageview');
<?=BI_SCRIPT?>
      </script>
</body>
</html>