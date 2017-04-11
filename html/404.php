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
    <title>404</title>
    <style>
        *{
            margin:0;
            padding:0;
        }
        div{
            max-width: 640px;
            margin: 85px auto 0;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        p{
            margin:10px 0 30px;
        }
        img{
            width:80px;
            height:80px;
        }
        a{
            display: block;
            margin: 0 auto;
            height: 36px;
            line-height: 36px;
            text-align: center;
            color: #fff;
            background-color: #43CB9C;
            width: 250px;
            border-radius: 2px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <script src="<?=STATIC_HOST?>/js/dist/app/404.js?v=1491899263783"></script>
    <script>
        var _body = document.querySelector('body');
        var _htm = '<div class=""><img src="<?=STATIC_HOST?>/images/app/404.png"/>';
        _htm +='<p>Halaman ini tidak dapat ditemukan!</p>';
        if(history.length > 2){
            _htm+='<a class="" href="javascript:history.back();">Kembali ke halaman sebelumnya </a>';
        }else{
            _htm+='<a class="j_error" href="javascript:;">Laporkan Masalah</a>';
        }
        _htm+='</div>';
        _body.innerHTML = _htm;
    </script>
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