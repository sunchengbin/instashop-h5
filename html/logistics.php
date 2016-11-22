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
    <link href="<?=STATIC_HOST?>/css/dist/app/logistics.css?v=1479790785975" rel="stylesheet"/>
    <title>Detail pengiriman</title>
    <script>
        <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        $logistics_id = $_REQUEST['logistics_id'];
        $order_id = $_REQUEST['order_id'];
        $params = [
            'order_id' => $order_id
        ];
        $path = 'v1/logistics/'.$logistics_id;
        ?>
        var init_data = JSON.parse(<?php echo get_init_data($path, $params); ?>);
        var Lang = {
            'zh-cn' : {
                'H5_LOGISTICS_DETAIL': '物流详情',
            },
            'id' : {
                'H5_LOGISTICS_DETAIL': 'Detail pengiriman',
            }
        }
        document.title=(Lang[ navigator.language.toLowerCase() ] || Lang.id).H5_LOGISTICS_DETAIL;
      </script>
</head>
<body>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <!--<script src="../js/base/require-config.js"></script>-->
    <script src="<?=STATIC_HOST?>/js/dist/app/logistics.js?v=1479790785975"></script>
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