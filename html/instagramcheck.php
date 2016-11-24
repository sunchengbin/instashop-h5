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
    <?=STATIC_DNS?>
    <?=STATIC_ICO_CSS?>
    <?=STATIC_FONT_CSS?>
    <link href="<?=STATIC_HOST?>/css/dist/app/address.css?v=1479961184115" rel="stylesheet"/>
    <title>Tambah Produk dari Instagram</title>
    <style>
    .index-btn-box {
        padding:0 2.5rem;
        margin:2.5rem 0 2rem;
    }
    .index-btn-box .btn {
        font-size:1.6rem;
        border-radius: 3px!important;
    }
    .index-btn-box a {
        color:#ffffff;
    }
    .instagram-wraper {
        color:#999999!important;
    }
    .instagram-wraper p {
        padding:0 1rem 1rem;
        font-size: 1.2rem;
        color: #999999!important;
    }
    .instagram-wraper .info-box {
        height:auto!important;
        padding: 1.5rem 2rem!important;
        line-height: inherit!important;
    }
    .instagram-wraper input {
        background: #F5F5F5;
        border-radius: 5px;
        padding: 1.5rem!important;
        height: 4.5rem;
        color:#999999!important;
    }
    </style>
</head>
<body>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <!--<script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>-->
    <script src="<?=STATIC_HOST?>/js/dist/app/instagramcheck.js?v=1479961184115"></script>
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