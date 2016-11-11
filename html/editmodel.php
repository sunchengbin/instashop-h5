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
    <link href="<?=STATIC_HOST?>/css/dist/app/orderconfirm.css?v=1478407361226" rel="stylesheet"/>
    <title>店铺装修</title>
    <script>
        <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
        ini_set('display_errors', 0);

        $seller_id = $_REQUEST['seller_id'];
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
            'receive_addr' => urlencode($addr)
        ];
        $path = 'v1/expresses';
        ?>
        var api_url = '<?php echo check_api($path, $params); ?>';

        var express_data = JSON.parse(<?php echo get_init_data($path, $params); ?>);

      </script>
      <style>
            button{
               display: block;
               width: 200px;
               height: 40px;
               line-height: 40px;
               background-color: #43CB9C;
               margin-top: 10px;
               color: #fff;
               font-size: 16px;
               border-radius: 2px;
            }
      </style>
</head>
<body>
    <button class="j_insert_model">insert_model</button>
    <button class="j_edit_model">edit_model</button>
    <button class="j_show_loading">show_loading</button>
    <button class="j_close_loading">close_loading</button>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>
    <script src="<?=STATIC_HOST?>/js/app/editmodel.js?v=1478407361226"></script>
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