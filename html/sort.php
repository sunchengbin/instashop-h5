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
  <?=initPhpCss('sort')?>
    <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        $sort_id = $_REQUEST['sort_id'];
        if (!$sort_id) {
            $ss = split('\/', $_SERVER['REQUEST_URI']);
            if(split('\?', $_SERVER['REQUEST_URI']).length > 0){
                $si = split('\?',end($ss))[0];
                $sort_id = $si;
            }else{
                $sort_id = end($ss);
            }
        }
        $params = [
            'page_size' => 18,
            'havestock' => 1
        ];
        $seller_id = $_REQUEST['seller_id'];
        $path = 'v1/tag/'.$sort_id.'/items';
        $ret = get_init_php_data($path, $params);
        $json = json_decode($ret, true);
        //购物车商品数量
        $get_cart_num_path = 'v1/buyerCart';
        $cart_params = [];
        $uss = $_COOKIE['uss'];
        $cart_params['action'] = 'num';
        $cart_params['seller_id'] = $_REQUEST['seller_id'];
        $cart_params['is_direct_buy'] = 0;
        if($uss){
            $cart_params['uss'] = $uss;
            $cart_params['buyer_id'] = $_COOKIE['uss_buyer_id'];
        }else{
            $cart_params['buyer_id'] = $_COOKIE['buyer_id'];
        }
        $cart_ret = get_init_php_data($get_cart_num_path, $cart_params);
        $cart_json = json_decode($cart_ret, true);

        $cart_num = $cart_json["cart_num"];
        $cart_num = $cart_num?($cart_num>9?'9+':$cart_num):0;

        echo '<title>'.$json['tag']['name'].'</title>';
        echo '<script>var init_data = JSON.parse('.json_encode($ret).');var cart_num = "'.$cart_num.'"</script>';
    ?>
</head>
<body data-spider="v4ty5c2x">
  <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
  <?=initPhpJs('sort')?>
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
