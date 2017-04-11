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
    <?php
        if(isDebug()){
            echo '<link href="'.STATIC_HOST.'/css/app/orderconfirm.css?v=1491875560372" rel="stylesheet"/>';
        }else{
            echo '<link href="'.STATIC_HOST.'/css/dist/app/orderconfirm.css?v=1491875560372" rel="stylesheet"/>';
        }
     ?>
    <title>Order</title>
    <script>
        <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
        ini_set('display_errors', 0);

        $seller_id = $_REQUEST['seller_id'];
        $supply_shop_id = $_REQUEST['groupid'];
        $addr = $_REQUEST['addr'];
        $addr = $_REQUEST['addr'];
        $items = json_decode($_REQUEST['items'],true);
        $new_addr = $_REQUEST['new_addr'];
        if ($new_addr) {
            $addr = $new_addr;
        }
        $params = [
            'action' => 'express_fee',
            'shop_id' => $seller_id,
            'items' => $items,
            'supply_shop_id'=>$supply_shop_id,
            'receive_addr' => urlencode($addr)
        ];
        $path = 'v1/expresses';

        $paramsPrice = [
            'action' => 'price',
            'seller_id' => $seller_id,
            'items' => $items,
            'buyer_id' => $_REQUEST['buyer_id']
        ];
        $pathPrice = 'v1/shopsDiscount';
        ?>

        var api_url = '<?php echo check_api($path, $params); ?>';
        var api_url_price = '<?php echo check_api($pathPrice, $paramsPrice); ?>';
        var express_data = JSON.parse(<?php echo get_init_data($path, $params); ?>);
        var price_data = JSON.parse(<?php echo get_init_data($pathPrice, $paramsPrice); ?>);


      </script>
</head>
<body data-spider="2cj9l5q4"></body>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <?php
        if(isDebug()){
            echo '<script src="'.STATIC_HOST.'/js/base/require-config.js"></script>';
            echo '<script src="'.STATIC_HOST.'/js/app/orderconfirm.js?v=1491875560372"></script>';
        }else{
            echo '<script src="'.STATIC_HOST.'/js/dist/app/orderconfirm.js?v=1491875560372"></script>';
        }
     ?>
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