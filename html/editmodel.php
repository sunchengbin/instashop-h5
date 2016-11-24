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
    <link href="<?=STATIC_HOST?>/css/dist/app/editmodel.css?v=1479980281458" rel="stylesheet"/>
    <title>Kreasikan Tokomu</title>
    <style>
        body{
            background-color: #333;
        }
    </style>
    <script>
        <?php
            include_once( dirname(__FILE__).'/../html/router/util.php' );
            error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
            ini_set('display_errors', 0);

            $seller_id = $_REQUEST['seller_id'];
            $wduss = $_REQUEST['wduss'];
            $params = [
                'seller_id' => $seller_id,
                'wduss' => $wduss
            ];
            $path = 'v1/shopsTemplate';
        ?>
        var api_url = '<?php echo check_api($path, $params); ?>';
        var init_data = JSON.parse(<?php echo get_init_data($path, $params); ?>);
    </script>
</head>
<body>
    <div class="j_start_loading" style="color:#fff;">Memuat...</div>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <!--<script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>-->
    <script src="<?=STATIC_HOST?>/js/dist/app/editmodel.js?v=1479980281458"></script>
    <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          function goUrlStatistics(type) {
          console.log(type)
            ga('send', 'event', type, 'click');
          }
          ga('create', 'UA-78448705-7', 'auto');
          ga('send', 'pageview');

    </script>
</body>
</html>