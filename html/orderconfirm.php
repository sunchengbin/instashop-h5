<!DOCTYPE html>
<?php
    include_once( dirname(__FILE__).'/../html/router/common.php');
    include_once( dirname(__FILE__).'/../html/router/util.php' );
    error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    ini_set('display_errors', 0);

    $params = [];
    $uss = $_COOKIE['uss'];
    $params['seller_id'] = $_REQUEST['seller_id'];
    $params['is_direct_buy'] = 0;
    if($uss){
        $params['uss'] = $uss;
        $params['buyer_id'] = $_COOKIE['uss_buyer_id'];
    }else{
        $params['buyer_id'] = $_COOKIE['buyer_id'];
    }
    $params['opt'] = 'cart,address,price,express';
    $params['select_items'] = json_decode($_REQUEST['select_items'], true);
    $params['is_direct_buy'] = 0;
    $params['buyer_address_id'] = $_REQUEST['address_id'];
    $path = 'v1/buyerCart/';
    $ret = get_init_php_data($path, $params);
    $json = json_decode($ret, true);
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expect" content="0">
    <meta name="format-detection" content="telephone=no" />
    <?=initPhpCss('orderconfirm')?>
    <title>Order</title>
    <script>
        var goods_data = <?php echo json_encode($json['buyer_cart']);?>;
        var address_data = <?php echo json_encode($json['buyer_address']);?>;
        var express_data = <?php echo json_encode($json['express']);?>;
        var price_data = <?php echo json_encode($json['price']);?>;
        var user_info = <?php echo json_encode($_POST);?>;
      </script>
</head>
<body data-spider="2cj9l5q4"></body>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <?=initPhpJs('orderconfirm')?>
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