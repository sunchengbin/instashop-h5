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
    <title>Bukti Pembayaran</title>
    <?=initPhpCss('uploadprove')?>
    <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        $order_id = $_REQUEST['order_id'];
        if (!$order_id) {
            $ss = split('\/', $_SERVER['REQUEST_URI']);
            if(split('\?', $_SERVER['REQUEST_URI']).length > 0){
                $si = split('\?',end($ss))[0];
                $order_id = $si;
            }else{
                $order_id = end($ss);
            }
        }
        $params = [
            'order_id' => $order_id
        ];
        $path = 'v1/evidence/';
        $ret = get_init_php_data($path, $params);
        $json = json_decode($ret, true);
        echo '<script>var init_data = JSON.parse('.json_encode($ret).');</script>';
    ?>
</head>
<body data-spider="fa8uybh3">
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <?=initPhpJs('uploadprove')?>
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